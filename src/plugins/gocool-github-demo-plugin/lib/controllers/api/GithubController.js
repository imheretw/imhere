import { Controller } from 'gocool';
import GithubService from '../../services/GithubService';

export default class GithubController extends Controller {
  async closedIssues() {
    const issues = await GithubService.getClosedIssues();

    this.res.json({ issues });
  }
}
