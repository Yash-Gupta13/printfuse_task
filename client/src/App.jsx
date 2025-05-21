import { Routes, Route, Navigate } from "react-router-dom";
import {useState } from "react";
import AuthPage from "./pages/Auth";
import DashboardLayout from "./pages/ProtectedLayout";
import Product from "./components/Product";
import AllProducts from "./components/AllProducts";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("user")); 
  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <AuthPage setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <DashboardLayout setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route path="create" element={<Product />} />
          <Route path="create/:id" element={<Product />} />
          <Route path="products" element={<AllProducts />} />
        </Route>
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
        />
      </Routes>
    </>
  );
};

export default App;
