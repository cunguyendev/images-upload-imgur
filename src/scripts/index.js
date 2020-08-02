/* eslint-disable operator-linebreak */
/**
 * Scripts for app
 */

import NotificationController from './controllers/notificationController';
import Imgur from './imgur';

class App {
  /**
   * Initial the constructor
   */
  constructor() {
    this.dropzone = document.querySelector('.dropzone');
    this.loading = document.querySelector('.loading');
    this.error = 'error';
    this.information = 'information';
    this.warning = ' warning';
    this.success = 'success';
    this.responseArea = document.querySelector('.data-response');
    this.theImage = document.getElementById('the-image');
    this.imageUrlDisplay = document.getElementById('image-response-url');
    this.copyButton = document.getElementById('copy-button');
    this.notificationController = new NotificationController();
  }

  /**
   * Start the app
   */
  start() {
    /**
     * Bind events in the app
     */
    this.notificationController.init();
    this.bindEventListener();
  }

  /**
   * Handle for showing the loading status
   * @param {Boolean} status
   */
  isShowLoadingStatus(status) {
    if (status) {
      this.loading.classList.add('d-block');
    } else {
      this.loading.classList.remove('d-block');
    }
  }

  /**
   *
   * @param {File} image
   */
  uploadImage(image) {
    const imgur = new Imgur('4409588f10776f7');

    imgur.post(image, (response) => {
      const message =
        "Your image was uploaded successfully. It's will show you in a few seconds.";
      this.isShowLoadingStatus(false);
      this.notificationController.displayNotification(this.success, message);
      this.responseArea.classList.remove('d-none');
      this.responseArea.classList.add('d-flex');
      this.displayImages(response.data.link);
    });
  }

  /**
   * Display data to view
   * @param {String} data
   */
  displayImages(image) {
    this.theImage.setAttribute('src', image);
    this.imageUrlDisplay.value = image;

    return this;
  }

  /**
   * Check files import
   * @param {File} file
   */
  checkFiles(file) {
    this.isShowLoadingStatus(true);
    this.responseArea.classList.remove('d-flex');
    this.responseArea.classList.add('d-none');

    if (file.type.match(/image/) && file.type !== 'image/svg+xml') {
      const data = new FormData();
      data.append('image', file);

      this.uploadImage(data);
    } else {
      const message =
        'It looks like you have uploaded a file that is not an image type. Please re-check and try again.';
      this.notificationController.displayNotification(this.error, message);
      this.isShowLoadingStatus(false);
    }

    return this;
  }

  /**
   * Bind all of events into the app
   */
  bindEventListener() {
    /**
     * Drag and drop event handling
     */
    const dropEventType = ['dragenter', 'dragleave', 'dragover', 'drop'];

    dropEventType.map((event) => {
      this.dropzone.addEventListener(event, (e) => {
        if (
          e.target &&
          e.target.nodeName === 'INPUT' &&
          e.target.type === 'file'
        ) {
          if (event === 'dragleave' || event === 'drop') {
            this.dropzone.classList.remove('dropzone__dragging');
          } else {
            this.dropzone.classList.add('dropzone__dragging');
          }
        }
      });

      return true;
    });

    /**
     * Handle after upload the file
     */
    this.dropzone.addEventListener('change', (e) => {
      if (
        e.target &&
        e.target.nodeName === 'INPUT' &&
        e.target.type === 'file'
      ) {
        for (let i = 0; i < e.target.files.length; i += 1) {
          const file = e.target.files[i];

          /**
           * Start to check all of the files uploaded form end-users
           */
          this.checkFiles(file);
        }
      }
    });
  }
}

/**
 * Call the app to getting start
 */
const app = new App();
app.start();
