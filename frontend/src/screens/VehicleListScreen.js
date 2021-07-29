import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createVehicle, listVehicles } from '../actions/vehicleActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { VEHICLE_CREATE_RESET } from '../constants/vehicleConstants';

export default function VehicleListScreen(props) {
    const vehicleList = useSelector(state => state.vehicleList)
    const { loading, error, vehicles } = vehicleList;

    const vehicleCreate = useSelector(state => state.vehicleCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        vehicle: createdVehicle,
    } = vehicleCreate;
    const dispatch = useDispatch();
    useEffect(() => {
        if (successCreate) {
            dispatch({ type: VEHICLE_CREATE_RESET })
            props.history.push(`/vehicle/${createdVehicle._id}/edit`)
        }
        dispatch(listVehicles())
    }, [createdVehicle, dispatch, props.history, successCreate])
    const deleteHandler = () => {
        //TODO: dispatch delete action
    }
    const createHandler = () => {
        dispatch(createVehicle());
    }
    return (
        <div>
            <div className="row">
                <h1>Vehicles</h1>
                <button type="button" className="primary" onClick={createHandler}>
                    Add New Vehicle
                </button>
            </div>
            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
            {loading ? <LoadingBox></LoadingBox>
                :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                    :
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>MANUFACTURER</th>
                                <th>OWNER</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicles.map((vehicle) => (
                                <tr key={vehicle._id}>
                                    <td>{vehicle._id}</td>
                                    <td>{vehicle.name}</td>
                                    <td>{vehicle.price}</td>
                                    <td>{vehicle.category}</td>
                                    <td>{vehicle.manufacturer}</td>
                                    <td>{vehicle.owner}</td>
                                    <td>
                                        <button type="button" className="small"
                                            onClick={() => props.history.push(`/vehicle/${vehicle._id}/edit`)}>
                                            Edit
                                        </button>
                                        <button type="button" className="small"
                                            onClick={() => deleteHandler(vehicle)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            }
        </div>
    )
}