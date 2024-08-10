## 函数日志接受web服务 

### 使用步骤

#### 1.启动web服务

```shell
pip install -r requirements.txt
python main.py
```

#### 2.客户端发送日志

```shell
#写一行日志
http POST localhost:5001/funcLogFile/writeLine --raw trash,direction,srcFile,method,args,ret

#写一行日志
http --raw 'xxx.js,func_enter,src/collection/dimensions/bounds.js,elesfn.getKey,{"arg1":11},"retVal"' POST localhost:5001/funcLogFile/writeLine #上一行的等价写法

#关闭日志文件
http GET localhost:5001/funcLogFile/close  

#关闭 日志接受web服务
kill `pidof python`
```