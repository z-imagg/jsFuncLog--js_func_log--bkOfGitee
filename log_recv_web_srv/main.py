#!/usr/bin/env python



from flask import Flask, request##, jsonify, abort
from io import TextIOWrapper
import threading
import traceback
import typing

app = Flask(__name__)

@app.route('/', methods=['GET'])
def hello():
    return "hello!!"

g_logFile:typing.Union[TextIOWrapper|None]=None
g_threaLock=threading.Lock()


def write_file__with_ThreadLock( text:str):
  global g_threaLock,g_logFile
  #加锁
  getLockOk:bool=g_threaLock.acquire(blocking=True,timeout=30)
  if not getLockOk:
    raise Exception(f"write_file__with_ThreadLock,获取线程锁失败, logFilePath={g_logFile}")
  
  #业务开始 (有锁确保串行)
  _openFile_ifNone__noThreadLock()
  try:
    g_logFile.write(text)
  #业务结束 (有锁确保串行)
  except Exception as _exp:
     #忽略异常
     traceback.print_exception(_exp)
  
  #因以上异常都被忽略,因此不论是否异常 都会走到这里,都忽略锁
  #解锁
  g_threaLock.release()
  #end_func write_file__with_ThreadLock

def _openFile_ifNone__noThreadLock():
  global g_logFile
  if g_logFile is None: 
    g_logFile=open("_func_log.txt","+a")

def close_file__with_ThreadLock( ):
  global g_threaLock,g_logFile
  #加锁
  getLockOk:bool=g_threaLock.acquire(blocking=True,timeout=10)
  if not getLockOk:
    raise Exception(f"close_file__with_ThreadLock, 获取线程锁失败, logFilePath={g_logFile}")
  
  if g_logFile is None: return

  #业务开始 (有锁确保串行)
  try:
    g_logFile.flush()
    try:
      g_logFile.close()
      g_logFile=None
    except Exception as _exp2:
      pass
  #业务结束 (有锁确保串行)
  except Exception as _exp:
     #忽略异常
     traceback.print_exception(_exp)
  
  #因以上异常都被忽略,因此不论是否异常 都会走到这里,都忽略锁
  #解锁
  g_threaLock.release()
  #end_func close_file__with_ThreadLock

   
@app.route('/funcLogFile/writeLine', methods=['POST' ] )
def _writeLine_funcLogFile():
  print("@@@write_func_log")
  # if request.content_type != "application/json":
  #     return "err__content_type_notJson",401
  # if not request.json or not request.is_json:
  #     return "err__notJson",402

  req_body:bytes=request.data
  # msg:str=f"req.body=#{req_body}#,req.content_type=#{request.content_type}#"
  # print(msg)
  text:str=req_body.decode("utf-8")
  text=f"{text}\n"
  write_file__with_ThreadLock(text)
  return "write_funcLogFile", 201

@app.route('/funcLogFile/close', methods=['GET' ] )
def _close_funcLogFile():
  print("@@@close_funcLogFile")

  global g_logFile
  close_file__with_ThreadLock()
  return "close_file__with_ThreadLock", 201


if __name__ == '__main__':
    # 指定端口为5001
    app.run(debug=True, port=5001)
    close_file__with_ThreadLock()