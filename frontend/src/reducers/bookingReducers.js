import { BOOKING_ADD_ITEM, BOOKING_REMOVE_ITEM } from "../constants/bookingConstants";

export const bookingReducer = (state = { bookingItems: [] }, action) => {
    switch (action.type) {
        case BOOKING_ADD_ITEM:
            const item = action.payload;
            const existItem = state.bookingItems.find(x => x.product === item.product)
            if (existItem) {
                return {
                    ...state,
                    bookingItems: state.bookingItems.map(x => x.product === existItem.product ? item : x)
                }
            } else {
                return {
                    ...state, bookingItems: [...state.bookingItems, item]
                };
            }
        case BOOKING_REMOVE_ITEM:
            return { ...state, bookingItems: state.bookingItems.filter(x => x.product !== action.payload) 
            };
        default:
            return state;
    }
}