"use client";

import React, { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Download, Phone, MessageSquare } from "lucide-react";
import type { SessionUser } from "@/lib/auth";

interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  serviceRequired: string;
  message?: string;
  status: "NEW" | "CONTACTED" | "CLOSED";
  createdAt: string;
}

export default function AdminLeadsPage() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [analytics, setAnalytics] = useState({ totalLeads: 0, todayLeads: 0, monthlyLeads: 0 });
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    async function load() {
      try {
        const meRes = await fetch("/api/admin/auth/me");
        if (meRes.ok) setUser((await meRes.json()).user);

        const res = await fetch("/api/admin/leads");
        if (res.ok) {
          const data = await res.json();
          setLeads(data.leads || []);
          setAnalytics(data.analytics || { totalLeads: 0, todayLeads: 0, monthlyLeads: 0 });
        }
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  const filteredLeads = leads.filter((l) => (statusFilter === "ALL" ? true : l.status === statusFilter));

  return (
    <AdminLayout user={user}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">Lead Management & Customer Enquiries</h1>
            <p className="text-xs text-slate-400">
              Track, call, and manage incoming customer service & product requests across Tamil Nadu
            </p>
          </div>
          <a
            href="/api/admin/leads?format=csv"
            className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs rounded-xl shadow-md"
          >
            <Download className="w-4 h-4" /> Export All Leads CSV
          </a>
        </div>

        {/* Analytics Header */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Enquiries</span>
            <p className="text-3xl font-black text-white mt-2">{analytics.totalLeads}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="text-xs font-bold text-emerald-400 uppercase">Today&apos;s Leads</span>
            <p className="text-3xl font-black text-white mt-2">{analytics.todayLeads}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="text-xs font-bold text-cyan-400 uppercase">This Month</span>
            <p className="text-3xl font-black text-white mt-2">{analytics.monthlyLeads}</p>
          </div>
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-2">
          {["ALL", "NEW", "CONTACTED", "CLOSED"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === st
                  ? "bg-cyan-500 text-slate-950 shadow-md"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
              }`}
            >
              {st} {st === "ALL" ? `(${leads.length})` : ""}
            </button>
          ))}
        </div>

        {/* Leads Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">Customer</th>
                  <th className="px-6 py-3.5">Phone & Actions</th>
                  <th className="px-6 py-3.5">Service Required</th>
                  <th className="px-6 py-3.5">Customer Message</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-800/40">
                    <td className="px-6 py-4">
                      <p className="font-bold text-white text-sm">{lead.name}</p>
                      {lead.email && <p className="text-[11px] text-slate-400">{lead.email}</p>}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-mono font-bold text-cyan-400">{lead.phone}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <a
                          href={`tel:${lead.phone.replace(/[^0-9+]/g, "")}`}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-[10px] font-bold rounded flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" /> Call
                        </a>
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          className="px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded flex items-center gap-1"
                        >
                          <MessageSquare className="w-3 h-3" /> WhatsApp
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">{lead.serviceRequired}</td>
                    <td className="px-6 py-4 text-slate-400 max-w-xs truncate">{lead.message || "Direct Form Inquiry"}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 text-[10px] font-bold rounded-full border ${
                          lead.status === "NEW"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : lead.status === "CONTACTED"
                            ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                            : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        }`}
                      >
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
