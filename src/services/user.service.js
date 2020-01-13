import Network from './network.service';
import cookie from 'react-cookies';


class UserServices extends Network {
    register(user){
        return this.send('PUT', '/user', user);
    }
    me(){
        return this.send('GET','/user/me');
    }
    login(email, password){
        return this.send('POST','/user/login', {email, password});
    }
    update(user,id){
        return this.send('POST', '/user/'+id, user);
    }

    isLogged(){
        const myUser = cookie.load('user');
        if (myUser){
            return true;
        }
        else{
            return false;
        }
    }

    getAll(){
        return this.send('GET','/user');
    }

    admin(){
        return this.send('POST','/user/admin');
    }
}

export default new UserServices();