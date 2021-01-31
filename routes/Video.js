/**
 * @file Video.js
 * @lastModifiedTime 2021-01-27
 * @author KaiKaio <https://github.com/KaiKaio>
 */

const { VideoModel } = require("../models");
const OssClient = require("src/config/oss-config");

module.exports = (router) => {
  router.get("/api/Video", async (ctx, next) => {
    const results = await VideoModel.find();
    let code = 0;
    let msg = "查询视频成功啦~";
    ctx.body = {
      code: code,
      msg: msg,
      data: results,
    };
  });

  router.post("/api/Video/Add", async (ctx, next) => {

    try {
      let r1 = await OssClient.put('object','localfile');
      console.log('put success: %j', r1);
      let r2 = await OssClient.get('object');
      console.log('get success: %j', r2);
    } catch(e) {
      console.error('error: %j', err);
    }


    const date = new Date();
    const dateFormat = `${date.getFullYear().toString()}-${(
      date.getMonth() + 1
    ).toString()}-${date.getDate().toString()}`;

    const video = new VideoModel({
      title: ctx.request.body.title,
      url: ctx.request.body.url,
      albumart: ctx.request.body.albumart,
      createtime: dateFormat,
    });

    let code = 0;
    let msg = "";
    try {
      await video.save();
      msg = "添加视频成功";
    } catch (error) {
      code = 1;
      msg = "添加视频失败";
    }
    ctx.body = {
      code: code,
      msg: msg,
    };
  });

  router.delete("/api/Video/Delete/", async (ctx, next) => {
    console.log(ctx.request.query.id);
    await VideoModel.deleteOne({ _id: ctx.request.query.id }, (err) => {
      if (err) {
        ctx.body = {
          code: 1,
          msg: "删除失败了T-T.",
          data: err,
        };
      } else {
        ctx.body = {
          code: 0,
          msg: "删除成功咯. ^_^",
        };
      }
    });
  });
};
