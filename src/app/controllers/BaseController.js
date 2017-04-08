export default class BaseController {

  static action(name) {
    const controller = new this();

    return {
      action: (req, res, next) => {
        controller.req = req;
        controller.res = res;
        controller.next = next;
        controller[name].call(controller);
      },
      middlewares: (controller.beforeMiddlewares || {})[name],
    };
  }

  before(actionName, middlewares) {
    this.beforeMiddlewares = this.beforeMiddlewares || {};
    this.beforeMiddlewares[actionName] = this.beforeMiddlewares[actionName] || [];

    if (middlewares.slice) {
      this.beforeMiddlewares[actionName].concat(middlewares);
    } else {
      this.beforeMiddlewares[actionName].push(middlewares);
    }
  }
}
