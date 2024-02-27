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

export const ItemForm = ({
  isOpen,
  onClose,
  items,
  createNewItem,
  updatedCreatedItem,
  itemEdit,
  isEditMode,
}) => {
  const [item, setItem] = useState({
    name: '',
    price: '',
    currency: '',
  });

  useEffect(() => {
    if (isEditMode) {
      const editedItem = {
        _id: itemEdit._id,
        name: itemEdit.name || '',
        price: itemEdit.price || '',
        currency: itemEdit.currency || '',
      };
      setItem(editedItem);
    }
  }, [itemEdit, isEditMode]);

  const handleFormChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) return updatedCreatedItem(item);
    createNewItem(item);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card
        color="transparent"
        className="p-8 border text-center absolute left-1/2 transform -translate-x-1/2 z-10 w-80 lg:w-1/3 xl:max-w-sm bg-card shadow-2xl "
      >
        <Typography
          variant="h4"
          className="font-openSans font-bold text-secundaryText py-5 "
        >
          {isEditMode ? 'Editar Cupón' : 'Crear Cupón'}
        </Typography>
        <form className="lg:w-full">
          <div className="mb-1 flex flex-col gap-5">
            <Input
              placeholder="Nombre"
              label="Nombre"
              type="text"
              name="name"
              value={item.name}
              onChange={handleFormChange}
            />

            <Input
              placeholder="Precio"
              label="Precio"
              type="number"
              name="price"
              value={item.price}
              onChange={handleFormChange}
            />

            <Input
              placeholder="Moneda"
              label="Moneda"
              type="text"
              name="currency"
              className="uppercase"
              value={item.currency}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <Button
              size="md"
              type="button"
              onClick={onClose}
              className="mt-5 bg-btnSecundary"
              fullWidth
            >
              Cerrar
            </Button>
            <Button
              size="md"
              type="submit"
              onClick={handleFormSubmit}
              className="mt-3 bg-btnPrimary"
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
