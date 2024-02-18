import { useState, useEffect, useCallback } from 'react';
import {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
} from '../../services/couponService';
import { getMemberships } from '../../services/membershipService';
import { getPayments } from '../../services/paymentDbService';
import { format } from 'date-fns';
import { TableCupons } from './tables/TableCoupons';
import { TableUsedCoupons } from './tables/TableUsedCoupons';
import { CouponForm } from './modals/CouponForm';
import { Typography, Button } from '@material-tailwind/react';

const getAllCoupons = async () => {
  const couponsData = await getCoupons();
  return couponsData.data;
};

export const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponEdit, setCouponEdit] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [memberships, setMemberships] = useState([]);
  const [payments, setPayments] = useState([]);
  const [showUsedCoupons, setShowUsedCoupons] = useState(false);

  useEffect(() => {
    const init = async () => {
      const couponsData = await getAllCoupons();
      const membershipsData = await getMemberships();
      setMemberships(membershipsData.data);
      setCoupons(couponsData);
    };
    init();
  }, []);

  const formatDate = useCallback((dateString) => {
    if (!dateString) return '';

    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[2].split('T')[0], 10);

    const date = new Date(year, month, day);

    return format(date, 'dd/MM/yy');
  }, []);

  // Funciones para manejar los cupones
  const createNewCoupon = async (couponData) => {
    const newCoupon = await createCoupon(couponData);
    setCoupons((prev) => [...prev, newCoupon.data]);
    setIsModalOpen(false);
  };

  const updatedCreatedCoupon = async (couponData) => {
    await updateCoupon(couponData._id, couponData);
    await getAllCoupons().then((couponsData) => setCoupons(couponsData));
    setIsModalOpen(false);
  };

  const deleteCreatedCoupon = async (couponId) => {
    await deleteCoupon(couponId);
    await getAllCoupons().then((couponsData) => setCoupons(couponsData));
  };

  const toggleCouponStatus = async (id) => {
    const coupon = await getCouponById(id);
    const updatedCouponData = {
      active: !coupon.data.active,
    };
    await updateCoupon(id, updatedCouponData);
    await getAllCoupons().then((couponsData) => setCoupons(couponsData));
  };

  // Funciones para consultar uso de cupones
  const getAllPayments = async () => {
    const paymentsData = await getPayments();
    const itemsWithCoupon = paymentsData.data.filter(
      (payment) => payment.coupon !== null
    );
    setPayments(itemsWithCoupon);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setCouponEdit({});
  };

  const openModalEdit = (coupon) => {
    setCouponEdit(coupon);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  return (
    <div className="mx-3 md:mx-5 relative">
      <CouponForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        memberships={memberships}
        createNewCoupon={createNewCoupon}
        updatedCreatedCoupon={updatedCreatedCoupon}
        couponEdit={couponEdit}
        isEditMode={isEditMode}
      />
      <div>
        <div className="flex flex-col justify-center p-5">
          <div className="flex justify-start m-auto ">
            {!showUsedCoupons ? (
              <Typography
                variant="h2"
                className="p-4 text-3xl lg:text-4xl"
                color="blue-gray"
              >
                Cupones
              </Typography>
            ) : (
              <Typography variant="h2" className="p-2" color="blue-gray">
                Historial de usos
              </Typography>
            )}
          </div>
          <div className="flex justify-end gap-2 m-0">
            {!showUsedCoupons ? (
              <Button
                color="green"
                onClick={() => setIsModalOpen(true)}
                className="w-20 p-0"
              >
                Crear
              </Button>
            ) : null}
            <Button
              color="blue-gray"
              onClick={() => setShowUsedCoupons(!showUsedCoupons)}
              className="w-28 p-3"
            >
              {showUsedCoupons ? 'Ver cupones' : 'Ver usos'}
            </Button>
          </div>
        </div>
        <div>
          {!showUsedCoupons ? (
            <TableCupons
              coupons={coupons}
              formatDate={formatDate}
              openModalEdit={openModalEdit}
              deleteCreatedCoupon={deleteCreatedCoupon}
              toggleCouponStatus={toggleCouponStatus}
            />
          ) : (
            <TableUsedCoupons
              getAllPayments={getAllPayments}
              payments={payments}
              formatDate={formatDate}
              showUsedCoupons={showUsedCoupons}
            />
          )}
        </div>
      </div>
    </div>
  );
};
