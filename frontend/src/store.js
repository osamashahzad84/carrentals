import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { bookingReducer } from './reducers/bookingReducers';
import { bookCreateReducer, bookDetailsReducer, bookMineListReducer } from './reducers/bookReducers';
import { userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer } from './reducers/userReducers';
import { vehicleCreateReducer, vehicleDetailsReducer, vehicleListReducer } from './reducers/vehicleReducers';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    },
    booking: {
        bookingItems: localStorage.getItem('bookingItems') ? JSON.parse(localStorage.getItem('bookingItems')) : [],
        completeBooking: localStorage.getItem('completeBooking') ? JSON.parse(localStorage.getItem('completeBooking')) : {},
        paymentMethod: 'EasyPaisa',
    },
};
const reducer = combineReducers({
    vehicleList: vehicleListReducer,
    vehicleDetails: vehicleDetailsReducer,
    booking: bookingReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    bookCreate: bookCreateReducer,
    bookDetails: bookDetailsReducer,
    //payment
    bookMineList: bookMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    vehicleCreate: vehicleCreateReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)
export default store;