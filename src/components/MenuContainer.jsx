import { useState, useEffect } from 'react';
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  List,
} from '@material-tailwind/react';
import { useAuth } from '../contexts/AuthContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { CountrySelector } from './CountrySelector';
import { CurrencySelector } from './CurrencySelector';
import MenuItems from './MenuItems';
import { HiHome, HiBanknotes, HiCurrencyDollar } from 'react-icons/hi2';

const itemsMenu = [
  {
    route: '/items-to-pay',
    name: 'Home',
    icon: <HiHome className="w-7 h-6"  />,
  },
  {
    route: '/payment-history',
    name: 'Consultar pagos',
    icon: <HiCurrencyDollar className="w-7 h-6" />,
  },
  {
    route: '/items-to-pay-management',
    name: 'Administrar Pagos',
    isAdminModule: true,
    icon: <HiBanknotes className="w-7 h-6" />,
  },
  {
    route: '/coupon-management',
    name: 'Administrar cupones',
    isAdminModule: true,
    icon: <HiBanknotes className="w-7 h-6" />,
  },
];

function NavList() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="flex lg:flex-row lg:items-center justify-between w-full">
      <div>
        <List className="flex flex-row mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:p-1 lg:items-center ">
          {itemsMenu.map((item) => {
            if (!item.isAdminModule || (item.isAdminModule && currentUser)) {
              return (
                <div key={`country-name-${item.name}`}>
                  <MenuItems
                    name={item.name}
                    icon={item.icon}
                    route={item.route}
                  />
                </div>
              );
            }
            return null;
          })}
          {currentUser ? (
            <div className="flex flex-row">
              <button
                onClick={logout}
                className="flex items-center gap-2 py-2 pr-4 hover:bg-secundaryText"
              >
                <Typography
                  variant="small"
                  className="font-medium text-primaryText "
                >
                  Cerrar Sesión
                </Typography>
              </button>
            </div>
          ) : null}
        </List>
      </div>
    </div>
  );
}

export const MenuContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 960 && isOpen) {
        setIsOpen(false);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <Navbar
      shadow={false}
      className="max-w-none px-4 py-2 bg-[url('/src/assets/wave.png')] rounded-none border-none relative z-50"
    >
      <div className="flex items-center justify-between">
        <IconButton
          onClick={toggleNav}
          variant="text"
          color="white"
          className="lg:hidden"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </IconButton>
        <div className="hidden lg:block w-full">
          <NavList />
        </div>
        <div className="flex flex-col lg:flex-row">
          <CountrySelector />
          <CurrencySelector />
        </div>
      </div>
      <Collapse open={isOpen}>
        <NavList />
      </Collapse>
    </Navbar>
  );
};
