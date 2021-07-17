import React from 'react';

export default function BookingsScreen(props) {
    const productId = props.match.params.id;
    const day = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
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