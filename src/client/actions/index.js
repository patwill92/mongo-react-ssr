import axios from 'axios'

export const FETCH_ITEMS = 'FETCH_ITEMS';

export const fetchItems = () => async (dispatch) => {
  const {data} = await axios.get('/api/items');
  dispatch({
    type: FETCH_ITEMS,
    payload: data
  })
};

export const fetchItemsServer = (items) => {
  return {
    type: FETCH_ITEMS,
    payload: items
  }
};