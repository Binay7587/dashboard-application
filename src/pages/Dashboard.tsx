import { Package, Users } from "lucide-react";
import { useEffect, useState } from "react";
import CountCard from "../components/CountCard";
import { DashboardCounts } from "../types/dashboard";
import { userAxios } from "../utils/axios";
import { endpoints } from "../utils/endpoints";

const Dashboard = () => {
  const [counts, setCounts] = useState<DashboardCounts>({ userCount: 0, productCount: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const [usersResponse, productsResponse] = await Promise.all([
          userAxios.get(endpoints.user.count),
          userAxios.get(endpoints.product.count)
        ]);

        console.log(usersResponse)

        setCounts({
          userCount: usersResponse.data.total || 0,
          productCount: productsResponse.data.total || 0
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
        <CountCard title="Total Users" count={counts.userCount} icon={Users} isLoading={isLoading} />
        <CountCard title="Total Products" count={counts.productCount} icon={Package} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Dashboard;