import axios from "axios";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import { toast } from "react-toastify";

const DashboardLayout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/logout`, null, {
        withCredentials: true,
      });
      if (response.data && response.data.success) {
        localStorage.removeItem("user");
        setIsAuthenticated(false)
        toast.success(response.data.message)
        navigate("/login");
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-purple-700 mb-8">Dashboard</h2>
          <nav className="flex flex-col gap-4">
            <NavLink
              to="create"
              className={({ isActive }) =>
                `py-2 px-4 rounded-md text-gray-700 hover:bg-purple-100 hover:text-purple-700 ${
                  isActive ? "bg-purple-100 text-purple-700 font-semibold" : ""
                }`
              }
            >
              ➕ Create Product
            </NavLink>
            <NavLink
              to="products"
              className={({ isActive }) =>
                `py-2 px-4 rounded-md text-gray-700 hover:bg-purple-100 hover:text-purple-700 ${
                  isActive ? "bg-purple-100 text-purple-700 font-semibold" : ""
                }`
              }
            >
              📦 All Products
            </NavLink>
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition"
        >
          🚪 Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
