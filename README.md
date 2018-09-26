 


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
```

Note that if you pass a string instead of a function as the task, it
will be replaced by the method of that Asyncator instance with that  
same name.

## 4. Commands

#### 1. To build the project source code:

~$ `npm run build`

#### 2. To generate the documentation:

~$ `npm run docs`

#### 3. To run tests:

~$ `npm run test`

#### 4. To generate the coverage documentation:

~$ `npm run coverage`

## 5. Conclusion

Simple class to ease the asynchronous code of your programs.








