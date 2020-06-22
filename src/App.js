
import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Products from './componnets/Products';
import Cart from './componnets/Cart';

const Index = () => <h2>Home</h2>;

function App() {
  return (
      <Fragment>
        <Router>
          <Route path="/" exact component={Index}/>
          <Route path="/products" component={Products}/>
          <Route path="/cart" exact component={Cart}/>
        </Router>

      </Fragment>
  );
}

export default App;
