import React from 'react';
import './Homepage.scss';
import Categories from './Categories/Categories';

class Homepage extends React.Component {
    render(){
        return (
            <div className="home">
                <Categories />
            
            </div>
        )
    }
}

export default Homepage;