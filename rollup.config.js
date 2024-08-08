// 来自:  https://github.com/rollup/rollup-starter-app/blob/master/rollup.config.js
//       https://github.com/cytoscape/cytoscape.js/blob/v3.30.2/rollup.config.js

// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';


// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
// const production = !process.env.ROLLUP_WATCH;

const input/* :string */= 'src/_debug_log/_func_log.js'

const babel_plgin_cfg=    babel({
	exclude: 'node_modules/**', // 排除 node_modules 目录
	babelHelpers: 'bundled', // 使用打包的 Babel 助手函数
	presets: [
		[
			"@babel/preset-env",
			{
				targets: {
					"ie": "11" // 设置目标环境为至少支持到 IE11
				},
				modules: false // 让 Rollup 处理模块而不是 Babel
			}
		]
	]
})
;

export default [
{
	input ,
	output: {
		file: 'build/iife/_func_log.iife.js',
		format: 'iife', // immediately-invoked function expression — suitable for <script> tags
		sourcemap: true
	},
	plugins: [
		// resolve(), // tells Rollup how to find date-fns in node_modules
		// commonjs(), // converts date-fns to ES modules
		babel_plgin_cfg
	]
},

{
	input,
	output: {
		file: 'build/umd/_func_log.umd.js',
		format: 'umd',
		name:"_func_log",
		sourcemap: true
	},
	plugins: [
		babel_plgin_cfg
	]
},


{
	input,
	output: {
		file: 'build/esm/_func_log.esm.js',
		format: 'es'
	},
	plugins: [
		babel_plgin_cfg
	]
},


{
	input,
	output: {
		file: 'build/cjs/_func_log.cjs.js',
		format: 'cjs'
	},
	plugins: [
		babel_plgin_cfg
	]
},
];

