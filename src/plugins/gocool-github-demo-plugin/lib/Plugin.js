import path from 'path';
import routes from './routes';

export default class Plugin {
  getRoutes() {
    return routes;
  }

  getViews() {
    const rootPath = path.normalize(__dirname);
    return [`${rootPath}/views`];
  }
}
