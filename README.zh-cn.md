# 微信小程序骨架

> 一个为微信小程序开发准备的基础骨架

[![Build Status](https://travis-ci.org/zce/weapp-boilerplate.svg?branch=master)](https://travis-ci.org/zce/weapp-boilerplate)
[![Dependency Status](https://david-dm.org/zce/weapp-boilerplate.svg)](https://david-dm.org/zce/weapp-boilerplate)
[![devDependency Status](https://david-dm.org/zce/weapp-boilerplate/dev-status.svg)](https://david-dm.org/zce/weapp-boilerplate#info=devDependencies)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

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


### 生产阶段

执行如下命令

```bash
# 启动编译
$ npm run build
```

生产阶段的代码会经过压缩处理，最终输出到`dist`下。

同样可以通过`微信Web开放者工具`测试。


## 许可

MIT &copy; [汪磊](http://github.com/zce)
