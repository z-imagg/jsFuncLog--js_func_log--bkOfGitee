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
  if(probability__eq__0_div__relative_us_modNum(relative_us,window._debugVar.relative_us_modNum )){
    
    const tab_funcLog=window.db_FuncLog.tab_funcLog;
    
    const debugDiv = document.getElementById("id_debugDiv")
    if(debugDiv){
      const cur_ms=new Date().valueOf()
      const delta_ms=cur_ms-window._debugVar.start_ms
      // const delta_s=parseInt(delta_ms/1000)
      // const rowCnt_w=parseInt(window._debugVar._rowCnt/10000)
      debugDiv.textContent=`概率=1/${window._debugVar.relative_us_modNum}, ${delta_ms}毫秒, ${window._debugVar._rowCnt}行`;
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

//概率地打日志以缩小日志量,从而能看到目标执行的全貌
//猜测 由于 浏览器的当前微秒数 window.performance.now()  不是完全实时更新的, 导致 概率不是很准, 但 概率依然能够起到缩小日志量的作用.

//firefox-v129.0-64bit 执行结果如下:
//概率=1/3, 1182毫秒, 9310行
//概率=1/2, 1671毫秒, 19906行
//概率=1/1, 29秒,     27万行 (firefox进程吃内存8GB) (此数值并非重点,还在继续执行,只是页面停止更新而看不到数值了)  //fire的 当前微秒数 window.performance.now()  比较忠诚

//chromium-v127.0.6533.88-snap-64bit 执行结果如下:
// 概率=1/4, 750毫秒, 217行
// 概率=1/3, 712毫秒, 417行
// 概率=1/2, 687毫秒, 425行
// 概率=1/1, 773毫秒, 1721行  //chromium的 当前微秒数 window.performance.now()  太不忠诚

//可见 firefox比chromium忠诚, 所以应该用firefox