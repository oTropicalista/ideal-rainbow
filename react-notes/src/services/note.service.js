import http from "../http-common";

class NoteDataService {
    // findAll
    getAll() {
        return http.get('/');
    }
    // findOne
    get(id) {
        return http.get('/${id}');
    }

    // create
    create(data) {
        return http.post('/', data);
    }

    // update
    update(id, data) {
        return http.put('/${id}', data);
    }

    delete(id) {
        return http.delete('/${id}');
    }

    deleteAll() {
        return http.delete('/');
    }

    findByTitle(titulo) {
        return http.get('/?titulo=${titulo}');
    }
}

export default new NoteDataService();