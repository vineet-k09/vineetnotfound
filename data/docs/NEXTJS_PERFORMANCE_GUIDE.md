# Next.js Performance & Slow Filesystem Optimization Guide

This guide documents the root cause of slow Next.js dev preview compilation (e.g., ~10-second rebuild delays and `Slow filesystem detected` warnings), the fix applied to this project, and steps/permanent fixes for future projects.

---

## 1. Root Cause Analysis

### A. Container / Virtualized Overlay Filesystem (`/mnt/bridge`)
* **The Warning:** `Slow filesystem detected. If /mnt/bridge/.../.next is a network drive, consider moving it to a local folder.`
* **Why it happens:** Next.js generates tens of thousands of cache files, modules, and code chunks inside `.next/` during hot reloading. When working on container overlay filesystems, Docker mounts, or network drives (`/mnt/...`), disk `stat`, `write`, and `rename` syscalls incur high latency compared to native SSDs or RAM disks.

### B. Next.js App Router Architecture vs Vite
* **Vite:** Operates as an unbundled client-side ESM dev server. It serves raw modules directly to the browser without full server-side bundle rebuilding.
* **Next.js:** Compiles both Server Components (RSC) and Client Components, generating SSR HTML and hydration bundles on demand for every route and change.

### C. Heavy WebGL & Animation Dependencies
* Libraries like `three`, `@react-three/drei`, `@react-three/fiber`, and `framer-motion` introduce large module graphs. If processed on the server on every fast refresh without package optimization, compilation slows down significantly.

---

## 2. Fix Implemented in This Project

### A. Redirecting `.next` Cache to RAM Disk (`/tmp`)
By symlinking `.next` to `/tmp/vineetnotfound-next` (which uses `tmpfs` in Linux memory), all compilation output and hot-reload cache files bypass the slow overlay filesystem completely.

Updated script in [`package.json`](file:///mnt/bridge/dev/personal/vineetnotfound/package.json#L6):
```json
"scripts": {
  "dev": "mkdir -p /tmp/vineetnotfound-next && (test -L .next || (rm -rf .next && ln -s /tmp/vineetnotfound-next .next)) && next dev --turbopack"
}
```

### B. Optimizing Monolithic Imports in `next.config.ts`
Configured [`next.config.ts`](file:///mnt/bridge/dev/personal/vineetnotfound/next.config.ts) to tree-shake heavy 3D and animation packages:
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "@react-three/drei",
      "@react-three/fiber",
      "framer-motion",
      "three",
    ],
  },
  transpilePackages: ["three", "@react-three/drei", "@react-three/fiber"],
};

export default nextConfig;
```

---

## 3. Step-by-Step Checklist for Future Next.js Projects

Whenever starting a new Next.js project on container/mounted environments:

1. **Redirect `.next` to RAM disk (`/tmp`)**:
   Add a automatic setup check in `package.json`:
   ```bash
   mkdir -p /tmp/<project-name>-next && (test -L .next || (rm -rf .next && ln -s /tmp/<project-name>-next .next))
   ```

2. **Use Turbopack**:
   Ensure `next dev` runs with `--turbopack`:
   ```json
   "dev": "next dev --turbopack"
   ```

3. **Configure `optimizePackageImports` in `next.config.ts`**:
   Add large icon or UI libraries (`lucide-react`, `framer-motion`, `@mui/material`, `@react-three/drei`) to `experimental.optimizePackageImports`.

4. **Dynamic Import for Browser-Only / WebGL Components**:
   Prevent Next.js from spending server-side compilation cycles on WebGL/Canvas components:
   ```tsx
   import dynamic from 'next/dynamic';

   const Scene3D = dynamic(() => import('./components/Scene3D'), {
     ssr: false,
     loading: () => <div>Loading 3D scene...</div>,
   });
   ```

---

## 4. Probable Permanent System-Level Fixes

If you want a permanent solution across all projects without modifying `package.json` every time:

### Solution A: Mount `.next` as a `tmpfs` Volume in Docker
If running inside Docker or Docker Compose, configure the container to mount `.next` in memory:
```yaml
# docker-compose.yml
services:
  web:
    build: .
    volumes:
      - .:/app
      - /app/node_modules
    tmpfs:
      - /app/.next:rw,exec,nosuid,size=2g
```

### Solution B: Store Workspace on Native Local Storage
* Avoid running Next.js inside shared mount paths (like `/mnt/bridge/...` or WSL1 `/mnt/c/...`).
* Store projects on native ext4/APFS partitions (e.g. `~/dev/...` or `/var/dev/...`) where filesystem event listeners (`inotify`) and write speeds are instant.

### Solution C: Global Git/Shell Helper or Environment Script
Create a shell function in your `~/.bashrc` or `~/.zshrc`:
```bash
next-fast-dev() {
  PROJECT_NAME=$(basename "$PWD")
  mkdir -p "/tmp/${PROJECT_NAME}-next"
  if [ ! -L .next ]; then
    rm -rf .next
    ln -s "/tmp/${PROJECT_NAME}-next" .next
  fi
  npx next dev --turbopack "$@"
}
```
Then run `next-fast-dev` in any Next.js project directory.
