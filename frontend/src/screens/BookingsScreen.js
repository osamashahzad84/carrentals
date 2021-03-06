import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToBooking, removeFromBooking } from '../actions/bookingActions';
import MessageBox from '../components/MessageBox';

export default function BookingsScreen(props) {
    const vehicleId = props.match.params.id;
    const day = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const booking = useSelector(state => state.booking);
    const { bookingItems } = booking;
    const dispatch = useDispatch()
    useEffect(() => {
        if (vehicleId) {
            dispatch(addToBooking(vehicleId, day));
        }
    }, [dispatch, vehicleId, day]);
    const removeFromBookingHandler = (id) => {
        dispatch(removeFromBooking(id));
    };
    const confirmbookingHandler = () => {
        props.history.push('/signin?redirect=confirmedBooking');
    }
    return (
        <div className="row top">
            <div className="col-2">
                <h1>Unconfirmed Bookings List</h1>
                {bookingItems.length === 0 ? <MessageBox>
                    No Unconfirmed Bookings.<Link to="/"> Start Renting :)</Link>
                </MessageBox>
                    :
                    (
                        <ul>
                            {
                                bookingItems.map((item) => (
                                    <li key={item.vehicle}>
                                        <div className="row">
                                            <div>
                                                <img src={item.image} alt={item.name} className="small"></img>
                                            </div>
                                            <div className="min-30">
                                                <Link to={`/vehicle/${item.vehicle}`}>{item.name}</Link>
                                            </div>
                                            <div>
                                                <select value={item.day} onChange={e => dispatch(addToBooking(item.vehicle, Number(e.target.value)))}>
                                                    {
                                                        [...Array(15).keys()].map(x => (
                                                            <option key={x + 1} value={x + 1}>{x + 1} </option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div>
                                                PKR {item.price} per day
                                            </div>
                                            <div>
                                                <button type="button" onClick={() => removeFromBookingHandler(item.vehicle)}>Delete</button>
                                            </div>

                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                Subtotal ({bookingItems.reduce((a, c) => a + c.day, 0)} items) : PKR {bookingItems.reduce((a, c) => a + c.price * c.day, 0)}
                            </h2>
                        </li>
                        <li>
                            <button type="button" onClick={confirmbookingHandler} className="primary block" disabled={bookingItems.length === 0}>
                                Complete All Bookings </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}