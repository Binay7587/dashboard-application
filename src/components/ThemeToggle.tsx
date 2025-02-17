import { Sun, Moon } from 'lucide-react';
import { toggleTheme } from '../stores/theme/themeSlice';
import { useAppDispatch, useAppSelector } from '../stores/store';
import { selectIsDarkMode } from '../stores/theme/themeSelectors';

const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(selectIsDarkMode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-lg text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
};

export default ThemeToggle;