 


# asyncator

Class to be extended to fastly concatenate asynchronous tasks in parallel or series.

## 1. Installation

~$ `npm install --save asyncator`

## 2. Import package

#### a) Via browsers:

```html
< script src="node_modules/asyncator/dist/asyncator.js" >< /script >
```

And then, in your JavaScript:

```js
const { Asyncator } = AsyncatorAPI;
```

Note: in browser environments, you need to load [`async` library](https://www.npmjs.com/package/async) before `Asyncator` class.

#### b) Via Node.js:

```js
const { Asyncator } = require("asyncator");
```

## 3. Usage

#### 1. Create a new instance (providing the new methods, if any):

```js
const asyncSet = Asyncator.from({
 a: (done) => done(null, 10),
 b: (done) => done(null, 20),
 c: (done) => done(null, 30)
});

// You can provide no parameters too, and initiate the instance with the `new` constructor:
const asyncSet = new Asyncator();

// Or:
const asyncSet = Asyncator.from();
```

#### 2. Start running tasks asynchronously:

```js
asyncSet
 .parallel(["a","b","c", (done) => setTimeout(done, 1000)])
 .then((data) => console.log("Ok..."))
 .catch((error) => console.log("Error"));

asyncSet
 .series(["a","b","c", (done) => setTimeout(done, 1000)])
 .then((data) => console.log("Ok..."))
 .catch((error) => console.log("Error"));

asyncSet
 .each(["hola","que","tal"], (value, key, done) => {
   console.log("Item:", item);
   done();
 })
 .then((data) => console.log("Ok..."))
 .catch((error) => console.log("Error"));
```

**Note:** if you pass a string instead of a function as the task, it
will be replaced by the method of that `Asyncator` instance with that
same name.

## 4. API Reference

----

#### `AsyncatorAPI = require("asyncator")`


**Type:** `{Object}`

**Description:** Object that contains the whole `Asyncator` API.
Note that in browser environments, this object is accessible
via the global `window.AsyncatorAPI`, while in Node.js you 
need to import the `asyncator` node_module to have access to 
it.

----

#### `Asyncator = AsyncatorAPI.Asyncator`


**Type:** `{Class}`

**Description:** Main class of the API. This class is used to define the
asycnhronous operations we want to have access to as member methods
that do asynchronous tasks (as [`async` node module]()) expects.

----

#### `new Asyncator(Object:propsAndMethods = {})`


**Type:** `{Class constructor}`

**Description:** It creates new `Asyncator` instances. You pass an object 
with all the new properties and methods you want the class to have, 
and it will add them to the instance itself. The same can be done 
through the static method `Asyncator.from(...)`, where the same passed
parameters are passed to the class constructor too.

**Parameter:** `{Object} propsAndMethods`. Object containing all the 
properties and methods to be added to the current `Asyncator` instance.

**Returns:** `{Object:Asyncator}`

----

#### `Asyncator#series(Object|Array:methodNamesAndFunctions = {})`


**Type:** `{Member method}`

**Description:** It runs multiple tasks in serie. You can provide functions as 
[`async` node_module](https://www.npmjs.com/package/async) expects, or
strings referring to member method names (that are defined as `async` 
node_module functions.

**Parameter:** `{Object | Array} methodNamesAndFunctions`. Array or object
of strings (with names of member methods) or functions (that must work 
well for [`async` node_module](https://www.npmjs.com/package/async))
containing the callbacks of the current asynchronous operation.
Note that you can pass objects or arrays. This is because `async.series(...)` 
node_module method can receive any of them, and when the success callback
is called, the data is returned in the same format and with the same 
keys, either object or array.

**Returns:** `{Object:Promise}`. Once you call this method, you can set
the `success` and `error` callbacks of a typical [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

**Example:** This is an example:

```js
Asyncator
 .from({a: (done) => done(null, 50)})
 .series({a: "a"})
 .then((data) => console.log(data.a + " is 50"))
 .catch((error) => console.log("There were errors:", error))
```

This is another example, but with arrays now:

```js
Asyncator
 .from({a: (done) => done(null, 50)})
 .series(["a"])
 .then((data) => console.log(data[0] + " is 50"))
 .catch((error) => console.log("There were errors:", error))
```

----

#### `Asyncator#parallel(Object|Array:methodNamesAndFunctions = {})`


**Type:** `{Member method}`

**Description:** It works exactly the same as `Asyncator#series(...)`, but 
instead of running the tasks in serie, they are run parallelly.

**Parameter:** `{Object | Array} methodNamesAndFunctions`. The same as `Asyncator#series`.

**Returns:** `{Object:Promise}`. The same as `Asyncator#series`.

----

#### `Asyncator#get(String:properties, Any:defaultValue=undefined, String|RegExp:separator="." )`


**Type:** `{Member method}`

**Description:** It retrieves property values from the `Asyncator` instance 
easierly, or returns the `defaultValue`, and using the `separator` to 
separate the name of each property. So, for example, if I wanted to get
a value placed in `asyncator.my.inner.properties.firstProperty`, all you 
need to do is: 

```js
asyncator.get("my/inner/properties/firstProperty", 800, "/");
```

Or simply: 

```js
asyncator.get("my.inner.properties.firstProperty"). 
```

Both codes will do the same, except that the first, if it cannot 
retrieve the specified property, it will return `800`.


**Parameter:** `{String} properties`. Name of the keys we want to access to 
retrieve our value, separated, by default, by a ".". The `separator` 
parameter dictates which character should split the names.

**Parameter:** `{Any} defaultValue`. When there are problems to retrieve
the specified property, it will return this value.

**Parameter:** `{String|RegExp} separator`. Used by `String#split(~)` to
separate the provided names of properties.

**Returns:** `{Any}`. It returns the retrieved property, or the `defaultValue` 
provided.

#### `Asyncator#mapSeries(Object|Array:items, String|Function:iterator)`


**Type:** `{Member method}`

**Description:** It maps an iterable piece of data (`Object` or `Array`) through
an asynchronous iterator callback, or the name of a member method (which is 
coded as an async)

**Parameter:** `{Object | Array} items`. The piece of data you want to iterate.

**Parameter:** `{Function} callback`. The asynchronous iterator applied for each item.
The callback works exactly as the typical `async` callbacks.

**Returns:** `{Object:Promise}`. The same as `Asyncator#series` or `Asyncator#parallel`.






## 5. Commands

#### 1. To build the project source code:

~$ `npm run build`

#### 2. To generate the documentation:

~$ `npm run docs`

#### 3. To run tests:

~$ `npm run test`

#### 4. To generate the coverage documentation:

~$ `npm run coverage`

## 6. Conclusion

Simple class to ease the asynchronous code of your programs.








