import React, { lazy, Suspense, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

// home pages  & dashboard
import Loading from "@/components/Loading";

const Dashboard = lazy(() => import("./pages/dashboard"));
const ManageInvoices = lazy(() => import("./pages/invoice/index"));
const InvoicePreviewPage = lazy(() =>
  import("./pages/invoice/invoice-preview")
);
const InvoiceAddPage = lazy(() => import("./pages/invoice/invoice-add"));
const ManageUsers = lazy(() => import("./pages/users/index"));
const ManageSubCategory = lazy(() => import("./pages/SubCategory/index"));
const ManageCategory = lazy(() => import("./pages/category/index"));
import Layout from "./layout/Layout";
import jwtService from "./store/services/jwt.service";
const useLocationChange = (action) => {
  const location = useLocation();
  useEffect(() => {
    action(location);
  }, [location]);
};
function App() {
  const navigate = useNavigate();
  useLocationChange((location) => {
    const pathname = location.pathname;

    // const path = pathname?.replace("/", "").split("/")[0];
    // if (!jwtService.getToken()) {
    //   dispatch(handleLogout(true)).then(() => navigate("/"));
    //   return false;
    // }
  });
  return (
    <main className="App  relative">
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="invoices"
            element={
              <Suspense fallback={<Loading />}>
                <ManageInvoices />
              </Suspense>
            }
          />
          <Route
            path={"invoice-preview/:id"}
            element={
              <Suspense fallback={<Loading />}>
                <InvoicePreviewPage />
              </Suspense>
            }
          />
          <Route
            path="invoice-edit/:id"
            element={
              <Suspense fallback={<Loading />}>
                <InvoiceAddPage />
              </Suspense>
            }
          />
          <Route
            path="invoice-add"
            element={
              <Suspense fallback={<Loading />}>
                <InvoiceAddPage />
              </Suspense>
            }
          />
          <Route
            path="users"
            element={
              <Suspense fallback={<Loading />}>
                <ManageUsers />
              </Suspense>
            }
          />
          <Route
            path="category"
            element={
              <Suspense fallback={<Loading />}>
                <ManageCategory />
              </Suspense>
            }
          />
          <Route
            path="sub-category"
            element={
              <Suspense fallback={<Loading />}>
                <ManageSubCategory />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
