import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listBookMine } from '../actions/bookActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function BookingHistoryScreen(props) {
    const bookMineList = useSelector(state => state.bookMineList);
    const { loading, error, bookings } = bookMineList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listBookMine())
    }, [dispatch])
    return (
        <div>
            <h1>Booking History</h1>
            {
                loading ? <LoadingBox></LoadingBox> :
                    error ? <MessageBox variant="danger">{error}</MessageBox>
                        :
                        (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
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
                                            <td>{booking.createdAt.substring(0, 10)}</td>
                                            <td>{booking.totalPrice}</td>
                                            <td>{booking.isPaid ? booking.paidAt.substring(0, 10) : 'No'}</td>
                                            <td>
                                                <button type="button" className="small"
                                                    onClick={() => { props.history.push(`/booked/${booking._id}`) }}>
                                                    Details
                                                </button>
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