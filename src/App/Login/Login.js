import React from 'react';
import './Login.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Log from '../../models/Login';
import userService from '../../services/user.service';
import cookie from 'react-cookies';
import {connect} from 'react-redux';
import {Logged} from '../redux/actions';



class Login extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            submitting: false
        };
    }

    send(values){
        this.setState({submitting: true});
        userService
        .login(values.email, values.password)
        .then(response => response.json())
        .then(response => {
            if (response.token){
                const twoWeeksTime = 60 * 60 * 24 * 14;
                cookie.save('user', response.token, {path:'/', maxAge: twoWeeksTime});
                this.setState({submitting: false});
                this.props.Logged();
                this.props.history.push('/');
            }
            else
            {
                alert("email or password are not correct");
                this.setState({submitting: false});
            }      
            })};

    render(){
        return (
            <div className="login">
<div className="login-container">
			<div className="login-inner">
				<Formik initialValues={{ email: '',password:''}}
                validationSchema={Log}
                onSubmit={this.send.bind(this)}>
                    <Form>
					<h3 className="login-title">Login</h3>

					<div className="form-wrapper">
						<label>Email</label>
                        <Field type="text" className="form-control" name="email" required />
					</div>
                    <ErrorMessage className="alert alert-success" name="email" component="div" />
					<div className="form-wrapper">
						<label>Password</label>
                        <Field type="password" className="form-control" name="password" required />
					</div>
                    <ErrorMessage className="alert alert-success" name="password" component="div" />
					<button type="submit" disabled={this.state.submitting} className="login-btn">Sign me in</button>
                    </Form>
                </Formik>
			</div>
		</div>
            </div>
        )
    }
}



export default connect(null, {
    Logged
})(Login);