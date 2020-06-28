import React, { useState, useEffect } from "react";
//import Loader from '../Loader/loader'
import ProductCategories from './ProductCategories/ProductCategories'
import Attributes from "./Attributes/Attributes";

function SidebarFilter(props){

    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [attributes, setAttributes] = useState([])
    const [filterQuery, setFilterQuery] = useState(0)
    useEffect(() => {

    }, []);


    

    return(
        <div className="sidebar">
          <ProductCategories />
          <Attributes />
        </div>
    )
}

  
  export default SidebarFilter;