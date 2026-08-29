"use client";

import React, { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Plus, Eye, Sparkles, CheckCircle2, Upload, X, ImageIcon, Pencil } from "lucide-react";
import type { SessionUser } from "@/lib/auth";

interface BlogPost {
  id: string;
  title: string;
  title_ta?: string;
  slug: string;
  author: string;
  publishDate: string;
  isPublished: boolean;
  featuredImage?: string;
  content?: string;
  content_ta?: string;
  excerpt_ta?: string;
  authorRole?: string;
  category?: string;
  readTime?: string;
  keywords?: string[] | string;
}

const EMPTY = {
  title: "",
  title_ta: "",
  excerpt_ta: "",
  content: "",
  content_ta: "",
  author: "Yuvanthika Water Expert",
  authorRole: "Water Treatment Specialist",
  category: "Knowledge Hub",
  readTime: "5 min read",
  keywords: "RO Purifier Karur, Water Softener Tamil Nadu",
  featuredImage: "",
};

export default function AdminBlogPage() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);

  // Form State
  const [title, setTitle] = useState(EMPTY.title);
  const [title_ta, setTitleTa] = useState(EMPTY.title_ta);
  const [excerpt_ta, setExcerptTa] = useState(EMPTY.excerpt_ta);
  const [content, setContent] = useState(EMPTY.content);
  const [content_ta, setContentTa] = useState(EMPTY.content_ta);
  const [author, setAuthor] = useState(EMPTY.author);
  const [authorRole, setAuthorRole] = useState(EMPTY.authorRole);
  const [category, setCategory] = useState(EMPTY.category);
  const [readTime, setReadTime] = useState(EMPTY.readTime);
  const [keywords, setKeywords] = useState(EMPTY.keywords);
  const [featuredImage, setFeaturedImage] = useState(EMPTY.featuredImage);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const resetForm = () => {
    setTitle(EMPTY.title);
    setTitleTa(EMPTY.title_ta);
    setExcerptTa(EMPTY.excerpt_ta);
    setContent(EMPTY.content);
    setContentTa(EMPTY.content_ta);
    setAuthor(EMPTY.author);
    setAuthorRole(EMPTY.authorRole);
    setCategory(EMPTY.category);
    setReadTime(EMPTY.readTime);
    setKeywords(EMPTY.keywords);
    setFeaturedImage(EMPTY.featuredImage);
    setEditing(null);
  };

  const openCreate = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditing(post);
    setTitle(post.title || "");
    setTitleTa(post.title_ta || "");
    setExcerptTa(post.excerpt_ta || "");
    setContent(post.content || "");
    setContentTa(post.content_ta || "");
    setAuthor(post.author || EMPTY.author);
    setAuthorRole(post.authorRole || EMPTY.authorRole);
    setCategory(post.category || EMPTY.category);
    setReadTime(post.readTime || EMPTY.readTime);
    setKeywords(
      Array.isArray(post.keywords) ? post.keywords.join(", ") : post.keywords || EMPTY.keywords
    );
    setFeaturedImage(post.featuredImage || "");
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    resetForm();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "Blog");
      const res = await fetch("/api/admin/media/upload", { method: "POST", body: fd });
      if (res.ok) {
        const data = await res.json();
        if (data.url) setFeaturedImage(data.url);
      } else {
        setMessage("Image upload failed — check the Cloudinary configuration.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Image upload failed.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

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

  const refresh = async () => {
    const listRes = await fetch("/api/admin/blogs");
    if (listRes.ok) setPosts(await listRes.json());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      slug: editing?.slug,
      title,
      title_ta,
      excerpt_ta,
      content,
      content_ta,
      author,
      authorRole,
      category,
      readTime,
      keywords: keywords.split(","),
      featuredImage,
    };
    try {
      const res = editing
        ? await fetch(`/api/admin/blogs/${encodeURIComponent(editing.id)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/admin/blogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

      if (res.ok) {
        setMessage(editing ? "Article updated successfully." : "Blog post created & published successfully.");
        closeForm();
        await refresh();
      } else {
        const err = await res.json().catch(() => ({}));
        setMessage(err.error || "Save failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Save failed.");
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
            onClick={() => (isFormOpen ? closeForm() : openCreate())}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs rounded-xl hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" /> {isFormOpen ? "Close Form" : "Create New Blog"}
          </button>
        </div>

        {message && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {message}
          </div>
        )}

        {isFormOpen && (
          <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> {editing ? `Edit: ${editing.title}` : "Write New Multilingual Article"}
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

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Featured Image (optional)</label>
              <p className="text-[11px] text-slate-500 mb-2">
                Upload a genuine photo, or paste an image URL. Leave empty to show a clean placeholder — never a stock image.
              </p>
              {featuredImage ? (
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={featuredImage} alt="Featured preview" className="h-16 w-24 object-cover rounded-lg border border-slate-700" />
                  <code className="text-[11px] text-cyan-400 break-all flex-1">{featuredImage}</code>
                  <button
                    type="button"
                    onClick={() => setFeaturedImage("")}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 text-slate-300 text-[11px] font-bold rounded-lg hover:bg-slate-700"
                  >
                    <X className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-3">
                  <label className="flex items-center gap-2 px-3 py-2 bg-slate-800 text-slate-200 text-xs font-bold rounded-xl cursor-pointer hover:bg-slate-700">
                    <Upload className="w-4 h-4" /> {uploading ? "Uploading…" : "Upload Image"}
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                  </label>
                  <span className="text-slate-600 text-xs">or</span>
                  <div className="relative flex-1 min-w-[220px]">
                    <ImageIcon className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={featuredImage}
                      onChange={(e) => setFeaturedImage(e.target.value)}
                      placeholder="https://res.cloudinary.com/…"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-white text-sm focus:border-cyan-500 outline-none"
                    />
                  </div>
                </div>
              )}
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
                <label className="block text-xs font-bold text-slate-300 mb-1">Author Role</label>
                <input
                  type="text"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  placeholder="e.g. Water Treatment Specialist"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Residential RO"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Read Time</label>
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="e.g. 6 min read"
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
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="px-5 py-3 bg-cyan-500 text-slate-950 font-black text-xs rounded-xl hover:bg-cyan-400"
              >
                {editing ? "Save Changes" : "Publish Article"}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-3 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl hover:bg-slate-700"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-400">
            Published & Draft Articles ({posts.length})
          </div>
          <div className="divide-y divide-slate-800/60">
            {posts.map((post) => (
              <div key={post.id} className="p-4 flex items-center justify-between hover:bg-slate-800/40">
                <div className="flex items-center gap-3 min-w-0">
                  {post.featuredImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.featuredImage} alt="" className="h-10 w-14 object-cover rounded-md border border-slate-700 shrink-0" />
                  ) : (
                    <div className="h-10 w-14 rounded-md border border-dashed border-slate-700 shrink-0 flex items-center justify-center">
                      <ImageIcon className="w-4 h-4 text-slate-600" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="font-bold text-white text-sm truncate">{post.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">
                      URL: <code className="text-cyan-400">/blog/{post.slug}</code> • By {post.author}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded-full">
                    Published
                  </span>
                  <button
                    onClick={() => openEdit(post)}
                    className="flex items-center gap-1 p-2 text-slate-400 hover:text-cyan-400 bg-slate-800 rounded-lg"
                    title="Edit article / featured image"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="p-2 text-slate-400 hover:text-cyan-400 bg-slate-800 rounded-lg"
                    title="View on site"
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
