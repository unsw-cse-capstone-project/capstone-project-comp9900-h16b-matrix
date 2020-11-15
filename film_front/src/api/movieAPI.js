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
      console.log(data)
    return new Promise((resolve, reject) => {
      axios
        .post(`/movie/update`,data)
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
  export function searchMovie(type,data) {
    console.log(data)
  return new Promise((resolve, reject) => {
    axios
      .get(`/movie/search/${type}?user=${data.user}&keyword=${data.keyword}&sorted_by=${data.sorted_by}&page=${data.page}&page_size=12&is_ascending=false&genres=${data.genres}`)
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
export function recommend(uid,mid) {
return new Promise((resolve, reject) => {
  axios
    .get(`/movie/recommend?user=${uid}&movie=${mid}`)
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