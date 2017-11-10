import axios from 'axios';

function getInfo(_url, data, callback) {
  axios.get(_url, {
    params: data
  })
  .then((response) => {
    callback(response.data);
  })
  .catch((error) => {
    callback(error);
  });
}
function postInfo(_url, data, callback) {
  axios.post(_url, {
    ...data
  })
  .then((response) => {
    callback(response.data);
  })
  .catch((error) => {
    callback(error);
  });
}
export { getInfo, postInfo };
