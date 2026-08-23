"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Upload, FolderOpen, Film, Image as ImageIcon, CheckCircle2, Copy } from "lucide-react";
import type { SessionUser } from "@/lib/auth";

const FOLDERS = ["Projects", "Products", "Gallery", "Blog", "Services", "Testimonials"];

export default function AdminMediaPage() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [selectedFolder, setSelectedFolder] = useState("Projects");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setUploadedUrl("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", selectedFolder);

      const res = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setUploadedUrl(data.url);
        setFile(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AdminLayout user={user}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-white">Media Library & File Upload Manager</h1>
          <p className="text-xs text-slate-400">
            Upload and organize installation photos (JPG, PNG, WebP) and project videos (MP4)
          </p>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleUpload} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Upload className="w-4 h-4" /> Upload New Asset
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Select Destination Folder</label>
              <select
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
              >
                {FOLDERS.map((f) => (
                  <option key={f} value={f}>
                    /{f}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Choose File (JPG, PNG, WebP, MP4)</label>
              <input
                type="file"
                accept="image/*,video/mp4"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-cyan-500 file:text-slate-950"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!file || uploading}
            className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs rounded-xl hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50"
          >
            {uploading ? "Uploading File..." : "Start Upload"}
          </button>
        </form>

        {uploadedUrl && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" /> Upload Successful!
            </div>
            <div className="flex items-center gap-2">
              <code className="bg-slate-950 px-3 py-2 rounded-xl text-xs text-slate-200 border border-slate-800 flex-1">
                {uploadedUrl}
              </code>
              <button
                type="button"
                onClick={() => handleCopy(uploadedUrl)}
                className="px-3 py-2 bg-slate-800 text-cyan-400 text-xs font-bold rounded-xl flex items-center gap-1 hover:bg-slate-700"
              >
                <Copy className="w-3.5 h-3.5" /> {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        )}

        {/* Existing Assets Folders Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {FOLDERS.map((folder) => (
            <div
              key={folder}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                selectedFolder === folder
                  ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-400"
                  : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
              }`}
              onClick={() => setSelectedFolder(folder)}
            >
              <FolderOpen className="w-8 h-8 mb-2 text-cyan-400" />
              <span className="font-bold text-xs">/{folder}</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Asset Folder</span>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
