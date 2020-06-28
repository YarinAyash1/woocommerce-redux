import React, { useState, useEffect } from "react";
import { getAttributes } from '../../../api/woocommerce'
import Notification from "../../Notifications/Notification";
function Attributes(props){

    const [loading, setLoading] = useState(true)
    const [attributes, setAttributes] = useState([])
    const [queryAttr, setAttr] = useState(0)
    useEffect(() => {
        const fetchAttributes = async () => {
            let res = await getAttributes();
            setAttributes(res);

            setTimeout(() => {
                setLoading(false);
            }, 1000);
        };

        fetchAttributes(1, 12);
    }, []);

    const handleClick = (attr) => {
        setAttr(attr)
    }

    return(
        <ul>
            {
              !loading ? 
              attributes.length ? 
                attributes.map((list) => {
                    let attrs= list.map((attribute, index) => {
                        return <li key={attribute.id}><a onClick={() => handleClick(attribute.id)}>{attribute.name}</a></li>
                    })
                    return attrs
                })
                  : <Notification type='alert' msg='Attrs Not Found' />

                : 'Loading'
            }
        </ul>
    )
}

  
  export default Attributes