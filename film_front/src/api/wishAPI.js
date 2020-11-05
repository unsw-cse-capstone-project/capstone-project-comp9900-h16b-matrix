import axios from "axios";
export function addWish(data) {
    console.log(data)
    return new Promise((resolve, reject) => {
      axios
        .post(`/wishlist/add?user=${data.uid}&movie=${data.movie_id}`)
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

  export function delWish(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/wishlist/delete?id=${id}`)
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
        .get(`/wishlist/getAll?user=${id}`)
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
  export function getByIds(uid,mid) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/wishlist/get?user=${uid}&movie=${mid}`)
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