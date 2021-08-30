const { CommentModel } = require('../models');
const { getUserIp } = require('../util/common');
const axios = require('axios');
const { AMapKey } = require('../config/keyConfig')

module.exports =  (router) => {

  router.get('/api/Comment', async (ctx, next) => {
    const results = await CommentModel.find();
    const code = 0;
    const msg = '查询留言列表成功啦~'
    ctx.body = {
      code: code,
      msg: msg,
      data: results
    }
  });

  router.post('/api/Comment/Add', async (ctx, next) => {
    let code = 0;
    let msg = ''
    const date = new Date();
    try {
      const {
        agent,
        content,
        pid,
        userName
      } = ctx.request.body;
      const { req } = ctx;
      const ip = getUserIp(req);
      const {
        data: {
          status,
          province,
          city
        }
      } = await axios.get(`https://restapi.amap.com/v5/ip?key=${AMapKey}&type=4&ip=${ip}`);
      if(status !== '1') {
        throw new Error('地址获取失败');
      }

      const CommentItem = new CommentModel({
        content,
        agent,
        userName,
        pid,
        ip_location: `${province} - ${city}`,
        createDate: `${date.getFullYear().toString()}-${(date.getMonth() + 1).toString()}-${date.getDate().toString()}`,
      });

      await CommentItem.save();
      msg = '添加留言成功';

    } catch (err) {
      console.log(err);
      code = 1;
      msg = '添加留言失败： ->' + err;
    } finally {
      ctx.body = {
        code,
        msg,
      }
    }
  })

  router.delete('/api/Comment/Delete/', async (ctx, next) => {
    await CommentModel.deleteOne({_id: ctx.request.query.id}, (err) => {
      if (err) {
        ctx.body = {
          code: 1,
          msg:'删除留言失败了T-T.',
          data: err
        }
      } else {
        ctx.body = {
          code: 0,
          msg:'删除留言成功咯. ^_^'
        }
      }
    })
  })
}
