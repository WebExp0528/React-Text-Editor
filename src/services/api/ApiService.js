import config from '../../config/api';
import axios from  'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { store } from '../../routes';
import { loginError } from '../../containers/auth/login/logic/authActions';

export default class ApiService {
  baseUrl = config.apiLink;

  request = (url, data=null, method='GET', headers={}) => {
    return axios.request({
      method: method,
      url: this.baseUrl + url,
      data: data,
      headers: headers
    });
  };

  requestWithAuth = (url, data=null, method='GET', headers) => {
      const refreshAuthLogic = err => {
          if (err.response.config.url === this.baseUrl + '/token/refresh') {
              store.dispatch(loginError(err));
          }

          return this.refreshToken()
              .then(data => {
                  err.response.config.headers['Authorization'] = 'Bearer ' + data.token;
                  return Promise.resolve();
              });
      };

      createAuthRefreshInterceptor(axios, refreshAuthLogic);

      headers = {
          'Authorization': 'Bearer ' + localStorage.getItem('token') || '',
          ...headers
      };

      return this.request(url, data, method, headers);
  };

  refreshToken = () => {
    return axios
      .post(config.apiLink + '/token/refresh', {refresh_token: localStorage.getItem('refresh_token')})
      .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('refresh_token', res.data.refresh_token);

        return res.data;
      });
  };
}
