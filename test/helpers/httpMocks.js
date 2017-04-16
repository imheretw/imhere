import nock from 'nock';
import { GITHUB_API_BASE_URL } from 'services/GithubService';
import Logger from 'Logger';

const logger = new Logger('httpMock');

const githubHttpMock = nock(GITHUB_API_BASE_URL).log(logger.debug);

export default {
  githubHttpMock,
};
