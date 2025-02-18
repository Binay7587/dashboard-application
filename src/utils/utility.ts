export const createPageNumbers = ({ totalPages, currentPage }: { totalPages: number, currentPage: number }) => {
  const pages = [];
  // Number of pages before and after current page
  const range = 2;

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  pages.push(1); // First page
  if (currentPage > range + 2) pages.push('...');

  for (let i = Math.max(2, currentPage - range); i <= Math.min(totalPages - 1, currentPage + range); i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - (range + 1)) pages.push('...');
  pages.push(totalPages); // Last page

  return pages;
};

export const getAvailabilityClass = (status: string) => {
  switch (status) {
    case "In Stock":
      return "bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 ring-green-600/20";
    case "Low Stock":
      return "bg-yellow-50 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 ring-yellow-600/20";
    case "Out of Stock":
      return "bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 ring-red-600/20";
    default:
      return "bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 ring-gray-600/20";
  }
};
