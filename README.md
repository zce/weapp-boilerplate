# 微信小程序骨架

> 一个为微信小程序开发准备的基础骨架

[![Build Status](https://travis-ci.org/zce/weapp-boilerplate.svg?branch=master)](https://travis-ci.org/zce/weapp-boilerplate)
[![Dependency Status](https://david-dm.org/zce/weapp-boilerplate.svg)](https://david-dm.org/zce/weapp-boilerplate)
[![devDependency Status](https://david-dm.org/zce/weapp-boilerplate/dev-status.svg)](https://david-dm.org/zce/weapp-boilerplate#info=devDependencies)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## For English

[English](./README.en.md)


## 骨架特点

- 开发阶段与生产阶段分离。
- 自动化生成新页面所需文件并添加到配置中。
- 以`Standard Code Style`校验全部的`js`和`json`文件。
- 开发阶段`json`配置文件可以有注释，方便备注。
- 代码中集成部分文档内容，减少查文档的时间。
- 开发阶段可以使用`less`完成样式编码，原因你懂得~ （如果你了解这些，当然可以支持`sass`等其他预处理样式）。
- 借助`babel`自动进行`ES2015`特性转换，放心使用新特性。
- 开发阶段用`xml`文件后缀取代`wxml`后缀，避免在开发工具中配置代码高亮。
- Source Map
- Travis CI


## 将项目克隆到本地

```bash
# 定位到任意目录
$ cd path/to/root

# 克隆仓库到指定的文件夹
$ git clone https://github.com/zce/weapp-boilerplate.git [project-name] --depth 1

# 进入指定的文件夹
$ cd [project-name]
```


## 安装项目`NPM`依赖

```bash
$ npm install
```


## 使用

### 开发阶段

执行如下命令

```bash
# 启动监视
$ npm run watch
```

通过`微信Web开放者工具`打开项目根目录下`dist`文件夹，预览~

可以通过任意开发工具完成`src`下的编码，`gulp`会监视项目根目录下`src`文件夹，当文件变化自动编译

#### 创建新页面

执行如下命令

```bash
# 启动生成器
$ npm run generate
# 完成每一个问题
# 自动生成...
```

由于微信小程序的每一个页面有特定的结构，新建工作比较繁琐。可以通过此任务减少操作。


### 生产阶段

执行如下命令

```bash
# 启动编译
$ npm run build
```

生产阶段的代码会经过压缩处理，最终输出到`dist`下。

同样可以通过`微信Web开放者工具`测试。


## 开发计划

- [x] 自动化生成新页面所需文件；
- [x] 自动生成新页面时，自动添加配置到`app.json`；
- [ ] 加入`ES2015`的`Polyfill`，支持类似`Promise`的新`API`；
- [ ] 自动刷新`微信Web开放者工具`中的预览；
- [ ] `HTML` to `WXML` 转换器，让大家可以直接使用`HTML`元素开发；


## 相关项目

[zce/weapp-demo](https://github.com/zce/weapp-demo)


## 有问题？

Welcome PR or Issue！


## 许可

MIT &copy; [汪磊](http://github.com/zce)
