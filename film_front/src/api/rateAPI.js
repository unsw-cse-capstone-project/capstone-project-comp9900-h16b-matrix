import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
export function addRate(data) {
    console.log(data)
    return new Promise((resolve, reject) => {
      axios
        .post(`/rate/addrate?uid=${data.uid}&movie_id=${data.movie_id}&rating=${data.rating}`)
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
//   export function login(data) {
//     console.log(API_URL)
//     return new Promise((resolve, reject) => {
//       axios
//         .post(`/user/login`,data)
//         .then(response => {
//             console.log(response)
//           if (response.status >= 200 && response.status < 300) {
//             console.log("Registerd");
//             console.log(response.data);
//             resolve(response.data);
//           } else {
//             reject(response.response);
//           }
//         })
//         .catch(reject);
//     });
//   }