import Cleaner from '../components/Cleaner';
import UsersSeeder from '../components/UsersSeeder';
import SeedRunner from '../helpers/SeedRunner';

exports.seed = async () => {
  const seedRunner = new SeedRunner();
  const ComponentClasses = [
    Cleaner,
    UsersSeeder,
  ];

  seedRunner.addSeeds(ComponentClasses);
  await seedRunner.run();
};
