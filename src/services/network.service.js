import cookie from 'react-cookies';
import config from '../App/environment/index'
const baseUrl = config.url + config.api;

export default class Network {
    getHeaders(myHeaders) {
        let headers = {};
        if(this.getToken()){
            headers.Authorization = this.getToken();
        }
        for(let prop in myHeaders){
            headers[prop] = myHeaders[prop];
        }
        return headers;
    
    }

    getToken(){
        return cookie.load('user');
    }

    send(method, url, data, headers){
        return fetch(baseUrl+url, {
            method: method,
            body: JSON.stringify(data),
            headers: this.getHeaders({'content-Type' : 'application/json'})
        });
    }

    sendMultipart(method, url, data){
        return fetch(baseUrl+url, {
            method: method,
            body: data,
            headers: this.getHeaders()
        });
    }
}


//* https://infinite-ravine-20799.herokuapp.com/api