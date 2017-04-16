import nock from 'nock';
import Logger from 'Logger';
import { GITHUB_API_BASE_URL } from '../../lib/services/GithubService';

const logger = new Logger('httpMock');

const githubHttpMock = nock(GITHUB_API_BASE_URL).log(logger.debug);

export default {
  githubHttpMock,
};
