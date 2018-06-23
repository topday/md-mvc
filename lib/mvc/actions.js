module.exports = function(files) {
  const actions = {}

  const controlers = files.filter(controller => {
    if (controller.module.name) return controller
  })

  console.log(controlers)

  controlers.forEach(ref => {
    const urlTree = []
    let relPath = ''
    if (ref.relative != '/') urlTree.push(ref.relative)
    urlTree.push(ref.title)


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
