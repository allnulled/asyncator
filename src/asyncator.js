// >> export module to AsyncatorAPI

if (typeof async === "undefined") {
  async = require("async");
}

/**
 * 
 * # asyncator
 * 
 * Class to be extended to fastly concatenate asynchronous tasks in parallel or series.
 * 
 * ## 1. Installation
 * 
 * ~$ `npm install --save asyncator`
 * 
 * ## 2. Import package
 * 
 * #### a) Via browsers:
 * 
 * ```html
 * < script src="node_modules/asyncator/dist/asyncator.js" >< /script >
 * ```
 * 
 * And then, in your JavaScript:
 * 
 * ```js
 * const { Asyncator } = AsyncatorAPI;
 * ```
 * 
 * Note: in browser environments, you need to load [`async` library](https://www.npmjs.com/package/async) before `Asyncator` class.
 * 
 * #### b) Via Node.js:
 * 
 * ```js
 * const { Asyncator } = require("asyncator");
 * ```
 * 
 * ## 3. Usage
 * 
 * #### 1. Create a new instance (providing the new methods, if any):
 * 
 * ```js
 * const asyncSet = Asyncator.from({
 *   a: (done) => done(null, 10),
 *   b: (done) => done(null, 20),
 *   c: (done) => done(null, 30)
 * });
 * 
 * // You can provide no parameters too, and initiate the instance with the `new` constructor:
 * const asyncSet = new Asyncator();
 * 
 * // Or:
 * const asyncSet = Asyncator.from();
 * ```
 * 
 * #### 2. Start running tasks asynchronously:
 * 
 * ```js
 * asyncSet
 *   .parallel(["a","b","c", (done) => setTimeout(done, 1000)])
 *   .then((data) => console.log("Ok..."))
 *   .catch((error) => console.log("Error"));
 * 
 * asyncSet
 *   .series(["a","b","c", (done) => setTimeout(done, 1000)])
 *   .then((data) => console.log("Ok..."))
 *   .catch((error) => console.log("Error"));
 * ```
 * 
 * Note that if you pass a string instead of a function as the task, it
 * will be replaced by the method of that Asyncator instance with that  
 * same name.
 * 
 * ## 4. API Reference
 * 
 * ----
 * 
 * #### `AsyncatorAPI = require("asyncator")`
 * 
 * @type `{Object}`
 * @description Object that contains the whole `Asyncator` API.
 * Note that in browser environments, this object is accessible
 * via the global `window.AsyncatorAPI`, while in Node.js you 
 * need to import the `asyncator` node_module to have access to 
 * it.
 * 
 * ----
 * 
 * #### `Asyncator = AsyncatorAPI.Asyncator`
 * 
 * @type `{Class}`
 * @description Main class of the API. This class is used to define the
 * asycnhronous operations we want to have access to as member methods
 * that do asynchronous tasks (as [`async` node module]()) expects.
 * 
 * ----
 * 
 * #### `new Asyncator(Object:propsAndMethods = {})`
 * 
 * @type `{Class constructor}`
 * @description It creates new `Asyncator` instances. You pass an object 
 * with all the new properties and methods you want the class to have, 
 * and it will add them to the instance itself. The same can be done 
 * through the static method `Asyncator.from(...)`, where the same passed
 * parameters are passed to the class constructor too.
 * @parameter `{Object} propsAndMethods`. Object containing all the 
 * properties and methods to be added to the current `Asyncator` instance.
 * @returns `{Object:Asyncator}`
 * 
 * ----
 * 
 * #### `Asyncator#series(Object|Array:methodNamesAndFunctions = {})`
 * 
 * @type `{Member method}`
 * @description It runs multiple tasks in serie. You can provide functions as 
 * [`async` node_module](https://www.npmjs.com/package/async) expects, or
 * strings referring to member method names (that are defined as `async` 
 * node_module functions.
 * @parameter `{Object | Array} methodNamesAndFunctions`. Array or object
 * of strings (with names of member methods) or functions (that must work 
 * well for [`async` node_module](https://www.npmjs.com/package/async))
 * containing the callbacks of the current asynchronous operation.
 * Note that you can pass objects or arrays. This is because `async.series(...)` 
 * node_module method can receive any of them, and when the success callback
 * is called, the data is returned in the same format and with the same 
 * keys, either object or array.
 * @returns `{Object:Promise}`. Once you call this method, you can set
 * the `success` and `error` callbacks of a typical [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
 * @example This is an example:
 * 
 * ```js
 * Asyncator
 *   .from({a: (done) => done(null, 50)})
 *   .series({a: "a"})
 *   .then((data) => console.log(data.a + " is 50"))
 *   .catch((error) => console.log("There were errors:", error))
 * ```
 * 
 * This is another example, but with arrays now:
 * 
 * ```js
 * Asyncator
 *   .from({a: (done) => done(null, 50)})
 *   .series(["a"])
 *   .then((data) => console.log(data[0] + " is 50"))
 *   .catch((error) => console.log("There were errors:", error))
 * ```
 * 
 * ----
 * 
 * #### `Asyncator#parallel(Object|Array:methodNamesAndFunctions = {})`
 * 
 * @type `{Member method}`
 * @description It works exactly the same as `Asyncator#series(...)`, but 
 * instead of running the tasks in serie, they are run parallelly.
 * @parameter `{Object | Array} methodNamesAndFunctions`. The same as `Asyncator#series`.
 * @returns `{Object:Promise}`. The same as `Asyncator#series`.
 * 
 * ## 5. Commands
 * 
 * #### 1. To build the project source code:
 * 
 * ~$ `npm run build`
 * 
 * #### 2. To generate the documentation:
 * 
 * ~$ `npm run docs`
 * 
 * #### 3. To run tests:
 * 
 * ~$ `npm run test`
 * 
 * #### 4. To generate the coverage documentation:
 * 
 * ~$ `npm run coverage`
 * 
 * ## 6. Conclusion
 * 
 * Simple class to ease the asynchronous code of your programs.
 * 
 * 
 * 
 * 
 * 
 */
class Asyncator {

  static get Utils() {
    return {
      turnMethodNamesIntoFunctions: function(methodsParam, base) {
        var out = undefined;
        if (Array.isArray(methodsParam)) {
          out = [];
          for (var a = 0; a < methodsParam.length; a++) {
            const item = methodsParam[a];
            if (typeof item === "string") {
              out[a] = base[item].bind(base);
            } else if (typeof item === "function") {
              out[a] = item;
            } else throw new Error("Trying to pass " + typeof item + " as a method name");
          }
        } else if (typeof methodsParam === "object") {
          out = {};
          for (var p in methodsParam) {
            const item = methodsParam[p];
            if (typeof item === "string") {
              out[item] = base[item].bind(base);
            } else if (typeof item === "function") {
              out[a] = item;
            } else throw new Error("Trying to pass " + typeof item + " as a method name");
          }
        } else throw new Error("Trying to convert " + typeof methodsParam + " into asynchronous callbacks");
        return out;
      }
    };
  }

  constructor(info = {}) {
    Object.assign(this, info);
  }

  static from(...args) {
    return new Asyncator(...args);
  }

  get(properties, defaultValue = undefined, separator = ".") {
    var last = this;
    const props = properties.split(separator);
    for (var a = 0; a < props.length; a++) {
      const prop = props[a];
      if (prop in last) {
        last = last[prop];
      } else return defaultValue;
    }
    return last;
  }

  parallel(methodsParam) {
    return new Promise((resolve, reject) => {
      async.parallel(this.constructor.Utils.turnMethodNamesIntoFunctions(methodsParam, this), function(error, args) {
        if (error) reject(error);
        else resolve(args);
      });
    });
  }

  series(methodsParam) {
    return new Promise((resolve, reject) => {
      async.series(this.constructor.Utils.turnMethodNamesIntoFunctions(methodsParam, this), function(error, args) {
        if (error) reject(error);
        else resolve(args);
      });
    });
  }

}

// >> export module

module.exports = { Asyncator };