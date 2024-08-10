#!/bin/bash

#[描述] ts_nodejs项目 编译、运行 脚本

#'-e': 任一语句异常将导致此脚本终止; '-u': 使用未声明变量将导致异常;  
set -e -u  

PrjDir=/app2/js_func_log/log_recv_web_srv
PyVenvDir=$PrjDir/.venv

cd $PrjDir

[[ ! -d $PyVenvDir ]] && python3 -m venv $PyVenvDir

source $PyVenvDir/bin/activate

pip install -r requirements.txt

python main.py &

sleep 1

#写文件测试
http POST localhost:5001/funcLogFile/writeLine --raw trash,direction,srcFile,method,args,ret
http --raw 'xxx.js,func_enter,src/collection/dimensions/bounds.js,elesfn.getKey,{"arg1":11},"retVal"' POST localhost:5001/funcLogFile/writeLine #上一行的等价写法
# http --json  POST localhost:5001/funcLogFile/writeLine     name=zhangsan
# http POST localhost:5001/funcLogFile/writeLine Content-Type:application/json    name="zhangsan"
#关闭文件测试
http GET localhost:5001/funcLogFile/close  

ls -lh 
cat -n _func_log.txt

kill `pidof python`
