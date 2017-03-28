import { expect } from 'chai';
import GithubService, { GITHUB_API_ENDPOINTS } from 'services/GithubService';
import httpMocks from 'helpers/httpMocks';
import githubClosedIssueData from 'data/api/github/issues/closed.json';

describe('Test GithubService', () => {
  describe('getClosedIssues()', () => {
    it('should return closed issues', async () => {
      const [owner, repo] = ['imheretw', 'imhere'];

      httpMocks.githubHttpMock
        .get(GITHUB_API_ENDPOINTS.closedIssues(owner, repo))
        .reply(200, githubClosedIssueData);

      const issues = await GithubService.getClosedIssues();
      const issue = issues[0];

      expect(issues.length).be.gt(1);
      expect(issue.title).be.eq('Kue screenshot');
    });
  });
});
