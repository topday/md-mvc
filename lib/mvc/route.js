const express = require('express')
const path = require('path');
const root =  path.resolve('./')
const { getFiles } = require(root + '/lib/utils/include')
const actions = require('./actions')

const urlPaths = []
const regExpExcept = []
const controllerPath = '/mvc/controller/'
const files = getFiles(controllerPath)

routes = {}
nestRoute = []

// nested route parser
files.forEach(file => {
  const urlPath = file.relative
  const urlTree =  urlPath.substr(1, urlPath.length).split('/')

  if (!routes[urlPath]) {
    if (!nestRoute[urlTree.length - 1]) nestRoute[urlTree.length - 1] = []
    nestRoute[urlTree.length - 1].push(urlPath)
    routes[urlPath] = { urlTree, app: express() }
    if (urlPath.length != 1) regExpExcept.push(urlPath + '/')
  }
})

let app = express()
let indexUrlRegExp = (regExpExcept.length)
        ? new RegExp('^(?!(' + regExpExcept.join('|') + '))')
        : '/*'

for (let urlPath in routes) {

  if (urlPath === '/') app = routes[urlPath].app
}

const controllers = actions(files)
for (let urlPath in routes) {

  let regExp = (urlPath === '/') ? indexUrlRegExp : '/*'

  routes[urlPath].app.all(regExp, (req, res) => {

    return controllers(urlPath, req, res)
  })
}
// ensure nest last child to parent, exp:
// /admin/ok, /admin
for (let r = nestRoute.length - 1; r >= 0; r--) {

  for (let n = 0; n < nestRoute[r].length; n++) {
    const urlPath = nestRoute[r][n]

    if (urlPath != '/') {
      app.use(urlPath, routes[urlPath].app)
    }
  }
}

module.exports = { app: routes['/'].app, routes, files }
