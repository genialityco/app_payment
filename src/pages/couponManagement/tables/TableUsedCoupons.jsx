import { useEffect } from 'react';
import { Card, Typography,} from '@material-tailwind/react';

const TABLE_HEAD = [
  'Código',
  'Descuento',
  'Valor Pagado',
  'Valor del descuento',
  'Fecha de Uso',
];

export const TableUsedCoupons = ({ getAllPayments, payments, formatDate }) => {
  useEffect(() => {
    const init = async () => {
      await getAllPayments();
    };
    init();
  }, []);

  const calculateDiscountApplied = (amountPaid, discountPercentage) => {
    const originalValue = amountPaid / (1 - discountPercentage / 100);
    const discountApplied = originalValue - amountPaid;
    return discountApplied.toFixed(0);
  };

  return (
    <Card className="h-full w-full overflow-hidden">
      <div className="w-full max-h-96 overflow-x-auto overflow-y-auto">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-headTable p-4"
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
              <td colSpan={5}>
                <Typography
                  variant="paragraph"
                  color="blue-gray"
                  className=" font-openSans font-semibold text-center"
                >
                  No hay pagos con cupones registrados.
                </Typography>
              </td>
            </tr>
          )}
          {payments.map((payment) => (
            <tr key={payment._id} className="even:bg-blue-gray-50/50">
              <td className="p-4">{payment.payer.name}</td>
              <td className="p-4">{payment.coupon.code}</td>
              <td className="p-4">{payment.coupon.discount} %</td>
              <td className="p-4">$ {payment.amount}</td>
              <td className="p-4">
                ${' '}
                {calculateDiscountApplied(
                  payment.amount,
                  payment.coupon.discount
                )}
              </td>
              {/* <td className="p-4">{formatDate(payment.approved_date)}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </Card>
  );
};
