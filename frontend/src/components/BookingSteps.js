import React from 'react'

export default function BookingSteps(props) {
    return (
        <div className="row booking-steps">
            <div className={props.step1 ? 'active' : ''}>Sign-In</div>
            <div className={props.step2 ? 'active' : ''}>Complete Booking</div>
            <div className={props.step3 ? 'active' : ''}>Payment</div>
            <div className={props.step4 ? 'active' : ''}>Booking Details</div>
        </div>
    )
}