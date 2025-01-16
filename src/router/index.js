import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import Pegawai from "../pages/pegawai";
import Kelas from "../pages/kelas";
import Pelatihan from "../pages/pelatihan";

const PrivateRoute = ({ element }) => {
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));

  return isLogin ? element : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    element: <Layout />,

    children: [
      {
        path: "/pegawai",
        element: <PrivateRoute element={<Pegawai/>} />
      },
      {
        path: "/kelas",
        element: <PrivateRoute element={<Kelas/>} />,
      },
      {
        path: "/pelatihan",
        element: <PrivateRoute element={<Pelatihan/>} />,
      },
      {
        path: "/",
        element: <Navigate to="/login" />
      }
    ],
  },
]);


export default router;
