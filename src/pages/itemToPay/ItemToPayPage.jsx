import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItemsToPay } from '../../services/itemToPayService';
import { useCurrency } from '../../contexts/CurrencyContext';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Spinner,
} from '@material-tailwind/react';

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
    [currency]
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
      <Typography variant="h2" className="text-center py-2 my-6 text-primaryText">
        PAGOS
      </Typography>

      <section className=" mb-7 grid grid-cols-1 justify-items-center items-center gap-y-8 md:grid-cols-2 xl:grid-cols-4  xl:h-[calc(100vh-161px)] ">
        {convertedItems.map((item) => (
          <Card
            variant="gradient"
            className="w-full max-w-[18rem] m-auto grid grid-cols-1 grid-rows-[1fr_1fr_auto]  bg-card  shadow-2xl"
            key={item._id}
          >
            <CardHeader
              color="white"
              floated={false}
              shadow={false}
              className="m-0 grid place-items-center p-3 text-center bg-blue-gray-900 rounded-b-none shadow-md"
            >
              <Typography
                variant="h5"
                className="uppercase font-bold  text-primaryText text-lg "
              >
                {item.name}
              </Typography>
            </CardHeader>

            <CardBody className="my-12 p-0 flex flex-col justify-center items-center ">
              <Typography
                variant="h1"
                color="white"
                className="mt-6 flex justify-center gap-1 text-7xl font-normal"
              >
                <span className="mt-2 text-sm text-secundaryText">
                  {currency}
                </span>
                <span className="text-4xl text-secundaryText font-bold">
                  {item.price}{' '}
                </span>
              </Typography>
            </CardBody>

            <CardFooter className="py-6">
              <Button
                onClick={() => handlePaymentClick(item)}
                size="lg"
                className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100  text-primaryText bg-btnPrimary"
                ripple={false}
                fullWidth={true}
              >
                Pagar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  );
};

export default ItemToPayPage;
