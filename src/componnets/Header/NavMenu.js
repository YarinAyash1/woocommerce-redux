import React from 'react'
import { Link } from 'react-router-dom'
//import './loader.scss'
const NavMenu  = () => {
    return(
        <nav>
            <Link to="/" >Home</Link>
            <Link to="/products" >Products</Link>
            <Link to="/cart" >Cart</Link>
            <Link to="/wishlist" >Wishlist</Link>
        </nav>
    )
}
export default NavMenu;