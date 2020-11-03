import axios from "axios";
export function getMovieByTid(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/movie/get?tmdb_id=${id}`)
        .then(response => {
            console.log(response)
          if (response.status >= 200 && response.status < 300) {
           
            resolve(response.data);
          } else {
            reject(response.response);
          }
        })
        .catch(reject);
    });
  }
  export function updateDetail(data) {
    return new Promise((resolve, reject) => {
      axios
        .put(`/movie/update`,data)
        .then(response => {
            console.log(response)
          if (response.status >= 200 && response.status < 300) {
           
            resolve(response.data);
          } else {
            reject(response.response);
          }
        })
        .catch(reject);
    });
  }