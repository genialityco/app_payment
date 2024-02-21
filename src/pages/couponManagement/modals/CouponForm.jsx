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
  memberships,
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

  const handleMembershipChange = (e) => {
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
        className="h-96 p-4 border text-center absolute z-10 inset-x-1/3 top-10 overflow-y-scroll bg-card"
      >
        <Typography variant="h4" color="blue-gray" className='font-openSans font-semibold'>
          {isEditMode ? 'Editar Cupón' : 'Crear Cupón'}
        </Typography>
        <form className="mt-8 mb-2 w-80 sm:w-96 lg:w-full">
          <div className="mb-1 flex flex-col gap-6">
            {/*  <Typography variant="h6" color="blue-gray" className="-mb-3">
              Nombre
            </Typography> */}
            <Input
              variant="standard"
              placeholder="Nombre"
              label="Nombre"
              type="text"
              name="name"
              value={coupon.name}
              onChange={handleFormChange}
            />

            {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
              Código
            </Typography> */}
            <Input
              variant="standard"
              placeholder="Código"
              label="Código"
              type="text"
              name="code"
              value={coupon.code}
              onChange={handleFormChange}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Descuento
            </Typography>
            <Input
              placeholder="Descuento"
              type="number"
              name="discount"
              value={coupon.discount}
              onChange={handleFormChange}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Fecha de Expiración
            </Typography>
            <Input
              type="date"
              name="expiration"
              value={coupon.expiration}
              onChange={handleFormChange}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Límite de uso
            </Typography>

            <Input
              placeholder="Límite de uso"
              type="number"
              name="limit"
              value={coupon.limit}
              onChange={handleFormChange}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Aplicado a:
            </Typography>
            <Select
              multiple
              placeholder="Aplicable a..."
              name="applicable"
              value={coupon.applicable}
              onChange={handleMembershipChange}
            >
              {memberships.map((membership) => (
                <Option key={membership._id} value={membership.id}>
                  {membership.name}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <Button type="button" onClick={onClose} className="mt-6" fullWidth>
              Cerrar
            </Button>
            <Button
              type="submit"
              onClick={handleFormSubmit}
              className="mt-6"
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
