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
      <p className="font-openSans font-bold text-blue-gray-800">{item}</p>
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
