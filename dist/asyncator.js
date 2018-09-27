(function(e, n) {
    if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
        module.exports = n;
    } else if (typeof define === "function" && typeof define.amd !== "undefined") {
        define([], () => n);
    } else {
        window[e] = n;
    }
})("AsyncatorAPI", function() {
    if (typeof async === "undefined") {
        async = require("async");
    }
    class e {
        static get Utils() {
            return {
                turnMethodNamesIntoFunctions: function(e, n) {
                    var t = undefined;
                    if (Array.isArray(e)) {
                        t = [];
                        for (var r = 0; r < e.length; r++) {
                            const o = e[r];
                            if (typeof o === "string") {
                                t[r] = n[o].bind(n);
                            } else if (typeof o === "function") {
                                t[r] = o;
                            } else throw new Error("Trying to pass " + typeof o + " as a method name");
                        }
                    } else if (typeof e === "object") {
                        t = {};
                        for (var o in e) {
                            const s = e[o];
                            if (typeof s === "string") {
                                t[s] = n[s].bind(n);
                            } else if (typeof s === "function") {
                                t[r] = s;
                            } else throw new Error("Trying to pass " + typeof s + " as a method name");
                        }
                    } else throw new Error("Trying to convert " + typeof e + " into asynchronous callbacks");
                    return t;
                }
            };
        }
        constructor(e = {}) {
            Object.assign(this, e);
        }
        static from(...n) {
            return new e(...n);
        }
        get(e, n = undefined, t = ".") {
            var r = this;
            const o = e.split(t);
            for (var s = 0; s < o.length; s++) {
                const e = o[s];
                if (e in r) {
                    r = r[e];
                } else return n;
            }
            return r;
        }
        parallel(e) {
            return new Promise((n, t) => {
                async.parallel(this.constructor.Utils.turnMethodNamesIntoFunctions(e, this), function(e, r) {
                    if (e) t(e); else n(r);
                });
            });
        }
        series(e) {
            return new Promise((n, t) => {
                async.series(this.constructor.Utils.turnMethodNamesIntoFunctions(e, this), function(e, r) {
                    if (e) t(e); else n(r);
                });
            });
        }
        mapParallel(e, n) {
            var t = undefined;
            if (typeof n === "string") {
                t = this[n];
            } else if (typeof n === "function") {
                t = n;
            } else throw new Error("Trying to pass " + typeof n + " as asynchronous iterator callback (only strings or functions)");
            return new Promise((n, r) => {
                async.map(e, t, function(e, t) {
                    if (e) r(e); else n(t);
                });
            });
        }
        mapSeries(e, n) {
            var t = undefined;
            if (typeof n === "string") {
                t = this[n];
            } else if (typeof n === "function") {
                t = n;
            } else throw new Error("Trying to pass " + typeof n + " as asynchronous iterator callback (only strings or functions)");
            return new Promise((n, r) => {
                async.mapSeries(e, t, function(e, t) {
                    if (e) r(e); else n(t);
                });
            });
        }
    }
    return {
        Asyncator: e
    };
}());