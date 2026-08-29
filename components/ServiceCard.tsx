"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { ServiceItem } from "@/lib/site/types";

export type ServiceCardProps = {
  service: ServiceItem;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const href = `/services/${service.slug}`;
  const reduce = useReducedMotion();
  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 border border-slate-100 hover:border-cyan-200 transition-[box-shadow,border-color] duration-300 h-full flex flex-col"
    >
      <div
        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        <service.icon className="w-7 h-7 text-white" aria-hidden />
      </div>
      <h3 className="font-bold text-slate-800 text-lg leading-tight">{service.title}</h3>
      <p className="text-cyan-600 text-xs font-medium mt-0.5 mb-3" lang="ta">
        {service.tamil}
      </p>
      <p className="text-slate-500 text-sm leading-relaxed flex-1">{service.desc}</p>
      <Link
        href={href}
        aria-label={`Learn more about ${service.title}`}
        className="mt-4 text-blue-600 text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 rounded-lg"
      >
        Learn More <ArrowRight className="w-3.5 h-3.5" aria-hidden />
      </Link>
    </motion.article>
  );
}
