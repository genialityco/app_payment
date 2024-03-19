import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { createPayment } from '../../services/paymentService';
import { createPaymentDb } from '../../services/paymentDbService';
import { PaymentForm } from './components/PaymentForm';
import { PurchaseSummary } from './components/PurchaseSummary';
import { useCurrency } from '../../contexts/CurrencyContext';
import { CouponInput } from './components/CouponInput';
import { Card, CardHeader, Button, Typography } from '@material-tailwind/react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../contexts/AuthContext';

// Hooks
import { useItem } from './hooks/useItem';
import { useFormData } from './hooks/useFormData';
import { useCoupon } from './hooks/useCoupon';
import { useCurrencyConverter } from './hooks/useCurrencyConverter';

const PaymentFormPage = () => {
  const { currency, selectedCountry, countries } = useCurrency();
  const { id } = useParams();
  const location = useLocation();

  const [item, loadItem] = useItem(id, location);
  const [formData, handleChange, handleSelectChange] = useFormData({
    name: '',
    document: '',
    email: '',
    profession: '',
    phone: '',
  });

  const [convertedPrice, setConvertedPrice] = useCurrencyConverter(
    item?.price || 0,
    item?.currency,
    currency
  );
  //console.log(convertedPrice)

  const [coupon, handleChangeCoupon, applyCoupon, couponId] = useCoupon(
    convertedPrice,
    setConvertedPrice
  );

  const { saveEventData } = useAuth();

  useEffect(() => {
    loadItem();
  }, [loadItem]);

  useEffect(() => {
    const paymentCreated = sessionStorage.getItem('paymentCreated');
    if (paymentCreated) {
      window.location.href = `${window.location.origin}/payment-handle`;
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    sessionStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handlePaymentDb = async (payment) => {
    const paymentDataDb = {
      payment_id: payment.id,
      order_id: payment.order_id,
      amount: convertedPrice,
      currency: currency,
      country: formData.country,
      status: payment.status,
      payer: formData,
      description: item.name,
      redirect_url: payment.redirect_url,
      coupon: couponId != '' ? couponId : null,
    };
    try {
      const response = await createPaymentDb(paymentDataDb);
      // if(response.status === "success"){
      //   saveEventData(response.data);
      // }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const infoPayment = {
      amount: convertedPrice,
      currency: currency,
      country: selectedCountry.countryCode,
      payer: formData,
      description: item.name,
      success_url: `${window.location.origin}/payment-handle`,
      back_url: `${window.location.origin}/payment/${id}`,
    };

    try {
      const response = await createPayment(infoPayment);
      sessionStorage.setItem('paymentId', response.id);
      sessionStorage.setItem('item', JSON.stringify(item));
      await handlePaymentDb(response);
      sessionStorage.setItem('paymentCreated', 'true');
      // window.location.href = response.redirect_url;
      window.open(`${response.redirect_url}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex justify-center p-4">
      <Card
        color="transparent"
        className="w-96 border-2 text-center lg:w-2/5 xl:w-2/6 bg-card "
      >
        <CardHeader
          color="white"
          shadow={false}
          className="m-0 grid place-items-center px-4 py-8 text-center bg-[url(/src/assets/graph.png)]  bg-[center_right_45%] bg-contain bg-no-repeat  "
        >
          <div className="mb-4 h-20 p-6 text-white ">
            <UserCircleIcon className="h-14 w-14 text-secundaryText" />
          </div>
          <Typography
            variant="h5"
            className="text-secundaryText font-openSans font-bold"
          >
            Datos del Comprador
          </Typography>
        </CardHeader>

        <form onSubmit={handleSubmit} className="mt-2 mb-3 p-6 w-full">
          <div className="mb-1 flex flex-col gap-6">
            <PaymentForm
              formData={formData}
              countries={countries}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
            />
            <PurchaseSummary
              item={item?.name}
              currency={currency}
              price={convertedPrice}
            />
            <CouponInput
              handleChange={handleChangeCoupon}
              applyCoupon={applyCoupon}
            />
          </div>
          <Button
            type="submit"
            className="mt-6 bg-btnPrimary"
            fullWidth
            disabled={
              !formData.name ||
              !formData.document ||
              !formData.email ||
              !formData.profession ||
              !formData.phone ||
              !formData.country ||
              !formData.prefix
            }
          >
            Pagar
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default PaymentFormPage;
