const mime = require('mime-types');
const path = require('path');
const mainFs = require('fs');
const cp = require('child_process');
const debug = require('debug')('lua-bundler');
const dir = __dirname;

const walkSync = function(dir, filelist) {
  const files = mainFs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(file => {
    if (mainFs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', filelist);
    } else {
      filelist.push(dir + file);
    }
  });
  return filelist;
};


class LuaBundlePlugin {
  constructor(options) {
    this.options = Object.assign(
      {
        bundleName: 'bundle.lua',
        namespace: '',
        entryRegExp: /main.+js$/,
        lua: 'tarantool',
      },
      options
    )

  }
  apply(compiler) {
    compiler.hooks.afterEmit.tap('LuaBundlePlugin', compilation => {
      const outputPath = compiler.options.output.path;
      const { bundleName, namespace, entryRegExp, lua } = this.options
      const buildFoler = path.relative(process.cwd(), outputPath);
      const namespaceFolder = buildFoler + '/static/' + (namespace ? namespace + '/' : '');
      const files = walkSync(namespaceFolder);
      const filemap = {};
      for (const file of files){
        const fileName = file.slice(namespaceFolder.length);
        const fileBody = mainFs.readFileSync(file, { encoding: 'utf8' });
        filemap[fileName] = {
          is_entry: entryRegExp.test(fileName),
          body: fileBody,
          mime: mime.lookup(fileName)
        }
      }
      const pathToPacker = path.relative(process.cwd(), path.join(dir, 'pack-front'))
      mainFs.writeFileSync(buildFoler + '/bundle.json', JSON.stringify(filemap), { encoding: 'utf8' })
      debug('compile bundle.json')
      cp.execSync(lua + ' -l ' + pathToPacker+ ' - build/bundle.json build/' + bundleName)
      debug('build ' + bundleName)
      mainFs.unlinkSync(buildFoler + '/bundle.json')
      debug('delete bundle.json')

    });
  }
}

module.exports = LuaBundlePlugin;
