import { Input, Typography, Button } from '@material-tailwind/react';
export const CouponInput = ({ handleChange, applyCoupon }) => {
  return (
    <>
      <Typography variant="h6" color="blue-gray" className="-mb-3">
        Código de cupón
      </Typography>
      <Input
        name="coupon"
        type="text"
        placeholder="Código de cupón"
        onChange={handleChange}
        size="lg"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: 'before:content-none after:content-none',
        }}
      />
      <Button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          applyCoupon();
        }}
        className="mt-6"
        fullWidth
      >
        Aplicar
      </Button>
    </>
  );
};
