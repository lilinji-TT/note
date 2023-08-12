# 初识HTTP协议

1. 超文本传输协议
2. 应用层协议，基于TCP
3. 请求、响应
4. 简单可扩展
5. 无状态（不知道之前的请求是什么状态，但是有其他办法可携带一些状态）



## 发展

1. 0.9单行协议
   - 请求GET/mypage.html
   - 响应只有HTML文档
2. 1.0构建可扩展性
   - 增加了Header
   - 有了状态码
   - 支持多种文档类型
3. 1.1标准化协议
   - 链接复用
   - 缓存
   - 内容协商
4. 2更优异的表现
   - 二进制协议
   - 压缩header
   - 服务器推送
5. 3草案



## 报文

### Method

- GET：请求一个指定资源的表示形式，使用GET请求应该只被用于获取数据
- POST：用于将实体提交到指定资源，通常导致在服务器上的状态变化或者副作用
- PUT：用请求有效载荷替换目标资源的所有当前表示
- DELETE：删除指定的资源
- HEAD：请求一个与GET请求的响应相同的响应，但是没有响应体
- CONNECT：建立一个到目标资源标识的服务器隧道
- OPTIONS：用于描述目标资源的通信选项
- TRACE：沿着目标资源的路径执行一个消息环回测试
- PATCH：用于对资源应用部分修改

安全的方法：不会修改服务器的数据的方法--》GET HEAD OPTIONS

幂等：同样的请求被执行一次与连续多次的效果是一样的，服务器的状态也是一样的，所有safe的方法都是Idempotent的--》GET HEAD OPTIONS PUT DELETE



### 常用请求头

- Accept：接收类型，表示浏览器支持的MIME类型（对标服务端返回的Content-Type） 
- Content-Type：客户端发送出去的实体内容的类型
- Cache- Control：制定请求和响应遵循的缓存机制，比如no-cache
- if- MOdified-Since：对应服务端的Last-Modified，用于匹配看文件是否变动，只能精确到1s之内
- Expires：缓存控制，在这个时间内不会请求，直接使用缓存，服务端时间
- Max-age：代表资源在本地缓存多少秒，有效时间内不会请求，而是使用缓存
- if-None-Match：对应服务端的Etag，用来匹配文件内容是否改变（非常精确）
- Cookie：有cookie并且**同域**访问时回自动带上
- Refer：该页面的来源URL（适用于所有类型的请求，会精确到详细页面地址，csrf拦截常用到这个字段）
- Origin：最初的请求是从哪里发起的（只会精确到端口），Origin比Referer更尊重隐私
- User-Agent：用户客户端的一些必要信息，如UA头部等

### 常用响应头

- Content-Type：服务端饭回的实体内容的类型
- Cache- Control：指定请求和响应遵循的缓存机制，如no-cahe
- Last-Modified：请求资源的最后修改时间
- Expires：应该在什么时候认为文档已经过期，从而不再缓存它
- Max-age：客户端的本地资源应该缓存多少秒，开启了Cache- Control后有效
- Etag：资源的特定版本的标识符，Etags类似于指纹
- Set-Cookie：设置和页面关联的cookie，服务器通过这个头部，把cookie传给客户端
- Server：服务器的一些相关信息
- Access-Control-Allow-Origin：服务器端允许的请求Origin头部（譬如为*，则是允许所有）

### 缓存

#### 强缓存

- Expires，时间戳
- Cache- Control
  - 可缓存性
    - no-cache：协商缓存验证
    - no-store：不使用任何缓存
  - 到期
    - max-age：单位是秒，存储的最大周期，相对于请求的时间
  - 重新验证*重新加载
    - must- revalidate：一旦资源过期，在成功向原始服务器验证之前，不能使用

#### 协商缓存

- Etag/If-None-Match：资源的特定版本的标识符，类似于指纹
- Last-Modified/If-Modified-Since：最后修改的时间

#### cookie

Set-Cookie-response

- Name=value：各种cookie的名称和值，也就是键值对
- Path=path：限制指定Cookie的发送范围的文件目录，默认为域名
- Expires=Date：Cookie的有效期，缺省时Cookie仅在浏览器关闭之前有效
- Domain=domain：限制cookie生效的域名，默认为创建cookie的服务域名
- secure：仅在HTTPS安全连接时，才可以发送cookie
- HttpOnly：JS脚本无法获得Cookie
- SameSite=[None|Strict|Lax]：
  - None同站、跨站请求都可以发送
  - Strict仅在同站发送
  - 允许与顶级导航一起发送，并将与第三方网站发起的GET请求一起发送