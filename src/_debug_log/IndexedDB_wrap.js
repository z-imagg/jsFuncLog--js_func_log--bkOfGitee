// 运行时动态加载 Dexie.js(IndexedDB包裹)， 以避开将dexie.js打包进此项目js编译产物(从而避开es版本差异等各种坑)
// https://github.com/dexie/Dexie.js

function loadDexie() {
  var script = document.createElement('script');
  script.src = 'https://unpkg.com/dexie/dist/dexie.js';
  script.onload = function() {
    console.log('Dexie loaded successfully');
    // 在这里调用 Dexie 相关的代码
  };
  script.onerror = function() {
    console.error('Failed to load Dexie');
  };
  document.head.appendChild(script);
}

export function createDb_IndexedDB(){
  loadDexie()

  const db_FuncLog = window.db_FuncLog = new Dexie('db_FuncLog');
  db_FuncLog.version(1).stores({
    tab_funcLog: '++id, direction,srcFile,method,args,ret'
  });


}

export function writeFuncLog_IndexedDB(direction/* :string */, srcFile/* :string */, method/* :string */){

  if(window.db_FuncLog){
    window.db_FuncLog.add({ direction, srcFile,method,args:null,ret:null});
    // window.db_FuncLog.add({ direction: 'func_enter', srcFile:'src/collection/dimensions/bounds.js',method:'elesfn.getKey',args:null,ret:null});

  }

}