"use client";

import { useState, useMemo } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ProductCard } from "@/components/ProductCard";
import type { ProductItem, ProductCategory } from "@/lib/site/types";
import { Search, SlidersHorizontal } from "lucide-react";

export type ProductCatalogProps = {
  items: ProductItem[];
  categories: ProductCategory[];
  enquiryWhatsappHref: string;
  initialCategory?: string;
};

const ITEMS_PER_PAGE = 12;

export function ProductCatalog({ items, categories, enquiryWhatsappHref, initialCategory = "all" }: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || item.categoryId === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const handleLoadMore = () => setVisibleCount((prev) => prev + ITEMS_PER_PAGE);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  // Count per category for badges
  const countForCat = (catId: string) =>
    catId === "all"
      ? items.length
      : items.filter((i) => i.categoryId === catId).length;

  return (
    <section className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Filter Bar */}
        <div className="mb-10 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-slate-100 p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center">

            {/* Search */}
            <div className="relative w-full sm:w-72 flex-shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by name or brand…"
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:bg-white transition-all"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(ITEMS_PER_PAGE);
                }}
              />
            </div>

            {/* Divider */}
            <div className="hidden sm:block h-8 w-px bg-slate-200 flex-shrink-0" />

            {/* Category Pills with overflow fade */}
            <div className="relative flex-1 min-w-0">
              <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
                {[{ id: "all", title: "All Products" }, ...categories].map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  const count = countForCat(cat.id);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`whitespace-nowrap flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/25"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800"
                      }`}
                    >
                      {cat.title}
                      <span
                        className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${
                          isActive ? "bg-white/25 text-white" : "bg-white text-slate-500"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
              {/* Right fade mask */}
              <div className="absolute right-0 top-0 bottom-0.5 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            </div>

            {/* Filter icon (decorative) */}
            <div className="hidden lg:flex items-center gap-1.5 text-slate-400 text-xs flex-shrink-0">
              <SlidersHorizontal className="w-4 h-4" />
              <span>{filteredItems.length} results</span>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">No products found</h3>
            <p className="text-slate-400 mt-1.5 text-sm">Try adjusting your search or category filter.</p>
            <button
              onClick={() => { setSearchQuery(""); handleCategoryChange("all"); }}
              className="mt-6 px-6 py-2.5 bg-cyan-50 text-cyan-700 rounded-xl font-semibold text-sm hover:bg-cyan-100 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleItems.map((p, i) => (
                <AnimatedSection key={`${p.name}-${i}`} delay={(i % ITEMS_PER_PAGE) * 40}>
                  <ProductCard product={p} enquiryWhatsappHref={enquiryWhatsappHref} priority={i < 4} />
                </AnimatedSection>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="mt-14 text-center">
                <button
                  onClick={handleLoadMore}
                  className="inline-flex items-center gap-3 px-8 py-3.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl text-sm hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm active:scale-[0.98] transition-all duration-200"
                >
                  Load More Products
                  <span className="bg-slate-100 text-slate-500 text-xs font-bold px-2 py-0.5 rounded-full">
                    +{filteredItems.length - visibleItems.length}
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
