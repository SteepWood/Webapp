export default function Home() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col items-center justify-center overflow-hidden bg-[#1c2b1f] px-6 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,90,43,0.18)_0%,_transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/3 bg-[linear-gradient(to_top,_rgba(0,0,0,0.35),_transparent)]"
      />

      <main className="relative z-10 flex max-w-xl flex-col items-center text-center">
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.35em] text-[#c4a574]">
          SteepWood
        </p>

        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#f5f0e8] sm:text-5xl">
          Something beautiful is taking shape.
        </h1>

        <p className="mt-6 max-w-md text-lg leading-relaxed text-[#b8c4b0]">
          We&apos;re crafting our new home on the web. Check back soon for the
          full SteepWood experience.
        </p>

        <div className="mt-10 h-px w-16 bg-[#8b5a2b]/60" />

        <p className="mt-8 text-sm text-[#8a9a82]">Coming soon &middot; 2026</p>
      </main>
    </div>
  );
}
