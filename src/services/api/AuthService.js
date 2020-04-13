import ApiService from "./ApiService";

export default class AuthService extends ApiService {
    login = (username, password) => this.request('/login_check', {username, password}, 'POST')

    register = (data) => {
        if (localStorage.getItem('referrerCode')) {
            data['referrerCode'] = localStorage.getItem('referrerCode');
        }

        return this.request('/register', data, 'POST');
    };

    confirm = (confirmationToken) => {
        return this.request('/users/confirm', {confirmationToken}, 'POST');
    };

    resetPassword = (email) => {
        return this.request('/users/reset', {email}, 'POST');
    };

    updatePassword = (newPassword, newRetypedPassword, resetPasswordToken) => {
        return this.request('/users/update-password', {newPassword, newRetypedPassword, resetPasswordToken}, 'PUT');
    }
}
