// HomePage.jsx
import { useState, useRef } from 'react';
import { Sparkles, Grid3X3, BookOpen, Users, Zap, TrendingUp, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function HomePage({ setCurrentPage }) {
  const [previewImage, setPreviewImage] = useState(null);
  const trendingScrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (trendingScrollRef.current) {
      const scrollAmount = 300;
      trendingScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const featureCards = [
    {
      id: 'categories',
      icon: <Grid3X3 className="w-8 h-8" />,
      title: 'Fashion Categories',
      description: 'Explore clothing by type and occasion',
    },
    {
      id: 'dictionary',
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Fashion Dictionary',
      description: 'Learn fashion terms and definitions',
    },
    {
      id: 'bodytype',
      icon: <Users className="w-8 h-8" />,
      title: 'Body Type Guide',
      description: 'Find styles that complement your shape',
    },
    {
      id: 'styles',
      icon: <Zap className="w-8 h-8" />,
      title: 'Style Inspiration',
      description: 'Discover curated fashion aesthetics',
    }
  ];

  const trendingItems = [
    {
      image: '/images/fashion/teddybearcoat.jpg',
      title: 'Teddy Bear Coat',
      description: 'Max Mara',
      link: 'https://us.maxmara.com/p-1016085206001-teddy-camel'
    },
    {
      image: '/images/fashion/straightjeans.png',
      title: 'Straight Jeans',
      description: 'Modern cut'
    },
    {
      image: '/images/fashion/maxidress.png',
      title: 'Maxi Dress',
      description: 'Flowy fabric'
    },
    {
      image: '/images/fashion/denimjacket.png',
      title: 'Denim Jacket',
      description: 'Vintage style'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pb-24">
      {/* Luxury Header - Same as DictionaryPage */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-amber-200" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Fashion Guide+
              </h1>
            </div>
            <p className="text-slate-600 text-lg font-light max-w-2xl mx-auto">
              Master the art of style with our comprehensive fashion guides
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Feature Grid - Subtle Cards like DictionaryPage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {featureCards.map((card) => (
            <button
              key={card.id}
              onClick={() => setCurrentPage(card.id)}
              className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/60 p-8 shadow-sm hover:shadow-xl transition-all duration-500 group hover:scale-[1.02] active:scale-[0.98] text-left"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500">
                  <div className="text-amber-200">
                    {card.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-800 transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-light">
                    {card.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Trending This Month Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/60 p-8 shadow-sm">
          {/* Section Header */}
          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-7 h-7 text-amber-200" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Trending This Month
              </h2>
              <p className="text-slate-600 font-light">
                Most popular items in the fashion world
              </p>
            </div>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            <button 
              onClick={() => handleScroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 backdrop-blur-sm shadow-lg p-3 rounded-2xl border border-slate-200/60 z-10 hover:scale-110 transition-all duration-300 hover:shadow-xl"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>

            <button 
              onClick={() => handleScroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 backdrop-blur-sm shadow-lg p-3 rounded-2xl border border-slate-200/60 z-10 hover:scale-110 transition-all duration-300 hover:shadow-xl"
            >
              <ChevronRight className="w-5 h-5 text-slate-700" />
            </button>

            {/* Scroll Container */}
            <div 
              ref={trendingScrollRef}
              className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth px-2 py-4"
            >
              {trendingItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex-none w-48 text-center group cursor-pointer"
                >
                  <div className="relative w-full h-48 rounded-2xl mb-4 overflow-hidden bg-white border border-slate-200/80 shadow-sm group-hover:shadow-xl transition-all duration-500">
                    {item.link ? (
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full h-full"
                      >
                        <img 
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-4"
                          onError={(e) => {
                            e.target.src = '/images/fashion/placeholder.png';
                          }}
                        />
                      </a>
                    ) : (
                      <img 
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-4"
                        onError={(e) => {
                          e.target.src = '/images/fashion/placeholder.png';
                        }}
                      />
                    )}
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-slate-800 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-xs font-light">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Preview Image */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button 
              className="absolute -top-16 right-0 text-white hover:text-slate-300 transition-colors p-2"
              onClick={() => setPreviewImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={previewImage} 
                loading="eager" // ← ini sengaja eager karena user sudah intent melihat
                decoding="sync"
                className="max-w-full max-h-[80vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}