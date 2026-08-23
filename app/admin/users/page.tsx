"use client";

import React, { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Users, Plus, ShieldCheck, CheckCircle2, Lock } from "lucide-react";
import type { SessionUser } from "@/lib/auth";

interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN";
  createdAt: string;
}

export default function AdminUsersPage() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [users, setUsers] = useState<AdminUserItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"SUPER_ADMIN" | "ADMIN">("ADMIN");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const meRes = await fetch("/api/admin/auth/me");
        if (meRes.ok) {
          const u = (await meRes.json()).user;
          setUser(u);
        }

        const res = await fetch("/api/admin/users");
        if (res.ok) setUsers(await res.json());
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (res.ok) {
        setMessage("Admin user created successfully!");
        setIsAdding(false);
        setName("");
        setEmail("");
        setPassword("");
        const listRes = await fetch("/api/admin/users");
        if (listRes.ok) setUsers(await listRes.json());
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
            <h1 className="text-2xl font-black text-white">Admin User Management</h1>
            <p className="text-xs text-slate-400">
              Manage authorized admins, store managers, and role permissions (Super Admin Only)
            </p>
          </div>
          {user?.role === "SUPER_ADMIN" && (
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs rounded-xl shadow-md"
            >
              <Plus className="w-4 h-4" /> {isAdding ? "Close Form" : "Create Admin User"}
            </button>
          )}
        </div>

        {message && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {message}
          </div>
        )}

        {isAdding && (
          <form onSubmit={handleCreateUser} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">New Admin Account</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Karur Branch Manager"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="manager@yuvanthika.in"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Secure Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Role Permission</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as "SUPER_ADMIN" | "ADMIN")}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
                >
                  <option value="ADMIN">Admin (Content Manager)</option>
                  <option value="SUPER_ADMIN">Super Admin (Full System Access)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="px-5 py-3 bg-cyan-500 text-slate-950 font-black text-xs rounded-xl hover:bg-cyan-400"
            >
              Create Account
            </button>
          </form>
        )}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">User Name</th>
                  <th className="px-6 py-3.5">Email</th>
                  <th className="px-6 py-3.5">Role</th>
                  <th className="px-6 py-3.5">Created Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/40">
                    <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" /> {u.name}
                    </td>
                    <td className="px-6 py-4 text-cyan-400 font-mono">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                        u.role === "SUPER_ADMIN"
                          ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                          : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {new Date(u.createdAt).toLocaleDateString()}
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
