import { Controller } from 'framework';

export default class ApplicationController extends Controller {
  async index() {
    this.res.render('index', {
      title: 'imhere',
    });
  }
}
