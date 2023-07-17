```
GET http://127.0.0.1:8000/group/list/            // 获取员工列表

POST http://127.0.0.1:8000/group/add/            // 新增员工
    参数：realName
    返回值：userName, realName, role, isActive, activationCode																	
    
DELETE http://127.0.0.1:8000/group/delete/:id/   // 删除员工

PATCH http://127.0.0.1:8000/group/update/:id/    // 修改员工
    要求：params中传数据
    参数：newRealName
    返回值：id, userName, realName, role, isActive, activationCode

GET http://127.0.0.1:8000/room/list/             // 获取房间列表

POST http://127.0.0.1:8000/room/add/             // 新增房间
    参数：type, number, price
    返回值：id, type, number, price, status
DELETE http://127.0.0.1:8000/room/delete/id/     // 删除房间

PATCH http://127.0.0.1:8000/room/update/id/      // 修改房间
    参数：newType, newNumber, newPrice (这三都传一下，不然后端太麻烦了我还没想到简单的处理)
    返回值：id, type, number, price, status

POST http://127.0.0.1:8000/member/register/      // 员工注册
    参数：userName, passWord, activationCode
    返回值：id, userName, realName, role

POST http://127.0.0.1:8000/public/login/         // 登录模块
    参数：userName, passWord
    返回值：id, userName, realName, role

POST http://127.0.0.1:8000/public/forget/        // 忘记密码
    参数：userName, activationCode, newPassword
    返回值：无

POST http://127.0.0.1:8000/public/update/        // 修改密码
    参数：userName, activationCode, newPassword, oldPassword

GET http://127.0.0.1:8000/public/list/           // 获取历史订单

GET http://127.0.0.1:8000/order/on_list/         // 获取进行中订单

POST http://127.0.0.1:8000/order/add/            // 新增订单
    参数：roomId, type, number, customName, idCard, phone, handlerName
    返回值：id, roomId, type, number, customName, idCard, phone, handlerName, status, fee, checkInDate, checkOutDate

POST http://127.0.0.1:8000/order/cal/            // 计算费用
    参数：id
    返回值：订单费用

PATCH http://127.0.0.1:8000/order/finish/id/     // 结束订单
    返回值：id, roomId, type, number, customName, idCard, phone, handlerName, status, fee, checkInDate, checkOutDate

```

