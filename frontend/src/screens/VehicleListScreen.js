import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listVehicles } from '../actions/vehicleActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function VehicleListScreen(props) {
    const vehicleList = useSelector(state => state.vehicleList)
    const { loading, error, vehicles } = vehicleList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listVehicles())
    }, [dispatch])
    const deleteHandler = () => {
        //TODO: dispatch delete action
    }
    return (
        <div>
            <h1>Vehicles</h1>
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