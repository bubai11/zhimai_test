# 智汇广金微信小程序

## 项目介绍

智汇广金是一个面向广东金融学院学生的综合服务平台小程序，提供活动管理、信息资讯等功能。

## 主要功能

- **活动管理**
  - 二课活动展示与报名
  - 综测活动管理
  - 活动筛选与搜索
  - 活动详情查看

- **信息资讯**
  - 校园新闻
  - 通知公告
  - 资讯分类
  - 信息搜索

## 技术栈

- 微信小程序原生开发
- WXML + WXSS + JavaScript
- 云开发

## 项目结构

```
test1/
├── pages/              # 页面文件
│   ├── activity/       # 活动相关页面
│   ├── info/          # 信息资讯页面
│   └── ...
├── components/         # 自定义组件
├── assets/            # 静态资源
├── subPackages/       # 分包
├── cloudfunctions/    # 云函数
├── iconfont/          # 图标文件
└── app.js            # 小程序入口文件
```

## 开发环境

- 微信开发者工具
- Node.js >= 14.0.0
- npm >= 6.0.0

## 本地开发

1. 克隆项目
```bash
git clone [仓库地址]
cd test1
```

2. 使用微信开发者工具打开项目

3. 在开发者工具中配置以下信息：
   - AppID：在 `project.config.json` 中配置
   - 云开发环境：在云开发控制台创建

## 开发规范

- 遵循微信小程序开发规范
- 使用 ESLint 进行代码规范检查
- 组件化开发
- 分包加载

## 部署

1. 在微信开发者工具中进行测试
2. 提交代码审核
3. 发布小程序

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 版本历史

- v1.0.0 (2024-04-02)
  - 初始版本发布
  - 实现基础活动管理功能
  - 实现信息资讯展示

## 维护者

- 智汇广金项目组

## 许可证

本项目采用 MIT 许可证 