# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI-powered SaaS application built on Next.js 15 (App Router) that provides AI image and video generation capabilities. The app is based on the PixMind template.

## Development Commands

```bash
# Development
pnpm dev                    # Start dev server on port 3006
pnpm build                  # Build for production
pnpm start                  # Start production server
pnpm lint                   # Run ESLint

# Analysis & Deployment
pnpm analyze                # Analyze bundle size
pnpm cf:build               # Build for Cloudflare Pages
pnpm cf:preview             # Preview Cloudflare deployment
pnpm cf:deploy              # Deploy to Cloudflare Pages
docker build -f Dockerfile -t pixmind-template-one:latest .  # Build Docker image
```

## Technology Stack

- **Framework**: Next.js 15 with App Router, React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4, Shadcn UI components
- **Internationalization**: next-intl (supports `en` and `zh`)
- **Authentication**: NextAuth.js with Google OAuth
- **State Management**: React Context (see `contexts/`)
- **Notifications**: Sonner for toasts
- **AI Services**: Multiple AI providers via Vercel AI SDK
- **Database**: Supabase (PostgreSQL)

## Project Architecture

### Key Directories

```
app/
  [locale]/              # Locale-specific pages (en, zh)
    (default)/           # Main app pages (landing, tools)
    (admin)/             # Admin dashboard
    (console)/           # User console (my-profile, my-orders, etc.)
  api/                   # API routes
lib/                     # Utility libraries
components/
  blocks/               # Reusable page sections (hero, features, etc.)
  ui/                   # Shadcn UI components
  dashboard/            # Dashboard-specific components
  console/              # User console components
contexts/
  app.tsx               # Global app state
  auth-context.tsx      # Authentication state
i18n/
  messages/             # Global translations (en.json, zh.json)
  pages/landing/        # Landing page translations
  request.ts            # next-intl configuration
types/                  # TypeScript definitions
```

### Authentication Architecture

Uses NextAuth.js (Auth.js) with:
- Google OAuth provider
- Session-based authentication
- Server-side session management
- Protected routes via middleware

### Internationalization (i18n)

- Uses `next-intl` with App Router
- Supported locales: `en`, `zh` (Chinese simplified)
- Route structure: `app/[locale]/(group)/page.tsx`
- Translations:
  - Global: `i18n/messages/{locale}.json`
  - Page-specific: `i18n/pages/{page}/{locale}.json`
- Locale normalization: `zh-CN` → `zh` in `i18n/request.ts`

### Payment Integration

- Stripe integration for subscriptions and one-time payments
- Client-side with `@stripe/stripe-js`
- Endpoints: `/api/checkout`

## Environment Variables

Required environment variables (see `.env.example` if exists, or `.env`):

```bash
# Supabase
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# NextAuth
AUTH_SECRET=...
AUTH_GOOGLE_ID=...
AUTH_GOOGLE_SECRET=...

# Stripe
STRIPE_PUBLIC_KEY=...
STRIPE_PRIVATE_KEY=...
STRIPE_WEBHOOK_SECRET=...

# Storage (AWS S3 compatible)
STORAGE_ENDPOINT=...
STORAGE_REGION=...
STORAGE_ACCESS_KEY=...
STORAGE_SECRET_KEY=...
STORAGE_BUCKET=...
STORAGE_DOMAIN=...
```

## Code Conventions (from .cursorrules)

- **Components**: Functional components in CamelCase
- **Styling**: Tailwind CSS utility classes
- **UI Library**: Shadcn UI components (in `components/ui/`)
- **State**: React Context for global state
- **Types**: Define in `types/` directory, organized by domain
- **Responsive**: Always implement responsive design
- **Internationalization**: Use `useTranslations()` from next-intl

## Important Patterns

### Using Translations

```typescript
import { useTranslations } from 'next-intl'

function MyComponent() {
  const t = useTranslations('namespace')
  return <div>{t('key')}</div>
}
```

## Common Issues

1. **Auth Issues**: Check NextAuth configuration and Google OAuth credentials
2. **i18n Missing Keys**: Ensure keys exist in both `en.json` and `zh.json`
3. **Image Upload Failures**: Verify storage credentials are properly configured

## Testing & Debugging

- **Logging**: Console logging in development
- **Dev Tools**: Next.js Fast Refresh, React DevTools

## Path Aliases

Uses `@/*` for absolute imports:
```typescript
import { Button } from '@/components/ui/button'
```

## Production Build Notes

- Output mode: `standalone` (for Docker/serverless)
- MDX support enabled
- Console logs removed in production (except errors/warnings)
- Image optimization with Next.js Image component

### Coding Rules
1. 不要自作聪明瞎写代码，写代码前要先确认方案再执行
2. 不要添加冗余代码，比如各种无关的校验，只做必要的校验
3. 精简代码，如果之前已经有的功能、组件或者函数，可以考虑重构 和 抽象
4. 不要瞎改之前的代码，要先确认改完不会影响其他功能，比如之前的代码有问题，但是现在没有问题，不要瞎改，如果有不确定的可以跟用户确认
5. 不要重复造轮子，比如之前已经有了一个类似的功能，不要重复造轮子
6. 有参考文档，比如接口文档或者官方示例文档，严格按照示例文档写代码，不要自由发挥
7. 打印调试日志要清晰，每一个步骤都要打印正确的上下文信息
8. 不要硬编码可配置信息，要写到环境变量文件.env中
9. 首先要考虑快速简单的完成任务，别搞些复杂的东西
10. 不要做任何格式化代码的操作
11. 不准在启动服务, 不得占用3006端口
12. 每次写完功能后通过api调用或者网页请求或者chrome devtools mcp测试功能正确性，测试正确后清理日志等信息。
13. 通过 chrome devtools mcp 进行调试时，禁止关闭当前用户正在使用的实例，通过isolated启动一个新实例。