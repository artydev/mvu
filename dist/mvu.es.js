var ze = 11;
function st(e, n) {
  var t = n.attributes, a, f, E, _, x;
  if (!(n.nodeType === ze || e.nodeType === ze)) {
    for (var B = t.length - 1; B >= 0; B--)
      a = t[B], f = a.name, E = a.namespaceURI, _ = a.value, E ? (f = a.localName || f, x = e.getAttributeNS(E, f), x !== _ && (a.prefix === "xmlns" && (f = a.name), e.setAttributeNS(E, f, _))) : (x = e.getAttribute(f), x !== _ && e.setAttribute(f, _));
    for (var ie = e.attributes, $ = ie.length - 1; $ >= 0; $--)
      a = ie[$], f = a.name, E = a.namespaceURI, E ? (f = a.localName || f, n.hasAttributeNS(E, f) || e.removeAttributeNS(E, f)) : n.hasAttribute(f) || e.removeAttribute(f);
  }
}
var Ne, lt = "http://www.w3.org/1999/xhtml", M = typeof document > "u" ? void 0 : document, ft = !!M && "content" in M.createElement("template"), ut = !!M && M.createRange && "createContextualFragment" in M.createRange();
function ct(e) {
  var n = M.createElement("template");
  return n.innerHTML = e, n.content.childNodes[0];
}
function ot(e) {
  Ne || (Ne = M.createRange(), Ne.selectNode(M.body));
  var n = Ne.createContextualFragment(e);
  return n.childNodes[0];
}
function dt(e) {
  var n = M.createElement("body");
  return n.innerHTML = e, n.childNodes[0];
}
function Tt(e) {
  return e = e.trim(), ft ? ct(e) : ut ? ot(e) : dt(e);
}
function Ce(e, n) {
  var t = e.nodeName, a = n.nodeName, f, E;
  return t === a ? !0 : (f = t.charCodeAt(0), E = a.charCodeAt(0), f <= 90 && E >= 97 ? t === a.toUpperCase() : E <= 90 && f >= 97 ? a === t.toUpperCase() : !1);
}
function At(e, n) {
  return !n || n === lt ? M.createElement(e) : M.createElementNS(n, e);
}
function pt(e, n) {
  for (var t = e.firstChild; t; ) {
    var a = t.nextSibling;
    n.appendChild(t), t = a;
  }
  return n;
}
function ye(e, n, t) {
  e[t] !== n[t] && (e[t] = n[t], e[t] ? e.setAttribute(t, "") : e.removeAttribute(t));
}
var Ye = {
  OPTION: function(e, n) {
    var t = e.parentNode;
    if (t) {
      var a = t.nodeName.toUpperCase();
      a === "OPTGROUP" && (t = t.parentNode, a = t && t.nodeName.toUpperCase()), a === "SELECT" && !t.hasAttribute("multiple") && (e.hasAttribute("selected") && !n.selected && (e.setAttribute("selected", "selected"), e.removeAttribute("selected")), t.selectedIndex = -1);
    }
    ye(e, n, "selected");
  },
  INPUT: function(e, n) {
    ye(e, n, "checked"), ye(e, n, "disabled"), e.value !== n.value && (e.value = n.value), n.hasAttribute("value") || e.removeAttribute("value");
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
}, ve = 1, qe = 11, Ze = 3, Je = 8;
function W() {
}
function Et(e) {
  if (e)
    return e.getAttribute && e.getAttribute("id") || e.id;
}
function vt(e) {
  return function(t, a, f) {
    if (f || (f = {}), typeof a == "string")
      if (t.nodeName === "#document" || t.nodeName === "HTML" || t.nodeName === "BODY") {
        var E = a;
        a = M.createElement("html"), a.innerHTML = E;
      } else
        a = Tt(a);
    else
      a.nodeType === qe && (a = a.firstElementChild);
    var _ = f.getNodeKey || Et, x = f.onBeforeNodeAdded || W, B = f.onNodeAdded || W, ie = f.onBeforeElUpdated || W, $ = f.onElUpdated || W, Oe = f.onBeforeNodeDiscarded || W, ae = f.onNodeDiscarded || W, ke = f.onBeforeElChildrenUpdated || W, we = f.skipFromChildren || W, Q = f.addChild || function(c, u) {
      return c.appendChild(u);
    }, b = f.childrenOnly === !0, m = /* @__PURE__ */ Object.create(null), O = [];
    function I(c) {
      O.push(c);
    }
    function se(c, u) {
      if (c.nodeType === ve)
        for (var v = c.firstChild; v; ) {
          var d = void 0;
          u && (d = _(v)) ? I(d) : (ae(v), v.firstChild && se(v, u)), v = v.nextSibling;
        }
    }
    function K(c, u, v) {
      Oe(c) !== !1 && (u && u.removeChild(c), ae(c), se(c, v));
    }
    function oe(c) {
      if (c.nodeType === ve || c.nodeType === qe)
        for (var u = c.firstChild; u; ) {
          var v = _(u);
          v && (m[v] = u), oe(u), u = u.nextSibling;
        }
    }
    oe(t);
    function de(c) {
      B(c);
      for (var u = c.firstChild; u; ) {
        var v = u.nextSibling, d = _(u);
        if (d) {
          var A = m[d];
          A && Ce(u, A) ? (u.parentNode.replaceChild(A, u), z(A, u)) : de(u);
        } else
          de(u);
        u = v;
      }
    }
    function g(c, u, v) {
      for (; u; ) {
        var d = u.nextSibling;
        (v = _(u)) ? I(v) : K(u, c, !0), u = d;
      }
    }
    function z(c, u, v) {
      var d = _(u);
      d && delete m[d], !(!v && (ie(c, u) === !1 || (e(c, u), $(c), ke(c, u) === !1))) && (c.nodeName !== "TEXTAREA" ? _e(c, u) : Ye.TEXTAREA(c, u));
    }
    function _e(c, u) {
      var v = we(c), d = u.firstChild, A = c.firstChild, H, U, N, q, D;
      e:
        for (; d; ) {
          for (q = d.nextSibling, H = _(d); !v && A; ) {
            if (N = A.nextSibling, d.isSameNode && d.isSameNode(A)) {
              d = q, A = N;
              continue e;
            }
            U = _(A);
            var Z = A.nodeType, L = void 0;
            if (Z === d.nodeType && (Z === ve ? (H ? H !== U && ((D = m[H]) ? N === D ? L = !1 : (c.insertBefore(D, A), U ? I(U) : K(A, c, !0), A = D) : L = !1) : U && (L = !1), L = L !== !1 && Ce(A, d), L && z(A, d)) : (Z === Ze || Z == Je) && (L = !0, A.nodeValue !== d.nodeValue && (A.nodeValue = d.nodeValue))), L) {
              d = q, A = N;
              continue e;
            }
            U ? I(U) : K(A, c, !0), A = N;
          }
          if (H && (D = m[H]) && Ce(D, d))
            v || Q(c, D), z(D, d);
          else {
            var J = x(d);
            J !== !1 && (J && (d = J), d.actualize && (d = d.actualize(c.ownerDocument || M)), Q(c, d), de(d));
          }
          d = q, A = N;
        }
      g(c, A, U);
      var F = Ye[c.nodeName];
      F && F(c, u);
    }
    var S = t, P = S.nodeType, y = a.nodeType;
    if (!b) {
      if (P === ve)
        y === ve ? Ce(t, a) || (ae(t), S = pt(t, At(a.nodeName, a.namespaceURI))) : S = a;
      else if (P === Ze || P === Je) {
        if (y === P)
          return S.nodeValue !== a.nodeValue && (S.nodeValue = a.nodeValue), S;
        S = a;
      }
    }
    if (S === a)
      ae(t);
    else {
      if (a.isSameNode && a.isSameNode(S))
        return;
      if (z(S, a, b), O)
        for (var Y = 0, le = O.length; Y < le; Y++) {
          var V = m[O[Y]];
          V && K(V, V.parentNode, !1);
        }
    }
    return !b && S !== t && t.parentNode && (S.actualize && (S = S.actualize(t.ownerDocument || M)), t.parentNode.replaceChild(S, t)), S;
  };
}
var _t = vt(st);
(function(e, n) {
  typeof exports == "object" && typeof module < "u" ? n(exports) : typeof define == "function" && define.amd ? define(["exports"], n) : (e = typeof globalThis < "u" ? globalThis : e || self, n(e.htl = {}));
})(globalThis, function(e) {
  var n = "0.3.1";
  function t(s) {
    const o = document.createElement("template");
    return o.innerHTML = s, document.importNode(o.content, !0);
  }
  function a(s) {
    const o = document.createElementNS("http://www.w3.org/2000/svg", "g");
    return o.innerHTML = s, o;
  }
  const f = Object.assign(Se(t, (s) => {
    if (s.firstChild === null)
      return null;
    if (s.firstChild === s.lastChild)
      return s.removeChild(s.firstChild);
    const o = document.createElement("span");
    return o.appendChild(s), o;
  }), { fragment: Se(t, (s) => s) }), E = Object.assign(Se(a, (s) => s.firstChild === null ? null : s.firstChild === s.lastChild ? s.removeChild(s.firstChild) : s), { fragment: Se(a, (s) => {
    const o = document.createDocumentFragment();
    for (; s.firstChild; )
      o.appendChild(s.firstChild);
    return o;
  }) }), _ = 9, x = 10, B = 12, ie = 13, $ = 32, Oe = 65, ae = 90, ke = 97, we = 122, Q = 60, b = 62, m = 47, O = 45, I = 33, se = 61, K = 34, oe = 39, de = 63, g = 1, z = 2, _e = 3, S = 4, P = 5, y = 6, Y = 7, le = 8, V = 9, c = 10, u = 11, v = 12, d = 13, A = 14, H = 15, U = 16, N = 17, q = 18, D = 19, Z = 20, L = 21, J = 22, F = 23, Le = 24, xe = 25, R = 26, Re = 27, Be = 28, Pe = 29, nt = 128, He = 1, rt = 8, it = 1, Ge = "http://www.w3.org/2000/svg", ee = "http://www.w3.org/1999/xlink", Ie = "http://www.w3.org/XML/1998/namespace", Ve = "http://www.w3.org/2000/xmlns/", Fe = new Map([
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
  ].map((s) => [s.toLowerCase(), s])), he = /* @__PURE__ */ new Map([
    ["xlink:actuate", ee],
    ["xlink:arcrole", ee],
    ["xlink:href", ee],
    ["xlink:role", ee],
    ["xlink:show", ee],
    ["xlink:title", ee],
    ["xlink:type", ee],
    ["xml:lang", Ie],
    ["xml:space", Ie],
    ["xmlns", Ve],
    ["xmlns:xlink", Ve]
  ]);
  function Se(s, o) {
    return function({ raw: k }) {
      let r = g, C = "", te, w, pe, ue, ge = 0;
      for (let T = 0, G = arguments.length; T < G; ++T) {
        const p = k[T];
        if (T > 0) {
          const i = arguments[T];
          switch (r) {
            case R: {
              if (i != null) {
                const h = `${i}`;
                if (Xe(w))
                  C += h.replace(/[<]/g, fe);
                else {
                  if (new RegExp(`</${w}[\\s>/]`, "i").test(C.slice(-w.length - 2) + h))
                    throw new Error("unsafe raw text");
                  C += h;
                }
              }
              break;
            }
            case g: {
              i == null || (i instanceof Node || typeof i != "string" && i[Symbol.iterator] || /(?:^|>)$/.test(k[T - 1]) && /^(?:<|$)/.test(p) ? (C += "<!--::" + T + "-->", ge |= nt) : C += `${i}`.replace(/[<&]/g, fe));
              break;
            }
            case V: {
              r = v;
              let h;
              if (/^[\s>]/.test(p)) {
                if (i == null || i === !1) {
                  C = C.slice(0, pe - k[T - 1].length);
                  break;
                }
                if (i === !0 || (h = `${i}`) == "") {
                  C += "''";
                  break;
                }
                if (k[T - 1].slice(pe, ue) === "style" && Me(i) || typeof i == "function") {
                  C += "::" + T, ge |= He;
                  break;
                }
              }
              if (h === void 0 && (h = `${i}`), h === "")
                throw new Error("unsafe unquoted empty string");
              C += h.replace(/^['"]|[\s>&]/g, fe);
              break;
            }
            case v: {
              C += `${i}`.replace(/[\s>&]/g, fe);
              break;
            }
            case u: {
              C += `${i}`.replace(/['&]/g, fe);
              break;
            }
            case c: {
              C += `${i}`.replace(/["&]/g, fe);
              break;
            }
            case y: {
              if (Me(i)) {
                C += "::" + T + "=''", ge |= He;
                break;
              }
              throw new Error("invalid binding");
            }
            case N:
              break;
            default:
              throw new Error("invalid binding");
          }
        }
        for (let i = 0, h = p.length; i < h; ++i) {
          const l = p.charCodeAt(i);
          switch (r) {
            case g: {
              l === Q && (r = z);
              break;
            }
            case z: {
              l === I ? r = xe : l === m ? r = _e : be(l) ? (te = i, w = void 0, r = S, --i) : l === de ? (r = P, --i) : (r = g, --i);
              break;
            }
            case _e: {
              be(l) ? (r = S, --i) : l === b ? r = g : (r = P, --i);
              break;
            }
            case S: {
              X(l) ? (r = y, w = Ae(p, te, i)) : l === m ? r = A : l === b && (w = Ae(p, te, i), r = Te(w) ? R : g);
              break;
            }
            case y: {
              X(l) || (l === m || l === b ? (r = Y, --i) : l === se ? (r = le, pe = i + 1, ue = void 0) : (r = le, --i, pe = i + 1, ue = void 0));
              break;
            }
            case le: {
              X(l) || l === m || l === b ? (r = Y, --i, ue = i) : l === se && (r = V, ue = i);
              break;
            }
            case Y: {
              X(l) || (l === m ? r = A : l === se ? r = V : l === b ? r = Te(w) ? R : g : (r = le, --i, pe = i + 1, ue = void 0));
              break;
            }
            case V: {
              X(l) || (l === K ? r = c : l === oe ? r = u : l === b ? r = Te(w) ? R : g : (r = v, --i));
              break;
            }
            case c: {
              l === K && (r = d);
              break;
            }
            case u: {
              l === oe && (r = d);
              break;
            }
            case v: {
              X(l) ? r = y : l === b && (r = Te(w) ? R : g);
              break;
            }
            case d: {
              X(l) ? r = y : l === m ? r = A : l === b ? r = Te(w) ? R : g : (r = y, --i);
              break;
            }
            case A: {
              l === b ? r = g : (r = y, --i);
              break;
            }
            case P: {
              l === b && (r = g);
              break;
            }
            case H: {
              l === O ? r = U : l === b ? r = g : (r = N, --i);
              break;
            }
            case U: {
              l === O ? r = F : l === b ? r = g : (r = N, --i);
              break;
            }
            case N: {
              l === Q ? r = q : l === O && (r = J);
              break;
            }
            case q: {
              l === I ? r = D : l !== Q && (r = N, --i);
              break;
            }
            case D: {
              l === O ? r = Z : (r = N, --i);
              break;
            }
            case Z: {
              l === O ? r = L : (r = F, --i);
              break;
            }
            case L: {
              r = F, --i;
              break;
            }
            case J: {
              l === O ? r = F : (r = N, --i);
              break;
            }
            case F: {
              l === b ? r = g : l === I ? r = Le : l !== O && (r = N, --i);
              break;
            }
            case Le: {
              l === O ? r = J : l === b ? r = g : (r = N, --i);
              break;
            }
            case xe: {
              l === O && p.charCodeAt(i + 1) === O ? (r = H, ++i) : (r = P, --i);
              break;
            }
            case R: {
              l === Q && (r = Re);
              break;
            }
            case Re: {
              l === m ? r = Be : (r = R, --i);
              break;
            }
            case Be: {
              be(l) ? (te = i, r = Pe, --i) : (r = R, --i);
              break;
            }
            case Pe: {
              X(l) && w === Ae(p, te, i) ? r = y : l === m && w === Ae(p, te, i) ? r = A : l === b && w === Ae(p, te, i) ? r = g : be(l) || (r = R, --i);
              break;
            }
            default: {
              r = void 0;
              break;
            }
          }
        }
        C += p;
      }
      const $e = s(C), Qe = document.createTreeWalker($e, ge, null, !1), Ke = [];
      for (; Qe.nextNode(); ) {
        const T = Qe.currentNode;
        switch (T.nodeType) {
          case it: {
            const G = T.attributes;
            for (let p = 0, i = G.length; p < i; ++p) {
              const { name: h, value: l } = G[p];
              if (/^::/.test(h)) {
                const ce = arguments[+h.slice(2)];
                je(T, h), --p, --i;
                for (const Ee in ce) {
                  const j = ce[Ee];
                  j == null || j === !1 || (typeof j == "function" ? T[Ee] = j : Ee === "style" && Me(j) ? We(T[Ee], j) : at(T, Ee, j === !0 ? "" : j));
                }
              } else if (/^::/.test(l)) {
                const ce = arguments[+l.slice(2)];
                je(T, h), --p, --i, typeof ce == "function" ? T[h] = ce : We(T[h], ce);
              }
            }
            break;
          }
          case rt: {
            if (/^::/.test(T.data)) {
              const G = T.parentNode, p = arguments[+T.data.slice(2)];
              if (p instanceof Node)
                G.insertBefore(p, T);
              else if (typeof p != "string" && p[Symbol.iterator])
                if (p instanceof NodeList || p instanceof HTMLCollection)
                  for (let i = p.length - 1, h = T; i >= 0; --i)
                    h = G.insertBefore(p[i], h);
                else
                  for (const i of p)
                    i != null && G.insertBefore(i instanceof Node ? i : document.createTextNode(i), T);
              else
                G.insertBefore(document.createTextNode(p), T);
              Ke.push(T);
            }
            break;
          }
        }
      }
      for (const T of Ke)
        T.parentNode.removeChild(T);
      return o($e);
    };
  }
  function fe(s) {
    return `&#${s.charCodeAt(0).toString()};`;
  }
  function be(s) {
    return Oe <= s && s <= ae || ke <= s && s <= we;
  }
  function X(s) {
    return s === _ || s === x || s === B || s === $ || s === ie;
  }
  function Me(s) {
    return s && s.toString === Object.prototype.toString;
  }
  function Te(s) {
    return s === "script" || s === "style" || Xe(s);
  }
  function Xe(s) {
    return s === "textarea" || s === "title";
  }
  function Ae(s, o, k) {
    return s.slice(o, k).toLowerCase();
  }
  function at(s, o, k) {
    if (s.namespaceURI === Ge && (o = o.toLowerCase(), o = Fe.get(o) || o, he.has(o))) {
      s.setAttributeNS(he.get(o), o, k);
      return;
    }
    s.setAttribute(o, k);
  }
  function je(s, o) {
    if (s.namespaceURI === Ge && (o = o.toLowerCase(), o = Fe.get(o) || o, he.has(o))) {
      s.removeAttributeNS(he.get(o), o);
      return;
    }
    s.removeAttribute(o);
  }
  function We(s, o) {
    for (const k in o) {
      const r = o[k];
      k.startsWith("--") ? s.setProperty(k, r) : s[k] = r;
    }
  }
  e.html = f, e.svg = E, e.version = n, Object.defineProperty(e, "__esModule", { value: !0 });
});
const me = htl;
var ne, re = [];
function ht(e) {
  return re.push(ne), re.length > 100 && (alert("DML error: _baseStackOverflow in bushBase()"), re = []), typeof e == "string" && (ne = document.getElementById(e)), ne = e, ne;
}
function et() {
  return re.length;
}
function St(e = 1, n = -1, t = "unselectBase") {
  for (let a = 0; a < e; a++) {
    if (re.length <= 0) {
      alert("DML error: _baseStack empty in popBase()");
      break;
    } else
      ne = re.pop();
    n >= 0 && et() != n && alert("DML error: _baseStack size mismatch - " + t + ", before: " + n + ", after: " + et());
  }
  return re.length;
}
function bt(e) {
  if (typeof e == "string") {
    let n = Ue("span", null, null);
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
          let x = _[0].trim(), B = _[1].trim();
          e.style.setProperty(x, B);
        }
      }
    });
  }), e;
}
function Ue(e, n, t) {
  let a = document.createElement(e), f = Array.isArray(t);
  return t && (typeof t == "number" && (t = String(t)), typeof t == "string" ? a.innerHTML = t : f ? a.append(...t) : a.appendChild(t)), n && gt(a, n), a;
}
function De(e) {
  let n = bt(e);
  if (ne)
    ne.appendChild(n);
  else if (document.body)
    document.body.appendChild(n);
  else {
    console.log("null Body found: " + e.textContent);
    return;
  }
  return n;
}
function tt(e, n, t) {
  return De(Ue(e, n, t));
}
function Nt(e, n) {
  return tt("div", n, e);
}
const Ct = (e = Nt("", null)) => ht(e), mt = St, Ot = (e) => (n, t) => {
  let a = tt(e, t, n);
  return a.name = e, a;
};
function kt(e, ...n) {
  let t = me.html(e, ...n);
  return t.fragment = me.html.fragment, De(t), t;
}
function wt(e, ...n) {
  let t = me.svg(e, ...n);
  return t.fragment = me.svg.fragment, console.log(t.fragment), De(t), t;
}
function Mt(e, ...n) {
  const t = Ue(e, null, null);
  return t.id = "wrapper", t.append(...n), t;
}
function yt(e) {
  return Mt("span", e);
}
function Ut(e, n) {
  const t = (f, E) => !f.isEqualNode(E);
  let a = e.firstChild;
  _t(a, yt(n), { onBeforeElUpdated: t });
}
const Dt = { m: Ot, dom: Ct, udom: mt, render: Ut, html: kt, svg: wt };
export {
  Dt as MVU
};
