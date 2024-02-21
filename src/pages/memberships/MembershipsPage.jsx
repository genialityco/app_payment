import React, { useState, useEffect } from 'react';
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

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-3 w-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

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

const MembershipsPage = () => {
  const { currency, selectedCountry } = useCurrency();
  const navigate = useNavigate();
  const [memberships, setMemberships] = useState([]);
  const [convertedMemberships, setConvertedMemberships] = useState([]);

  useEffect(() => {
    const init = async () => {
      const membershipsData = await getMemberships();
      setMemberships(membershipsData.data);
      setConvertedMemberships(membershipsData.data);
    };
    init();
  }, []);

  useEffect(() => {
    convertPrices(memberships);
  }, [currency, memberships]);

  const convertPrices = async (memberships) => {
    const converted = await Promise.all(
      memberships.map(async (membership) => {
        const convertedPrice = await convertCurrency(
          membership.price,
          'COP',
          currency
        );
        return {
          ...membership,
          price: convertedPrice ? parseFloat(convertedPrice) : membership.price,
        };
      })
    );
    setConvertedMemberships(converted);
  };

  const handlePaymentClick = (membership) => {
    const paymentInformation = {
      id: membership._id,
      name: membership.name,
      price: membership.price,
      selectedCountryCode: selectedCountry.countryCode,
      currency,
    };
    navigate('/payment', {
      state: paymentInformation,
    });
    sessionStorage.setItem('membership', JSON.stringify(paymentInformation));
  };

  if (memberships.length === 0) {
    return <Spinner className="w-16 m-auto h-screen text-gray-900/50" />;
  }

  return (
    <main className="w-full">
      <Typography variant="h2" className="text-center py-6 text-primaryText">
        MEMBERSHIPS
      </Typography>
      <section className="flex flex-col items-center pb-4 gap-y-5 h-screen xl:h-[calc(100vh-161px)] lg:flex-row lg:justify-evenly lg:gap-y-0 ">
        {convertedMemberships.map((membership) => (
          <Card
            // color="gray"
            variant="gradient"
            className="w-full  max-w-[18rem] p-8 bg-card border-2  shadow-2xl "
            key={membership._id}
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
            >
              <Typography
                variant="small"
                // color="white"
                className="uppercase font-bold text-cardText"
              >
                {membership.name}
              </Typography>
              <Typography
                variant="h1"
                color="white"
                className="mt-6 flex justify-center gap-1 text-7xl font-normal"
              >
                <span className="mt-2 text-sm text-cardText">{currency}</span>
                <span className="text-4xl text-cardText font-bold border-b-4 hover:border-b-yellow-300">
                  {membership.price}{' '}
                </span>
              </Typography>
            </CardHeader>
            <CardBody className="p-0">
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-black/50 bg-white/20 p-1 hover:bg-yellow-100">
                    <CheckIcon />
                  </span>
                  <Typography className="font-normal">
                    5 team members
                  </Typography>
                </li>
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-black/50 bg-white/20 p-1">
                    <CheckIcon />
                  </span>
                  <Typography className="font-normal">
                    200+ components
                  </Typography>
                </li>
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-black/50 bg-white/20 p-1">
                    <CheckIcon />
                  </span>
                  <Typography className="font-normal">
                    40+ built-in pages
                  </Typography>
                </li>
              </ul>
            </CardBody>

            <CardFooter className="mt-12 p-0">
              <Button
                onClick={() => handlePaymentClick(membership)}
                size="lg"
                // color="black"
                className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100  text-primaryText bg-btnCard"
                ripple={false}
                fullWidth={true}
              >
                Suscribir
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  );
};

export default MembershipsPage;
