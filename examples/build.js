(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lib = require('../lib');

var _lib2 = _interopRequireDefault(_lib);

// Parent class, perfectly instantiable

var Man = (function () {
  Man.compose = function compose() {
    return Man;
  };

  function Man() {
    _classCallCheck(this, Man);
  }

  // `Mixin` function to enable some behaviours
  // Could be invoked to instantiate Flying, but probably not useful

  Man.prototype.update = function update() {
    console.log('man update');
  };

  return Man;
})();

function Flying(Base) {
  return (function (_Base) {
    _inherits(Flying, _Base);

    function Flying() {
      _classCallCheck(this, Flying);

      _Base.call(this);
    }

    Flying.prototype.takeoff = function takeoff() {
      console.log('up and away');
    };

    Flying.prototype.update = function update() {
      console.log('updating flying stuff, then calling super cos thats like, totally legitness');
      _Base.prototype.update.call(this);
    };

    return Flying;
  })(Base);
}

// Puts the Man in Superman

var Superman = (function (_previn) {
  _inherits(Superman, _previn);

  function Superman() {
    _classCallCheck(this, Superman);

    _previn.call(this);
  }

  Superman.prototype.update = function update() {
    _previn.prototype.update.call(this);

    console.log('superman update');
  };

  return Superman;
})(_lib2['default'](Man.compose, Flying));

var superman = new Superman();

console.log('invoking superman.update will throw as update does not exist on the base');
console.log('either deal with this by checking existence of super or creating a noop\n');

superman.update();

},{"../lib":2}],2:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.PrevinBase = PrevinBase;

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function previn() {
    var Base = Base || (function () {
        function _class() {
            _classCallCheck(this, _class);
        }

        return _class;
    })();

    for (var _len = arguments.length, modules = Array(_len), _key = 0; _key < _len; _key++) {
        modules[_key] = arguments[_key];
    }

    modules.forEach(function (mod) {
        Base = mod(Base);
    });

    return Base;
}

function PrevinBase(Base) {
    return previn;
}

exports["default"] = previn;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbWF0dHN0eWxlcy9wcm9qZWN0cy9teXByb2plY3RzL3ByZXZpbi9leGFtcGxlcy9wYXJlbnQuanMiLCIvVXNlcnMvbWF0dHN0eWxlcy9wcm9qZWN0cy9teXByb2plY3RzL3ByZXZpbi9saWIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OzttQkNDbUIsUUFBUTs7Ozs7O0lBR3JCLEdBQUc7QUFBSCxLQUFHLENBQ0EsT0FBTyxHQUFBLG1CQUFHO0FBQ2YsV0FBTyxHQUFHLENBQUE7R0FDWDs7QUFDVSxXQUpQLEdBQUcsR0FJTzswQkFKVixHQUFHO0dBS047Ozs7O0FBTEcsS0FBRyxXQU9QLE1BQU0sR0FBQSxrQkFBRztBQUNQLFdBQU8sQ0FBQyxHQUFHLENBQUUsWUFBWSxDQUFFLENBQUE7R0FDNUI7O1NBVEcsR0FBRzs7O0FBY1QsU0FBUyxNQUFNLENBQUUsSUFBSSxFQUFHO0FBQ3RCO2NBQWEsTUFBTTs7QUFDTixhQURBLE1BQU0sR0FDSDs0QkFESCxNQUFNOztBQUVmLHNCQUFPLENBQUE7S0FDUjs7QUFIVSxVQUFNLFdBS2pCLE9BQU8sR0FBQSxtQkFBRztBQUNSLGFBQU8sQ0FBQyxHQUFHLENBQUUsYUFBYSxDQUFFLENBQUE7S0FDN0I7O0FBUFUsVUFBTSxXQVNqQixNQUFNLEdBQUEsa0JBQUc7QUFDUCxhQUFPLENBQUMsR0FBRyxDQUFFLDZFQUE2RSxDQUFFLENBQUE7QUFDNUYsc0JBRkYsTUFBTSxXQUVHLENBQUE7S0FDUjs7V0FaVSxNQUFNO0tBQVMsSUFBSSxFQWEvQjtDQUNGOzs7O0lBSUssUUFBUTtZQUFSLFFBQVE7O0FBQ0QsV0FEUCxRQUFRLEdBQ0U7MEJBRFYsUUFBUTs7QUFFVixzQkFBTyxDQUFBO0dBQ1I7O0FBSEcsVUFBUSxXQUtaLE1BQU0sR0FBQSxrQkFBRztBQUNQLHNCQURGLE1BQU0sV0FDRyxDQUFBOztBQUVQLFdBQU8sQ0FBQyxHQUFHLENBQUUsaUJBQWlCLENBQUUsQ0FBQTtHQUNqQzs7U0FURyxRQUFRO0dBQVMsaUJBQVEsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUU7O0FBWXBELElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUE7O0FBRTdCLE9BQU8sQ0FBQyxHQUFHLENBQUUsMEVBQTBFLENBQUUsQ0FBQTtBQUN6RixPQUFPLENBQUMsR0FBRyxDQUFFLDJFQUEyRSxDQUFFLENBQUE7O0FBRTFGLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQTs7O0FDdERqQixZQUFZLENBQUM7O0FBRWIsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDMUIsT0FBTyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7O0FBRWhDLFNBQVMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUU7QUFBRSxRQUFJLEVBQUUsUUFBUSxZQUFZLFdBQVcsQ0FBQSxBQUFDLEVBQUU7QUFBRSxjQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7S0FBRTtDQUFFOztBQUV6SixTQUFTLE1BQU0sR0FBRztBQUNkLFFBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFlBQVk7QUFDNUIsaUJBQVMsTUFBTSxHQUFHO0FBQ2QsMkJBQWUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDakM7O0FBRUQsZUFBTyxNQUFNLENBQUM7S0FDakIsQ0FBQSxFQUFHLENBQUM7O0FBRUwsU0FBSyxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFO0FBQ3BGLGVBQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbkM7O0FBRUQsV0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUMzQixZQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3BCLENBQUMsQ0FBQzs7QUFFSCxXQUFPLElBQUksQ0FBQztDQUNmOztBQUVELFNBQVMsVUFBVSxDQUFDLElBQUksRUFBRTtBQUN0QixXQUFPLE1BQU0sQ0FBQztDQUNqQjs7QUFFRCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuaW1wb3J0IHByZXZpbiBmcm9tICcuLi9saWInXG5cbi8vIFBhcmVudCBjbGFzcywgcGVyZmVjdGx5IGluc3RhbnRpYWJsZVxuY2xhc3MgTWFuIHtcbiAgc3RhdGljIGNvbXBvc2UoKSB7XG4gICAgcmV0dXJuIE1hblxuICB9XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGNvbnNvbGUubG9nKCAnbWFuIHVwZGF0ZScgKVxuICB9XG59XG5cbi8vIGBNaXhpbmAgZnVuY3Rpb24gdG8gZW5hYmxlIHNvbWUgYmVoYXZpb3Vyc1xuLy8gQ291bGQgYmUgaW52b2tlZCB0byBpbnN0YW50aWF0ZSBGbHlpbmcsIGJ1dCBwcm9iYWJseSBub3QgdXNlZnVsXG5mdW5jdGlvbiBGbHlpbmcoIEJhc2UgKSB7XG4gIHJldHVybiBjbGFzcyBGbHlpbmcgZXh0ZW5kcyBCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKClcbiAgICB9XG5cbiAgICB0YWtlb2ZmKCkge1xuICAgICAgY29uc29sZS5sb2coICd1cCBhbmQgYXdheScgKVxuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgIGNvbnNvbGUubG9nKCAndXBkYXRpbmcgZmx5aW5nIHN0dWZmLCB0aGVuIGNhbGxpbmcgc3VwZXIgY29zIHRoYXRzIGxpa2UsIHRvdGFsbHkgbGVnaXRuZXNzJyApXG4gICAgICBzdXBlcigpXG4gICAgfVxuICB9XG59XG5cblxuLy8gUHV0cyB0aGUgTWFuIGluIFN1cGVybWFuXG5jbGFzcyBTdXBlcm1hbiBleHRlbmRzIHByZXZpbiggTWFuLmNvbXBvc2UsIEZseWluZyApIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIHN1cGVyKClcblxuICAgIGNvbnNvbGUubG9nKCAnc3VwZXJtYW4gdXBkYXRlJyApXG4gIH1cbn1cblxudmFyIHN1cGVybWFuID0gbmV3IFN1cGVybWFuKClcblxuY29uc29sZS5sb2coICdpbnZva2luZyBzdXBlcm1hbi51cGRhdGUgd2lsbCB0aHJvdyBhcyB1cGRhdGUgZG9lcyBub3QgZXhpc3Qgb24gdGhlIGJhc2UnIClcbmNvbnNvbGUubG9nKCAnZWl0aGVyIGRlYWwgd2l0aCB0aGlzIGJ5IGNoZWNraW5nIGV4aXN0ZW5jZSBvZiBzdXBlciBvciBjcmVhdGluZyBhIG5vb3BcXG4nIClcblxuc3VwZXJtYW4udXBkYXRlKClcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5QcmV2aW5CYXNlID0gUHJldmluQmFzZTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gcHJldmluKCkge1xuICAgIHZhciBCYXNlID0gQmFzZSB8fCAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBfY2xhc3MoKSB7XG4gICAgICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgX2NsYXNzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBfY2xhc3M7XG4gICAgfSkoKTtcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBtb2R1bGVzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIG1vZHVsZXNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgbW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2QpIHtcbiAgICAgICAgQmFzZSA9IG1vZChCYXNlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBCYXNlO1xufVxuXG5mdW5jdGlvbiBQcmV2aW5CYXNlKEJhc2UpIHtcbiAgICByZXR1cm4gcHJldmluO1xufVxuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHByZXZpbjsiXX0=
