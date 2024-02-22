import { Typography, Chip, Button } from '@material-tailwind/react';

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

export const PaymentDetails = ({
  payment: {
    description,
    order_id,
    payment_id,
    approved_date,
    amount,
    currency,
    status,
    redirect_url,
  },
  formatDate,
  handlePayment,
  classes,
  showAction,
}) => (
  <tr>
    <td className={classes}>
      <div className="flex items-center gap-3">
        <Typography
          variant="small"
          color="blue-gray"
          className=" font-openSans font-bold"
        >
          {description}
        </Typography>
      </div>
    </td>
    <td className={classes}>
      <Typography variant="small" color="blue-gray" className=" font-openSans">
        {order_id}
      </Typography>
    </td>
    <td className={classes}>
      <Typography variant="small" color="blue-gray" className="font-openSans font-semibold">
        {payment_id}
      </Typography>
    </td>
    <td className={classes}>
      <Typography variant="small" color="blue-gray" className="font-openSans  font-semibold">
        {approved_date ? formatDate(approved_date) : 'Pendiente de pago'}
      </Typography>
    </td>
    <td className={classes}>
      <Typography variant="small" color="blue-gray" className="font-openSans  font-semibold">
        {`${amount} ${currency}`}
      </Typography>
    </td>
    <td className={classes}>
      <div className="w-max">
        <Chip
          size="sm"
          variant="ghost"
          value={getStatusTextSpanish(status)}
          color={getStatusColor(status)}
          className='font-openSans font-bold'
        />
      </div>
    </td>
    {showAction && (
      <td
        className={`${classes} ${
          status !== 'PENDING' ? 'w-auto' : '' 
        }`}
      >
        {status === 'PENDING' && (
          <div className="flex justify-center items-center">
            <Button
              size="sm"
              className="font-openSans font-semibold bg-btnFormUserApply"
              onClick={() => handlePayment(redirect_url)}
            >
              Pagar
            </Button>
          </div>
        )}

        {status === 'Procesando' && (
          <Typography variant="h6" color="blue-gray" className='font-openSans font-semibold'>
            Procesando...
          </Typography>
        )}
      </td>
    )}
  </tr>
);
