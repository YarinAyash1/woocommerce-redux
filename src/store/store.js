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



export default createStore(combineReducers({
    cart,
}), applyMiddleware(logger, thunk, updateLocalStorageCart));

