# BlogServer

基于 Koa + TypeScript 的博客服务端应用，为 Kaikaio 博客系统提供后端 API 服务。

## 技术栈

- **运行环境**: Node.js
- **框架**: Koa 3.x
- **语言**: TypeScript
- **数据库**: MongoDB (Mongoose ORM)
- **认证**: JWT + RSA 非对称加密
- **进程管理**: PM2
- **代码质量**: ESLint + Prettier + Husky

## 功能模块

### 用户模块
- 用户注册/登录
- 密码修改
- JWT Token 验证
- RSA 公钥获取

### 内容模块
- **文章管理**: 增删改查
- **音乐管理**: 音乐资源管理
- **视频管理**: 视频资源管理
- **背景管理**: 背景图管理
- **评论管理**: 评论增删查

### 文件服务
- 阿里云 OSS 文件上传
- Bing 壁纸获取

## 项目结构

```
├── src/
│   ├── app.ts              # 应用入口
│   ├── config/             # 配置文件
│   ├── middlewares/        # 中间件
│   ├── models/             # 数据模型 (Mongoose Schema)
│   │   ├── ArticleSchema.ts
│   │   ├── BackgroundSchema.ts
│   │   ├── CommentSchema.ts
│   │   ├── MusicSchema.ts
│   │   ├── UserSchema.ts
│   │   └── VideoSchema.ts
│   ├── routes/             # 路由定义
│   │   ├── Article.ts
│   │   ├── Background.ts
│   │   ├── Comment.ts
│   │   ├── File.ts
│   │   ├── Music.ts
│   │   ├── User.ts
│   │   └── Video.ts
│   ├── util/               # 工具函数
│   │   ├── common.ts
│   │   ├── encryp.ts       # RSA 加解密
│   │   └── jwt.ts          # JWT 工具
│   └── views/              # 视图模板
├── public/                 # 静态资源
├── views/                  # EJS 模板
├── app.js                  # 编译后入口 (PM2 使用)
├── ecosystem.config.js     # PM2 配置
└── package.json
```

## 环境配置

创建 `.env.development` 或 `.env.production` 文件：

```env
# JWT RSA 密钥对
JWT_PUBLIC_KEY=-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----
JWT_PRIVATE_KEY=-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----

# MongoDB 连接配置
MONGO_KEY=username:password@host:port/database?authSource=admin

# 阿里云 OSS 配置
OSS_ACCESS_KEY_ID=your_access_key_id
OSS_ACCESS_KEY_SECRET=your_access_key_secret

# 高德地图 API Key (可选)
AMAP_KEY=your_amap_key
```

## 安装与运行

### 安装依赖

```bash
npm install
```

### 开发环境

```bash
npm run dev
```

### 生产环境

```bash
# 编译 TypeScript
npm run build

# 使用 PM2 启动
pm2 start ecosystem.config.js
```

## 可用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 (nodemon 热重载) |
| `npm run build` | 编译 TypeScript 到 dist 目录 |
| `npm start` | 启动生产服务器 |
| `npm run lint` | 运行 ESLint 检查 |
| `npm run lint:fix` | 自动修复 ESLint 问题 |
| `npm run format` | 使用 Prettier 格式化代码 |
| `npm run typecheck` | TypeScript 类型检查 |

## API 接口

### 公开接口 (无需认证)

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/user/register` | 用户注册 |
| POST | `/api/user/login` | 用户登录 |
| GET | `/api/user/public_key` | 获取 RSA 公钥 |
| GET | `/api/Article` | 获取文章列表 |
| GET | `/api/Background` | 获取背景列表 |
| GET | `/api/Music` | 获取音乐列表 |
| GET | `/api/Comment` | 获取评论列表 |
| POST | `/api/Comment/Add` | 添加评论 |

### 需认证接口 (需携带 JWT Token)

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/user/verifyToken` | 验证 Token |
| POST | `/api/user/changePassword` | 修改密码 |
| POST | `/api/Article/Add` | 添加文章 |
| PUT | `/api/Article/Edit` | 编辑文章 |
| DELETE | `/api/Article/Delete` | 删除文章 |

## 安全特性

- **密码加密**: 使用 RSA 非对称加密传输密码
- **JWT 认证**: 基于 RS256 算法的 JWT Token
- **CORS 支持**: 跨域请求中间件
- **内存保护**: PM2 内存超限自动重启 (200M)

## PM2 配置

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'blogserver',
    script: 'app.js',
    instances: 1,
    exec_mode: 'fork',
    max_memory_restart: '200M',
    env: { NODE_ENV: 'production' }
  }]
}
```

## Git Hooks

项目配置了 Husky + lint-staged，提交代码时会自动：
1. 运行 ESLint 检查并自动修复
2. 使用 Prettier 格式化代码

## License

MIT
