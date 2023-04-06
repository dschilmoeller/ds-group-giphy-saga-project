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
    } catch (error) {
        console.log('error in postFavorite', error)
    }
}

function* mainSaga() {
    // sagas go here
    yield takeEvery('SEARCH_IMAGES', getSearchResults);
    yield takeEvery('POST_FAVORITE', postFavorite)
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combineReducers({
        //reducers goes here
        searchReducer,
    }),
    applyMiddleware(sagaMiddleware, logger)
)

sagaMiddleware.run(mainSaga)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
