import { useState, useEffect, useCallback } from 'react';
import { getPaymentsByPayerDocument } from '../../services/paymentDbService';
import { getPayment } from '../../services/paymentService';
import { format } from 'date-fns';
import { PaymentDetails } from './components/PaymentDetails';
import {
  Card,
  Input,
  Button,
  Typography,
  CardBody,
} from '@material-tailwind/react';

const user = {
  description: 'kdjksjd',
  order_id: 1234,
  payment_id: 445,
  approved_date: '',
  amount: 200,
  currency: 8090,
  status: 'PENDING',
};

const PaymentHistoryPage = () => {
  const [document, setDocument] = useState('');
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //Estado para mostrar el mensaje si no hay historial
  const [showNoPaymentsMessage, setShowNoPaymentsMessage] = useState(false);
  //Estado para cambiar a un boton de loading cuando haga la consulta
  const [loadingButton, setLoadingButton] = useState(false);

  const TABLE_HEAD = [
    'Descripción',
    'Referencia de pago',
    'Id del pago',
    'Fecha de pago',
    'Monto',
    'Estado',
  ];

  const pendingStatus = payments.filter((pay) => pay.status === 'PENDING');

  if (pendingStatus.length > 0) {
    TABLE_HEAD.push('Acción');
  }

  const handleSearch = useCallback(
    async (e) => {
      e.preventDefault();
      setLoadingButton(true);
      setLoading(true);
      setError(null);

      try {
        const results = await getPaymentsByPayerDocument(document);
        // results.data.push(user);
        setPayments(results.data);
        setDocument('');
        setShowNoPaymentsMessage(results.data.length === 0);
      } catch (err) {
        setError('Error al buscar los pagos');
        console.error(err);
      } finally {
        setLoading(false);
        setLoadingButton(false);
      }
    },
    [document]
  );

  const handlePayment = useCallback((redirectUrl) => {
    window.open(redirectUrl, '_blank');
  }, []);

  const updatePaymentStatus = useCallback(async (paymentId, index) => {
    try {
      const updatedPayment = await getPayment(paymentId);
      if (updatedPayment.status === 'PAID') {
        setPayments((currentPayments) =>
          currentPayments.map((payment, idx) =>
            idx === index ? { ...payment, status: 'PROCESANDO' } : payment
          )
        );
      }
    } catch (error) {
      console.error('Error al actualizar el estado del pago:', error);
    }
  }, []);

  useEffect(() => {
    payments.forEach((payment, index) => {
      if (payment.status === 'PENDING') {
        updatePaymentStatus(payment.payment_id, index);
      }
    });
  }, [payments, updatePaymentStatus]);

  const formatDate = useCallback((dateString) => {
    if (!dateString) return '';
    return format(new Date(dateString), 'dd/MM/yy HH:mm');
  }, []);

  return (
    <section className=" flex flex-col justify-center items-center py-10 ">
      <Card
        color="transparent"
        shadow={true}
        className=" m-5 w-72 p-2 flex flex-col items-center md:w-5/12  text-center border-blue-gray-50 border-2"
      >
        <Typography color="blue-gray" className="text-2xl font-bold mt-3">
          Historial de Pagos
        </Typography>
        <form
          onSubmit={handleSearch}
          className="mt-8 mb-2 w-11/12  max-w-screen-lg"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Ingrese Número de Documento
            </Typography>
            <Input
              type="text"
              value={document}
              onChange={(e) => setDocument(e.target.value)}
              placeholder="Número de documento"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900    sm:w-4/5 lg:w-3/5"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
            />
          </div>

          {loadingButton ? (
            <Button className="mt-3 w-2/5" loading={true}>Cargando...</Button>
          ) : (
            <Button
              type="submit"
              className="mt-3 w-2/5"
              disabled={!document || loadingButton}
            >
              {' '}
              Buscar
            </Button>
          )}

        </form>
        {!loading && !error && showNoPaymentsMessage && (
          <Typography variant="paragraph">
            No hay pagos para el número de documento ingresado.
          </Typography>
        )}
      </Card>

      {payments.length ? (
        <Card className="w-11/12 border-2 mt-3">
          <CardBody className="overflow-x-scroll px-0">
            <table className="w-full min-w-max table-auto text-left ">
              <thead>
                <tr>
                  {/* Encabezados */}
                  {TABLE_HEAD.map((head) => (
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* Información Table */}
                {payments.map((payment, index) => {
                  const isLast = index === payments.length - 1;
                  const classes = isLast
                    ? 'p-4'
                    : 'p-4 border-b border-blue-gray-50';
                  return (
                    <PaymentDetails
                      payment={payment}
                      formatDate={formatDate}
                      handlePayment={handlePayment}
                      key={payment.payment_id}
                      classes={classes}
                    />
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      ) : null}
    </section>
  );
};

export default PaymentHistoryPage;
