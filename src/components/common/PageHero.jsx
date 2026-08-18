import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';

const PageHero = ({ title, subtitle, breadcrumb = [] }) => {
  return (
    <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-rose-900/30 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-pink-600/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-1.5 text-xs text-rose-400 mb-3 font-semibold">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          {breadcrumb.map((item, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              {item.path ? (
                <Link to={item.path} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-slate-300">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2 font-heading">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl font-normal leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHero;
