const authToken = JSON.parse(localStorage.getItem('userData'))
  ? JSON.parse(localStorage.getItem('userData')).token
  : null;
const get = (apiUrl) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  let token;
  if (userData) {
    token = userData.token;
  }
  return fetch(apiUrl, {
    method: 'GET',
    headers: {
      Authorization: token,
      'content-type': 'application/json',
      Authorization: token,
    },
  }).then((response) => {
    return response.json();
  });
};
const post = (apiUrl, data) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  let token;
  if (userData) {
    token = userData.token;
  }
  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => {
    return response.json();
  });
};
const postImage = (apiUrl, data) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  let token;
  if (userData) {
    token = userData.token;
  }
  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: token,
    },
    body: data,
  }).then((response) => {
    return response.json();
  });
};
const putImage = (apiUrl, data) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  let token;
  if (userData) {
    token = userData.token;
  }
  return fetch(apiUrl, {
    method: 'PUT',
    headers: {
      Authorization: token,
    },
    body: data,
  }).then((response) => {
    return response.json();
  });
};
const put = (apiUrl, data) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  let token;
  if (userData) {
    token = userData.token;
  }
  return fetch(apiUrl, {
    method: 'PUT',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      Authorization: authToken,
    },
    body: JSON.stringify(data),
  }).then((response) => {
    return response.json();
  });
};
const del = (apiUrl, data) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  let token;
  if (userData) {
    token = userData.token;
  }
  return fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      Authorization: token,
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => {
    return response.json();
  });
};

export default { get, post, put, del, postImage, putImage };
