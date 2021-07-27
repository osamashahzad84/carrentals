import { BOOK_CREATE_FAIL, BOOK_CREATE_REQUEST, BOOK_CREATE_RESET, BOOK_CREATE_SUCCESS, BOOK_DETAILS_FAIL, BOOK_DETAILS_REQUEST, BOOK_DETAILS_SUCCESS } from "../constants/bookConstants";

export const bookCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case BOOK_CREATE_REQUEST:
            return { loading: true }
        case BOOK_CREATE_SUCCESS:
            return { loading: false, success: true, booking: action.payload }
        case BOOK_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case BOOK_CREATE_RESET:
            return {};
        default:
            return state;
    }
}

export const bookDetailsReducer = (state = { loading: true, book: {} }, action) => {
    switch (action.type) {
        case BOOK_DETAILS_REQUEST:
            return { loading: true };
        case BOOK_DETAILS_SUCCESS:
            return { loading: false, book: action.payload };
        case BOOK_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default: return state;
    }
}