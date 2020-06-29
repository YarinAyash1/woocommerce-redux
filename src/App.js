
import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Products from './componnets/Products/Products';
import Cart from './componnets/Cart';
import Layout from './componnets/Layout/Layout';
import Product from './componnets/Product';
import Wishlist from './componnets/Wishlist';
import Login from './componnets/Login/Login';

const Index = () => <h2>Home</h2>;

function App() {
  return (
    <Router>
        <Layout>
          <Route path="/" exact component={Index}/>
          <Route path="/products" component={Products}/>
          <Route path="/product/:id" component={Product}/>
          <Route path="/cart" component={Cart}/>
          <Route path="/wishlist" component={Wishlist}/>
          <Route path="/login" component={Login}/>
      </ Layout>
    </Router>
  );
}

export default App;
