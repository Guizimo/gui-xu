# Commit 规范和版本管理

## Commit 消息格式

本项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

### 格式
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Type 类型

- **feat**: 新功能 (feature)
- **fix**: 修复 bug
- **docs**: 文档变更
- **style**: 代码格式（不影响代码运行的变动）
- **refactor**: 重构（既不是新增功能，也不是修改bug的代码变动）
- **perf**: 性能优化
- **test**: 增加测试
- **build**: 构建过程或辅助工具的变动
- **ci**: CI/CD 配置文件和脚本的变动
- **chore**: 其他不修改src或测试文件的变动
- **revert**: 回滚之前的commit

### 示例

```bash
feat: 添加用户登录功能
fix(auth): 修复登录状态检查错误
docs: 更新README文档
style: 调整代码格式
refactor(user): 重构用户模块
perf: 优化列表渲染性能
test: 添加登录功能测试用例
build: 更新webpack配置
ci: 添加GitHub Actions
chore: 更新依赖包版本
```

## 版本管理

项目使用 `standard-version` 进行自动化版本管理和CHANGELOG生成。

### 可用命令

```bash
# 自动判断版本类型并发布
npm run release

# 指定版本类型发布
npm run release:patch   # 修订版本 (1.0.0 -> 1.0.1)
npm run release:minor   # 次版本 (1.0.0 -> 1.1.0)
npm run release:major   # 主版本 (1.0.0 -> 2.0.0)

# 预发布版本
npm run release:alpha   # Alpha版本 (1.0.0 -> 1.0.1-alpha.0)
npm run release:beta    # Beta版本 (1.0.0 -> 1.0.1-beta.0)

# 预览模式（不实际创建tag和提交）
npm run release:dry-run

# 首次发布
npm run release:first
```

### 版本规则

- **feat**: 触发 minor 版本更新
- **fix**: 触发 patch 版本更新
- **BREAKING CHANGE**: 触发 major 版本更新
- 其他类型默认触发 patch 版本更新

### Git Hooks

项目配置了以下Git hooks：

- **pre-commit**: 运行代码检查和格式化
- **commit-msg**: 验证commit消息格式

## 工作流程

1. 开发功能
2. 暂存文件：`git add .`
3. 提交代码（会自动运行hooks）：`git commit -m "feat: 添加新功能"`
4. 推送代码：`git push`
5. 发布版本：`npm run release`
6. 推送tag：`git push --follow-tags`

## 注意事项

- 提交时会自动运行ESLint和Prettier
- commit消息必须符合规范，否则提交会被拒绝
- 建议在发布前先运行 `npm run release:dry-run` 预览变更 