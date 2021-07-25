import Axios from "axios"
import { BOOKING_ADD_ITEM, BOOKING_REMOVE_ITEM, BOOKING_SAVE_COMPLETE_BOOKING } from "../constants/bookingConstants"

export const addToBooking=(vehicleId, day) => async(dispatch, getState) =>{
    const {data}=await Axios.get(`/api/vehicles/${vehicleId}`)
    dispatch({
        type: BOOKING_ADD_ITEM,
        payload:{
            name:data.name,
            image:data.image,
            price:data.price,
            vehicle:data._id,
            day,
        }
    });
    localStorage.setItem('bookingItems', JSON.stringify(getState().booking.bookingItems));
};

export const removeFromBooking=(vehicleId)=>(dispatch,getState)=>{
    dispatch({type: BOOKING_REMOVE_ITEM, payload: vehicleId});
    localStorage.setItem('bookingItems',JSON.stringify(getState().booking.bookingItems));
}

export const saveCompleteBooking=(data)=>(dispatch)=>{
    dispatch({type:BOOKING_SAVE_COMPLETE_BOOKING, payload:data})
    localStorage.setItem('completeBooking',JSON.stringify(data))
}