// src/pages/Auth.jsx
import { useState } from "react";
import axios from 'axios'
import { BASE_URL } from "../constants";
import { toast } from "react-toastify";

export default function AuthPage({ setIsAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);

  const [authState, setAuthState] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e)=>{
    setAuthState(prev=>({
        ...prev,
        [e.target.name] : e.target.value
    }))
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
       if(isLogin){
        const response = await axios.post(`${BASE_URL}/auth/login`,authState,{
            withCredentials:true
        })
        if(response.data && response.data.success){
            localStorage.setItem("user", JSON.stringify(response.data.data));
            toast.success(response.data.message)
        }
        setIsAuthenticated(true);
       } else{
        const response = await axios.post(`${BASE_URL}/auth/`,
          authState,{
            withCredentials:true
          }
        );
        if (response.data && response.data.success) {
          setIsLogin(!isLogin);
          toast.success(response.data.message);
        }
       }
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Login to your account" : "Create a new account"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                value={authState.name}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              name="email"
              value={authState.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              name="password"
              value={authState.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-purple-600 hover:underline font-medium"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
