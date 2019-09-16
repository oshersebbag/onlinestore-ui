import React from 'react';
import "./Profile.scss";
import UserService from '../../services/user.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash,faUser, faEnvelope, faBirthdayCake,faUnlock, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import  { Link }  from "react-router-dom";


class Profile extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            profile: {},
            hidden: true
        }
    }
    componentDidMount(){
        UserService
        .me()
        .then(response => response.json())
        .then(user => {
            this.setState({profile: user})
                });
    }

    toggleShow() {
        this.setState({ hidden: !this.state.hidden });
      }


    formatPassword() {
        if (!this.state.profile.password) {
            return '';
        }
        if (!this.state.hidden) {
            return this.state.profile.password;
        }
        else {
        let arr=this.state.profile.password.split('');
        arr.fill('*').join("");
        return  arr; 
    }
          }

          formatBday(){
              let myBday = new Date(this.state.profile.bday);
              let day=myBday.getDate(),month=myBday.getMonth(), year=myBday.getFullYear();
              return ""+day+"/"+month+"/"+year;
          }
    
    
    render(){
        
        return (


            <div className="profile">
                <div className="profile-container">

                    <div className="profile-title">
                    <h3>My Profile</h3>
                    </div>
                    <div className="profile-sub-title">
                        <hr/>
                        <p className="mySubTitle" >welcome to your profile page! the place where you can review and edit all your info!</p>
                        <hr/>
                        </div>

                    <div className="profile-tab">
                                <div className="myIcon"> <FontAwesomeIcon className="icon" icon={faUser}/> Name </div>
                                <div className="myInfo"> {this.state.profile.firstName} {this.state.profile.lastName}</div>
                    </div>
                    <div className="profile-tab">
                                <div className="myIcon"> <FontAwesomeIcon className="icon" icon={faEnvelope}/> Email </div>
                                <div className="myInfo"> {this.state.profile.email} </div>
                    </div>
                    <div className="profile-tab">
                                <div className="myIcon"> <FontAwesomeIcon className="icon" icon={faBirthdayCake}/> Date of Birth </div>
                                <div className="myInfo">    {this.formatBday()} </div>
                    </div>
                    <div className="profile-tab">
                               <div className="myIcon"> <FontAwesomeIcon className="icon" icon={faUnlock}/>  Password </div>
                               <div className="myInfo myInfoPass">
                               <button className="view-btn" onClick={this.toggleShow.bind(this)}>
                               {this.state.hidden ? <FontAwesomeIcon className="passHide" icon={faEyeSlash}/> : <FontAwesomeIcon className="passHide" icon={faEye}/>}
                               </button>
                               <p className="myPass">{this.formatPassword()}</p>
                              
                                </div>
                    </div>
                    <Link className="editLink" to="/edit">edit</Link>
                </div>

                <FontAwesomeIcon className="bgPage" icon={faUserCircle}/>

            </div>
        )
    }
}

export default Profile;