"use client";

import React, { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Plus, Package, Eye, Sparkles, CheckCircle2, Search } from "lucide-react";
import type { SessionUser } from "@/lib/auth";
import type { ProductItem } from "@/lib/site/types";

export default function AdminProductsPage() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");

  // Form State
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("YUVANTHIKA AQUACARE");
  const [categoryId, setCategoryId] = useState("domestic-ro");
  const [price, setPrice] = useState("₹9,500");
  const [liters, setLiters] = useState("12L/Hr");
  const [stages, setStages] = useState("6 Stage");
  const [tank, setTank] = useState("8L Tank");
  const [image, setImage] = useState("/products/7-wave-krystal.webp");
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const meRes = await fetch("/api/admin/auth/me");
        if (meRes.ok) setUser((await meRes.json()).user);

        const res = await fetch("/api/admin/products");
        if (res.ok) setProducts(await res.json());
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, brand, categoryId, price, liters, stages, tank, image, featured }),
      });

      if (res.ok) {
        setMessage("Product added to catalog successfully!");
        setIsAdding(false);
        setName("");
        const listRes = await fetch("/api/admin/products");
        if (listRes.ok) setProducts(await listRes.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout user={user}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">Product Catalog Management</h1>
            <p className="text-xs text-slate-400">
              Manage domestic RO, commercial plants, water softeners & solar systems ({products.length} total items)
            </p>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs rounded-xl hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" /> {isAdding ? "Close Form" : "Add New Product"}
          </button>
        </div>

        {message && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {message}
          </div>
        )}

        {isAdding && (
          <form onSubmit={handleCreateProduct} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Add Product Entry
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Yuvanthika Crystal Alkaline RO"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Brand Name</label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
                >
                  <option value="domestic-ro">Domestic RO</option>
                  <option value="commercial-ro">Commercial RO</option>
                  <option value="industrial">Industrial Water Systems</option>
                  <option value="solar">Solar Water Heaters</option>
                  <option value="softeners">Water Softeners</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Price Display</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Image URL</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-5 py-3 bg-cyan-500 text-slate-950 font-black text-xs rounded-xl hover:bg-cyan-400"
            >
              Save Product
            </button>
          </form>
        )}

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products by name or brand..."
            className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Product Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">Product Name</th>
                  <th className="px-6 py-3.5">Brand</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Price</th>
                  <th className="px-6 py-3.5">Specs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProducts.slice(0, 15).map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="px-6 py-3.5 font-bold text-white">{p.name}</td>
                    <td className="px-6 py-3.5 text-cyan-400 font-semibold">{p.brand}</td>
                    <td className="px-6 py-3.5 text-slate-400">{p.categoryId}</td>
                    <td className="px-6 py-3.5 font-black text-white">{p.price}</td>
                    <td className="px-6 py-3.5 text-slate-400">
                      {[p.stages, p.liters, p.tank].filter(Boolean).join(" • ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
