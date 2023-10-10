import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'
import { babel } from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-polyfill-node';

export default [
    {
        input: 'src/viewport.js',
        plugins: [
            peerDepsExternal(),
            nodePolyfills({
                includes:[
                    'node_modules/tty-browserify',
                    'node_modules/os-browserify',
                    'node_modules/path-browserify',
                ],
            }),
            resolve(
                {
                    preferBuiltins: false
                }),
            commonjs(),
            terser(),
            babel({
                babelHelpers: 'bundled',
                presets: ['@babel/preset-env']
            }),
        ],
        output:
        {
            file: 'dist/viewport.js',
            globals:
            {
                'pixi.js': 'PIXI'
            },
            format: 'umd',
            name: 'Viewport',
            sourcemap: true
        }
    },
    {
        input: 'src/viewport.js',
        plugins: [
            peerDepsExternal(),
            resolve(
                {
                    preferBuiltins: false
                }),
            commonjs(),
            json(),
        ],
        output:
        {
            file: 'dist/viewport.es.js',
            format: 'esm',
            sourcemap: true
        }
    }]
