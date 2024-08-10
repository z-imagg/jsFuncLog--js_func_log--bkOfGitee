//函数日志接受web服务 客户端

function httpReq(url/* :string */, method/* :string */,text_ls/* :string[]|undefined */  )/* : Promise< {ok,response,error} > */{

const req/* : RequestInit */ = {
  method: method, // 'POST', 'GET'
  headers: {
      'Content-Type': 'application/json'
  },
  body: text_ls // 发送的数据
};
return fetch(url, req)
.then(response => {
    if (response.ok) {
      return {ok:true, response,error:undefined}
    }
    console.error(`请求出错1,url=${url},text_ls=${text_ls},resp=${response}`);
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
const log_recv_web_srv_url="http://localhost:5001"
const writeLine_url=`${log_recv_web_srv_url}/funcLogFile/writeLine`
const close_url=`${log_recv_web_srv_url}/funcLogFile/close`
const POST='POST'
const GET='GET'
let textLs_swap/* :string[] */=[]
const swap_size/* :number */=200
export function writeLine_funcLogFile(text/* :string */){
  textLs_swap.push(text)
  if(textLs_swap.length>=swap_size){
    const _textLs_swap=textLs_swap
    textLs_swap=[]
    setTimeout(function(){
      writeLineLs_funcLogFile(_textLs_swap)
    }, 1)
    
  }
}

function writeLineLs_funcLogFile(text_ls/* :string[] */ ){
  // httpReq(POST,_url,text_ls ) .then((ok,response,error) => {  })
  httpReq(writeLine_url,POST,text_ls )
  .then((ok,response,error) => {

   })
}

export function close_funcLogFile(proc){
  // httpReq(GET,_url ) .then((ok,response,error) => {  })
  const _proimse=httpReq(close_url,GET,undefined )
  if(proc){  _proimse.then(proc)  }
}