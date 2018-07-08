const Controller = require('./../../lib/mvc/controller')

class IndexController extends Controller {
  constructor() {
    super()
    this.models = 'models'
    const methods = Object.getOwnPropertyNames(this.constructor.prototype)


    methods.forEach(method => {
      const m =  this[method].toString()
      let a = m.match(/^[a-z0-9 ]+\(([a-z, ]+)/i)
      if (a) console.log(a, m)
    })
    console.log({methods})


  }

  indexAction() {

    return 'txt'
  }

  // pass js object to html template
  viewAction() {
    this.view = {
      my: 'view'
    }
  }

  // represent REST api
  jsonAction() {

    return {my: 'data'}
  }

  argsAction(v, t) {

    console.log(v, t)
  }


  renderCSVAction(sep = ',', data = [], fileName) {

  }

  // todo: implement http methods
  getTestAction() {

  }

  postTestAction() {

  }

  putTestAction(param1, param2) {

  }
}

module.exports = IndexController
