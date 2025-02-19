export const getInitialTheme = (): boolean => {
  const savedTheme = localStorage.getItem('theme');
  const isDarkMode = savedTheme ? savedTheme === 'dark' :
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  applyTheme(isDarkMode);
  return isDarkMode;
};

export const applyTheme = (isDarkMode: boolean) => {
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
};