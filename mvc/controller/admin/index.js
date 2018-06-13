const Controller = require('./../../../lib/mvc/controller')

class IndexController extends Controller {
  constructor() {

    this.models = 'models'
  }

  indexAction() {

    return 'admin txt'
  }
}

module.exports = IndexController
