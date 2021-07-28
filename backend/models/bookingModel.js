import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    bookingItems: [{
        name: { type: String, required: true },
        day: { type: Number, required: true },
        image: { type: String, required: true },
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
    /*paymentResult:{
        id:String,
        status:String,
        update_time:String,
        email_address:String,
    },*/
    itemsPrice: { type: Number, required: true },
    carrentalsPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true,
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },

},
    {
        timestamps: true,
    }
)

const Book=mongoose.model('Booking',bookingSchema);
export default Book;
