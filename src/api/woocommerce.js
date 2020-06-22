import axios from "axios";

let defaultHeaders = {
    params: {},
    withCredentials: true,
    auth: {
        username: process.env.REACT_APP_WOO_API_CLIENT,
        password: process.env.REACT_APP_WOO_API_SECRET
    }
};

const getProducts = (page, per_page) => {

    defaultHeaders.params = {
        orderby: 'title',
        order: 'asc', 
        status: 'publish',
        per_page,
        page,
    };

    return axios.get(`${process.env.REACT_APP_WOO_API_ENDPOINT}/wp-json/wc/v3/products`, defaultHeaders)
};


export { getProducts };
