import React, { useState, useEffect } from "react";
import { getAttributes } from '../../../api/woocommerce'
import Loader from '../../Loader/loader'
import { useQuery, queryCache } from "react-query";
import Notification from "../../Notifications/Notification";
function Attributes(props){
    const [queryAttr, setAttr] = useState(0)
    const { status, data, error, isFetching } = useQuery("attributes", async () => {
        const data = await getAttributes();
        return data;
      });

    const handleClick = (attr) => {
        setAttr(attr)
    }

    return(
        <div className="attributes">
            <div>
            {status === "loading" ? (
                <Loader />
              ) : status === "error" ? (
                  <Notification type="alert" msg={error.message} />
              ) : (
              <>
              {

                  data.map((terms) => {
                      return <div>
                            <h3>{terms.label}</h3>
                            <ul>
                            {
                                terms.map((term) => {
                                    return <li onClick={() => handleClick(term.id)}>{term.name}</li>
                                })
                            }
                            </ul>
                        </div>
                    })
                }
              </>
            )}
            </div>
        </div>
    )
}

  
  export default Attributes