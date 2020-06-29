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
        <div className="attributes">
            <div>
                {
                !loading ? 
                attributes.length ? 
                    attributes.map((terms) => {
                        return <div>
                            <h3>{terms.label}</h3>
                            <ul>
                            {
                                terms.map((term) => {
                                    return <li>{term.name}</li>
                                })
                            }
                            </ul>
                        </div>
                    })
                    : <Notification type='alert' msg='Attrs Not Found' />

                    : 'Loading'
                }
            </div>
        </div>
    )
}

  
  export default Attributes