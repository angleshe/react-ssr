/// <reference path="./mysql.d.ts" />
import 'egg';

declare module 'egg' {
  interface Application {
    mysql: mysql;
  }
}
