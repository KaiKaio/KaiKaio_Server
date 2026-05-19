import OSS from 'ali-oss';
import { Router } from '@koa/router';
import { Context } from 'koa';

let OSSClient: OSS | null = null;

const getOSSClient = (): OSS => {
  if (!OSSClient) {
    OSSClient = new OSS({
      accessKeyId: process.env.OSS_ACCESS_KEY_ID || '',
      accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET || '',
      region: 'oss-cn-beijing',
      authorizationV4: true,
      bucket: 'kaikai-bloga',
    });
  }
  return OSSClient;
};

export default (router: Router): void => {
  router.get('/api/listBuckets', async (ctx: Context) => {
    try {
      const code = 0;
      const msg = '查询背景成功啦~';

      const result = await getOSSClient().list({ 'max-keys': 100 }, {});

      ctx.body = {
        code: code,
        msg: msg,
        data: result,
      };
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  });
};
