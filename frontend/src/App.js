import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import FavouritesScreen from './screens/FavouritesScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <a className="brand" href="/">CarRentals</a>
          </div>
          <div>
            <a href="/Favourites">Favourites</a>
            <a href="/signin">Sign In</a>
          </div>
        </header>
        <main>
          <Route path="/favourites/:id?" component={FavouritesScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
        </main>
        <footer className="row center">
          All rights reserved
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
