"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Inbox,
  Briefcase,
  Package,
  FileText,
  ImageIcon,
  Plus,
  Download,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Clock,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import type { SessionUser } from "@/lib/auth";

export default function AdminDashboardPage() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [analytics, setAnalytics] = useState({ totalLeads: 0, todayLeads: 0, monthlyLeads: 0 });
  const [recentLeads, setRecentLeads] = useState<Array<{ id: string; name: string; phone: string; serviceRequired: string; status: string; createdAt: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const meRes = await fetch("/api/admin/auth/me");
        if (meRes.ok) {
          const meData = await meRes.json();
          setUser(meData.user);
        }

        const leadsRes = await fetch("/api/admin/leads");
        if (leadsRes.ok) {
          const data = await leadsRes.json();
          setAnalytics(data.analytics || { totalLeads: 0, todayLeads: 0, monthlyLeads: 0 });
          setRecentLeads(data.leads?.slice(0, 5) || []);
        }
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <AdminLayout user={user}>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-bold rounded-full uppercase">
                Yuvanthika CMS v2.0
              </span>
              <span className="text-slate-500 text-xs">• Karur, Tamil Nadu</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Welcome back, {user?.name || "Admin"} 👋
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Manage your website content, customer leads, project case studies & product catalog.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/admin/projects"
              className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs rounded-xl hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 transition-all"
            >
              <Plus className="w-4 h-4" /> Add New Project
            </Link>
            <a
              href="/api/admin/leads?format=csv"
              className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-700 transition-all"
            >
              <Download className="w-4 h-4" /> Export CSV
            </a>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Leads</span>
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <Inbox className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black text-white mt-3">{loading ? "..." : analytics.totalLeads}</p>
            <p className="text-[11px] text-cyan-400 font-semibold mt-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> {analytics.monthlyLeads} new leads this month
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today&apos;s Leads</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black text-white mt-3">{loading ? "..." : analytics.todayLeads}</p>
            <p className="text-[11px] text-emerald-400 font-semibold mt-2">
              Ready for follow up
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Case Studies</span>
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black text-white mt-3">6</p>
            <p className="text-[11px] text-slate-400 mt-2">Karur & Tamil Nadu Projects</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Products</span>
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black text-white mt-3">200+</p>
            <p className="text-[11px] text-purple-400 font-semibold mt-2">All RO & Solar Models</p>
          </div>
        </div>

        {/* Quick Management Shortcuts */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "Add Project", href: "/admin/projects", icon: Briefcase, color: "text-blue-400" },
              { label: "New Blog", href: "/admin/blog", icon: FileText, color: "text-cyan-400" },
              { label: "Upload Media", href: "/admin/media", icon: ImageIcon, color: "text-emerald-400" },
              { label: "Products", href: "/admin/products", icon: Package, color: "text-purple-400" },
              { label: "Service Pages", href: "/admin/services", icon: ShieldCheck, color: "text-amber-400" },
              { label: "Site Settings", href: "/admin/settings", icon: Clock, color: "text-rose-400" },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-4 rounded-xl flex flex-col items-center justify-center text-center group transition-all"
                >
                  <Icon className={`w-6 h-6 mb-2 ${action.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-xs font-semibold text-slate-200">{action.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Enquiries Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Recent Customer Enquiries</h2>
              <p className="text-xs text-slate-400">Leads captured from website contact and booking forms</p>
            </div>
            <Link href="/admin/leads" className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1">
              View All Enquiries <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">Customer Name</th>
                  <th className="px-6 py-3.5">Phone Number</th>
                  <th className="px-6 py-3.5">Service Required</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 font-bold text-white">{lead.name}</td>
                    <td className="px-6 py-4 font-semibold text-cyan-400">{lead.phone}</td>
                    <td className="px-6 py-4 text-slate-300">{lead.serviceRequired}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-bold rounded-full">
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {new Date(lead.createdAt).toLocaleDateString()}
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
