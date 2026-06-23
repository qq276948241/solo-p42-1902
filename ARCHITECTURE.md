# IRON FIT 健身工作室 · 前端架构文档

## 1. 项目总览

为健身工作室打造的课程预约单页应用（SPA），包含课表浏览、教练介绍、会员价格三大核心页面。

- **目标用户**：健身工作室会员及潜在客户
- **核心功能**：课程预约、教练查看、会员卡对比
- **设计语言**：深灰（#1F2937）+ 亮绿（#22C55E）品牌色，圆角卡片风格，浅灰页面底色

---

## 2. 技术栈

| 层级 | 技术选型 | 用途 |
|---|---|---|
| 框架 | React 18 + TypeScript | 前端框架 |
| 构建工具 | Vite 6 | 开发服务器/构建 |
| 样式 | TailwindCSS 3 | 原子化 CSS |
| 路由 | React Router v7 | 单页路由 |
| 状态管理 | Zustand 5 | 全局状态（预约、课程、toast） |
| 图标 | lucide-react | 图标库 |
| 字体 | Poppins（展示） + Noto Sans SC（正文） | Google Fonts |

---

## 3. 组件树层级

```
App.tsx [根组件]
├── Navbar.tsx                  [桌面端顶部导航栏]
├── main [路由出口]
│   ├── Schedule.tsx            [首页/课表页]
│   │   ├── 周选择器
│   │   └── CourseCard.tsx × N  [课程卡片]
│   ├── Coaches.tsx             [教练介绍页]
│   │   └── CoachCard.tsx × 6   [教练卡片]
│   └── Pricing.tsx             [价格页]
│       └── PriceCard.tsx × 3   [会员卡卡片]
├── Footer                       [桌面端页脚]
├── BottomTabBar.tsx            [移动端底部Tab栏]
├── BookingModal.tsx            [预约弹窗 · 全局]
└── GlobalToast.tsx             [全局Toast提示]
```

### 组件职责划分

| 组件 | 职责 | 状态来源 |
|---|---|---|
| [Navbar.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo42/project42/src/components/Navbar.tsx) | 桌面端顶部固定导航，深灰底亮绿按钮 | React Router `NavLink` |
| [BottomTabBar.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo42/project42/src/components/BottomTabBar.tsx) | 移动端底部三Tab切换，仅 <768px 显示 | React Router `NavLink` |
| [CourseCard.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo42/project42/src/components/CourseCard.tsx) | 课程卡片渲染，展示名额、教练、时间 | `useBooking` hook |
| [BookingModal.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo42/project42/src/components/BookingModal.tsx) | 预约弹窗表单，手机号输入提交 | `useBooking` hook |
| [CoachCard.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo42/project42/src/components/CoachCard.tsx) | 教练卡片，头像+擅长方向+简介 | Props 传入 |
| [PriceCard.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo42/project42/src/components/PriceCard.tsx) | 会员卡卡片，选中高亮动效 | 本地 `useState` |
| [GlobalToast.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo42/project42/src/components/GlobalToast.tsx) | 全局提示，顶部滑入2秒消失 | Zustand store |

---

## 4. 页面路由关系

路由定义在 [App.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo42/project42/src/App.tsx#L15-L20)：

| 路由 | 页面 | 说明 |
|---|---|---|
| `/` | [Schedule.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo42/project42/src/pages/Schedule.tsx) | 首页，本周课表 |
| `/coaches` | [Coaches.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo42/project42/src/pages/Coaches.tsx) | 教练介绍页 |
| `/pricing` | [Pricing.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo42/project42/src/pages/Pricing.tsx) | 价格页 |
| `*` | Schedule.tsx | 404 兜底回首页 |

导航方式：
- **桌面端**：顶部 [Navbar.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo42/project42/src/components/Navbar.tsx) 三个文字链接 + 立即咨询按钮
- **移动端**：底部 [BottomTabBar.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo42/project42/src/components/BottomTabBar.tsx) 三个图标 Tab（课表/教练/价格）

---

## 5. 数据流走向

```
┌─────────────────────────────────────────────────────────┐
│                     Zustand Store                        │
│  [useBookingStore.ts]                                    │
│  ├─ courses[]        ← 初始 Mock 数据，扣减名额后更新    │
│  ├─ bookings[]       ← 预约记录（防重复）                │
│  ├─ isModalOpen      ← 弹窗开关                          │
│  ├─ selectedCourseId ← 选中课程ID                        │
│  ├─ phone            ← 手机号输入（同步清空）            │
│  ├─ submitting       ← 提交锁                            │
│  └─ toast            ← 全局提示                          │
└──────────────────────┬──────────────────────────────────┘
                       │
         ┌─────────────┼─────────────┐
         ▼             ▼             ▼
  useBooking hook  GlobalToast   Schedule 页
         │
  ┌──────┴──────┐
  ▼             ▼
CourseCard  BookingModal
```

### 数据分层设计

1. **持久层（Zustand Store）**：[useBookingStore.ts](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo42/project42/src/store/useBookingStore.ts)
   - 保存全局共享状态（课程、预约记录、弹窗状态、手机号、toast）
   - 路由切换不丢失数据
   - 纯函数更新，无副作用

2. **业务流程层（Custom Hook）**：[useBooking.ts](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo42/project42/src/hooks/useBooking.ts)
   - 从 store 精确 selector 订阅
   - 计算派生状态（`isFull`/`isLowStock`/`isPhoneValid`）
   - 封装副作用（ESC 快捷键、提交延迟关弹窗）
   - 对外暴露统一 API

3. **渲染层（React 组件）**：
   - 纯渲染，只负责 UI 展示和事件绑定
   - 不直接触碰 store，全部通过 `useBooking` hook 交互

---

## 6. useBooking hook 核心设计

### 6.1 核心作用

**解耦预约业务逻辑与 UI 渲染**，让 `CourseCard` 和 `BookingModal` 两个无关联组件共享同一份预约流程状态。

### 6.2 串联 CourseCard ↔ BookingModal

**场景**：用户在课表页点击 `CourseCard` → 打开 `BookingModal` → 填手机号 → 提交 → 关闭弹窗 → `CourseCard` 名额自动减一

```
CourseCard 点击
    │
    ▼
useBooking.openBooking(courseId)
    │  └─ 调用 store.openBookingModal(courseId)
    │      └─ set({ selectedCourseId, isModalOpen: true, phone: "", submitting: false })
    │         （同步清空手机号，彻底消除竞态）
    │
    ▼
BookingModal 打开（订阅 isModalOpen = true）
    │
    ▼
用户输入手机号 → useBooking.setPhone() → store 更新 phone
    │
    ▼
点击提交 → useBooking.submitBooking()
    │
    ├─ 前置校验（手机号格式、是否约满）
    │
    ├─ store.setState({ submitting: true })  加锁防重复
    │
    ├─ store.submitBooking()  扣减名额 + 记录 booking
    │
    ├─ store.showToast("success", "...")  触发顶部绿色提示
    │
    └─ setTimeout(600ms) → store.closeBookingModal()
           （延迟关弹窗，给 toast 滑出留时间）
    │
    ▼
store.courses 更新，remainingSpots 减一
    │
    ▼
Schedule 页订阅 courses，触发重渲染
    │
    ▼
CourseCard 的 getSpotStatus() 拿到最新 remaining，UI 自动更新
```

### 6.3 Hook API 一览

```typescript
const {
  // 只读状态
  selectedCourse, isModalOpen, phone, submitting,
  // 派生计算
  isPhoneValid, isFull, isLowStock, remainingSpots, totalSpots,
  // 操作方法
  setPhone, openBooking, closeBooking, submitBooking,
  // 工具方法
  getSpotStatus,
} = useBooking();
```

### 6.4 关键决策说明

| 决策 | 原因 |
|---|---|
| `phone`/`submitting` 放 store 而非 hook 局部 useState | 避免 `useEffect` 异步清空与打开弹窗的竞态，`openBookingModal` 同步清空更可靠 |
| useBooking 内部用 selector 逐个字段订阅 | 减少不必要重渲染，只有用到的字段变化才更新 |
| `submitBooking` 无参数，内部读 store.phone | 进一步解耦，组件不需要传参，调用更简单 |
| 预约成功后 600ms 延迟关弹窗 | 给全局 toast 滑出动画留足时间，用户能看到成功反馈 |

---

## 7. 移动端底部 Tab 栏适配实现

### 7.1 实现思路

**双导航系统 + CSS 响应式切换**：桌面端顶部导航和移动端底部 Tab 栏**同时存在于 DOM 树中**，通过 Tailwind 的 `hidden` / `md:flex` 媒体查询控制显示/隐藏。

### 7.2 核心代码

桌面端导航 [Navbar.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo42/project42/src/components/Navbar.tsx#L31)：
```tsx
<nav className="hidden md:flex items-center gap-1">
  {/* 桌面端才显示的链接 */}
</nav>
```

移动端 Tab [BottomTabBar.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo42/project42/src/components/BottomTabBar.tsx#L14)：
```tsx
<nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden ...">
  {/* 只在移动端显示，fixed 底部吸附 */}
</nav>
```

页面底部安全距离 [Schedule.tsx](file:///d:/code/ai-prompt/solo-chrome-dev-F12/repos/repo42/project42/src/pages/Schedule.tsx#L44)：
```tsx
<div className="min-h-screen pb-24 md:pb-16">
  {/* pb-24（移动端留底部Tab空间）md:pb-16（桌面端正常） */}
</div>
```

### 7.3 选中状态动效

使用 `NavLink` 的 render props 获取 `isActive` 状态，选中时：
- 图标放大 1.1 倍 + 绿色背景高亮
- 文字变亮绿色
- 激活时 strokeWidth 加粗（2 → 2.5）

```tsx
<NavLink to="/" end>
  {({ isActive }) => (
    <div className={isActive ? "bg-brand-500/15 text-brand-400 scale-110" : "text-ink-400"}>
      <Calendar strokeWidth={isActive ? 2.5 : 2} />
    </div>
  )}
</NavLink>
```

---

## 8. 目录结构说明

```
src/
├── components/       # 可复用UI组件
│   ├── Navbar.tsx         # 桌面端顶部导航
│   ├── BottomTabBar.tsx   # 移动端底部Tab
│   ├── CourseCard.tsx     # 课程卡片
│   ├── CoachCard.tsx      # 教练卡片
│   ├── PriceCard.tsx      # 会员卡卡片
│   ├── BookingModal.tsx   # 预约弹窗
│   └── GlobalToast.tsx    # 全局提示
├── pages/            # 页面组件（路由级）
│   ├── Schedule.tsx       # 课表首页
│   ├── Coaches.tsx        # 教练介绍页
│   └── Pricing.tsx        # 价格页
├── hooks/            # 自定义 hooks
│   └── useBooking.ts      # 预约业务流程 hook
├── store/            # Zustand 全局状态
│   └── useBookingStore.ts # 预约 store
├── data/             # Mock 数据
│   ├── courses.ts         # 21节本周课程
│   ├── coaches.ts         # 6位教练资料
│   └── memberships.ts     # 3档会员卡
├── types/            # TypeScript 类型定义
│   └── index.ts           # Course/Coach/Membership/Booking
├── lib/              # 工具函数
├── App.tsx           # 应用入口 + 路由
├── main.tsx          # React 挂载
└── index.css         # Tailwind + 全局样式 + 字体
```

---

## 9. 预约流程时序摘要

```
用户点击 CourseCard
    → openBooking(courseId)
        → store: { selectedCourseId, isModalOpen: true, phone: "" }
            → BookingModal 渲染表单
                → 用户输入 phone → setPhone() → store.phone 更新
                    → 点击提交 → submitBooking()
                        → 校验通过 → store.courses 名额 -1
                        → showToast(success)
                        → 600ms 后 closeBookingModal()
                            → CourseCard 自动显示最新名额
```
