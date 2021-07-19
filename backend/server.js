import express from 'express';
import mongoose from 'mongoose';
import data from './data.js';
import userRouter from './routers/userRouter.js';

const app = express();
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/carrentals', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

app.get('/api/vehicles/:id', (req, res) => {
    const vehicle = data.vehicles.find((x) => x._id === req.params.id);
    if (vehicle) {
        res.send(vehicle)
    } else {
        res.status(404).send({ message: 'Vehicle not Found' });
    }
});

app.get('/api/vehicles', (req, res) => {
    res.send(data.vehicles);
});

app.use('/api/users', userRouter);

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