# Mjolnir - 一个酷酷的 react UI 库

## 1. 图片

* 上古时期 - 雪碧图 (CSS Sprite)
* font icon
* svg icon + 完全可控
  + svg 即取即用
  + font icon 有奇怪的 bug(没加载好的时候是方框)  

    借用库 react-fontawesome

## 2. 动画组件封装

## 3. 开发痛点

### 痛点

1. cra入口文件不适合管理组件库
2. 缺少行为追踪和属性调试功能

### 需求

1. 分开展示各个组件不同属性下的状态
2. 能追踪组件的行为并且具有属性调试功能
3. 为组件生成文档和属性列表 - story book

## 4. storybook addon

1. 样式修饰器
2. native addon

https://storybook.js.org/addons/
 1. 对action做响应
 2. knobs 对手动输入属性做响应
 3. info-addon

## Input

1. 分析属性

``` jsx
<Input
  disabled
  size="lg|sm"
  icon="fontwesome 支持的图标"
  prepand="input 前缀，string 或者 ReactElement"
  append="input 后缀，string 或者 ReactElement"
  {...restProps} 支持其他所有的HTMLInput属性
/>
```

2. Omit 忽略指定类型中某个属性

## Upload

1. fetch 

缺点

1. 只对网络请求报错，对400，500当作成功
2. 默认不带cookie，需要配置头部
3. 不支持abort，不支持超时控制
4. 没有onProcess，不支持进度监控

2. 上传文件
* ajax 异步上传
* form
  + multipart/form-data 上传二进制文件最好的格式
  + application/x-www-form-urlencoded 表单默认，大量二进制很低效
  + text/plain

## rimraf 跨平台删除工具

## cross-env 跨平台设置环境变量

## npm link

让项目依赖link到本地目录
