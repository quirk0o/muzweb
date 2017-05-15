import API from './API';

const getAll = (pgNum, pgSize) => API.get(`/authors/?pgNum=${pgNum}&pgSize=${pgSize}`);
const getOne = (id) => API.get(`/authors/${id}`);
const createAuthor = (author) => API.post(`/authors/add`, author);

export default {getAll, getOne, createAuthor};