import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';

export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [day, setDay] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(detailsProduct(productId))
    }, [dispatch, productId]);
    const addToBookingsHandler = () => {
        props.history.push(`/bookings/${productId}?day=${day}`);
    }
    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div>
                    <Link to="/">Back to Results</Link>
                    <div className="row top">
                        <div className="col-2">
                            <img className="large" src={product.image} alt={product.name}></img>
                        </div>
                        <div className="col-1">
                            <ul>
                                <li>
                                    <h1>{product.name}</h1>
                                </li>
                                <li>
                                    <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                                </li>
                                <li>
                                    Price: Rs {product.price} per day
                                </li>
                                <li>
                                    Description:
                                    <p>{product.description}</p>
                                </li>

                            </ul>
                        </div>
                        <div className="col-1">
                            <div className="card card-body">
                                <ul>
                                    <li>
                                        <div className="row">
                                            <div>Price</div>
                                            <div className="price"> Rs {product.price}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Status:</div>
                                            <div> {product.countInStock > 0 ? (
                                                <span className="Success"> Available</span>
                                            ) : (
                                                <span className="danger"> Unavailable</span>
                                            )}
                                            </div>
                                        </div>
                                    </li>
                                    {
                                        product.countInStock > 0 && (
                                            <>
                                                <li>
                                                    <div className='row'>
                                                        <div>Number of Days</div>
                                                        <div>
                                                            <select value={day} onChange={e => setDay(e.target.value)}>
                                                                {
                                                                    [...Array(15).keys()].map(x => (
                                                                        <option key={x + 1} value={x + 1}>{x + 1} </option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>

                                                </li>
                                                <li>
                                                    <button onClick={addToBookingsHandler} className="primary block">Add to Bookings</button>
                                                </li>
                                            </>
                                        )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}