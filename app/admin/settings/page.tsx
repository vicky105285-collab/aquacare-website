"use client";

import React, { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Settings, Save, CheckCircle2, Globe, MapPin, Phone, Mail, Sparkles } from "lucide-react";
import type { SessionUser } from "@/lib/auth";

export default function AdminSettingsPage() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const meRes = await fetch("/api/admin/auth/me");
        if (meRes.ok) setUser((await meRes.json()).user);

        const res = await fetch("/api/admin/settings");
        if (res.ok) setSettings(await res.json());
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setMessage("Site settings & Homepage content updated successfully!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout user={user}>
      <form onSubmit={handleSave} className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">Global Site Settings & Homepage Control</h1>
            <p className="text-xs text-slate-400">
              Update company NAP, trust badges, phone numbers & homepage hero banner without touching code
            </p>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs rounded-xl hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {saving ? "Saving Changes..." : "Save All Settings"}
          </button>
        </div>

        {message && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {message}
          </div>
        )}

        {/* Business NAP & Contact Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Business Identity & NAP (Name, Address, Phone)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Company Display Name</label>
              <input
                type="text"
                value={settings.companyName || ""}
                onChange={(e) => handleChange("companyName", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Mandatory Trust Phrase</label>
              <input
                type="text"
                value={settings.trustPhrase || ""}
                onChange={(e) => handleChange("trustPhrase", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Display Phone Number</label>
              <input
                type="text"
                value={settings.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp Number</label>
              <input
                type="text"
                value={settings.whatsapp || ""}
                onChange={(e) => handleChange("whatsapp", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Support Email</label>
              <input
                type="text"
                value={settings.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Official Karur Address</label>
            <input
              type="text"
              value={settings.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
            />
          </div>
        </div>

        {/* Homepage Hero Control */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Homepage Hero Banner Control
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Main Headline</label>
            <input
              type="text"
              value={settings.heroHeadline || ""}
              onChange={(e) => handleChange("heroHeadline", e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Hero Subtitle</label>
            <textarea
              rows={2}
              value={settings.heroSubtitle || ""}
              onChange={(e) => handleChange("heroSubtitle", e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
            />
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
