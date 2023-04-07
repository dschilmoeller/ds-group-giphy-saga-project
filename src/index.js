import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

//SAGA ROOT or WATCHER
function* mainSaga() {
  // sagas here dude
  yield takeEvery("GET_FAVORITES", getFavorites);
  yield takeEvery('UPDATE_FAV_GIF', updateCategory)
}

// SAGAS
function* updateCategory(action) {
    console.log('updateCategory saga action.payload:', action.payload);
    // PUT request to change category
    try{
        yield axios.put(`api/favorite/${action.payload.id}/${action.payload.category_id}`);
        yield put({
            type: 'GET_FAVORITES'
        })
    }catch(err){
        console.log('err sending PUT data to server', err);
    }
    
}
function* getFavorites() {
  try {
    // HTTP call to server to return favorite DB results
    const newFavorites = yield axios.get("api/favorite");
    // Saga put to turn server response data over to favoriteList reducer
    console.log("newFavorites:", newFavorites.data);
    yield put({
      type: "SET_FAVORITES",
      payload: newFavorites.data,
    });
  } catch (err) {
    // no errors please!
    console.error(err);
  }
}

//REDUCERS
// reducer to hold favorite table data so we access in the Favorites component and render to the DOM
const favoriteList = (state = [], action) => {
  switch (action.type) {
    case "SET_FAVORITES":
      console.log("action.payload:", action.payload);
      return action.payload;
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    //reducers goes here
    favoriteList,
  }),
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(mainSaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
