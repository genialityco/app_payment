import React from 'react';
import { useState } from 'react';
import { useCurrency } from '../contexts/CurrencyContext';
import {
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
  Collapse,
} from '@material-tailwind/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export const CountrySelector = () => {
  const { countries, selectedCountry, handleCountryChange } = useCurrency();
  console.log(countries);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const options = countries.map((country) => ({
    value: country.countryCode,
    label: country.name,
  }));

  console.log(options);

  const handleChange = (selectedOption) => {
    console.log('funciona!');
    handleCountryChange(selectedOption.value);
  };

  const selectedOption = options.find(
    (option) => option.value === selectedCountry?.countryCode
  );

  console.log('Seleccion Pais:', selectedOption);

  const renderItems = options.map((country) => (
    <MenuItem className="flex items-center gap-3 rounded-lg" key={`country-value-${country.value}`}>
      {/* Icono Bandera */}
      {/*  <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {" "}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div> */}
      <div>
        {/* Name Country */}
        <Typography
          variant="h6"
          color="blue-gray"
          className="flex items-center text-sm font-bold"
        >
          {country.label}
        </Typography>
      </div>
    </MenuItem>
  ));

  return (
    <>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
              value={selectedOption}
              onChange={handleChange}
              options={options}
            >
              Seleccionar País
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? 'rotate-180' : ''
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </>
  );
};
