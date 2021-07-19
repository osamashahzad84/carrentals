import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { bookingReducer } from './reducers/bookingReducers';
import { vehicleDetailsReducer, vehicleListReducer } from './reducers/vehicleReducers';

const initialState = {
    booking: {
        bookingItems: localStorage.getItem('bookingItems') ? JSON.parse(localStorage.getItem('bookingItems')) : [],
    },
};
const reducer = combineReducers({
    vehicleList: vehicleListReducer,
    vehicleDetails: vehicleDetailsReducer,
    booking: bookingReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)
export default store;