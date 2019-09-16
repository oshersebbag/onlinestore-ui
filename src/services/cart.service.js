import Network from './network.service';
import cookie from 'react-cookies';

const CART_COOKIE_NAME = 'cart';
const CART_COOKIE_MAX_AGE = 60 * 60 * 24 * 14;


class CartServices extends Network {
    add(productId, quantity) {
        let products = this.getAll();
        if(this.isExist(productId)) {
            products.forEach(product => {
                if(product.id === productId) {
                    product.qty += quantity;
                }
            });
        } else {
            products.push({
                id: productId,
                qty: quantity
            });
        }
        saveCookie(products);
    }

    isExist(productId){
        return this.getAll().some(product => product.id === productId);
    }

    remove(productId){
        let products = this.getAll();
        products=products.filter(product => product.id !== productId);
        saveCookie(products);
    }

    clearAll(){
        saveCookie([]);
    }
    getAll(){
        return cookie.load(CART_COOKIE_NAME) || [];
    }

}

function saveCookie(data){
    cookie.save(CART_COOKIE_NAME,data, {
        maxAge: CART_COOKIE_MAX_AGE,
        path: '/'
    });
}

export default new CartServices();