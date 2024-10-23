import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import MainContent from "./components/MainContent.jsx";
import CreateQuotation from "./components/CreateQuotation.jsx";
import QuotationDetails from "./components/quotationDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainContent />,
      },

      {
        path: "/create-quotation",
        element: <CreateQuotation />,
      },

      {
        path: "/quotation-details/:quotation_id",
        element: <QuotationDetails/>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
