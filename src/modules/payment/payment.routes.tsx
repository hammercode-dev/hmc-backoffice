import { RouteObject } from "react-router-dom";
import PaymentListPage from "./pages/PaymentListPage";

export const paymentRoutes: RouteObject[] = [
  {
    path: "payments",
    element: <PaymentListPage />,
  },
];
