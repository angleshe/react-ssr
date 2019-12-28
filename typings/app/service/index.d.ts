// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBaseService from '../../../app/service/baseService';
import ExportBlogBloggerInfoSelectService from '../../../app/service/blog/bloggerInfoSelectService';

declare module 'egg' {
  interface IService {
    baseService: ExportBaseService;
    blog: {
      bloggerInfoSelectService: ExportBlogBloggerInfoSelectService;
    }
  }
}
