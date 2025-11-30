import { useState } from 'react';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import DictionaryPage from './pages/DictionaryPage';
import BodyTypePage from './pages/BodyTypePage';
import StylesPage from './pages/StylesPage';
import BottomNavbar from './components/common/BottomNavbar';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="relative min-h-screen bg-gray-50">
      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'categories' && <CategoriesPage />}
      {currentPage === 'dictionary' && <DictionaryPage />}
      {currentPage === 'bodytype' && <BodyTypePage />}
      {currentPage === 'styles' && <StylesPage />}

      <BottomNavbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}