<h1 align="center">Cinda Promo 后台管理系统</h1>

### 基于antd pro的工程体系

<br>

## 工程设计结构

```
- component
  - 基础公用组件和业务组件请写在component中
- model
  - dva中的数据流处理层
- pages
  - view层的路由写在/config/router.config.js 
- services
  - 统一的请求处理都放在services层中，utils/request.js 是基于 fetch 的封装
- defaultSettings
  - 公用开发配置均在src/defaultSettings.js
```

### Use bash

```bash
$ git clone 
$ cd project
$ npm i
$ npm start/run dev       # visit http://localhost:8080，默认端口8080，可在package.json中配置全局变量更改
```
