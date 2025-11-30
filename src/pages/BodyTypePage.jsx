// pages/BodyTypePage.jsx
import { useState } from 'react';
import { bodyTypes } from '../data/bodyTypes';
import { Users, ChevronRight, Shirt, ShoppingBag, Sparkles, Zap, Info } from 'lucide-react';

export default function BodyTypePage() {
  const [expandedBodyType, setExpandedBodyType] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState({});

  const toggleBodyType = (bodyTypeName) => {
    setExpandedBodyType(expandedBodyType === bodyTypeName ? null : bodyTypeName);
    if (expandedBodyType === bodyTypeName) {
      setExpandedCategory({});
    }
  };

  const toggleCategory = (bodyTypeName, category) => {
    setExpandedCategory(prev => ({
      ...prev,
      [bodyTypeName]: {
        ...prev[bodyTypeName],
        [category]: !prev[bodyTypeName]?.[category]
      }
    }));
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'tops': return <Shirt className="w-5 h-5" />;
      case 'bottoms': return <ShoppingBag className="w-5 h-5" />;
      case 'dress': return <Sparkles className="w-5 h-5" />;
      case 'outer': return <Zap className="w-5 h-5" />;
      default: return <Shirt className="w-5 h-5" />;
    }
  };

  const getCategoryTitle = (category) => {
    switch(category) {
      case 'tops': return 'Recommended Tops';
      case 'bottoms': return 'Recommended Bottoms';
      case 'dress': return 'Dress Shapes';
      case 'outer': return 'Outerwear';
      default: return category;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pb-24">
      {/* Luxury Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="w-7 h-7 text-amber-200" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Body Type Guide
              </h1>
            </div>
            <p className="text-slate-600 text-lg font-light max-w-2xl mx-auto">
              Discover fashion recommendations tailored to your body shape
            </p>
          </div>
        </div>
      </div>

      {/* Body Types Grid */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {bodyTypes.map((type, index) => (
            <div 
              key={type.name} 
              className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              {/* Body Type Header - Clickable */}
              <div 
                className="p-8 cursor-pointer group"
                onClick={() => toggleBodyType(type.name)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    {/* Body Type Image (menggantikan icon) */}
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg">
                      <img 
                        src={type.image}
                        alt={type.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = '/images/fashion/placeholder.png';
                        }}
                      />
                    </div>
                    
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">
                        {type.name}
                      </h2>
                      <div className="flex items-center gap-4 text-slate-500">
                        <span className="text-sm font-medium">{type.traits}</span>
                        <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                        <span className="text-sm">Click to explore recommendations</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <ChevronRight className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${
                      expandedBodyType === type.name ? 'rotate-90' : ''
                    } group-hover:text-amber-500`} />
                  </div>
                </div>
              </div>

              {/* Expandable Body Type Content */}
              {expandedBodyType === type.name && (
                <div className="border-t border-slate-200/60 p-8 bg-gradient-to-br from-slate-50 to-white">
                  {/* How to Recognize Section */}
                  <div className="mb-8 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-200 rounded-xl flex items-center justify-center">
                        <Info className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">How to Recognize This Body Type</h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed font-light">
                      {type.howToRecognize}
                    </p>
                  </div>

                  {/* Categories Grid */}
                  <div className="space-y-4">
                    {['tops', 'bottoms', 'dress', 'outer'].map((category) => (
                      <div 
                        key={category}
                        className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                      >
                        {/* Category Header - Clickable */}
                        <div 
                          className="p-6 cursor-pointer group/category"
                          onClick={() => toggleCategory(type.name, category)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                {getCategoryIcon(category)}
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-slate-900">
                                  {getCategoryTitle(category)}
                                </h3>
                                <p className="text-slate-500 text-sm">
                                  {type[category].length} recommended items
                                </p>
                              </div>
                            </div>
                            
                            <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                              expandedCategory[type.name]?.[category] ? 'rotate-90' : ''
                            } group-hover/category:text-amber-500`} />
                          </div>
                        </div>

                        {/* Expandable Category Content */}
                        {expandedCategory[type.name]?.[category] && (
                          <div className="border-t border-slate-200/60 p-6 bg-gradient-to-br from-slate-50 to-white">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                              {type[category].map((item, idx) => (
                                <div 
                                  key={idx}
                                  className="group/item text-center"
                                >
                                  {/* Item Image Container */}
                                  <div className="relative mb-4 rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm group-hover/item:shadow-xl transition-all duration-500">
                                    <div className="aspect-square relative overflow-hidden">
                                      <img 
                                        src={type.image}
                                        alt={type.name}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}