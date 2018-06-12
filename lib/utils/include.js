const path = require('path');
const root =  path.resolve('./')
const fs = require('fs');

const getFiles = function(relative, callback, child, paths = []) {
  callback = callback || function() {}

  fs.readdirSync(root + relative).forEach(file => {
    const fullPath = root + relative + '/' + file
    const isDir = fs.lstatSync(fullPath).isDirectory()
    if (isDir) {
      getFiles(relative + '/' + file, callback, file, paths)
    } else {
      paths.push({relative, file, child})
      callback(relative, file, child)
    }
  })
  return paths
}

module.exports = {
  getFiles
}

