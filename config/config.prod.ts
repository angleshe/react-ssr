import { EggAppConfig, PowerPartial } from 'egg';

export default (): PowerPartial<EggAppConfig> => {
  const config: PowerPartial<EggAppConfig> = {};
  config.sequelize = {
    dialect: 'mysql',
    host: '122.51.62.111',
    port: 3306,
    database: 'dev_blog',
    username: 'react',
    password: '1234567890',
    define: {
      freezeTableName: true
    }
  };
  return config;
};
