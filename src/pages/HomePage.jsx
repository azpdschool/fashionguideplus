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
      title: 'Fashion Collection',
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
      image: 'https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion-images/home/P00335234.avif',
      title: 'MAX MARA - Teddy Bear Coat',
      description: "Max Mara updates a timeless silhouette with high-impact texture, rendering this brown double-breasted coat in a plush camel hair and silk teddy. The tactile twist feels fashion-forward yet perfectly refined, its playful quality tempered by this design's tailoring and menswear-inspired mood. Let yours bring touchable cool factor to crisp shirts with slim ankle pants and brogues.",
      link: 'https://us.maxmara.com/p-1016085206001-teddy-camel'
    },
    {
      image: 'https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion-images/home/w2000_q80.avif',
      title: 'BALENCIAGA - Le City small embellished textured-leather tote',
      description: "Crafted from textured-leather, Balenciaga's 'Le City' tote is punctuated with a zipper and plenty of studs, inspired by vintage biker jackets. The small version has braided handles with a longer, removable strap, so you can switch between carrying it in-hand or over your shoulder. Store a little notebook, wallet and lipstick inside.",
      link: 'https://www.net-a-porter.com/en-us/shop/product/balenciaga/bags/shoulder-bags/le-city-small-embellished-textured-leather-tote/1647597346418131'
    },
    {
      image: 'https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion-images/home/w2000_q80%20(1).avif',
      title: 'PROENZA SCHOULER - Tee pumps',
      description: "Proenza Schouler's 'Tee' pumps will inject a generous dose of glamour into your party outfits this season. They're made from sequinned mesh and layered with paillettes to create a light-reflecting, feathered effect and have metallic fluted heels.",
      link: 'https://www.net-a-porter.com/en-us/shop/product/proenza-schouler/shoes/mid-heel/tee-sequined-mesh-pumps/46376663162978432'
    },
    {
      image: 'https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion-images/home/w2000_q80.webp',
      title: 'BALENCIAGA - Oversized Hooded Pussy-Bow Satin-Jacquard Blouse',
      description: "Balenciaga's blouse is cut from soft satin that's jacquard-woven with the label's wordmark. Worn on the Resort '23 runway, it has oversized fit with an '80s-style pussy-bow that doubles as a hood at the back. Style yours tucked into a midi skirt.",
      link: 'https://www.net-a-porter.com/en-us/shop/product/balenciaga/clothing/blouses/oversized-hooded-pussy-bow-satin-jacquard-blouse/1647597301852083'
    },
    {
      image: 'https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion-images/home/ANYA-SKIRT_CREAM-MULTI_41754216-128_GHOST_jpg.webp',
      title: 'KHAITE - Anya Skirt',
      description: "Designed to hit below the knee, this knife-pleated twill midi skirt is encircled and enlivened by a precisely placed floral print. Hand-finishing of gradated pleats evokes uniforms of the 1940s.",
      link: 'https://khaite.com/collections/new/products/anya-skirt-in-cream-multi'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pb-24">
      {/* Luxury Header - Same as DictionaryPage */}
<div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
  <div className="max-w-6xl mx-auto px-6 py-12">
    <div className="text-center">

      {/* ICON HEADER YANG KAMU MAKSUD */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Sparkles className="w-8 h-8 text-amber-200" />
        </div>
      </div>

      {/* TITLE */}
      <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-3">
        Fashion Guide+
      </h1>

      {/* SUBTITLE */}
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