import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import userRouter from './routers/userRouter.js';
import vehicleRouter from './routers/vehicleRouter.js';
import bookingRouter from './routers/bookingRouter.js';
import uploadRouter from './routers/uploadRouter.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/carrentals', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
app.use('/api/uploads', uploadRouter)

app.use('/api/users', userRouter);

app.use('/api/vehicles', vehicleRouter);

app.use('/api/bookings', bookingRouter);

/*app.get('/api/config/easypaisa',(req,res)=> {
    res.send(process.env.EASYPAISA_CLIENT_ID || 'sb' ) //sb means sandbox
})*/

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

/*app.get('/', (req, res) => {
    res.send('Server is ready');
});*/

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});


app.listen(process.env.PORT || 5000);

/*const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`)
})*/