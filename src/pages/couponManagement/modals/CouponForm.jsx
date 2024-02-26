import { useState, useEffect } from 'react';
import { Modal } from '../../../components/modal';
import {
  Card,
  Input,
  Select,
  Option,
  Button,
  Typography,
} from '@material-tailwind/react';

export const CouponForm = ({
  isOpen,
  onClose,
  items,
  createNewCoupon,
  updatedCreatedCoupon,
  couponEdit,
  isEditMode,
}) => {
  const [coupon, setCoupon] = useState({
    name: '',
    code: '',
    discount: '',
    expiration: new Date(),
    limit: '',
    applicable: [],
  });

  useEffect(() => {
    if (isEditMode) {
      const editedCoupon = {
        _id: couponEdit._id,
        name: couponEdit.name || '',
        code: couponEdit.code || '',
        discount: couponEdit.discount || '',
        expiration: new Date(couponEdit.expiration).toISOString().split('T')[0], // Formatea la fecha adecuadamente
        limit: couponEdit.limit || '',
        applicable: couponEdit.applicable || [],
      };
      setCoupon(editedCoupon);
    }
  }, [couponEdit, isEditMode]);

  const handleFormChange = (e) => {
    setCoupon({ ...coupon, [e.target.name]: e.target.value });
  };

  const handleItemChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setCoupon({ ...coupon, applicable: selectedOptions });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) return updatedCreatedCoupon(coupon);
    createNewCoupon(coupon);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card
        color="transparent"
        shadow={false}
        className="h-80 p-4 border text-center absolute left-1/2 transform -translate-x-1/2 z-10 w-80 lg:w-1/3 xl:h-96 top-10 overflow-y-scroll bg-card shadow-2xl "
      >
        <Typography
          variant="h4"
          color="blue-gray"
          className="font-openSans font-bold"
        >
          {isEditMode ? 'Editar Cupón' : 'Crear Cupón'}
        </Typography>
        <form className="mt-8 mb-2 w-full">
          <div className="mb-1 flex flex-col gap-6">
            <Input
              placeholder="Nombre"
              label="Nombre"
              type="text"
              name="name"
              value={coupon.name}
              onChange={handleFormChange}
            />

            <Input
              placeholder="Código"
              label="Código"
              type="text"
              name="code"
              value={coupon.code}
              onChange={handleFormChange}
            />

            <Input
              placeholder="Descuento"
              label="Descuento"
              type="number"
              name="discount"
              value={coupon.discount}
              onChange={handleFormChange}
            />

            <Typography
              variant="h6"
              color="blue-gray"
              className="font-openSans font-bold"
            >
              Fecha de Expiración
            </Typography>
            <Input
              type="date"
              name="expiration"
              value={coupon.expiration}
              onChange={handleFormChange}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
            />

            <Input
              placeholder="Límite de uso"
              label="Límite de uso"
              type="number"
              name="limit"
              value={coupon.limit}
              onChange={handleFormChange}
            />

           {/*  <Typography
              variant="h6"
              color="blue-gray"
              className="font-openSans font-bold"
            >
              Aplicado a:
            </Typography>
            <Select
              multiple
              placeholder="Aplicable a..."
              label="Seleccionar Membresía"
              name="applicable"
              value={coupon.applicable}
              onChange={handleItemChange}
            >
              {items.map((item) => (
                <Option key={item._id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select> */}
          </div>
          <div>
            <Button
              type="button"
              onClick={onClose}
              className="mt-6 bg-btnPrimary"
              fullWidth
            >
              Cerrar
            </Button>
            <Button
              type="submit"
              onClick={handleFormSubmit}
              className="mt-6 bg-btnTableCoupon"
              fullWidth
            >
              {isEditMode ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </Card>
    </Modal>
  );
};
