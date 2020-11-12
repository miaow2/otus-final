// getAllResources('https://example.com/answer')
//   .then((data) => {
//     console.log(data); // JSON data parsed by `response.json()` call
//   });

// postResource('https://example.com/answer', { answer: 42 })
//   .then((data) => {
//     console.log(data); // JSON data parsed by `response.json()` call
//   });

export default class NetWatcherService {

  getAllResources = async (url = '', method = 'GET', token = '') => {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authoruzation': `Token ${token}`
      }
    });
    return await response.json();
  };

  postResource = async (url = '', method = 'POST', token = '', data = {}) => {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token &{token}`
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  }
};