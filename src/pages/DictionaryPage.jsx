// pages/DictionaryPage.jsx
import { useState, useMemo } from 'react';
import { dictionary } from '../data/dictionary';
import { Search, BookOpen, Sparkles, ChevronRight } from 'lucide-react';

export default function DictionaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');
  const [expandedLetter, setExpandedLetter] = useState(null);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const filteredDict = useMemo(() => 
    dictionary.filter(item => 
      (!selectedLetter || item.category === selectedLetter) &&
      (!searchQuery || item.term.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
    [searchQuery, selectedLetter]
  );

  // Group terms by first letter
  const groupedTerms = useMemo(() => {
    const groups = {};
    filteredDict.forEach(item => {
      const firstLetter = item.term[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(item);
    });
    return groups;
  }, [filteredDict]);

  const sortedLetters = Object.keys(groupedTerms).sort();

  const toggleLetter = (letter) => {
    setExpandedLetter(expandedLetter === letter ? null : letter);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pb-24">
      {/* Luxury Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-7 h-7 text-amber-200" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Fashion Dictionary
              </h1>
            </div>
            <p className="text-slate-600 text-lg font-light max-w-2xl mx-auto mb-8">
              Master the language of style with our comprehensive fashion glossary
            </p>

            {/* Search Bar - Luxury Style */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search fashion terms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm focus:shadow-xl focus:border-amber-300/50 transition-all duration-300 text-slate-800 placeholder-slate-400 font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alphabet Filter - Luxury Style */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-slate-200/60 z-10 py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-2 justify-center flex-wrap">
            {alphabet.map(letter => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(selectedLetter === letter ? '' : letter)}
                className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 ${
                  selectedLetter === letter
                    ? 'bg-gradient-to-br from-amber-500 to-amber-300 text-white shadow-lg scale-110'
                    : 'bg-white text-slate-600 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-200'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dictionary Content - Mirip CategoriesPage */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {filteredDict.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-20 h-20 mx-auto mb-6 text-slate-300" />
            <p className="text-lg font-medium text-slate-500 mb-2">No terms found</p>
            <p className="text-slate-400">Try a different search or letter</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedLetters.map((letter, index) => (
              <div 
                key={letter} 
                className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                {/* Letter Header - Clickable */}
                <div 
                  className="p-8 cursor-pointer group"
                  onClick={() => toggleLetter(letter)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      {/* Letter Icon */}
                      <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-2xl font-bold text-amber-200">
                          {letter}
                        </span>
                      </div>
                      
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">
                          Fashion items starting with {letter}
                        </h2>
                        <div className="flex items-center gap-4 text-slate-500">
                          <span className="text-sm font-medium">
                            {groupedTerms[letter].length} items
                          </span>
                          <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                          <span className="text-sm">Click to explore</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <ChevronRight className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${
                        expandedLetter === letter ? 'rotate-90' : ''
                      } group-hover:text-amber-500`} />
                    </div>
                  </div>
                </div>

                {/* Expandable Content */}
                {expandedLetter === letter && (
                  <div className="border-t border-slate-200/60 p-8 bg-gradient-to-br from-slate-50 to-white">
                    <div className="overflow-x-auto scrollbar-hide">
                      <div className="flex gap-6 snap-x snap-mandatory pb-4">
                        {groupedTerms[letter].map((item, idx) => (
                          <div
                            key={idx}
                            className="snap-start min-w-[260px] bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group/item"
                          >
                            {/* Image */}
                            <div className="relative h-48 bg-gradient-to-br from-slate-100 to-white overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.term}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                                onError={(e) => (e.target.src = '/images/fashion/placeholder.png')}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover/item:text-amber-600 transition-colors duration-300">
                                {item.term}
                              </h3>
                              <p className="text-slate-600 leading-relaxed font-light">
                                {item.definition}
                              </p>
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
        )}
      </div>
    </div>
  );
}