import mongoose from 'mongoose';
import config from '../config';

import ArticleSchema from './ArticleSchema';
import MusicSchema from './MusicSchema';
import BackgroundSchema from './BackgroundSchema';
import UserSchema from './UserSchema';
import VideoSchema from './VideoSchema';
import CommentSchema from './CommentSchema';

mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://${config.mongoKey}`)
  .then(() => {
    console.log('DB数据库连接成功');
  })
  .catch((error: Error) => {
    console.log('DB数据库连接失败：' + error);
  });

mongoose.connection.on('error', (error: Error) => {
  console.log('DB数据库连接失败：' + error);
});

mongoose.connection.on('open', () => {
  console.log('DB数据库连接打开');
});

export const ArticleModel = mongoose.model('Article', ArticleSchema);
export const MusicModel = mongoose.model('Music', MusicSchema);
export const BackgroundModel = mongoose.model('Background', BackgroundSchema);
export const UserModel = mongoose.model('User', UserSchema);
export const VideoModel = mongoose.model('Video', VideoSchema);
export const CommentModel = mongoose.model('Comment', CommentSchema);
