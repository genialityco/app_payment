import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItemsToPay } from '../../services/itemToPayService';
import { useCurrency } from '../../contexts/CurrencyContext';
import {
  Card,
  CardBody,
  Typography,
  Button,
  Spinner,
} from '@material-tailwind/react';
import { formatPriceByCountry } from '../../utils/formatPriceByCountry';

const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  if (fromCurrency === toCurrency) return amount;
  const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const rate = data.rates[toCurrency];

    return (amount * rate).toFixed(2);
  } catch (error) {
    console.error('Error converting currency: ', error);
    return amount;
  }
};

const ItemToPayPage = () => {
  const { currency, selectedCountry } = useCurrency();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [convertedItems, setConvertedItems] = useState([]);

  const init = useCallback(async () => {
    const itemsData = await getItemsToPay();
    setItems(itemsData.data);
    setConvertedItems(itemsData.data);
  }, []);

  const convertPrices = useCallback(
    async (items) => {
      const converted = await Promise.all(
        items.map(async (item) => {
          const convertedPrice = await convertCurrency(
            item.price,
            'COP',
            currency
          );
         

          return {
            ...item,
            price: convertedPrice ? parseFloat(convertedPrice) : item.price,
          };
        })
      );
      setConvertedItems(converted);
    },
    [currency, selectedCountry.countryCode]
  );

  const handlePaymentClick = useCallback(
    (item) => {
      const paymentInformation = {
        id: item._id,
        name: item.name,
        price: item.price,
        selectedCountryCode: selectedCountry.countryCode,
        currency,
      };
      navigate(`/payment/${paymentInformation.id}`, {
        state: paymentInformation,
      });
      sessionStorage.setItem('item', JSON.stringify(paymentInformation));
    },
    [currency, navigate, selectedCountry.countryCode]
  );

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    convertPrices(items);
  }, [currency, items, convertPrices]);

  if (items.length === 0) {
    return <Spinner className="w-16 m-auto h-screen text-gray-900/50" />;
  }

  return (
    <main className="w-full">
      <Typography
        variant="h2"
        className="text-center py-2 my-6 text-primaryText"
      >
        PAGOS
      </Typography>
      <Card className="w-11/12 max-w-screen-xl m-auto border-2 my-5">
        <CardBody className="overflow-x-auto px-0 md:px-2 md:py-3">
          <table className="w-full min-w-max table-auto text-center">
            <tbody>
              {convertedItems.map((item) => (
                <tr key={item._id}>
                  <td className="w-36 md:w-auto border bg-blue-gray-900  p-3">
                    {' '}
                    <Typography
                      variant="h5"
                      className="uppercase font-bold  text-primaryText text-lg text-left "
                    >
                      {item.name}
                    </Typography>
                  </td>
                  <td className="border p-3">
                    {currency} {formatPriceByCountry(item.price)}
                  </td>
                  <td className="border p-2 md:p-4">
                    <Button
                      onClick={() => handlePaymentClick(item)}
                      size="sm"
                      className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100  text-primaryText bg-btnPrimary"
                    >
                      Pagar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </main>
  );
};

export default ItemToPayPage;


