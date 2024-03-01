import { useEffect } from 'react';
import { Card, Typography, Chip, Button } from '@material-tailwind/react';

const TABLE_HEAD = [
  'Orden ID',
  'Pagador',
  'Tipo de pago',
  'Valor Pagado',
  'Estado',
  'Creado',
  'Pagado',
];

const STATUS_COLORS = {
  PENDING: 'blue',
  PAID: 'green',
  REJECT: 'red',
  DEFAULT: 'amber',
};

const STATUS_TEXT_SPANISH = {
  PENDING: 'PENDIENTE',
  PAID: 'PAGADO',
  REJECT: 'RECHAZADA',
  DEFAULT: 'SIN INFORMACIÓN',
};

const getStatusColor = (status) =>
  STATUS_COLORS[status] || STATUS_COLORS.DEFAULT;

const getStatusTextSpanish = (status) => STATUS_TEXT_SPANISH[status];

export const TablePaymentHistory = ({
  getAllPayments,
  payments,
  formatDate,
}) => {
  useEffect(() => {
    const init = async () => {
      await getAllPayments();
    };
    init();
  }, []);

  return (
    <Card className="h-full w-full overflow-hidden">
      <div
        className={`w-full   ${
          payments.length > 6 ? 'max-h-96 ' : ''
        } overflow-y-auto overflow-x-auto`}
      >
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b text-center border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-openSans font-semibold leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 && (
              <tr>
                <td colSpan="7">
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className=" font-openSans font-semibold text-center"
                  >
                    No hay pagos.
                  </Typography>
                </td>
              </tr>
            )}
            {payments.map((payment) => (
              <tr key={payment._id} className="even:bg-blue-gray-50/50">
                <td className="p-4 text-center">{payment.order_id}</td>
                <td className="p-4 text-center">{payment.payer.name}</td>
                <td className="p-4 text-center">{payment.description}</td>
                <td className="p-4 text-center">$ {payment.amount}</td>
                <td className="p-4 text-center">
                  <div className="w-max">
                    <Chip
                      size="sm"
                      variant="ghost"
                      value={getStatusTextSpanish(payment.status)}
                      color={getStatusColor(payment.status)}
                      className="font-openSans font-bold"
                    />
                  </div>
                </td>
                <td className="p-4 text-center">
                  {formatDate(payment.create_at)}
                </td>
                <td className="p-4 text-center">
                  {payment.approved_date
                    ? formatDate(payment.approved_date)
                    : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
