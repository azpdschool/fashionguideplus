import React from 'react';
import { Sparkles, Grid3X3, BookOpen, Users, Zap, TrendingUp, Heart, Code } from 'lucide-react';

export default function AboutPage({ setCurrentPage }) {

  const featureCards = [
    {
      id: "categories",
      title: "Fashion Collection",
      description: "Browse curated collections of tops, bottoms, and accessories organized by category.",
      icon: <Grid3X3 className="w-8 h-8" />,
    },
    {
      id: "dictionary",
      title: "Fashion Dictionary",
      description: "Master the language of style with our glossary of fashion terms and definitions.",
      icon: <BookOpen className="w-8 h-8" />,
    },
    {
      id: "bodytype",
      title: "Body Type Guide",
      description: "Personalized fashion recommendations tailored to your body shape.",
      icon: <Users className="w-8 h-8" />,
    },
    {
      id: "styles",
      title: "Style Inspiration",
      description: "Explore curated aesthetics with palettes, fabrics, and styling tips.",
      icon: <Zap className="w-8 h-8" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
    <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
    <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center">
        <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-7 h-7 text-amber-200" />
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            About Fashion Guide+
            </h1>
        </div>

        <p className="text-slate-600 text-lg font-light max-w-2xl mx-auto">
            Your personal style companion for discovering and mastering fashion
        </p>
        </div>
    </div>
    </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* Mission */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                Fashion Guide+ helps you navigate the world of style with confidence.
              </p>
            </div>
          </div>
        </div>

        {/* Vision */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                We want fashion knowledge to be accessible, simple, and fun for everyone.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featureCards.map((card) => (
            <button
              key={card.id}
              onClick={() => setCurrentPage(card.id)}
              className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/60 p-8 shadow-sm hover:shadow-xl transition-all duration-500 group text-left"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <div className="text-amber-200">{card.icon}</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {card.description}
                  </p>
                </div>
              </div>
            </button>
          ))}

          {/* Manual Trending Card */}
          <button
            onClick={() => setCurrentPage("home")}
            className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/60 p-8 shadow-sm hover:shadow-xl transition-all duration-500 group text-left"
          >
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-8 h-8 text-amber-200" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Trending Fashion
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Explore what's trending every month.
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Technology */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center">
              <Code className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Built With Care</h2>
              <p className="text-gray-600 leading-relaxed">
                Fashion Guide+ is built with React, JavaScript, and modern PWA technology.
              </p>
            </div>
          </div>
        </div>

      </div>

      <div className="h-24" />
    </div>
  );
}
