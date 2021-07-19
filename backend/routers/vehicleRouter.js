import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Vehicle from '../models/vehicleModel.js';

const vehicleRouter = express.Router();

//list product api

vehicleRouter.get('/', expressAsyncHandler(async (req, res) => {
    const vehicles = await Vehicle.find({});
    res.send(vehicles);
})
);

vehicleRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    //to delete all previous vehicles
    //await Vehicle.remove({});
    //
    const createdVehicles = await Vehicle.insertMany(data.vehicles);
    res.send({ vehicles: createdVehicles });
})
);

//detail product api

vehicleRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const vehicle = await Vehicle.findById(req.params.id);
    if (vehicle) {
        res.send(vehicle);
    }
    else {
        res.status(404).send({ message: 'Vehicle Not Found' })
    }
}));

export default vehicleRouter;