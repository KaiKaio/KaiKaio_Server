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
    let result = null

    const date = new Date();
    try {
      const {
        agent,
        content,
        pid,
        userName,
        site,
        email
      } = ctx.request.body;
      const { req } = ctx;
      const ip = getUserIp(req);
      const {
        data: {
          status,
          province,
          city
        },
        data
      } = await axios.get(`https://restapi.amap.com/v5/ip?key=${AMapKey}&type=4&ip=${ip}`);

      console.log(data)
      if(status !== '1') {
        throw new Error('地址获取失败');
      }
      
      let ip_location = ''
      if (province || city) {
        ip_location = `${province} - ${city}`
      } else {
        ip_location = ''
      }

      const CommentItem = new CommentModel({
        content,
        agent,
        userName,
        site,
        email,
        pid,
        ip_location,
        createDate: `${date.getFullYear().toString()}-${(date.getMonth() + 1).toString()}-${date.getDate().toString()}`,
      });

      result = await CommentItem.save();
      msg = '添加留言成功';

    } catch (err) {
      console.log(err);
      code = 1;
      msg = '添加留言失败： ->' + err;
    } finally {
      ctx.body = {
        code,
        result,
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
