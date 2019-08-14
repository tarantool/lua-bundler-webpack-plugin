# Lua Bundler Webpack Plugin

## Install
```
npm i -s @tarantool-front/lua-bundler-webpack-plugin
```

## Custom options

`bundleName` - output bundle path in your build directory. By default: `./bundle.lua`

`namespace` - namespace of your module. You should place your files under namespace in your build for exclude clash of namespacing with other modules.

`entryRegExp` - regExp for using some js files as entry. `/main.+js/` is using by default. It's used by `@tarantool-front/core` rocks as entry files.

`lua` - path to tarantool. By default we assume that you need install [tarantool](https://www.tarantool.io/ru/). We use some built-in modules in our packer.


Example:
```
plugins: [
....
new LuaBundlePlugin({bundleName: 'customBundleName.lua', namespace: 'cluster', entryRegExp: /main.+js$/})
]
```

## Defaults

bundleName = 'bundle.lua'<br/>
namespace = ''<br/>
entryRegExp: /main.+js$/<br/>

## Debug

```
DEBUG='lua-bundler' npm run build
```
