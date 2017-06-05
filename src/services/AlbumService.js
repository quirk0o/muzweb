import API from './API'

const getAll = (pgNum, pgSize) => API.get(`/albums/?pgNum=${pgNum}&pgSize=${pgSize}`)
const getOne = (id) => API.get(`/albums/${id}`)
const createAlbum = (album) => API.post(`/albums/add`, album)
const voteForAlbum = (id, vote) => API.put(`/albums/vote/${id}/?vote=${vote}`);
const searchForAlbum = (prefix) => API.get(`/albums/search/${prefix}`)


export default {getAll, getOne, createAlbum, voteForAlbum, searchForAlbum}