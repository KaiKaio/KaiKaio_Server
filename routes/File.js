// const { BackgroundModel } = require('../models')
const OSS = require('ali-oss');
const dotenv = require('dotenv');

// console.log(process.env.NODE_ENV, '=> process.NODE_ENV')

dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

const OSSClient = new OSS({
  // 从环境变量中获取访问凭证。运行本代码示例之前，请确保已设置环境变量OSS_ACCESS_KEY_ID和OSS_ACCESS_KEY_SECRET。
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
  // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
  region: 'oss-cn-beijing',
  authorizationV4: true,
  // yourBucketName填写Bucket名称。
  bucket: 'kaikai-bloga',
});

module.exports =  (router) => {
  router.get('/api/listBuckets', async (ctx, next) => {

    try {
      let code = 0;
      let msg = '查询背景成功啦~'

      // 列举当前账号所有地域下的存储空间。
      const result = await OSSClient.list();

      ctx.body = {
        code: code,
        msg: msg,
        data: result
      }
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  });
}
