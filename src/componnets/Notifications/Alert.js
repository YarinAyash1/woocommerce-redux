import React from 'react';
import './notifications.scss'
const Alert = (props) => {
    let { msg } = props;

    return (
        <div className="notification-alert">
            { msg }
        </div>
    )
}

export default Alert;