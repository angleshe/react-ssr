import { IConfig } from 'umi-types';
import path from 'path';
const config: IConfig = {
  hash: true,
  publicPath: '/public/',
  outputPath: '../../build/app/public',
  manifest: {
    fileName: path.resolve(process.cwd(), 'build/config/manifest.json')
  }
};
export default config;
