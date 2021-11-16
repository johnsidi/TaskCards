const BASE_URL = 'http://localhost:3000'; //for the backend

const apiServiceJWT = {};

apiServiceJWT.getTasks = async (accessToken, userID) => {
  try {
    console.log('hi from api service');
    const res = await fetch(BASE_URL + '/tasks/' + userID, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return await res.json();
  } catch (error) {
    console.log('Error', error); // eslint-disable-line no-console
    return null; // I was getting error: Expected to return a value at the end of async arrow function
  }
};

apiServiceJWT.createTask = async (accessToken, taskMetadata, userID) => {
  try {
    const res = await fetch(BASE_URL + '/tasks/' + userID, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(taskMetadata),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log('Error', error); // eslint-disable-line no-console
    return null;
  }
};

apiServiceJWT.deleteTask = async (accessToken, userID, id) => {
  try {
    const res = await fetch(`${BASE_URL}/tasks/${userID}/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  } catch (error) {
    console.log('Error', error); // eslint-disable-line no-console
    return null;
  }
};

apiServiceJWT.register = (user) => {
  // REMOVE-START
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  // REMOVE-END
};

apiServiceJWT.login = (user) => {
  // REMOVE-START
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  // REMOVE-END
};

apiServiceJWT.profile = (accessToken) => {
  // REMOVE-START
  return fetch(`${BASE_URL}/me`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  // REMOVE-END
};

apiServiceJWT.logout = (tokenName, userID) => {
  // REMOVE-START
  // delete token from local storage here
  localStorage.removeItem(tokenName);
  localStorage.removeItem(userID);
  // the following request should invalidate the token
  // return fetch(`${BASE_URL}/logout`, {
  //   method: 'POST',
  //   credentials: 'include',
  //   mode: 'cors',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${tokenName}`,
  //   },
  // })
  //   .then((res) => res.json())
  //   .catch((err) => console.log(err));
  // REMOVE-END
};

export default apiServiceJWT;