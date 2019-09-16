import Network from './network.service';

class CategoryServices extends Network {
    getAll(){
        return this.send('GET', '/category');

    }
}
export default new CategoryServices();