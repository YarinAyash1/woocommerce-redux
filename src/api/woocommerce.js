import axios from "axios";

let defaultHeaders = {
    params: {},
    withCredentials: true,
    auth: {
        username: process.env.REACT_APP_WOO_API_CLIENT,
        password: process.env.REACT_APP_WOO_API_SECRET
    }
};
let defaultHeaders2 = {
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

const getCategories = () => {
    defaultHeaders.params = {

    };

    return axios.get(`${process.env.REACT_APP_WOO_API_ENDPOINT}/wp-json/wc/v3/products/categories`, defaultHeaders);
};

const getAttributes = async () => {
    defaultHeaders.params = {};
    let response = await axios.get(`${process.env.REACT_APP_WOO_API_ENDPOINT}/wp-json/wc/v3/products/attributes`, defaultHeaders);

    let generatedResponse = []
    await Promise.all(response.data.map(async (attr) => {
      try {
        // here candidate data is inserted into  
        let insertResponse = await axios.get(`${process.env.REACT_APP_WOO_API_ENDPOINT}/wp-json/wc/v3/products/attributes/${attr.id}/terms`, defaultHeaders2);  
        // and response need to be added into final response array 

        insertResponse.data['label'] = attr.name;
        generatedResponse.push(insertResponse.data)
      } catch (error) {
        console.log('error'+ error);
      }
    }))
    console.log('complete all') // gets loged first
    console.log(generatedResponse)
    return generatedResponse // return without waiting for process of 

};


const getProduct = (productId) => {

    return axios.get(`${process.env.REACT_APP_WOO_API_ENDPOINT}/wp-json/wc/v3/products/${productId}`, defaultHeaders)
};


export { getProducts, getProduct, getCategories, getAttributes };
