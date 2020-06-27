
import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Products from './componnets/Products';
import Cart from './componnets/Cart';
import Layout from './componnets/Layout/Layout';

const Index = () => <h2>Home</h2>;

function App() {
  return (
    <Router>
        <Layout>
          <Route path="/" exact component={Index}/>
          <Route path="/products" component={Products}/>
          <Route path="/cart" component={Cart}/>
      </ Layout>
    </Router>
  );
}

export default App;
