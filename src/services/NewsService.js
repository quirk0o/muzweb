import API from './API';

const getAll = (pgNum, pgSize) => {API.get(`/news/?pgNum=${pgNum}&pgSize=${pgSize}`)};
const getOne = (id) => API.get(`/news/${id}`);
const createNews = (news) => API.post(`/news/add`, news);

export default {getAll, getOne, createNews};
