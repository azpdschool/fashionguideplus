// components/common/BottomNavbar.jsx
import { Home, Grid3X3, BookOpen, Users, Zap } from 'lucide-react';

export default function BottomNavbar({ currentPage, setCurrentPage }) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'categories', icon: Grid3X3, label: 'Categories' },
    { id: 'dictionary', icon: BookOpen, label: 'Dictionary' },
    { id: 'bodytype', icon: Users, label: 'Body Type' },
    { id: 'styles', icon: Zap, label: 'Styles' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-slate-200/60 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex flex-col items-center py-3 px-4 transition-all duration-300 ${
                isActive ? 'text-amber-600' : 'text-slate-500'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}