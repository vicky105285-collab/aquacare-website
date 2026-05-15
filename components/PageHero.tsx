export type PageHeroProps = {
  title: string;
  subtitle: string;
  tamilLine?: string;
};

export function PageHero({ title, subtitle, tamilLine }: PageHeroProps) {
  return (
    <header className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900 text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #06b6d4 0%, transparent 50%), radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 40%)",
        }}
        aria-hidden
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-balance">{title}</h1>
        <p className="mt-4 text-lg text-blue-100/90 max-w-3xl mx-auto leading-relaxed text-pretty">{subtitle}</p>
        {tamilLine ? (
          <p className="mt-3 text-sm font-medium text-cyan-300/90" lang="ta">
            {tamilLine}
          </p>
        ) : null}
      </div>
      {/* Wave separator — matches homepage hero */}
      <div className="absolute bottom-0 left-0 right-0 leading-[0]">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" aria-hidden>
          <path
            d="M0 48L60 43C120 38 240 29 360 25.6C480 22 600 26 720 32C840 38 960 48 1080 44.8C1200 41 1320 26 1380 17.6L1440 10V48H0Z"
            fill="white"
          />
        </svg>
      </div>
    </header>
  );
}

