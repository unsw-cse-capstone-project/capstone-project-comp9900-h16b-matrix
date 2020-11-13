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
  export function addNlike(data) {
    console.log(data,API_URL)
    return new Promise((resolve, reject) => {
      axios
        .put(`/comment/like?user=${data.uid}&comment=${data.cid}`)
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
  export function delNlike(data) {
    console.log(data,API_URL)
    return new Promise((resolve, reject) => {
      axios
        .put(`/comment/unlike?user=${data.uid}&comment=${data.cid}`)
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
  export function getAll(mid,uid) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/comment/getAll?movie=${mid}&user=${uid}`)
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