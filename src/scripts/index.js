/* eslint-disable operator-linebreak */
/**
 * Scripts for app
 */
class App {
  constructor() {
    this.dropzone = document.querySelector('.dropzone');
  }

  start() {
    this.bindEventListener();

    return this;
  }

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

          console.log(file);
        }
      }
    });
  }
}

const app = new App();
app.start();
