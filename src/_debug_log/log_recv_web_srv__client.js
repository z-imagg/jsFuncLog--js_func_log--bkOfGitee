//函数日志接受web服务 客户端

function httpReq(url/* :string */, method/* :string */,req_body/* :string|undefined */  )/* : Promise< {ok,response,error} > */{

const req/* : RequestInit */ = {
  method: method, // 'POST', 'GET'
  headers: {
      'Content-Type': 'text/plain'
  },
  body: req_body // 发送的数据
};
return fetch(url, req)
.then(response => {
    if (response.ok) {
      return {ok:true, response,error:undefined}
    }
    console.error(`请求出错1,url=${url},req_body=${req_body},resp=${response}`);
    return {ok:false, response,error:undefined}
})
// .then(data => {
//     console.log(data);
// })
.catch(error => {
  console.error(`请求出错2,url=${url},error=${error}`);
  return {ok:false, response:undefined,error}
});
}
const _url="http://localhost:5001"
const POST='POST'
const GET='GET'
export function writeLine_funcLogFile(text/* :string */, proc){
  // httpReq(POST,_url,text ) .then((ok,response,error) => {  })
  const _proimse=httpReq(POST,_url,text )
  if(proc){  _proimse.then(proc)  }
}

export function close_funcLogFile(proc){
  // httpReq(GET,_url ) .then((ok,response,error) => {  })
  const _proimse=httpReq(GET,_url )
  if(proc){  _proimse.then(proc)  }
}