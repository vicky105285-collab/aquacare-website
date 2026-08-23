"use client";
/* eslint-disable react-hooks/purity */

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { X, Send, Phone, MessageCircle, Sparkles, Bot } from "lucide-react";
import { CALL, PHONE_DISPLAY } from "@/lib/site/constants";
import { formatWhatsAppLeadMessage } from "@/lib/ai-agent";

interface MessageItem {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: { label: string; action: string }[];
  whatsappLink?: string;
  leadCaptured?: boolean;
}

export function AIChatBot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "welcome-01",
      sender: "bot",
      text: "👋 Hello! I am the Yuvanthika AI Lead Assistant. How can I help you today with RO Purifiers, Solar Water Heaters, Water Softeners, or Doorstep Service in Karur?",
      options: [
        { label: "🛠️ Book RO Service Visit", action: "book_service" },
        { label: "💧 Get RO Purifier Quote", action: "ro_quote" },
        { label: "☀️ Solar Water Heater Price", action: "solar_quote" },
        { label: "💎 Hard Water Softeners", action: "softener_quote" },
      ],
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);

  // Form State
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadLocation, setLeadLocation] = useState("");
  const [leadReq, setLeadReq] = useState("RO Water Purifier Quote");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, showLeadForm]);

  const getCurrentPage = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}${pathname}`;
    }
    return pathname || "/";
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const msgId = `user-${Math.random().toString(36).substring(2, 9)}`;
    const userMsg: MessageItem = {
      id: msgId,
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages,
          collectedLeadData: {
            name: leadName,
            phone: leadPhone,
            location: leadLocation,
            requirement: leadReq,
            currentPage: getCurrentPage(),
          },
        }),
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        const botMsg: MessageItem = {
          id: `bot-${Math.random().toString(36).substring(2, 9)}`,
          sender: "bot",
          text: data.reply,
          options: data.options,
          whatsappLink: data.whatsappLink,
          leadCaptured: data.leadCaptured,
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch (err) {
      console.error("AI Assistant error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenWhatsAppHandoff = (reqLabel?: string) => {
    const req = reqLabel || leadReq || "RO Water Purifier & Solar Consultation";
    const name = leadName || "Valued Customer";
    const phone = leadPhone || "N/A";
    const location = leadLocation || "Karur / Tamil Nadu";
    const pageUrl = getCurrentPage();

    const waUrl = formatWhatsAppLeadMessage({
      name,
      phone,
      location,
      requirement: req,
      currentPage: pageUrl,
    });

    window.open(waUrl, "_blank");
  };

  const handleOptionClick = (action: string, label: string) => {
    if (action === "whatsapp" || action === "whatsapp_quote") {
      handleOpenWhatsAppHandoff(label);
      return;
    }

    if (action === "call") {
      window.open(CALL, "_self");
      return;
    }

    if (action === "maps") {
      window.open("https://maps.app.goo.gl/n9AB68PGcExhybM37", "_blank");
      return;
    }

    if (action.startsWith("book_") || action.endsWith("_quote")) {
      setLeadReq(label);
      setShowLeadForm(true);
      return;
    }

    handleSendMessage(label);
  };

  const handleLeadFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadPhone.trim()) return;

    setIsLoading(true);
    const currentPage = getCurrentPage();
    const nowStr = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    try {
      // 1. Save lead to database BEFORE WhatsApp redirect
      const saveRes = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName || "Website Visitor",
          phone: leadPhone,
          location: leadLocation || "Karur / Tamil Nadu",
          serviceRequired: leadReq,
          message: `Captured via AI Lead Chatbot on ${currentPage}`,
        }),
      });

      if (!saveRes.ok) {
        console.warn("Lead pre-save returned status:", saveRes.status);
      }

      setShowLeadForm(false);

      // 2. Generate clean professional WhatsApp message
      const waUrl = formatWhatsAppLeadMessage({
        name: leadName || "Valued Customer",
        phone: leadPhone,
        location: leadLocation || "Karur / Tamil Nadu",
        requirement: leadReq,
        currentPage,
        dateTime: nowStr,
      });

      // 3. Update chat messages stream
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-success-${Math.random().toString(36).substring(2, 9)}`,
          sender: "bot",
          text: `🎉 Thank you ${leadName || "valued customer"}! Your lead has been saved in our system. Our chief engineer will contact you shortly on ${leadPhone}.\n\nClick below to open WhatsApp with your quote request details.`,
          whatsappLink: waUrl,
          leadCaptured: true,
          options: [
            { label: "💬 Open Clean WhatsApp Chat", action: "whatsapp" },
            { label: "📞 Call Store Now", action: "call" },
          ],
        },
      ]);

      // 4. Open WhatsApp in new tab
      window.open(waUrl, "_blank");
    } catch (err) {
      console.error("Lead submission error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-[99]">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white rounded-full shadow-[0_8px_30px_rgba(6,182,212,0.4)] hover:shadow-[0_12px_40px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
            aria-label="Open AI Assistant Chat"
          >
            <div className="relative">
              <Bot className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-white" />
            </div>
            <span className="font-black text-xs tracking-wider hidden sm:inline-block uppercase">
              AI Assistant
            </span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
              Online
            </span>
          </button>
        )}
      </div>

      {/* Floating Chat Modal Window */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-[100] w-full sm:w-[400px] h-full sm:h-[600px] bg-white sm:rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-inner border border-white/20">
                <Bot className="w-6 h-6 text-white" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900" />
              </div>
              <div>
                <h3 className="font-black text-sm text-white flex items-center gap-1.5 leading-none">
                  Yuvanthika AI Assistant <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </h3>
                <p className="text-[11px] text-slate-300 mt-1 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />
                  Instant RO & Solar Solutions
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed shadow-sm ${
                    m.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-none"
                  }`}
                >
                  <p className="whitespace-pre-line font-medium text-xs">{m.text}</p>

                  {/* Continue on WhatsApp Button if Lead Captured */}
                  {m.whatsappLink && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200/60">
                      <a
                        href={m.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                      >
                        <MessageCircle className="w-4 h-4" /> Continue on WhatsApp
                      </a>
                    </div>
                  )}
                </div>

                {/* Option Chips */}
                {m.options && m.options.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                    {m.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(opt.action, opt.label)}
                        className="px-3 py-1.5 bg-white hover:bg-cyan-50 border border-slate-200 hover:border-cyan-300 text-cyan-800 rounded-xl text-[11px] font-bold shadow-2xs transition-all active:scale-95 text-left"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Quick Lead Form Drawer inside Chat */}
            {showLeadForm && (
              <form onSubmit={handleLeadFormSubmit} className="bg-gradient-to-br from-cyan-950 to-slate-900 border border-cyan-500/30 p-4 rounded-2xl space-y-3 text-white shadow-xl my-2">
                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
                  <h4 className="text-xs font-black text-cyan-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Request Callback & Quote
                  </h4>
                  <button type="button" onClick={() => setShowLeadForm(false)} className="text-slate-400 hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="e.g. Kamesh"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-300 mb-1">Phone Number (Required)</label>
                  <input
                    type="tel"
                    required
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="e.g. 9842423589"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-300 mb-1">Location / Town</label>
                  <input
                    type="text"
                    value={leadLocation}
                    onChange={(e) => setLeadLocation(e.target.value)}
                    placeholder="e.g. Karur Town, Namakkal"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-300 mb-1">Service / Product Needed</label>
                  <input
                    type="text"
                    value={leadReq}
                    onChange={(e) => setLeadReq(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  {isLoading ? "Saving Lead..." : "Submit & Open WhatsApp"}
                </button>
              </form>
            )}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic p-2">
                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                <span>Assistant is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Footer Bar */}
          <div className="p-2 bg-slate-100 border-t border-slate-200 flex items-center justify-around text-xs font-bold shrink-0">
            <a
              href={CALL}
              className="flex items-center gap-1 text-slate-700 hover:text-blue-700 px-2 py-1 rounded-lg hover:bg-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" /> Call {PHONE_DISPLAY}
            </a>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => { setShowLeadForm(true); }}
              className="flex items-center gap-1 text-slate-700 hover:text-cyan-700 px-2 py-1 rounded-lg hover:bg-white transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" /> Get Quote
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => handleOpenWhatsAppHandoff()}
              className="flex items-center gap-1 text-green-700 hover:text-green-800 px-2 py-1 rounded-lg hover:bg-white transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-green-600" /> WhatsApp
            </button>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask about RO, Solar, Softeners or Service..."
              className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputText.trim()}
              className="p-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 transition-all shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
