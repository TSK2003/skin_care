import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/common/PageHero';
import { blogPosts as defaultBlogPosts } from '../data/blogData';
import { useAdmin } from '../context/AdminContext';
import { Calendar, ChevronRight, User, Sparkles } from 'lucide-react';

const BlogPage = () => {
  const adminContext = useAdmin();
  const blogPosts = adminContext?.blogPosts || defaultBlogPosts;
  const hospitalInfo = adminContext?.hospitalInfo || { name: 'DermaLuxe' };

  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-10">
      <PageHero
        title="Dermatology Journal & Skin Health Insights"
        subtitle="Expert clinical advice, ingredient breakdowns, and laser guides from our Board-Certified Dermatologists."
        breadcrumb={[{ label: 'Skin Journal' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 flex flex-col justify-between hover:border-rose-500 hover:shadow-xl transition-all group">
              <div>
                <div className="h-52 w-full bg-slate-950 overflow-hidden relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-slate-950/80 text-rose-300 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border border-rose-900/50">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-rose-600" />
                      <span>{post.date}</span>
                    </span>
                    <span>{post.readTime || '5 min read'}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-950 group-hover:text-rose-600 transition-colors line-clamp-2 leading-snug font-heading">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {post.summary || post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-3 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium flex items-center space-x-1">
                  <User className="w-3 h-3 text-rose-500" />
                  <span className="truncate max-w-[150px]">{post.author}</span>
                </span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center space-x-1"
                >
                  <span>Read Article</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
