/**
 * @file Music.js
 * @lastModifiedTime 2020-01-06 17:49:21
 * @author KaiKaio <https://github.com/KaiKaio>
*/

const { MusicModel } = require('../models')

module.exports =  (router) => {
  router.get('/api/Music', async (ctx, next) => {
    const results = await MusicModel.find().sort({sortIndex: -1}); // 降序排序
    let code = 0;
    let msg = '查询音乐成功啦~'
    ctx.body = {
      code: code,
      msg: msg,
      data: results
    }
  });

  router.post('/api/Music/Add', async (ctx, next) => {
    let date = new Date();
    let dateFormat = `${date.getFullYear().toString()}-${(date.getMonth() + 1).toString()}-${date.getDate().toString()}`

    // 处理 sortIndex：优先使用请求中提供的值，否则取当前最大 sortIndex + 1
    let sortIndex = ctx.request.body.sortIndex;
    if (typeof sortIndex === 'undefined' || sortIndex === null) {
      const maxDoc = await MusicModel.findOne().sort({ sortIndex: -1 });
      sortIndex = (maxDoc && typeof maxDoc.sortIndex === 'number') ? (maxDoc.sortIndex + 1) : 0;
    }

    const music = new MusicModel({
      title: ctx.request.body.title,
      url: ctx.request.body.url,
      singer: ctx.request.body.singer,
      lrc: ctx.request.body.lrc,
      albumart: ctx.request.body.albumart,
      delname: ctx.request.body.delname,
      createtime: dateFormat,
      sortIndex: sortIndex,
    })

    let code = 0;
    let msg = ''
    try {
      await music.save();
      msg = '添加音乐成功';
    } catch (error) {
      code = 1;
      msg = '添加音乐失败';
    }
    ctx.body = {
      code: code,
      msg: msg
    }
  })

  // 编辑音乐（可更新 sortIndex）
  router.post('/api/Music/Edit', async (ctx, next) => {
    let date = new Date();
    let dateFormat = `${date.getFullYear().toString()}-${(date.getMonth() + 1).toString()}-${date.getDate().toString()}`

    const id = ctx.request.body.id || ctx.request.body._id;
    if (!id) {
      ctx.body = {
        code: 1,
        msg: '缺少要修改的音乐 ID'
      }
      return;
    }

    const updateData = {
      updatetime: dateFormat,
      title: ctx.request.body.title,
      url: ctx.request.body.url,
      singer: ctx.request.body.singer,
      lrc: ctx.request.body.lrc,
      albumart: ctx.request.body.albumart,
      delname: ctx.request.body.delname,
    };

    if (typeof ctx.request.body.sortIndex !== 'undefined' && ctx.request.body.sortIndex !== null) {
      updateData.sortIndex = ctx.request.body.sortIndex;
    }

    let code = 0;
    let msg = '';
    try {
      await MusicModel.updateOne({ _id: id }, { $set: updateData });
      msg = '编辑音乐成功';
    } catch (error) {
      code = 1;
      msg = '编辑音乐失败';
    }
    ctx.body = {
      code: code,
      msg: msg
    }
  })

  router.delete('/api/Music/Delete/', async (ctx, next) => {
    await MusicModel.deleteOne({_id: ctx.request.query.id}, (err) => {
      if (err) {
        ctx.body = {
          code: 1,
          msg:'删除失败了T-T.',
          data: err
        }
      } else {
        ctx.body = {
          code: 0,
          msg:'删除成功咯. ^_^'
        }
      }
    })
  })

  router.post('/api/Music/Sort', async (ctx, next) => {
    let code = 0;
    let msg = '已成功修改排序~'
    try {
      const { changeIDList } = ctx.request.body;
      const changeToList = []; // 存储位置改变的Index值
      changeIDList.reverse(); // 倒序

      for (let i = 0; i < changeIDList.length; i++) {
        const { _id, sortIndex  } = changeIDList[i];
        if (i !== sortIndex) {
          changeToList.push({
            currentID: _id,
            changeIndex: i,
          });
        }
      }

      for (let i = changeToList.length - 1; i >= 0; i--) {
        const { currentID, changeIndex } = changeToList[i];
        await MusicModel.updateOne({_id: currentID}, {
          $set: {
            sortIndex: changeIndex,
          }
        })
      }
    } catch (err) {
      code = 1;
      msg = '修改排序失败~ =>' + err
      console.log(err, '修改排序报错');
    } finally {
      ctx.body = {
        code,
        msg,
      }
    }
  })

}
