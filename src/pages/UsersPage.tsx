import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PaginatedTable from "../components/Table/PaginatedTable";
import TableSearch from "../components/Table/TableSearch";
import TableSkeleton from "../components/Table/TableSkeleton";
import useDebounce from "../hooks/useDebounce";
import { User } from "../types/user";
import { userAxios } from "../utils/axios";
import { endpoints } from "../utils/endpoints";

type UsersResProps = {
  limit: number;
  skip: number;
  total: number;
  users: User[];
}

export default function UsersPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(10);
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const columns = [
    { name: 'SN' },
    { name: 'Title', className: 'dark:text-white sm:pl-0' },
    { name: 'Company', className: 'capitalize' },
    { name: 'Username' },
    { name: 'Address' },
    { name: 'Phone' },
  ]

  const dSearch = useDebounce(search, 300);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const result = await userAxios.get<UsersResProps>(endpoints.user.list({
        search: dSearch,
        skip: (currentPage - 1) * limit,
        limit
      }));
      setCount(result.data.total)
      setUsers(result.data.users)
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch users")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  const handleUserAdd = () => {
    toast.warning("This feature is not available yet")
  }

  useEffect(() => {
    fetchUsers()
  }, [dSearch, currentPage, limit])

  useEffect(() => {
    setCurrentPage(1)
  }, [dSearch])

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Users</h1>
        <button
          type="button"
          onClick={handleUserAdd}
          className="block rounded-md bg-black dark:bg-white px-3 py-2 text-center text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-gray-800 dark:hover:bg-gray-200"
        >
          Add User
        </button>
      </div>
      <div className="mt-4">
        <TableSearch search={search} setSearch={setSearch} placeholder="Search users" />
      </div>

      <PaginatedTable columns={columns} limit={limit} setLimit={handleLimitChange} currentPage={currentPage} setCurrentPage={setCurrentPage} count={count}>
        {
          isLoading ? <TableSkeleton columns={6} /> : users && users.length > 0 ? <>
            {
              users.map((user: User, index: number) => (
                <tr key={user.id}>
                  <td className="w-[50px] pl-2 pr-0 text-sm text-gray-500 dark:text-gray-400">
                    {(currentPage - 1) * limit + index + 1}
                  </td>
                  <td className="max-w-[260px] py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div className="flex items-center">
                      <div className="h-18 w-18 flex-shrink-0">
                        <img className="h-18 w-18 rounded-full" src={user.image || "https://dummyjson.com/image/72x72"} alt="user profile" />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="mt-1 text-gray-500 dark:text-gray-400 line-clamp-1">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="max-w-[180px] py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div className="ml-4">
                      <div className="font-medium text-gray-900 dark:text-white">{user.company.name}</div>
                      <div className="mt-1 text-gray-500 dark:text-gray-400 line-clamp-1">{user.role}</div>
                    </div>
                  </td>
                  <td className="px-3 py-5 text-sm text-gray-500 dark:text-gray-400">{user.username}</td>
                  <td className="px-3 py-5 text-sm text-gray-500 dark:text-gray-400">{user.address.address}</td>
                  <td className="px-3 py-5 text-sm text-gray-500 dark:text-gray-400">{user.phone}</td>
                </tr>
              ))
            }
          </> : <tr>
            <td colSpan={6} className="py-20 text-center text-sm text-gray-500 dark:text-gray-400">No results found</td>
          </tr>
        }
      </PaginatedTable>
    </div>
  )
}