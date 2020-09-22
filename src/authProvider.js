import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
const httpClient = fetchUtils.fetchJson;

const apiUrl = 'http://localhost:303'
const empresa = 'verdu'

export default {

  login: ({ username, password }) => {
    

    return httpClient(apiUrl + '/auth/login?database=' + empresa, {
      method: 'POST',
      body: JSON.stringify({
        email: username,
        password: password
      }),
    }).then(response => {

      let user = response.json.result.user
      let token = response.json.result.token.token
      let sessionId = response.json.result.session._id

      localStorage.setItem('username', username);

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('session_token', token);
      localStorage.setItem('session_id', sessionId);

      return {
        data: { id: 'asd' }
      }
    })
  },

  // called when the user clicks on the logout button
  logout: () => {
      localStorage.removeItem('username');
      return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }) => {
      if (status === 401 || status === 403) {
          localStorage.removeItem('username');
          return Promise.reject();
      }
      return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
      return localStorage.getItem('username')
          ? Promise.resolve()
          : Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};