// rollup.config.js
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import alias from 'rollup-plugin-alias';

const substituteModulePaths = {
    'crypto': 'build/module/adapters/crypto.browser.js',
    'hash.js': 'build/temp/hash.js'
}

export default {
    entry: 'build/module/index.js',
    sourceMap: true,
    moduleName: 'FlatfileImporter',
    plugins: [
        alias(substituteModulePaths),
        nodeResolve({
            browser: true
        }),
        commonjs({
        namedExports: {
            // left-hand side can be an absolute path, a path
            // relative to the current directory, or the name
            // of a module in node_modules
            'eventemitter3': ['EventEmitter']
        }})
    ]
}
