export interface AppConfig {
  port: number;
  mongoKey: string;
}

const port = parseInt(process.env.PORT || '4000', 10);

const mongoKey = process.env.MONGO_KEY || 'localhost:27017/KaiKaiBlog';

export const config: AppConfig = {
  port,
  mongoKey,
};

export default config;
