! function() {
    "use strict";
    var t, e = window.location,
        i = window.document,
        n = i.getElementById("plausible"),
        a = n.getAttribute("data-api") || (u = (t = (t = n).src.split("/"))[0]) + "//" + (t = t[2]) + "/api/event";

    function o(t, e) {
        t && console.warn("Ignoring Event: " + t), e && e.callback && e.callback()
    }

    function r(t, r) {
        if (/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(e.hostname) || "file:" === e.protocol) return o("localhost", r);
        if (window._phantom || window.__nightmare || window.navigator.webdriver || window.Cypress) return o(null, r);
        try {
            if ("true" === window.localStorage.plausible_ignore) return o("localStorage flag", r)
        } catch (t) {}
        var l = {},
            s = (l.n = t, l.u = e.href, l.d = n.getAttribute("data-domain"), l.r = i.referrer || null, r && r.meta && (l.m = JSON.stringify(r.meta)), r && r.props && (l.p = r.props), new XMLHttpRequest);
        s.open("POST", a, !0), s.setRequestHeader("Content-Type", "text/plain"), s.send(JSON.stringify(l)), s.onreadystatechange = function() {
            4 === s.readyState && r && r.callback && r.callback()
        }
    }
    var l = window.plausible && window.plausible.q || [];
    window.plausible = r;
    for (var s, p = 0; p < l.length; p++) r.apply(this, l[p]);

    function c() {
        s !== e.pathname && (s = e.pathname, r("pageview"))
    }
    var d, u = window.history;
    u.pushState && (d = u.pushState, u.pushState = function() {
        d.apply(this, arguments), c()
    }, window.addEventListener("popstate", c)), "prerender" === i.visibilityState ? i.addEventListener("visibilitychange", (function() {
        s || "visible" !== i.visibilityState || c()
    })) : c()
}();