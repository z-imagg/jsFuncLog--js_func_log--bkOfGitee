// 运行时动态加载 Dexie.js(IndexedDB包裹)， 以避开将dexie.js打包进此项目js编译产物(从而避开es版本差异等各种坑)
// https://github.com/dexie/Dexie.js

export function loadDexie_once() {
  return new Promise((resolve_busz, reject) => {
    //若已加载 dexie.js, 则 执行业务 后 直接返回
    if(window.DexieJs_loaded){
      resolve_busz();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/dexie/dist/dexie.js';
    script.onload = () => {
      console.log('Dexie loaded successfully');
      resolve_busz();
    };
    script.onerror = () => {
      console.error('Failed to load Dexie');
      reject(new Error('Script load failed'));
    };
    document.head.appendChild(script);
    window.DexieJs_loaded=true;//已加载dexie.js标记
  });
}

function createDb_IndexedDB(){





}

export function writeFuncLog_IndexedDB(direction/* :string */, srcFile/* :string */, method/* :string */){


  loadDexie_once().then(() => {
    
    createDb_IndexedDB()

    const db_FuncLog = window.db_FuncLog = new Dexie('db_FuncLog');
    // db_FuncLog.version(1).stores({
    //   tab_funcLog: '++id, direction,srcFile,method,args,ret'
    // });

    window.db_FuncLog.add({ direction, srcFile,method,args:null,ret:null});
    // window.db_FuncLog.add({ direction: 'func_enter', srcFile:'src/collection/dimensions/bounds.js',method:'elesfn.getKey',args:null,ret:null});


  }).catch(error => {
    console.error(error);
  });

}