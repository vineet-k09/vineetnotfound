'use client';
import FluidGlass from './components/fluidGlass';

export default function Home() {
  return (
    <>
      {/* 👻 GLASS OVERLAY */}
      <div
        className="glass"
        style={{
          zIndex: 10,
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none', // important if you want clicks to go through
        }}
      >
        <FluidGlass
          mode="lens"
          lensProps={{
            scale: 0.12,
            ior: 1.15,
            thickness: 1,
            chromaticAberration: 0.0001,
            anisotropy: 0.00001,
          }}
        />
      </div>

      {/* 🧱 NORMAL PAGE CONTENT */}
      <main
        className="content"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '2rem',
          // background: 'white',
        }}
      >
        <h1 style={{ color: 'black' }}>Hello this is Vineet</h1>
      </main>
    </>
  );
}
