import morphdom from "morphdom";
import { HTL } from  "./libs/htl"
/* ----------------------------------------------------------------------------
    global variables
   ---------------------------------------------------------------------------- */
var _base  // Global element stores current insert position. If empty, elements are added at the end of document.
var _baseStack = [] // Stack for storing _base positions
var _block = false // global var for blocking loaders


function selectBase(ID) {
  // Save old base
  _baseStack.push(_base)
  if (_baseStack.length > 100) {
    alert("DML error: _baseStackOverflow in bushBase()")
    _baseStack = []
  }
  // select new base, either ID or element
  if (typeof (ID) === 'string')
    _base = document.getElementById(ID)

    _base = ID
  return _base
}

function sb(ID) {
  selectBase(ID)
} // Alias shortcut

/*------------------------------------------------------
  read curent _base
  ------------------------------------------------------*/
function getBase() {
  return _base
}

/*------------------------------------------------------
   get current stack position
  ------------------------------------------------------*/
function DMLgetSP() {
  return _baseStack.length
}

/*------------------------------------------------------
  set Stackpointer for stored value
  ------------------------------------------------------*/
function DMLsetSP(SP, msg = "DMLsetSP") {
  if (SP > _baseStack.length)
    alert("Error in " + msg + ", Stack pointer below desired SP")
  else
    while (_baseStack.length > SP)
      _base = _baseStack.pop()
  return _baseStack.length
}

/*------------------------------------------------------
   check, if current position is equal to chk
   chk is the stacklength before push, gives stack mismatch alert
  ------------------------------------------------------*/
function DMLchkSP(oldCnt = 0, txt = "Missing unselectBase()") {
  if (DMLgetSP() != oldCnt)
    alert("DML error: _baseStack size mismatch - " + txt + ", before: " + oldCnt + ", after: " + DMLgetSP())
  return _baseStack.length
}

/*------------------------------------------------------
  Stack-Prüfung für Einzelfunktionen
  f: ()=>{return new construct(xyz) }
  ------------------------------------------------------*/
function checkSP(f, txt) {
  let sp = DMLgetSP()
  let ret = f()
  DMLchkSP(sp, txt)
  return ret
}

/*------------------------------------------------------
   restore last base from stack, returns Stack position.
   if cnt set, unselectBase is called cnt times
   oldCnt is provided for test purpose. If SP after unselectBase
   is different, error message is displayed
  ------------------------------------------------------*/
function unselectBase(cnt = 1, oldCnt = -1, msg = "unselectBase") {
  for (let i = 0; i < cnt; i++) {
    if (_baseStack.length <= 0) {
      alert("DML error: _baseStack empty in popBase()")
      break
    } else
      _base = _baseStack.pop() // restore old stack

    if (oldCnt >= 0) {
      if (DMLgetSP() != oldCnt)
        alert("DML error: _baseStack size mismatch - " + msg + ", before: " + oldCnt + ", after: " + DMLgetSP())
    }
  }
  // if chk, check Stacklength after pop == chk
  return _baseStack.length
}


/* ----------------------------------------------------------------------------
   Check, if node is element or string
   create span from string
   if c is object, return Object only
   ----------------------------------------------------------------------------*/
function chk_node(c) {
  if (typeof (c) == "string") {
    let ret = create("span", null, null)
    ret.innerHTML = c
    return ret
    //  return textNode(c)
  } else return c
}


function setAttributes(el, attrib) {
  if (typeof (attrib) == "string") // Check for string attribute          
    attrib = {
      "style": attrib
    } // Convert strings to {"style",attrib}

  // set attributes
  if (typeof (attrib) == "object") {
    // Slpit JSON, set attributes individually
    Object.keys(attrib).forEach(function (key) {
      let val = attrib[key]
      if (key != "style") {
        el.setAttribute(key, val); // Normal attributes
      } else { // set Style parameters individually
        let ar = val.split(';'); // Split style Elements
        ar.forEach(function (pair) {
          if (pair) { // If not empty    
            let kv = pair.split(":")
            if (kv.length == 2) {
              let p = kv[0].trim()
              let v = kv[1].trim()
              el.style.setProperty(p, v); // Set property
            }
          }
        })
      }
    })
  }
  return (el)
}

/*------------------------------------------------------
   general short cut function. Creates an element and appends
   to existing object. Type is string like 'div'
  ------------------------------------------------------*/
function createAt(obj, typ, attrib) {
  let ret = document.createElement(typ)
  setAttributes(ret, attrib)
  obj.appendChild(ret)
  return ret
}


// ----------------------------------------------------------------------------
// create object with content and attributes. Content can be text or object
// attrib is an JSON-object {"id":"test", "class": myclass}
// ----------------------------------------------------------------------------
function create(typ, attrib, c) {
  let el = document.createElement(typ)
  let cIsArray = (Array.isArray(c))
  if (c) {
    if (typeof (c) == 'number') {
      c =  String(c)
    }

    if (typeof (c) == 'string')  { 
      el.innerHTML = c 
    }
    else  { 
      if (cIsArray) {
        el.append(...c)
      }
      else {
        el.appendChild(c); 
      }
    
    }
  }
  if (attrib) {
    setAttributes(el, attrib)
  }
  return el
}


// ----------------------------------------------------------------------------
// Append object at current base
// ----------------------------------------------------------------------------
function appendBase(c) {
  let e = chk_node(c)
  if (_base) _base.appendChild(e)
  else {
    // if (document.body) document.body.append(e)
    if (document.body) document.body.appendChild(e)
    else {
      console.log("null Body found: " + c.textContent)
      return
    }
  }
  return (e)
}
// ----------------------------------------------------------------------------
// Append object at current base without check for String
// ----------------------------------------------------------------------------
function _appendBase(c) {

  if (_base)
    _base.appendChild(c)
  else
    document.body.append(c)
  return (c)
}

// ----------------------------------------------------------------------------
// make: create element with content and appendBase at current base
// attributes is an JSON-object {"id":"test", "class": myclass}
// ----------------------------------------------------------------------------
function make(typ, attrib, c) {
  return appendBase(create(typ, attrib, c))
}

function div(s, attrib) {
  return make("div", attrib, s)
}


const dom = (base = div("", null)) => selectBase(base)
const udom = unselectBase;

const m = (type) => (content, attribs) =>  { 
  let f = make(type, attribs, content)
  f.name = type
  return f
}

function html(strings, ...substitutions) {
  let node = HTL.html(strings, ...substitutions)
  node.fragment = HTL.html.fragment
  appendBase(node)
  return node
}

function svg(strings, ...substitutions) {
 
  let node = HTL.svg(strings, ...substitutions)
  node.fragment = HTL.svg.fragment
  appendBase(node)
  return node
}


function wrap(name, ...children) {
  const element = create(name, null, null);
  element.id = "wrapper"
  element.append(...children);
  return element;
}

function wrapView (updatedView) {
  return wrap("span", updatedView)
}

function render (target, view) {
  const onBeforeElUpdated = (fromEl, toEl) => !fromEl.isEqualNode(toEl) 
  let prevDom = target.firstChild
  morphdom(prevDom, wrapView(view), {onBeforeElUpdated})
}


const handler =  {
  get : function (target, tagname) {
    return m(tagname)
  }
}

const tags = new Proxy({}, handler)

const MVU = {m, dom, udom, render, tags, html, svg}

export { MVU }



