import axios from "axios";
export function addRate(data) {
    console.log(data)
    return new Promise((resolve, reject) => {
      axios
        .post(`/rate/add?uid=${data.uid}&movie_id=${data.movie_id}&rating=${data.rating}`)
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
  export function updateRate(data) {
    console.log(data)
    return new Promise((resolve, reject) => {
      axios
        .put(`/rate/update?uid=${data.uid}&movie_id=${data.movie_id}&rating=${data.rating}`)
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
    console.log('getall',id)
    return new Promise((resolve, reject) => {
      axios
        .get(`/rate/getAll?movie_id=${id}`)
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
  export function get(uid,mid) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/rate/get?uid=${uid}&mid=${mid}`)
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
