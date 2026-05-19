"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Article_1 = __importDefault(require("./Article"));
const Music_1 = __importDefault(require("./Music"));
const Background_1 = __importDefault(require("./Background"));
const User_1 = __importDefault(require("./User"));
const Comment_1 = __importDefault(require("./Comment"));
const File_1 = __importDefault(require("./File"));
const Video_1 = __importDefault(require("./Video"));
exports.default = (router) => {
    router.get('/', async (ctx) => {
        ctx.state = {
            title: 'Koa2 Server For Kaikaio',
        };
        await ctx.render('index', ctx.state);
    });
    (0, File_1.default)(router);
    (0, Article_1.default)(router);
    (0, Music_1.default)(router);
    (0, Background_1.default)(router);
    (0, User_1.default)(router);
    (0, Comment_1.default)(router);
    (0, Video_1.default)(router);
};
//# sourceMappingURL=index.js.map