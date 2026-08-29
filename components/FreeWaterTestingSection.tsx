"use client";

import React, { useState } from "react";
import { Droplets, CheckCircle2, Phone, Sparkles, Send } from "lucide-react";
import { PHONE_DISPLAY } from "@/lib/site/constants";
import { formatWhatsAppLeadMessage } from "@/lib/ai-agent";

export function FreeWaterTestingSection({ className = "" }: { className?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("Karur");
  const [waterSource, setWaterSource] = useState("Borewell Water");
  const [requirement, setRequirement] = useState("Hard Water Softener");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Save Lead to PostgreSQL Database
      await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Water Test Visitor",
          phone,
          location,
          serviceRequired: `Free Water Quality Test (${waterSource} - ${requirement})`,
          message: `Water Source: ${waterSource}. Requirement: ${requirement}. Location: ${location}. Source: Free Water Test Section`,
        }),
      });

      setIsSubmitted(true);

      // 2. Format WhatsApp Redirect Message
      const message = formatWhatsAppLeadMessage({
        name: name || "Water Test Visitor",
        phone,
        location,
        requirement: `FREE Water Quality Testing Booking (Source: ${waterSource}, Interest: ${requirement})`,
        currentPage: typeof window !== "undefined" ? window.location.href : "https://yuvanthikaaquasolar.in",
      });

      const waUrl = `https://wa.me/919842423589?text=${encodeURIComponent(message)}`;
      window.open(waUrl, "_blank");
    } catch (err) {
      console.error("Free water test submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`py-16 bg-gradient-to-br from-cyan-950 via-slate-900 to-blue-950 text-white relative overflow-hidden ${className}`} id="free-water-testing">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column — Value Proposition */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Droplets className="w-4 h-4 text-cyan-400" /> Free Doorstep Service
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Book Free Water Quality Testing at Your Doorstep
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Wondering why your water causes hair fall, white limescale, or bad taste? Our Karur technical team conducts on-site TDS, pH, and hardness testing across Karur, Namakkal, and Erode — <strong>100% Free of Charge with zero obligation</strong>.
            </p>

            <div className="space-y-3 pt-2 text-left">
              {[
                "Instant On-Site TDS & Hardness PPM Measurement",
                "Customized RO vs. Water Softener Recommendation",
                "Zero Dues or Hidden Fees — 100% Free Home Survey",
                "Same-Day Doorstep Technician Visit in Karur Town",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center justify-between text-xs text-slate-400">
              <span>Prefer Direct Phone Booking?</span>
              <a href="tel:+919842423589" className="font-bold text-cyan-400 hover:underline flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          {/* Right Column — Lead Capture Form */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-xl">
            <div className="mb-6">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" /> Schedule Your Free Water Test
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Fill details below — our lead engineer will confirm your visit time via phone/WhatsApp.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="font-black text-lg text-white">Water Test Booking Received!</h4>
                <p className="text-xs text-slate-300">
                  Thank you, <strong>{name}</strong>! Our technician will call you shortly to confirm doorstep inspection in <strong>{location}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 bg-slate-800 text-xs font-bold text-slate-300 rounded-xl hover:bg-slate-700"
                >
                  Book Another Test
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., K. Vignesh"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g., 9842423589"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Location / Area
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g., Karur Town"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="fwt-water-source" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Water Source
                    </label>
                    <select
                      id="fwt-water-source"
                      value={waterSource}
                      onChange={(e) => setWaterSource(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Borewell Water">Borewell Water</option>
                      <option value="Corporation Water">Corporation Water</option>
                      <option value="Mixed Well Water">Mixed Well Water</option>
                      <option value="Industrial Tanker">Industrial Tanker</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="fwt-requirement" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    System Requirement
                  </label>
                  <select
                    id="fwt-requirement"
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Hard Water Softener">Hard Water Softener</option>
                    <option value="RO Water Purifier">RO Water Purifier</option>
                    <option value="Solar Water Heater">Solar Water Heater</option>
                    <option value="Industrial RO Plant">Industrial RO Plant</option>
                    <option value="Service & Maintenance">Service & Maintenance</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-slate-950 font-black text-sm shadow-xl hover:from-cyan-400 hover:to-blue-500 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Booking Your Test..." : "Book Free Doorstep Water Test"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
