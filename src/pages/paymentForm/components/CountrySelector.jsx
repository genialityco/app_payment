import { Select, Option } from "@material-tailwind/react";

export const CountrySelector = ({
  countries,
  selectedCountry,
  handleCountryChange,
}) => {
  return (
    <Select
      value={selectedCountry?.countryCode || ""}
      onChange={handleCountryChange}
    >
      {countries.map((country) => (
        <Option key={country.countryCode} value={country.countryCode}>
          {country.name}
        </Option>
      ))}
    </Select>
  );
};
