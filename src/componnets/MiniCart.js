import React, {useEffect} from "react";
import { connect } from "react-redux";
import { removeFromCart, removeProductItem, addToCart } from "../store/actions";
import Message from "./Notifications/Notification";

function MiniCart(props){
    useEffect(() => {
        const total = props.cart.reduce(
            (prev, curr) => prev + curr.qty * curr.price,
            0
          );
          console.log(total);
    }, [props.cart]);

    return(
        <div className="mini-cart">
            {
                props.cart.length ? 
                    props.cart.map((product) => {
                        return <div key={product.id}>
                            <img width="75" height="75" src={product.images[0].src}  alt="" />
                            <div>{product.name}</div>
                            <div>{product.price}</div>
                            <div>{product.qty}</div>
                            <button onClick={() => props.addToCart(product)}>+</button>
                            <button onClick={() => props.removeProductItem(product)}>-</button>
                            <button onClick={() => props.removeFromCart(product)}>Remove Item</button>
                        </div>
                    })
                : <Message type='alert' msg='Empty Cart' />
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