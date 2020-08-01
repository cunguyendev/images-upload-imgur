/* eslint-disable operator-linebreak */
/**
 * Scripts for app
 */

import Imgur from './imgur';

class App {
  /**
   * Initial the constructor
   */
  constructor() {
    this.dropzone = document.querySelector('.dropzone');
  }

  /**
   * Start the app
   */
  start() {
    /**
     * Bind events in the app
     */
    this.bindEventListener();
  }

  /**
   * Check files import
   * @param {File} file
   */
  checkFiles(file) {
    if (file.type.match(/image/) && file.type !== 'image/svg+xml') {
      const data = new FormData();
      data.append('image', file);

      const imgur = new Imgur('4409588f10776f7');

      imgur.post(data, (response) => {
        console.log(response.data.link);
      });
    } else {
      console.log('Invalid archive');
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
