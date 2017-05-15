import request from 'superagent';

const API_URL = "http://localhost:8080";

const API = {
  setToken: (token) => {
    localStorage.setItem('authToken', token)
  },
  get: (url) => request.get(`${API_URL}${url}`)
    .set('x-access-token', getToken())
    .then(res => res.body, err => Promise.reject(err)),
  post: (url, body = {}) => request.post(`${API_URL}${url}`)
    .set('Accept', 'application/json')
    .set('x-access-token', getToken())
    .send(body)
    .then(res => res.body, err => Promise.reject(err)),
  put: (url, body) => request.put(`${API_URL}${url}`)
    .set('Accept', 'application/json')
    .set('x-access-token', getToken())
    .send(body)
    .then(res => res.body, err => Promise.reject(err)),
  delete: (url) => request.delete(`${API_URL}${url}`)
    .set('x-access-token', getToken())
    .then(res => res.body, err => Promise.reject(err)),
};

export function getToken() {
  return localStorage.getItem('authToken')
}

export default API