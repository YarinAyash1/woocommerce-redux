import React, {useEffect} from "react";
import { connect } from "react-redux";
import { removeFromWishlist, addToWishlist } from "../store/actions";
import Message from "./Notifications/Notification";

function Wishlist(props){

    return(
        <div>
          WISHLIST
            {
                props.wishlist.length ? 
                    props.wishlist.map((product) => {
                        return <div key={product.id}>
                            <img width="200" height="200" src={product.images[0].src}  alt="" />
                            <div>{product.id}</div>
                            <div>{product.name}</div>
                            <div>{product.price}</div>
                            <div>{product.qty}</div>
                            <button onClick={() => props.addToWishlist(product)}>+</button>
                            <button onClick={() => props.removeFromWishlist(product)}>Remove Item</button>
                        </div>
                    })
                : <Message type='alert' msg='Empty wishlist' />
            }
        </div>
    )
}


const mapStateToProps = state => {
    return {
      wishlist: state.wishlist
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      removeFromWishlist(product) {
        dispatch(removeFromWishlist(product));
      },
      addToWishlist(product) {
        dispatch(addToWishlist(product));
      }
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Wishlist);