import { Typography, ListItem } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

const MenuItems = ({ name, icon, route }) => {
  const navigate = useNavigate();

  const handleClickLink = (routeLink) => {
    navigate(routeLink);
  };

  return (
    <>
      <Typography
        variant="small"
        /*   color="blue-gray" */
        className="font-medium text-primaryText "
      >
        <ListItem
          onClick={() => handleClickLink(route)}
          className="flex items-center gap-2 py-2 pr-4 hover:bg-secundaryText "
        >
          {' '}
          {icon} {name}
        </ListItem>
      </Typography>
    </>
  );
};

export default MenuItems;
