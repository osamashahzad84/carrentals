import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToBooking } from '../actions/bookingActions';

export default function BookingsScreen(props) {
    const productId = props.match.params.id;
    const day = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const dispatch = useDispatch()
    useEffect(() => {
        if (productId) {
            dispatch(addToBooking(productId, day));
        }
    }, [dispatch, productId, day]);
    return (
        <div>
            <h1>
                Bookings Screen
            </h1>
            <p>
                CURRENT UNCONIFIRMED BOOKINGS: ProductID: {productId} Booking for: {day} day/days
            </p>
        </div>
    )
}