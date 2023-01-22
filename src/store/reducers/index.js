import { Types } from "../actions/items";

const defaultState = {
  items: [],
  loading: false,
  error: null,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case Types.CREATE_ITEM: {
      // const { items } = state;
      // console.log('items in reducer', items)
      // items.push(action.payload);
      // return { ...state, items };
      return {
        ...state,
        loading: true,
      }
    }

    case Types.DELETE_ITEM: {
      return state;
    }

    case Types.GET_ITEMS: {
      return {
        ...state,
        loading: true,
      }
    }
    case Types.GET_ITEMS_SUCCESS: {
      console.log('items',action)
      return {
        ...state,
        loading: false,
        items: action.items
      }
    }
    case Types.CREATE_ITEM_SUCCESS: {
      console.log('items',action)
      return {
        ...state,
        loading: false,
        items: action.items
      }
    }
    case Types.CREATE_ITEM_FAILED: {
      return {
        ...state,
        loading: false,
        message: action.message
      }
    }
    case Types.GET_ITEMS_FAILED: {
      return {
        ...state,
        loading: false,
        message: action.message
      }
    }

    default:
      return state;
  }
};

export default reducer;
