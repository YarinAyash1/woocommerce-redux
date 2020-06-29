import React from 'react'
import NavMenu from './NavMenu'
import MiniCart from '../MiniCart'
import './Header.scss'
const Header  = () => {
    return(
        <div className="header">
            <NavMenu />
            <MiniCart />
        </div>
    )
}
export default Header;