import { Typography, ListItem } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

const MenuItems = ({ name, icon, route }) => {
  const navigate = useNavigate();

  const handleClickLink = (routeLink) => {
    navigate(routeLink);
  };

  return (
    <ListItem className="flex items-center gap-2 py-2 pr-4">
      <span className="font-semibold text-primaryText font-openSans">
        {' '}
        {icon}
      </span>
      <Typography
        variant="paragraph"
        onClick={() => handleClickLink(route)}
        className="font-semibold text-primaryText font-openSans"
      >
        {name}
      </Typography>
    </ListItem>
  );
};

export default MenuItems;
