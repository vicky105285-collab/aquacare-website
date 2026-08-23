"use client";

import React, { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Plus, ImageIcon, Eye, CheckCircle2, Film } from "lucide-react";
import type { SessionUser } from "@/lib/auth";

interface GalleryItemAdmin {
  id: string;
  title: string;
  category: string;
  mediaType: "IMAGE" | "VIDEO";
  mediaUrl: string;
  caption?: string;
  album?: string;
}

export default function AdminGalleryPage() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [items, setItems] = useState<GalleryItemAdmin[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("RO Installations");
  const [mediaUrl, setMediaUrl] = useState("/products/7-wave-krystal.webp");
  const [caption, setCaption] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const meRes = await fetch("/api/admin/auth/me");
        if (meRes.ok) setUser((await meRes.json()).user);

        const res = await fetch("/api/admin/gallery");
        if (res.ok) setItems(await res.json());
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category, mediaUrl, caption }),
      });

      if (res.ok) {
        setMessage("Gallery item added successfully!");
        setIsAdding(false);
        setTitle("");
        const listRes = await fetch("/api/admin/gallery");
        if (listRes.ok) setItems(await listRes.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout user={user}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">Installation Gallery Management</h1>
            <p className="text-xs text-slate-400">
              Manage installation photos, industrial project showcases & video walkthroughs
            </p>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs rounded-xl hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" /> {isAdding ? "Close Form" : "Add Gallery Asset"}
          </button>
        </div>

        {message && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {message}
          </div>
        )}

        {isAdding && (
          <form onSubmit={handleCreate} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">New Installation Showcase</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Title / Location</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 100 LPH RO Installation in Reddipalayam Karur"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
                >
                  <option value="RO Installations">RO Installations</option>
                  <option value="Industrial Projects">Industrial Projects</option>
                  <option value="Solar Installations">Solar Installations</option>
                  <option value="Service Visits">Service Visits</option>
                  <option value="Customer Testimonials">Customer Testimonials</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Media URL</label>
                <input
                  type="text"
                  required
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Caption / Description</label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g. Commercial 500 LPH RO commissioning for school"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-5 py-3 bg-cyan-500 text-slate-950 font-black text-xs rounded-xl hover:bg-cyan-400"
            >
              Add Gallery Item
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group">
              <div className="aspect-video bg-slate-950 relative">
                <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-slate-950/80 text-cyan-400 text-[10px] font-bold rounded">
                  {item.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white text-xs">{item.title}</h3>
                <p className="text-[11px] text-slate-400 mt-1">{item.caption || "Installation showcase"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
