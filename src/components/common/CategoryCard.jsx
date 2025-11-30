import { Shirt, ShoppingBag, Sparkles } from 'lucide-react';

const CategoryIcon = ({ category }) => {
  const iconClass = "w-8 h-8";
  switch(category) {
    case 'tops': return <Shirt className={iconClass} />;
    case 'bottoms': return <ShoppingBag className={iconClass} />;
    case 'dresses': return <Sparkles className={iconClass} />;
    case 'outerwear': return <Shirt className={iconClass} />;
    case 'accessories': return <ShoppingBag className={iconClass} />;
    case 'footwear': return <Sparkles className={iconClass} />;
    default: return <Shirt className={iconClass} />;
  }
};

export default function CategoryCard({ category }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all">
      <div className={`bg-gradient-to-r ${category.color} p-4 rounded-t-2xl`}>
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
            <CategoryIcon category={category.id} />
          </div>
          <h3 className="text-2xl font-bold text-white">{category.name}</h3>
        </div>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {category.items.map(item => (
            <span key={item} className={`px-4 py-2 ${category.bgColor} text-gray-800 rounded-full text-sm font-medium`}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}