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
import { UserCircleIcon } from '@heroicons/react/24/solid';

const PaymentFormPage = () => {
  const { currency, selectedCountry, countries } = useCurrency();
  const location = useLocation();
  const [item, setItem] = useState(
    () =>
      JSON.parse(sessionStorage.getItem('item')) ||
      location.state?.item ||
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
    if (item.price && currency) {
      convertCurrency(item.price, item.currency, currency);
    }
  }, [item.price, currency]);

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
      description: item.name,
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
      description: item.name,
      success_url: `${window.location.origin}/payment-handle`,
      back_url: `${window.location.origin}/payment`,
    };
    try {
      const response = await createPayment(infoPayment);
      sessionStorage.setItem('paymentId', response.id);
      sessionStorage.setItem('item', JSON.stringify(item));
      await handlePaymentDb(response);
      sessionStorage.setItem('paymentCreated', 'true');
      window.location.href = response.redirect_url;
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
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center px-4 py-8 text-center bg-[url(/src/assets/graph.png)]  bg-[center_right_45%] bg-contain bg-no-repeat  "
        >
          <div className="mb-4 h-20 p-6 text-white ">
            <UserCircleIcon className="h-14 w-14 text-secundaryText" />
          </div>
          <Typography variant="h5" className="text-secundaryText font-openSans font-bold">
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
              item={item.name}
              currency={currency}
              price={convertedPrice}
            />
            <CouponInput
              handleChange={handleChangeCoupon}
              applyCoupon={applyCoupon}
            />
          </div>
          <Button type="submit" className="mt-6 bg-btnFormUser" fullWidth>
            Pagar
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default PaymentFormPage;
