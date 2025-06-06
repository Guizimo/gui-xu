module.exports = {
  // 自定义版本号增量规则
  bumpFiles: [
    {
      filename: 'package.json',
      type: 'json'
    }
  ],
  // 自定义tag前缀
  tagPrefix: 'v',
  // 自定义commit类型映射
  types: [
    { type: 'feat', section: '✨ 新功能' },
    { type: 'fix', section: '🐛 Bug修复' },
    { type: 'docs', section: '📝 文档', hidden: true },
    { type: 'style', section: '💄 样式', hidden: true },
    { type: 'refactor', section: '♻️ 重构' },
    { type: 'perf', section: '⚡ 性能优化' },
    { type: 'test', section: '✅ 测试', hidden: true },
    { type: 'build', section: '📦 构建', hidden: true },
    { type: 'ci', section: '👷 CI/CD', hidden: true },
    { type: 'chore', section: '🔧 其他', hidden: true },
    { type: 'revert', section: '⏪ 回滚' }
  ],
  // 自定义changelog标题
  header: '# 更新日志\n\n',
  // 自定义release规则
  releaseCommitMessageFormat: 'chore(release): {{currentTag}}',
  // 跳过某些步骤
  skip: {
    bump: false,
    changelog: false,
    commit: false,
    tag: false
  }
}; 