// types of action
export const Types = {
  GET_ITEMS: "GET_ITEMS",
  CREATE_ITEM: "CREATE_ITEM",
  CREATE_ITEM_SUCCESS:"CREATE_ITEM_SUCCESS",
  CREATE_ITEM_FAILED:"CREATE_ITEM_FAILED",
  DELETE_ITEM: "DELETE_ITEM",
  GET_ITEMS_SUCCESS: "GET_ITEMS_SUCCESS",
  GET_ITEMS_FAILED: "GET_ITEMS_FAILED"
};

// actions
export const getItems = () => ({
  type: Types.GET_ITEMS
});

export const createItem = (item) => ({
  type: Types.CREATE_ITEM,
  payload: item,
});

export const deleteItem = (id) => ({
  type: Types.DELETE_ITEM,
  payload: id,
});
