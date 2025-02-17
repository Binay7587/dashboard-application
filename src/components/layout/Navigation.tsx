import { Home, PackageSearch, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const mainNavItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: PackageSearch, label: 'Products', path: '/products' },
  { icon: Users, label: 'Users', path: '/users' },
];

interface NavigationProps {
  onItemClick?: () => void;
}

const Navigation = ({ onItemClick }: NavigationProps) => {
  const location = useLocation();

  return (
    <nav className="flex-1 px-2 py-4 space-y-1">
      {mainNavItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${location.pathname === item.path
            ? 'bg-black dark:bg-white text-white dark:text-black'
            : 'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          onClick={onItemClick}
        >
          <item.icon className="w-5 h-5 mr-3" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;