import { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  List,
} from "@material-tailwind/react";
import { useAuth } from "../contexts/AuthContext";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { CountrySelector } from "./CountrySelector";
import { CurrencySelector } from "./CurrencySelector";
import MenuItems from "./MenuItems";
import {CurrencyDollarIcon} from '@heroicons/react/24/solid';

const itemsMenu = [
  {
    route: "/memberships",
    name: "Home",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
      </svg>
    ),
  },
  {
    route: "/payment-history",
    name: "Consultar pagos",
    icon: <CurrencyDollarIcon className="h-7"/>,
  },
  {
    route: "/items-management",
    name: "Administrar Pagos",
    isAdminModule: true,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
        <path
          fillRule="evenodd"
          d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z"
          clipRule="evenodd"
        />
        <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
      </svg>
    ),
  },
  {
    route: "/coupon-management",
    name: "Administrar cupones",
    isAdminModule: true,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
        <path
          fillRule="evenodd"
          d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z"
          clipRule="evenodd"
        />
        <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
      </svg>
    ),
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
              <div>
              <MenuItems
                key={`country-name-${item.name}`}
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
      {/* <div className="flex flex-row">
        <CountrySelector />
        <CurrencySelector />
      </div> */}
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

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const toggleNav = () => setIsOpen(!isOpen);

  return (
    // <Navbar className="mx-auto w-full px-4 py-2 bg-nav rounded-none">
       <Navbar shadow={false} className="max-w-none px-4 py-2 bg-[url('/src/assets/wave.png')] rounded-none border-none">
      <div className="flex items-center justify-between">
      <IconButton
          onClick={toggleNav}
          variant="text"
          color="white"
          className="lg:hidden"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
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
        <div className="flex flex-col lg:flex-row ">
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
