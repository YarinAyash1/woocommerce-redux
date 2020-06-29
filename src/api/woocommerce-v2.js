import axios from "axios";
import OAuth  from 'oauth-1.0a'
import CryptoJS from 'crypto-js'

const oauth = OAuth({
    consumer: {
        key:  process.env.REACT_APP_WOO_API_CLIENT,
        secret: process.env.REACT_APP_WOO_API_SECRET
    },
    signature_method: 'HMAC-SHA1',
    hash_function: function(base_string, key) {
        return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(base_string, key));
    }
});

const requestData = {
    url: process.env.REACT_APP_WOO_API_ENDPOINT+ '/wp-json/wc/v3/products/',
    method: 'GET'
};
let defaultHeaders = {
    params: oauth.authorize(requestData),
    withCredentials: true,
    auth: {
        username: process.env.REACT_APP_WOO_API_CLIENT,
        password: process.env.REACT_APP_WOO_API_SECRET
    }
};

const getProducts = (page, per_page) => {
    return axios.get(requestData.url, { params: oauth.authorize(requestData) })

};
const getProduct = () => {
    let dat = {
        url: process.env.REACT_APP_WOO_API_ENDPOINT+ '/wp-json/wc/v3/products/' + 'dfdf',
        method: 'GET'
    };
    return axios.get(requestData.url, { params: oauth.authorize(dat) })
};


export { getProducts, getProduct };
