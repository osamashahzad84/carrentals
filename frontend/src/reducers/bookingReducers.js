import { BOOKING_ADD_ITEM, BOOKING_EMPTY, BOOKING_REMOVE_ITEM, BOOKING_SAVE_COMPLETE_BOOKING, BOOKING_SAVE_PAYMENT_METHOD } from "../constants/bookingConstants";

export const bookingReducer = (state = { bookingItems: [] }, action) => {
    switch (action.type) {
        case BOOKING_ADD_ITEM:
            const item = action.payload;
            const existItem = state.bookingItems.find(x => x.vehicle === item.vehicle)
            if (existItem) {
                return {
                    ...state,
                    bookingItems: state.bookingItems.map(x => x.vehicle === existItem.vehicle ? item : x)
                }
            } else {
                return {
                    ...state, bookingItems: [...state.bookingItems, item]
                };
            }
        case BOOKING_REMOVE_ITEM:
            return {
                ...state, bookingItems: state.bookingItems.filter(x => x.vehicle !== action.payload)
            };
        case BOOKING_SAVE_COMPLETE_BOOKING:
            return {
                ...state, completeBooking: action.payload
            }
        case BOOKING_SAVE_PAYMENT_METHOD:
            return {
                ...state, paymentMethod: action.payload
            }
        case BOOKING_EMPTY:
            return {
                ...state, bookingItems: []
            }
        default:
            return state;
    }
}