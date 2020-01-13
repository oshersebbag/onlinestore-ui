import Network from './network.service';

class CategoryServices extends Network {
    getAll(){
        return this.send('GET', '/category');

    }

    update(category,id){
        const data = new FormData();
        for(let prop in category){
            data.append(prop, category[prop]);
        }
        return this.sendMultipart('POST', `/category/${id}`, data);
    }

    getById(categoryId){
        return this.send('GET',`/category/${categoryId}`);
    }


    create(category){
        const data = new FormData();
        for(let prop in category){
            data.append(prop, category[prop]);
        }

        return this.sendMultipart('PUT','/category', data);
    }


    remove(id){
        return this.send('DELETE',`/category/${id}`);

    }
}
export default new CategoryServices();