#!/bin/bash

#[描述] ts_nodejs项目 编译、运行 脚本

#'-e': 任一语句异常将导致此脚本终止; '-u': 使用未声明变量将导致异常;  
set -e -u  

PrjDir=/app2/js_func_log/

#删除上次编译产物
rm -frv $PrjDir/build

[[ ! -d $PrjDir/.node_env_v20.15.1 ]] && bash /app/bash-simplify/nodejs_script/new_PrjNodejsEnv_by_nodeenv.sh $PrjDir 20.15.1

source PrjNodeJsEnvActivate.sh #激活项目nodejs环境
pnpm install #安装nodejs项目依赖

pnpm install -g rollup

rollup -c