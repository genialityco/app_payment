import { useState, useEffect } from "react";

export const useCurrencyConverter = (amount, fromCurrency, toCurrency) => {
  const [convertedPrice, setConvertedPrice] = useState(0);
  useEffect(() => {
    const convertCurrency = async () => {
      if (fromCurrency === toCurrency) {
        setConvertedPrice(amount);
        return;
      }
      if (fromCurrency) {
        const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          const rate = data.rates[toCurrency];
          setConvertedPrice((amount * rate).toFixed(2));
        } catch (error) {
          console.error("Error al convertir la moneda: ", error);
        }
      }
    };
    convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  return [convertedPrice, setConvertedPrice];
};
