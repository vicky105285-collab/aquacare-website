"use client";

import React, { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Plus, Eye, Sparkles, CheckCircle2 } from "lucide-react";
import type { SessionUser } from "@/lib/auth";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  publishDate: string;
  isPublished: boolean;
}

export default function AdminBlogPage() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [title_ta, setTitleTa] = useState("");
  const [excerpt_ta, setExcerptTa] = useState("");
  const [content, setContent] = useState("");
  const [content_ta, setContentTa] = useState("");
  const [author, setAuthor] = useState("Yuvanthika Water Expert");
  const [keywords, setKeywords] = useState("RO Purifier Karur, Water Softener Tamil Nadu");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const meRes = await fetch("/api/admin/auth/me");
        if (meRes.ok) setUser((await meRes.json()).user);

        const res = await fetch("/api/admin/blogs");
        if (res.ok) setPosts(await res.json());
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          title_ta,
          excerpt_ta,
          content,
          content_ta,
          author,
          keywords: keywords.split(","),
        }),
      });

      if (res.ok) {
        setMessage("Blog post created & published successfully with Tamil translations!");
        setIsAdding(false);
        setTitle("");
        setTitleTa("");
        setExcerptTa("");
        setContent("");
        setContentTa("");
        const listRes = await fetch("/api/admin/blogs");
        if (listRes.ok) setPosts(await listRes.json());
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
            <h1 className="text-2xl font-black text-white">Blog Articles & Multilingual SEO CMS</h1>
            <p className="text-xs text-slate-400">
              Create, edit, and publish blogs with English and Tamil translations, automatic Open Graph, Twitter & Schema.org metadata
            </p>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs rounded-xl hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" /> {isAdding ? "Close Form" : "Create New Blog"}
          </button>
        </div>

        {message && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {message}
          </div>
        )}

        {isAdding && (
          <form onSubmit={handleCreatePost} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Write New Multilingual Article
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Article Title (English) *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Best Water Softener for Hard Water in Karur"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm focus:border-cyan-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Article Title (Tamil - title_ta)</label>
                <input
                  type="text"
                  value={title_ta}
                  onChange={(e) => setTitleTa(e.target.value)}
                  placeholder="எ.கா. கரூரில் கடின நீருக்கான சிறந்த நீர் மென்மையாக்கி"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm focus:border-cyan-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Tamil Brief Excerpt (excerpt_ta)</label>
              <input
                type="text"
                value={excerpt_ta}
                onChange={(e) => setExcerptTa(e.target.value)}
                placeholder="கட்டுரையின் சுருக்கமான தமிழ் அறிக்கை..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm focus:border-cyan-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">English Content (Markdown) *</label>
                <textarea
                  rows={6}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write full English article body here..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm focus:border-cyan-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Tamil Content (content_ta)</label>
                <textarea
                  rows={6}
                  value={content_ta}
                  onChange={(e) => setContentTa(e.target.value)}
                  placeholder="தமிழ் வடிவில் முழு கட்டுரையை இங்கு எழுதவும்..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm focus:border-cyan-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Author Name</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">SEO Keywords (Comma Separated)</label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-5 py-3 bg-cyan-500 text-slate-950 font-black text-xs rounded-xl hover:bg-cyan-400"
            >
              Publish Article
            </button>
          </form>
        )}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-400">
            Published & Draft Articles ({posts.length})
          </div>
          <div className="divide-y divide-slate-800/60">
            {posts.map((post) => (
              <div key={post.id} className="p-4 flex items-center justify-between hover:bg-slate-800/40">
                <div>
                  <h3 className="font-bold text-white text-sm">{post.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    URL: <code className="text-cyan-400">/blog/{post.slug}</code> • By {post.author}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded-full">
                    Published
                  </span>
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="p-2 text-slate-400 hover:text-cyan-400 bg-slate-800 rounded-lg"
                  >
                    <Eye className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
