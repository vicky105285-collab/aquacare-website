"use client";

import { useState, useMemo } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ProductCard } from "@/components/ProductCard";
import { ProductCompareBar } from "@/components/ProductCompareBar";
import { ProductComparisonModal } from "@/components/ProductComparisonModal";
import type { ProductItem, ProductCategory } from "@/lib/site/types";
import { Search, SlidersHorizontal, Filter, Check } from "lucide-react";

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

  // Comparison State
  const [comparedProducts, setComparedProducts] = useState<ProductItem[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const handleToggleCompare = (product: ProductItem) => {
    const pKey = product.slug || product.name;
    const exists = comparedProducts.some((p) => (p.slug || p.name) === pKey);

    if (exists) {
      setComparedProducts((prev) => prev.filter((p) => (p.slug || p.name) !== pKey));
    } else {
      if (comparedProducts.length >= 3) {
        alert("You can compare up to 3 products at a time.");
        return;
      }
      setComparedProducts((prev) => [...prev, product]);
    }
  };

  const handleRemoveCompare = (slugOrName: string) => {
    setComparedProducts((prev) => prev.filter((p) => (p.slug || p.name) !== slugOrName));
  };

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

  const allCategoriesList = [{ id: "all", title: "All Products" }, ...categories];

  return (
    <section className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Filter Container */}
        <div className="mb-10 bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-slate-200/80 p-4 sm:p-6 space-y-5">
          
          {/* Top Bar: Search Input & Results Badge */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by product name or brand (e.g. Aqua Shark, Alkaline)..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:bg-white transition-all shadow-inner"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(ITEMS_PER_PAGE);
                }}
              />
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-semibold text-slate-500 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg text-slate-700">
                <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-600" />
                <span>Showing {filteredItems.length} Products</span>
              </span>
              {(searchQuery || selectedCategory !== "all") && (
                <button
                  onClick={() => { setSearchQuery(""); handleCategoryChange("all"); }}
                  className="text-cyan-600 hover:text-cyan-800 text-xs font-bold underline transition-colors"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Category Selector Section */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-cyan-600" /> Filter by Category
              </span>
              
              {/* Mobile Quick Dropdown */}
              <div className="sm:hidden w-full max-w-[200px]">
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full py-1.5 px-2.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                >
                  {allCategoriesList.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title} ({countForCat(cat.id)})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Wrapped Category Pill Buttons — NO HORIZONTAL SCROLLING */}
            <div className="flex flex-wrap gap-2.5">
              {allCategoriesList.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const count = countForCat(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/20 scale-[1.02]"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900 border border-slate-200/60"
                    }`}
                  >
                    {isActive && <Check className="w-3.5 h-3.5 shrink-0 text-cyan-200" />}
                    <span>{cat.title}</span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                        isActive ? "bg-white/20 text-white" : "bg-white text-slate-600 border border-slate-200"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Product Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm px-4">
            <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-cyan-100">
              <Search className="w-6 h-6 text-cyan-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No matching products found</h3>
            <p className="text-slate-500 mt-1.5 text-sm max-w-md mx-auto">
              We couldn’t find any product matching your search criteria. Try selecting a different category or resetting your query.
            </p>
            <button
              onClick={() => { setSearchQuery(""); handleCategoryChange("all"); }}
              className="mt-6 px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-bold text-sm shadow-md hover:from-cyan-500 hover:to-blue-500 transition-all"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleItems.map((p, i) => {
                const pKey = p.slug || p.name;
                const isCompared = comparedProducts.some((cp) => (cp.slug || cp.name) === pKey);
                return (
                  <AnimatedSection key={`${p.name}-${i}`} delay={(i % ITEMS_PER_PAGE) * 40}>
                    <ProductCard 
                      product={p} 
                      enquiryWhatsappHref={enquiryWhatsappHref} 
                      priority={i < 4}
                      onToggleCompare={handleToggleCompare}
                      isCompared={isCompared}
                    />
                  </AnimatedSection>
                );
              })}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-14 text-center">
                <button
                  onClick={handleLoadMore}
                  className="inline-flex items-center gap-3 px-8 py-3.5 bg-white border border-slate-300 text-slate-800 font-bold rounded-2xl text-sm shadow-sm hover:bg-slate-50 hover:border-cyan-400 hover:text-cyan-700 active:scale-[0.98] transition-all duration-200"
                >
                  Load More Products
                  <span className="bg-cyan-100 text-cyan-800 text-xs font-black px-2.5 py-0.5 rounded-full">
                    +{filteredItems.length - visibleItems.length}
                  </span>
                </button>
              </div>
            )}
          </>
        )}

        {/* Product Comparison Floating Bar & Modal */}
        <ProductCompareBar
          selectedProducts={comparedProducts}
          onOpenModal={() => setIsCompareModalOpen(true)}
          onClearAll={() => setComparedProducts([])}
        />

        <ProductComparisonModal
          isOpen={isCompareModalOpen}
          onClose={() => setIsCompareModalOpen(false)}
          products={comparedProducts}
          onRemoveProduct={handleRemoveCompare}
        />
      </div>
    </section>
  );
}
