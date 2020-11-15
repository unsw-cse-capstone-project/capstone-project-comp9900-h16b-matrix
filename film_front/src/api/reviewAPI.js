import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
export function sendReview(data) {
    console.log(data,API_URL)
    return new Promise((resolve, reject) => {
      axios
        .post(`/review/add`, data)
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
  export function getByUidMid(uid,mid) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/review/get?user=${uid}&movie=${mid}`)
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
  export function update(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/review/update`,data)
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
  export function getAll(uid,mid) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/review/getall?movie=${mid}&user=${uid}`)
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
  export function deleteReview(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/review/delete?review=${id}`)
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