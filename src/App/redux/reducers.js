import CartService from "../../services/cart.service";
import UserService from "../../services/user.service"
import { ADD_TO_CART, LOGGED_IN, LOG_OUT, REMOVE_FROM_CART } from './actions';

const initialState = {
    cartItemsCount: CartService.getAll().length,
    loggedIn: UserService.isLogged()
};
function reducers(state = initialState, action){
    switch(action.type){
        case ADD_TO_CART: 
            CartService.add(action.productId, 1);
            return {
                cartItemsCount: CartService.getAll().length,
                loggedIn: UserService.isLogged()
            };
        case LOGGED_IN: 
            return {
                loggedIn: true,
                cartItemsCount: CartService.getAll().length

            };

        case LOG_OUT: 
            return {
                loggedIn: false,
                cartItemsCount: CartService.getAll().length

            };
        case REMOVE_FROM_CART: 
             CartService.remove(action.productId);
            return {
                loggedIn: UserService.isLogged(),
                cartItemsCount: CartService.getAll().length

            };

        default: 
            return state;
    }
}

export default reducers;