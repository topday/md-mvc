const conf = require('./../../package.json')
const port = conf.port || 9000
const { app, routes, files } = require('./route')

/*
  const inx = require('./../../mvc/controller/index')
let methods = Object.getOwnPropertyNames(inx.constructor.prototype)

methods = Object.getOwnPropertyNames(inx.prototype)
methods.forEach(method => {
  const m =  inx.prototype[method].toString()
  let a = m.match(/^[a-z0-9 ]+\(([a-z, ]+)/i)
  // if (a) console.log(a, m)
})
*/

app.listen(port, () => console.log(`Project started on port ${port}!`))
