"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle, MessageCircle, ArrowLeft, ShieldCheck, Truck, Wrench, Droplets, Layers, Archive } from "lucide-react";
import type { ProductItem } from "@/lib/site/types";
import { ProductCard } from "@/components/ProductCard";
import { AnimatedSection } from "@/components/AnimatedSection";

export type ProductDetailViewProps = {
  product: ProductItem;
  relatedProducts: ProductItem[];
  categoryTitle: string;
  categorySlug: string;
  whatsappHref: string;
};

export function ProductDetailView({ product, relatedProducts, categoryTitle, categorySlug, whatsappHref }: ProductDetailViewProps) {
  // Pre-fill WhatsApp message
  const encodedMessage = encodeURIComponent(`Hi, I'm interested in the ${product.name} (${product.brand}). Can you provide more details?`);
  const finalWhatsappHref = `${whatsappHref}?text=${encodedMessage}`;

  return (
    <article className="bg-slate-50 min-h-screen pb-20">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex text-sm text-slate-500 font-medium" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="hover:text-cyan-600 transition-colors">Home</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-slate-300">/</span>
                  <Link href="/products" className="hover:text-cyan-600 transition-colors">Products</Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-slate-300">/</span>
                  <Link href={`/products/${categorySlug}`} className="hover:text-cyan-600 transition-colors">{categoryTitle}</Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-slate-300">/</span>
                  <span className="text-slate-800">{product.name}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <Link href="/products" className="inline-flex items-center text-sm font-semibold text-cyan-600 hover:text-cyan-700 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Catalog
        </Link>

        {/* Main Product Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-16">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-12">
            
            {/* Left: Image */}
            <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl aspect-square overflow-hidden flex items-center justify-center p-8 border border-slate-100">
              <span className="absolute top-4 left-4 z-10 px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold rounded-full shadow-md">
                {product.tag}
              </span>
              <div className="relative w-full h-full">
                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>

            {/* Right: Details */}
            <div className="flex flex-col justify-center">
              <p className="text-cyan-600 font-bold tracking-widest uppercase mb-2">{product.brand}</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-800 leading-tight mb-4">
                {product.name}
              </h1>
              
              <div className="text-3xl font-black text-blue-700 mb-8">
                {product.price}
                {product.mrp && <span className="text-lg text-slate-400 line-through ml-3 font-medium">{product.mrp}</span>}
              </div>

              {/* Specifications Grid */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
                  <Droplets className="w-5 h-5 text-blue-500 mx-auto mb-1.5" aria-hidden />
                  <p className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider mb-1">Capacity</p>
                  <p className="font-bold text-slate-800 text-sm">{product.liters}</p>
                </div>
                <div className="bg-cyan-50 p-4 rounded-xl border border-cyan-100 text-center">
                  <Layers className="w-5 h-5 text-cyan-500 mx-auto mb-1.5" aria-hidden />
                  <p className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider mb-1">Stages</p>
                  <p className="font-bold text-slate-800 text-sm">{product.stages}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                  <Archive className="w-5 h-5 text-slate-400 mx-auto mb-1.5" aria-hidden />
                  <p className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider mb-1">Tank</p>
                  <p className="font-bold text-slate-800 text-sm">{product.tank}</p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-10 flex-1">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-600">
                      <CheckCircle className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA & Trust Badges */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <a
                  href={finalWhatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-lg font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-green-500/20"
                >
                  <MessageCircle className="w-6 h-6" /> Inquire via WhatsApp
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-5 mt-4 pt-4 border-t border-slate-100 text-sm font-medium">
                <span className="flex items-center gap-1.5 text-green-700"><ShieldCheck className="w-4 h-4 text-green-500" /> Genuine Brand</span>
                <span className="flex items-center gap-1.5 text-blue-700"><Truck className="w-4 h-4 text-blue-500" /> Fast Delivery</span>
                <span className="flex items-center gap-1.5 text-amber-700"><Wrench className="w-4 h-4 text-amber-500" /> Free Installation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <AnimatedSection className="mb-10 text-center">
              <h2 className="text-2xl md:text-3xl font-black text-slate-800">
                Similar <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Products</span>
              </h2>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p, i) => (
                <AnimatedSection key={`${p.name}-${i}`} delay={i * 80}>
                  <ProductCard product={p} enquiryWhatsappHref={whatsappHref} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
