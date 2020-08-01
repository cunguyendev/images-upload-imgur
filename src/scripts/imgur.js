/**
 * Imgur module
 */
class Imgur {
  /**
   * Initial the constructor
   * @param {String} apiKey
   */
  constructor(apiKey) {
    this.endpoint = 'https://api.imgur.com/3/image';
    this.apiKey = apiKey;
  }

  /**
   * Send the data to the server
   * @param {Objetc} data
   * @param {Objetc} callBack
   */
  post(data, callBack) {
    const xhttp = new XMLHttpRequest();

    xhttp.open('POST', this.endpoint, true);
    xhttp.setRequestHeader('Authorization', `Client-ID ${this.apiKey}`);

    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status >= 200 && xhttp.status < 300) {
          callBack(JSON.parse(xhttp.responseText));
        } else {
          throw new Error(`${xhttp.status} - ${xhttp.statusText}`);
        }
      }
    };

    xhttp.send(data);
  }
}

/**
 * Export as default
 */
export default Imgur;
