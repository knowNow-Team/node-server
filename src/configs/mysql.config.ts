// import config from 'config';
import path from 'path';
import { ConnectionOptions } from 'typeorm';
import { dbConfig } from '@interfaces/db.interface';

// const { host, user, password, database }: dbConfig = config.get('dbConfig');
const { host, user, password, database }: dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'knownow',
};

const MysqlDBConnection: ConnectionOptions = {
  type: 'mysql',
  host: host,
  port: 3306,
  username: user,
  password: password,
  database: database,
  synchronize: true,
  logging: false,
  entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '../**/*.migration{.ts,.js}')],
  subscribers: [path.join(__dirname, '../**/*.subscriber{.ts,.js}')],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};

export default MysqlDBConnection;
