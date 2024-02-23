import { useState, useCallback } from 'react';
import { getItemToPayById } from "../../../services/itemToPayService";

export const useItem = (id, location) => {
  const [item, setItem] = useState(null);

  const loadItem = useCallback(async () => {
    const storedItem = sessionStorage.getItem("item");
    const itemInfo = storedItem ? JSON.parse(storedItem) : location.state?.item;

    if (!itemInfo && id) {
      const fetchedItem = await getItemToPayById(id);
      setItem(fetchedItem.data);
    } else {
      setItem(itemInfo);
    }
  }, [id, location.state]);

  return [item, loadItem];
};
