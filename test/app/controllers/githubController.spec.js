import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { GITHUB_API_ENDPOINTS } from 'services/GithubService';
import { githubHttpMock } from 'helpers/httpMocks';
import githubClosedIssueData from 'data/api/github/issues/closed.json';
import server from 'app';

chai.use(chaiHttp);

describe('Test github controller', function () {
  describe('GET /api/github/closed_issues', () => {
    it('should return closed issues', async () => {
      const [owner, repo] = ['imheretw', 'imhere'];

      githubHttpMock
        .get(GITHUB_API_ENDPOINTS.closedIssues(owner, repo))
        .reply(200, githubClosedIssueData);

      const res = await chai.request(server)
        .get('/api/github/closed_issues');

      const issues = res.body.issues;
      expect(res.status).to.equal(200);
      expect(res).to.be.json;
      expect(issues).to.a('array');
      expect(issues.length).to.gt(1);
      expect(issues[0]).to.have.property('title', 'Kue screenshot');
    });
  });
});
