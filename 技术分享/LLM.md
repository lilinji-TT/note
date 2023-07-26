# LLM In Node.js

## 1.启动数据库服务（chroma为例）

#### 官方文档：克隆下来，使用docker跑起服务

```shell
git clone https://github.com/chroma-core/chroma.git
cd chroma
docker-compose up -d --build
```

##### 默认为主机的8000端口

## 2.LLM（主要）

### 迈出我们的第一步，进行一个安装

```shell
npm install LLM //应该是这个LLM
```

### 我们需要以下这些模块：

- loader：加载各种格式的文件，形成一个文档对象
- splitter：将我们的文档对象进行一个分块，形成一个个的chunks
- embedding：将我们的文档对象切片后的块进行一个向量化的编码，存储到响量数据库中
- query：在我们请求的时候使用LLM创建一个chain的实例对象，传入我们的prompt，他会在数据库中找与问题描述相似的向量进行一个相似度的匹配，将相似度最高的一同发给AI

综上所诉，我们可以通过LLM以及向量数据库的配合，让AI一定程度上可以缓解数据时效性不足的问题，让AI拥有完整的一生！（bushi