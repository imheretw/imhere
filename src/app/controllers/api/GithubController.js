import { Controller } from 'framework';
import GithubService from 'services/GithubService';

export default class GithubController extends Controller {
  async closedIssues() {
    const issues = await GithubService.getClosedIssues();

    this.res.json({ issues });
  }
}
