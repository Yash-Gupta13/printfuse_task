import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const naviagte = useNavigate()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/product`, {
          withCredentials: true,
        });
        setProducts(response.data.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error(error.response.data.message);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const response = window.confirm(`Are you sure you want to delete`);
    if(!response){
        return;
    }
    try {
      const response = await axios.delete(`${BASE_URL}/product/${id}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setProducts(products.filter((product) => product.id !== id));
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        📦 View Products
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-xl shadow">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Image</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product.d}
                  className="border-t hover:bg-purple-50 transition"
                >
                  <td className="p-4 text-gray-800">{product.name}</td>
                  <td className="p-4 text-gray-800">₹{product.price}</td>
                  <td className="p-4">
                    {product.productImage ? (
                      <img
                        src={product.productImage}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400 italic">No image</span>
                    )}
                  </td>
                  <td className="p-4 space-x-3">
                    <button
                      onClick={() => naviagte(`/create/${product.id}`)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
