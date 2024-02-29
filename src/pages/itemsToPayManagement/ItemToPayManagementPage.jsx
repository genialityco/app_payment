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
import {
  createItemToPay,
  getItemsToPay,
  getItemToPayById,
  updateItemToPay,
  deleteItemToPay,
} from '../../services/itemToPayService';
import { getPayments } from '../../services/paymentDbService';
import { TableItems } from './tables/TableItems';
import { format } from 'date-fns';
import { TablePaymentHistory } from './tables/TablePaymentHistory';
import { ItemForm } from './modals/ItemForm';

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
    if (!dateString) return '';

    const date = new Date(dateString);

    return format(date, 'dd/MM/yy');
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
    <div className="w-full h-[calc(100vh-83px)]">
      <Typography variant="h2" className="text-center py-10 text-primaryText">
        Administrador de Pagos
      </Typography>
      <section className="flex flex-col justify-center p-5 gap-y-5 ">
        <ItemForm
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          items={items}
          createNewItem={createNewItemToPay}
          updatedCreatedItem={updatedCreatedCoupon}
          itemEdit={itemEdit}
          isEditMode={isEditMode}
        />
        <div className="flex justify-center md:justify-end gap-2 m-0 xl:me-14 my-5">
          {showItems ? (
            <Button
              size="md"
              onClick={() => setIsModalOpen(true)}
              className=" font-openSans  bg-btnThird"
            >
              Crear
            </Button>
          ) : null}
          <Button
            size="md"
            onClick={() => setShowItems(!showItems)}
            className=" font-openSans bg-btnPrimary "
          >
            {showItems ? 'Historial de pagos' : 'Ver pagos creados'}
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
