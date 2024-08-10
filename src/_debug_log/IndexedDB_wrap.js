// 运行时动态加载 Dexie.js(IndexedDB包裹)， 以避开将dexie.js打包进此项目js编译产物(从而避开es版本差异等各种坑)
// https://github.com/dexie/Dexie.js


export function writeFuncLog_IndexedDB(direction/* :string */, srcFile/* :string */, method/* :string */){

    
    window.db_FuncLog.tab_funcLog.add({ direction, srcFile,method,args:null,ret:null}).then((id) => {
      window.db_FuncLog.tab_funcLog._debugVar_rowCnt++;
      if(window.db_FuncLog.tab_funcLog._debugVar_rowCnt<100){
        const row=window.db_FuncLog.tab_funcLog.where('id').equals(id).toArray()[0];
        console.log(`writeFuncLog_IndexedDB,id=${id},row=${row}`);
      }
    })
    // window.db_FuncLog.tab_funcLog.add({ direction: 'func_enter', srcFile:'src/collection/dimensions/bounds.js',method:'elesfn.getKey',args:null,ret:null});


}