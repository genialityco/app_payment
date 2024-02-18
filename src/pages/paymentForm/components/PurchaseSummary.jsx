import { Typography } from "@material-tailwind/react";

export const PurchaseSummary = ({ memberShip, currency, price }) => {
  return (
    <div>
      <Typography variant="h6" color="blue-gray">Resumen de la Compra</Typography>
      <Typography variant="h6" color="blue-gray">{memberShip}</Typography>
      <Typography variant="h6" color="blue-gray">
        Total: {currency} {price}
      </Typography>
    </div>
  );
};
