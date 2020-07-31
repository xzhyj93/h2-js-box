## 功能介绍
【Chrome插件】用于在本地编写与存储一些简单的JS脚本并运行

## 安装
1. 下载chrome插件安装包 [releases](https://github.com/xzhyj93/h2-js-box/releases)
2. 解压缩
3. Chrome 浏览器中打开 chrome://extensions，打开开发者模式，点击“加载已解压的扩展程序”，选择解压的目录。 即可在 Chrome 中添加此扩展。

## 用法
![img](https://raw.githubusercontent.com/xzhyj93/h2-js-box/master/help.png)
1. 新增脚本文件
2. 输入文件名，不可与已有文件名重复
3. 编写代码, 使用print() 函数输出结果
4. 执行
5. 在结果区查看输出

> 本地脚本文件（非示例代码）修改后会自动保存在本地。

## 开发调试
1. 下载本仓库

```
git@github.com:xzhyj93/h2-js-box.git
```

2. dev 环境

```
# 安装依赖
npm install

# 本地调试 dev
npm start
```

Chrome 浏览器中打开 chrome://extensions，打开开发者模式，点击“加载已解压的扩展程序”，选择下载仓库下 extension/dev/ 目录
本地默认开启 localhost:8222，若想修改端口号，需要：
 - 更改 @/src/.umirc.local.ts 中 port 值
 - 修改 extension/dev/ 目录下 manifest.json 和 popup.html 中对应位置

3. build

```
# 编译。生成 dist 目录
npm run build
```

Chrome 浏览器中打开 chrome://extensions，打开开发者模式，点击“加载已解压的扩展程序”，选择编译生成的 dist 目录
