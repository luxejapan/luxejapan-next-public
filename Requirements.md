# LuxeJapan 静态网站开发需求书（Next.js 重构）

> 相关文档：
> - [开发规范](./docs/DEVELOPMENT.md)
> - [UI 组件设计规范](./docs/UI-COMPONENTS.md)
> - [动画指南](./docs/ANIMATION-GUIDE.md)
> - [SEO 策略](./docs/SEO-STRATEGY.md)
> - [多语言实现](./docs/I18N-IMPLEMENTATION.md)
> - [部署文档](./docs/DEPLOYMENT.md)

## 🎯 项目目标

重构 [luxejapan-public](https://luxejapan.github.io/luxejapan-public/#/zh-tw/about) 静态网站，使用 Next.js 14 + TypeScript + Tailwind CSS 开发，实现原网站 100% 一致画面与行为，并部署于 GitHub Pages。

### 核心目标
- 完全重现视觉与结构
- 多语版本分页（繁中 / 英 / 西班牙/韩文/越南文）
- 最佳化 SEO，多国语言对应
- 静态生成（SSG）确保最佳性能
- 轻量级实现，避免过度工程化

## 🧱 技术规格

### 核心技术栈
- **框架**：Next.js 14（App Router）
- **语言**：TypeScript 5.x
- **样式**：Tailwind CSS
- **部署**：GitHub Pages + GitHub Actions
- **域名**：自定义域名（如 luxejapan.site）

## 📁 项目目录结构

```
src/
├── app/
│   ├── [lang]/                    # 动态路由处理多语言
│   │   ├── page.tsx              # 首页
│   │   ├── about/
│   │   ├── services/
│   │   ├── reservation/
│   │   └── contact/
│   ├── layout.tsx                # 全站共用布局
│   └── not-found.tsx            # 404页面
├── components/                   # 通用元件
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── LanguageSwitcher.tsx
├── lib/                         # 工具函数
│   ├── i18n.ts                  # 国际化配置
│   └── metadata.ts              # SEO元数据生成
├── public/                      # 静态资源
│   ├── images/                  # 优化后的图片
│   └── locales/                 # 多语言文本
└── styles/                      # 样式文件
    └── globals.css
```

## 🌐 多语言实现

### 语言配置
```typescript
export const languages = {
  'zh-tw': { name: '繁體中文', code: 'zh-TW' },
  'en': { name: 'English', code: 'en' },
  'es': { name: 'Español', code: 'es' },
  'ko': { name: '한국어', code: 'ko' },
  'vi': { name: 'Tiếng Việt', code: 'vi' }
} as const;
```

### 路由结构
- 使用 `[lang]` 动态路由
- 默认重定向到 `zh-tw`
- 实现语言切换时保持当前页面

## 🔍 SEO 优化策略

### 1. 元数据配置
```typescript
export async function generateMetadata({ params: { lang } }) {
  return {
    title: {
      template: '%s | Luxe Japan',
      default: 'Luxe Japan - 高端日本伴游服务'
    },
    description: '...',
    alternates: {
      languages: {
        'zh-tw': 'https://luxejapan.site/zh-tw',
        'en': 'https://luxejapan.site/en',
        // ...其他语言
      }
    }
  }
}
```

### 2. 关键 SEO 优化
- 实现 `robots.txt` 和 `sitemap.xml`
- 添加结构化数据（Schema.org）
- 实现 Open Graph 和 Twitter Cards
- 确保所有图片都有 alt 文本
- 实现规范的 URL 结构

### 3. 性能优化
- 使用 `next/image` 进行图片优化
- 实现图片的响应式加载
- 使用 `next/font` 优化字体加载
- 实现静态生成（SSG）

## 🚀 部署流程

### 1. 双仓库策略
```yaml
# 仓库结构
- luxejapan-private/    # 私有仓库：完整源代码
  ├── src/             # 源代码
  ├── .github/         # GitHub Actions 配置
  └── package.json     # 项目依赖

- luxejapan-public/    # 公开仓库：仅部署文件
  ├── out/            # 构建输出
  └── CNAME          # 自定义域名配置
```

### 2. 版本控制与部署策略
```yaml
# 私有仓库分支策略
main          # 主分支，用于开发
staging      # 预发布分支，用于测试
release/*    # 发布分支，用于标记稳定版本

# 发布流程
1. 开发在 main 分支进行
2. 功能完成后合并到 staging 分支测试
3. 测试通过后，创建 release 分支
4. 触发自动部署到公开仓库
```

### 3. GitHub Actions 配置
```yaml
# .github/workflows/deploy.yml
name: Deploy to Public Repository
on:
  push:
    branches:
      - 'release/*'  # 仅当推送到 release 分支时触发部署

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - name: Deploy to Public Repository
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: out
          repository-name: luxejapan/luxejapan-public
          token: ${{ secrets.PUBLIC_REPO_TOKEN }}
```

### 4. 本地开发环境
```bash
# 1. 克隆私有仓库
git clone git@github.com:luxejapan/luxejapan-private.git
cd luxejapan-private

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

### 5. 发布流程
1. 开发与测试：
   - 在 `main` 分支进行开发
   - 使用 `npm run dev` 本地测试
   - 提交代码并推送到 `main` 分支

2. 预发布测试：
   - 合并 `main` 到 `staging` 分支
   - 在 `staging` 分支进行完整测试
   - 确保所有功能正常

3. 发布稳定版本：
   - 创建 `release/v1.0.0` 分支
   - 触发自动部署到公开仓库
   - 验证公开仓库的部署状态

4. 版本管理：
   - 使用语义化版本号
   - 在 release 分支添加版本标签
   - 维护更新日志

### 6. 环境变量配置
```env
# .env.local（私有仓库）
NEXT_PUBLIC_SITE_URL=https://luxejapan.site
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# .env.development.local（本地开发）
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 7. 安全配置
- 私有仓库：
  - 设置仓库为私有
  - 限制协作者访问权限
  - 保护主分支和 release 分支
  - 启用分支保护规则

- 公开仓库：
  - 仅包含构建后的静态文件
  - 不包含源代码和敏感信息
  - 启用 GitHub Pages
  - 配置自定义域名

### 8. 自定义域名配置
1. 在公开仓库的 `public/CNAME` 中添加域名
2. 配置 DNS 记录指向 GitHub Pages
3. 在公开仓库设置中启用自定义域名

## 🎨 设计规范

### 品牌色彩
| 用途 | HEX 色码 | 说明 |
|------|----------|------|
| 品牌主色 | #9E2A2B | 深酒红 |
| 品牌辅助色 | #EDE6E3 | 米白 |
| 标题字色 | #333333 | 深灰 |

### 字体设定
```css
/* 使用 next/font 优化字体加载 */
import { Noto_Sans_TC } from 'next/font/google'
const notoSansTC = Noto_Sans_TC({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})
```

## 📱 响应式设计

- 移动优先设计
- 断点设置：
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px

## 🔒 安全配置

- 实现 CSP 策略
- 配置安全相关的 HTTP 头
- 实现 XSS 防护

## 📝 开发规范

- 使用 ESLint + Prettier
- 组件使用 TypeScript
- 使用语义化 HTML 标签
- 遵循 WCAG 2.1 可访问性标准 

## 📋 项目管理

### 1. 开发周期
- 阶段一：基础架构搭建（1周）
  - 项目初始化
  - 多语言框架搭建
  - 基础组件开发

- 阶段二：核心功能开发（2周）
  - 页面开发
  - 多语言内容迁移
  - 响应式适配

- 阶段三：优化与测试（1周）
  - SEO 优化
  - 性能优化
  - 兼容性测试

### 2. 里程碑
1. 项目启动：完成项目初始化和基础架构
2. Alpha 版本：完成所有页面开发
3. Beta 版本：完成多语言和响应式适配
4. RC 版本：完成优化和测试
5. 正式发布：部署到生产环境

## 🧪 测试策略

### 1. 测试范围
- 功能测试
  - 多语言切换
  - 页面导航
  - 表单提交
  - 响应式布局

- 性能测试
  - 页面加载速度
  - 图片加载优化
  - 资源加载顺序

- 兼容性测试
  - 浏览器兼容性
  - 设备兼容性
  - 分辨率适配

- SEO 测试
  - Meta 标签完整性
  - 结构化数据
  - 多语言 SEO

### 2. 测试环境
```yaml
开发环境：
- URL: http://localhost:3000
- 分支: main
- 用途: 功能开发

测试环境：
- URL: https://staging.luxejapan.site
- 分支: staging
- 用途: 功能测试

预发布环境：
- URL: https://preview.luxejapan.site
- 分支: release/*
- 用途: 验收测试

生产环境：
- URL: https://luxejapan.site
- 分支: 已发布的 release 分支
- 用途: 正式运行
```

### 3. 自动化测试
```typescript
// 单元测试示例
import { render, screen } from '@testing-library/react'
import LanguageSwitcher from './LanguageSwitcher'

describe('LanguageSwitcher', () => {
  it('should render all language options', () => {
    render(<LanguageSwitcher />)
    expect(screen.getByText('繁體中文')).toBeInTheDocument()
    expect(screen.getByText('English')).toBeInTheDocument()
  })
})
```

### 4. 测试工具
- Jest：单元测试
- Cypress：E2E 测试
- Lighthouse：性能测试
- WAVE：可访问性测试

## 🎯 质量保证

### 1. 代码质量
- ESLint 配置
```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "no-console": "warn",
    "@typescript-eslint/no-unused-vars": "error"
  }
}
```

- 提交规范
```bash
# 提交信息格式
<type>(<scope>): <subject>

# 类型说明
feat: 新功能
fix: 修复
docs: 文档
style: 格式
refactor: 重构
test: 测试
chore: 构建
```

### 2. 性能指标
- Lighthouse 分数要求：
  - Performance: > 90
  - Accessibility: > 95
  - Best Practices: > 95
  - SEO: > 95

- 加载性能要求：
  - First Contentful Paint: < 1.5s
  - Largest Contentful Paint: < 2.5s
  - Time to Interactive: < 3.5s
  - Total Blocking Time: < 200ms

### 3. 监控与日志
- 错误监控
  - 使用 Sentry 进行错误追踪
  - 配置错误报警机制

- 性能监控
  - 使用 Google Analytics 4
  - 配置核心 Web 指标监控

- 访问统计
  - 页面访问量
  - 用户行为分析
  - 多语言版本使用情况

## 🔄 发布流程

### 1. 发布检查清单
- [ ] 所有测试通过
- [ ] 性能指标达标
- [ ] SEO 优化完成
- [ ] 多语言内容完整
- [ ] 响应式适配完成
- [ ] 浏览器兼容性验证
- [ ] 文档更新完成

### 2. 回滚策略
- 保留最近 3 个版本的构建文件
- 配置快速回滚脚本
- 维护版本更新日志

### 3. 发布后验证
- 功能验证
- 性能监控
- 错误监控
- 用户反馈收集

## 📈 项目维护

### 1. 定期检查
- 每周检查性能指标
- 每月检查 SEO 排名
- 每季度进行安全审计

### 2. 更新计划
- 每月进行依赖更新
- 每季度进行功能优化
- 每年进行架构评估

### 3. 文档维护
- 保持 README 更新
- 维护更新日志
- 记录技术决策 

## 📦 版本管理

### 1. 版本号规范
```bash
# 语义化版本号格式：主版本号.次版本号.修订号
v1.0.0

# 版本号规则
- 主版本号：不兼容的 API 修改
- 次版本号：向下兼容的功能性新增
- 修订号：向下兼容的问题修正

# 预发布版本
- Alpha: v1.0.0-alpha.1
- Beta: v1.0.0-beta.1
- RC: v1.0.0-rc.1
```

### 2. 版本历史记录
```markdown
# CHANGELOG.md 格式
## [1.0.0] - 2024-03-20
### 新增
- 多语言支持
- 响应式设计

### 修复
- 修复语言切换问题
- 修复移动端显示问题

### 优化
- 提升页面加载速度
- 优化图片加载
```

### 3. 版本回滚机制
```yaml
# 回滚策略
1. 快速回滚
   - 保留最近 5 个版本的构建文件
   - 配置回滚脚本
   - 自动备份数据库（如有）

2. 回滚流程
   - 触发回滚条件：
     * 严重功能故障
     * 性能严重下降
     * 安全漏洞
   
   - 回滚步骤：
     1. 停止当前版本
     2. 恢复上一个稳定版本
     3. 验证功能完整性
     4. 通知相关团队

3. 回滚后处理
   - 记录回滚原因
   - 分析问题根源
   - 制定修复计划
```

### 4. 错误追踪与处理

#### 4.1 错误分类
```typescript
// 错误类型定义
type ErrorType = {
  level: 'critical' | 'error' | 'warning' | 'info';
  category: 'function' | 'performance' | 'security' | 'ui';
  source: 'client' | 'server' | 'third-party';
  timestamp: Date;
  userAgent: string;
  url: string;
  stack?: string;
}
```

#### 4.2 错误处理流程
```yaml
1. 错误捕获
   - 前端错误监控
   - 后端错误日志
   - 用户反馈收集

2. 错误分析
   - 错误分类
   - 影响范围评估
   - 优先级判定

3. 错误处理
   - 自动修复（如可能）
   - 人工介入
   - 用户通知

4. 错误追踪
   - 错误状态跟踪
   - 解决时间记录
   - 解决方案文档
```

#### 4.3 错误监控配置
```typescript
// Sentry 配置示例
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
  ],
});
```

### 5. 版本发布流程

#### 5.1 发布前检查
```yaml
1. 代码检查
   - 所有测试通过
   - 代码审查完成
   - 性能测试达标

2. 文档更新
   - 更新日志完成
   - API 文档更新
   - 用户文档更新

3. 部署准备
   - 环境配置检查
   - 数据库备份
   - 回滚方案确认
```

#### 5.2 发布步骤
```yaml
1. 创建发布分支
   git checkout -b release/v1.0.0

2. 更新版本号
   - package.json
   - CHANGELOG.md
   - 其他相关文件

3. 提交更改
   git commit -m "chore: release v1.0.0"

4. 创建标签
   git tag -a v1.0.0 -m "Version 1.0.0"

5. 推送到远程
   git push origin release/v1.0.0
   git push origin v1.0.0
```

#### 5.3 发布后验证
```yaml
1. 功能验证
   - 核心功能测试
   - 多语言切换
   - 响应式适配

2. 性能验证
   - 页面加载速度
   - 资源加载顺序
   - 缓存策略

3. 监控确认
   - 错误监控
   - 性能监控
   - 用户行为分析
```

### 6. 版本维护计划

#### 6.1 定期维护
```yaml
1. 每周维护
   - 检查错误日志
   - 分析性能数据
   - 更新依赖包

2. 每月维护
   - 安全漏洞扫描
   - 性能优化
   - 代码重构

3. 每季度维护
   - 架构评估
   - 技术栈更新
   - 安全审计
```

#### 6.2 紧急维护
```yaml
1. 触发条件
   - 严重安全漏洞
   - 重大功能故障
   - 性能严重下降

2. 处理流程
   - 立即评估影响
   - 制定修复方案
   - 快速发布补丁

3. 后续跟进
   - 根因分析
   - 预防措施
   - 文档更新
``` 