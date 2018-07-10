module.exports = function(files) {
  const actions = {}
  const routeControllers = {}

  const controlers = files.filter(controller => {
    if (controller.module.name) return controller
  })


//  console.log(controlers)

  controlers.forEach(ref => {
    const urlTree = []
    let relPath = ''
    if (ref.relative != '/') urlTree.push(ref.relative)
    urlTree.push(ref.title)

    if (!routeControllers[ref.relative]) {
      routeControllers[ref.relative] = {}
    }

    ref.actions = {}
    methods = Object.getOwnPropertyNames(ref.module.prototype)
    methods.forEach(method => {
      const actionTitle = ref.module.prototype[method]
      const m = ref.module.prototype[method].toString()
      // let a = m.match(/^[a-z0-9 ]+\(([a-z=\',{}\[\] ]+)/i)
      let a = m.match(/^([a-z0-9]+)Action[\( ]+(.*)\)/i)

      if (a) {
        let actionName = a[1]
        let actionParams = a[2].replace(/ */g, '')

        ref.actions[actionName] = {param: []}

        if (actionParams) {
          let p = actionParams.match(/([a-z0-9]+(|=.*|,))/ig)
          ref.actions[actionName].param = p
        }

      }
    })

    console.log(ref.actions)
    routeControllers[ref.relative][ref.title] = ref



    // /            -> index/index
    // /index       -> index/index
    // /index/index ->  index/index
    // /about       ->  index/about || about/index


  })


  console.log(routeControllers)


    // req.method
    // req.url
    // res.json({urlPath})
    // res.send(path);
  // console.log(files)

  return function(urlPath, req, res) {
    let controller = 'index'
    let action = ''
    const { method, url } = req

    url.split('/')



//    console.log(routeControllers[urlPath])

    res.json({urlPath, method, url})
  }
}
