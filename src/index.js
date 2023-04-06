import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { createSagaMiddleware } from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios'

function* mainSaga () {
    // sagas here dude
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore (
    combineReducers({
        //reducers goes here
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
