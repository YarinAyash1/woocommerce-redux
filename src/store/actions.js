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

const removeFromCart = (product) => {
    return {
        type: 'REMOVE_FROM_CART',
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

export { addToCart, removeFromCart, removeProductItem, loadCart };
