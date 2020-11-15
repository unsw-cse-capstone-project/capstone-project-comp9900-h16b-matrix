import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
export function likeorunlike(data) {
    console.log(data,API_URL)
    return new Promise((resolve, reject) => {
      axios
        .post(`/reviewlike/likeorunlike`, data)
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

  export function cancellikeorunlike(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/reviewlike/cancellikeorunlike?r=${id}`)
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

  export function getByID(uid,rid) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/reviewlike/get?user=${uid}&review=${rid}`)
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