var ze = 11;
function at(e, n) {
  var t = n.attributes, a, f, E, _, R;
  if (!(n.nodeType === ze || e.nodeType === ze)) {
    for (var H = t.length - 1; H >= 0; H--)
      a = t[H], f = a.name, E = a.namespaceURI, _ = a.value, E ? (f = a.localName || f, R = e.getAttributeNS(E, f), R !== _ && (a.prefix === "xmlns" && (f = a.name), e.setAttributeNS(E, f, _))) : (R = e.getAttribute(f), R !== _ && e.setAttribute(f, _));
    for (var J = e.attributes, j = J.length - 1; j >= 0; j--)
      a = J[j], f = a.name, E = a.namespaceURI, E ? (f = a.localName || f, n.hasAttributeNS(E, f) || e.removeAttributeNS(E, f)) : n.hasAttribute(f) || e.removeAttribute(f);
  }
}
var ge, st = "http://www.w3.org/1999/xhtml", k = typeof document > "u" ? void 0 : document, lt = !!k && "content" in k.createElement("template"), ft = !!k && k.createRange && "createContextualFragment" in k.createRange();
function ut(e) {
  var n = k.createElement("template");
  return n.innerHTML = e, n.content.childNodes[0];
}
function ct(e) {
  ge || (ge = k.createRange(), ge.selectNode(k.body));
  var n = ge.createContextualFragment(e);
  return n.childNodes[0];
}
function ot(e) {
  var n = k.createElement("body");
  return n.innerHTML = e, n.childNodes[0];
}
function dt(e) {
  return e = e.trim(), lt ? ut(e) : ft ? ct(e) : ot(e);
}
function Ne(e, n) {
  var t = e.nodeName, a = n.nodeName, f, E;
  return t === a ? !0 : (f = t.charCodeAt(0), E = a.charCodeAt(0), f <= 90 && E >= 97 ? t === a.toUpperCase() : E <= 90 && f >= 97 ? a === t.toUpperCase() : !1);
}
function Tt(e, n) {
  return !n || n === st ? k.createElement(e) : k.createElementNS(n, e);
}
function At(e, n) {
  for (var t = e.firstChild; t; ) {
    var a = t.nextSibling;
    n.appendChild(t), t = a;
  }
  return n;
}
function Me(e, n, t) {
  e[t] !== n[t] && (e[t] = n[t], e[t] ? e.setAttribute(t, "") : e.removeAttribute(t));
}
var Ye = {
  OPTION: function(e, n) {
    var t = e.parentNode;
    if (t) {
      var a = t.nodeName.toUpperCase();
      a === "OPTGROUP" && (t = t.parentNode, a = t && t.nodeName.toUpperCase()), a === "SELECT" && !t.hasAttribute("multiple") && (e.hasAttribute("selected") && !n.selected && (e.setAttribute("selected", "selected"), e.removeAttribute("selected")), t.selectedIndex = -1);
    }
    Me(e, n, "selected");
  },
  INPUT: function(e, n) {
    Me(e, n, "checked"), Me(e, n, "disabled"), e.value !== n.value && (e.value = n.value), n.hasAttribute("value") || e.removeAttribute("value");
  },
  TEXTAREA: function(e, n) {
    var t = n.value;
    e.value !== t && (e.value = t);
    var a = e.firstChild;
    if (a) {
      var f = a.nodeValue;
      if (f == t || !t && f == e.placeholder)
        return;
      a.nodeValue = t;
    }
  },
  SELECT: function(e, n) {
    if (!n.hasAttribute("multiple")) {
      for (var t = -1, a = 0, f = e.firstChild, E, _; f; )
        if (_ = f.nodeName && f.nodeName.toUpperCase(), _ === "OPTGROUP")
          E = f, f = E.firstChild;
        else {
          if (_ === "OPTION") {
            if (f.hasAttribute("selected")) {
              t = a;
              break;
            }
            a++;
          }
          f = f.nextSibling, !f && E && (f = E.nextSibling, E = null);
        }
      e.selectedIndex = t;
    }
  }
}, Ee = 1, pt = 11, qe = 3, Ze = 8;
function Y() {
}
function Et(e) {
  if (e)
    return e.getAttribute && e.getAttribute("id") || e.id;
}
function _t(e) {
  return function(t, a, f) {
    if (f || (f = {}), typeof a == "string")
      if (t.nodeName === "#document" || t.nodeName === "HTML" || t.nodeName === "BODY") {
        var E = a;
        a = k.createElement("html"), a.innerHTML = E;
      } else
        a = dt(a);
    var _ = f.getNodeKey || Et, R = f.onBeforeNodeAdded || Y, H = f.onNodeAdded || Y, J = f.onBeforeElUpdated || Y, j = f.onElUpdated || Y, Ce = f.onBeforeNodeDiscarded || Y, ee = f.onNodeDiscarded || Y, me = f.onBeforeElChildrenUpdated || Y, ue = f.childrenOnly === !0, D = /* @__PURE__ */ Object.create(null), h = [];
    function w(o) {
      h.push(o);
    }
    function M(o, c) {
      if (o.nodeType === Ee)
        for (var u = o.firstChild; u; ) {
          var T = void 0;
          c && (T = _(u)) ? w(T) : (ee(u), u.firstChild && M(u, c)), u = u.nextSibling;
        }
    }
    function I(o, c, u) {
      Ce(o) !== !1 && (c && c.removeChild(o), ee(o), M(o, u));
    }
    function te(o) {
      if (o.nodeType === Ee || o.nodeType === pt)
        for (var c = o.firstChild; c; ) {
          var u = _(c);
          u && (D[u] = c), te(c), c = c.nextSibling;
        }
    }
    te(t);
    function ne(o) {
      H(o);
      for (var c = o.firstChild; c; ) {
        var u = c.nextSibling, T = _(c);
        if (T) {
          var g = D[T];
          g && Ne(c, g) ? (c.parentNode.replaceChild(g, c), re(g, c)) : ne(c);
        } else
          ne(c);
        c = u;
      }
    }
    function _e(o, c, u) {
      for (; c; ) {
        var T = c.nextSibling;
        (u = _(c)) ? w(u) : I(c, o, !0), c = T;
      }
    }
    function re(o, c, u) {
      var T = _(c);
      T && delete D[T], !(!u && (J(o, c) === !1 || (e(o, c), j(o), me(o, c) === !1))) && (o.nodeName !== "TEXTAREA" ? S(o, c) : Ye.TEXTAREA(o, c));
    }
    function S(o, c) {
      var u = c.firstChild, T = o.firstChild, g, y, U, Q, L;
      e:
        for (; u; ) {
          for (Q = u.nextSibling, g = _(u); T; ) {
            if (U = T.nextSibling, u.isSameNode && u.isSameNode(T)) {
              u = Q, T = U;
              continue e;
            }
            y = _(T);
            var O = T.nodeType, x = void 0;
            if (O === u.nodeType && (O === Ee ? (g ? g !== y && ((L = D[g]) ? U === L ? x = !1 : (o.insertBefore(L, T), y ? w(y) : I(T, o, !0), T = L) : x = !1) : y && (x = !1), x = x !== !1 && Ne(T, u), x && re(T, u)) : (O === qe || O == Ze) && (x = !0, T.nodeValue !== u.nodeValue && (T.nodeValue = u.nodeValue))), x) {
              u = Q, T = U;
              continue e;
            }
            y ? w(y) : I(T, o, !0), T = U;
          }
          if (g && (L = D[g]) && Ne(L, u))
            o.appendChild(L), re(L, u);
          else {
            var ae = R(u);
            ae !== !1 && (ae && (u = ae), u.actualize && (u = u.actualize(o.ownerDocument || k)), o.appendChild(u), ne(u));
          }
          u = Q, T = U;
        }
      _e(o, T, y);
      var ce = Ye[o.nodeName];
      ce && ce(o, c);
    }
    var b = t, W = b.nodeType, ie = a.nodeType;
    if (!ue) {
      if (W === Ee)
        ie === Ee ? Ne(t, a) || (ee(t), b = At(t, Tt(a.nodeName, a.namespaceURI))) : b = a;
      else if (W === qe || W === Ze) {
        if (ie === W)
          return b.nodeValue !== a.nodeValue && (b.nodeValue = a.nodeValue), b;
        b = a;
      }
    }
    if (b === a)
      ee(t);
    else {
      if (a.isSameNode && a.isSameNode(b))
        return;
      if (re(b, a, ue), h)
        for (var V = 0, B = h.length; V < B; V++) {
          var $ = D[h[V]];
          $ && I($, $.parentNode, !1);
        }
    }
    return !ue && b !== t && t.parentNode && (b.actualize && (b = b.actualize(t.ownerDocument || k)), t.parentNode.replaceChild(b, t)), b;
  };
}
var vt = _t(at);
(function(e, n) {
  typeof exports == "object" && typeof module < "u" ? n(exports) : typeof define == "function" && define.amd ? define(["exports"], n) : (e = typeof globalThis < "u" ? globalThis : e || self, n(e.htl = {}));
})(globalThis, function(e) {
  var n = "0.3.1";
  function t(s) {
    const d = document.createElement("template");
    return d.innerHTML = s, document.importNode(d.content, !0);
  }
  function a(s) {
    const d = document.createElementNS("http://www.w3.org/2000/svg", "g");
    return d.innerHTML = s, d;
  }
  const f = Object.assign(he(t, (s) => {
    if (s.firstChild === null)
      return null;
    if (s.firstChild === s.lastChild)
      return s.removeChild(s.firstChild);
    const d = document.createElement("span");
    return d.appendChild(s), d;
  }), { fragment: he(t, (s) => s) }), E = Object.assign(he(a, (s) => s.firstChild === null ? null : s.firstChild === s.lastChild ? s.removeChild(s.firstChild) : s), { fragment: he(a, (s) => {
    const d = document.createDocumentFragment();
    for (; s.firstChild; )
      d.appendChild(s.firstChild);
    return d;
  }) }), _ = 9, R = 10, H = 12, J = 13, j = 32, Ce = 65, ee = 90, me = 97, ue = 122, D = 60, h = 62, w = 47, M = 45, I = 33, te = 61, ne = 34, _e = 39, re = 63, S = 1, b = 2, W = 3, ie = 4, V = 5, B = 6, $ = 7, o = 8, c = 9, u = 10, T = 11, g = 12, y = 13, U = 14, Q = 15, L = 16, O = 17, x = 18, ae = 19, ce = 20, De = 21, ke = 22, oe = 23, Le = 24, xe = 25, P = 26, Re = 27, Be = 28, Pe = 29, tt = 128, He = 1, nt = 8, rt = 1, Ge = "http://www.w3.org/2000/svg", K = "http://www.w3.org/1999/xlink", Ie = "http://www.w3.org/XML/1998/namespace", Ve = "http://www.w3.org/2000/xmlns/", Fe = new Map([
    "attributeName",
    "attributeType",
    "baseFrequency",
    "baseProfile",
    "calcMode",
    "clipPathUnits",
    "diffuseConstant",
    "edgeMode",
    "filterUnits",
    "glyphRef",
    "gradientTransform",
    "gradientUnits",
    "kernelMatrix",
    "kernelUnitLength",
    "keyPoints",
    "keySplines",
    "keyTimes",
    "lengthAdjust",
    "limitingConeAngle",
    "markerHeight",
    "markerUnits",
    "markerWidth",
    "maskContentUnits",
    "maskUnits",
    "numOctaves",
    "pathLength",
    "patternContentUnits",
    "patternTransform",
    "patternUnits",
    "pointsAtX",
    "pointsAtY",
    "pointsAtZ",
    "preserveAlpha",
    "preserveAspectRatio",
    "primitiveUnits",
    "refX",
    "refY",
    "repeatCount",
    "repeatDur",
    "requiredExtensions",
    "requiredFeatures",
    "specularConstant",
    "specularExponent",
    "spreadMethod",
    "startOffset",
    "stdDeviation",
    "stitchTiles",
    "surfaceScale",
    "systemLanguage",
    "tableValues",
    "targetX",
    "targetY",
    "textLength",
    "viewBox",
    "viewTarget",
    "xChannelSelector",
    "yChannelSelector",
    "zoomAndPan"
  ].map((s) => [s.toLowerCase(), s])), ve = /* @__PURE__ */ new Map([
    ["xlink:actuate", K],
    ["xlink:arcrole", K],
    ["xlink:href", K],
    ["xlink:role", K],
    ["xlink:show", K],
    ["xlink:title", K],
    ["xlink:type", K],
    ["xml:lang", Ie],
    ["xml:space", Ie],
    ["xmlns", Ve],
    ["xmlns:xlink", Ve]
  ]);
  function he(s, d) {
    return function({ raw: C }) {
      let r = S, N = "", z, m, Ae, le, be = 0;
      for (let A = 0, G = arguments.length; A < G; ++A) {
        const p = C[A];
        if (A > 0) {
          const i = arguments[A];
          switch (r) {
            case P: {
              if (i != null) {
                const v = `${i}`;
                if (Xe(m))
                  N += v.replace(/[<]/g, se);
                else {
                  if (new RegExp(`</${m}[\\s>/]`, "i").test(N.slice(-m.length - 2) + v))
                    throw new Error("unsafe raw text");
                  N += v;
                }
              }
              break;
            }
            case S: {
              i == null || (i instanceof Node || typeof i != "string" && i[Symbol.iterator] || /(?:^|>)$/.test(C[A - 1]) && /^(?:<|$)/.test(p) ? (N += "<!--::" + A + "-->", be |= tt) : N += `${i}`.replace(/[<&]/g, se));
              break;
            }
            case c: {
              r = g;
              let v;
              if (/^[\s>]/.test(p)) {
                if (i == null || i === !1) {
                  N = N.slice(0, Ae - C[A - 1].length);
                  break;
                }
                if (i === !0 || (v = `${i}`) == "") {
                  N += "''";
                  break;
                }
                if (C[A - 1].slice(Ae, le) === "style" && we(i) || typeof i == "function") {
                  N += "::" + A, be |= He;
                  break;
                }
              }
              if (v === void 0 && (v = `${i}`), v === "")
                throw new Error("unsafe unquoted empty string");
              N += v.replace(/^['"]|[\s>&]/g, se);
              break;
            }
            case g: {
              N += `${i}`.replace(/[\s>&]/g, se);
              break;
            }
            case T: {
              N += `${i}`.replace(/['&]/g, se);
              break;
            }
            case u: {
              N += `${i}`.replace(/["&]/g, se);
              break;
            }
            case B: {
              if (we(i)) {
                N += "::" + A + "=''", be |= He;
                break;
              }
              throw new Error("invalid binding");
            }
            case O:
              break;
            default:
              throw new Error("invalid binding");
          }
        }
        for (let i = 0, v = p.length; i < v; ++i) {
          const l = p.charCodeAt(i);
          switch (r) {
            case S: {
              l === D && (r = b);
              break;
            }
            case b: {
              l === I ? r = xe : l === w ? r = W : Se(l) ? (z = i, m = void 0, r = ie, --i) : l === re ? (r = V, --i) : (r = S, --i);
              break;
            }
            case W: {
              Se(l) ? (r = ie, --i) : l === h ? r = S : (r = V, --i);
              break;
            }
            case ie: {
              F(l) ? (r = B, m = Te(p, z, i)) : l === w ? r = U : l === h && (m = Te(p, z, i), r = de(m) ? P : S);
              break;
            }
            case B: {
              F(l) || (l === w || l === h ? (r = $, --i) : l === te ? (r = o, Ae = i + 1, le = void 0) : (r = o, --i, Ae = i + 1, le = void 0));
              break;
            }
            case o: {
              F(l) || l === w || l === h ? (r = $, --i, le = i) : l === te && (r = c, le = i);
              break;
            }
            case $: {
              F(l) || (l === w ? r = U : l === te ? r = c : l === h ? r = de(m) ? P : S : (r = o, --i, Ae = i + 1, le = void 0));
              break;
            }
            case c: {
              F(l) || (l === ne ? r = u : l === _e ? r = T : l === h ? r = de(m) ? P : S : (r = g, --i));
              break;
            }
            case u: {
              l === ne && (r = y);
              break;
            }
            case T: {
              l === _e && (r = y);
              break;
            }
            case g: {
              F(l) ? r = B : l === h && (r = de(m) ? P : S);
              break;
            }
            case y: {
              F(l) ? r = B : l === w ? r = U : l === h ? r = de(m) ? P : S : (r = B, --i);
              break;
            }
            case U: {
              l === h ? r = S : (r = B, --i);
              break;
            }
            case V: {
              l === h && (r = S);
              break;
            }
            case Q: {
              l === M ? r = L : l === h ? r = S : (r = O, --i);
              break;
            }
            case L: {
              l === M ? r = oe : l === h ? r = S : (r = O, --i);
              break;
            }
            case O: {
              l === D ? r = x : l === M && (r = ke);
              break;
            }
            case x: {
              l === I ? r = ae : l !== D && (r = O, --i);
              break;
            }
            case ae: {
              l === M ? r = ce : (r = O, --i);
              break;
            }
            case ce: {
              l === M ? r = De : (r = oe, --i);
              break;
            }
            case De: {
              r = oe, --i;
              break;
            }
            case ke: {
              l === M ? r = oe : (r = O, --i);
              break;
            }
            case oe: {
              l === h ? r = S : l === I ? r = Le : l !== M && (r = O, --i);
              break;
            }
            case Le: {
              l === M ? r = ke : l === h ? r = S : (r = O, --i);
              break;
            }
            case xe: {
              l === M && p.charCodeAt(i + 1) === M ? (r = Q, ++i) : (r = V, --i);
              break;
            }
            case P: {
              l === D && (r = Re);
              break;
            }
            case Re: {
              l === w ? r = Be : (r = P, --i);
              break;
            }
            case Be: {
              Se(l) ? (z = i, r = Pe, --i) : (r = P, --i);
              break;
            }
            case Pe: {
              F(l) && m === Te(p, z, i) ? r = B : l === w && m === Te(p, z, i) ? r = U : l === h && m === Te(p, z, i) ? r = S : Se(l) || (r = P, --i);
              break;
            }
            default: {
              r = void 0;
              break;
            }
          }
        }
        N += p;
      }
      const $e = s(N), Qe = document.createTreeWalker($e, be, null, !1), Ke = [];
      for (; Qe.nextNode(); ) {
        const A = Qe.currentNode;
        switch (A.nodeType) {
          case rt: {
            const G = A.attributes;
            for (let p = 0, i = G.length; p < i; ++p) {
              const { name: v, value: l } = G[p];
              if (/^::/.test(v)) {
                const fe = arguments[+v.slice(2)];
                je(A, v), --p, --i;
                for (const pe in fe) {
                  const X = fe[pe];
                  X == null || X === !1 || (typeof X == "function" ? A[pe] = X : pe === "style" && we(X) ? We(A[pe], X) : it(A, pe, X === !0 ? "" : X));
                }
              } else if (/^::/.test(l)) {
                const fe = arguments[+l.slice(2)];
                je(A, v), --p, --i, typeof fe == "function" ? A[v] = fe : We(A[v], fe);
              }
            }
            break;
          }
          case nt: {
            if (/^::/.test(A.data)) {
              const G = A.parentNode, p = arguments[+A.data.slice(2)];
              if (p instanceof Node)
                G.insertBefore(p, A);
              else if (typeof p != "string" && p[Symbol.iterator])
                if (p instanceof NodeList || p instanceof HTMLCollection)
                  for (let i = p.length - 1, v = A; i >= 0; --i)
                    v = G.insertBefore(p[i], v);
                else
                  for (const i of p)
                    i != null && G.insertBefore(i instanceof Node ? i : document.createTextNode(i), A);
              else
                G.insertBefore(document.createTextNode(p), A);
              Ke.push(A);
            }
            break;
          }
        }
      }
      for (const A of Ke)
        A.parentNode.removeChild(A);
      return d($e);
    };
  }
  function se(s) {
    return `&#${s.charCodeAt(0).toString()};`;
  }
  function Se(s) {
    return Ce <= s && s <= ee || me <= s && s <= ue;
  }
  function F(s) {
    return s === _ || s === R || s === H || s === j || s === J;
  }
  function we(s) {
    return s && s.toString === Object.prototype.toString;
  }
  function de(s) {
    return s === "script" || s === "style" || Xe(s);
  }
  function Xe(s) {
    return s === "textarea" || s === "title";
  }
  function Te(s, d, C) {
    return s.slice(d, C).toLowerCase();
  }
  function it(s, d, C) {
    if (s.namespaceURI === Ge && (d = d.toLowerCase(), d = Fe.get(d) || d, ve.has(d))) {
      s.setAttributeNS(ve.get(d), d, C);
      return;
    }
    s.setAttribute(d, C);
  }
  function je(s, d) {
    if (s.namespaceURI === Ge && (d = d.toLowerCase(), d = Fe.get(d) || d, ve.has(d))) {
      s.removeAttributeNS(ve.get(d), d);
      return;
    }
    s.removeAttribute(d);
  }
  function We(s, d) {
    for (const C in d) {
      const r = d[C];
      C.startsWith("--") ? s.setProperty(C, r) : s[C] = r;
    }
  }
  e.html = f, e.svg = E, e.version = n, Object.defineProperty(e, "__esModule", { value: !0 });
});
const Oe = htl;
var q, Z = [];
function ht(e) {
  return Z.push(q), Z.length > 100 && (alert("DML error: _baseStackOverflow in bushBase()"), Z = []), typeof e == "string" && (q = document.getElementById(e)), q = e, q;
}
function Je() {
  return Z.length;
}
function St(e = 1, n = -1, t = "unselectBase") {
  for (let a = 0; a < e; a++) {
    if (Z.length <= 0) {
      alert("DML error: _baseStack empty in popBase()");
      break;
    } else
      q = Z.pop();
    n >= 0 && Je() != n && alert("DML error: _baseStack size mismatch - " + t + ", before: " + n + ", after: " + Je());
  }
  return Z.length;
}
function bt(e) {
  if (typeof e == "string") {
    let n = ye("span", null, null);
    return n.innerHTML = e, n;
  } else
    return e;
}
function gt(e, n) {
  return typeof n == "string" && (n = {
    style: n
  }), typeof n == "object" && Object.keys(n).forEach(function(t) {
    let a = n[t];
    t != "style" ? e.setAttribute(t, a) : a.split(";").forEach(function(E) {
      if (E) {
        let _ = E.split(":");
        if (_.length == 2) {
          let R = _[0].trim(), H = _[1].trim();
          e.style.setProperty(R, H);
        }
      }
    });
  }), e;
}
function ye(e, n, t) {
  let a = document.createElement(e), f = Array.isArray(t);
  return t && (typeof t == "number" && (t = String(t)), typeof t == "string" ? a.innerHTML = t : f ? a.append(...t) : a.appendChild(t)), n && gt(a, n), a;
}
function Ue(e) {
  let n = bt(e);
  if (q)
    q.appendChild(n);
  else if (document.body)
    document.body.appendChild(n);
  else {
    console.log("null Body found: " + e.textContent);
    return;
  }
  return n;
}
function et(e, n, t) {
  return Ue(ye(e, n, t));
}
function Nt(e, n) {
  return et("div", n, e);
}
const Ot = (e = Nt("", null)) => ht(e), Ct = St, mt = (e) => (n, t) => {
  let a = et(e, t, n);
  return a.name = e, a;
};
function kt(e, ...n) {
  let t = Oe.html(e, ...n);
  return t.fragment = Oe.html.fragment, Ue(t), t;
}
function wt(e, ...n) {
  let t = Oe.svg(e, ...n);
  return t.fragment = Oe.svg.fragment, Ue(t), t;
}
function Mt(e, ...n) {
  const t = ye(e, null, null);
  return t.id = "wrapper", t.append(...n), t;
}
function yt(e) {
  return Mt("span", e);
}
function Ut(e, n) {
  const t = (f, E) => !f.isEqualNode(E);
  let a = e.firstChild;
  vt(a, yt(n), { onBeforeElUpdated: t });
}
const Dt = { m: mt, dom: Ot, udom: Ct, render: Ut, html: kt, svg: wt };
console.log("version v2.0.3");
export {
  Dt as MVU
};
