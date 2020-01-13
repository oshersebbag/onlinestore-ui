import React from 'react';
import "./EditProfile.scss";
import UserService from '../../../services/user.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faBirthdayCake,faUnlock, faUserEdit, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import User from '../../../models/User';
import  { Link }  from "react-router-dom";



class EditProfile extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            profile: {},
        }
    }
    componentDidMount(){
        UserService
        .me()
        .then(response => response.json())
        .then(user => {
            this.setState({profile: user});

                });
    }

    send(values){
        UserService
        .update(values, this.state.profile._id)
        .then( () => {
            this.props.history.push('/');
        });
    }


    formatBday(){
        if(!this.state.profile.bday){
            return "";
        }
        let myBday = new Date(this.state.profile.bday);

        let day=myBday.getDate(),month=myBday.getMonth()+1, year=myBday.getFullYear();

        let myDateString = year+"-"+month+"-"+day;

        if (day<10){
            myDateString = year+"-"+month+"-0"+day;
        }
        if(month<10){
            myDateString= year+"-0"+month+"-"+day;
        }
        if(month<10 && day<10){
            myDateString= year+"-0"+month+"-0"+day;
        }
        return myDateString;
    }




    render(){
        return (
            <Formik initialValues={{
                firstName: this.state.profile.firstName,
                lastName: this.state.profile.lastName, 
                email: this.state.profile.email,
                bday: this.formatBday(),
                password:this.state.profile.password, 
                rePassword:this.state.profile.password }}
            validationSchema={User}
            onSubmit={this.send.bind(this)}
            enableReinitialize
            >
            <Form>
            <div className="EditProfile">
                <div className="EditProfile-container">


                    <div className="EditProfile-title">
                    <h3>Edit Profile</h3>
                    </div>
                    <div className="EditProfile-sub-title">
                        <hr/>
                        <p className="mySubTitle" >please use the form bellow to update your profile info.</p>
                        <hr/>
                        </div>

                    <div className="EditProfile-tab">
                                <div className="myIcon"> <FontAwesomeIcon className="icon" icon={faUser}/> Name </div>
                                <div className="myInfo"> 
                                <div className="myName"> 
                                <Field type="text" className="myNameField" name="firstName" />
                                <Field type="text" className="myNameField" name="lastName" />
                                </div>
                                </div>
                    </div>
                    <ErrorMessage className="alert alert-success" name="firstName" component="div" />
                    <ErrorMessage className="alert alert-success" name="lastName" component="div" />
                    <div className="EditProfile-tab">
                                <div className="myIcon"> <FontAwesomeIcon className="icon" icon={faEnvelope}/> Email </div>
                                <div className="myInfo">
                                <Field type="text" className="myField" name="email" disabled  />
                                </div>
                    </div>
                    <ErrorMessage className="alert alert-success" name="email" component="div" />
                    <div className="EditProfile-tab">
                                <div className="myIcon"> <FontAwesomeIcon className="icon" icon={faBirthdayCake}/> Date of Birth </div>
                                <div className="myInfo">
                                <Field type="date" className="myField" name="bday"  />
                                </div>
                    </div>
                    <ErrorMessage className="alert alert-success" name="bday" component="div" />
                    <div className="EditProfile-tab">
                               <div className="myIcon"> <FontAwesomeIcon className="icon" icon={faUnlock}/>  Password </div>
                               <div className="myInfo">
                               <Field type="password" className="myField" name="password"  /> 
                               </div>
                    </div>
                    <ErrorMessage className="alert alert-success" name="password" component="div" />
                    <div className="EditProfile-tab">
                               <div className="myIcon"> <FontAwesomeIcon className="icon" icon={faUnlock}/>  Confirm Password </div>
                               <div className="myInfo">
                               <Field type="password" className="myField" name="rePassword"  /> 
                               </div>
                    </div>
                    <ErrorMessage className="alert alert-success" name="rePassword" component="div" />
                    <div className="links">
                    <Link className="takeMeBack" to="/profile"><FontAwesomeIcon icon={faArrowCircleLeft}/> take me back!</Link>
                    <button type="submit" className="EditProfile-btn">Update Now</button>
                    </div>
                </div>
                <FontAwesomeIcon className="EditBigIcon" icon={faUserEdit}/>

            </div>

            </ Form >
         </ Formik>
        )
    }
}

export default EditProfile;