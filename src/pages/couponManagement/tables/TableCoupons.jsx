import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Card, Button, Typography, IconButton } from '@material-tailwind/react';

const TABLE_HEAD = [
  'Nombre',
  'Código',
  'Descuento',
  'Estado',
  'Uso',
  'Fecha de Expiración',
  'Acciones',
];

export const TableCupons = ({
  coupons,
  formatDate,
  openModalEdit,
  deleteCreatedCoupon,
  toggleCouponStatus,
}) => {
  const handleClickEdit = (coupon) => {
    openModalEdit(coupon);
  };

  const handleClickDelete = (couponId) => {
    deleteCreatedCoupon(couponId);
  };
  return (
    <Card className="h-full w-full overflow-hidden">
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
          {coupons.length === 0 && (
            <tr>
              <td colSpan={7}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-openSans font-semibold text-center"
              >
                No hay cupones registrados.
              </Typography>
              </td>
            </tr>
          )}
          {coupons.map((coupon) => (
            <tr key={coupon._id} className="even:bg-blue-gray-50/50">
              <td className="p-4">{coupon.name}</td>
              <td className="p-4">{coupon.code}</td>
              <td className="p-4">{coupon.discount} %</td>
              <td className="p-4">
                <Button
                  className={coupon.active ? 'button' : ''}
                  onClick={() => toggleCouponStatus(coupon._id)}
                >
                  {coupon.active ? 'Activo' : 'Inactivo'}
                </Button>
              </td>
              <td className="p-4">
                {coupon.used}/{coupon.limit}
              </td>
              <td className="p-4">{formatDate(coupon.expiration)}</td>
              <td className="p-4">
                <IconButton
                  variant="outlined"
                  className="rounded-full me-2"
                  onClick={() => handleClickEdit(coupon)}
                >
                  <FaRegEdit />
                </IconButton>
                <IconButton
                  variant="outlined"
                  className="rounded-full"
                  onClick={() => handleClickDelete(coupon._id)}
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
