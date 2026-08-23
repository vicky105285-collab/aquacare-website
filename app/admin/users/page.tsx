"use client";

import React, { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Users, Plus, ShieldCheck, CheckCircle2, Lock, Trash2, Eye, EyeOff, ShieldAlert, Sparkles } from "lucide-react";
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
  const [masterPasswordDisabled, setMasterPasswordDisabled] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"SUPER_ADMIN" | "ADMIN">("SUPER_ADMIN");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const meRes = await fetch("/api/admin/auth/me");
        if (meRes.ok && isMounted) {
          const u = (await meRes.json()).user;
          setUser(u);
        }

        const res = await fetch("/api/admin/users");
        if (res.ok && isMounted) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setUsers(data);
          } else if (data.users) {
            setUsers(data.users);
            setMasterPasswordDisabled(data.masterPasswordDisabled || false);
          }
        }
      } catch (e) {
        console.error("Failed to load users:", e);
      }
    }
    load();
    return () => { isMounted = false; };
  }, []);

  const refreshUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setUsers(data);
        } else if (data.users) {
          setUsers(data.users);
          setMasterPasswordDisabled(data.masterPasswordDisabled || false);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage(data.message || `Admin user '${name}' created successfully! You can now log in with ${email}.`);
        setIsAdding(false);
        setName("");
        setEmail("");
        setPassword("");
        await refreshUsers();
      } else {
        setError(data.error || "Failed to create admin user");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error creating admin user");
    }
  };

  const handleToggleMasterPassword = async (disable: boolean) => {
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disableMasterPassword: disable }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMasterPasswordDisabled(data.masterPasswordDisabled);
        setMessage(data.message);
      } else {
        setError(data.error || "Failed to update master password setting");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error updating security setting");
    }
  };

  const handleDeleteUser = async (id: string, userEmail: string) => {
    if (!confirm(`Are you sure you want to remove access for ${userEmail}?`)) return;

    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage(`Admin user ${userEmail} removed.`);
        await refreshUsers();
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <AdminLayout user={user}>
      <div className="space-y-6">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-cyan-400" /> User & Access Management
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Create personal admin accounts, change credentials, and manage default system security
            </p>
          </div>
          {user?.role === "SUPER_ADMIN" && (
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs rounded-xl shadow-lg hover:from-cyan-400 hover:to-blue-500 transition-all"
            >
              <Plus className="w-4 h-4" /> {isAdding ? "Close Form" : "Create Personal Admin Account"}
            </button>
          )}
        </div>

        {/* Status Alerts */}
        {message && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-bold flex items-center gap-2 shadow-sm">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" /> 
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" /> 
            <span>{error}</span>
          </div>
        )}

        {/* Master Password Security Control Box */}
        {user?.role === "SUPER_ADMIN" && (
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-cyan-400" /> General Master Password Security Control
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                  Default passwords (like <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded">admin123</code>) allow emergency access. Once you create your own personal admin email & password below, disable the default master password to prevent unauthorized access.
                </p>
              </div>

              <div className="shrink-0">
                {masterPasswordDisabled ? (
                  <button
                    onClick={() => handleToggleMasterPassword(false)}
                    className="px-4 py-2.5 bg-slate-800 text-emerald-400 border border-emerald-500/30 font-bold text-xs rounded-xl hover:bg-slate-700 transition-colors flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Master Password Disabled (Secure)
                  </button>
                ) : (
                  <button
                    onClick={() => handleToggleMasterPassword(true)}
                    className="px-4 py-2.5 bg-red-500/20 text-red-400 border border-red-500/40 font-bold text-xs rounded-xl hover:bg-red-500/30 transition-all flex items-center gap-2 shadow-lg shadow-red-500/10"
                  >
                    <ShieldAlert className="w-4 h-4" /> Disable Master Password (admin123)
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Create User Form */}
        {isAdding && (
          <form onSubmit={handleCreateUser} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Create Personal Admin Account
              </h2>
              <span className="text-xs text-slate-400">Can log in immediately after creation</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Admin Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. My Admin Account"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Personal Admin Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your-name@gmail.com or admin@yuvanthikaaquasolar.in"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Personal Admin Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Set your new strong password..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 pr-10 text-white text-sm focus:border-cyan-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Role Permission</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as "SUPER_ADMIN" | "ADMIN")}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm focus:border-cyan-500 focus:outline-none"
                >
                  <option value="SUPER_ADMIN">Super Admin (Full Access & User Control)</option>
                  <option value="ADMIN">Admin (Content Manager)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2.5 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs rounded-xl hover:from-cyan-400 hover:to-blue-500 shadow-md"
              >
                Save Personal Account & Enable Login
              </button>
            </div>
          </form>
        )}

        {/* Users Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" /> Active System Admin Users ({users.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">User Name</th>
                  <th className="px-6 py-3.5">Email Address</th>
                  <th className="px-6 py-3.5">Role</th>
                  <th className="px-6 py-3.5">Created Date</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/40">
                    <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" /> {u.name}
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
                    <td className="px-6 py-4 text-right">
                      {user?.role === "SUPER_ADMIN" && u.email !== user.email && (
                        <button
                          onClick={() => handleDeleteUser(u.id, u.email)}
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Remove user access"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
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
