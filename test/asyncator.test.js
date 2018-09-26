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
/*
  it("works great Asyncator#forEach(data, method)", function(done) {
    // @TODO:
    this.timeout(8000);
    done();
  });
//*/
});