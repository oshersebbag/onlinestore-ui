import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import "./Register.scss";
import User from '../../models/User';
import UserService from '../../services/user.service';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            submitting: false
        };
    }

    send(values){
        this.setState({submitting: true});
        UserService
        .register(values)
        .then( () => {
            this.setState({submitting: false});
            this.props.history.push('/login/');
        });
    }
   
    render(){
        return (
            <div>
<div className="register-container">
			<div className="register-inner">
				<Formik initialValues={{firstName: '', lastName:'', email: '',password:'', rePassword:'', }}
                validationSchema={User}
                onSubmit={this.send.bind(this)}>
                    <Form>
					<h3>Sign Up</h3>
                    <hr />
                    <h2>please fill-in the form below</h2>
                    <hr />

					<div className="form-g">
						<div className="form-wrapper">
							<label>First Name</label>
							<Field type="text" className="form-control" name="firstName" />
						</div>
						<div className="form-wrapper">
							<label>Last Name</label>
							<Field type="text" className="form-control" name="lastName" />
						</div>
					</div>
                    <ErrorMessage className="alert alert-success" name="firstName" component="div" />
                    <ErrorMessage className="alert alert-success" name="lastName" component="div" />
					<div className="form-wrapper">
						<label>Email</label>
                        <Field type="text" className="form-control" name="email"  />
					</div>
                    <ErrorMessage className="alert alert-success" name="email" component="div" />
                    <div className="form-wrapper">
                    <label>Date of birth</label>
                     <Field type="date" className="form-control" name="bday"  />
                     </div>
                     <ErrorMessage className="alert alert-success" name="bday" component="div" />
					<div className="form-wrapper">
						<label>Password</label>
                        <Field type="password" className="form-control" name="password"  />
					</div>
                    <ErrorMessage className="alert alert-success" name="password" component="div" />
					<div className="form-wrapper">
						<label>Confirm Password</label>
                        <Field type="password" className="form-control" name="rePassword" />
					</div>
                    <ErrorMessage className="alert alert-success" name="rePassword" component="div" />
					<div className="checkbox">
						<label>
							<Field type="checkbox" name="consent" className="checkmark" /> I accept the Terms of Use & Privacy Policy.
						</label>
					</div>
                    <ErrorMessage className="alert alert-success" name="consent" component="div" />
					<Field type="submit" className="register-btn" disabled={this.state.submitting} value={this.state.submitting ? 'Here we go...' : "Register Now"} />
                    </Form>
                </Formik>
			</div>
		</div>
        </div>
        )
    }
}

export default Register;



