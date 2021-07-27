import Axios from 'axios';
import { BOOKING_EMPTY } from '../constants/bookingConstants';
import { BOOK_CREATE_FAIL, BOOK_CREATE_REQUEST, BOOK_CREATE_SUCCESS, BOOK_DETAILS_FAIL, BOOK_DETAILS_REQUEST, BOOK_DETAILS_SUCCESS } from '../constants/bookConstants';

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

export const detailsBook = (bookId) => async (dispatch, getState) => {
    dispatch({ type: BOOK_DETAILS_REQUEST, payload: bookId })
    const { userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(`/api/bookings/${bookId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        })
        dispatch({ type: BOOK_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: BOOK_DETAILS_FAIL, payload: message })
    }
}