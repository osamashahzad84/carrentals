import Axios from "axios";
import {  VEHICLE_LIST_REQUEST, VEHICLE_LIST_SUCCESS, VEHICLE_LIST_FAIL, VEHICLE_DETAILS_REQUEST, VEHICLE_DETAILS_SUCCESS, VEHICLE_DETAILS_FAIL } from "../constants/vehicleConstants";

export const listVehicles = () => async (dispatch) =>{
    dispatch({
        type: VEHICLE_LIST_REQUEST,
    });
    
    try {
        const {data}=await Axios.get('/api/vehicles');
        dispatch({type: VEHICLE_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: VEHICLE_LIST_FAIL, payload: error.message})
    }
}

export const detailsVehicle = (vehicleId) => async (dispatch) =>{
    dispatch({type: VEHICLE_DETAILS_REQUEST, payload: vehicleId });
    try {
        const {data} = await Axios.get(`/api/vehicles/${vehicleId}`);
        dispatch({type: VEHICLE_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: VEHICLE_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message, });
    }
}