import { Controller } from 'gocool';

export default class ApplicationController extends Controller {
  async index() {
    this.res.render('index', {
      title: 'imhere',
    });
  }
}
