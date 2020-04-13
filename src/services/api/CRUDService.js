import ApiService from "./ApiService";

export default class CRUDService extends ApiService {
    resourceName = null;

    get = (id) => {
        return this.requestWithAuth(`/${this.resourceName}/${id}`);
    };

    getAll = () => {
        return this.requestWithAuth(`/${this.resourceName}`);
    };

    create = (data) => {
        return this.requestWithAuth(`/${this.resourceName}`, data, 'POST');
    };

    update = (data) => {
        return this.requestWithAuth(`/${this.resourceName}/${data.id}`, data, 'PUT');
    };

    delete = (id) => {
        return this.requestWithAuth(`/${this.resourceName}/${id}`, null, 'DELETE');
    };
}