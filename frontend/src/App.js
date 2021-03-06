import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import BookedScreen from './screens/BookedScreen';
import BookingHistoryScreen from './screens/BookingHistoryScreen';
import BookingListScreen from './screens/BookingListScreen';
import BookingsScreen from './screens/BookingsScreen';
import BookVehicleScreen from './screens/BookVehicleScreen';
import CompleteBookingScreen from './screens/CompleteBookingScreen';
import HomeScreen from './screens/HomeScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import SigninScreen from './screens/SigninScreen';
import UserListScreen from './screens/UserListScreen';
import VehicleEditScreen from './screens/VehicleEditScreen';
import VehicleListScreen from './screens/VehicleListScreen';
import VehicleScreen from './screens/VehicleScreen';

function App() {

  const booking = useSelector(state => state.booking);
  const { bookingItems } = booking;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  }
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">CarRentals</Link>
          </div>
          <div>
            <Link to="/bookings">Bookings
              {bookingItems.length > 0 && (
                <span className="badge">{bookingItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/bookingHistory">Ex Bookings</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">Admin <i className="fa fa-caret-down"></i></Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/vehiclelist">Vehicle List</Link>
                  </li>
                  <li>
                    <Link to="/bookinglist">Booking List</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main>
          <Route path="/bookings/:id?" component={BookingsScreen}></Route>
          <Route path="/vehicle/:id" component={VehicleScreen} exact></Route>
          <Route path="/vehicle/:id/edit" component={VehicleEditScreen} exact></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/confirmedBooking" component={CompleteBookingScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/bookvehicle" component={BookVehicleScreen}></Route>
          <Route path="/booked/:id" component={BookedScreen}></Route>
          <Route path="/bookingHistory" component={BookingHistoryScreen}></Route>
          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
          <AdminRoute path="/vehiclelist" component={VehicleListScreen}></AdminRoute>
          <AdminRoute path="/bookinglist" component={BookingListScreen}></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">
          All rights reserved :)
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
