"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function AdminForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-2xl font-black text-white">Reset Password</h2>
        <p className="mt-1 text-center text-xs text-slate-400">
          Enter your registered admin email address to receive instructions
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-10">
          {submitted ? (
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-white">Password reset email sent!</p>
              <p className="text-xs text-slate-400">
                If an account exists for <code className="text-cyan-400">{email}</code>, password reset instructions have been dispatched.
              </p>
              <Link href="/admin/login" className="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-bold hover:underline">
                <ArrowLeft className="w-4 h-4" /> Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Admin Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@yuvanthikaaquasolar.in"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-cyan-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-sm rounded-xl hover:from-cyan-400 hover:to-blue-500"
              >
                Send Password Reset Request
              </button>

              <div className="text-center pt-2">
                <Link href="/admin/login" className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1">
                  <ArrowLeft className="w-3.5 h-3.5" /> Return to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
