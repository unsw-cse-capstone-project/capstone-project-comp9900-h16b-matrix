import axios from "axios";
export function addBlack(data) {
    console.log(data)
    return new Promise((resolve, reject) => {
      axios
        .post(`/black/add?uid=${data.uid}&banned_uid=${data.banned_uid}`)
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

  export function getAll(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/black/getAll?uid=${id}`)
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
        .delete(`/black/delete?id=${id}`)
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