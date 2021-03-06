import Axios from "axios";
import { VEHICLE_LIST_REQUEST, VEHICLE_LIST_SUCCESS, VEHICLE_LIST_FAIL, VEHICLE_DETAILS_REQUEST, VEHICLE_DETAILS_SUCCESS, VEHICLE_DETAILS_FAIL, VEHICLE_CREATE_REQUEST, VEHICLE_CREATE_FAIL, VEHICLE_CREATE_SUCCESS, VEHICLE_UPDATE_REQUEST, VEHICLE_UPDATE_FAIL, VEHICLE_UPDATE_SUCCESS, VEHICLE_DELETE_REQUEST, VEHICLE_DELETE_FAIL, VEHICLE_DELETE_SUCCESS } from "../constants/vehicleConstants";

export const listVehicles = () => async (dispatch) => {
    dispatch({
        type: VEHICLE_LIST_REQUEST,
    });

    try {
        const { data } = await Axios.get('/api/vehicles');
        dispatch({ type: VEHICLE_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: VEHICLE_LIST_FAIL, payload: error.message })
    }
}

export const detailsVehicle = (vehicleId) => async (dispatch) => {
    dispatch({ type: VEHICLE_DETAILS_REQUEST, payload: vehicleId });
    try {
        const { data } = await Axios.get(`/api/vehicles/${vehicleId}`);
        dispatch({ type: VEHICLE_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: VEHICLE_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message, });
    }
}

export const createVehicle = () => async (dispatch, getState) => {
    dispatch({ type: VEHICLE_CREATE_REQUEST })
    const { userSignin: { userInfo }, } = getState();
    try {
        const { data } = await Axios.post('/api/vehicles', {}, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        })
        dispatch({
            type: VEHICLE_CREATE_SUCCESS, payload: data.vehicle,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: VEHICLE_CREATE_FAIL, payload: message })
    }
}

export const updateVehicle = (vehicle) => async (dispatch, getState) => {
    dispatch({ type: VEHICLE_UPDATE_REQUEST, payload: vehicle });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.put(`/api/vehicles/${vehicle._id}`, vehicle, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: VEHICLE_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: VEHICLE_UPDATE_FAIL, error: message });
    }
};

export const deleteVehicle = (vehicleId) => async (dispatch, getState) => {
    dispatch({ type: VEHICLE_DELETE_REQUEST, payload: vehicleId });
    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = Axios.delete(`/api/vehicles/${vehicleId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: VEHICLE_DELETE_SUCCESS, });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: VEHICLE_DELETE_FAIL, error: message });
    }
}