export default class Bootstrap {
  constructor({ bootsPath }) {
    this._bootsPath = bootsPath;
    this.Handlers = require(`${this._bootsPath}/index`).default;
  }

  start() {
    this.Handlers.forEach((Handler) => {
      new Handler().start();
    });
  }
}
