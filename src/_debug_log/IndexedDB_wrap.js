// 运行时动态加载 Dexie.js(IndexedDB包裹)， 以避开将dexie.js打包进此项目js编译产物(从而避开es版本差异等各种坑)
// https://github.com/dexie/Dexie.js

//构造概率 1/abs_ms_modNum 
function probability__eq__0_div__relative_us_modNum(relative_us,us_modNum/* :int */)/* :boolean */{
  const yes/* :boolean */= relative_us%us_modNum==0;
  return yes;
}
export function writeFuncLog_IndexedDB(direction/* :string */, srcFile/* :string */, method/* :string */){
  const relative_us=window.performance.now() 
  // 以 1/relative_us_modNum 的概率,执行此函数的业务(writeFuncLog_IndexedDB)
  if(probability__eq__0_div__relative_us_modNum(relative_us,window._debugVar.relative_us_modNum?1000:window._debugVar.relative_us_modNum)){
    
    const tab_funcLog=window.db_FuncLog.tab_funcLog;
    
    const debugDiv = document.getElementById("id_debugDiv")
    if(debugDiv){
      const cur_ms=new Date().valueOf()
      const delta_ms=cur_ms-window._debugVar.start_ms
      const delta_s=parseInt(delta_ms/1000)
      // const rowCnt_w=parseInt(window._debugVar._rowCnt/10000)
      debugDiv.textContent=`${delta_s}秒, ${window._debugVar._rowCnt}行`;
    }

    window._debugVar._rowCnt++;
    tab_funcLog.add({ direction, srcFile,method,args:null,ret:null}).then((id) => {
    })

  }//end_if
  else{
    //概率否定（调试用）
    const _debug_dummy = 0;
  }


}