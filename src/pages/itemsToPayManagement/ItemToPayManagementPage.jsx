import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Spinner,
} from "@material-tailwind/react";
import {
  createItemToPay,
  getItemsToPay,
  getItemToPayById,
  updateItemToPay,
  deleteItemToPay,
} from "../../services/itemToPayService";
import { getPayments } from "../../services/paymentDbService";
import { TableItems } from "./tables/TableItems";
import { format } from "date-fns";
import { TablePaymentHistory } from "./tables/TablePaymentHistory";
import { ItemForm } from "./modals/ItemForm";

const getAllItemsToPay = async () => {
  const itemsData = await getItemsToPay();
  return itemsData.data;
};

const ItemToPayManagementPage = () => {
  const [items, setItems] = useState([]);
  const [showItems, setShowItems] = useState(true);
  const [payments, setPayments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemEdit, setItemEdit] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const init = async () => {
      const itemsData = await getAllItemsToPay();
      setItems(itemsData);
    };
    init();
  }, []);

  const formatDate = useCallback((dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    return format(date, "dd/MM/yy");
  }, []);

  // Funciones para manejar los cupones
  const createNewItemToPay = async (itemData) => {
    const newItem = await createItemToPay(itemData);
    setItems((prev) => [...prev, newItem.data]);
    setIsModalOpen(false);
  };

  const updatedCreatedCoupon = async (itemData) => {
    await updateItemToPay(itemData._id, itemData);
    await getAllItemsToPay().then((itemsData) => setItems(itemsData));
    setIsModalOpen(false);
  };

  const deleteCreatedItem = async (itemId) => {
    await deleteItemToPay(itemId);
    await getAllItemsToPay().then((itemsData) => setItems(itemsData));
  };

  const toggleItemStatus = async (id) => {
    const item = await getItemToPayById(id);
    const updatedItemData = {
      active: !item.data.active,
    };
    await updateItemToPay(id, updatedItemData);
    await getAllItemsToPay().then((itemsData) => setItems(itemsData));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setItemEdit({});
  };

  const openModalEdit = (item) => {
    setItemEdit(item);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const getAllPayments = async () => {
    const paymentsData = await getPayments();
    setPayments(paymentsData.data);
  };

  return (
    <div className="w-full">
      <Typography variant="h2" className="text-center py-6 text-primaryText">
        Administrador de pagos
      </Typography>
      <section className="flex flex-col justify-center p-5 gap-y-5 xl:h-[calc(100vh-161px)]">
        <ItemForm
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          items={items}
          createNewItem={createNewItemToPay}
          updatedCreatedItem={updatedCreatedCoupon}
          itemEdit={itemEdit}
          isEditMode={isEditMode}
        />
        <div className="flex justify-end gap-2 m-0">
          {showItems ? (
            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-20 p-0 font-openSans  bg-btnTableCoupon"
            >
              Crear
            </Button>
          ) : null}
          <Button
            onClick={() => setShowItems(!showItems)}
            className=" md:w-28 p-3 font-openSans bg-btnCard"
          >
            {showItems ? "Historial de pagos" : "Ver pagos creados"}
          </Button>
        </div>
        {showItems ? (
          <TableItems
            items={items}
            formatDate={formatDate}
            openModalEdit={openModalEdit}
            deleteCreatedItem={deleteCreatedItem}
            toggleItemStatus={toggleItemStatus}
          />
        ) : (
          <TablePaymentHistory
            payments={payments}
            getAllPayments={getAllPayments}
            formatDate={formatDate}
          />
        )}
      </section>
    </div>
  );
};

export default ItemToPayManagementPage;
