const Controller = require('./../../lib/mvc/controller')

class IndexController extends Controller {
  constructor() {

    this.models = 'models'
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

  }

  // todo: implement http methods
  getTestAction() {

  }

  postTestAction() {

  }

  putTestAction() {

  }
}

module.exports = IndexController
