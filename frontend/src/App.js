import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import PrivateRoute from './components/PrivateRoute';
import BookedScreen from './screens/BookedScreen';
import BookingHistoryScreen from './screens/BookingHistoryScreen';
import BookingsScreen from './screens/BookingsScreen';
import BookVehicleScreen from './screens/BookVehicleScreen';
import CompleteBookingScreen from './screens/CompleteBookingScreen';
import HomeScreen from './screens/HomeScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import SigninScreen from './screens/SigninScreen';
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
          </div>
        </header>
        <main>
          <Route path="/bookings/:id?" component={BookingsScreen}></Route>
          <Route path="/vehicle/:id" component={VehicleScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/confirmedBooking" component={CompleteBookingScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/bookvehicle" component={BookVehicleScreen}></Route>
          <Route path="/booked/:id" component={BookedScreen}></Route>
          <Route path="/bookingHistory" component={BookingHistoryScreen}></Route>
          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
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
