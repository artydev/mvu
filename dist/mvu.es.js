var W = 11;
function le(e, n) {
  var t = n.attributes, a, r, s, d, o;
  if (!(n.nodeType === W || e.nodeType === W)) {
    for (var T = t.length - 1; T >= 0; T--)
      a = t[T], r = a.name, s = a.namespaceURI, d = a.value, s ? (r = a.localName || r, o = e.getAttributeNS(s, r), o !== d && (a.prefix === "xmlns" && (r = a.name), e.setAttributeNS(s, r, d))) : (o = e.getAttribute(r), o !== d && e.setAttribute(r, d));
    for (var M = e.attributes, O = M.length - 1; O >= 0; O--)
      a = M[O], r = a.name, s = a.namespaceURI, s ? (r = a.localName || r, n.hasAttributeNS(s, r) || e.removeAttributeNS(s, r)) : n.hasAttribute(r) || e.removeAttribute(r);
  }
}
var V, fe = "http://www.w3.org/1999/xhtml", c = typeof document > "u" ? void 0 : document, ue = !!c && "content" in c.createElement("template"), se = !!c && c.createRange && "createContextualFragment" in c.createRange();
function de(e) {
  var n = c.createElement("template");
  return n.innerHTML = e, n.content.childNodes[0];
}
function ve(e) {
  V || (V = c.createRange(), V.selectNode(c.body));
  var n = V.createContextualFragment(e);
  return n.childNodes[0];
}
function ce(e) {
  var n = c.createElement("body");
  return n.innerHTML = e, n.childNodes[0];
}
function pe(e) {
  return e = e.trim(), ue ? de(e) : se ? ve(e) : ce(e);
}
function R(e, n) {
  var t = e.nodeName, a = n.nodeName, r, s;
  return t === a ? !0 : (r = t.charCodeAt(0), s = a.charCodeAt(0), r <= 90 && s >= 97 ? t === a.toUpperCase() : s <= 90 && r >= 97 ? a === t.toUpperCase() : !1);
}
function oe(e, n) {
  return !n || n === fe ? c.createElement(e) : c.createElementNS(n, e);
}
function he(e, n) {
  for (var t = e.firstChild; t; ) {
    var a = t.nextSibling;
    n.appendChild(t), t = a;
  }
  return n;
}
function z(e, n, t) {
  e[t] !== n[t] && (e[t] = n[t], e[t] ? e.setAttribute(t, "") : e.removeAttribute(t));
}
var Y = {
  OPTION: function(e, n) {
    var t = e.parentNode;
    if (t) {
      var a = t.nodeName.toUpperCase();
      a === "OPTGROUP" && (t = t.parentNode, a = t && t.nodeName.toUpperCase()), a === "SELECT" && !t.hasAttribute("multiple") && (e.hasAttribute("selected") && !n.selected && (e.setAttribute("selected", "selected"), e.removeAttribute("selected")), t.selectedIndex = -1);
    }
    z(e, n, "selected");
  },
  INPUT: function(e, n) {
    z(e, n, "checked"), z(e, n, "disabled"), e.value !== n.value && (e.value = n.value), n.hasAttribute("value") || e.removeAttribute("value");
  },
  TEXTAREA: function(e, n) {
    var t = n.value;
    e.value !== t && (e.value = t);
    var a = e.firstChild;
    if (a) {
      var r = a.nodeValue;
      if (r == t || !t && r == e.placeholder)
        return;
      a.nodeValue = t;
    }
  },
  SELECT: function(e, n) {
    if (!n.hasAttribute("multiple")) {
      for (var t = -1, a = 0, r = e.firstChild, s, d; r; )
        if (d = r.nodeName && r.nodeName.toUpperCase(), d === "OPTGROUP")
          s = r, r = s.firstChild;
        else {
          if (d === "OPTION") {
            if (r.hasAttribute("selected")) {
              t = a;
              break;
            }
            a++;
          }
          r = r.nextSibling, !r && s && (r = s.nextSibling, s = null);
        }
      e.selectedIndex = t;
    }
  }
}, U = 1, Ae = 11, $ = 3, J = 8;
function b() {
}
function ge(e) {
  if (e)
    return e.getAttribute && e.getAttribute("id") || e.id;
}
function Te(e) {
  return function(t, a, r) {
    if (r || (r = {}), typeof a == "string")
      if (t.nodeName === "#document" || t.nodeName === "HTML" || t.nodeName === "BODY") {
        var s = a;
        a = c.createElement("html"), a.innerHTML = s;
      } else
        a = pe(a);
    var d = r.getNodeKey || ge, o = r.onBeforeNodeAdded || b, T = r.onNodeAdded || b, M = r.onBeforeElUpdated || b, O = r.onElUpdated || b, te = r.onBeforeNodeDiscarded || b, w = r.onNodeDiscarded || b, ne = r.onBeforeElChildrenUpdated || b, H = r.childrenOnly === !0, m = /* @__PURE__ */ Object.create(null), x = [];
    function B(f) {
      x.push(f);
    }
    function X(f, l) {
      if (f.nodeType === U)
        for (var i = f.firstChild; i; ) {
          var u = void 0;
          l && (u = d(i)) ? B(u) : (w(i), i.firstChild && X(i, l)), i = i.nextSibling;
        }
    }
    function D(f, l, i) {
      te(f) !== !1 && (l && l.removeChild(f), w(f), X(f, i));
    }
    function F(f) {
      if (f.nodeType === U || f.nodeType === Ae)
        for (var l = f.firstChild; l; ) {
          var i = d(l);
          i && (m[i] = l), F(l), l = l.nextSibling;
        }
    }
    F(t);
    function k(f) {
      T(f);
      for (var l = f.firstChild; l; ) {
        var i = l.nextSibling, u = d(l);
        if (u) {
          var p = m[u];
          p && R(l, p) ? (l.parentNode.replaceChild(p, l), L(p, l)) : k(l);
        } else
          k(l);
        l = i;
      }
    }
    function ae(f, l, i) {
      for (; l; ) {
        var u = l.nextSibling;
        (i = d(l)) ? B(i) : D(l, f, !0), l = u;
      }
    }
    function L(f, l, i) {
      var u = d(l);
      u && delete m[u], !(!i && (M(f, l) === !1 || (e(f, l), O(f), ne(f, l) === !1))) && (f.nodeName !== "TEXTAREA" ? re(f, l) : Y.TEXTAREA(f, l));
    }
    function re(f, l) {
      var i = l.firstChild, u = f.firstChild, p, h, N, C, A;
      e:
        for (; i; ) {
          for (C = i.nextSibling, p = d(i); u; ) {
            if (N = u.nextSibling, i.isSameNode && i.isSameNode(u)) {
              i = C, u = N;
              continue e;
            }
            h = d(u);
            var P = u.nodeType, g = void 0;
            if (P === i.nodeType && (P === U ? (p ? p !== h && ((A = m[p]) ? N === A ? g = !1 : (f.insertBefore(A, u), h ? B(h) : D(u, f, !0), u = A) : g = !1) : h && (g = !1), g = g !== !1 && R(u, i), g && L(u, i)) : (P === $ || P == J) && (g = !0, u.nodeValue !== i.nodeValue && (u.nodeValue = i.nodeValue))), g) {
              i = C, u = N;
              continue e;
            }
            h ? B(h) : D(u, f, !0), u = N;
          }
          if (p && (A = m[p]) && R(A, i))
            f.appendChild(A), L(A, i);
          else {
            var I = o(i);
            I !== !1 && (I && (i = I), i.actualize && (i = i.actualize(f.ownerDocument || c)), f.appendChild(i), k(i));
          }
          i = C, u = N;
        }
      ae(f, u, h);
      var q = Y[f.nodeName];
      q && q(f, l);
    }
    var v = t, _ = v.nodeType, j = a.nodeType;
    if (!H) {
      if (_ === U)
        j === U ? R(t, a) || (w(t), v = he(t, oe(a.nodeName, a.namespaceURI))) : v = a;
      else if (_ === $ || _ === J) {
        if (j === _)
          return v.nodeValue !== a.nodeValue && (v.nodeValue = a.nodeValue), v;
        v = a;
      }
    }
    if (v === a)
      w(t);
    else {
      if (a.isSameNode && a.isSameNode(v))
        return;
      if (L(v, a, H), x)
        for (var E = 0, ie = x.length; E < ie; E++) {
          var G = m[x[E]];
          G && D(G, G.parentNode, !1);
        }
    }
    return !H && v !== t && t.parentNode && (v.actualize && (v = v.actualize(t.ownerDocument || c)), t.parentNode.replaceChild(v, t)), v;
  };
}
var be = Te(le), S, y = [];
function Se(e) {
  return y.push(S), y.length > 100 && (alert("DML error: _baseStackOverflow in bushBase()"), y = []), typeof e == "string" && (S = document.getElementById(e)), S = e, S;
}
function Q() {
  return y.length;
}
function ye(e = 1, n = -1, t = "unselectBase") {
  for (let a = 0; a < e; a++) {
    if (y.length <= 0) {
      alert("DML error: _baseStack empty in popBase()");
      break;
    } else
      S = y.pop();
    n >= 0 && Q() != n && alert("DML error: _baseStack size mismatch - " + t + ", before: " + n + ", after: " + Q());
  }
  return y.length;
}
function me(e) {
  if (typeof e == "string") {
    let n = K("span", null, null);
    return n.innerHTML = e, n;
  } else
    return e;
}
function Ne(e, n) {
  return typeof n == "string" && (n = {
    style: n
  }), typeof n == "object" && Object.keys(n).forEach(function(t) {
    let a = n[t];
    t != "style" ? e.setAttribute(t, a) : a.split(";").forEach(function(s) {
      if (s) {
        let d = s.split(":");
        if (d.length == 2) {
          let o = d[0].trim(), T = d[1].trim();
          e.style.setProperty(o, T);
        }
      }
    });
  }), e;
}
function K(e, n, t) {
  let a = document.createElement(e), r = Array.isArray(t);
  return t && (typeof t == "number" && (t = String(t)), typeof t == "string" ? a.innerHTML = t : r ? a.append(...t) : a.appendChild(t)), n && Ne(a, n), a;
}
function Z(e) {
  let n = me(e);
  if (S)
    S.appendChild(n);
  else if (document.body)
    document.body.appendChild(n);
  else {
    console.log("null Body found: " + e.textContent);
    return;
  }
  return n;
}
function ee(e, n, t) {
  return Z(K(e, n, t));
}
function Oe(e, n) {
  return ee("div", n, e);
}
const Ue = (e = Oe("", null)) => Se(e), Me = ye, we = (e) => (n, t) => {
  let a = ee(e, t, n);
  return a.name = e, a;
};
function xe(e) {
  var n = document.createElement("template");
  e = e.trim(), n.innerHTML = e;
  const t = n.content.firstChild;
  return Z(t), t;
}
function Be(e, ...n) {
  const t = K(e, null, null);
  return t.id = "wrapper", t.append(...n), t;
}
function De(e) {
  return Be("span", e);
}
function Le(e, n) {
  const t = (r, s) => !r.isEqualNode(s);
  let a = e.firstChild;
  be(a, De(n), { onBeforeElUpdated: t });
}
const _e = { m: we, dom: Ue, udom: Me, render: Le, html: xe };
globalThis.MVU = _e;
