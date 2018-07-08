module.exports = function(files) {

  const actions = {}

  const controlers = files.filter(controller => {
    if (controller.module.name) return controller
  })

  console.log(controlers)

  controlers.forEach(ref => {
    const urlTree = []
    const constructorKey = ref.relative + '/' +  ref.module.name
    let relPath = ''
    if (ref.relative != '/') urlTree.push(ref.relative)
    urlTree.push(ref.title)

    actions[constructorKey] = {}



   const methods = Object.getOwnPropertyNames(ref.module.prototype)
   methods.forEach(method => {
     if (!method.match(/Action$/)) return
     const funcParams = ref.module.prototype[method].toString()
     const paramKeys = funcParams.match(/^[a-z0-9 ]+\(([a-z, ]+)/i)


     console.log(method, paramKeys)



   })



    // /            -> index/index
    // /index       -> index/index
    // /index/index ->  index/index
    // /about       ->  index/about || about/index


  })



    // req.method
    // req.url
    // res.json({urlPath})
    // res.send(path);
  // console.log(files)

  return function(urlPath, req, res) {
    res.json({urlPath})
  }
}
