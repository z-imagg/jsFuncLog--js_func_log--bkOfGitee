// 运行时动态加载 Dexie.js(IndexedDB包裹)， 以避开将dexie.js打包进此项目js编译产物(从而避开es版本差异等各种坑)
// https://github.com/dexie/Dexie.js

function probability(val/* :float */)/* :boolean */{
  const random0to1=Math.random()
  const yes/* :boolean */= random0to1<val;
  return yes;
}
export function writeFuncLog_IndexedDB(direction/* :string */, srcFile/* :string */, method/* :string */){
  //99.9%的概率,不执行此函数的业务(writeFuncLog_IndexedDB)
  if(!probability(0.999)){
    return;
  }

    const tab_funcLog=window.db_FuncLog.tab_funcLog;
    tab_funcLog.add({ direction, srcFile,method,args:null,ret:null}).then((id) => {
      tab_funcLog._debugVar_rowCnt++;
      if(tab_funcLog._debugVar_rowCnt<100){
        console.log(`writeFuncLog_IndexedDB,id=${id} `);
        tab_funcLog.where('id').equals(id).toArray().then((x)=>{
          console.log(x)
        });
      }
    })
    // tab_funcLog.add({ direction: 'func_enter', srcFile:'src/collection/dimensions/bounds.js',method:'elesfn.getKey',args:null,ret:null});


}