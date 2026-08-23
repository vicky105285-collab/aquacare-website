"use client";

import React, { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Plus, Wrench, Eye, CheckCircle2 } from "lucide-react";
import type { SessionUser } from "@/lib/auth";

interface ServiceAdminItem {
  id: string;
  name: string;
  slug: string;
  metaDescription?: string;
}

export default function AdminServicesPage() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [services, setServices] = useState<ServiceAdminItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const meRes = await fetch("/api/admin/auth/me");
        if (meRes.ok) setUser((await meRes.json()).user);

        const res = await fetch("/api/admin/services");
        if (res.ok) setServices(await res.json());
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, heroSubtitle: desc }),
      });

      if (res.ok) {
        setMessage("Service page created successfully!");
        setIsAdding(false);
        setName("");
        const listRes = await fetch("/api/admin/services");
        if (listRes.ok) setServices(await listRes.json());
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
            <h1 className="text-2xl font-black text-white">Service Pages & Local SEO Management</h1>
            <p className="text-xs text-slate-400">
              Manage RO service, installation, AMC plans, water softeners & solar pages
            </p>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs rounded-xl shadow-md"
          >
            <Plus className="w-4 h-4" /> {isAdding ? "Close Form" : "Create New Service Page"}
          </button>
        </div>

        {message && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {message}
          </div>
        )}

        {isAdding && (
          <form onSubmit={handleCreate} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Service Title</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. ETP Plant Installation & Maintenance Karur"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Short Description</label>
              <textarea
                rows={2}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 bg-cyan-500 text-slate-950 font-black text-xs rounded-xl hover:bg-cyan-400"
            >
              Create Service Page
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <div key={s.slug} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-white text-base leading-snug">{s.name}</h3>
                <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">{s.metaDescription}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                <code className="text-[11px] text-cyan-400">/services/{s.slug}</code>
                <a
                  href={`/services/${s.slug}`}
                  target="_blank"
                  className="px-3 py-1.5 bg-slate-800 text-cyan-400 text-xs font-bold rounded-lg flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" /> View Page
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
