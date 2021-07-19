import React from 'react'
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Vehicle(props) {
    const { vehicle } = props;
    return (
        <div key={vehicle._id} className="card">
            <Link to={`/vehicle/${vehicle._id}`}>
                <img className="medium" src={vehicle.image} alt={vehicle.name} />
            </Link>
            <div className="card-body">
                <Link to={`/vehicle/${vehicle._id}`}>
                    <h2>{vehicle.name}</h2>
                </Link>
                <Rating rating={vehicle.rating} numReviews={vehicle.numReviews}></Rating>
                <div
                    className="price">Rs {vehicle.price} per day
                </div>
            </div>
        </div>
    )
}