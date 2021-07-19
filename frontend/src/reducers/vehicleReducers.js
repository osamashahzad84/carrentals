const { VEHICLE_LIST_REQUEST, VEHICLE_LIST_SUCCESS, VEHICLE_LIST_FAIL, VEHICLE_DETAILS_REQUEST, VEHICLE_DETAILS_FAIL, VEHICLE_DETAILS_SUCCESS } =require ("../constants/vehicleConstants");

export const vehicleListReducer = (state = { loading: true, vehicles: [] }, action) =>{
    switch(action.type) {
        case VEHICLE_LIST_REQUEST:
            return { loading: true};
        case VEHICLE_LIST_SUCCESS:
            return { loading: false, vehicles: action.payload};
        case VEHICLE_LIST_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state;
    }
}

export const vehicleDetailsReducer = (state = { vehicle:[], loading: true}, action) => {
    switch (action.type){
        case VEHICLE_DETAILS_REQUEST:
            return { loading: true};
        case VEHICLE_DETAILS_SUCCESS:
            return { loading: false, vehicle: action.payload}
        case VEHICLE_DETAILS_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state;
    }
}