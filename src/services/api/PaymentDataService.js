import CRUDService from './CRUDService';

export default class FolderService extends CRUDService {
    resourceName = 'payment_datas';

    cancelSubscription = id => {
        return this.requestWithAuth(`/${this.resourceName}/${id}/cancel-subscription`, {}, 'POST');
    };

    changeSubscription = data => {
        return this.requestWithAuth(`/${this.resourceName}/${data.id}/change-subscription`, data, 'PUT');
    };

    createSubscription = data => {
        return this.requestWithAuth(`/${this.resourceName}/${data.id}/create-subscription`, data, 'PUT');
    };

    changeSource = data => {
        return this.requestWithAuth(`/${this.resourceName}/${data.id}/change-source`, data, 'PUT');
    };
}
