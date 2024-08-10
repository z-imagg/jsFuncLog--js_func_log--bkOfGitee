//函数进入、返回打印日志

import { isIgnore_methodFullName,printLog_argsWhenFuncRet} from './_func_log_cfg.js'
import {writeLine_funcLogFile,close_funcLogFile} from './log_recv_web_srv__client.js'

//对象转json文本包装函数(因为该过程可能报错)
function _JSON_stringify_wrap(obj/* :any */)/* :string */{
  //若obj为null|undefine , 则设置为空串
  if(!obj){
    obj=""
  }

  let jsonTxt/* :string */ = "";
  try{
    jsonTxt = JSON.stringify(obj)
  }catch(err_objToJsonText){
    // err_objToJsonText 比如 "Uncaught TypeError: cyclic object value"
    // jsonTxt = `:useToString(因JSON.stringify报错):${obj}`
    jsonTxt = ""
    // writeLine_funcLogFile(`err___JSON_stringify_wrap:${obj}`)
  }
  return jsonTxt;
}

//参数字典
// interface _Arg_Dict{
//   [argName:string]:any
// }
//参数字典转json文本
function _argDict_jsonText(arg_dict/* :_Arg_Dict|null */){
  let argDict_jsonTxt/* :string */=""
  if(arg_dict){
    argDict_jsonTxt=_JSON_stringify_wrap(arg_dict)
  }
  return argDict_jsonTxt;
}


//函数进入 打印日志
export function   _func_enter_log(srcFilePath/* :string */,classMethodName/* :string */,arg_dict/* :_Arg_Dict|null */ ){
  if(isIgnore_methodFullName(srcFilePath,classMethodName)){
    return;
  }
  const msg/* :string */=`#@func_enter#@${srcFilePath}#@${classMethodName}#@#@`;
  writeLine_funcLogFile(msg)
// writeLine_funcLogFile(`#@enter#@WebCola/src/adaptor.ts:LayoutAdaptor.trigger:args_json=[e=[${_JSON_stringify_wrap(e)}]]`)
}
//无参函数进入 打印日志
export function   _funcNoArgs_enter_log(srcFilePath/* :string */,classMethodName/* :string */  ){
  _func_enter_log(srcFilePath,classMethodName,null)
}

//函数返回 打印日志
export function   _func_return_log(srcFilePath/* :string */,classMethodName/* :string */,arg_dict/* :_Arg_Dict */,ret_val/* :any|null */){
  if(isIgnore_methodFullName(srcFilePath,classMethodName)){
    return;
  }
  let msg/* :string */=`#@func_return#@${srcFilePath}#@${classMethodName}#@#@${_JSON_stringify_wrap(ret_val)}`;
  writeLine_funcLogFile(msg)
// writeLine_funcLogFile(`#@return#@WebCola/src/adaptor.ts:LayoutAdaptor.trigger:args_json=[e=[${_JSON_stringify_wrap(e)}]]:ret_json=${_JSON_stringify_wrap(ret)}`)
}

export function   _func_noReturn_log(srcFilePath/* :string */,classMethodName/* :string */,arg_dict/* :_Arg_Dict */){
  _func_return_log(srcFilePath,classMethodName, arg_dict,null)
}
//无参数函数返回 打印日志
export function   _funcNoArgs_return_log(srcFilePath/* :string */,classMethodName/* :string */ ,ret_val/* :any */){
  _func_return_log(srcFilePath,classMethodName,null,ret_val)
}

export function   _funcNoArgs_noReturn_log(srcFilePath/* :string */,classMethodName/* :string */){
  _func_return_log(srcFilePath,classMethodName,null,null)
}
//当觉得已经写完日志后, 手工调用 close_funcLogFile 以关闭日志文件