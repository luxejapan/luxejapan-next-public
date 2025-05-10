# 开发规范

> 相关文档：
> - [项目需求书](../Requirements.md)
> - [UI 组件设计规范](./UI-COMPONENTS.md)
> - [动画指南](./ANIMATION-GUIDE.md)
> - [SEO 策略](./SEO-STRATEGY.md)
> - [多语言实现](./I18N-IMPLEMENTATION.md)
> - [部署文档](./DEPLOYMENT.md)

## 目录
1. [项目特点](#1-项目特点)
2. [代码规范](#2-代码规范)
3. [多语言实现](#3-多语言实现)
4. [SEO 优化](#4-seo-优化)
5. [性能优化](#5-性能优化)
6. [UI 规范](#6-ui-规范)
7. [资源管理](#7-资源管理)
8. [状态管理](#8-状态管理)
9. [路由配置](#9-路由配置)
10. [测试规范](#10-测试规范)
11. [开发环境配置](#开发环境配置)
12. [项目结构](#项目结构)
13. [开发流程](#开发流程)
14. [自动化流程](#自动化流程)
15. [安全规范](#安全规范)
16. [文档规范](#文档规范)
17. [版本管理](#版本管理)

## 1. 项目特点
- 静态网站
- 多语言支持（繁中/英/西班牙/韩文/越南文）
- 基于 Next.js 14 + TypeScript + Tailwind CSS
- 部署于 GitHub Pages

## 2. 代码规范

### 2.1 文件组织
```
src/
├── app/
│   ├── [lang]/           # 多语言路由
│   │   ├── page.tsx     # 首页
│   │   ├── about/       # 关于我们
│   │   ├── services/    # 服务项目
│   │   ├── reservation/ # 预约服务
│   │   └── contact/     # 联系我们
│   └── layout.tsx       # 布局组件
├── components/          # 组件
│   ├── Header.tsx      # 页头
│   ├── Footer.tsx      # 页脚
│   └── LanguageSwitcher.tsx # 语言切换
├── lib/                # 工具函数
│   ├── i18n.ts        # 国际化
│   └── metadata.ts    # SEO
└── styles/            # 样式
    └── globals.css    # 全局样式
```

### 2.2 命名规范
- 页面组件：使用 kebab-case（如 `about-page.tsx`）
- 通用组件：使用 PascalCase（如 `Header.tsx`）
- 样式类名：使用 Tailwind 类名
- 多语言键名：使用点号分隔（如 `about.title`）

### 2.3 代码风格
```typescript
// 页面组件示例
export default function AboutPage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold">
        {t('about.title')}
      </h1>
    </div>
  );
}
```

## 3. 多语言实现

### 3.1 语言配置
```typescript
export const languages = {
  'zh-tw': { name: '繁體中文', code: 'zh-TW' },
  'en': { name: 'English', code: 'en' },
  'es': { name: 'Español', code: 'es' },
  'ko': { name: '한국어', code: 'ko' },
  'vi': { name: 'Tiếng Việt', code: 'vi' }
};
```

### 3.2 翻译文件组织
```
public/
└── locales/
    ├── zh-tw.json
    ├── en.json
    ├── es.json
    ├── ko.json
    └── vi.json
```

### 3.3 路由实现
- 使用 `[lang]` 动态路由
- 默认重定向到 `zh-tw`
- 实现语言切换时保持当前页面

## 4. SEO 优化

### 4.1 Meta 标签
```typescript
export const metadata = {
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
};
```

### 4.2 多语言 SEO
- HTML lang 属性
- hreflang 标签
- 语言切换链接
- 内容本地化

### 4.3 结构化数据
- Organization 标记
- Service 标记
- LocalBusiness 标记
- Open Graph 标签
- Twitter Cards

## 5. 性能优化

### 5.1 图片优化
- 使用 `next/image`
- 实现响应式图片
- 使用 WebP 格式

### 5.2 加载优化
- 静态生成（SSG）
- 图片懒加载
- 字体优化

### 5.3 性能指标
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Total Blocking Time: < 200ms

## 6. UI 规范

### 6.1 设计系统
- 颜色系统
  ```css
  :root {
    --primary: #9E2A2B;    /* 深酒红 */
    --secondary: #EDE6E3;  /* 米白 */
    --text: #333333;      /* 深灰 */
  }
  ```

- 字体系统
  ```css
  :root {
    --font-sans: 'Noto Sans TC', sans-serif;
    --font-size-base: 16px;
    --line-height-base: 1.5;
  }
  ```

### 6.2 响应式设计
- 移动优先
- 断点设置：
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px

### 6.3 组件规范
- 导航栏
- 语言切换器
- 服务卡片
- 联系表单

## 7. 资源管理

### 7.1 图片资源
- 首页背景图：1920x1080px
- 服务卡片图：800x600px
- 头像图片：400x400px
- 所有图片需提供 WebP 格式
- 使用 next/image 组件
- 实现响应式图片
- 懒加载策略
- 图片压缩要求

### 7.2 字体资源
- 主要字体：Noto Sans TC
- 备用字体：sans-serif
- 使用 next/font
- 字体子集化
- 预加载策略

### 7.3 图标资源
- 使用 SVG 图标
- 图标尺寸规范
- 颜色继承机制
- 图标组件化
- 动态加载策略
- 缓存机制

## 8. 状态管理

### 8.1 全局状态
- 语言状态
  - 当前语言
  - 语言切换
  - 持久化存储
- 主题状态
  - 暗色/亮色模式
  - 主题切换
  - 持久化存储

### 8.2 页面状态
- 表单状态
  - 预约表单
  - 联系表单
  - 表单验证
- UI 状态
  - 导航菜单
  - 模态框
  - 加载状态

## 9. 路由配置

### 9.1 路由结构
- /[lang]/ - 首页
- /[lang]/about - 关于我们
- /[lang]/services - 服务项目
- /[lang]/reservation - 预约服务
- /[lang]/contact - 联系我们

### 9.2 路由配置
- 中间件配置
  - 语言检测
  - 重定向处理
  - 缓存控制
- 页面配置
  - 静态生成配置
  - 动态路由配置
  - 页面元数据

## 10. 测试规范

### 10.1 单元测试
- 组件测试
  - 渲染测试
  - 交互测试
  - 快照测试
- 工具函数测试
  - 国际化函数
  - 格式化函数
  - 验证函数

### 10.2 E2E 测试
- 页面测试
  - 导航测试
  - 表单测试
  - 多语言测试
- 性能测试
  - 加载性能
  - 交互性能
  - 内存使用

## 开发环境配置

### 1. 编辑器配置
- VS Code 推荐插件：
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript Vue Plugin
  - GitLens
  - Error Lens

### 2. 代码规范
- TypeScript 严格模式
- ESLint 规则
- Prettier 格式化
- Git 提交规范

### 3. 开发工具链
- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Git >= 2.30.0

## 项目结构

```
src/
├── app/                    # Next.js 13+ App Router
│   ├── [lang]/            # 多语言路由
│   │   ├── page.tsx       # 首页
│   │   ├── about/         # 关于我们
│   │   ├── services/      # 服务项目
│   │   ├── reservation/   # 预约服务
│   │   └── contact/       # 联系我们
│   ├── layout.tsx         # 根布局
│   └── not-found.tsx      # 404页面
├── components/            # 组件
│   ├── common/           # 通用组件
│   ├── layout/           # 布局组件
│   └── sections/         # 页面区块组件
├── lib/                  # 工具库
│   ├── i18n/            # 国际化
│   ├── api/             # API 接口
│   └── utils/           # 工具函数
├── styles/              # 样式文件
├── types/               # 类型定义
├── hooks/               # 自定义 Hooks
└── constants/           # 常量定义
```

## 开发流程

### 1. Git 工作流
- 主分支：`main`
- 开发分支：`develop`
- 功能分支：`feature/*`
- 发布分支：`release/*`
- 修复分支：`hotfix/*`

### 2. 提交规范
```bash
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

### 3. 代码审查
- 功能完整性
- 代码质量
- 性能影响
- 安全性
- 可维护性

## 自动化流程

### 1. 代码检查
- ESLint
- TypeScript
- Prettier
- Husky

### 2. 测试
- 单元测试
- 集成测试
- E2E 测试
- 性能测试

### 3. 部署
- 自动构建
- 自动测试
- 自动部署
- 回滚机制

## 安全规范

### 1. 代码安全
- 依赖检查
- 代码扫描
- 漏洞修复
- 安全审计

### 2. 数据安全
- 数据加密
- 访问控制
- 数据备份
- 隐私保护

### 3. 部署安全
- HTTPS
- CSP
- CORS
- 防火墙

## 文档规范

### 1. 代码注释
- 函数注释
- 组件注释
- 类型注释
- 复杂逻辑注释

### 2. 文档维护
- README 更新
- API 文档
- 更新日志
- 贡献指南

### 3. 版本管理
- 语义化版本
- 更新日志
- 版本标签
- 发布说明 