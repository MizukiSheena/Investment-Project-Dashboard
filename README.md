# Investment Project Dashboard

一个用于记录、筛选、排序、选择与导出投资交易项目信息的前端面板。支持项目基本信息管理、投资轮次维护、项目时间线（新项目）、文档上传与预览（含 Markdown 渲染与检索）、多格式导出（TXT/JSON/CSV）等。

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
  App.jsx                # 应用入口（Provider、Toaster、Router）
  main.jsx               # 挂载入口
  pages/
    Index.jsx            # 主面板：筛选/排序/选择/列表/新增编辑
  components/
    ProjectForm.jsx      # 新增/编辑项目表单（含投资轮次、时间线、文档）
    InvestmentRoundForm.jsx
    ProjectList.jsx      # 卡片式项目列表、律师信息、历史兼容等
    ProjectSearch.jsx    # 筛选面板
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

## 环境要求
- Node.js >= 18（建议使用 LTS 版本）
- npm >= 9 或 pnpm/yarn（任选其一）

> 注意：仓库早期文档中曾示例 Node 16，但当前 Vite 5 需 Node 18+。

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

## 环境变量（可选）
项目在 `vite.config.js` 中支持以下变量以控制发布路径：
- `CHAT_VARIABLE`：用于区分多套构建产物的路径片段
- `PUBLIC_PATH`：基础公共路径（如托管到子路径）

当 `NODE_ENV=production` 且设置了 `CHAT_VARIABLE` 时：
- `base` 会变为 `PUBLIC_PATH/CHAT_VARIABLE/`
- 构建输出目录会是 `build/CHAT_VARIABLE`

## 使用指南
1. 新增项目：点击“新增项目”，填写项目名称、部门、状态、投资主体等，必要时添加“投资轮次”“新项目时间线”。
2. 维护投资轮次：在表单中“投资轮次”处添加多轮，分别填写金额、币种、交割日期、持股比例、是否有董事/观察员等。
3. 文档管理：在“交易文件核心条款”处拖拽或选择上传文件，支持 Markdown 在线预览与关键字搜索。
4. 筛选与排序：在顶部筛选条按“名称/部门/投资主体”筛选，右侧选择排序字段与方向。
5. 批量选择与导出：展开“项目选择”，全选/单选后使用“批量导出”选择 TXT/JSON/CSV。
6. 单项目导出：项目卡片右上角“导出”下拉选择 TXT 或 JSON。

## 数据持久化
- 所有项目数据存储于浏览器 `localStorage`，键：`investment-projects`。
- 清除浏览器缓存或更换浏览器/设备会导致数据不同步；如需备份请使用导出功能。

## 部署
- 运行 `npm run build` 生成静态文件至 `build/`（或 `build/CHAT_VARIABLE`）。
- 将 `build/` 目录部署到任意静态托管（如 GitHub Pages、Vercel、Netlify、Nginx）。
- 若托管在子路径，请正确设置 `PUBLIC_PATH` 与（可选）`CHAT_VARIABLE`。

## 常见问题
- 看不到数据？确认未清空浏览器存储；或从导出的 JSON 导入（当前暂未提供导入 UI，可手动写脚本写回 localStorage）。
- 文档不展示样式？Markdown 渲染依赖浏览器端样式，确保未被 CSP 或扩展拦截。
- 端口被占用？将 `vite.config.js` 的 `server.port` 改为其他端口，或通过命令行 `PORT=xxxx npm run dev`（不同系统设置方式不同）。

## 许可（License）
- 本仓库暂未明确开源许可。如需对外开源，建议新增 `LICENSE` 文件（如 MIT）。

---

如有问题或建议，欢迎提交 Issue 或 PR。