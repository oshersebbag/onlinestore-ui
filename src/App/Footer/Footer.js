import React from 'react';
import './Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare,faTwitterSquare, faWhatsappSquare,faSnapchatSquare } from '@fortawesome/free-brands-svg-icons';


class Footer extends React.Component {
    render(){
        return (
            <div className="footer-container">
            Copyright © 2019 mystore LTD. All rights reserved | 
            <FontAwesomeIcon className="socialIcon" icon={faFacebookSquare}/>
            <FontAwesomeIcon className="socialIcon" icon={faTwitterSquare}/>
            <FontAwesomeIcon className="socialIcon" icon={faWhatsappSquare}/>
            <FontAwesomeIcon className="socialIcon" icon={faSnapchatSquare}/>
            </div>
        )
    }
}

export default Footer;