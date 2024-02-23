import { Input, Button } from '@material-tailwind/react';
export const CouponInput = ({ handleChange, applyCoupon }) => {
  return (
    <>
      <Input
        variant="standard"
        name="coupon"
        type="text"
        placeholder="Código de cupón"
        label="Código de cupón"
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
        className="mt-6 font-openSans font-bold bg-btnSecundary"
        fullWidth
      >
        Aplicar
      </Button>
    </>
  );
};
