"use client";

import React from "react";
import Image from "next/image";
import { X, Check, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import type { ProductItem } from "@/lib/site/types";
import { buildWhatsAppUrl } from "@/lib/site/constants";

export type ProductComparisonModalProps = {
  isOpen: boolean;
  onClose: () => void;
  products: ProductItem[];
  onRemoveProduct: (slugOrName: string) => void;
};

export function ProductComparisonModal({
  isOpen,
  onClose,
  products,
  onRemoveProduct,
}: ProductComparisonModalProps) {
  if (!isOpen || products.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Product Spec Comparison
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Compare Selected Products ({products.length}/3)
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close comparison modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="p-4 text-xs font-bold uppercase text-slate-400 w-44 bg-slate-950/40 rounded-l-xl">
                  Specification
                </th>
                {products.map((p) => {
                  const key = p.slug || p.name;
                  const wa = buildWhatsAppUrl(`Hi, I compared "${p.name}" and would like a price quotation.`);
                  return (
                    <th key={key} className="p-4 bg-slate-950/20 text-center relative min-w-[200px]">
                      <button
                        type="button"
                        onClick={() => onRemoveProduct(key)}
                        className="absolute top-2 right-2 p-1 text-slate-500 hover:text-red-400 rounded-full"
                        title="Remove product"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div className="relative h-28 w-full mb-3 bg-white p-2 rounded-xl border border-slate-700 flex items-center justify-center overflow-hidden">
                        <Image
                          src={p.img}
                          alt={p.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>

                      <h4 className="font-bold text-sm text-white line-clamp-2 leading-snug">{p.name}</h4>
                      <p className="text-xs text-cyan-400 font-semibold mt-1">Price: Contact Us</p>

                      <a
                        href={wa}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-green-500 hover:bg-green-400 text-white font-bold text-xs shadow-md transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> Request Quote
                      </a>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
              <tr>
                <td className="p-4 font-bold text-slate-400 bg-slate-950/40">Category</td>
                {products.map((p) => (
                  <td key={p.slug || p.name} className="p-4 text-center font-medium text-white">{p.tag || p.categoryId}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400 bg-slate-950/40">Purification Capacity</td>
                {products.map((p) => (
                  <td key={p.slug || p.name} className="p-4 text-center font-semibold text-cyan-400">{p.liters}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400 bg-slate-950/40">Purification Stages</td>
                {products.map((p) => (
                  <td key={p.slug || p.name} className="p-4 text-center">{p.stages}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400 bg-slate-950/40">Storage Tank Capacity</td>
                {products.map((p) => (
                  <td key={p.slug || p.name} className="p-4 text-center">{p.tank}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400 bg-slate-950/40">Suitable Water TDS</td>
                {products.map((p) => (
                  <td key={p.slug || p.name} className="p-4 text-center">{p.suitableTds || "Up to 2500 PPM"}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400 bg-slate-950/40">Power Consumption</td>
                {products.map((p) => (
                  <td key={p.slug || p.name} className="p-4 text-center">{p.powerConsumption || "60W - Low Power"}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400 bg-slate-950/40">Installation Type</td>
                {products.map((p) => (
                  <td key={p.slug || p.name} className="p-4 text-center">{p.installationType || "Wall Mount / Table Top"}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400 bg-slate-950/40">Warranty</td>
                {products.map((p) => (
                  <td key={p.slug || p.name} className="p-4 text-center font-semibold text-emerald-400">
                    <div className="flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{p.warranty || "1 Year Comprehensive"}</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400 bg-slate-950/40">Recommended Usage</td>
                {products.map((p) => (
                  <td key={p.slug || p.name} className="p-4 text-center">{p.recommendedUsage || "Homes, Offices & Villas"}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400 bg-slate-950/40">Key Features</td>
                {products.map((p) => (
                  <td key={p.slug || p.name} className="p-4 text-center">
                    <ul className="space-y-1 text-[11px] text-slate-300">
                      {p.features.map((f, i) => (
                        <li key={i} className="flex items-center justify-center gap-1">
                          <Check className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Need help picking the right system? Call our technical engineer at <strong>+91 9842423589</strong>.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
