import { cleanEnv, str } from 'envalid';

const validateEnv = (): void => {
  cleanEnv(process.env, {
    MONGO_ID: str(),
    MONGO_PWD: str(),
    MONGO_IP: str(),
    MONGO_DB: str(),
    JWT_SECRET: str(),
  });
};

export default validateEnv;
