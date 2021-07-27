import Axios from 'axios';
import { BOOKING_EMPTY } from '../constants/bookingConstants';
import { BOOK_CREATE_FAIL, BOOK_CREATE_REQUEST, BOOK_CREATE_SUCCESS } from '../constants/bookConstants';

export const createBook = (book) => async (dispatch, getState) => {
    dispatch({ type: BOOK_CREATE_REQUEST, payload: book })
    try {
        const { userSignin: { userInfo }, } = getState();
        const { data } = await Axios.post('/api/bookings', book, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        })
        dispatch({ type: BOOK_CREATE_SUCCESS, payload: data })
        dispatch({ type: BOOKING_EMPTY })
        localStorage.removeItem('bookingItems');
    } catch (error) {
        dispatch({
            type: BOOK_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}