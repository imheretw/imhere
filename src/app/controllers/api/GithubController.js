import BaseController from 'controllers/BaseController';
import GithubService from 'services/GithubService';

export default class GithubController extends BaseController {
  async closedIssues() {
    const issues = await GithubService.getClosedIssues();

    this.res.json({ issues });
  }
}
