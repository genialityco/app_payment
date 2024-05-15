export const formatPriceByCountry = (value) => {
  

  // Se descarta la parte decimal y redondea hacia arriba
  value = Math.ceil(Number(value));

  // Separador de miles (punto)
  let separator = ".";

  // Se coloca el separador cada 3 dígitos
  value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);

 
  return value;
};
