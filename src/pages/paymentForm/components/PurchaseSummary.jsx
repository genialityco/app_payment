import { Typography } from '@material-tailwind/react';
import { formatPriceByCountry } from '../../../utils/formatPriceByCountry';

export const PurchaseSummary = ({ item, currency, price }) => {

  const formattedPrice = formatPriceByCountry(price);
 
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
        Total: {currency} {formattedPrice}
      </Typography>
    </div>
  );
};
