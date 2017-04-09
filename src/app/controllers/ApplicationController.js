import BaseController from './BaseController';

export default class ApplicationController extends BaseController {
  async index() {
    this.res.render('index', {
      title: 'imhere',
    });
  }
}
