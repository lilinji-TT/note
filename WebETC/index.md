# WebRTC



### P2P

核心对象：PeerConnection

```js
// 兼容不同的浏览器
var PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
```

大体流程，A（呼叫方）B（应答）

A初始化，本地保存信息，发送信息给B，B应答初始化保存信息，同时保存A发送的信息，B应答，A接受应答并保存B的信息

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48a9cc63f3fc4f7d8f1778b2a19baf77~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)