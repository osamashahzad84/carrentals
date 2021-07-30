import { BOOK_CREATE_FAIL, BOOK_CREATE_REQUEST, BOOK_CREATE_RESET, BOOK_CREATE_SUCCESS, BOOK_DETAILS_FAIL, BOOK_DETAILS_REQUEST, BOOK_DETAILS_SUCCESS, BOOK_LIST_FAIL, BOOK_LIST_REQUEST, BOOK_LIST_SUCCESS, BOOK_MINE_LIST_FAIL, BOOK_MINE_LIST_REQUEST, BOOK_MINE_LIST_SUCCESS } from "../constants/bookConstants";

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

export const bookDetailsReducer = (state = { loading: true }, action) => {
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

//payment

export const bookMineListReducer = (state = { bookings: [] }, action) => {
    switch (action.type) {
        case BOOK_MINE_LIST_REQUEST:
            return { loading: true };
        case BOOK_MINE_LIST_SUCCESS:
            return { loading: false, bookings: action.payload };
        case BOOK_MINE_LIST_FAIL:
            return { loading: false, error: action.payload }
        default: return state;
    }
}

export const bookListReducer = (state = { bookings: [] }, action) => {
    switch (action.type) {
        case BOOK_LIST_REQUEST:
            return { loading: true };
        case BOOK_LIST_SUCCESS:
            return { loading: false, bookings: action.payload };
        case BOOK_LIST_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}