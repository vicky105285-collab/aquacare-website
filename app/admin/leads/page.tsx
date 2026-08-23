"use client";
/* eslint-disable @next/next/no-html-link-for-pages */

import React, { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Download, Phone, MessageSquare, Trash2, Bot, TrendingUp, Sparkles } from "lucide-react";
import type { SessionUser } from "@/lib/auth";

interface LeadItem {
  id: string;
  name: string;
  phone: string;
  location?: string;
  serviceRequired: string;
  message?: string;
  status: "NEW" | "CONTACTED" | "CLOSED";
  createdAt: string;
}

export default function AdminLeadsPage() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [analytics, setAnalytics] = useState({
    totalConversations: 0,
    totalLeads: 0,
    conversionRate: "0.0%",
    newLeadsCount: 0,
  });
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [message, setMessage] = useState("");

  const fetchLeadsData = async () => {
    try {
      const res = await fetch("/api/admin/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
        if (data.analytics) setAnalytics(data.analytics);
      }
    } catch (e) {
      console.error("Failed to fetch leads:", e);
    }
  };

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const meRes = await fetch("/api/admin/auth/me");
        if (meRes.ok && isMounted) setUser((await meRes.json()).user);

        const res = await fetch("/api/admin/leads");
        if (res.ok && isMounted) {
          const data = await res.json();
          setLeads(data.leads || []);
          if (data.analytics) setAnalytics(data.analytics);
        }
      } catch (e) {
        console.error(e);
      }
    }
    load();
    return () => { isMounted = false; };
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: "NEW" | "CONTACTED" | "CLOSED") => {
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setMessage(`Lead status updated to ${newStatus}`);
        await fetchLeadsData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteLead = async (id: string, leadName: string) => {
    if (!confirm(`Are you sure you want to delete lead entry for ${leadName}?`)) return;

    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage(`Lead for ${leadName} removed.`);
        await fetchLeadsData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredLeads = leads.filter((l) => (statusFilter === "ALL" ? true : l.status === statusFilter));

  return (
    <AdminLayout user={user}>
      <div className="space-y-6">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Bot className="w-6 h-6 text-cyan-400" /> AI Lead Agent & Customer Enquiries
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Live chatbot conversation tracking, lead generation analytics, and direct customer phone/WhatsApp outreach
            </p>
          </div>
          <a
            href="/api/admin/leads?format=csv"
            className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs rounded-xl shadow-lg hover:from-cyan-400 hover:to-blue-500 transition-all"
          >
            <Download className="w-4 h-4" /> Export All Leads CSV
          </a>
        </div>

        {message && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-bold">
            {message}
          </div>
        )}

        {/* CRO Analytics Dashboard Header Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Conversations</span>
              <Bot className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-3xl font-black text-white mt-3">{analytics.totalConversations}</p>
            <p className="text-[11px] text-slate-500 mt-1">Website AI Chatbot interactions</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Leads Generated</span>
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-3xl font-black text-emerald-400 mt-3">{analytics.totalLeads}</p>
            <p className="text-[11px] text-emerald-500/80 mt-1">{analytics.newLeadsCount} new leads pending</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Conversion Rate</span>
              <TrendingUp className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-3xl font-black text-purple-400 mt-3">{analytics.conversionRate}</p>
            <p className="text-[11px] text-purple-500/80 mt-1">Visitors to captured lead ratio</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Target Area</span>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            </div>
            <p className="text-xl font-black text-white mt-3">Karur & Tamil Nadu</p>
            <p className="text-[11px] text-amber-400/80 mt-1">Same-Day Service Response</p>
          </div>
        </div>

        {/* Status Filter Bar */}
        <div className="flex items-center gap-2 pt-2">
          {["ALL", "NEW", "CONTACTED", "CLOSED"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                statusFilter === st
                  ? "bg-cyan-500 text-slate-950 shadow-md scale-105"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
              }`}
            >
              {st} {st === "ALL" ? `(${leads.length})` : ""}
            </button>
          ))}
        </div>

        {/* Leads Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">Customer Name</th>
                  <th className="px-6 py-3.5">Phone & Actions</th>
                  <th className="px-6 py-3.5">Requirement</th>
                  <th className="px-6 py-3.5">Enquiry Details</th>
                  <th className="px-6 py-3.5">Lead Status</th>
                  <th className="px-6 py-3.5 text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-white text-sm">{lead.name}</p>
                      <p className="text-[11px] text-cyan-400 font-mono mt-0.5">{lead.location || "Karur"}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-mono font-bold text-white text-xs">{lead.phone}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <a
                          href={`tel:${lead.phone.replace(/[^0-9+]/g, "")}`}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[10px] font-bold rounded-lg flex items-center gap-1 transition-colors"
                        >
                          <Phone className="w-3 h-3 text-cyan-400" /> Call
                        </a>
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${lead.name}, thank you for reaching out to Yuvanthika Aquacare & Solar Care Systems regarding ${lead.serviceRequired}. How can we assist you today?`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] font-bold rounded-lg flex items-center gap-1 transition-colors"
                        >
                          <MessageSquare className="w-3 h-3" /> WhatsApp
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">{lead.serviceRequired}</td>
                    <td className="px-6 py-4 text-slate-400 max-w-xs leading-relaxed text-xs">
                      {lead.message || "Direct Form Inquiry"}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateStatus(lead.id, e.target.value as "NEW" | "CONTACTED" | "CLOSED")}
                        className={`px-3 py-1 text-[11px] font-bold rounded-xl border focus:outline-none bg-slate-950 ${
                          lead.status === "NEW"
                            ? "text-amber-400 border-amber-500/30"
                            : lead.status === "CONTACTED"
                            ? "text-cyan-400 border-cyan-500/30"
                            : "text-emerald-400 border-emerald-500/30"
                        }`}
                      >
                        <option value="NEW" className="bg-slate-900 text-amber-400">NEW</option>
                        <option value="CONTACTED" className="bg-slate-900 text-cyan-400">CONTACTED</option>
                        <option value="CLOSED" className="bg-slate-900 text-emerald-400">CLOSED</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteLead(lead.id, lead.name)}
                        className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete lead entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
