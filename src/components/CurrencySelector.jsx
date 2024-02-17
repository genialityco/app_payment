import { useState } from "react";
import { useCurrency } from "../contexts/CurrencyContext";
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


export const CurrencySelector = () => {
  const { currency, handleCurrencyChange, listCurrencies } = useCurrency();
  console.log(currency)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const availableCurrencies = [...new Set(listCurrencies)].map((cur) => ({
    value: cur,
    label: cur,
  }));
console.log(availableCurrencies)

  const handleChange = (selectedOption) => {
    handleCurrencyChange(selectedOption ? selectedOption.value : "");
  };

  const selectedCurrency = availableCurrencies.find(
    (cur) => cur.value === currency
  );

  const renderCurrency = availableCurrencies.map((cur) => (
    <MenuItem className="flex items-center gap-3 rounded-lg" key={`country-value-${cur.value}`}>
      {/* Icono Bandera */}
      {/*  <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {" "}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div> */}
      <div>
        {/* Name Currency */}
        <Typography
          variant="h6"
          color="blue-gray"
          className="flex items-center text-sm font-bold"
        >
          {cur.label}
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
              value={selectedCurrency}
              onChange={handleChange}
              options={availableCurrencies}
            >
              Moneda
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
            {renderCurrency}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderCurrency}</Collapse>
      </div>
    </>
  );
};
