import React, { useState, useEffect } from "react";
import { getCategories } from '../../../api/woocommerce'
import Loader from '../../Loader/loader'
import { useQuery, queryCache } from "react-query";
import Notification from "../../Notifications/Notification";

function ProductCategories(props){

    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [queryCat, setQueryCategory] = useState(0)

    const { status, data, error, isFetching } = useQuery("categories", async () => {
      const { data } = await getCategories(1, 12);
      return data;
    });

    const handleClick = (category) => {
      setQueryCategory(category)
    }

    return(
      <div className="categories">
        <h3>Categories</h3>
        {status === "loading" ? (
                <Loader />
              ) : status === "error" ? (
                  <Notification type="alert" msg={error.message} />
              ) : (
              <>
        <ul>
            {
              data.map((category) => {
                return <li key={category.id}><a onClick={() => handleClick(category.id)}>{category.name}</a></li>
              })
              
            }
        </ul>
              </>
            )}
      </div>
    )
}

  
  export default ProductCategories