import { ChevronLeft, ChevronRight } from 'lucide-react';
import { createPageNumbers } from '../../utils/utility';

interface PaginationProps {
  currentPage: number;
  count: number;
  limit: number;
  setLimit: (limit: number) => void;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({ currentPage, count, limit, setLimit, setCurrentPage }: PaginationProps) {
  const totalPages = Math.ceil(count / limit);
  const pageNumbers = createPageNumbers({ totalPages, currentPage });
  const itemsPerPage = [10, 20, 50, 100];

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white dark:bg-black px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white dark:bg-black px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white dark:bg-black px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Showing page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
          <div className="ml-4">
            <label htmlFor="itemsPerPage" className="mr-2 text-sm text-gray-700 dark:text-gray-300">
              Items per page:
            </label>
            <select
              id="itemsPerPage"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-gray-700 dark:text-gray-300 text-sm focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white"
            >
              {itemsPerPage.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(Number(number))}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${number === currentPage
                  ? 'z-10 bg-black dark:bg-white text-white dark:text-black '
                  : 'text-gray-900 dark:text-gray-100 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0'
                  }`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}