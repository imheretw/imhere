import nock from 'nock';
import { GITHUB_API_BASE_URL } from 'services/GithubService';

export const githubHttpMock = nock(GITHUB_API_BASE_URL).log(logger.debug);
