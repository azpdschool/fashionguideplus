// pages/CategoriesPage.jsx
import { categories } from '../data/categories';
import { Sparkles, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function CategoriesPage() {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pb-24">
      {/* Luxury Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-amber-200" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Fashion Collection
              </h1>
            </div>
            <p className="text-slate-600 text-lg font-light max-w-2xl mx-auto">
              Discover curated fashion pieces for your sophisticated style
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {categories.map((category, index) => (
            <div 
              key={category.id} 
              className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              {/* Category Header - Clickable */}
              <div 
                className="p-8 cursor-pointer group"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    {/* Category Icon/Number */}
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold text-amber-200">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">
                        {category.name}
                      </h2>
                      <div className="flex items-center gap-4 text-slate-500">
                        <span className="text-sm font-medium">
                          {category.items.length} items
                        </span>
                        <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                        <span className="text-sm">Click to explore</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <ChevronRight className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${
                      expandedCategory === category.id ? 'rotate-90' : ''
                    } group-hover:text-amber-500`} />
                  </div>
                </div>
              </div>

              {/* Expandable Content */}
              {expandedCategory === category.id && (
                <div className="border-t border-slate-200/60 p-8 bg-gradient-to-br from-slate-50 to-white">
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {category.items.map((item) => (
                      <div 
                        key={item.name}
                        className="group/item text-center"
                      >
                        {/* Image Container with Luxury Border */}
                        <div className="relative mb-4 rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm group-hover/item:shadow-xl transition-all duration-500">
                          <div className="aspect-square relative overflow-hidden">
                            <img 
                              src={`/images/fashion/${item.name.toLowerCase().replace(/\s+/g, '')}.png`}
                              alt={item.name}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                              onError={(e) => {
                                e.target.src = '/images/fashion/placeholder.png';
                              }}
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          
                          {/* Hover Effect Ring */}
                          <div className="absolute inset-0 border-2 border-transparent group-hover/item:border-amber-400/30 rounded-2xl transition-all duration-500"></div>
                        </div>
                        
                        {/* Item Name */}
                        <p className="font-semibold text-slate-900 group-hover/item:text-amber-600 transition-colors duration-300">
                          {item.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}