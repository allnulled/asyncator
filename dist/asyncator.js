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
                        for (var o = 0; o < e.length; o++) {
                            const r = e[o];
                            if (typeof r === "string") {
                                t[o] = n[r].bind(n);
                            } else if (typeof r === "function") {
                                t[o] = r;
                            } else throw new Error("Trying to pass " + typeof r + " as a method name");
                        }
                    } else if (typeof e === "object") {
                        t = {};
                        for (var r in e) {
                            const s = e[r];
                            if (typeof s === "string") {
                                t[s] = n[s].bind(n);
                            } else if (typeof s === "function") {
                                t[o] = s;
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
            var o = this;
            const r = e.split(t);
            for (var s = 0; s < r.length; s++) {
                const e = r[s];
                if (e in o) {
                    o = o[e];
                } else return n;
            }
            return o;
        }
        parallel(e) {
            return new Promise((n, t) => {
                async.parallel(this.constructor.Utils.turnMethodNamesIntoFunctions(e, this), function(e, o) {
                    if (e) t(e); else n(o);
                });
            });
        }
        series(e) {
            return new Promise((n, t) => {
                async.series(this.constructor.Utils.turnMethodNamesIntoFunctions(e, this), function(e, o) {
                    if (e) t(e); else n(o);
                });
            });
        }
    }
    return {
        Asyncator: e
    };
}());