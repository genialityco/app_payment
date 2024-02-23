import { useState, useEffect } from "react";
import { Modal } from "../../../components/modal";
import {
  Card,
  Input,
  Select,
  Option,
  Button,
  Typography,
} from "@material-tailwind/react";

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
    name: "",
    price: "",
    currency: "",
  });

  useEffect(() => {
    if (isEditMode) {
      const editedItem = {
        _id: itemEdit._id,
        name: itemEdit.name || "",
        price: itemEdit.price || "",
        currency: itemEdit.currency || "",
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
        shadow={false}
        className="h-96 p-4 border text-center absolute z-10 inset-x-1/3 top-5 overflow-y-scroll bg-card"
      >
        <Typography
          variant="h4"
          color="blue-gray"
          className="font-openSans font-bold"
        >
          {isEditMode ? "Editar Cupón" : "Crear Cupón"}
        </Typography>
        <form className="mt-8 mb-2 w-80 sm:w-96 lg:w-full">
          <div className="mb-1 flex flex-col gap-6">
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
              type="button"
              onClick={onClose}
              className="mt-6 bg-btnCard"
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
              {isEditMode ? "Actualizar" : "Crear"}
            </Button>
          </div>
        </form>
      </Card>
    </Modal>
  );
};
