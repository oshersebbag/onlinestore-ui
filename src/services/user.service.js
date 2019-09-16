import Network from './network.service';

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
}

export default new UserServices();