import BottomNavbar from '../common/BottomNavbar';

export default function MainLayout({ children, currentPage, setCurrentPage }) {
  return (
    <div className="relative min-h-screen bg-gray-50">
      <main>{children}</main>
      <BottomNavbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}