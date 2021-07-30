import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listBookings } from '../actions/bookActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function BookingListScreen(props) {
    const bookList = useSelector(state => state.bookList)
    const { loading, error, bookings } = bookList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listBookings())
    }, [dispatch])
    const deleteHandler = (booking) => {
        //todo 
    }
    return (
        <div>
            <h1>Bookings</h1>
            {
                loading ? <LoadingBox></LoadingBox> :
                    error ? <MessageBox variant="danger">{error}</MessageBox>
                        :
                        (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>USER</th>
                                        <th>DATE</th>
                                        <th>TOTAL</th>
                                        <th>PAID</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking) => (
                                        <tr key={booking._id}>
                                            <td>{booking._id}</td>
                                            <td>{booking.user.name}</td>
                                            <td>{booking.createdAt.substring(0, 10)}</td>
                                            <td>{booking.totalPrice}</td>
                                            <td>{booking.isPaid ? booking.paidAt.substring(0, 10) : 'No'}</td>
                                            <td>
                                                <button type="button" className="small"
                                                    onClick={() => { props.history.push(`/booked/${booking._id}`) }}>
                                                    Details
                                                </button>
                                                <button type="button" className="small"
                                                    onClick={() => deleteHandler(booking)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        )
            }
        </div>
    )
}