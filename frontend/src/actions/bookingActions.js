import Axios from "axios"
import { BOOKING_ADD_ITEM, BOOKING_REMOVE_ITEM } from "../constants/bookingConstants"

export const addToBooking=(productId, day) => async(dispatch, getState) =>{
    const {data}=await Axios.get(`/api/products/${productId}`)
    dispatch({
        type: BOOKING_ADD_ITEM,
        payload:{
            name:data.name,
            image:data.image,
            price:data.price,
            product:data._id,
            day,
        }
    });
    localStorage.setItem('bookingItems', JSON.stringify(getState().booking.bookingItems));
};

export const removeFromBooking=(productId)=>(dispatch,getState)=>{
    dispatch({type: BOOKING_REMOVE_ITEM, payload: productId});
    localStorage.setItem('bookingItems',JSON.stringify(getState().booking.bookingItems));
}