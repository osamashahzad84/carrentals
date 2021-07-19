import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import vehicleRouter from './routers/vehicleRouter.js';

const app = express();
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/carrentals', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

app.use('/api/users', userRouter);

app.use('/api/vehicles', vehicleRouter)

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`)
})