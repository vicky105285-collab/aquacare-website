import { MapPin } from "lucide-react";

const SERVICE_AREAS = [
  "Karur (HQ)",
  "Namakkal",
  "Erode",
  "Tiruchirappalli",
  "Salem",
  "Dindigul",
  "Tiruppur",
  "Coimbatore",
  "Madurai",
  "Thanjavur",
  "Kulithalai",
  "Aravakurichi",
  "Pugalur",
  "Tiruchengode",
  "Perundurai",
];

export function ServiceArea() {
  return (
    <section className="py-16 lg:py-20 bg-blue-900 relative overflow-hidden" aria-labelledby="areas-heading">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 id="areas-heading" className="text-3xl sm:text-4xl font-black text-white mb-4">
          Serving All Districts Across Tamil Nadu
        </h2>
        <p className="text-blue-200 mb-10 max-w-2xl mx-auto text-lg">
          Headquartered in Karur, Yuvanthika Aquacare & Solar Care Systems provides doorstep service, commercial plant installation, and industrial maintenance across Tamil Nadu.
        </p>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-5xl mx-auto">
          {SERVICE_AREAS.map((area) => (
            <div key={area} className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 text-white text-sm font-medium hover:bg-white/20 hover:-translate-y-0.5 transition-all cursor-default">
              <MapPin className="w-4 h-4 text-cyan-400" />
              {area}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

