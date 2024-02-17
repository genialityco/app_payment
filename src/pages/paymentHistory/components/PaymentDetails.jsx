import { Typography, Chip, Button } from '@material-tailwind/react';

export const PaymentDetails = ({ payment, formatDate, handlePayment, classes }) => {
  
  return (
    <tr>
      <td className={classes}>
        <div className="flex items-center gap-3">
          <Typography variant="small" color="blue-gray" className="font-bold">
            {payment.description}
          </Typography>
        </div>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {payment.order_id}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {payment.payment_id}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {formatDate(payment.approved_date)}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {payment.amount} {payment.currency}
        </Typography>
      </td>
      <td className={classes}>
        <div className="w-max">
          <Chip
            size="sm"
            variant="ghost"
            value={payment.status}
            color={
              payment.status === 'PAID'
                ? 'green'
                : payment.status === 'REJECT'
                ? 'amber'
                : 'red'
            }
          />
        </div>
      </td>

      {payment.status === 'PENDING' && (
        <Button
          size="md"
          className="pay-button"
          onClick={() => handlePayment(payment.redirect_url)}
        >
          Pagar
        </Button>
      )}
      {payment.status === 'Procesando' && (
        <Typography variant="h6" color="blue-gray">
          Procesando...
        </Typography>
      )}
    </tr>
  );
};
