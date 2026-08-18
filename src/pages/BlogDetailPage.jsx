import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHero from '../components/common/PageHero';
import { blogPosts as defaultBlogPosts } from '../data/blogData';
import { useAdmin } from '../context/AdminContext';
import { Calendar, User, ArrowLeft, Clock, Sparkles } from 'lucide-react';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const adminContext = useAdmin();
  const blogPosts = adminContext?.blogPosts || defaultBlogPosts;

  const post = blogPosts.find(p => p.slug === slug || p.id.toString() === slug) || blogPosts[0];

  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-10">
      <PageHero
        title={post.title}
        subtitle={`Authored by ${post.author} • Clinical Dermatology & Aesthetic Guide`}
        breadcrumb={[{ label: 'Skin Journal', path: '/blog' }, { label: post.title }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-rose-50 text-rose-800 font-bold rounded-lg">{post.category}</span>
              <span className="flex items-center space-x-1">
                <User className="w-3.5 h-3.5 text-rose-500" />
                <span className="font-semibold text-slate-700">{post.author}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-rose-600" />
                <span>{post.date}</span>
              </span>
            </div>
            {post.readTime && (
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{post.readTime}</span>
              </span>
            )}
          </div>

          <div className="h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-950 shadow-sm">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="text-slate-700 text-xs sm:text-sm leading-relaxed space-y-4">
            {post.summary && <p className="font-bold text-base text-slate-900">{post.summary}</p>}
            
            {typeof post.content === 'string' && post.content.includes('<') ? (
              <div 
                className="prose prose-rose max-w-none text-slate-600 leading-relaxed space-y-3"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <div className="whitespace-pre-line text-slate-600 leading-relaxed space-y-3">
                {post.content}
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
            <Link to="/blog" className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center space-x-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Skin Journal</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
