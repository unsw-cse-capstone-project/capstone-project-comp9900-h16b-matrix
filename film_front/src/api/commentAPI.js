import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
export function sendComment(data) {
    console.log(data,API_URL)
    return new Promise((resolve, reject) => {
      axios
        .post(`/comment/addcomment`, data)
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
  export function updateNlike(data) {
    console.log(data,API_URL)
    return new Promise((resolve, reject) => {
      axios
        .put(`/comment/udLike/${data.id}/?n_likes=${data.n_like}`)
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
  