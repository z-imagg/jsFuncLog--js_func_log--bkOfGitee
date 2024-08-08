#### 此js库项目 作为 本地依赖 链接到 js应用项目(例如cytoscape.js)
```shell
cd /app2/cytoscape.js
source PrjNodeJsEnvActivate.sh

pnpm install /app2/js_func_log/
#打印:
# dependencies:
# + js_func_log link:/app2/js_func_log/
#package.json/dependencies 新增  "js_func_log": "link:/app2/js_func_log/"


#卸载:
#手工删除 package.json/dependencies 下的  "js_func_log": "link:/app2/js_func_log/"
#pnpm install 
```