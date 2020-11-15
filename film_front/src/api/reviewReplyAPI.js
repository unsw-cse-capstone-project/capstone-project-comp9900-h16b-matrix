import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
export function sendReply(data) {
  console.log(data)
    return new Promise((resolve, reject) => {
      axios
        .post(`/reply/add`, data)
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
  export function getById(rid,uid) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/reply/getall?review=${rid}&user=${uid}`)
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

  export function delById(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/reply/delete?id=${id}`)
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