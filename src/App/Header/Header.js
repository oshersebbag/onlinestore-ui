import React from 'react';
import './Header.scss';
import  { Link }  from "react-router-dom";
import CartButton from './CartButton/CartButton';

class Header extends React.Component {
    render(){
        return (
            <div>
                <div className="header-container">
                    <img src="/images/Logo-Mystore-01.png" alt="logo" height="50px" />
                    <nav className="menu">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/register">Sign Up</Link></li>
                            <li><Link to="/login">Sign In</Link></li>
                            <li><Link to="/profile">profile</Link></li>
                            <li><Link to="/cart">  cart <CartButton/> </Link></li>
                        </ul>
                    </nav>

                </div>

            </div>
        )
    }
}

export default Header;