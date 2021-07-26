import React, { useState } from 'react'
import BookingSteps from '../components/BookingSteps';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/bookingActions';

export default function PaymentMethodScreen(props) {
    const booking = useSelector((state) => state.booking);
    const { completeBooking } = booking;
    if (!completeBooking) {
        props.history.push('/confirmedBooking')
    }
    const [paymentMethod, setPaymentMethod] = useState('EasyPaisa');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        props.history.push('/bookvehicle')
    }
    return (
        <div>
            <BookingSteps step1 step2 step3></BookingSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input type="radio" id="easypaisa" value="EasyPaisa" name="paymentMethod"
                            required checked onChange={(e) => setPaymentMethod(e.target.value)}>
                        </input>
                        <label htmlFor="easypaisa">EasyPaisa</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" id="jazzcash" value="JazzCash" name="paymentMethod"
                            required onChange={(e) => setPaymentMethod(e.target.value)}>
                        </input>
                        <label htmlFor="jazzcash">JazzCash</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" id="cash" value="CashPayment" name="paymentMethod"
                            required onChange={(e) => setPaymentMethod(e.target.value)}>
                        </input>
                        <label htmlFor="cash">Cash Payment</label>
                    </div>
                </div>
                <div>
                    <button className="primary" type="submit">Continue</button>
                </div>
            </form>

        </div>
    )
}