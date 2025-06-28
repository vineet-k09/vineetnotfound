// src/app/page.tsx
'use client';
import { useState } from 'react';
import LiquidSplash from '@/components/LiquidSplash';
export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {
          !loaded &&
          <LiquidSplash onFinish={() => setLoaded(true)} />
        }
        {loaded && <p>loading completed</p>}
      </div>
    </>
  );
}
