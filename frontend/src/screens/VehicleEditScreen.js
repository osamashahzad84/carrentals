import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsVehicle } from '../actions/vehicleActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function VehicleEditScreen(props) {
    const vehicleId = props.match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [description, setDescription] = useState('');

    const vehicleDetails = useSelector(state => state.vehicleDetails)
    const { loading, error, vehicle } = vehicleDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        if (!vehicle || (vehicle._id !== vehicleId)) {
            dispatch(detailsVehicle(vehicleId))
        } else {
            setName(vehicle.name);
            setPrice(vehicle.price);
            setImage(vehicle.image);
            setCategory(vehicle.category);
            setCountInStock(vehicle.countInStock);
            setManufacturer(vehicle.manufacturer);
            setDescription(vehicle.description);
        }
    }, [dispatch, vehicle, vehicleId])

    const submitHandler = (e) => {
        e.preventDefault();
        //TODO: dispatch update vehicle
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Edit Vehicle {vehicleId}</h1>
                </div>
                {loading ? <LoadingBox></LoadingBox>
                    :
                    error ? <MessageBox variant="danger">{error}</MessageBox>
                        :
                        <>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input id="name" type="text" placeholder="Enter name"
                                    value={name} onChange={(e) => setName(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="price">Price</label>
                                <input id="price" type="text" placeholder="Enter price"
                                    value={price} onChange={(e) => setPrice(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="image">Image</label>
                                <input id="image" type="text" placeholder="Enter image"
                                    value={image} onChange={(e) => setImage(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="category">Category</label>
                                <input id="category" type="text" placeholder="Enter category"
                                    value={category} onChange={(e) => setCategory(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="manufacturer">Manufacturer</label>
                                <input id="manufacturer" type="text" placeholder="Enter manufacturer name"
                                    value={manufacturer} onChange={(e) => setManufacturer(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="countInStock">Count In Stock</label>
                                <input id="countInStock" type="text" placeholder="Enter Count In Stock"
                                    value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <textarea id="description" rows="3" type="text" placeholder="Enter description"
                                    value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>
                            <div>
                                <label />
                                <button className="primary" type="submit">
                                    Update Vehicle
                                </button>
                            </div>
                        </>
                }
            </form>
        </div>
    )
}