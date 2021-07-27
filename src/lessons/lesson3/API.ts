import axios from 'axios';

const key = '26b5bec7'; //26b5bec7
const configOMB = {
    baseURL: `http://www.omdbapi.com`,
};
const axiosInstance = axios.create(configOMB);

const API = {
    searchFilmsByTitle: (title: string) => {
        return axiosInstance.get(`?apikey=${key}&s=${title}`)
            .then(response => response.data)
    },
    searchFilmsByType: (title: string, type: string) => {
        return axiosInstance.get(`?apikey=${key}&s=${title}&type=${type}`)
            .then(response => response.data)
    }
};


export default API;
