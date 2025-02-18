import React from "react";
import Pagination from "./Pagination";

type Column = {
  name: string;
  className?: string;
}

interface PaginatedTableProps {
  columns: Column[];
  limit: number;
  setLimit: (limit: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  count: number;
  children: React.ReactNode;
}

const PaginatedTable = ({ columns, limit, setLimit, currentPage, setCurrentPage, count, children }: PaginatedTableProps) => {
  return (
    <>
      <div className="mt-4 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
              <thead>
                <tr>
                  {
                    columns.map((column: Column, index: number) => (
                      <th
                        key={index}
                        className={`px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white ${column.className}`}
                      >
                        {column.name}
                      </th>
                    ))
                  }
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-black">
                {children}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        count={count}
        limit={limit}
        setLimit={setLimit}
      />
    </>
  )
}

export default PaginatedTable