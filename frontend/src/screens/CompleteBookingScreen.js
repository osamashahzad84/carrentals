import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveCompleteBooking } from '../actions/bookingActions';
import BookingSteps from '../components/BookingSteps'

export default function CompleteBookingScreen(props) {
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin
    const booking=useSelector(state=>state.booking)
    const{completeBooking}=booking;
    if (!userInfo) {
        props.history.push('/signin')
    }
    const [fullName, setFullName] = useState(completeBooking.fullName);
    const [address, setAddress] = useState(completeBooking.address);
    const [city, setCity] = useState(completeBooking.city);
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveCompleteBooking({ fullName, address, city }))
        props.history.push('/payment')
    }
    return (
        <div>
            <BookingSteps step1 step2></BookingSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Booking Form</h1>
                </div>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" placeholder="Enter full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required>
                    </input>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} required>
                    </input>
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} required>
                    </input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">
                        Continue
                    </button>
                </div>
            </form>
        </div>
    )
}