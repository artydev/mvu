var vt = (e, n) => () => (n || e((n = { exports: {} }).exports, n), n.exports);
var Qt = vt((De, ut) => {
  var qe = 11;
  function pt(e, n) {
    var t = n.attributes, r, f, v, _, x;
    if (!(n.nodeType === qe || e.nodeType === qe)) {
      for (var B = t.length - 1; B >= 0; B--)
        r = t[B], f = r.name, v = r.namespaceURI, _ = r.value, v ? (f = r.localName || f, x = e.getAttributeNS(v, f), x !== _ && (r.prefix === "xmlns" && (f = r.name), e.setAttributeNS(v, f, _))) : (x = e.getAttribute(f), x !== _ && e.setAttribute(f, _));
      for (var ie = e.attributes, W = ie.length - 1; W >= 0; W--)
        r = ie[W], f = r.name, v = r.namespaceURI, v ? (f = r.localName || f, n.hasAttributeNS(v, f) || e.removeAttributeNS(v, f)) : n.hasAttribute(f) || e.removeAttribute(f);
    }
  }
  var Ne, At = "http://www.w3.org/1999/xhtml", y = typeof document > "u" ? void 0 : document, Et = !!y && "content" in y.createElement("template"), _t = !!y && y.createRange && "createContextualFragment" in y.createRange();
  function ht(e) {
    var n = y.createElement("template");
    return n.innerHTML = e, n.content.childNodes[0];
  }
  function gt(e) {
    Ne || (Ne = y.createRange(), Ne.selectNode(y.body));
    var n = Ne.createContextualFragment(e);
    return n.childNodes[0];
  }
  function St(e) {
    var n = y.createElement("body");
    return n.innerHTML = e, n.childNodes[0];
  }
  function bt(e) {
    return e = e.trim(), Et ? ht(e) : _t ? gt(e) : St(e);
  }
  function me(e, n) {
    var t = e.nodeName, r = n.nodeName, f, v;
    return t === r ? !0 : (f = t.charCodeAt(0), v = r.charCodeAt(0), f <= 90 && v >= 97 ? t === r.toUpperCase() : v <= 90 && f >= 97 ? r === t.toUpperCase() : !1);
  }
  function Nt(e, n) {
    return !n || n === At ? y.createElement(e) : y.createElementNS(n, e);
  }
  function mt(e, n) {
    for (var t = e.firstChild; t; ) {
      var r = t.nextSibling;
      n.appendChild(t), t = r;
    }
    return n;
  }
  function Me(e, n, t) {
    e[t] !== n[t] && (e[t] = n[t], e[t] ? e.setAttribute(t, "") : e.removeAttribute(t));
  }
  var Ze = {
    OPTION: function(e, n) {
      var t = e.parentNode;
      if (t) {
        var r = t.nodeName.toUpperCase();
        r === "OPTGROUP" && (t = t.parentNode, r = t && t.nodeName.toUpperCase()), r === "SELECT" && !t.hasAttribute("multiple") && (e.hasAttribute("selected") && !n.selected && (e.setAttribute("selected", "selected"), e.removeAttribute("selected")), t.selectedIndex = -1);
      }
      Me(e, n, "selected");
    },
    INPUT: function(e, n) {
      Me(e, n, "checked"), Me(e, n, "disabled"), e.value !== n.value && (e.value = n.value), n.hasAttribute("value") || e.removeAttribute("value");
    },
    TEXTAREA: function(e, n) {
      var t = n.value;
      e.value !== t && (e.value = t);
      var r = e.firstChild;
      if (r) {
        var f = r.nodeValue;
        if (f == t || !t && f == e.placeholder)
          return;
        r.nodeValue = t;
      }
    },
    SELECT: function(e, n) {
      if (!n.hasAttribute("multiple")) {
        for (var t = -1, r = 0, f = e.firstChild, v, _; f; )
          if (_ = f.nodeName && f.nodeName.toUpperCase(), _ === "OPTGROUP")
            v = f, f = v.firstChild;
          else {
            if (_ === "OPTION") {
              if (f.hasAttribute("selected")) {
                t = r;
                break;
              }
              r++;
            }
            f = f.nextSibling, !f && v && (f = v.nextSibling, v = null);
          }
        e.selectedIndex = t;
      }
    }
  }, Ee = 1, Je = 11, et = 3, tt = 8;
  function j() {
  }
  function Ct(e) {
    if (e)
      return e.getAttribute && e.getAttribute("id") || e.id;
  }
  function Ot(e) {
    return function(t, r, f) {
      if (f || (f = {}), typeof r == "string")
        if (t.nodeName === "#document" || t.nodeName === "HTML" || t.nodeName === "BODY") {
          var v = r;
          r = y.createElement("html"), r.innerHTML = v;
        } else
          r = bt(r);
      else
        r.nodeType === Je && (r = r.firstElementChild);
      var _ = f.getNodeKey || Ct, x = f.onBeforeNodeAdded || j, B = f.onNodeAdded || j, ie = f.onBeforeElUpdated || j, W = f.onElUpdated || j, Oe = f.onBeforeNodeDiscarded || j, ae = f.onNodeDiscarded || j, ke = f.onBeforeElChildrenUpdated || j, we = f.skipFromChildren || j, Q = f.addChild || function(c, u) {
        return c.appendChild(u);
      }, S = f.childrenOnly === !0, C = /* @__PURE__ */ Object.create(null), O = [];
      function G(c) {
        O.push(c);
      }
      function se(c, u) {
        if (c.nodeType === Ee)
          for (var E = c.firstChild; E; ) {
            var d = void 0;
            u && (d = _(E)) ? G(d) : (ae(E), E.firstChild && se(E, u)), E = E.nextSibling;
          }
      }
      function K(c, u, E) {
        Oe(c) !== !1 && (u && u.removeChild(c), ae(c), se(c, E));
      }
      function oe(c) {
        if (c.nodeType === Ee || c.nodeType === Je)
          for (var u = c.firstChild; u; ) {
            var E = _(u);
            E && (C[E] = u), oe(u), u = u.nextSibling;
          }
      }
      oe(t);
      function de(c) {
        B(c);
        for (var u = c.firstChild; u; ) {
          var E = u.nextSibling, d = _(u);
          if (d) {
            var p = C[d];
            p && me(u, p) ? (u.parentNode.replaceChild(p, u), z(p, u)) : de(u);
          } else
            de(u);
          u = E;
        }
      }
      function b(c, u, E) {
        for (; u; ) {
          var d = u.nextSibling;
          (E = _(u)) ? G(E) : K(u, c, !0), u = d;
        }
      }
      function z(c, u, E) {
        var d = _(u);
        d && delete C[d], !(!E && (ie(c, u) === !1 || (e(c, u), W(c), ke(c, u) === !1))) && (c.nodeName !== "TEXTAREA" ? _e(c, u) : Ze.TEXTAREA(c, u));
      }
      function _e(c, u) {
        var E = we(c), d = u.firstChild, p = c.firstChild, H, U, N, q, D;
        e:
          for (; d; ) {
            for (q = d.nextSibling, H = _(d); !E && p; ) {
              if (N = p.nextSibling, d.isSameNode && d.isSameNode(p)) {
                d = q, p = N;
                continue e;
              }
              U = _(p);
              var Z = p.nodeType, L = void 0;
              if (Z === d.nodeType && (Z === Ee ? (H ? H !== U && ((D = C[H]) ? N === D ? L = !1 : (c.insertBefore(D, p), U ? G(U) : K(p, c, !0), p = D) : L = !1) : U && (L = !1), L = L !== !1 && me(p, d), L && z(p, d)) : (Z === et || Z == tt) && (L = !0, p.nodeValue !== d.nodeValue && (p.nodeValue = d.nodeValue))), L) {
                d = q, p = N;
                continue e;
              }
              U ? G(U) : K(p, c, !0), p = N;
            }
            if (H && (D = C[H]) && me(D, d))
              E || Q(c, D), z(D, d);
            else {
              var J = x(d);
              J !== !1 && (J && (d = J), d.actualize && (d = d.actualize(c.ownerDocument || y)), Q(c, d), de(d));
            }
            d = q, p = N;
          }
        b(c, p, U);
        var V = Ze[c.nodeName];
        V && V(c, u);
      }
      var g = t, P = g.nodeType, M = r.nodeType;
      if (!S) {
        if (P === Ee)
          M === Ee ? me(t, r) || (ae(t), g = mt(t, Nt(r.nodeName, r.namespaceURI))) : g = r;
        else if (P === et || P === tt) {
          if (M === P)
            return g.nodeValue !== r.nodeValue && (g.nodeValue = r.nodeValue), g;
          g = r;
        }
      }
      if (g === r)
        ae(t);
      else {
        if (r.isSameNode && r.isSameNode(g))
          return;
        if (z(g, r, S), O)
          for (var Y = 0, le = O.length; Y < le; Y++) {
            var I = C[O[Y]];
            I && K(I, I.parentNode, !1);
          }
      }
      return !S && g !== t && t.parentNode && (g.actualize && (g = g.actualize(t.ownerDocument || y)), t.parentNode.replaceChild(g, t)), g;
    };
  }
  var kt = Ot(pt);
  (function(e, n) {
    typeof De == "object" && typeof ut < "u" ? n(De) : typeof define == "function" && define.amd ? define(["exports"], n) : (e = typeof globalThis < "u" ? globalThis : e || self, n(e.htl = {}));
  })(globalThis, function(e) {
    var n = "0.3.1";
    function t(s) {
      const o = document.createElement("template");
      return o.innerHTML = s, document.importNode(o.content, !0);
    }
    function r(s) {
      const o = document.createElementNS("http://www.w3.org/2000/svg", "g");
      return o.innerHTML = s, o;
    }
    const f = Object.assign(ge(t, (s) => {
      if (s.firstChild === null)
        return null;
      if (s.firstChild === s.lastChild)
        return s.removeChild(s.firstChild);
      const o = document.createElement("span");
      return o.appendChild(s), o;
    }), { fragment: ge(t, (s) => s) }), v = Object.assign(ge(r, (s) => s.firstChild === null ? null : s.firstChild === s.lastChild ? s.removeChild(s.firstChild) : s), { fragment: ge(r, (s) => {
      const o = document.createDocumentFragment();
      for (; s.firstChild; )
        o.appendChild(s.firstChild);
      return o;
    }) }), _ = 9, x = 10, B = 12, ie = 13, W = 32, Oe = 65, ae = 90, ke = 97, we = 122, Q = 60, S = 62, C = 47, O = 45, G = 33, se = 61, K = 34, oe = 39, de = 63, b = 1, z = 2, _e = 3, g = 4, P = 5, M = 6, Y = 7, le = 8, I = 9, c = 10, u = 11, E = 12, d = 13, p = 14, H = 15, U = 16, N = 17, q = 18, D = 19, Z = 20, L = 21, J = 22, V = 23, Re = 24, Be = 25, R = 26, Pe = 27, He = 28, $e = 29, ct = 128, Ge = 1, ot = 8, dt = 1, Ie = "http://www.w3.org/2000/svg", ee = "http://www.w3.org/1999/xlink", Ve = "http://www.w3.org/XML/1998/namespace", Fe = "http://www.w3.org/2000/xmlns/", Xe = new Map([
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
      ["xml:lang", Ve],
      ["xml:space", Ve],
      ["xmlns", Fe],
      ["xmlns:xlink", Fe]
    ]);
    function ge(s, o) {
      return function({ raw: k }) {
        let i = b, m = "", te, w, pe, ue, be = 0;
        for (let T = 0, $ = arguments.length; T < $; ++T) {
          const A = k[T];
          if (T > 0) {
            const a = arguments[T];
            switch (i) {
              case R: {
                if (a != null) {
                  const h = `${a}`;
                  if (je(w))
                    m += h.replace(/[<]/g, fe);
                  else {
                    if (new RegExp(`</${w}[\\s>/]`, "i").test(m.slice(-w.length - 2) + h))
                      throw new Error("unsafe raw text");
                    m += h;
                  }
                }
                break;
              }
              case b: {
                a == null || (a instanceof Node || typeof a != "string" && a[Symbol.iterator] || /(?:^|>)$/.test(k[T - 1]) && /^(?:<|$)/.test(A) ? (m += "<!--::" + T + "-->", be |= ct) : m += `${a}`.replace(/[<&]/g, fe));
                break;
              }
              case I: {
                i = E;
                let h;
                if (/^[\s>]/.test(A)) {
                  if (a == null || a === !1) {
                    m = m.slice(0, pe - k[T - 1].length);
                    break;
                  }
                  if (a === !0 || (h = `${a}`) == "") {
                    m += "''";
                    break;
                  }
                  if (k[T - 1].slice(pe, ue) === "style" && ye(a) || typeof a == "function") {
                    m += "::" + T, be |= Ge;
                    break;
                  }
                }
                if (h === void 0 && (h = `${a}`), h === "")
                  throw new Error("unsafe unquoted empty string");
                m += h.replace(/^['"]|[\s>&]/g, fe);
                break;
              }
              case E: {
                m += `${a}`.replace(/[\s>&]/g, fe);
                break;
              }
              case u: {
                m += `${a}`.replace(/['&]/g, fe);
                break;
              }
              case c: {
                m += `${a}`.replace(/["&]/g, fe);
                break;
              }
              case M: {
                if (ye(a)) {
                  m += "::" + T + "=''", be |= Ge;
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
          for (let a = 0, h = A.length; a < h; ++a) {
            const l = A.charCodeAt(a);
            switch (i) {
              case b: {
                l === Q && (i = z);
                break;
              }
              case z: {
                l === G ? i = Be : l === C ? i = _e : Se(l) ? (te = a, w = void 0, i = g, --a) : l === de ? (i = P, --a) : (i = b, --a);
                break;
              }
              case _e: {
                Se(l) ? (i = g, --a) : l === S ? i = b : (i = P, --a);
                break;
              }
              case g: {
                F(l) ? (i = M, w = ve(A, te, a)) : l === C ? i = p : l === S && (w = ve(A, te, a), i = Te(w) ? R : b);
                break;
              }
              case M: {
                F(l) || (l === C || l === S ? (i = Y, --a) : l === se ? (i = le, pe = a + 1, ue = void 0) : (i = le, --a, pe = a + 1, ue = void 0));
                break;
              }
              case le: {
                F(l) || l === C || l === S ? (i = Y, --a, ue = a) : l === se && (i = I, ue = a);
                break;
              }
              case Y: {
                F(l) || (l === C ? i = p : l === se ? i = I : l === S ? i = Te(w) ? R : b : (i = le, --a, pe = a + 1, ue = void 0));
                break;
              }
              case I: {
                F(l) || (l === K ? i = c : l === oe ? i = u : l === S ? i = Te(w) ? R : b : (i = E, --a));
                break;
              }
              case c: {
                l === K && (i = d);
                break;
              }
              case u: {
                l === oe && (i = d);
                break;
              }
              case E: {
                F(l) ? i = M : l === S && (i = Te(w) ? R : b);
                break;
              }
              case d: {
                F(l) ? i = M : l === C ? i = p : l === S ? i = Te(w) ? R : b : (i = M, --a);
                break;
              }
              case p: {
                l === S ? i = b : (i = M, --a);
                break;
              }
              case P: {
                l === S && (i = b);
                break;
              }
              case H: {
                l === O ? i = U : l === S ? i = b : (i = N, --a);
                break;
              }
              case U: {
                l === O ? i = V : l === S ? i = b : (i = N, --a);
                break;
              }
              case N: {
                l === Q ? i = q : l === O && (i = J);
                break;
              }
              case q: {
                l === G ? i = D : l !== Q && (i = N, --a);
                break;
              }
              case D: {
                l === O ? i = Z : (i = N, --a);
                break;
              }
              case Z: {
                l === O ? i = L : (i = V, --a);
                break;
              }
              case L: {
                i = V, --a;
                break;
              }
              case J: {
                l === O ? i = V : (i = N, --a);
                break;
              }
              case V: {
                l === S ? i = b : l === G ? i = Re : l !== O && (i = N, --a);
                break;
              }
              case Re: {
                l === O ? i = J : l === S ? i = b : (i = N, --a);
                break;
              }
              case Be: {
                l === O && A.charCodeAt(a + 1) === O ? (i = H, ++a) : (i = P, --a);
                break;
              }
              case R: {
                l === Q && (i = Pe);
                break;
              }
              case Pe: {
                l === C ? i = He : (i = R, --a);
                break;
              }
              case He: {
                Se(l) ? (te = a, i = $e, --a) : (i = R, --a);
                break;
              }
              case $e: {
                F(l) && w === ve(A, te, a) ? i = M : l === C && w === ve(A, te, a) ? i = p : l === S && w === ve(A, te, a) ? i = b : Se(l) || (i = R, --a);
                break;
              }
              default: {
                i = void 0;
                break;
              }
            }
          }
          m += A;
        }
        const Ke = s(m), ze = document.createTreeWalker(Ke, be, null, !1), Ye = [];
        for (; ze.nextNode(); ) {
          const T = ze.currentNode;
          switch (T.nodeType) {
            case dt: {
              const $ = T.attributes;
              for (let A = 0, a = $.length; A < a; ++A) {
                const { name: h, value: l } = $[A];
                if (/^::/.test(h)) {
                  const ce = arguments[+h.slice(2)];
                  We(T, h), --A, --a;
                  for (const Ae in ce) {
                    const X = ce[Ae];
                    X == null || X === !1 || (typeof X == "function" ? T[Ae] = X : Ae === "style" && ye(X) ? Qe(T[Ae], X) : Tt(T, Ae, X === !0 ? "" : X));
                  }
                } else if (/^::/.test(l)) {
                  const ce = arguments[+l.slice(2)];
                  We(T, h), --A, --a, typeof ce == "function" ? T[h] = ce : Qe(T[h], ce);
                }
              }
              break;
            }
            case ot: {
              if (/^::/.test(T.data)) {
                const $ = T.parentNode, A = arguments[+T.data.slice(2)];
                if (A instanceof Node)
                  $.insertBefore(A, T);
                else if (typeof A != "string" && A[Symbol.iterator])
                  if (A instanceof NodeList || A instanceof HTMLCollection)
                    for (let a = A.length - 1, h = T; a >= 0; --a)
                      h = $.insertBefore(A[a], h);
                  else
                    for (const a of A)
                      a != null && $.insertBefore(a instanceof Node ? a : document.createTextNode(a), T);
                else
                  $.insertBefore(document.createTextNode(A), T);
                Ye.push(T);
              }
              break;
            }
          }
        }
        for (const T of Ye)
          T.parentNode.removeChild(T);
        return o(Ke);
      };
    }
    function fe(s) {
      return `&#${s.charCodeAt(0).toString()};`;
    }
    function Se(s) {
      return Oe <= s && s <= ae || ke <= s && s <= we;
    }
    function F(s) {
      return s === _ || s === x || s === B || s === W || s === ie;
    }
    function ye(s) {
      return s && s.toString === Object.prototype.toString;
    }
    function Te(s) {
      return s === "script" || s === "style" || je(s);
    }
    function je(s) {
      return s === "textarea" || s === "title";
    }
    function ve(s, o, k) {
      return s.slice(o, k).toLowerCase();
    }
    function Tt(s, o, k) {
      if (s.namespaceURI === Ie && (o = o.toLowerCase(), o = Xe.get(o) || o, he.has(o))) {
        s.setAttributeNS(he.get(o), o, k);
        return;
      }
      s.setAttribute(o, k);
    }
    function We(s, o) {
      if (s.namespaceURI === Ie && (o = o.toLowerCase(), o = Xe.get(o) || o, he.has(o))) {
        s.removeAttributeNS(he.get(o), o);
        return;
      }
      s.removeAttribute(o);
    }
    function Qe(s, o) {
      for (const k in o) {
        const i = o[k];
        k.startsWith("--") ? s.setProperty(k, i) : s[k] = i;
      }
    }
    e.html = f, e.svg = v, e.version = n, Object.defineProperty(e, "__esModule", { value: !0 });
  });
  const Ce = htl;
  var ne, re = [];
  function wt(e) {
    return re.push(ne), re.length > 100 && (alert("DML error: _baseStackOverflow in bushBase()"), re = []), typeof e == "string" && (ne = document.getElementById(e)), ne = e, ne;
  }
  function nt() {
    return re.length;
  }
  function yt(e = 1, n = -1, t = "unselectBase") {
    for (let r = 0; r < e; r++) {
      if (re.length <= 0) {
        alert("DML error: _baseStack empty in popBase()");
        break;
      } else
        ne = re.pop();
      n >= 0 && nt() != n && alert("DML error: _baseStack size mismatch - " + t + ", before: " + n + ", after: " + nt());
    }
    return re.length;
  }
  function Mt(e) {
    if (typeof e == "string") {
      let n = Le("span", null, null);
      return n.innerHTML = e, n;
    } else
      return e;
  }
  function Ut(e, n) {
    return typeof n == "string" && (n = {
      style: n
    }), typeof n == "object" && Object.keys(n).forEach(function(t) {
      let r = n[t];
      t != "style" ? e.setAttribute(t, r) : r.split(";").forEach(function(v) {
        if (v) {
          let _ = v.split(":");
          if (_.length == 2) {
            let x = _[0].trim(), B = _[1].trim();
            e.style.setProperty(x, B);
          }
        }
      });
    }), e;
  }
  function Le(e, n, t) {
    let r = document.createElement(e), f = Array.isArray(t);
    return t && (typeof t == "number" && (t = String(t)), typeof t == "string" ? r.innerHTML = t : f ? r.append(...t) : r.appendChild(t)), n && Ut(r, n), r;
  }
  function xe(e) {
    let n = Mt(e);
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
  function it(e, n, t) {
    return xe(Le(e, n, t));
  }
  function Dt(e, n) {
    return it("div", n, e);
  }
  const Lt = (e = Dt("", null)) => wt(e), xt = yt, Rt = (e) => (n, t) => {
    let r = it(e, t, n);
    return r.name = e, r;
  };
  function Bt(e, ...n) {
    let t = Ce.html(e, ...n);
    return t.fragment = Ce.html.fragment, xe(t), t;
  }
  function Pt(e, ...n) {
    let t = Ce.svg(e, ...n);
    return t.fragment = Ce.svg.fragment, console.log(t.fragment), xe(t), t;
  }
  function Ht(e, ...n) {
    const t = Le(e, null, null);
    return t.id = "wrapper", t.append(...n), t;
  }
  function $t(e) {
    return Ht("span", e);
  }
  function Gt(e, n) {
    const t = (f, v) => !f.isEqualNode(v);
    let r = e.firstChild;
    kt(r, $t(n), { onBeforeElUpdated: t });
  }
  const It = { m: Rt, dom: Lt, udom: xt, render: Gt, html: Bt, svg: Pt }, { html: at, dom: st, udom: lt, render: Vt, svg: rt } = It, Ft = document.getElementById("app");
  let Xt = {
    init: !0,
    red: 255,
    green: 128,
    blue: 125
  };
  function jt(e) {
    return rt`<svg width=60 height=60 fill=${((r) => `rgb(${r.red},${r.green},${r.blue})`)(e)}>
            ${rt`<circle cx=30 cy=30 r=30></circle>`}
        </svg>`;
  }
  function Ue(e, n) {
    let t = st(), r = at`
        <div> 
            <div style="display:flex;align-items:center">
                <div  style="width:20px;text-align:right;margin-right:10px">
                    ${e.charAt(0)}
                </div>
                <div>
                    <input type="range" min="0" max="255" value=${n[e]}>
                </div>
            </div>
        </div>`;
    return lt(), r.oninput = function(f) {
      let v = f.target.value;
      n[e] = v, ft(n);
    }, t;
  }
  function Wt(e) {
    let n = st();
    return at`
            <div>${jt(e)}</div>
            <div>${Ue("red", e)}</div>
            <div>${Ue("green", e)}</div>
            <div>${Ue("blue", e)}</div>
        `, lt(), n;
  }
  function ft(e) {
    Vt(Ft, Wt(e));
  }
  ft(Xt);
});
export default Qt();
