import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Card, Button, Typography, IconButton } from '@material-tailwind/react';

const TABLE_HEAD = [
  'Nombre',
  'Precio',
  'Moneda',
  'Estado',
  'Creado',
  'Acciones',
];

export const TableItems = ({
  items,
  formatDate,
  openModalEdit,
  deleteCreatedItem,
  toggleItemStatus,
}) => {
  const handleClickEdit = (coupon) => {
    openModalEdit(coupon);
  };

  const handleClickDelete = (couponId) => {
    deleteCreatedItem(couponId);
  };
  return (
    <Card className="h-full w-full overflow-hidden mb-4">
      <div className="w-full max-h-96 overflow-x-auto overflow-y-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-openSans font-semibold leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={7}>
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-openSans font-semibold text-center"
                  >
                    No hay pagos registrados.
                  </Typography>
                </td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item._id} className="even:bg-blue-gray-50/50">
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.price}</td>
                <td className="p-4">{item.currency}</td>
                <td className="p-4">
                  <Button
                    className={item.active ? 'button bg-btnSecundary' : 'bg-btnPrimary'}
                    onClick={() => toggleItemStatus(item._id)}
                  >
                    {item.active ? 'Activo' : 'Inactivo'}
                  </Button>
                </td>
                <td className="p-4">{formatDate(item.create_at)}</td>
                <td className="p-4">
                  <IconButton
                    variant="outlined"
                    className="rounded-full me-2"
                    onClick={() => handleClickEdit(item)}
                  >
                    <FaRegEdit />
                  </IconButton>
                  <IconButton
                    variant="outlined"
                    className="rounded-full"
                    onClick={() => handleClickDelete(item._id)}
                  >
                    <MdDelete />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
