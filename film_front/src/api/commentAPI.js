import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
export function sendComment(data) {
    console.log(data,API_URL)
    return new Promise((resolve, reject) => {
      axios
        .post(`/comment/add`, data)
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
        .put(`/comment/like?id=${data.id}&isLike=${data.isLike}`)
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
  export function deleteComment(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/comment/delete?id=${id}`)
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            resolve(response.data);
          } else {
            reject(response.response);
          }
        })
        .catch(reject);
    });
  }