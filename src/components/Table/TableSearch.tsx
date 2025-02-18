const TableSearch = ({ search, setSearch }: { search: string, setSearch: (search: string) => void }) => {
  return (
    <div className="relative rounded-md">
      <input
        type="text"
        name="search"
        id="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="block w-[250px] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black dark:focus:ring-white focus:outline-none sm:text-sm sm:leading-6 bg-white dark:bg-black"
        placeholder="Search products"
      />
    </div>
  )
}

export default TableSearch