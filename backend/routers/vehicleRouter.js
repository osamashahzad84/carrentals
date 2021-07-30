import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Vehicle from '../models/vehicleModel.js';
import { isAdmin, isAuth } from '../utils.js';

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

vehicleRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const vehicle = new Vehicle({
        name: 'Sample Name' + Date.now(),
        category: 'Sample Category',
        image: '/images/corolla1.jpg',
        price: 0,
        countInStock: 0,
        manufacturer: 'Sample',
        rating: 0,
        numReviews: 0,
        description: 'Sample Description.',
    })
    const createdVehicle = await vehicle.save();
    res.send({ message: 'Vehicle Added Successfully', vehicle: createdVehicle })
}))

vehicleRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const vehicleId = req.params.id;
    const vehicle = await Vehicle.findById(vehicleId);
    if (vehicle) {
        vehicle.name = req.body.name;
        vehicle.price = req.body.price;
        vehicle.image = req.body.image;
        vehicle.category = req.body.category;
        vehicle.manufacturer = req.body.manufacturer;
        vehicle.countInStock = req.body.countInStock;
        vehicle.description = req.body.description;
        const updatedVehicle = await vehicle.save();
        res.send({ message: 'Vehicle Updated Successfully', vehicle: updatedVehicle })
    } else {
        res.status(404).send({ message: 'Vehicle Not Found' })
    }
}))

vehicleRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const vehicle = await Vehicle.findById(req.params.id);
    if (vehicle) {
        const deleteVehicle = await vehicle.remove();
        res.send({ message: 'Vehicle Deleted', vehicle: deleteVehicle })
    } else {
        res.status(404).send({ message: 'Vehicle Not Found' })
    }
}))

export default vehicleRouter;