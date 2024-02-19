import React, { Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MembershipsPage from './pages/memberships/MembershipsPage';
import PaymentFormPage from './pages/paymentForm/PaymentFormPage';
import PaymentHandlePage from './pages/paymentHandle/PaymentHandlePage';
import PaymentHistoryPage from './pages/paymentHistory/PaymentHistoryPage';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { CouponManagement } from './pages/couponManagement/CouponManagementPage';
// import Trial from './Trial';
import { MenuContainer } from './components/MenuContainer';
import { Spinner } from '@material-tailwind/react';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="container m-auto h-screen max-w-screen-2xl ">
      <CurrencyProvider setIsLoading={setIsLoading}>
        <BrowserRouter>
          {isLoading ? (
            <Spinner className="w-16 m-auto h-screen text-gray-900/50 " />
          ) : (
            <>
              {/* <Trial /> */}

              <MenuContainer />
              <Routes>
                <Route
                  path="/"
                  element={<Navigate replace to="/memberships" />}
                />

                <Route path="/memberships" element={<MembershipsPage />} />
                <Route path="/payment" element={<PaymentFormPage />} />
                <Route path="/payment-handle" element={<PaymentHandlePage />} />
                <Route
                  path="/coupon-management"
                  element={<CouponManagement />}
                />
                <Route
                  path="/payment-history"
                  element={<PaymentHistoryPage />}
                />
              </Routes>
            </>
          )}
        </BrowserRouter>
      </CurrencyProvider>
    </div>
  );
}

export default App;
