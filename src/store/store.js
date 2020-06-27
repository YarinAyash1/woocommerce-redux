import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

const cart = (state = [], action) => {

    if (action.type === 'LOAD_CART') {
        try {
            return JSON.parse(localStorage.getItem('cart')) || [];
        } catch (e) {
            localStorage.setItem('cart', JSON.stringify([]));
            return [];
        }

    } else if (action.type === 'ADD_TO_CART') {

        const { product } = action;
        let exists = false;

        const changed = state.map((p) => {
            if (p.id === product.id) {
                exists = true;
                p.qty++;
            }
            return p;
        });

        if (!exists) {
            product.qty = 1;
            return state.concat(product);
        }

        return changed;


    } else if (action.type === 'REMOVE_FROM_CART') {

        return state.filter((e) => {
            return e.id !== action.product.id;
        });
        
    } else if (action.type === 'REMOVE_PRODUCT_ITEM') {
        return state.map(e => {
            if (e.id === action.product.id && e.qty > 0) {
                e.qty--;
            }
            return e;
        });
    }

    return state;
};

const wishlist = (state = [], action) => {

    switch (action.type) {
        case 'LOAD_WISHLIST':
            try {
                return JSON.parse(localStorage.getItem('wishlist')) || [];
            } catch (e) {
                localStorage.setItem('wishlist', JSON.stringify([]));
                return [];
            }

        case 'ADD_TO_WISHLIST':
            const { product } = action;
            let exists = false;
    
            const changed = state.map((p) => {
                if (p.id === product.id) {
                    exists = true;
                    p.message = 'exists in wishlist';
                }
                return p;
            });
    
            if (!exists) {
                return state.concat(product);
            }
    
            return changed;

        case 'REMOVE_FROM_WISHLIST':
                return state.filter((e) => {
                    return e.id !== action.product.id;
                });
        default:
                return state;
    }
}

const logger = (store) => (next) => (action) => {
    console.log("dispatching", action);
    console.log("next state", store.getState());
    let result = next(action);
    return result;
};


const updateLocalStorageCart = (store) => (next) => (action) => {
    let result = next(action);

    if (action.type === 'ADD_TO_CART' ||
        action.type === 'REMOVE_FROM_CART' ||
        action.type === 'REMOVE_PRODUCT_ITEM') {

        try {
            localStorage.setItem('cart', JSON.stringify(store.getState()['cart']));
        } catch (e) {

            console.log("Error!!", e);
            localStorage.setItem('cart', JSON.stringify([]));

        }

    }
    return result;
};

const updateLocalStorageWishlist = (store) => (next) => (action) => {
    let result = next(action);

    if (action.type === 'ADD_TO_WISHLIST' ||
        action.type === 'REMOVE_FROM_WISHLIST') {

        try {
            localStorage.setItem('wishlist', JSON.stringify(store.getState()['wishlist']));
        } catch (e) {

            console.log("Error!!", e);
            localStorage.setItem('wishlist', JSON.stringify([]));

        }

    }
    return result;
};



export default createStore(combineReducers({
    cart,wishlist
}), applyMiddleware(logger, thunk, updateLocalStorageCart, updateLocalStorageWishlist));

