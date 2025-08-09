# Investment Project Dashboard

[![Pages Deploy Status](https://github.com/MizukiSheena/Investment-Project-Dashboard/actions/workflows/pages.yml/badge.svg)](https://github.com/MizukiSheena/Investment-Project-Dashboard/actions/workflows/pages.yml) [![Made with Vite](https://img.shields.io/badge/build-Vite%205-blueviolet?logo=vite)](https://vitejs.dev/) [![React 18](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)](https://react.dev/)

一个用于记录、筛选、排序、选择与导出投资交易项目信息的前端面板。支持项目基本信息管理、投资轮次维护、项目时间线（新项目）、文档上传与预览（含 Markdown 渲染与检索）、多格式导出（TXT/JSON/CSV）等。

## 在线访问
- 生产（GitHub Pages）：https://mizukisheena.github.io/Investment-Project-Dashboard/

> 若首次访问为 404 或样式异常，请等待 1–3 分钟后刷新。Pages 发布是异步的，静态资源路径已通过 `PUBLIC_PATH=/Investment-Project-Dashboard` 适配仓库子路径。

## 功能特性
- 项目管理：新增、编辑、删除项目，数据持久化在浏览器 localStorage（键：`investment-projects`）。
- 多维筛选：按“项目名称”“所属部门”“投资主体”筛选。
- 排序视图：按“项目名称 / 投资金额 / 交割日期”升降序切换。
- 批量选择：支持全选/清空，针对选中项目进行批量导出。
- 投资轮次：维护每一轮投资的金额、币种、交割日期、持股比例、董事/观察员等。
- 新项目时间线：Pre-IC、IC立项、尽调汇报、IC邮件等关键日期。
- 文档上传与预览：拖拽/选择上传 .md/.txt/.doc/.docx，支持 Markdown 渲染、关键字搜索与片段预览。
- 数据导出：
  - 单项目导出：TXT 或 JSON
  - 批量导出（选中/全部）：TXT / JSON / CSV（含简单统计信息）

## 技术栈
- 构建与框架：Vite 5 + React 18
- UI 与交互：Tailwind CSS + Radix UI（shadcn 风格组件）+ lucide-react 图标
- 状态与数据：React Hooks + TanStack Query（基础设施预置）
- 路由：React Router（HashRouter）
- 其他：date-fns、react-markdown、file-saver 等

## 目录结构（摘录）
```
src/
  App.jsx
  main.jsx
  pages/Index.jsx
  components/
    ProjectForm.jsx      # 新增/编辑项目表单（含投资轮次、时间线、文档）
    InvestmentRoundForm.jsx
    ProjectList.jsx      # 卡片式项目列表、律师信息、历史兼容等
    ProjectSearch.jsx    # 筛选面板（所属部门选项已改为 1/2）
    ProjectSelection.jsx # 批量选择
    DocumentUpload.jsx   # 文档上传
    DocumentViewer.jsx   # 文档查看（Markdown 渲染、搜索）
    ExportButton.jsx     # 导出菜单（TXT/JSON/CSV）
    ui/*                 # 基础 UI 组件集合
  hooks/
    useProjects.js       # 本地项目数据（localStorage 持久化）
    useProjectSort.js    # 排序逻辑
    useExport.js         # 导出逻辑与统计
```

## 快速开始
```bash
# 安装依赖
npm install

# 开发调试（默认端口 8080）
npm run dev

# 生产构建
npm run build

# 本地预览构建产物
npm run preview
```

访问地址（开发）：`http://localhost:8080/`

## 部署到 GitHub Pages
本仓库已内置工作流 `.github/workflows/pages.yml`，会在以下任一场景触发部署：
- 推送到 `main` 分支（push）
- 在 Actions 页面手动触发（Run workflow）

构建要点：
- 构建时设置环境变量：`PUBLIC_PATH=/Investment-Project-Dashboard`
- 产物目录：`build/`（工作流会自动打包并上传）
- 部署状态可在 Actions 中查看，首次部署通常 1–3 分钟生效

手动触发步骤：
1. 打开仓库的 Actions → 选择 “Deploy to GitHub Pages” 工作流
2. 点击 “Run workflow”，选择 `main` 分支并运行
3. 运行完成后，访问链接见上方“在线访问”

## 截图

<img width="1058" height="280" alt="image" src="https://github.com/user-attachments/assets/fc1afc81-21aa-408f-a1c6-3828a9c6186b" />
<img width="1024" height="913" alt="image" src="https://github.com/user-attachments/assets/d04d9149-b0b0-4d3a-8540-43b2d500378b" />

## 常见问题
- 页面 404 或资源 404：确认 Pages 发布已完成；或稍等后刷新。若托管在子路径，请确保 `PUBLIC_PATH` 与仓库名一致。
- 构建失败提示锁文件缺失：可改用 `npm install`；或提交 `package-lock.json` 后使用 `npm ci`。

## 许可（License）
MIT
