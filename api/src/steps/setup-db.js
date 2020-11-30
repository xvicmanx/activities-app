// @flow

import fs from 'fs';
import requireAll from 'require-all';
import Sequelize from 'sequelize';

const {
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_DIALECT,
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

  const UserCommunity = sequelize.define(
    'UserCommunity',
    {
      coordinates: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
  );

  const models = {
    UserActivity,
    UserCommunity,
  };

  Object.keys(modelFiles || {}).forEach((key) => {
    const Klass = modelFiles[key]['model.js'].default;
    const name = `${Klass.name.substring(0, 1).toUpperCase()}${Klass.name.substring(1)}`;
    models[name] = Klass.setup(sequelize);
  });

  const modelItems: Array<Object> = Object.values(models);
  modelItems
    .filter((model) => typeof model.associate === 'function')
    .forEach((model) => model.associate(models));
};

const getConfig = () => {
  const dir = `${__dirname}/../../data`;
  let opts = {
    dialect: DATABASE_DIALECT || 'sqlite',
    logging: false,
  };

  if (opts.dialect === 'sqlite') {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const dbName = NODE_ENV === 'TEST' ? 'test-db' : 'db';
    opts = {
      ...opts,
      storage: `${dir}/${dbName}.sqlite`,
    };
  } else {
    opts = {
      ...opts,
      host: DATABASE_HOST,
      port: +DATABASE_PORT,
      query: { pool: true },
    };
  }

  const user = DATABASE_USER || 'admin';
  const password = DATABASE_PASSWORD || '1234';
  const database = DATABASE_NAME || 'db';

  return [database, user, password, opts];
};

const setupDB = async () => {
  const sequelize = new Sequelize(...getConfig());

  defineModels(sequelize);

  await sequelize.sync();

  return sequelize;
};

export default setupDB;
