import Logger from 'logger';

export default class SeedRunner {
  addSeeds(ComponentClasses) {
    this.ComponentClasses = ComponentClasses;
    this.logger = Logger('SeedRunner');
  }

  async run() {
    const ComponentClass = this.ComponentClasses.shift();

    if (ComponentClass) {
      this.logger.debug(`Run seed: ${ComponentClass.name}`);
      await new ComponentClass().run();
      await this.run();
    }
  }
}
