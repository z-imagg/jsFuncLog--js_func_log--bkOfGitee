//函数进入、返回 配置

function calc_methodFullName(srcFilePath/* :string */,classMethodName/* :string */){

  const methodFullName/* :string */=`${srcFilePath}#${classMethodName}`
  return methodFullName
}
//配置:忽略方法名列表
const _cfg_IgnoreMethodLs/* :string */="_cfg_IgnoreMethodLs@_func_log@localStorage";//string[]
export function isIgnore_methodFullName(srcFilePath/* :string */,classMethodName/* :string */)/* :boolean */{
  const ignoreMethodLs_jsonText/* :string |null*/=localStorage.getItem(_cfg_IgnoreMethodLs);
  if(!ignoreMethodLs_jsonText){
    return false;
  }
  const ignoreMethodLs/* :string[] */=JSON.parse(ignoreMethodLs_jsonText)
  const thisMethodFullName/* :string */=calc_methodFullName(srcFilePath,classMethodName)
  const ignore/* :boolean */ = ignoreMethodLs.includes(thisMethodFullName);  
  return ignore;
}

//配置:函数返回时是否打印参数们(默认是)
const _cfg_printArgsWhenFuncRet/* :string */="printArgsWhenFuncRet@WebCola@_func_log@localStorage"; // 'true' or 'false'
export function printLog_argsWhenFuncRet( )/* :boolean */{
  const printLog_argsWhenFuncRet/* :string|null */=localStorage.getItem(_cfg_printArgsWhenFuncRet);
  const do_/* :boolean */ = printLog_argsWhenFuncRet=='true'
  return do_;
}

//函数日志忽略 默认配置
const _IgnoreMethodLs_init/* :string[] */=[
  calc_methodFullName("src/index.js", "Core.闭包.defVal")
]
function _func_log_cfg__init(){
  const _IgnoreMethodLs_init__jsonTxt/* :string */=JSON.stringify(_IgnoreMethodLs_init)
  localStorage.setItem(_cfg_IgnoreMethodLs, _IgnoreMethodLs_init__jsonTxt)
  console.log(`初始化函数日志配置`)
}

document.addEventListener('DOMContentLoaded',_func_log_cfg__init)