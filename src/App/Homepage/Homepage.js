import React from 'react';
import './Homepage.scss';
import Categories from './Categories/Categories';

class Homepage extends React.Component {
    render(){
        return (
            <div className="home-container">
                <div className="banners-container">
                <div className="left-banner-container">  

                    <div className="left-banner">  
                    </div>
                    </div>
                    <div className="right-banner-container">
                    <div className="right-banner">
                    </div>
                    </div>
                </div>
                <div className="home-sub-title">
                <hr/>
                <p className="mySubTitle" ><b>welcome to MyStore!</b> the place where you can buy all the stuff you really need</p>
                <hr/>
                </div>

                <Categories />
            
            </div>
        )
    }
}

export default Homepage;