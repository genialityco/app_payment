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
        // localStorage.removeItem("membership");
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

  if (loading) return <div>Cargando detalles del pago...</div>;
  if (error) return <div>Error al cargar el pago: {error.message}</div>;
  if (!payment)
    return (
      <Typography
        variant="lead"
        className="text-secundaryText text-center font-openSans font-semibold"
      >
        No se encontró el pago
      </Typography>
    );

  // Función para determinar el mensaje según el estado del pago
  const paymentStatusMessage = () => {
    switch (payment.status) {
      case 'PAID':
        return `Estimado ${payment.payer.name}, el pago de su ${payment.description} ha sido efectuado correctamente.`;
      case 'PENDING':
        return (
          <>
            {`Estimado ${payment.payer.name}, el pago de su ${payment.description} está procesando, por favor valide más tarde o en la sección `}
            <Link to="/payment-history">historial de pagos</Link>
            {'.'}
          </>
        );
      case 'REJECTED':
        return `Estimado ${payment.payer.name}, el pago de su ${payment.description} ha sido rechazado.`;
      case 'CANCELLED':
        return `Estimado ${payment.payer.name}, el pago de su ${payment.description} ha sido cancelado.`;
      case 'EXPIRED':
        return `Estimado ${payment.payer.name}, el pago de su ${payment.description} ha expirado.`;
      default:
        return `Estimado ${payment.payer.name}, el estado de su pago (${payment.status}) es desconocido.`;
    }
  };

  return (
    <Card className="m-auto w-96 border-2 border-dashed border-cyan-300">
      <Typography
        variant="h2"
        className="text-center text-secundaryText font-openSans font-bold"
      >
        Detalles del Pago
      </Typography>
      <List>
        <div>
          <Typography variant="h6" color="blue-gray">
            {paymentStatusMessage()}
          </Typography>
          <Typography variant="h6" color="blue-gray">
            Referencia del pago:{' '}
            <Typography
              variant="small"
              color="gray"
              className="font-openSans font-semibold"
            >
              {payment.order_id}
            </Typography>
            {' - '}Id del pago:{' '}
            <Typography
              cvariant="small"
              color="gray"
              className="font-openSans font-semibold"
            >
              {payment.payment_id}
            </Typography>
          </Typography>
          <Typography variant="h6" color="blue-gray">
            Total pagado:{' '}
            <Typography
              variant="small"
              color="gray"
              className="font-openSans font-semibold"
            >
              {payment.currency} {payment.amount}
            </Typography>
          </Typography>

          <Button
            size="lg"
            className=" m-auto bg-btnCard text-primaryText"
          >
            <Link to="/">Ir al Inicio</Link>
          </Button>
        </div>
      </List>
    </Card>
  );
};

export default PaymentHandlePage;
