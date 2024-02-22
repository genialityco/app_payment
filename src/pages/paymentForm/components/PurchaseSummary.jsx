import { Typography } from '@material-tailwind/react';

export const PurchaseSummary = ({ item, currency, price }) => {
  return (
    <div className="border-2  border-cyan-300 border-dashed">
      <Typography
        variant="h6"
        color="blue-gray"
        className="font-openSans font-bold"
      >
        Resumen de la Compra
      </Typography>
      <Typography
        variant="h6"
        color="blue-gray"
        className="font-openSans font-bold"
      >
        {item}
      </Typography>
      <Typography
        variant="h6"
        color="blue-gray"
        className="font-openSans font-bold"
      >
        Total: {currency} {price}
      </Typography>
    </div>
  );
};
