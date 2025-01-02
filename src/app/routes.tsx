import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import NotFoundPage from "./NotFoundPage";
import { eventRoutes } from "@/modules/events";
import { authRoutes } from "@/modules/auth";
import { paymentRoutes } from "@/modules/payment";

const router = createBrowserRouter([
  ...authRoutes,
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [...eventRoutes, ...paymentRoutes],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
