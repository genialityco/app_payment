import React, { useState, useEffect } from 'react';
import { getPaymentByOrderId } from '../../services/paymentDbService';
import { Link } from 'react-router-dom';
import { List, Button, Card, Typography } from '@material-tailwind/react';

const PaymentHandlePage = () => {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        setLoading(true);
        const orderId = sessionStorage.getItem('paymentId');
        const paymentData = await getPaymentByOrderId(orderId);
        setPayment(paymentData.data);

        // localStorage.removeItem("formData");
        // localStorage.removeItem("item");
        // localStorage.removeItem("price");
        // localStorage.removeItem("paymentId");
        // localStorage.removeItem("selectedCountryCode");
        // sessionStorage.removeItem("paymentCreated");
      sessionStorage.clear();
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, []);

  if (loading)
    return (
      <Typography
        variant="h3"
        className="h-[calc(100vh-161px)] mt-20 text-primaryText text-center font-openSans font-semibold"
      >
        Cargando detalles del pago...
      </Typography>
    );
  if (error)
    return (
      <Typography
        variant="h3"
        className="h-[calc(100vh-161px)] mt-20 text-primaryText text-center font-openSans font-semibold"
      >
        Error al cargar el pago: {error.message}
      </Typography>
    );
  if (!payment)
    return (
      <Typography
        variant="h3"
        className="h-[calc(100vh-161px)] mt-20 xl:mt-24 text-primaryText text-center font-openSans font-semibold"
      >
        No se encontró el pago
      </Typography>
    );

  // Función para determinar el mensaje según el estado del pago
  const paymentStatusMessage = () => {
    switch (payment.status) {
      case 'PAID':
        return (
          <p className="font-openSans font-semibold text-secundaryText text-justify">
            {' '}
            Estimado{' '}
            <span className="font-openSans font-bold italic">
              {' '}
              {payment.payer.name}
            </span>
            , el pago de su{' '}
            <span className="font-openSans font-bold italic">
              {payment.description}
            </span>{' '}
            ha sido efectuado correctamente.
          </p>
        );
      case 'PENDING':
        return (
          <div className="flex flex-col justify-center items-center gap-y-2.5 lg:text-lg lg:gap-y-3">
            <p className="font-openSans font-semibold text-secundaryText text-justify">
              Estimado{' '}
              <span className="font-openSans font-bold italic">
                {payment.payer.name},
              </span>{' '}
              el pago de su boleta{' '}
              <span className="font-openSans font-bold italic">
                {payment.description}{' '}
              </span>{' '}
              se está procesando, por favor valide más tarde o en la sección:
            </p>
            <Button
              size="md"
              className="bg-btnSecundary font-openSans font-bold lg:text-base"
            >
              <Link to="/payment-history">historial de pagos</Link>
            </Button>
          </div>
        );
      case 'REJECTED':
        return (
          <p className="font-openSans font-semibold text-secundaryText text-justify">
            Estimado{' '}
            <span className="font-openSans font-bold italic">
              {payment.payer.name}
            </span>{' '}
            , el pago de su{' '}
            <span className="font-openSans font-bold italic">
              {payment.description}
            </span>{' '}
            $ ha sido rechazado.
          </p>
        );
      case 'CANCELLED':
        return (
          <p className="font-openSans font-semibold text-secundaryText text-justify">
            Estimado{' '}
            <span className="font-openSans font-bold italic">
              {' '}
              {payment.payer.name},
            </span>{' '}
            el pago de su{' '}
            <span className="font-openSans font-bold italic">
              {payment.description}
            </span>{' '}
            $ ha sido cancelado.
          </p>
        );
      case 'EXPIRED':
        return (
          <p className="font-openSans font-semibold text-secundaryText text-justify">
            Estimado{' '}
            <span className="font-openSans font-bold italic">
              ${payment.payer.name},
            </span>{' '}
            el pago de su <span>{payment.description}</span> ha expirado.
          </p>
        );
      default:
        return (
          <p className="font-openSans font-semibold text-secundaryText text-justify">
            Estimado{' '}
            <span className="font-openSans font-bold italic">
              {payment.payer.name},
            </span>{' '}
            el estado de su pago{' '}
            <span className="font-openSans font-bold italic">
              {payment.status}
            </span>{' '}
            es desconocido.
          </p>
        );
    }
  };

  return (
    <Card className="m-auto my-6 w-80 p-4 sm:w-96 md:w-2/4 lg:px-12 lg:py-4 lg:max-w-2xl shadow-2xl">
      <Typography
        variant="h2"
        className=" my-2 text-center text-secundaryText font-openSans font-bold text-2xl md:text-3xl "
      >
        Detalles del Pago
      </Typography>
      <List>
        {paymentStatusMessage()}
        <div className="py-4 flex flex-col items-center gap-y-2 lg:gap-y-2.5">
          <Typography
            variant="h6"
            color="blue-gray"
            className="font-openSans lg:text-xl "
          >
            Referencia del pago:{' '}
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="font-openSans font-semibold lg:text-lg "
          >
            {payment.order_id}
          </Typography>
          <Typography
            variant="h6"
            color="blue-gray"
            className="font-openSans lg:text-xl"
          >
            Id del pago:{' '}
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="font-openSans font-semibold lg:text-lg"
          >
            {payment.payment_id}
          </Typography>
          <Typography
            variant="h6"
            color="blue-gray"
            className="font-openSans lg:text-xl"
          >
            Total pagado:{' '}
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="font-openSans font-semibold lg:text-lg"
          >
            {payment.currency} {payment.amount}
          </Typography>

          <Button
            size="md"
            className="mt-2 font-openSans font-bold bg-btnPrimary text-primaryText lg:text-base "
          >
            <Link to="/">Ir al Inicio</Link>
          </Button>
        </div>
      </List>
    </Card>
  );
};

export default PaymentHandlePage;
