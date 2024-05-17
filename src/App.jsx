import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ItemToPayPage from "./pages/itemToPay/ItemToPayPage";
import PaymentFormPage from "./pages/paymentForm/PaymentFormPage";
import PaymentHandlePage from "./pages/paymentHandle/PaymentHandlePage";
import PaymentHistoryPage from "./pages/paymentHistory/PaymentHistoryPage";
import LoginPage from "./pages/authentication/LoginPage";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CouponManagement } from "./pages/couponManagement/CouponManagementPage";
import { MenuContainer } from "./components/MenuContainer";
import { Spinner } from "@material-tailwind/react";
import ItemToPayManagementPage from "./pages/itemsToPayManagement/ItemToPayManagementPage";
import NamePromptModal from "./components/NamePromptModal";
import { SimpleFooter } from "./components/Footer";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [tempName, setTempName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setTempName(storedName);
    } else if (!isLoading) {
      setIsNameModalOpen(true);
    }
  }, [isLoading]);

  const handleNameSave = (name) => {
    setTempName(name);
    setIsNameModalOpen(false);
  };

  const backgroundStyle = {
    backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/magnetic-be10a.appspot.com/o/images%2FLogos.png?alt=media&token=cbb567ba-2851-4df3-a240-54e507d7d908')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
  };

  return (
    <div style={backgroundStyle}>
      <CurrencyProvider setIsLoading={setIsLoading}>
        <AuthProvider>
          <BrowserRouter>
            <NamePromptModal isOpen={isNameModalOpen} onSave={handleNameSave} />
            {isLoading ? (
              <Spinner className="w-16 m-auto h-screen text-gray-900/50" />
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
                  <Route path="/login-admin" element={<LoginPage />} />
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
