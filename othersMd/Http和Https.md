# Http和Https

### ###HTTP协议，即是超文本传输协议，是一个基于TCP/IP通信协议来传递明文数据的协议，默认端口是80.但是它存在以下几个问题：

- #### 请求信息是明文传输，容易被窃听截取
- #### 没有验证对方身份，存在被冒充的风险

- #### 数据完整性未校验，容易被截取篡改

- #### ###针对以上问题提出了Https

- #### ###Https，就是HTTP的安全版，是以安全为目标的HTTP通道，即是HTTP下加入了SSL（Secure Socket Layer，安全套接层），在HTTP的基础上进行了加密，默认 

- ​          端口是443.

- #### ###大体概念就是Https = HTTP + SSL/TLS ，也就是用SSL/TLS对数据进行加密和解密，HTTP进行传输。

- #### ###SSL是网络通信提供安全及数据完整性的一种协议，TLS是在两个通信[应用程序](Https://baike.baidu.com/item/应用程序/5985445)之间提供保密性和[数据完整性](Https://baike.baidu.com/item/数据完整性/110071)，是SSL3.0的后续版本。

### ###具体加密流程大致如下：

#### 1.客户端发起Https请求，连接到服务器的443端口

#### 2.服务器必须有一套数字证书（其中包含：公钥 、证书颁发机构 、 失效日期等）

#### 3.服务器将自己的数字证书发送给客户端（公钥在证书中，私钥由服务器提供）

#### 4.客户端收到数字证书后，会验证其合法性。如果通过验证，就会生成一个随机的对称密钥，用证书的公钥加密

#### 5.客户端将公钥加密后的密钥发送到服务器

#### 6.服务器收到客户端发来的密文密钥之后，用自己之前保留的私钥对其进行非对称解密，解密后就可以得到客户端的密钥信息，然后用客户端密钥对返回的数据进行对称加密，这样传输的数据都是密文

#### 7.服务器将加密后的密文返回给客户端

#### 8.客户端收到后，用自己的密钥对其进行解密，得到服务器返回的数据

#### 上述提到的数字证书，是指在互联网通讯中标志通讯各方身份信息的一个数字认证，我们可以在网上用它来识别对方的身份，这样是为了避免身份被篡改冒充，比如在Https中就是为了避免公钥被中间人冒充篡改。

## **###对称加密：指加密解密使用同一密钥，优点是运算速度比较快，缺点就是如何安全的将密钥传输给另一方。常见的对称加密算法有DES  、 AES等。**

## **###非对称加密：加密解密不用同一密钥（即公钥私钥）。公钥和私钥是成对存在的，如果用公钥对数据进行加密，只有对应的私钥才能解密，常见的非对称加密算法有RSA。**

