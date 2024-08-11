// 运行时动态加载 Dexie.js(IndexedDB包裹)， 以避开将dexie.js打包进此项目js编译产物(从而避开es版本差异等各种坑)
// https://github.com/dexie/Dexie.js

function probability(val/* :float */)/* :boolean */{
  const random0to1=Math.random()
  const yes/* :boolean */= random0to1<val;
  return yes;
}
export function writeFuncLog_IndexedDB(direction/* :string */, srcFile/* :string */, method/* :string */){
  // 概率 0.99999999999,  31秒 , 19万行日志
  //99.9%的概率,不执行此函数的业务(writeFuncLog_IndexedDB)
  if(!probability(window._debugVar._probaVal)){
    return;
  }
    const tab_funcLog=window.db_FuncLog.tab_funcLog;

    const debugDiv = document.getElementById("id_debugDiv")
    if(debugDiv){
      const cur_ms=new Date().valueOf()
      const delta_ms=cur_ms-window._debugVar.start_ms
      const delta_s=parseInt(delta_ms/1000)
      const rowCnt_w=parseInt(window._debugVar._rowCnt/10000)
      debugDiv.textContent=`${delta_s}秒, ${rowCnt_w}万行`;
    }

    window._debugVar._rowCnt++;
    tab_funcLog.add({ direction, srcFile,method,args:null,ret:null}).then((id) => {
    })


}