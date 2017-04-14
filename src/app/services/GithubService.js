import Logger from 'logger';
import GithubApi from 'github';

const github = new GithubApi();
const logger = Logger('GithubService');

export const GITHUB_API_BASE_URL = 'https://api.github.com';
export const GITHUB_API_ENDPOINTS = {
  closedIssues: (owner, repo) => `/repos/${owner}/${repo}/issues?state=closed`,
};

export default class GithubService {
  static async getClosedIssues() {
    logger.debug('start getting closed issues');
    const response = await github.issues.getForRepo({
      owner: 'imheretw',
      repo: 'imhere',
      state: 'closed',
    });

    const issues = response.data;

    logger.debug('issues', JSON.stringify(issues));

    return issues;
  }
}
