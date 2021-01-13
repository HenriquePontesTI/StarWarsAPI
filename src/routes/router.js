
export default class RouterHandler {
  constructor(router, controllers) {
    this.router = router;
    this.controllers = controllers;
  }

  registerRoutes() {
    this.controllers.forEach(controller => {
      controller.routes.forEach(route => {
        this.router[route.action](`${controller.apiRoot}${route.route}`, (request, response) =>
          controller[route.method](request, response));
      });
    });
  }
}