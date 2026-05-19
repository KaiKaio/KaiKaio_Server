import { Router } from '@koa/router';
import { Context } from 'koa';

import ArticleRoutes from './Article';
import MusicRoutes from './Music';
import BackgroundRoutes from './Background';
import UserRoutes from './User';
import CommentRoutes from './Comment';
import FileRoutes from './File';
import VideoRoutes from './Video';

export default (router: Router): void => {
  router.get('/', async (ctx: Context) => {
    ctx.state = {
      title: 'Koa2 Server For Kaikaio',
    };
    await ctx.render('index', ctx.state);
  });

  FileRoutes(router);
  ArticleRoutes(router);
  MusicRoutes(router);
  BackgroundRoutes(router);
  UserRoutes(router);
  CommentRoutes(router);
  VideoRoutes(router);
};
