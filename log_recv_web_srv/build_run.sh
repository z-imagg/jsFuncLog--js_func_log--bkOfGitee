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

python main.py
