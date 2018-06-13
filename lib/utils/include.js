const path = require('path');
const root =  path.resolve('./')
const fs = require('fs');

const getFiles = function(relative, callback, child, paths = [], relatives = []) {
  callback = callback || function() {}
  relative = path.resolve(relative)
  relatives.push({full: relative, relative: '/'})

  relatives[relatives.length - 1].relative = relative.substr(relatives[0].full.length) || '/'

  const fileRelative = relatives.find(context => context.full === relative )
  fs.readdirSync(root + relative).forEach(file => {
    const fullPath = root + relative + '/' + file
    const isDir = fs.lstatSync(fullPath).isDirectory()

    if (isDir) {
      getFiles(relative + '/' + file, callback, file, paths, relatives)
    } else {
      const module = require(fullPath)
      const title = file.substr(0, file.length - 3)

      paths.push({
        path: path.resolve(relative),
        relative: fileRelative.relative,
        file,
        title,
        child,
        module
      })
      callback(relative, file, child)
    }
  })
  return paths
}

module.exports = {
  getFiles
}
