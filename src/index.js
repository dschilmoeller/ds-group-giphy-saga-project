import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios'

// default state is bad.
const searchReducer = (state = { data: 'null' }, action) => {
    switch (action.type) {
        case 'SET_IMAGES':
            console.log('Inside SET_IMAGES, payload is:', action.payload.data)
            return action.payload.data;
        default:
            return state;
    }
}

function* getSearchResults(action) {
    console.log('inside my getSearchResults', action)
    console.log('here is my payload', action.payload)
    try {
        const searchResponse = yield axios.get(`/api/search/${action.payload}`)
        yield put({ type: 'SET_IMAGES', payload: searchResponse.data })
    } catch (error) {
        console.log('error in getSearchResults', error)
    }

}

function* postFavorite(action) {
    console.log('in postFavorite action:', action.payload);
    try {
        yield axios.post('/api/search', action.payload)
        yield put({type: 'GET_FAVORITES'})
    } catch (error) {
        console.log('error in postFavorite', error)
    }
}

function* mainSaga() {
  // sagas here dude
  yield takeEvery("GET_FAVORITES", getFavorites);
  yield takeEvery('UPDATE_FAV_GIF', updateCategory)
    // sagas go here
    yield takeEvery('SEARCH_IMAGES', getSearchResults);
    yield takeEvery('POST_FAVORITE', postFavorite);
    yield takeEvery('GET_FAVORITES', getFavorites)
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
        searchReducer,
        favoriteList,
    }),
    applyMiddleware(sagaMiddleware, logger)
)

sagaMiddleware.run(mainSaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
