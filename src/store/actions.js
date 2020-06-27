const addToCart = (product) => {

    var productObject = {
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        images: product.images,
    };


    return {
        type: 'ADD_TO_CART',
        product: productObject
    }
};

const addToWishlist = (product) => {

    var productObject = {
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        images: product.images,
    };


    return {
        type: 'ADD_TO_WISHLIST',
        product: productObject
    }
};

const removeFromCart = (product) => {
    return {
        type: 'REMOVE_FROM_CART',
        product
    }
};
const removeFromWishlist = (product) => {
    return {
        type: 'REMOVE_FROM_WISHLIST',
        product
    }
};

const removeProductItem = (product) => {
    return {
        type: 'REMOVE_PRODUCT_ITEM',
        product
    }
};

const loadCart = () => {
    return {
        type: 'LOAD_CART',
    }
};

const loadWishlist = () => {
    return {
        type: 'LOAD_WISHLIST',
    }
};

export { addToCart, removeFromCart, removeProductItem, loadCart, addToWishlist, removeFromWishlist, loadWishlist };
