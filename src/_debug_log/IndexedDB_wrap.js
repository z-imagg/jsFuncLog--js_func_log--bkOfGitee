// 运行时动态加载 Dexie.js(IndexedDB包裹)， 以避开将dexie.js打包进此项目js编译产物(从而避开es版本差异等各种坑)
// https://github.com/dexie/Dexie.js

//构造概率 1/abs_ms_modNum 
function probability__eq__0_div__abs_ms_modNum(cur_ms,abs_ms_modNum/* :int */)/* :boolean */{
  const yes/* :boolean */= cur_ms%abs_ms_modNum==0;
  return yes;
}
export function writeFuncLog_IndexedDB(direction/* :string */, srcFile/* :string */, method/* :string */){
  const cur_ms=new Date().valueOf()

  // 以 1/abs_ms_modNum 的概率,执行此函数的业务(writeFuncLog_IndexedDB)
  if(probability__eq__0_div__abs_ms_modNum(cur_ms,window._debugVar.abs_ms_modNum?1000:window._debugVar.abs_ms_modNum)){

    const tab_funcLog=window.db_FuncLog.tab_funcLog;

    const debugDiv = document.getElementById("id_debugDiv")
    if(debugDiv){
      const delta_ms=cur_ms-window._debugVar.start_ms
      const delta_s=parseInt(delta_ms/1000)
      const rowCnt_w=parseInt(window._debugVar._rowCnt/10000)
      debugDiv.textContent=`${delta_s}秒, ${rowCnt_w}万行`;
    }

    window._debugVar._rowCnt++;
    tab_funcLog.add({ direction, srcFile,method,args:null,ret:null}).then((id) => {
    })

  }//end_if



}