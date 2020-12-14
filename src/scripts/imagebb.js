class ImageBB {
  constructor() {
    this.endpoint = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_KEY}`;
  }

  post(image, callBack) {
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', this.endpoint, true);
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status >= 200 && xhttp.status < 300) {
          callBack(JSON.parse(xhttp.responseText));
        } else {
          callBack({
            status: false,
          });
        }
      }
    };

    xhttp.send(image);

    return this;
  }
}

export default ImageBB;
