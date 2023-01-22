import { all, takeLatest, put } from "@redux-saga/core/effects"; 
import itemsData from "./../../app_data/items.json";

function* fetchItems() {
  console.log('fetchItems executing')
  try {
    const items = itemsData.items;
    yield put({ type: 'GET_ITEMS_SUCCESS', items: items });
  } catch (e) {
    yield put({ type: 'GET_ITEMS_FAILED', message: e.message });
  }
}

function* createItem(action) {
  console.log('createItem executing - action.payload', action.payload)
  try {
   
    const items = itemsData.items;
    items.push(action.payload);
      // return { ...state, items };
    yield put({ type: 'CREATE_ITEM_SUCCESS', items: items });

  } catch (e) {
    yield put({ type: 'CREATE_ITEM_FAILED', message: e.message });
  }
}

function* exampleSaga() {
  yield takeLatest('GET_ITEMS', fetchItems);
  yield takeLatest('CREATE_ITEM', createItem);
  console.log("Example saga reached");
}

export default function* rootSaga() {
  yield all([exampleSaga()]);
}
