import factory from 'factory-girl';
import { Context } from 'egg';

export default (ctx: Context): void => {
  ctx.factory = factory;
  factory.define<{
    id: number;
    isAdmin: boolean;
    nickname: string;
    faceImg: string;
    createDate: string;
  }>('user', ctx.model.User, {
    id: factory.sequence<number>('User.id', (n) => n),
    isAdmin: true,
    nickname: factory.sequence<string>('User.nickname', (n) => `nickname-${n}`),
    faceImg: 'hh',
    createDate: new Date().toString()
  });
};
