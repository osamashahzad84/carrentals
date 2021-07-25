import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { bookingReducer } from './reducers/bookingReducers';
import { userSigninReducer } from './reducers/userReducers';
import { vehicleDetailsReducer, vehicleListReducer } from './reducers/vehicleReducers';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    },
    booking: {
        bookingItems: localStorage.getItem('bookingItems') ? JSON.parse(localStorage.getItem('bookingItems')) : [],
    },
};
const reducer = combineReducers({
    vehicleList: vehicleListReducer,
    vehicleDetails: vehicleDetailsReducer,
    booking: bookingReducer,
    userSignin: userSigninReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)
export default store;