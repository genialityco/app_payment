import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createPayment } from '../../services/paymentService';
import { createPaymentDb } from '../../services/paymentDbService';
import { PaymentForm } from './components/PaymentForm';
import { PurchaseSummary } from './components/PurchaseSummary';
import { useCurrency } from '../../contexts/CurrencyContext';
import { CouponInput } from './components/CouponInput';
import { getCoupons } from '../../services/couponService';
import { Card, CardHeader, Button, Typography } from '@material-tailwind/react';


const PaymentFormPage = () => {
  const { currency, selectedCountry, countries } = useCurrency();
  const location = useLocation();
  const [membership, setMembership] = useState(
    () =>
      JSON.parse(sessionStorage.getItem('item')) ||
      location.state?.membership ||
      ''
  );
  const [convertedPrice, setConvertedPrice] = useState(0);
  const [formData, setFormData] = useState(() => {
    const savedFormData = sessionStorage.getItem('formData');
    return savedFormData
      ? JSON.parse(savedFormData)
      : {
          name: '',
          document: '',
          email: '',
          profession: '',
          phone: '',
        };
  });
  const [coupon, setCoupon] = useState('');
  const [couponId, setCouponId] = useState('');

  useEffect(() => {
    const paymentCreated = sessionStorage.getItem('paymentCreated');
    if (paymentCreated) {
      window.location.href = `${window.location.origin}/payment-handle`;
    }
  }, []);

  useEffect(() => {
    if (membership.price && currency) {
      convertCurrency(membership.price, membership.currency, currency);
    }
  }, [membership.price, currency]);

  useEffect(() => {
    sessionStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const convertCurrency = async (amount, fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) {
      setConvertedPrice(amount);
      return;
    }
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const rate = data.rates[toCurrency];
      setConvertedPrice((amount * rate).toFixed(2));
    } catch (error) {
      console.error('Error al convertir la moneda: ', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangeCoupon = (e) => {
    const { value } = e.target;
    setCoupon(value);
  };

  const applyCoupon = async () => {
    const coupons = await getCoupons();
    const couponData = coupons.data.filter((cou) => cou.code === coupon);
    const currentDate = new Date();

    if (
      couponData.length > 0 &&
      couponData[0].active &&
      couponData[0].used < couponData[0].limit &&
      new Date(couponData[0].expiration) > currentDate
    ) {
      const newPrice = (
        convertedPrice -
        (convertedPrice * couponData[0].discount) / 100
      ).toFixed(2);
      setCouponId(couponData[0]._id);
      setConvertedPrice(newPrice);
    } else {
      alert('El cupón no es válido o a vencido.');
    }
  };

  const handlePaymentDb = async (payment) => {
    const paymentDataDb = {
      payment_id: payment.id,
      order_id: payment.order_id,
      amount: convertedPrice,
      currency: currency,
      country: formData.country,
      status: payment.status,
      payer: formData,
      description: membership.name,
      redirect_url: payment.redirect_url,
      coupon: couponId != '' ? couponId : null,
    };
    try {
      await createPaymentDb(paymentDataDb);
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
      description: membership.name,
      success_url: `${window.location.origin}/payment-handle`,
      back_url: `${window.location.origin}/payment`,
    };
    try {
      const response = await createPayment(infoPayment);
      sessionStorage.setItem('paymentId', response.id);
      sessionStorage.setItem('memberShip', JSON.stringify(membership));
      await handlePaymentDb(response);
      sessionStorage.setItem('paymentCreated', 'true');
      window.location.href = response.redirect_url;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex justify-center p-4">
      <Card color="transparent" className="w-96 border-2 text-center lg:w-5/12 ">
        <CardHeader
          color="gray"
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center px-4 py-8 text-center"
        >
          <div className="mb-4 h-20 p-6 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-14 w-14 text-white"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
            {/*  <CreditCardIcon className="h-10 w-10 text-white" /> */}
          </div>
          <Typography variant="h5" color="white">
            Datos del Comprador
          </Typography>
        </CardHeader>

        <form
          onSubmit={handleSubmit}
          className="mt-2 mb-3 w-80 sm:w-96 lg:w-full p-6"
          // className="mt-2 mb-3 w-full p-6"
        >
          <div className="mb-1 flex flex-col gap-6">
            <PaymentForm
              formData={formData}
              countries={countries}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
            />
            <PurchaseSummary
              memberShip={membership.name}
              currency={currency}
              price={convertedPrice}
            />
            <CouponInput
              handleChange={handleChangeCoupon}
              applyCoupon={applyCoupon}
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Pagar
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default PaymentFormPage;
