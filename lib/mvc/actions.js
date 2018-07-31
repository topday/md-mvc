'use strict'

module.exports = function(files) {
  const routeControllers = {}
  const controlers = files.filter(controller => {
    if (controller.module.name) return controller
  })

  controlers.forEach(ref => {
    const urlTree = []
    const constructorKey = ref.relative + '/' +  ref.module.name
    let relPath = ''
    if (ref.relative != '/') urlTree.push(ref.relative)
    urlTree.push(ref.title)

    if (!routeControllers[ref.relative]) {
      routeControllers[ref.relative] = {}
    }

    ref.actions = {}
    const methods = Object.getOwnPropertyNames(ref.module.prototype)
    methods.forEach(method => {
      if (!method.match(/Action$/)) return
      ref.actions[method.toLowerCase()] = method
    })

    routeControllers[ref.relative][ref.title] = ref
  })

  return function(urlPath, req, res) {
    const { method, url } = req
    const URLNodes = url.split('/')
    const routeController = routeControllers[urlPath]

    if (!routeController) throw new Error('no delegating controller')

    if (url.match(/\./)) {
      res.json({image: 'TODO'})
      return
    }

    let controllerName = URLNodes[1] || 'index'
    let actionName = URLNodes[2] || 'index'
    let controllerModel = routeController[controllerName]

    if (!controllerModel) {
      actionName = URLNodes[1] || 'index'
      controllerName = 'index'
    }
    controllerModel = routeController[controllerName]

    if (!controllerModel) throw new Error('Expecting at least index controller')

    const controller = controllerModel.module
    let actionMethod = null

    // console.log(actionName, controllerModel)
    actionName = actionName.split('-').join('')

    if (controllerModel.actions[actionName + 'action']) {
      actionMethod = controllerModel.actions[actionName + 'action']
    }

    if (!actionMethod) {
      actionMethod = controllerModel.actions[ method + actionName + 'action']
    }

    if (!actionMethod) throw new Error(`controller '${controllerModel.title}' with action name '${actionName}' does not exists!`)

    const Controller = controllerModel.module
    const c = new Controller()
    c.init(req, res)
    c.before()
    const promise = new Promise(function(resolve, reject) {
      try { resolve(c[actionMethod]()) }
      catch(e) { reject(e) }
    })

    return promise.then(data => {
      c.after(data)
      return res.json(data)
    }).catch(e => {
      console.log(e)
      return res.json({
          message: e.message,
          // stack: e.stack.toString().split("\n")
        })
    })

    // res.json({urlPath, method, url})
  }
}
