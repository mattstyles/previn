

import previn from '../lib'

// This is a `mixin` style class, although could standalone
function Man( Base ) {
  return class Man extends Base {
    constructor() {
      super()
    }

    update() {
      // Could check existence before calling
      super()
      console.log( 'man update' )
    }
  }
}


// Puts the Man in Superman
class Superman extends previn( Man ) {
  constructor() {
    super()
  }

  update() {
    super()

    console.log( 'superman update' )
  }
}

var superman = new Superman()

console.log( 'invoking superman.update will throw as update does not exist on the base' )
console.log( 'either deal with this by checking existence of super or creating a noop\n' )

superman.update()
