import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Spinner,
} from '@material-tailwind/react';

const ItemToPayManagementPage = () => {
  return (
    <div className="w-full">
      <Typography variant="h2" className="text-center py-6 text-primaryText">
        Administrador de pagos
      </Typography>
      <section className="flex flex-col items-center pb-4 gap-y-5 xl:h-[calc(100vh-161px)] lg:flex-row lg:justify-evenly lg:gap-y-0"></section>
    </div>
  );
};

export default ItemToPayManagementPage;
