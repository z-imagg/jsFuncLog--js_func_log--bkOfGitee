// 来自:  https://github.com/rollup/rollup-starter-app/blob/master/rollup.config.js
//       https://github.com/cytoscape/cytoscape.js/blob/v3.30.2/rollup.config.js

// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import { terser } from 'rollup-plugin-terser';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
// const production = !process.env.ROLLUP_WATCH;

const input/* :string */= 'src/_debug_log/_func_log.js'

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
	]
},


{
	input,
	output: {
		file: 'build/esm/_func_log.esm.js',
		format: 'es'
	},
	plugins: [
	]
},


{
	input,
	output: {
		file: 'build/cjs/_func_log.cjs.js',
		format: 'cjs'
	},
	plugins: [
	]
},
];

