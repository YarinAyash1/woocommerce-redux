import React from 'react'
import NavMenu from './NavMenu'
import MiniCart from '../MiniCart'
import { Link } from 'react-router-dom'
import './Header.scss'
const Header  = () => {
    return(
        <div className="header">
            <NavMenu />
            <Link to="/wishlist" >Wishlist</Link>
            <MiniCart />
        </div>
    )
}
export default Header;