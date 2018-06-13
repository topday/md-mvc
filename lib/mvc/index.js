const path = require('path');
const root =  path.resolve('./')
const conf = require('./../../package.json')
const controller = require('./controller')
const express = require('express')
const { getFiles } = require(root + '/lib/utils/include')
const port = conf.port || 9000
const controllers = {}
  // const indexController = require('./mvc/controller/index')

// construct url reflecting loader based on controller directory tree
const urlPaths = []
const regExpExcept = []
const controllerPath = '/mvc/controller/'
const files = getFiles(controllerPath)


// index route
urlPaths[0] = {'/': {
    urlTree: [],
    app: express()
  }
}

// nested route parser
files.forEach(file => {
  const urlPath = file.path.replace(controllerPath, '')
  const urlTree =  urlPath.substr(1, urlPath.length).split('/')

  if (urlPath.length) {
    if (!urlPaths[urlTree.length]) urlPaths[urlTree.length] = {}
    if (!urlPaths[urlTree.length][urlPath]) {
      urlPaths[urlTree.length][urlPath] = {
        urlTree,
        app: express()
      }
      regExpExcept.push(urlPath + '/')
    }
  }
})

// @example: new RegExp('^(?!(/admin|test))')
const indexUrlRegExp = (regExpExcept.length) ? new RegExp('^(?!(' + regExpExcept.join('|') + '))') : '/*'
const app = urlPaths[0]['/'].app
app.all(indexUrlRegExp, (req, res) => {
console.log(req.method, req.url)
  // req.method
  // req.url
  // delegate controller here
  //

  res.json({v: 'test'})
})

// set nested controllers
for (let i = urlPaths.length - 1; i > 0; i--) {
  const paths = Object.keys(urlPaths[i])

  paths.forEach(path => {
    urlPaths[i][path].app.all('/*', function(req, res) {

      // delegate controller here
      res.send(path);
    })
    app.use(path, urlPaths[i][path].app)
  })
}

app.listen(port, () => console.log(`Project started on port ${port}!`))
