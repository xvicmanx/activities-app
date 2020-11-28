// @flow

import fs from 'fs';
import requireAll from 'require-all';
import Sequelize from 'sequelize';

const {
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PROTOCOL,
  DATABASE_PORT,
  DATABASE_DRIVER,
  NODE_ENV,
} = process.env;

const modelFiles = requireAll({
  dirname: `${__dirname}/../entities/`,
  filter: /model\.js$/,
  recursive: true,
});

const defineModels = (sequelize) => {
  const UserActivity = sequelize.define(
    'UserActivity',
    {
      willAttend: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
  );
  const models = { UserActivity };

  Object.keys(modelFiles).forEach((key) => {
    const Klass = modelFiles[key]['model.js'].default;
    const name = `${Klass.name.substring(0, 1).toUpperCase()}${Klass.name.substring(1)}`;
    models[name] = Klass.setup(sequelize);
  });

  const modelItems: Array<Object> = Object.values(models);
  modelItems
    .filter((model) => typeof model.associate === 'function')
    .forEach((model) => model.associate(models));
};

const dir = `${__dirname}/../../data`;

const getConfig = () => {
  const user = DATABASE_USER || 'admin';
  const password = DATABASE_PASSWORD || '1234';
  const database = DATABASE_NAME || 'db';

  let opts;
  if (DATABASE_DRIVER !== 'mysql') {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const dbName = NODE_ENV === 'TEST' ? 'test-db' : 'db';

    opts = {
      dialect: 'sqlite',
      storage: `${dir}/${dbName}.sqlite`,
      logging: false,
    };
  } else {
    opts = {
      host: DATABASE_HOST,
      dialect: DATABASE_PROTOCOL,
      port: +DATABASE_PORT,
      query: { pool: true },
      logging: false,
    };
  }

  return [database, user, password, opts];
};

const setupDB = async () => {
  const sequelize = new Sequelize(...getConfig());

  defineModels(sequelize);

  await sequelize.sync();

  return sequelize;
};

export default setupDB;
