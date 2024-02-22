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

export const CurrencySelector = () => {
  const { currency, handleCurrencyChange, listCurrencies } = useCurrency();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const availableCurrencies = [...new Set(listCurrencies)].map((cur) => ({
    value: cur,
    label: cur,
  }));

  const handleChange = (selectedOption) => {
    handleCurrencyChange(selectedOption ? selectedOption.value : '');
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const selectedCurrency = availableCurrencies.find(
    (cur) => cur.value === currency
  );

  const renderCurrency = availableCurrencies.map((cur) => (
    <MenuItem
      key={`currency-value-${cur.value}`}
      onClick={() => handleChange(cur)}
      className="hover:shadow-2xl hover:bg-gradient-to-t hover:to-blue-200 hover:from-cyan-200 "
    >
      <Typography
        variant="h6"
        className="flex justify-center text-sm font-bold text-secundaryText "
      >
        {cur.label}
      </Typography>
    </MenuItem>
  ));

  const gridClasses =
    availableCurrencies.length === 1 ? 'grid-cols-1' : 'grid-cols-2';

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
              value={selectedCurrency}
              onChange={handleChange}
              options={availableCurrencies}
            >
              {currency ? currency : 'Moneda'}
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
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block text-secundaryText">
          <ul className={`grid ${gridClasses} gap-y-2 outline-none outline-0`}>
            {renderCurrency}
          </ul>
        </MenuList>
      </Menu>
      <div className="block z-50 lg:hidden absolute top-20">
        <Collapse
          open={isMobileMenuOpen}
          className="bg-card shadow-2xl w-28 rounded-lg"
        >
          {renderCurrency}
        </Collapse>
      </div>
    </>
  );
};
