import React from 'react';
import "./Users.scss";
import UserService from "../../../services/user.service";


class Users extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount(){
        this.load();
    }

    load(){
        UserService
        .getAll()
        .then( res => res.json())
        .then(users => {
            this.setState({users});            
        }
            );
    }

    adminToggle(user, id){
        user.isAdmin = !user.isAdmin;
        UserService
        .update(user,id)
        .then(() => this.load());

    }

    


    render(){
        return (
            <div>
                <h2 className="admin-title"> users </h2>
                <table className="table table-hover admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>email</th>
                            <th>Admin</th>
                            <th>options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((user, index) => {
                            return <tr key={index} >
                                <td>{user._id.substring(user._id.length -6)}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin? "yes" : "no"}</td>
                                <td>
                               {user.isMaster ? "":<button className="btn btn-danger make-admin-btn" onClick={this.adminToggle.bind(this,user,user._id)}>{user.isAdmin? "remove admin" : "make admin"}</button> }
                                </td>

                            </tr>
                        })}

                    </tbody>
                </table>
            </div>
        )
    }
}

export default Users;