import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addToCart } from "../store/actions";
import { getProduct } from '../api/woocommerce'
import Loader from './Loader/loader'

import Notification from "./Notifications/Notification";

function Product(props){

    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState([])
    let { id } = props.match.params;
    useEffect(() => {
        const fetchProduct = async (productId) => {
            let res = await getProduct(productId);
            setProduct(res.data);
            setTimeout(() => {
              setLoading(false);
            }, 500);
        };

        fetchProduct(id);
        return () => {
          setProduct([]);
        }
    }, [id]);
    const handleBack = () => {
      props.history.goBack()
    }
    return(
        <div>
          <button onClick={handleBack}>Back</button>
            {
              !loading ? 
                  product ? 
                  <div>
                    {product.name}
                    {product.price}
                    <button onClick={() => props.addToCart(product)}>Add to cart</button>
                  </div>
                  : <Notification type='alert' msg='Product Not Found' />

                : <Loader />
            }

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
  )(Product);