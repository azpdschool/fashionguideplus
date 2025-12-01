// pages/StylesPage.jsx
import { useState, useEffect } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { getImageUrl, handleImageError, getPlaceholderUrl } from '../utils/imageUtils';

export default function StylesPage() {
  const [styles, setStyles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedStyle, setExpandedStyle] = useState(null);
  // Di bagian atas component StylesPage, setelah useState  
  useEffect(() => {
    // Test URLs
    console.log('🧪 Testing Styles URLs:');
    console.log('old-money.jpg ->', getImageUrl('/images/fashion/styles/old-money.jpg'));
  }, []);

  // FETCH DATA FROM API
  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const response = await fetch('/api/styles');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setStyles(data);
      } catch (error) {
        console.error('Error fetching styles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStyles();
  }, []);

  const toggleStyle = (styleName) => {
    setExpandedStyle(expandedStyle === styleName ? null : styleName);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading styles...</p>
        </div>
      </div>
    );
  }

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
        <div className="space-y-8">
          {styles.map((style) => (
            <div 
              key={style.name} 
              className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              {/* Style Header - Clickable dengan Gambar */}
              <div 
                className="cursor-pointer group"
                onClick={() => toggleStyle(style.name)}
              >
                <div className="flex items-stretch">
                  {/* Style Image */}
                  <div className="w-48 flex-shrink-0">
                    <div className="h-full rounded-l-3xl overflow-hidden">
                      <img 
                        src={getImageUrl(style.image)}
                        alt={style.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={handleImageError}
                      />
                    </div>
                  </div>
                  
                  {/* Style Content */}
                  <div className="flex-1 p-8">
                    <div className="flex items-start justify-between h-full">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-slate-900 mb-3">
                          {style.name}
                        </h2>
                        <p className="text-slate-600 mb-4 max-w-2xl text-lg leading-relaxed">
                          {style.desc}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {style.keywords?.map((keyword, idx) => (
                            <span 
                              key={idx}
                              className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full text-sm font-medium border border-slate-200/60"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 pl-6">
                        <ChevronRight className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${
                          expandedStyle === style.name ? 'rotate-90' : ''
                        } group-hover:text-amber-500`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expandable Content */}
              {expandedStyle === style.name && (
                <div className="border-t border-slate-200/60 p-8 bg-gradient-to-br from-slate-50 to-white">
                  {/* Color Palette - Hanya Hex Codes */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Color Palette</h3>
                    <div className="flex flex-wrap gap-6">
                      {style.palettes?.map((color, index) => {
                        const colorHex = typeof color === 'string' ? getColorFromImagePath(color) : color.hex;
                        const colorName = typeof color === 'string' ? getCleanColorName(color) : color.name;
                        
                        return (
                          <div key={index} className="text-center">
                            <div 
                              className="w-20 h-20 rounded-2xl shadow-lg border border-slate-200/80 mb-3 transition-transform duration-300 hover:scale-110 hover:shadow-xl"
                              style={{ backgroundColor: colorHex }}
                            ></div>
                            <p className="text-sm font-semibold text-slate-800 mb-1">
                              {colorName}
                            </p>
                            <p className="text-xs text-slate-500 font-mono">
                              {colorHex.toUpperCase()}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Fabrics */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Fabrics & Materials</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {style.fabrics?.map((fabric, index) => (
                        <div key={index} className="text-center group/item">
                          <div className="relative mb-4 rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm group-hover/item:shadow-xl transition-all duration-500">
                            <div className="aspect-square relative overflow-hidden">
                              <img 
                                src={getImageUrl(fabric)}
                                alt={fabric}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                                onError={handleImageError}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                            </div>
                          </div>
                          <p className="font-semibold text-slate-900">
                            {typeof fabric === 'string' ? 
                              getCleanFabricName(fabric) : fabric.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Patterns */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Patterns</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {style.patterns?.map((pattern, index) => (
                        <div key={index} className="text-center group/item">
                          <div className="relative mb-4 rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm group-hover/item:shadow-xl transition-all duration-500">
                            <div className="aspect-square relative overflow-hidden">
                              <img 
                                src={getImageUrl(pattern)}
                                alt={pattern}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                                onError={handleImageError}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                            </div>
                          </div>
                          <p className="font-semibold text-slate-900">
                            {typeof pattern === 'string' ? 
                              getCleanPatternName(pattern) : pattern.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Items */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Key Items</h3>
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {style.items_gallery?.map((item, index) => (
                        <div key={index} className="text-center group/item">
                          <div className="relative mb-4 rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm group-hover/item:shadow-xl transition-all duration-500">
                            <div className="aspect-square relative overflow-hidden">
                              <img 
                                src={getImageUrl(item)}
                                alt={item}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                                onError={handleImageError}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                            </div>
                          </div>
                          <p className="font-semibold text-slate-900 text-sm">
                            {typeof item === 'string' ? 
                              getCleanItemName(item) : item.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outfit Inspirations */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Outfit Inspirations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {style.outfits?.map((outfit, index) => (
                        <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-xl transition-all duration-500">
                          <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                            <img 
                              src={getImageUrl(outfit.image)}
                              alt={outfit.title}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                              onError={handleImageError}
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

// Helper functions yang sudah dibersihkan
function getColorFromImagePath(path) {
  if (path.includes('placehold.co')) {
    try {
      const urlParams = new URL(path).searchParams;
      const text = urlParams.get('text') || '';
      
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
        'lilac': '#C8A2C8',
        'red': '#FF0000',
        'blue': '#0000FF',
        'green': '#008000',
        'yellow': '#FFFF00',
        'purple': '#800080',
        'pink': '#FFC0CB',
        'orange': '#FFA500',
        'brown': '#A52A2A',
        'gray': '#808080'
      };
      
      const colorName = text.toLowerCase().split(' ')[0].split('+')[0];
      return colorMap[colorName] || '#CCCCCC';
    } catch (error) {
      return '#CCCCCC';
    }
  }
  
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

function getCleanColorName(path) {
  if (path.includes('placehold.co')) {
    try {
      const urlParams = new URL(path).searchParams;
      const text = urlParams.get('text') || 'Color';
      // Hapus "Styles" dan ekstensi file, bersihkan nama
      const cleanText = text
        .replace('Styles ', '')
        .replace('.jpg', '')
        .replace('.png', '')
        .split('+')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return cleanText;
    } catch (error) {
      return 'Color';
    }
  }
  
  const fileName = path.split('/').pop().replace('.jpg', '').replace('.png', '');
  return fileName.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function getCleanFabricName(path) {
  if (path.includes('placehold.co')) {
    try {
      const urlParams = new URL(path).searchParams;
      const text = urlParams.get('text') || 'Fabric';
      const cleanText = text
        .replace('Styles ', '')
        .replace('.jpg', '')
        .replace('.png', '')
        .split('+')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return cleanText;
    } catch (error) {
      return 'Fabric';
    }
  }
  
  const fileName = path.split('/').pop().replace('.jpg', '').replace('.png', '');
  return fileName.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function getCleanPatternName(path) {
  if (path.includes('placehold.co')) {
    try {
      const urlParams = new URL(path).searchParams;
      const text = urlParams.get('text') || 'Pattern';
      const cleanText = text
        .replace('Styles ', '')
        .replace('.jpg', '')
        .replace('.png', '')
        .split('+')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return cleanText;
    } catch (error) {
      return 'Pattern';
    }
  }
  
  const fileName = path.split('/').pop().replace('.jpg', '').replace('.png', '');
  return fileName.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function getCleanItemName(path) {
  if (path.includes('placehold.co')) {
    try {
      const urlParams = new URL(path).searchParams;
      const text = urlParams.get('text') || 'Item';
      const cleanText = text
        .replace('Styles ', '')
        .replace('.jpg', '')
        .replace('.png', '')
        .split('+')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return cleanText;
    } catch (error) {
      return 'Item';
    }
  }
  
  const fileName = path.split('/').pop().replace('.jpg', '').replace('.png', '');
  return fileName.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}