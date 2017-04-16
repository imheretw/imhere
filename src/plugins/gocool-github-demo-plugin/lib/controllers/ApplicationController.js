import { Controller } from 'gocool';
import GithubService from '../services/GithubService';

export default class GithubController extends Controller {
  async index() {
    this.res.render('./github-demo/index', {
      title: 'Github',
    });
  }

  async closedIssues() {
    const issues = await GithubService.getClosedIssues();

    this.res.render('./github-demo/closed-issues', {
      title: 'Github Closed Issues',
      issues,
    });
  }
}
