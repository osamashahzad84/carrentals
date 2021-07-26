import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BookingSteps from '../components/BookingSteps'

export default function BookVehicleScreen(props) {
    const booking = useSelector(state => state.booking)
    if (!booking.paymentMethod) {
        props.history.push('/payment')
    }

    const toPrice = (num) => Number(num.toFixed(2));
    booking.itemsPrice = toPrice(booking.bookingItems.reduce((a, c) => a + c.day * c.price, 0));
    booking.carrentalsPrice = toPrice(0.10 * booking.itemsPrice);
    booking.totalPrice = booking.itemsPrice + booking.carrentalsPrice;
    const bookVehicleHandler=()=>{
        //TODO: dispatch place order action
    }
    return (
        <div>
            <BookingSteps step1 step2 step3 step4></BookingSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Customer's Address</h2>
                                <p>
                                    <strong>Name: </strong> {booking.completeBooking.fullName} <br />
                                    <strong>Address: </strong> {booking.completeBooking.address},
                                    {booking.completeBooking.city},
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method of Payment: </strong> {booking.paymentMethod} <br />
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Book Vehicle/s</h2>
                                <ul>
                                    {
                                        booking.bookingItems.map((item) => (
                                            <li key={item.vehicle}>
                                                <div className="row">
                                                    <div>
                                                        <img src={item.image} alt={item.name} className="small"></img>
                                                    </div>
                                                    <div className="min-30">
                                                        <Link to={`/vehicle/${item.vehicle}`}>{item.name}</Link>
                                                    </div>
                                                    <div>
                                                        {item.day} day/s x PKR {item.price} per day = PKR{item.day * item.price}
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Booking Price Summary</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Vehicle/s Price</div>
                                    <div>PKR {booking.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>CarRentals Fee</div>
                                    <div>PKR {booking.carrentalsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Total Booking Price</strong></div>
                                    <div><strong>PKR {booking.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button type="button" onClick={bookVehicleHandler} className="primary block" disabled={booking.bookingItems.length===0}>
                                    Book Vehicle/s
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}