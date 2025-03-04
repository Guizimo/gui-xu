## 项目介绍

xu-taro 是一个基于 Taro 框架开发的多端应用项目。该项目旨在提供一套高效、可靠的跨平台解决方案，支持微信小程序、H5、React Native 等多个平台。

## 技术栈

- Taro
- React
- TypeScript
- 其他相关技术...

## 安装

确保您已安装 Node.js 环境（推荐 v14 或更高版本）。

```bash
# 克隆项目
git clone https://github.com/guizimo/gui-xu.git

# 进入项目目录
cd gui-xu

# 安装依赖
npm install
# 或
yarn
```
## 开发
```bash
# 开发微信小程序
npm run dev:weapp
# 或
yarn dev:weapp

# 开发 H5
npm run dev:h5
# 或
yarn dev:h5

# 开发其他平台
npm run dev:[platform]
```
## 构建
```bash
# 构建微信小程序
npm run build:weapp
# 或
yarn build:weapp

# 构建 H5
npm run build:h5
# 或
yarn build:h5

# 构建其他平台
npm run build:[platform]
```

## 构建
```bash
# 构建微信小程序
npm run build:weapp
# 或
yarn build:weapp

# 构建 H5
npm run build:h5
# 或
yarn build:h5

# 构建其他平台
npm run build:[platform]
 ```

## 项目结构
```
xu-taro/
├── config/               // 项目配置文件
├── src/                  // 源代码
│   ├── assets/           // 静态资源
│   ├── components/       // 公共组件
│   ├── pages/            // 页面
│   ├── services/         // 服务
│   ├── utils/            // 工具函数
│   ├── app.config.ts     // 全局配置
│   ├── app.scss          // 全局样式
│   ├── app.tsx           // 入口文件
│   └── index.html        // H5 模板
├── types/                // 类型定义
├── .editorconfig         // 编辑器配置
├── .eslintrc             // ESLint 配置
├── .gitignore            // Git 忽略文件
├── babel.config.js       // Babel 配置
├── package.json          // 项目依赖
├── project.config.json   // 小程序项目配置
├── tsconfig.json         // TypeScript 配置
└── README.md             // 项目说明
```
## 贡献指南
1. Fork 本仓库
2. 创建您的特性分支 ( git checkout -b feature/amazing-feature )
3. 提交您的更改 ( git commit -m 'Add some amazing feature' )
4. 推送到分支 ( git push origin feature/amazing-feature )
5. 打开一个 Pull Request
## 许可证
MIT