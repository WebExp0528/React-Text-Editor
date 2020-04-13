import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from 'connected-react-router';
import createRootReducer from './mainReducer'
import history from '../history';
import rootSaga from './mainSaga.js';

const sagaMiddleware = createSagaMiddleware();

const middleware =[
    sagaMiddleware,
    routerMiddleware(history)
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&  //eslint-disable-line
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) || compose; //eslint-disable-line

const store = createStore(
    createRootReducer(history),
    composeEnhancers(
        applyMiddleware(...middleware)
    )
);



sagaMiddleware.run(rootSaga);

export default () => {
    return store;
}
