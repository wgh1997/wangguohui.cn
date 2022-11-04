# [wangguohui.cn](https://wangguohui.cn)

一个用 TypeScript 编写的 Next.js Markdown 博客。由[@wangguohui](https://github.com/wgh1997/)设计、建造和维护
### 使用技术栈
- [React.js](https://react.docschina.org/)
- [TypeScript](https://www.tslang.cn/)
- [Next.js](https://github.com/vercel/next.js/)
- [Reduxjs-toolkit](https://redux-toolkit.js.org)
- [React-redux](https://react-redux.js.org/)
- [Next Auth](https://next-auth.js.org/)  
- [react-markdown](https://github.com/remarkjs/react-markdown)  


### 环境变量

`.env`为本地环境变量创建一个文件。

将此文件保密，确保`.env`保留在 中`.gitignore`，不要提交到公共存储库。您将需要为开发和生产实例设置不同的环境变量。省略所有变量值的引号。

```
//.env

NEXT_PUBLIC_SITE_URL=http://localhost:3000   #http://localhost:3000为开发，设置http://wangghuohui.cn为生产
NEXT_PUBLIC_USER_EMAIL=875193607@qq.com # 您的电子邮件地址，用于身份验证和可选的关于或联系页面
NEXT_PUBLIC_OG_IMAGE_URL=https://ogimage.yourSite.vercel.app
NEXT_PUBLIC_TIMEZONE=America/Los_Angeles # 时区
```

---

### 安装依赖项
```bash
yarn
```

### 启动开发服务器

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

### 生成测试版本
创建生产构建的本地副本
```bash
yarn build
```
the run

```bash
yarn start
```


### 基于Docker 打包部署
-  编写`Dockerfile` 文件
```Dockerfile
# 1. 构建基础镜像
FROM alpine:3.15 AS base
#纯净版镜像

ENV NODE_ENV=production \
  APP_PATH=/app

WORKDIR $APP_PATH

# 使用国内镜像，加速下面 apk add下载安装alpine不稳定情况
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

# 使用apk命令安装 nodejs 和 yarn
RUN apk add --no-cache --update nodejs=16.17.1-r0 yarn=1.22.17-r0 

# 2. 基于基础镜像安装项目依赖
FROM base AS install

COPY package.json yarn.lock ./
RUN yarn install 

# 3. 基于基础镜像进行最终构建
FROM base

# 拷贝 上面生成的 node_modules 文件夹复制到最终的工作目录下
COPY --from=install $APP_PATH/node_modules ./node_modules

# 拷贝当前目录下的所有文件(除了.dockerignore里排除的)，都拷贝到工作目录下
COPY . .
RUN yarn add esbuild

RUN yarn build

EXPOSE 3000


CMD ["yarn", "start"]
```
- `docker` 镜像制作
```bash
# 切换都源码目录执行
docker image build -t blog .
```
- 启动容器
```bash
docker container run -d --name blog -p 80:3000 -it blog 
# -d： 后台运行容器
# -p: 前面80是本机服务器开放端口，后面3000是容器暴露出来的端口
# --name：给容器命名
```


### `github actions`自动部署
手动部署太麻烦我们这里采用`github actions`的方式自动化部署项目
这个需要在Settings/Secrets/Actions 添加secrets[key]
- ALIYUN_HOST 服务器ip
- ALIYUN_USER 登录服务器名称
- ALIYUN_PASSWORD 登录服务器密码 

```yml
name: CI

on:
  push:
    branches: [ master ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - name: Check Out
        uses: actions/checkout@v2
          
      # 使用SSH远程连接
      - name: SSH Remote Commands
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.ALIYUN_HOST }}
          username: ${{ secrets.ALIYUN_USER }}
          password: ${{ secrets.ALIYUN_PASSWORD }}
          script: cd wangguohui.cn&&git pull origin master&&sudo docker stop blog&&sudo docker rm blog&&sudo docker rmi blog&&sudo docker image build -t blog .&&sudo docker container run -d --name blog -p 80:3000 -it blog 

```
script 命令含义
- cd wangguohui.cn 进入到  储存页面目录
- git pull origin master pull 最新代码
- sudo docker stop blog 停止前端docker容器
- sudo docker rm blog 删除前端docker容器
- sudo docker rmi blog 删除前端docker镜像
- sudo docker image build -t blog . 打包镜像
- sudo docker container run -d --name blog -p 80:3000 -it blog 启动容器
---

## 功能:

- [Next/Image Component](#nextimage-component)
- [Code Line Highlighting](#code-line-highlighting)
- [Heading Anchors](#heading-anchors)
- [Link Behavior](#link-behavior)
- [iFrame Embeds](#iframe-embeds)

### Next/Image 图像组件
`Next/Image`通过在 Markdown Alt 中使用自定义元字符串来利用Markdown 中的功能。保留纯 Markdown 的简洁性，同时获得 Next/Image 组件的好处，而无需混入 JSX。

```
![AltText {caption: Photo credit: Some Person}{priority}{768x432}](/path-to-image.jpg)
```

- 定义图像宽度和高度：`{Width x Height}`
- 可选择将图像设置为`{priority}`对首屏图像使用 Next.js 预加载。
- 添加显示在图像下方的可选标题。

### 代码行高亮
` ```JSX {3,5-8} ... `
- 使用语言声明后跟此 JSON 元字符串后的空格单独突出显示特定代码行。突出显示单个行和/或一系列连续行，以逗号分隔。

### 航向锚
- 博客文章中的 H3 标题会根据标题内容从生成的 slug 中自动生成锚链接。无缝处理`code`内部标题。
### 链接行为
```
[internal link](/blog/my-blog-post)
[external link](https://example.com)
```
- 外部链接将自动呈现`target="_blank" rel="noopener noreferrer"`并在新选项卡中打开
- 内部链接正常处理

### iFrame Embed Support
- Out of the box configuration of iframe embeds within markdown.
- Uses [Rehype Raw](https://github.com/rehypejs/rehype-raw). Disable if using this code in a way where you may not be able to trust the markdown.

---

