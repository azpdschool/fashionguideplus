import { styles } from '../data/styles';
import { Sparkles, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function StylesPage() {
  const [expandedStyle, setExpandedStyle] = useState(null);

  const toggleStyle = (styleName) => {
    setExpandedStyle(expandedStyle === styleName ? null : styleName);
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
                Fashion Styles
              </h1>
            </div>
            <p className="text-slate-600 text-lg font-light max-w-2xl mx-auto">
              Discover curated fashion styles and build your signature look
            </p>
          </div>
        </div>
      </div>

      {/* Styles Grid */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {styles.map((style, index) => (
            <div 
              key={style.name} 
              className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              {/* Style Header - Clickable */}
              <div 
                className="p-8 cursor-pointer group"
                onClick={() => toggleStyle(style.name)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    {/* Style Icon/Number */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${style.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <span className="text-2xl">
                        {style.icon}
                      </span>
                    </div>
                    
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">
                        {style.name}
                      </h2>
                      <p className="text-slate-600 mb-3 max-w-2xl">
                        {style.desc}
                      </p>
                      <div className="flex items-center gap-4 text-slate-500">
                        <div className="flex flex-wrap gap-2">
                          {style.keywords.map((keyword, idx) => (
                            <span 
                              key={idx}
                              className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                        <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                        <span className="text-sm">Click to explore</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <ChevronRight className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${
                      expandedStyle === style.name ? 'rotate-90' : ''
                    } group-hover:text-amber-500`} />
                  </div>
                </div>
              </div>

              {/* Expandable Content */}
              {expandedStyle === style.name && (
                <div className="border-t border-slate-200/60 p-8 bg-gradient-to-br from-slate-50 to-white">
                  {/* Color Palette */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Color Palette</h3>
                    <div className="flex gap-4">
                      {style.palettes.map((color, index) => (
                        <div key={index} className="text-center">
                          <div 
                            className="w-16 h-16 rounded-2xl shadow-sm border border-slate-200 mb-2"
                            style={{ 
                              backgroundColor: typeof color === 'string' ? 
                                getColorFromImagePath(color) : color.hex 
                            }}
                          ></div>
                          <p className="text-sm font-medium text-slate-700">
                            {typeof color === 'string' ? 
                              getColorNameFromPath(color) : color.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fabrics */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Fabrics & Materials</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {style.fabrics.map((fabric, index) => (
                        <div key={index} className="text-center group/item">
                          <div className="relative mb-4 rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm group-hover/item:shadow-xl transition-all duration-500">
                            <div className="aspect-square relative overflow-hidden">
                              <img 
                                src={item.image}
                                alt={item.name}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                                onError={(e) => {
                                  e.target.src = '/images/fashion/placeholder.png';
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                            </div>
                          </div>
                          <p className="font-semibold text-slate-900">
                            {typeof fabric === 'string' ? 
                              getFabricNameFromPath(fabric) : fabric.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Patterns */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Patterns</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {style.patterns.map((pattern, index) => (
                        <div key={index} className="text-center group/item">
                          <div className="relative mb-4 rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm group-hover/item:shadow-xl transition-all duration-500">
                            <div className="aspect-square relative overflow-hidden">
                              <img 
                                src={item.image}
                                alt={item.name}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                                onError={(e) => {
                                  e.target.src = '/images/fashion/placeholder.png';
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                            </div>
                          </div>
                          <p className="font-semibold text-slate-900">
                            {typeof pattern === 'string' ? 
                              getPatternNameFromPath(pattern) : pattern.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Items */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Key Items</h3>
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {style.itemsGallery.map((item, index) => (
                        <div key={index} className="text-center group/item">
                          <div className="relative mb-4 rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm group-hover/item:shadow-xl transition-all duration-500">
                            <div className="aspect-square relative overflow-hidden">
                              <img 
                                src={item.image}
                                alt={item.name}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                                onError={(e) => {
                                  e.target.src = '/images/fashion/placeholder.png';
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                            </div>
                          </div>
                          <p className="font-semibold text-slate-900 text-sm">
                            {typeof item === 'string' ? 
                              getItemNameFromPath(item) : item.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outfit Inspirations */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Outfit Inspirations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {style.outfits.map((outfit, index) => (
                        <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-xl transition-all duration-500">
                          <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                          <img 
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                            onError={(e) => {
                              e.target.src = '/images/fashion/placeholder.png';
                            }}
                          />
                          </div>
                          <div className="p-4">
                            <h4 className="font-bold text-slate-900 mb-2">{outfit.title}</h4>
                            <p className="text-slate-600 text-sm mb-2">{outfit.combo}</p>
                            <p className="text-slate-500 text-xs">{outfit.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
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

// Helper functions untuk handle data yang bisa berupa string atau object
function getColorFromImagePath(path) {
  // Fallback colors berdasarkan nama file
  const colorMap = {
    'ivory': '#FFFFF0',
    'camel': '#C19A6B',
    'navy': '#000080',
    'forest': '#228B22',
    'white': '#FFFFFF',
    'black': '#000000',
    'taupe': '#B3A79A',
    'charcoal': '#36454F',
    'sage': '#87AE73',
    'blush': '#DE5D83',
    'beige': '#F5F5DC',
    'milk-latte': '#F3E5AB',
    'denim-blue': '#6F8FAF',
    'neon-green': '#39FF14',
    'lilac': '#C8A2C8'
  };
  
  const fileName = path.split('/').pop().replace('.jpg', '').replace('.png', '');
  return colorMap[fileName] || '#CCCCCC';
}

function getColorNameFromPath(path) {
  const fileName = path.split('/').pop().replace('.jpg', '').replace('.png', '');
  return fileName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function getFabricNameFromPath(path) {
  const fileName = path.split('/').pop().replace('.jpg', '').replace('.png', '');
  return fileName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function getPatternNameFromPath(path) {
  const fileName = path.split('/').pop().replace('.jpg', '').replace('.png', '');
  return fileName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function getItemNameFromPath(path) {
  const fileName = path.split('/').pop().replace('.jpg', '').replace('.png', '');
  return fileName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}