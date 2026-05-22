"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = exports.VideoModel = exports.UserModel = exports.BackgroundModel = exports.MusicModel = exports.ArticleModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const ArticleSchema_1 = __importDefault(require("./ArticleSchema"));
const MusicSchema_1 = __importDefault(require("./MusicSchema"));
const BackgroundSchema_1 = __importDefault(require("./BackgroundSchema"));
const UserSchema_1 = __importDefault(require("./UserSchema"));
const VideoSchema_1 = __importDefault(require("./VideoSchema"));
const CommentSchema_1 = __importDefault(require("./CommentSchema"));
mongoose_1.default.Promise = global.Promise;
mongoose_1.default
    .connect(`mongodb://${config_1.default.mongoKey}`)
    .then(() => {
    console.log('DB数据库连接成功');
})
    .catch((error) => {
    console.log('DB数据库连接失败：' + error);
});
mongoose_1.default.connection.on('error', (error) => {
    console.log('DB数据库连接失败：' + error);
});
mongoose_1.default.connection.on('open', () => {
    console.log('DB数据库连接成功');
});
exports.ArticleModel = mongoose_1.default.model('Article', ArticleSchema_1.default);
exports.MusicModel = mongoose_1.default.model('Music', MusicSchema_1.default);
exports.BackgroundModel = mongoose_1.default.model('Background', BackgroundSchema_1.default);
exports.UserModel = mongoose_1.default.model('User', UserSchema_1.default);
exports.VideoModel = mongoose_1.default.model('Video', VideoSchema_1.default);
exports.CommentModel = mongoose_1.default.model('Comment', CommentSchema_1.default);
//# sourceMappingURL=index.js.map