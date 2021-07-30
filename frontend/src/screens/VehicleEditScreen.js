import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { detailsVehicle, updateVehicle } from '../actions/vehicleActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { VEHICLE_UPDATE_RESET } from '../constants/vehicleConstants';

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

    const vehicleUpdate = useSelector(state => state.vehicleUpdate);
    const { loading: loadingUpdate, error: errorUpdate,
        success: successUpdate } = vehicleUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
        if (successUpdate) {
            props.history.push('/vehiclelist');
        }
        if (!vehicle || vehicle._id !== vehicleId || successUpdate) {
            dispatch({ type: VEHICLE_UPDATE_RESET })
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
    }, [dispatch, vehicle, vehicleId, successUpdate, props.history])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateVehicle({
            _id: vehicleId, name, price, image,
            category, manufacturer, countInStock, description
        })
        )
    }

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try {
            const { data } = await Axios.post('/api/uploads', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
            setImage(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Edit Vehicle {vehicleId}</h1>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
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
                                <label htmlFor="imageFile">Image File</label>
                                <input type="file" id="imageFile" label="Choose Image"
                                    onChange={uploadFileHandler}></input>
                                {loadingUpload && <LoadingBox></LoadingBox>}
                                {errorUpload && (<MessageBox variant="danger">{errorUpload}</MessageBox>)}
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