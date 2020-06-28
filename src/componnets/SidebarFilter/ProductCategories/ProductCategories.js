import React, { useState, useEffect } from "react";
import { getCategories } from '../../../api/woocommerce'

import Notification from "../../Notifications/Notification";

function ProductCategories(props){

    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [queryCat, setQueryCategory] = useState(0)
    useEffect(() => {
        const fetchCategories = async (page, per_page) => {
            let res = await getCategories(page, per_page);
            setCategories(res.data);
            setTimeout(() => {
              setLoading(false);
            }, 1000);
        };

        fetchCategories(1, 12);
    }, []);

    const handleClick = (category) => {
      setQueryCategory(category)
    }

    return(
        <ul>
            {
              !loading ? 
              categories.length ? 
                  categories.map((category) => {
                          return <li key={category.id}><a onClick={() => handleClick(category.id)}>{category.name}</a></li>
                      })
                  : <Notification type='alert' msg='categories Not Found' />

                : 'Loading'
            }
        </ul>
    )
}

  
  export default ProductCategories