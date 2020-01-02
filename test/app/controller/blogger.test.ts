import { app } from 'egg-mock/bootstrap';

describe('test/controller/blogger', () => {
  describe('GET /api/getBloggerInfo', () => {
    it('路由', async () => {
      await app
        .httpRequest()
        .get('/api/blogger/getBloggerInfo')
        .expect(200);
    });
  });
});
