import React from 'react';
import './Header.scss';
import  { Link}  from "react-router-dom";
import CartButton from './CartButton/CartButton';
import cookie from 'react-cookies';
import {connect} from 'react-redux';
import {LogOut} from '../redux/actions';
import CategoryService from '../../services/category.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';



class Header extends React.Component {


    constructor(props){
        super(props);
        this.state= {
            categories: []
        }
    }
    
    logout(){
        cookie.remove('user');
        this.props.LogOut();
    }



    componentDidMount(){
        CategoryService
        .getAll()
        .then(res => res.json())
        .then(categories => {
            this.setState({categories});
        });
    }
    
    render(){
        return (
            <div className="my-header">
                <div className="header-container">
                    <div className="header-left">                
                    <Link to="/"><img src="/images/Logo-Mystore-01-white.png" alt="logo" height="40px" /></Link>
                    </div>

                    
                    <ul className="header-right">

                        <li className="header-link-container header-categories "> <h2 className="header-categories-title">categories <FontAwesomeIcon icon={faAngleDown}/> </h2> 
                        <ul className="drop-down-menu">
                        {this.state.categories.map((category, index) => {
                                 return <li  key={index}><Link className="drop-down-link "  to={`/category/${category.id}`}>
                                 {category.name}</ Link></li>})}
                    </ul>
                    </li>

                         {this.props.loggedIn ? <li className="header-link-container">  <Link className="header-link" to="/admin">Admin</Link></li>   :""}
                        <li className="header-link-container"> {this.props.loggedIn ? <Link className="header-link" to="/profile">profile</Link>: <Link className="header-link" to="/register">register</Link>}</li>
                        <li className="header-link-container"> {this.props.loggedIn ? <Link className="header-link" to="/" onClick={this.logout.bind(this)}>logout</Link> : <Link className="header-link" to="/login">login</Link>}</li>  
                        <li className="header-link-container"><Link className="header-link" to="/cart">  cart <CartButton/></Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn
    }
};
export default connect(mapStateToProps, {LogOut})(Header);
