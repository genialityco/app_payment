import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ItemToPayPage from "./pages/itemToPay/ItemToPayPage";
import PaymentFormPage from "./pages/paymentForm/PaymentFormPage";
import PaymentHandlePage from "./pages/paymentHandle/PaymentHandlePage";
import PaymentHistoryPage from "./pages/paymentHistory/PaymentHistoryPage";
import LoginPage from "./pages/authentication/LoginPage"
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CouponManagement } from "./pages/couponManagement/CouponManagementPage";
import { MenuContainer } from "./components/MenuContainer";
import { Spinner } from "@material-tailwind/react";
import ItemToPayManagementPage from "./pages/itemsToPayManagement/ItemToPayManagementPage";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-[url(/src/assets/wave.png)] bg-no-repeat 2xl:bg-cover">
      <CurrencyProvider setIsLoading={setIsLoading}>
        <AuthProvider>
          <BrowserRouter>
            {isLoading ? (
              <Spinner className="w-16 m-auto h-screen text-gray-900/50 " />
            ) : (
              <>
                <MenuContainer />
                <Routes>
                  <Route
                    path="/"
                    element={<Navigate replace to="/items-to-pay" />}
                  />

                  <Route path="/items-to-pay" element={<ItemToPayPage />} />
                  <Route path="/payment/:id" element={<PaymentFormPage />} />
                  <Route
                    path="/payment-handle"
                    element={<PaymentHandlePage />}
                  />
                  <Route
                    path="/coupon-management"
                    element={<CouponManagement />}
                  />
                  <Route
                    path="/payment-history"
                    element={<PaymentHistoryPage />}
                  />
                  <Route
                    path="/login-admin"
                    element={<LoginPage />}
                  />
                  <Route 
                  path="/items-to-pay-management"
                  element={<ItemToPayManagementPage />}
                  />
                </Routes>
              </>
            )}
          </BrowserRouter>
        </AuthProvider>
      </CurrencyProvider>
    </div>
  );
}

export default App;
