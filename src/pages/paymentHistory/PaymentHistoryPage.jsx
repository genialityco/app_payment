import { useState, useCallback } from 'react';
import { getPaymentsByPayerDocument } from '../../services/paymentDbService';
import { format } from 'date-fns';
import { PaymentDetails } from './components/PaymentDetails';
import {
  Card,
  Input,
  Button,
  Typography,
  CardBody,
} from '@material-tailwind/react';

const PaymentHistoryPage = () => {
  const [document, setDocument] = useState('');
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showNoPaymentsMessage, setShowNoPaymentsMessage] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const fetchPayments = useCallback(async () => {
    if (!document) return;

    setLoading(true);
    setLoadingButton(true);
    setError('');
    try {
      const results = await getPaymentsByPayerDocument(document);
      setPayments(results.data);
      setShowNoPaymentsMessage(results.data.length === 0);
    } catch (err) {
      setError('Error al buscar los pagos');
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingButton(false);
    }
  }, [document]);

  const handleSearch = async (e) => {
    e.preventDefault();
    await fetchPayments();
  };

  const handlePayment = useCallback((redirectUrl) => {
    window.open(redirectUrl, '_blank');
  }, []);

  const formatDate = useCallback(
    (dateString) => format(new Date(dateString), 'dd/MM/yy HH:mm'),
    []
  );

  return (
    <section className="flex flex-col justify-center items-center py-10">
      <Card
        color="transparent"
        shadow={true}
        className=" m-5 w-72 p-2 flex flex-col items-center md:w-5/12  text-center border-2 bg-card"
      >
        <Typography className="text-secundaryText text-2xl font-openSans font-bold mt-3">
          Historial de Pagos
        </Typography>
        <form
          onSubmit={handleSearch}
          className="mt-8 mb-2 w-11/12 max-w-screen-lg"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="h6"
              color="blue-gray"
              className="font-openSans "
            >
              Ingrese Número de Documento
            </Typography>
            <Input
              type="text"
              variant="standard"
              value={document}
              onChange={(e) => setDocument(e.target.value)}
              placeholder="Número de documento"
              className=" focus:!border-t-gray-900 sm:w-4/5 lg:w-3/5"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
            />
          </div>

          {loadingButton ? (
            <Button
              className="mt-3 w-2/5 mx-auto flex justify-center font-openSans font-semibold text-primaryText bg-btnPrimary"
              loading={true}
            >
              Cargando...
            </Button>
          ) : (
            <Button
              type="submit"
              className="mt-3 w-2/5 font-openSans font-semibold text-primaryText bg-btnPrimary"
              disabled={!document || loadingButton}
            >
              Buscar
            </Button>
          )}
        </form>
        {!loading && !error && showNoPaymentsMessage && (
          <Typography
            variant="paragraph"
            className="font-openSans font-semibold "
          >
            No hay pagos para el número de documento ingresado.
          </Typography>
        )}
      </Card>

      {payments.length > 0 && (
        <Card className="w-11/12 border-2 mt-3">
          <CardBody className="overflow-x-auto px-0">
            <div
              className={
                payments.length > 10 ? 'overflow-y-auto max-h-[400px]' : ''
              }
            >
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {[
                      'Descripción',
                      'Referencia de pago',
                      'Id del pago',
                      'Fecha de pago',
                      'Monto',
                      'Estado',
                      ...(payments.some((pay) => pay.status === 'PENDING')
                        ? ['Acción']
                        : []),
                    ].map((head) => (
                      <th
                        className="border-y border-blue-gray-100 bg-headTable p-4"
                        key={head}
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-openSans font-bold leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => (
                    <PaymentDetails
                      payment={payment}
                      formatDate={formatDate}
                      handlePayment={handlePayment}
                      key={payment.payment_id}
                      classes={`p-4 ${
                        index !== payments.length - 1
                          ? 'border-b border-blue-gray-50'
                          : ''
                      }`}
                      showAction={payments.some(
                        (pay) => pay.status === 'PENDING'
                      )}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      )}
    </section>
  );
};

export default PaymentHistoryPage;
