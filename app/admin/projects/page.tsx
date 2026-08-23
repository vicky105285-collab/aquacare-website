"use client";

import React, { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Plus, Briefcase, Eye, Sparkles, CheckCircle2, Star } from "lucide-react";
import type { SessionUser } from "@/lib/auth";
import type { ProjectItem } from "@/lib/site/types";

export default function AdminProjectsPage() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");

  // Form State
  const [projectTitle, setProjectTitle] = useState("");
  const [projectType, setProjectType] = useState("Industrial RO Plant");
  const [location, setLocation] = useState("Karur");
  const [district, setDistrict] = useState("Karur");
  const [customerCategory, setCustomerCategory] = useState<"residential" | "commercial" | "industrial">("industrial");
  const [industryType, setIndustryType] = useState("Textile Processing");
  const [capacity, setCapacity] = useState("50,000 LPH");
  const [problemFaced, setProblemFaced] = useState("");
  const [solutionProvided, setSolutionProvided] = useState("");
  const [featured, setFeatured] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const meRes = await fetch("/api/admin/auth/me");
        if (meRes.ok) setUser((await meRes.json()).user);

        const res = await fetch("/api/admin/projects");
        if (res.ok) setProjects(await res.json());
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectTitle,
          projectType,
          location,
          district,
          customerCategory,
          industryType,
          capacity,
          problemFaced,
          solutionProvided,
          featured,
        }),
      });

      if (res.ok) {
        setMessage("Project Case Study created & published successfully!");
        setIsAdding(false);
        setProjectTitle("");
        setProblemFaced("");
        setSolutionProvided("");
        const listRes = await fetch("/api/admin/projects");
        if (listRes.ok) setProjects(await listRes.json());
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
            <h1 className="text-2xl font-black text-white">Project Case Study Management</h1>
            <p className="text-xs text-slate-400">
              Create detailed project entries with customer requirements, equipment specs, and auto-generated social content packs
            </p>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs rounded-xl hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" /> {isAdding ? "Close Form" : "Create New Case Study"}
          </button>
        </div>

        {message && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {message}
          </div>
        )}

        {isAdding && (
          <form onSubmit={handleCreateProject} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Project Case Study Generator
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g. 50,000 LPH Industrial RO Plant for Textile Dyeing"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Customer Category</label>
                <select
                  value={customerCategory}
                  onChange={(e) => setCustomerCategory(e.target.value as "residential" | "commercial" | "industrial")}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
                >
                  <option value="industrial">Industrial</option>
                  <option value="commercial">Commercial</option>
                  <option value="residential">Residential</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">District</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Capacity</label>
                <input
                  type="text"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Problem Faced by Customer</label>
              <textarea
                rows={3}
                value={problemFaced}
                onChange={(e) => setProblemFaced(e.target.value)}
                placeholder="High TDS (3,200 PPM), hard water scaling in boilers..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Solution Provided</label>
              <textarea
                rows={3}
                value={solutionProvided}
                onChange={(e) => setSolutionProvided(e.target.value)}
                placeholder="Designed high-pressure 50 KLD RO system with anti-scalant dosing..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="feat"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 text-cyan-500 rounded bg-slate-950 border-slate-800"
              />
              <label htmlFor="feat" className="text-xs font-bold text-slate-300">
                Mark as Featured Project on Homepage Showcase
              </label>
            </div>

            <button
              type="submit"
              className="px-5 py-3 bg-cyan-500 text-slate-950 font-black text-xs rounded-xl hover:bg-cyan-400"
            >
              Publish Project Case Study
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((proj) => (
            <div key={proj.slug} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 bg-slate-800 text-cyan-400 text-[10px] font-bold uppercase rounded">
                    {proj.customerCategory}
                  </span>
                  {proj.featured && (
                    <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold rounded flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400" /> Featured
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-white text-base leading-snug">{proj.projectTitle}</h3>
                <p className="text-xs text-slate-400 mt-1">📍 {proj.location} ({proj.district}) • {proj.capacity}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                <code className="text-[11px] text-slate-500">/projects/{proj.slug}</code>
                <a
                  href={`/projects/${proj.slug}`}
                  target="_blank"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold rounded-lg flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" /> View
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
