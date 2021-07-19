import React, { useEffect } from 'react';
import Vehicle from '../components/Vehicle';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector} from 'react-redux';
import {  listVehicles } from '../actions/vehicleActions';

export default function HomeScreen() {

  const dispatch = useDispatch();
  const vehicleList = useSelector((state) => state.vehicleList);
  const { loading, error, vehicles } = vehicleList;

  useEffect(() => {
    dispatch(listVehicles());
  }, [dispatch]);
  return(
      <div>
        {loading? (
        <LoadingBox></LoadingBox>
        ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
        ) : (

          <div className="row center">
            { 
              vehicles.map(vehicle => (
              <Vehicle key={vehicle._id} vehicle={vehicle}></Vehicle>
            ))}
       </div>
        )}
      </div>
    )
}