"use client";

import React, { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { Menu, X, ExternalLink, Globe } from "lucide-react";
import Link from "next/link";
import type { SessionUser } from "@/lib/auth";

interface AdminLayoutProps {
  children: React.ReactNode;
  user: SessionUser | null;
}

export function AdminLayout({ children, user }: AdminLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <AdminSidebar user={user} />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 w-64">
            <AdminSidebar user={user} />
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 p-2 text-white bg-slate-800 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-slate-900/80 border-b border-slate-800 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 text-slate-400 hover:text-white md:hidden rounded-lg hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              prefetch={false}
              className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-semibold rounded-lg border border-cyan-500/20 transition-all"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>View Website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
