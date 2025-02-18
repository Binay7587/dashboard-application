import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PaginatedTable from "../components/Table/PaginatedTable";
import TableSearch from "../components/Table/TableSearch";
import TableSkeleton from "../components/Table/TableSkeleton";
import useDebounce from "../hooks/useDebounce";
import { Product } from "../types/product";
import { userAxios } from "../utils/axios";
import { endpoints } from "../utils/endpoints";
import { getAvailabilityClass } from "../utils/utility";

type ProductsResProps = {
  limit: number;
  skip: number;
  total: number;
  products: Product[];
}

export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(10);
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const columns = [
    { name: 'SN' },
    { name: 'Title', className: 'dark:text-white sm:pl-0' },
    { name: 'Category', className: 'capitalize' },
    { name: 'Brand' },
    { name: 'Price' },
    { name: 'Stock' },
    { name: 'Availability' },
  ]

  const dSearch = useDebounce(search, 300);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const result = await userAxios.get<ProductsResProps>(endpoints.product.list({
        search: dSearch,
        skip: (currentPage - 1) * limit,
        limit
      }));
      setCount(result.data.total)
      setProducts(result.data.products)
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch products")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [dSearch, currentPage, limit])

  useEffect(() => {
    setCurrentPage(1)
  }, [dSearch])

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Products</h1>
        <button
          type="button"
          className="block rounded-md bg-black dark:bg-white px-3 py-2 text-center text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-gray-800 dark:hover:bg-gray-200"
        >
          Add Product
        </button>
      </div>
      <div className="mt-4">
        <TableSearch search={search} setSearch={setSearch} />
      </div>

      <PaginatedTable columns={columns} limit={limit} setLimit={setLimit} currentPage={currentPage} setCurrentPage={setCurrentPage} count={count}>
        {
          isLoading ? <TableSkeleton columns={7} /> : products && products.length > 0 ? <>
            {
              products.map((product: Product, index: number) => (
                <tr key={product.id}>
                  <td className="w-[50px] pl-2 pr-0 text-sm text-gray-500 dark:text-gray-400">
                    {(currentPage - 1) * limit + index + 1}
                  </td>
                  <td className="max-w-[200px] py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div className="flex items-center">
                      <div className="h-18 w-18 flex-shrink-0">
                        <img className="h-18 w-18 rounded-full" src={product.thumbnail || "/placeholder.svg"} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900 dark:text-white">{product.title}</div>
                        <div className="mt-1 text-gray-500 dark:text-gray-400 line-clamp-2">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-5 text-sm text-gray-500 dark:text-gray-400 capitalize">{product.category}</td>
                  <td className="px-3 py-5 text-sm text-gray-500 dark:text-gray-400">{product.brand}</td>
                  <td className="px-3 py-5 text-sm text-gray-500 dark:text-gray-400">{`Rs. ${product.price.toFixed(2)}`}</td>
                  <td className="px-3 py-5 text-sm text-gray-500 dark:text-gray-400">{product.stock}</td>
                  <td className="px-3 py-5 text-sm text-gray-500 dark:text-gray-400">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getAvailabilityClass(
                        product.availabilityStatus
                      )}`}
                    >
                      {product.availabilityStatus}
                    </span>
                  </td>
                </tr>
              ))
            }
          </> : <tr>
            <td colSpan={7} className="py-20 text-center text-sm text-gray-500 dark:text-gray-400">No results found</td>
          </tr>
        }
      </PaginatedTable>
    </div>
  )
}