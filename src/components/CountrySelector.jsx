import React, { useState } from 'react';
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
import { useCurrency } from '../contexts/CurrencyContext';

export const CountrySelector = () => {
  const { countries, selectedCountry, handleCountryChange } = useCurrency();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const options = countries.map((country) => ({
    value: country.countryCode,
    label: country.name,
  }));

  const handleChange = (countrySelected) => {
    handleCountryChange(countrySelected.value);
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const renderItems = options.map((country) => (
    <MenuItem
      key={`country-value-${country.value}`}
      onClick={() => handleChange(country)}
    >
      <Typography
        variant="h6"
        color="blue-gray"
        className="flex items-center text-sm font-bold text-secundaryText"
      >
        {country.label}
      </Typography>
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
          <Typography
            variant="small"
            className="font-semibold text-primaryText font-openSans"
          >
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium  "
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              {selectedCountry?.name
                ? selectedCountry?.name
                : 'Seleccionar País'}
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
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block text-primaryText font-openSans ">
          <ul className=" grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen} className='absolute bg-card shadow-2xl w-28 rounded-lg' >{renderItems}</Collapse>
      </div>
    </>
  );
};
