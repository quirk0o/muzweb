import API from './API';

const getAll = (pgNum, pgSize) => API.get(`/tracks/?pgNum=${pgNum}&pgSize=${pgSize}`);
const getOne = (id) => API.get(`/tracks/find/${id}`);
const createTrack = (track) => API.post(`/tracks/add`, track);
const voteForTrack = (id, vote) => API.put(`/tracks/vote/${id}/?vote=${vote}`);
const searchForTrack = (prefix) => API.get(`/tracks/search/${prefix}`)


export default {getAll, getOne, createTrack, voteForTrack, searchForTrack};