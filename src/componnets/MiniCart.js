import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { removeFromCart, removeProductItem, addToCart } from "../store/actions";
import Message from "./Notifications/Notification";

function MiniCart(props){
  const [total, setTotal] = useState(0)
  const [showCart, toggleCart] = useState(false)
    useEffect(() => {
      const calcPrice = props.cart.reduce(
          (prev, curr) => prev + curr.qty * curr.price,
          0
      );
      setTotal(calcPrice)
    }, [props.cart]);

    return(
        <div className="minicart">
          <div onClick={() => toggleCart(!showCart)}>Cart 
            <span className="minicart-count">
              ({props.cart.length})
            </span>
          </div>
          {
            showCart ? 
            <div className="minicart-items">
              {
                  props.cart.length ? 
                      props.cart.map((product) => {
                          return <div className="item" key={product.id}>
                              <div className="item-image">
                                <img width="75" height="75" src={product.images[0].src}  alt="" />
                              </div>
                              <div className="item-info">
                                <div className="item-meta">
                                  <div>{product.name}</div>
                                  <div>{product.price}</div>
                                  <div>{product.qty}</div>
                                </div>
                                <div className="item-actions">
                                  <div className="item-plus-minus">
                                    <button className="plus" onClick={() => props.addToCart(product)}>+</button>
                                    <button className="minus" onClick={() => props.removeProductItem(product)}>-</button>
                                  </div>
                                  <button className="remove" onClick={() => props.removeFromCart(product)}>X</button>
                                </div>
                              </div>
                          </div>
                      })
                  : <Message type='alert' msg='Empty Mini-Cart' />
              }
              <div>{total}</div>
            </div>
            : '' 
          }
        </div>

    )
}


const mapStateToProps = state => {
    return {
      cart: state.cart
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      removeFromCart(product) {
        dispatch(removeFromCart(product));
      },
      removeProductItem(product) {
        dispatch(removeProductItem(product));
      },
      addToCart(product) {
        dispatch(addToCart(product));
      }
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(MiniCart);