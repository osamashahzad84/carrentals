import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createBook } from '../actions/bookActions'
import BookingSteps from '../components/BookingSteps'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { BOOK_CREATE_RESET } from '../constants/bookConstants'

export default function BookVehicleScreen(props) {
    const book = useSelector(state => state.booking)
    if (!book.paymentMethod) {
        props.history.push('/payment')
    }

    const bookCreate = useSelector(state => state.bookCreate)
    const { loading, success, error, booking } = bookCreate;
    const toPrice = (num) => Number(num.toFixed(2));
    book.itemsPrice = toPrice(book.bookingItems.reduce((a, c) => a + c.day * c.price, 0));
    book.carrentalsPrice = toPrice(0.10 * book.itemsPrice);
    book.totalPrice = book.itemsPrice + book.carrentalsPrice;
    const dispatch = useDispatch();
    const bookVehicleHandler = () => {
        dispatch(createBook({ ...book, bookingItems: book.bookingItems }))
    }
    useEffect(() => {
        if (success) {
            props.history.push(`/booking/${booking.book._id}`);
            dispatch({ type: BOOK_CREATE_RESET });
        }
    }, [dispatch,  props.history, success, booking]);
    return (
        <div>
            <BookingSteps step1 step2 step3 step4></BookingSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Customer Details</h2>
                                <p>
                                    <strong>Name: </strong> {book.completeBooking.fullName} <br />
                                    <strong>CNIC: </strong> {book.completeBooking.idNum} <br />
                                    <strong>Address: </strong> {book.completeBooking.address},
                                    {book.completeBooking.city}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment Details</h2>
                                <p>
                                    <strong>Method of Payment: </strong> {book.paymentMethod} <br />
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Book Vehicle/s</h2>
                                <ul>
                                    {
                                        book.bookingItems.map((item) => (
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
                                    <div>PKR {book.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>CarRentals Fee</div>
                                    <div>PKR {book.carrentalsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Total Booking Price</strong></div>
                                    <div><strong>PKR {book.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button type="button" onClick={bookVehicleHandler} className="primary block" disabled={book.bookingItems.length === 0}>
                                    Book Vehicle/s
                                </button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}