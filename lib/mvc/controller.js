class Controller {
  constructor() {

  }

  init(req, res) {
    this.req = req
    this.res = res
  }

  // interface
  before() {}
  after() {}

  indexAction() {
    return { welcome: 'to topday' }
  }
}

module.exports = Controller
