import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addToCart } from "../store/actions";
import { getProducts } from '../api/woocommerce'
import Loader from './Loader/loader'
import Cart from "./Cart";
import Notification from "./Notifications/Notification";

function Products(props){

    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchProducts = async (page, per_page) => {
            let res = await getProducts(page, per_page);
            setProducts(res.data);
            setTimeout(() => {
              setLoading(false);
            }, 1000);
        };

        fetchProducts(1, 12);
    }, []);

    return(
        <div>
            {
              !loading ? 
                  products.length ? 
                      products.map((product) => {
                          return <div key={product.id}>
                              <img width="200" height="200" src={product.images[0].src} alt="" />
                              <div>{product.id}</div>
                              <div>{product.name}</div>
                              <div>{product.price}</div>
                              <button onClick={() => props.addToCart(product)}>Add to cart</button>
                          </div>
                      })
                  : <Notification type='alert' msg='Products Not Found' />

                : <Loader />
            }
            <Cart />
        </div>
    )
}


  const mapDispatchToProps = dispatch => {
    return {
      addToCart(product) {
        dispatch(addToCart(product));
      }
    };
  };
  
  export default connect(
    null,
    mapDispatchToProps
  )(Products);