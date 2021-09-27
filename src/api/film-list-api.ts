import axios from 'axios';

let config = {
  baseURL: 'https://yts.mx/api/v2/',
};

export const APIInstance = axios.create(config);

export const filmListAPI = {
  getFilms: (pageNumber: number) => {
    return APIInstance.get(`list_movies.json?page=${pageNumber}`);
  },
  getDetails: (movieId: string) => {
    return APIInstance.get(`movie_details.json?movie_id=${movieId}`);
  },
};
