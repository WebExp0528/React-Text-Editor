import CRUDService from './CRUDService';

export default class UserService extends CRUDService {
    resourceName = 'users';

    updatePassword = (data) => {
        return this.requestWithAuth(`/${this.resourceName}/${data.id}/update-password`, data, 'PUT');
    };
}