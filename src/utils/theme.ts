export const getInitialTheme = (): boolean => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme === 'dark';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const applyTheme = (isDarkMode: boolean) => {
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
};