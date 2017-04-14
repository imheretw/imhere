import Cleaner from '../components/Cleaner';
import SeedRunner from '../helpers/SeedRunner';

exports.seed = async () => {
  const seedRunner = new SeedRunner();
  const ComponentClasses = [
    Cleaner,
  ];

  seedRunner.addSeeds(ComponentClasses);
  await seedRunner.run();
};
