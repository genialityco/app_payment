import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMemberships } from '../../services/membershipService';
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
    const itemsData = await getMemberships();
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
      navigate('/payment', {
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
      <Typography variant="h2" className="text-center py-6 text-primaryText">
        PAGOS
      </Typography>
      <section className="flex flex-col items-center pb-4 gap-y-5 xl:h-[calc(100vh-161px)] lg:flex-row lg:justify-evenly lg:gap-y-0">
        {convertedItems.map((item) => (
          <Card
            variant="gradient"
            // className="w-full max-w-[18rem] p-8 bg-card border-2  shadow-2xl"
            className="w-full max-w-[18rem]  bg-card  shadow-2xl"
            key={item._id}
          >
            <CardHeader
              // floated={false}
              // shadow={false}
              // color="transparent"
              // className="m-0 rounded-none border-b border-white/10 text-center "
              color="white"
              floated={false}
              shadow={false}
              className="m-0 grid place-items-center px-4 py-8 text-center bg-blue-gray-900 rounded-b-none shadow-md"
            >
              <Typography
                // variant="small"
                variant="h5"
                // className="uppercase font-bold  text-cardText"
                className="uppercase font-bold  text-primaryText "
              >
                {item.name}
              </Typography>
              {/* <Typography
                variant="h1"
                color="white"
                className="mt-6 flex justify-center gap-1 text-7xl font-normal"
              >
                <span className="mt-2 text-sm text-cardText">{currency}</span>
                <span className="text-4xl text-cardText font-bold">
                  {item.price}{' '}
                </span>
              </Typography> */}
            </CardHeader>
            {/* <CardBody className="p-0"> */}
            <CardBody className="my-12 p-0 flex flex-col justify-center items-center ">
              <Typography
                variant="h1"
                color="white"
                className="mt-6 flex justify-center gap-1 text-7xl font-normal"
              >
                <span className="mt-2 text-sm text-cardText">{currency}</span>
                <span className="text-4xl text-cardText font-bold">
                  {item.price}{' '}
                </span>
              </Typography>
            </CardBody>

            {/* <CardFooter className="mt-12 p-0"> */}
            <CardFooter className="p-8">
              <Button
                onClick={() => handlePaymentClick(item)}
                size="lg"
                className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100  text-primaryText bg-btnCard"
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
