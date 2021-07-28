import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Book from '../models/bookingModel.js';
import { isAuth } from '../utils.js';

const bookingRouter = express.Router();
bookingRouter.get('/mine', isAuth, expressAsyncHandler(async (req, res) => {
    const books = await Book.find({ user: req.user._id })
    res.send(books);
}))
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

bookingRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
        res.send(book);
    } else {
        res.status(404).send({ message: 'Order Not Found' })
    }
}
))

/*bookingRouter.put(
    '/:id/pay', isAuth,expressAsyncHandler(async(req,res)=>{
        const book=await Book.findById(req.params.id);
        if (book){
            book.isPaid=true;
            book.paidAt=Date.now();
            book.paymentResult={
                id:req.body.id,
                status:req.body.status,
                update_time:req.body.update_time,
                email_address:req.body.email_address,
            }
           const updatedBook=await book.save();
           res.send({message:'Booking is Paid',book:updatedBook}) 
        }else{
            res.status(404).send({message:'Booking Not Found'})
        }
    })
)*/

export default bookingRouter;