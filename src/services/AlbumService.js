import API from './API'

const getAll = (pgNum, pgSize) => API.get(`/tracks/?pgNum=${pgNum}&pgSize=${pgSize}`)
const getOne = (id) => API.get(`/albums/${id}`)
const createAlbum = (album) => API.post(`/albums/add`, album)
const searchForAlbum = (prefix) => API.get(`/albums/search/${prefix}`)


export default {getAll, getOne, createAlbum, searchForAlbum}