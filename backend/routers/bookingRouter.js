import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Book from '../models/bookingModel.js';
import { isAuth } from '../utils.js';

const bookingRouter = express.Router();

bookingRouter.post('/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        if (req.body.bookingItems.length === 0) {
            res.status(400).send({ message: 'Booking List is empty' })
        } else {
            const book = new Book({
                bookingItems: req.body.bookingItems,
                completeBooking: req.body.completeBooking,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                carrentalsPrice: req.body.carrentalsPrice,
                totalPrice: req.body.totalPrice,
                user: req.user._id,
            })
            const createdBook = await book.save();
            res.status(201).send({ message: 'New Booking Created', book: createdBook })
        }
    }
    ))

export default bookingRouter;