import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { FileText, Plus, Pencil, Trash2, X, Save, Search, Sparkles } from 'lucide-react';

const AdminBlog = () => {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', slug: '', summary: '', excerpt: '', content: '', author: '', date: '', image: '', category: '', readTime: '5 min read' });
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = (blogPosts || []).filter((p) => (p.title || '').toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { 
    setEditingId(null); 
    setForm({ 
      title: '', 
      slug: '', 
      summary: '',
      excerpt: '', 
      content: '', 
      author: 'Dr. Jennifer Vance, MD (Dermatology)', 
      date: new Date().toISOString().split('T')[0], 
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80', 
      category: 'Laser Dermatology',
      readTime: '5 min read'
    }); 
    setShowForm(true); 
  };
  
  const openEdit = (item) => { 
    setEditingId(item.id); 
    setForm({ ...item, summary: item.summary || item.excerpt }); 
    setShowForm(true); 
  };

  const handleSave = (e) => {
    e.preventDefault();
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const updatedData = { ...form, slug, excerpt: form.summary };
    if (editingId) { 
      updateBlogPost(editingId, updatedData); 
    } else { 
      addBlogPost(updatedData); 
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    deleteBlogPost(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-black text-slate-950 flex items-center space-x-2 font-heading">
            <FileText className="w-5 h-5 text-rose-600" />
            <span>Skin Health Journal & Clinical Articles</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage skincare guides, laser recovery tips, and ingredient breakdowns (Total: {(blogPosts || []).length})</p>
        </div>
        <button onClick={openAdd} className="px-4 py-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm shadow-rose-200">
          <Plus className="w-4 h-4" /><span>Add Article</span>
        </button>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder="Search skin journal by article title..."
          className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-rose-500 shadow-2xs" 
        />
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 text-left border-b border-slate-200 font-bold text-slate-700 uppercase text-[10px] tracking-wider">
                <th className="px-5 py-3.5">Article Title</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Author Dermatologist</th>
                <th className="px-5 py-3.5">Publish Date</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4 font-semibold text-slate-900 max-w-xs truncate">{post.title}</td>
                  <td className="px-5 py-4"><span className="px-2.5 py-0.5 bg-rose-50 text-rose-800 rounded-md font-bold text-[11px]">{post.category}</span></td>
                  <td className="px-5 py-4 text-slate-700 font-medium">{post.author}</td>
                  <td className="px-5 py-4 text-slate-500">{post.date}</td>
                  <td className="px-5 py-4 text-right space-x-1.5">
                    <button onClick={() => openEdit(post)} className="text-slate-500 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 cursor-pointer transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setDeleteConfirm(post.id)} className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 cursor-pointer transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-950 font-heading">
                {editingId ? 'Edit Article' : 'Write New Skin Journal Article'}
              </h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Article Title *</label>
                <input
                  type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Melasma vs Sun Spots: What Truly Clears Deep Pigmentation" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <input
                    type="text" required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="e.g. Laser Dermatology" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Author Doctor *</label>
                  <input
                    type="text" required value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Cover Image URL</label>
                <input
                  type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Summary / Excerpt *</label>
                <textarea
                  rows="2" required value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Article Content</label>
                <textarea
                  rows="6" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl resize-none"
                ></textarea>
              </div>

              <div className="pt-3 flex space-x-2">
                <button type="button" onClick={() => setShowForm(false)} className="w-1/2 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="w-1/2 py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold rounded-xl shadow-sm shadow-rose-200 cursor-pointer">
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-center">
            <h4 className="text-sm font-bold text-slate-900">Delete Article?</h4>
            <p className="text-xs text-slate-500">Are you sure you want to remove this article?</p>
            <div className="flex space-x-2 pt-2">
              <button onClick={() => setDeleteConfirm(null)} className="w-1/2 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm)} className="w-1/2 py-2 bg-red-600 text-white font-bold text-xs rounded-xl shadow-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlog;
