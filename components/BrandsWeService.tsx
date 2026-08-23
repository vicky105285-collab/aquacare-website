import Image from "next/image";

const BRANDS = [
  { name: "Kent", logo: "https://placehold.co/120x60/f8fafc/0f172a?text=KENT" },
  { name: "Aquaguard", logo: "https://placehold.co/120x60/f8fafc/0f172a?text=Aquaguard" },
  { name: "Havells", logo: "https://placehold.co/120x60/f8fafc/0f172a?text=Havells" },
  { name: "V-Guard", logo: "https://placehold.co/120x60/f8fafc/0f172a?text=V-Guard" },
  { name: "Luminous", logo: "https://placehold.co/120x60/f8fafc/0f172a?text=Luminous" },
  { name: "Blue Star", logo: "https://placehold.co/120x60/f8fafc/0f172a?text=Blue+Star" },
];

export function BrandsWeService() {
  return (
    <section className="py-12 bg-slate-50 border-y border-slate-100" aria-labelledby="brands-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p id="brands-heading" className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">
          Authorized Service & Genuine Spares For Top Brands
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {BRANDS.map((brand) => (
            <div key={brand.name} className="relative w-28 h-12 hover:scale-105 transition-transform">
              <Image
                src={brand.logo}
                alt={`${brand.name} Water Purifier & Solar Service`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
