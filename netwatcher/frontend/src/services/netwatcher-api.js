// getAllResources('https://example.com/answer')
//   .then((data) => {
//     console.log(data); // JSON data parsed by `response.json()` call
//   });

// postResource('https://example.com/answer', { answer: 42 })
//   .then((data) => {
//     console.log(data); // JSON data parsed by `response.json()` call
//   });

export default class NetWatcherService {

  getConfig = (token) => {

    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    };

    return headers;
  };

  getResources = async (url, token = null) => {

    const headers = this.getConfig(token)

    const response = await fetch(url, {
      method: 'GET',
      headers
    });
    return await response;
  };

  postResource = async (url, data = {}, token = null) => {

    const headers = this.getConfig(token)

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    return await response.json();
  };

};