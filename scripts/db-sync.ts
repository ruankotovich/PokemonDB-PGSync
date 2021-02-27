import { sequelize } from '../config/database';

export default async function performSynchronization(): Promise<void> {
  await sequelize.sync({ force: true });
}

if (require.main === module) {
  performSynchronization();
}
