import { useEffect, useState } from "react";
import Pagination from "../components/Table/Pagination";
import useDebounce from "../hooks/useDebounce";
import { Product } from "../types/product";
import { userAxios } from "../utils/axios";
import { endpoints } from "../utils/endpoints";
import { getAvailabilityClass } from "../utils/utility";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

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
  }, [limit])

  if (isLoading) return <Loading />

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
      </div>

      <div className="mt-4 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    SN
                  </th>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-0">
                    Title
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Category
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Brand
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Price
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Stock
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Availability
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-black">
                {
                  products && products.length > 0 ? <>
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
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 dark:text-gray-400 capitalize">{product.category}</td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 dark:text-gray-400">{product.brand}</td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 dark:text-gray-400">{`Rs. ${product.price.toFixed(2)}`}</td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 dark:text-gray-400">{product.stock}</td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 dark:text-gray-400">
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
    </div>
  )
}