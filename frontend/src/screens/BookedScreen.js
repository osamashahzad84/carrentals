import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { detailsBook } from '../actions/bookActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function BookedScreen(props) {
    const bookId = props.match.params.id;
    const bookDetails = useSelector(state => state.bookDetails)
    const { book, loading, error } = bookDetails;// || {};
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsBook(bookId))
    }, [dispatch, bookId]);

    return loading ? (<LoadingBox></LoadingBox>) :
        error ? (<MessageBox variant="danger">{error}</MessageBox>
        ) : (
            <div>
                <h1>Booking ID {book._id}</h1>
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
                                    {book.isPaid ? (
                                        <MessageBox variant="success">
                                            Paid at {book.paidAt}
                                        </MessageBox>
                                    ) : (
                                        <MessageBox variant="danger">Not Paid</MessageBox>
                                    )}
                                </div>
                            </li>
                            <li>
                                <div className="card card-body">
                                    <h2>Booked Vehicle/s</h2>
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
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
}