'use strict'
const Controller = require('./../../lib/mvc/controller')

class IndexController extends Controller {
  constructor() {
    super()
    this.models = 'models'
  }

  indexAction () {

    return 'txt'
  }

  viewAction() {
    this.view = {
      my: 'view'
    }
  }

  jsonAction() {

    return {my: 'data'}
  }

  postTestAction() {

  }

  putTestAction() {

  }
}

module.exports = IndexController
