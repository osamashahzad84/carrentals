import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBook, listBookings } from '../actions/bookActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { BOOK_DELETE_RESET } from '../constants/bookConstants';

export default function BookingListScreen(props) {
    const bookList = useSelector(state => state.bookList)
    const { loading, error, bookings } = bookList;
    const bookDelete = useSelector(state => state.bookDelete)
    const { loading: loadingDelete, error: errorDelete,
        success: successDelete } = bookDelete;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: BOOK_DELETE_RESET })
        dispatch(listBookings())
    }, [dispatch, successDelete])
    const deleteHandler = (booking) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            dispatch(deleteBook(booking._id));
        }
    }
    return (
        <div>
            <h1>Bookings</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
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