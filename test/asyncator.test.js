const { assert, expect } = require("chai");
const { Asyncator } = require(__dirname + "/../src/asyncator.js");

describe("Asyncator class", function() {

  it("works great for Asyncator#series(methods)", function(doneTest) {
    // @TODO:
    this.timeout(8000);
    const messages = [];
    const methods = {
      sayHello: function(done) {
        messages.push("Hello! My name is Asyncator. What about you?");
        setTimeout(function() {
          done(null, 1);
        }, 2000);
      },
      conversate: function(done) {
        messages.push("It seems that the wheather is crazy lately!");
        setTimeout(function() {
          done(null, 2);
        }, 2000);
      },
      sayGoodbye: function(done) {
        messages.push("Okay. See you soon, my friend!");
        setTimeout(function() {
          done(null, 3);
        }, 2000);
      }
    };
    const sequence = ["sayHello", "conversate", "sayGoodbye"];
    const success = (data) => {
      expect(messages).to.deep.equal([
        "Hello! My name is Asyncator. What about you?",
        "It seems that the wheather is crazy lately!",
        "Okay. See you soon, my friend!"
      ]);
      expect(data).to.deep.equal([1, 2, 3]);
      doneTest();
    };
    const error = err => console.log("ERROR", err);
    Asyncator
      .from(methods)
      .series(sequence)
      .then(success)
      .catch(error);
  });

  it("works great for Asyncator#parallel(methods)", function(doneTest) {
    // @TODO:
    this.timeout(8000);
    const messages = [];
    const methods = {
      sayHello: function(done) {
        setTimeout(function() {
          messages.push("Hello! My name is Asyncator. What about you?");
          done(null, 1);
        }, 3000);
      },
      conversate: function(done) {
        setTimeout(function() {
          messages.push("It seems that the wheather is crazy lately!");
          done(null, 2);
        }, 2000);
      },
      sayGoodbye: function(done) {
        setTimeout(function() {
          messages.push("Okay. See you soon, my friend!");
          done(null, 3);
        }, 1000);
      }
    };
    const sequence = { "sayHello": "sayHello", "conversate": "conversate", "sayGoodbye": "sayGoodbye" };
    const success = (data) => {
      expect(messages).to.deep.equal([
        "Okay. See you soon, my friend!",
        "It seems that the wheather is crazy lately!",
        "Hello! My name is Asyncator. What about you?",
      ]);
      expect(data).to.deep.equal({
        sayHello: 1,
        conversate: 2,
        sayGoodbye: 3
      });
      doneTest();
    };
    const error = err => console.log("ERROR", err);
    Asyncator
      .from(methods)
      .parallel(sequence)
      .then(success)
      .catch(error);
  });

  it("lets the tasks defined as methods to access to the Asyncator instance that is dispatching the asynchronous tasks", function(doneTest) {
    // @TODO:
    const asyncator = Asyncator
      .from({
        state: {
          index: 0,
          items: [],
          itemsToAdd: [1, 2, 3, 4, 5]
        },
        addItem: function(done) {
          var index = this.state.index++;
          this.state.items.push(this.state.itemsToAdd.shift());
          done(null, index + 10);
        }
      });
    asyncator
      .series(["addItem", "addItem", "addItem", "addItem", "addItem"])
      .then((data) => {
        expect(data).to.deep.equal([10, 11, 12, 13, 14]);
        expect(asyncator.state.index).to.equal(5);
        expect(asyncator.state.items).to.deep.equal([1, 2, 3, 4, 5]);
        expect(asyncator.state.itemsToAdd).to.deep.equal([]);
        doneTest();
      })
      .catch((error) => console.log(error));
  });

  it("works great for Asyncator#get(properties, defaultValue, splitter)", function(doneTest) {
    const asyncator = Asyncator
      .from({
        colorsRetrieved: [],
        colors: {
          primary: {
            red: "F00",
            blue: "00F",
            yellow: "FF0",
          },
          secondary: {
            green: "0F0",
            orange: "FA0",
            purple: "F0F",
          }
        },
        retrieveColors: function(done) {
          const yellow = this.get("colors.primary.yellow");
          const red = this.get("colors.primary.red");
          const blue = this.get("colors.primary.blue");
          const green = this.get("colors.secondary.green");
          const orange = this.get("colors.secondary.orange");
          const purple = this.get("colors.secondary.purple");
          const none = this.get("xxx", 800);
          this.colorsRetrieved = [yellow, red, blue, green, orange, purple];
          done();
        }
      });
    asyncator
      .series(["retrieveColors"])
      .then(data => {
        expect(asyncator.colorsRetrieved).to.deep.equal(["FF0", "F00", "00F", "0F0", "FA0", "F0F"]);
        doneTest();
      })
      .catch((error) => console.log(error))
  });

});