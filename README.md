# Lua Bundler Webpack Plugin

## Install
```
npm i -s @tarantool-front/lua-bundler-webpack-plugin
```

## Custom options

`bundleName` - output bundle path in your build directory.

`namespace` - namespace of your module. You should place your files under namespace in your build for exclude clash of namespacing with other modules.

`entryRegExp` - regExp for using some js files as entry. It's used by `@tarantool-front/core` rocks as entry files.

`lua` - path to tarantool. By default we assume that you need install [tarantool](https://www.tarantool.io/ru/) and it's accessible in your $PATH. We use some built-in modules in our packer.


## Example
```
plugins: [
....
new LuaBundlePlugin({bundleName: 'customBundleName.lua', namespace: 'cluster', entryRegExp: /main.+js$/})
]
```

## Defaults
```
bundleName = 'bundle.lua'
namespace = ''
entryRegExp = /main.+js$/
lua = 'tarantool'
```

## Debug

```
DEBUG='lua-bundler' npm run build
```
