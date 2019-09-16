import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from './Register/Register';
import Header from './Header/Header';
import Login from './Login/Login';
import Homepage from './Homepage/Homepage';
import Profile from './Profile/Profile';
import Footer from './Footer/Footer';
import EditProfile from './Profile/EditProfile/EditProfile';
import Category from './Category/Category';
import Product from './Category/Product/Product';
import Cart from './Cart/Cart';

function App() {
  return (
    <Router>

    <div className="App">
      <Header/>
      <Route path ="/" exact component={Homepage} />
      <Route path ="/register"  component={Register} />
      <Route path ="/login"  component={Login} />
      <Route path = "/profile" component={Profile} />
      <Route path = "/edit" component={EditProfile} />
      <Route path = "/category/:id" exact component={Category} />
      <Route path = "/category/:categoryId/product/:productId" component={Product} />
      <Route path = "/cart" component={Cart} />
      <Footer />
    </div>
    </Router>

  );
}

export default App;
