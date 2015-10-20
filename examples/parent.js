
import previn from '../lib'

// Parent class, perfectly instantiable
class Man {
  static compose() {
    return Man
  }
  constructor() {
  }

  update() {
    console.log( 'man update' )
  }
}

// `Mixin` function to enable some behaviours
// Could be invoked to instantiate Flying, but probably not useful
function Flying( Base ) {
  return class Flying extends Base {
    constructor() {
      super()
    }

    takeoff() {
      console.log( 'up and away' )
    }

    update() {
      console.log( 'updating flying stuff, then calling super cos thats like, totally legitness' )
      super()
    }
  }
}


// Puts the Man in Superman
class Superman extends previn( Man.compose, Flying ) {
  constructor() {
    super()
  }

  update() {
    super()

    console.log( 'superman update' )
  }
}

var superman = new Superman()

superman.update()
