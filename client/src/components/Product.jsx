import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Product = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    productImage: "",
  });

  const naviagte = useNavigate();
  const {id} = useParams()
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        let response
        if(id){
             response = await axios.patch(`${BASE_URL}/product/${id}`, form, {
              withCredentials: true,
            });
        }else{
             response = await axios.post(`${BASE_URL}/product`, form, {
              withCredentials: true,
            });
        }
        
        if (response.data && response.data.success) {
          setForm({ name: "", price: "", productImageUrl: "" });
          naviagte("/products");
          toast.success(response.data.message);
        }  
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message);
    } 
  };

  const fetchProduct = async ()=>{
    try {
    const response = await axios.get(`${BASE_URL}/product/${id}`,{
        withCredentials:true
    })
    if(response.data.success){
        setForm(response.data.data)
    }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(()=>{
    if(id){
        fetchProduct()
    }
  },[])


  return (
    <div className="max-w-xl mx-auto mt-12 bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-purple-700 text-center mb-8">
        {id ? "Update" : " ➕ Create New"} Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-gray-600 mb-2 font-medium">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-600 mb-2 font-medium">Price</label>
          <input
            type="text"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-gray-600 mb-2 font-medium">
            Image URL (Optional)
          </label>
          <input
            type="text"
            name="productImage"
            value={form.productImage}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          🚀 {id ? "Update Product ": "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default Product;
