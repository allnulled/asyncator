(function(e, t) {
    if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
        module.exports = t;
    } else if (typeof define === "function" && typeof define.amd !== "undefined") {
        define([], () => t);
    } else {
        window[e] = t;
    }
})("AsyncatorAPI", function() {
    if (typeof async === "undefined") {
        async = require("async");
    }
    class e {
        static get Utils() {
            return {
                turnMethodNamesIntoFunctions: function(e, t) {
                    var n = undefined;
                    if (Array.isArray(e)) {
                        n = [];
                        for (var o = 0; o < e.length; o++) {
                            const s = e[o];
                            if (typeof s === "string") {
                                n[o] = t[s];
                            } else if (typeof s === "function") {
                                n[o] = s;
                            } else throw new Error("Trying to pass " + typeof s + " as a method name");
                        }
                    } else if (typeof e === "object") {
                        n = {};
                        for (var s in e) {
                            const r = e[s];
                            if (typeof r === "string") {
                                n[r] = t[r];
                            } else if (typeof r === "function") {
                                n[o] = r;
                            } else throw new Error("Trying to pass " + typeof r + " as a method name");
                        }
                    } else throw new Error("Trying to convert " + typeof e + " into asynchronous callbacks");
                    return n;
                }
            };
        }
        constructor(e = {}) {
            Object.assign(this, e);
        }
        static from(...t) {
            return new e(...t);
        }
        parallel(e) {
            return new Promise((t, n) => {
                async.parallel(this.constructor.Utils.turnMethodNamesIntoFunctions(e, this), function(e, o) {
                    if (e) n(e); else t(o);
                });
            });
        }
        series(e) {
            return new Promise((t, n) => {
                async.series(this.constructor.Utils.turnMethodNamesIntoFunctions(e, this), function(e, o) {
                    if (e) n(e); else t(o);
                });
            });
        }
        forEach(e, t) {
            return new Promise((e, t) => {
                async.forEach(this.constructor.Utils.turnMethodNamesIntoFunctions(methodsParam, this), function(n, o) {
                    if (n) t(n); else e(o);
                });
            });
        }
    }
    return {
        Asyncator: e
    };
}());