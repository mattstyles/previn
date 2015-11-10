
# Previn

> Composes classes together to create inheritance chains, almost enabling multiple inheritance

## The Problem

The problem stems from wanting to implement behaviours independently from the classes that they will be attached to, but, wanting those behaviours to be able to call upon methods of the parent class (if they exist).

In the [React](https://facebook.github.io/react/) library these were simply referred to as mixins, but, as they have access to the lifecycle methods via inheritance of the React components they are mixed into they perform a larger service than simply copying or cloning methods on to a prototype.

Regular mixins, in a traditional sense, work by copying or cloning methods on to the prototype, overriding methods already found thereupon. So, thats simple you say, just have one class extend from another and you have those methods you want in your inheritance chain, which is fine, but, what if those classes are not causally linked?

Without great complexity how would I implement class A as a parent of class B if class B is already a child of class C? Add class A as a parent of class C? Yep, that would work but now ties C to A, which might be undesirable.

### Inheritance Chain and `extend`

A diagram should help clear up this conundrum:

```
BaseObject
  |
Entity
```

This is a simple inheritance chain, no problems implementing this in JS (we’ll use the `class` syntax to fake classes rather than the old way of faking classes in JS):

```js
class Entity extends BaseObject { ... }
```

So far, so good. `Entity` can be used as it implements what we need, but suppose I want a super-entity that has more extra goodness? No problems extending again to increase the inheritance chain:

```
BaseObject
  |
Entity
  |
Moveable
```

```js
class Moveable extends Entity { ... }
```

We now get access to methods of `BaseObject` and `Entity` and all is happily ticking along. We now can implement entities and moving entities in our world. Say we want entities that are clickable:

```
BaseObject
  |
Entity
  |
clickable
```

```js
class Clickable extends Entity { ... }
```

Ok, that still makes sense.

But you see where we’re heading right? What about if we need a clickable and moveable entity?

We can create a `Movey-Clickey` class that extends `Moveable` or `Clickable` and re-implements the methods of the other whilst having access to `Entity` and `BaseObject` methods, but thats particularly rubbish, we’d like to be as [DRY](http://c2.com/cgi/wiki?DontRepeatYourself) as possible if we can and this duplicative solution scales particularly badly.

### Traditional mixin pattern

Right, there is another solution, the lesser-spotted mixin pattern to the rescue:

```js
function mixin( base, mixer ) {
    Object.keys( mixer ).forEach( key => {
        if ( mixer.hasOwnProperty( key ) ) {
            base[ key ] = mixer[ key ]
        }
    })
    return base
}
```

This is a fairly basic mixin function that whacks props from `mixer` on to `base` and returns the newly mixed-in `base` object.

We can use this function within the `Entity` class constructor to tack on the mixin methods/props:

```js
class Entity extends BaseObject {
    constructor() {
        mixin( this, Clickable )
        mixin( this, Moveable )
    }
}
```

There are smarter ways of configuring the mixin function (this [not-so-fresh look at mixins from Angus Croll](https://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/) is an excellent source of info on this entire subject). We can probably also get a little smarter about implementing `Clickable` as a class (rather than an object) and then pulling methods from its prototype to use as a mixin.

We could get even smarter and add a `static` function to each class which exposes a function to return those properties that we would like to mixin to other classes.

However, cloning or copying methods from one object (class) to another isn’t going to allow us to do one thing which could be handy, namely calling `super` methods.

### Accessing `super` methods

It’s quite possible that each of our classes in our inheritance chain implement something in an `update` function.

```
Object:update
  |
Entity:update
  |
Clickable:update
```

With inheritance we can do something like this and get access to the full inheritance chain to call each of those update functions:

```js
class Clickable extends Entity {
    update() {
        super()

        //...clickable update implementation
    }
}
```

However, this breaks if we try to mix `Clickable` into `Entity` as clickable either replaces the existing `update` functionality or throws an error saying that the method already exists (depending on the implementation of the mixin function).

For many mixins, those that add functionality, this isn’t a particular problem. But for architectures like React or Angular that define lifecycle methods common to their components a requirement of a mixin could be to hook into those lifecycle methods.

### Higher-order components

A solution favoured thus far by the React community is [higher-order components](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750), the article references [this gist](https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775) by [Sebastian Markbåge](https://github.com/sebmarkbage) that uses classes.

Higher-order components work by wrapping one class inside of another and works particularly well in the React world, although slightly more awkwardly as a general solution as it requires an outside arbiter to run these methods by keeping track of components and calling lifecycle methods.

### Functional composition

Another [gist by Sebastian Markbåge](https://gist.github.com/sebmarkbage/fac0830dbb13ccbff596) highlights a further way of adding functionality to classes by using a function to create an inheritance chain by building one argument as the base class of the next argument passed to the function. Angus Croll has fleshed this out for a more usable abstraction for React components in the [es6-react-mixins](https://www.npmjs.com/package/es6-react-mixins) package.

The crux of functional composition works by composing one class as a parent of another, crudely this can be implemented:

```js
function compose( ...modules ) {
    var Base = class {}

    modules.forEach( mod => {
        Base = mod( Base )
    })

    return Base
}
```

Each mixin is then implemented as a function which returns a class, the `Clickable` class could be implemented as such:

```js
Base => class Clickable extends Base {
    update() {
        super()

        //...implementation
    }
}
```

To mix this class into the inheritance chain of a different class is straight forward:

```js
class Button extends compose( Clickable ) {
    update() {
        super()
        // Button specific update implementation
    }
}
```

This results in an inhertiance chain like so (where `Base` comes from the `compose` function):

```
Base
  |
Clickable
  |
Button
```

There are two problems pertaining to our original goal of creating an inheritance chain that includes mixed-in properties.

The first is that invoking `Button:update` will actually throw an error in this case.

`Button:update` calls its `super` method which invokes `Clickable:update`, which in turn calls its own `super` method, however, `Base:update` does not exist and so will throw.

There are solutions; a simple solution would be to remove the `super` call from the `Clickable:update` method so that `Base:update` never gets called but this is problematic if you want to mix in other behaviours too, so, a better solution would be to implement a no-op on the `Base` class defined within `compose`:


```js
function compose( ...modules ) {
    var Base = class {
        // Add noops to avoid throwing
        update: function() {}
    }

    modules.forEach( mod => {
        Base = mod( Base )
    })

    return Base
}
```

This works great but requires the `Base` class to implement an abstract method for every method that a mixin _might_ call. This means that `compose` loses it generality but is a decent enough solution where you know your problem space well.

Another solution would be to define a Parent class to use for our inheritance chain so that `Base` never becomes the ultimate parent, and, as luck would have it, with a little bit of extra effort to our classes we can implement this without touching our `compose` function:

```js
class Entity extends BaseObject {
    static compose() {
        return Entity
    }

    constructor() {
        // Implementation
    }

    update() {
        // No need to call super here unless you want to use BaseObject:update
    }
}
```

The `Entity` is now capable of returning a function which we can throw into the `compose` function. It never extends the `Base` class it will be handed so effectively becomes the head of our new inheritance chain and allows our `Button` class to inherit from a defined prototype as well as add behaviours from other sources:

```js
class Button extends compose( Entity.compose, Clickable, Moveable ) {
    constructor() {
        super()
        // implementation
    }

    update() {
        super()
    }
}
```

In this case the first parameter becomes the root class of the inheritance chain and the mixin-style classes are added on to the prototype before `Button` extends the resultant class so that the inheritance chain ends up like this:

```
Entity
  |
Clickable
  |
Moveable
  |
Button
```

### Conclusion

We have now managed to implement a `Button` class that inherits from multiple sources and allows its “mixins” access to its prototype.

**Compose all the things!**

## Caveats

Unfortunately this solution is not a silver bullet for smudging multiple inheritance into JS-land. There are a few annoying gotchas.

### _Mixins_ can not inherit from any other source

The `compose` function passes one argument as a parent class of another, meaning that a _mixin_, like `Clickable`, must extend the first argument in the list of classes, whilst the next class inherits from the `Clickable` inheritance chain.

The only exception is that the first class in the inheritance chain can come with whatever inherited classes it likes as it can be freed of extending the first `Base`.

The following is difficult to create and would require a slightly complex series of intermediate steps to create:

```
             Button
    /          |         \
Clickable   UIEntity   Moveable
   |           |
Tappable     Entity
               |
           BaseObject
```

Ideally, this would work:

```js
// ANTI-PATTERN wont work!
class Button extends compose( UIEntity.compose, Clickable, Moveable ) {}
```

But it won’t as `Clickable` extends `Tappable`, and can’t also extend the `Base` it will be passed (in this case `UIEntity`).

It is possible to create a prototype chain to represent the above, but its fragile and creates inter-dependent mixins which is probably a very very bad thing to rely upon. Mixin order can solve this riddle but will increase the complexity and also add inter-dependence.

There is also a further, even more complex, method for creating complicated inheritance chains but it requires creating intermediate classes which may have little value by themselves:

```js
class TwirlyButton extends compose( Button.compose, Rotateable ) {}

```

### _Mixin_ order is important

Part of mitigating the above scenario could be to implement dependent mixins:

```js
class Button extends compose( UIEntity.compose, Tappable, Clickable, Moveable ) {}
```

This ramps up the difficulty and introduces inter-dependence between composed modules, in this case `Clickable` relies upon `Tappable` and `Tappable` must be earlier in the list which is a messy and error-prone way of defining dependencies (not to mention tracking down errors thrown from out-of-order mixins could be a nightmare).

Some of this risk can be dissipated by all composed modules not taking anything for granted i.e. if they rely upon `this.position` then they should check it exists or create it in the constructor using `this.position = this.position || [ 0, 0 ]` or some other method.

Similarly checking that `super` or `super.functionName` exists might be prudent.

### Performance

Creating complex inheritance chains is not entirely without its performance issues in Javascript. Always test performance for your particular use-case and whether the code organisational benefits of inheritance and mixins is worth it.

### Missing `supers`

If a mixin implements a common (or lifecycle) method that exists on the prototype, such as `update` in our examples, but fails to call `super` then the rest of the inheritance chain will never get called. This could be advantageous for mixins that radically alter behaviour of an object, but, in general, is a terrible thing to do and breaks whatever sense of interoperability between mixins that we have built.

As a general rule of thumb, _always call super on common methods_.

A curious side-effect that is useful is that there is no restriction on _when_ you call `super` (outside of the constructor). It adds complexity to call it in different places but could certainly be useful in some cases.

### _Mixins_ should be focussed in scope

Giving mixins a free-for-all on the prototype would result in a royal mess, there’s nothing to stop this occurring with multiple mixins all stamping over each other and, of course, there is the winding problem of a list of mixins where order is important.

To mitigate this problem it is _easiest_ if mixins are tight in scope, it at least makes stack traces a little easier to follow.

## Installing Previn

The `compose` function highlighted above is included in this repo and available on npm, but, in all seriousness you probably want to use a little bit of copy-paste inheritance and extend that function to perform some error checking, or manually set the `Base` class or do loads more simple stuff that is related to your unique use-case.

But, if you’re deadset on installing then, using [npm](https://www.npmjs.com/), do:

```sh
npm i -S previn
```

## Examples

There’s a couple of little examples inside the `examples` folder

You can use

```js
npm run example
```

They'll run in node but it’ll use [browserify](http://browserify.org/) to package it so you can see it in the browser if you really want to. To run a different example alter the script target in the package.json.

## License

WTFPL

Please give a credit if you copy-paste any of this readme anywhere, but its not necessary, not too much of this is anything particularly new, but give me a shout, I’d love to read about different/better patterns.
