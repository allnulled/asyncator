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
 * ## 4. Commands
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
 * ## 5. Conclusion
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
              out[a] = base[item];
            } else if(typeof item === "function") {
            	out[a] = item;
            } else throw new Error("Trying to pass " + typeof item + " as a method name");
          }
        } else if (typeof methodsParam === "object") {
        	out = {};
          for (var p in methodsParam) {
            const item = methodsParam[p];
            if (typeof item === "string") {
              out[item] = base[item];
            } else if(typeof item === "function") {
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

  forEach(data, methodParam) {
  	return new Promise((resolve, reject) => {
      async.forEach(this.constructor.Utils.turnMethodNamesIntoFunctions(methodsParam, this), function(error, args) {
        if (error) reject(error);
        else resolve(args);
      });
    });
  }

}

// >> export module

module.exports = { Asyncator };