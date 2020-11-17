## 创作分发平台

### 开发环境搭建

#### 配置hosts

根据不同操作系统，在hosts文件中添加如下配置：

``` bash
127.0.0.1	cdp.chinamcloud.cn
```

#### 配置npm源

``` bash
# npm
npm config set registry=https://registry.npm.taobao.org -g

# cnpm，使用cnpm
npm install -g cnpm

# yarn
yarn config set registry https://registry.npm.taobao.org -g
```

#### 依赖安装

将项目拉取到本地，在保证前面步骤没出问题到情况下，执行下面的代码

``` bash
yarn install
```

#### npm scripts

``` bash
# 启动本地服务预览
npm start
或
yarn start

# 构建打包
npm run build
或
yarn build

# 打包并查看包大小分析
npm run analyze
```
