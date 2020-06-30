import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addToCart, addToWishlist } from "../../store/actions";
import { getProducts } from '../../api/woocommerce'
import Loader from '../Loader/loader'
import Notification from "../Notifications/Notification";
import { Link } from "react-router-dom";
import SidebarFilter from '../SidebarFilter/SidebarFilter';
import { ReactQueryDevtools } from "react-query-devtools";
import { useQuery, queryCache } from "react-query";
import './products.scss'

function Products(props){


    const { status, data, error, isFetching } = useQuery("products", async () => {
      const { data } = await getProducts(1, 12);
      return data;
    });

    return(
        <div className="products">
            <SidebarFilter />
            <div className="products-list">
              {status === "loading" ? (
                <Loader />
              ) : status === "error" ? (
                  <Notification type="alert" msg={error.message} />
              ) : (
              <>
                  {data.map((product) => (
                        <div key={product.id}>
                                  <img width="200" height="200" src={product.images[0].src} alt="" />
                                  <div>{product.id}</div>
                                  <div>{product.name}</div>
                                  <div>{product.price}</div>
                                  <button onClick={() => props.addToCart(product)}>Add to cart</button>
                                  <button onClick={() => props.addToWishlist(product)}>Add to wishlist</button>
                                  <Link to={`/product/${product.id}`}>
                                    <button>View Product</button>
                                  </Link>
                              </div>
                  ))}
                <div>{isFetching ? <Notification type="message" msg="Fetching" /> : " "}</div>
              </>
            )}
          </div>
          
        </div>
    )
}


  const mapDispatchToProps = dispatch => {
    return {
      addToCart(product) {
        dispatch(addToCart(product));
      },
      addToWishlist(product){
        dispatch(addToWishlist(product));
      }
    };
  };
  
  export default connect(
    null,
    mapDispatchToProps
  )(Products);