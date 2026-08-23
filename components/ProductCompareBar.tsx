"use client";

import React from "react";
import { SlidersHorizontal, Trash2, ArrowRight } from "lucide-react";
import type { ProductItem } from "@/lib/site/types";

export type ProductCompareBarProps = {
  selectedProducts: ProductItem[];
  onOpenModal: () => void;
  onClearAll: () => void;
};

export function ProductCompareBar({
  selectedProducts,
  onOpenModal,
  onClearAll,
}: ProductCompareBarProps) {
  if (selectedProducts.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 backdrop-blur-xl border border-cyan-500/40 px-5 py-3 rounded-full shadow-[0_10px_40px_rgba(6,182,212,0.3)] text-white flex items-center gap-4 transition-all duration-300">
      <div className="flex items-center gap-2 text-xs font-bold">
        <SlidersHorizontal className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>Compare Products ({selectedProducts.length}/3)</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenModal}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs shadow-md transition-transform active:scale-95"
        >
          <span>Compare Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={onClearAll}
          className="p-2 text-slate-400 hover:text-red-400 rounded-full transition-colors"
          title="Clear selected products"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
