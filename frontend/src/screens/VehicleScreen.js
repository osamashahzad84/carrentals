import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsVehicle } from '../actions/vehicleActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';

export default function VehicleScreen(props) {
    const dispatch = useDispatch();
    const vehicleId = props.match.params.id;
    const [day, setDay] = useState(1);
    const vehicleDetails = useSelector((state) => state.vehicleDetails);
    const { loading, error, vehicle } = vehicleDetails;

    useEffect(() => {
        dispatch(detailsVehicle(vehicleId))
    }, [dispatch, vehicleId]);
    const addToBookingsHandler = () => {
        props.history.push(`/bookings/${vehicleId}?day=${day}`);
    }
    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div>
                    <Link to="/">Back to Results</Link>
                    <div className="row top">
                        <div className="col-2">
                            <img className="large" src={vehicle.image} alt={vehicle.name}></img>
                        </div>
                        <div className="col-1">
                            <ul>
                                <li>
                                    <h1>{vehicle.name}</h1>
                                </li>
                                <li>
                                    <Rating rating={vehicle.rating} numReviews={vehicle.numReviews}></Rating>
                                </li>
                                <li>
                                    Price: Rs {vehicle.price} per day
                                </li>
                                <li>
                                    Description:
                                    <p>{vehicle.description}</p>
                                </li>

                            </ul>
                        </div>
                        <div className="col-1">
                            <div className="card card-body">
                                <ul>
                                    <li>
                                        <div className="row">
                                            <div>Price</div>
                                            <div className="price"> Rs {vehicle.price}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Status:</div>
                                            <div> {vehicle.countInStock > 0 ? (
                                                <span className="Success"> Available</span>
                                            ) : (
                                                <span className="danger"> Unavailable</span>
                                            )}
                                            </div>
                                        </div>
                                    </li>
                                    {
                                        vehicle.countInStock > 0 && (
                                            <>
                                                <li>
                                                    <div className='row'>
                                                        <div>Number of Days</div>
                                                        <div>
                                                            <select value={day} onChange={e => setDay(e.target.value)}>
                                                                {
                                                                    [...Array(15).keys()].map(x => (
                                                                        <option key={x + 1} value={x + 1}>{x + 1} </option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>

                                                </li>
                                                <li>
                                                    <button onClick={addToBookingsHandler} className="primary block">Add to Bookings</button>
                                                </li>
                                            </>
                                        )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}