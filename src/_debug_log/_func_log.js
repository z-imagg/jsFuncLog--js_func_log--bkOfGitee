//函数进入、返回打印日志

import { isIgnore_methodFullName,printLog_argsWhenFuncRet} from './_func_log_cfg.js'
import {writeFuncLog_IndexedDB} from './IndexedDB_wrap.js'

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
    // console.log(`err___JSON_stringify_wrap:${obj}`)
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


//函数进入 打印日志 (函数入参arg_dict不保存)
export function   _func_enter_log(srcFilePath/* :string */,classMethodName/* :string */,arg_dict/* :_Arg_Dict|null */ ){
  if(isIgnore_methodFullName(srcFilePath,classMethodName)){
    return;
  }
  writeFuncLog_IndexedDB('func_enter',srcFilePath,classMethodName)
// console.log(`#@enter#@WebCola/src/adaptor.ts:LayoutAdaptor.trigger:args_json=[e=[${_JSON_stringify_wrap(e)}]]`)
}
//无参函数进入 打印日志
export function   _funcNoArgs_enter_log(srcFilePath/* :string */,classMethodName/* :string */  ){
  _func_enter_log(srcFilePath,classMethodName,null)
}

//函数返回 打印日志 (函数入参arg_dict、函数返回值ret_val 不保存)
export function   _func_return_log(srcFilePath/* :string */,classMethodName/* :string */,arg_dict/* :_Arg_Dict */,ret_val/* :any|null */){
  if(isIgnore_methodFullName(srcFilePath,classMethodName)){
    return;
  }
  writeFuncLog_IndexedDB('func_return',srcFilePath,classMethodName)
// console.log(`#@return#@WebCola/src/adaptor.ts:LayoutAdaptor.trigger:args_json=[e=[${_JSON_stringify_wrap(e)}]]:ret_json=${_JSON_stringify_wrap(ret)}`)
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