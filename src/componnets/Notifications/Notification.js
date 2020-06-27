import React from 'react';
import './notifications.scss'
const Notification = (props) => {
    let { msg, type } = props;

    return (
        <div className={`notification-${type}`}>
            { msg }
        </div>
    )
}

export default Notification;