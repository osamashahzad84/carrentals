import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    orderItems: [{
        name: { type: String, required: true },
        day: { type: Number, required: true },
        img: { type: String, required: true },
        price: { type: Number, required: true },
        vehicle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vehicle', required: true,
        },
    }],
    completeBooking: {
        fullName: { type: String, required: true },
        idNum: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    carrentalsPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User', required: true,
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },

},
    {
        timestamps: true,
    }
)

const Booking=mongoose.model('Booking',bookingSchema);
export default Booking;
