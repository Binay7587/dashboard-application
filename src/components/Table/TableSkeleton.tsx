const TableSkeleton = ({ columns, rows = 10 }: { columns: number; rows?: number }) => {
  return (
    <>
      {
        Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex} className="animate-pulse border-b border-gray-200 dark:border-gray-700">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <td key={colIndex} className="px-4 py-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
              </td>
            ))}
          </tr>
        ))
      }
    </>
  );
};

export default TableSkeleton;
