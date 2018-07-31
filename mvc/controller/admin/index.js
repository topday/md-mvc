'use strict'
const Controller = require('./../../../lib/mvc/controller')

class IndexController extends Controller {
  constructor() {
    super()
    this.models = 'models'
  }

  indexAction() {

    return 'admin txt'
  }
}

module.exports = IndexController
