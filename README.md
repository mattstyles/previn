
# Previn

> Composes classes together to create inheritance chains, almost enabling multiple inheritance

# The Problem

The problem stems from wanting to implement behaviours independently from the classes that they will be attached to, but, wanting those behaviours to be able to call upon methods of the parent class (if they exist).

In the [React](https://facebook.github.io/react/) library these were simply referred to as mixins, but, as they have access to the lifecycle methods via inheritance of the React components they are mixed into they perform a larger service than simply copying or cloning methods on to a prototype.

Regular mixins, in a traditional sense, work by copying or cloning methods on to the prototype, overriding methods already found thereupon. So, thats simply you say, just have one class extend from another and you have those methods you want in your inheritance chain, which is fine, but, what if those classes are not causally linked?

Without great complexity how would I implement class A as a parent of class B if class B is already a child of class C? Add class A as a parent of class C? Yep, that would work but now ties C to A, which might be undesirable.

A diagram should help clear up this conundrum (ignore that you can’t actually call a class `Object` in JS):

```
Object
  |
Entity
```

This is a simple inheritance chain, no problems implementing this in JS (we’ll use the `class` syntax rather than the old way of faking classes in JS):

```js
class Entity extends Object { ... }
```

So far, so good. `Entity` can be used as is already if it implements what we need, but suppose I want a super-entity that has more extra goodness? No problems extending again to increase the inheritance chain:

```
Object
  |
Entity
  |
Moveable
```

```js
class Moveable extends Entity { ... }
```

We now get access to methods of `Object` and `Entity` and all is happily ticking along. We now can implement entities and moving entities in our world. Say we want entities that are clickable:

```
Object
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

We can create a `Movey-Clickey` class that extends `Moveable` or `Clickable` and re-implements the methods of the other whilst having access to `Entity` and `Object` methods, but thats particularly rubbish, we’d like to be as [DRY](http://c2.com/cgi/wiki?DontRepeatYourself) as possible if we can and this duplicative solution scales particularly badly.

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
class Entity extends Object {
    constructor() {
        mixin( this, Clickable )
        mixin( this, Moveable )
    }
}
```

There are smarter ways of configuring the mixin function (this [not-so-fresh look at mixins from Angus Croll](https://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/) is an excellent source of info on this entire subject). We can probably also get a little smarter about implementing `Clickable` as a class (rather than an object) and then pulling methods from its prototype to use as a mixin.

We could get even smarter and add a `static` function to each class which exposes a function to return those properties that we would like to mixin to other classes.

However, cloning or copying methods from one object (class) to another isn’t going to allow us to do one thing which could be handy, namely calling `super` methods.
