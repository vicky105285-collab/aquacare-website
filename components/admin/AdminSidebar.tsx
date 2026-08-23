"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Image as ImageIcon,
  Package,
  Wrench,
  Settings,
  Users,
  Inbox,
  LogOut,
  FolderOpen,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import type { SessionUser } from "@/lib/auth";

interface AdminSidebarProps {
  user: SessionUser | null;
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/leads", label: "Leads & Enquiries", icon: Inbox, badge: "Live" },
    { href: "/admin/projects", label: "Projects & Case Studies", icon: Briefcase },
    { href: "/admin/products", label: "Products Catalog", icon: Package },
    { href: "/admin/blog", label: "Blog Articles", icon: FileText },
    { href: "/admin/gallery", label: "Installation Gallery", icon: ImageIcon },
    { href: "/admin/services", label: "Service Pages", icon: Wrench },
    { href: "/admin/media", label: "Media Library", icon: FolderOpen },
    { href: "/admin/settings", label: "Site Settings", icon: Settings },
  ];

  if (user?.role === "SUPER_ADMIN") {
    navItems.push({ href: "/admin/users", label: "Admin Users", icon: Users });
  }

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col min-h-screen border-r border-slate-800 shrink-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-cyan-500/20">
            Y
          </div>
          <div>
            <h1 className="font-extrabold text-white text-sm tracking-tight leading-snug">
              Yuvanthika CMS
            </h1>
            <p className="text-[11px] text-cyan-400 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 inline" /> Admin Control
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Management
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-500"}`} />
                <span>{item.label}</span>
              </div>
              {item.badge ? (
                <span className="px-1.5 py-0.5 bg-cyan-500 text-slate-950 font-bold text-[9px] rounded-full">
                  {item.badge}
                </span>
              ) : (
                <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 ${isActive ? "opacity-100 text-cyan-400" : ""}`} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/50">
        <div className="flex items-center justify-between">
          <div className="truncate pr-2">
            <p className="text-xs font-bold text-white truncate">{user?.name || "Admin User"}</p>
            <p className="text-[10px] text-slate-400 truncate">{user?.email || "admin@yuvanthika.in"}</p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-slate-800 text-cyan-400 text-[9px] font-bold rounded-md uppercase">
              {user?.role || "ADMIN"}
            </span>
          </div>
          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
