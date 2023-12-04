var Ch = Object.defineProperty;
var Ah = (e, t, n) =>
  t in e
    ? Ch(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (e[t] = n);
var vo = (e, t, n) => (Ah(e, typeof t != "symbol" ? t + "" : t, n), n);
function va(e, t) {
  const n = Object.create(null),
    r = e.split(",");
  for (let o = 0; o < r.length; o++) n[r[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
const xt = {},
  Yi = [],
  Cn = () => {},
  kh = () => !1,
  Sh = /^on[^a-z]/,
  zr = (e) => Sh.test(e),
  wa = (e) => e.startsWith("onUpdate:"),
  Bt = Object.assign,
  xa = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Ph = Object.prototype.hasOwnProperty,
  st = (e, t) => Ph.call(e, t),
  Fe = Array.isArray,
  Ki = (e) => Ds(e) === "[object Map]",
  ru = (e) => Ds(e) === "[object Set]",
  qe = (e) => typeof e == "function",
  At = (e) => typeof e == "string",
  Ta = (e) => typeof e == "symbol",
  bt = (e) => e !== null && typeof e == "object",
  su = (e) => bt(e) && qe(e.then) && qe(e.catch),
  ou = Object.prototype.toString,
  Ds = (e) => ou.call(e),
  Rh = (e) => Ds(e).slice(8, -1),
  au = (e) => Ds(e) === "[object Object]",
  _a = (e) =>
    At(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Sr = va(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  Bs = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Ih = /-(\w)/g,
  jn = Bs((e) => e.replace(Ih, (t, n) => (n ? n.toUpperCase() : ""))),
  Nh = /\B([A-Z])/g,
  ar = Bs((e) => e.replace(Nh, "-$1").toLowerCase()),
  Fs = Bs((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  wo = Bs((e) => (e ? `on${Fs(e)}` : "")),
  Hr = (e, t) => !Object.is(e, t),
  xo = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  xs = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  Oh = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  Mh = (e) => {
    const t = At(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let ml;
const Yo = () =>
  ml ||
  (ml =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
function Ai(e) {
  if (Fe(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        o = At(r) ? Dh(r) : Ai(r);
      if (o) for (const l in o) t[l] = o[l];
    }
    return t;
  } else {
    if (At(e)) return e;
    if (bt(e)) return e;
  }
}
const Lh = /;(?![^(]*\))/g,
  jh = /:([^]+)/,
  Hh = /\/\*[^]*?\*\//g;
function Dh(e) {
  const t = {};
  return (
    e
      .replace(Hh, "")
      .split(Lh)
      .forEach((n) => {
        if (n) {
          const r = n.split(jh);
          r.length > 1 && (t[r[0].trim()] = r[1].trim());
        }
      }),
    t
  );
}
function Vr(e) {
  let t = "";
  if (At(e)) t = e;
  else if (Fe(e))
    for (let n = 0; n < e.length; n++) {
      const r = Vr(e[n]);
      r && (t += r + " ");
    }
  else if (bt(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
function Bh(e) {
  if (!e) return null;
  let { class: t, style: n } = e;
  return t && !At(t) && (e.class = Vr(t)), n && (e.style = Ai(n)), e;
}
const Fh =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  $h = va(Fh);
function lu(e) {
  return !!e || e === "";
}
const yl = (e) =>
    At(e)
      ? e
      : e == null
      ? ""
      : Fe(e) || (bt(e) && (e.toString === ou || !qe(e.toString)))
      ? JSON.stringify(e, cu, 2)
      : String(e),
  cu = (e, t) =>
    t && t.__v_isRef
      ? cu(e, t.value)
      : Ki(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [r, o]) => ((n[`${r} =>`] = o), n),
            {}
          ),
        }
      : ru(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : bt(t) && !Fe(t) && !au(t)
      ? String(t)
      : t;
let Tn;
class qh {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Tn),
      !t && Tn && (this.index = (Tn.scopes || (Tn.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = Tn;
      try {
        return (Tn = this), t();
      } finally {
        Tn = n;
      }
    }
  }
  on() {
    Tn = this;
  }
  off() {
    Tn = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o &&
          o !== this &&
          ((this.parent.scopes[this.index] = o), (o.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function Uh(e, t = Tn) {
  t && t.active && t.effects.push(e);
}
function Wh() {
  return Tn;
}
const Ea = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  uu = (e) => (e.w & fi) > 0,
  fu = (e) => (e.n & fi) > 0,
  zh = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= fi;
  },
  Vh = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let r = 0; r < t.length; r++) {
        const o = t[r];
        uu(o) && !fu(o) ? o.delete(e) : (t[n++] = o),
          (o.w &= ~fi),
          (o.n &= ~fi);
      }
      t.length = n;
    }
  },
  Ts = new WeakMap();
let Cr = 0,
  fi = 1;
const Ko = 30;
let _n;
const ki = Symbol(""),
  Qo = Symbol("");
class Ca {
  constructor(t, n = null, r) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Uh(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let t = _n,
      n = li;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = _n),
        (_n = this),
        (li = !0),
        (fi = 1 << ++Cr),
        Cr <= Ko ? zh(this) : bl(this),
        this.fn()
      );
    } finally {
      Cr <= Ko && Vh(this),
        (fi = 1 << --Cr),
        (_n = this.parent),
        (li = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    _n === this
      ? (this.deferStop = !0)
      : this.active &&
        (bl(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function bl(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let li = !0;
const hu = [];
function lr() {
  hu.push(li), (li = !1);
}
function cr() {
  const e = hu.pop();
  li = e === void 0 ? !0 : e;
}
function en(e, t, n) {
  if (li && _n) {
    let r = Ts.get(e);
    r || Ts.set(e, (r = new Map()));
    let o = r.get(n);
    o || r.set(n, (o = Ea())), du(o);
  }
}
function du(e, t) {
  let n = !1;
  Cr <= Ko ? fu(e) || ((e.n |= fi), (n = !uu(e))) : (n = !e.has(_n)),
    n && (e.add(_n), _n.deps.push(e));
}
function zn(e, t, n, r, o, l) {
  const p = Ts.get(e);
  if (!p) return;
  let g = [];
  if (t === "clear") g = [...p.values()];
  else if (n === "length" && Fe(e)) {
    const y = Number(r);
    p.forEach((T, w) => {
      (w === "length" || w >= y) && g.push(T);
    });
  } else
    switch ((n !== void 0 && g.push(p.get(n)), t)) {
      case "add":
        Fe(e)
          ? _a(n) && g.push(p.get("length"))
          : (g.push(p.get(ki)), Ki(e) && g.push(p.get(Qo)));
        break;
      case "delete":
        Fe(e) || (g.push(p.get(ki)), Ki(e) && g.push(p.get(Qo)));
        break;
      case "set":
        Ki(e) && g.push(p.get(ki));
        break;
    }
  if (g.length === 1) g[0] && Jo(g[0]);
  else {
    const y = [];
    for (const T of g) T && y.push(...T);
    Jo(Ea(y));
  }
}
function Jo(e, t) {
  const n = Fe(e) ? e : [...e];
  for (const r of n) r.computed && vl(r);
  for (const r of n) r.computed || vl(r);
}
function vl(e, t) {
  (e !== _n || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
function Yh(e, t) {
  var n;
  return (n = Ts.get(e)) == null ? void 0 : n.get(t);
}
const Kh = va("__proto__,__v_isRef,__isVue"),
  pu = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Ta)
  ),
  Qh = Aa(),
  Jh = Aa(!1, !0),
  Gh = Aa(!0),
  wl = Xh();
function Xh() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const r = at(this);
        for (let l = 0, p = this.length; l < p; l++) en(r, "get", l + "");
        const o = r[t](...n);
        return o === -1 || o === !1 ? r[t](...n.map(at)) : o;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        lr();
        const r = at(this)[t].apply(this, n);
        return cr(), r;
      };
    }),
    e
  );
}
function Zh(e) {
  const t = at(this);
  return en(t, "has", e), t.hasOwnProperty(e);
}
function Aa(e = !1, t = !1) {
  return function (r, o, l) {
    if (o === "__v_isReactive") return !e;
    if (o === "__v_isReadonly") return e;
    if (o === "__v_isShallow") return t;
    if (o === "__v_raw" && l === (e ? (t ? gd : vu) : t ? bu : yu).get(r))
      return r;
    const p = Fe(r);
    if (!e) {
      if (p && st(wl, o)) return Reflect.get(wl, o, l);
      if (o === "hasOwnProperty") return Zh;
    }
    const g = Reflect.get(r, o, l);
    return (Ta(o) ? pu.has(o) : Kh(o)) || (e || en(r, "get", o), t)
      ? g
      : Dt(g)
      ? p && _a(o)
        ? g
        : g.value
      : bt(g)
      ? e
        ? wu(g)
        : hi(g)
      : g;
  };
}
const ed = gu(),
  td = gu(!0);
function gu(e = !1) {
  return function (n, r, o, l) {
    let p = n[r];
    if (Pi(p) && Dt(p) && !Dt(o)) return !1;
    if (
      !e &&
      (!_s(o) && !Pi(o) && ((p = at(p)), (o = at(o))),
      !Fe(n) && Dt(p) && !Dt(o))
    )
      return (p.value = o), !0;
    const g = Fe(n) && _a(r) ? Number(r) < n.length : st(n, r),
      y = Reflect.set(n, r, o, l);
    return (
      n === at(l) && (g ? Hr(o, p) && zn(n, "set", r, o) : zn(n, "add", r, o)),
      y
    );
  };
}
function nd(e, t) {
  const n = st(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && zn(e, "delete", t, void 0), r;
}
function id(e, t) {
  const n = Reflect.has(e, t);
  return (!Ta(t) || !pu.has(t)) && en(e, "has", t), n;
}
function rd(e) {
  return en(e, "iterate", Fe(e) ? "length" : ki), Reflect.ownKeys(e);
}
const mu = { get: Qh, set: ed, deleteProperty: nd, has: id, ownKeys: rd },
  sd = {
    get: Gh,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  od = Bt({}, mu, { get: Jh, set: td }),
  ka = (e) => e,
  $s = (e) => Reflect.getPrototypeOf(e);
function rs(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const o = at(e),
    l = at(t);
  n || (t !== l && en(o, "get", t), en(o, "get", l));
  const { has: p } = $s(o),
    g = r ? ka : n ? Ra : Dr;
  if (p.call(o, t)) return g(e.get(t));
  if (p.call(o, l)) return g(e.get(l));
  e !== o && e.get(t);
}
function ss(e, t = !1) {
  const n = this.__v_raw,
    r = at(n),
    o = at(e);
  return (
    t || (e !== o && en(r, "has", e), en(r, "has", o)),
    e === o ? n.has(e) : n.has(e) || n.has(o)
  );
}
function os(e, t = !1) {
  return (
    (e = e.__v_raw), !t && en(at(e), "iterate", ki), Reflect.get(e, "size", e)
  );
}
function xl(e) {
  e = at(e);
  const t = at(this);
  return $s(t).has.call(t, e) || (t.add(e), zn(t, "add", e, e)), this;
}
function Tl(e, t) {
  t = at(t);
  const n = at(this),
    { has: r, get: o } = $s(n);
  let l = r.call(n, e);
  l || ((e = at(e)), (l = r.call(n, e)));
  const p = o.call(n, e);
  return (
    n.set(e, t), l ? Hr(t, p) && zn(n, "set", e, t) : zn(n, "add", e, t), this
  );
}
function _l(e) {
  const t = at(this),
    { has: n, get: r } = $s(t);
  let o = n.call(t, e);
  o || ((e = at(e)), (o = n.call(t, e))), r && r.call(t, e);
  const l = t.delete(e);
  return o && zn(t, "delete", e, void 0), l;
}
function El() {
  const e = at(this),
    t = e.size !== 0,
    n = e.clear();
  return t && zn(e, "clear", void 0, void 0), n;
}
function as(e, t) {
  return function (r, o) {
    const l = this,
      p = l.__v_raw,
      g = at(p),
      y = t ? ka : e ? Ra : Dr;
    return (
      !e && en(g, "iterate", ki), p.forEach((T, w) => r.call(o, y(T), y(w), l))
    );
  };
}
function ls(e, t, n) {
  return function (...r) {
    const o = this.__v_raw,
      l = at(o),
      p = Ki(l),
      g = e === "entries" || (e === Symbol.iterator && p),
      y = e === "keys" && p,
      T = o[e](...r),
      w = n ? ka : t ? Ra : Dr;
    return (
      !t && en(l, "iterate", y ? Qo : ki),
      {
        next() {
          const { value: A, done: P } = T.next();
          return P
            ? { value: A, done: P }
            : { value: g ? [w(A[0]), w(A[1])] : w(A), done: P };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function ei(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function ad() {
  const e = {
      get(l) {
        return rs(this, l);
      },
      get size() {
        return os(this);
      },
      has: ss,
      add: xl,
      set: Tl,
      delete: _l,
      clear: El,
      forEach: as(!1, !1),
    },
    t = {
      get(l) {
        return rs(this, l, !1, !0);
      },
      get size() {
        return os(this);
      },
      has: ss,
      add: xl,
      set: Tl,
      delete: _l,
      clear: El,
      forEach: as(!1, !0),
    },
    n = {
      get(l) {
        return rs(this, l, !0);
      },
      get size() {
        return os(this, !0);
      },
      has(l) {
        return ss.call(this, l, !0);
      },
      add: ei("add"),
      set: ei("set"),
      delete: ei("delete"),
      clear: ei("clear"),
      forEach: as(!0, !1),
    },
    r = {
      get(l) {
        return rs(this, l, !0, !0);
      },
      get size() {
        return os(this, !0);
      },
      has(l) {
        return ss.call(this, l, !0);
      },
      add: ei("add"),
      set: ei("set"),
      delete: ei("delete"),
      clear: ei("clear"),
      forEach: as(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((l) => {
      (e[l] = ls(l, !1, !1)),
        (n[l] = ls(l, !0, !1)),
        (t[l] = ls(l, !1, !0)),
        (r[l] = ls(l, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [ld, cd, ud, fd] = ad();
function Sa(e, t) {
  const n = t ? (e ? fd : ud) : e ? cd : ld;
  return (r, o, l) =>
    o === "__v_isReactive"
      ? !e
      : o === "__v_isReadonly"
      ? e
      : o === "__v_raw"
      ? r
      : Reflect.get(st(n, o) && o in r ? n : r, o, l);
}
const hd = { get: Sa(!1, !1) },
  dd = { get: Sa(!1, !0) },
  pd = { get: Sa(!0, !1) },
  yu = new WeakMap(),
  bu = new WeakMap(),
  vu = new WeakMap(),
  gd = new WeakMap();
function md(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function yd(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : md(Rh(e));
}
function hi(e) {
  return Pi(e) ? e : Pa(e, !1, mu, hd, yu);
}
function qs(e) {
  return Pa(e, !1, od, dd, bu);
}
function wu(e) {
  return Pa(e, !0, sd, pd, vu);
}
function Pa(e, t, n, r, o) {
  if (!bt(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const l = o.get(e);
  if (l) return l;
  const p = yd(e);
  if (p === 0) return e;
  const g = new Proxy(e, p === 2 ? r : n);
  return o.set(e, g), g;
}
function Qi(e) {
  return Pi(e) ? Qi(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Pi(e) {
  return !!(e && e.__v_isReadonly);
}
function _s(e) {
  return !!(e && e.__v_isShallow);
}
function xu(e) {
  return Qi(e) || Pi(e);
}
function at(e) {
  const t = e && e.__v_raw;
  return t ? at(t) : e;
}
function Tu(e) {
  return xs(e, "__v_skip", !0), e;
}
const Dr = (e) => (bt(e) ? hi(e) : e),
  Ra = (e) => (bt(e) ? wu(e) : e);
function _u(e) {
  li && _n && ((e = at(e)), du(e.dep || (e.dep = Ea())));
}
function Eu(e, t) {
  e = at(e);
  const n = e.dep;
  n && Jo(n);
}
function Dt(e) {
  return !!(e && e.__v_isRef === !0);
}
function ci(e) {
  return Cu(e, !1);
}
function Br(e) {
  return Cu(e, !0);
}
function Cu(e, t) {
  return Dt(e) ? e : new bd(e, t);
}
class bd {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : at(t)),
      (this._value = n ? t : Dr(t));
  }
  get value() {
    return _u(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || _s(t) || Pi(t);
    (t = n ? t : at(t)),
      Hr(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : Dr(t)), Eu(this));
  }
}
function _t(e) {
  return Dt(e) ? e.value : e;
}
const vd = {
  get: (e, t, n) => _t(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return Dt(o) && !Dt(n) ? ((o.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function Au(e) {
  return Qi(e) ? e : new Proxy(e, vd);
}
class wd {
  constructor(t, n, r) {
    (this._object = t),
      (this._key = n),
      (this._defaultValue = r),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return Yh(at(this._object), this._key);
  }
}
class xd {
  constructor(t) {
    (this._getter = t), (this.__v_isRef = !0), (this.__v_isReadonly = !0);
  }
  get value() {
    return this._getter();
  }
}
function Td(e, t, n) {
  return Dt(e)
    ? e
    : qe(e)
    ? new xd(e)
    : bt(e) && arguments.length > 1
    ? _d(e, t, n)
    : ci(e);
}
function _d(e, t, n) {
  const r = e[t];
  return Dt(r) ? r : new wd(e, t, n);
}
class Ed {
  constructor(t, n, r, o) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new Ca(t, () => {
        this._dirty || ((this._dirty = !0), Eu(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !o),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = at(this);
    return (
      _u(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function Cd(e, t, n = !1) {
  let r, o;
  const l = qe(e);
  return (
    l ? ((r = e), (o = Cn)) : ((r = e.get), (o = e.set)),
    new Ed(r, o, l || !o, n)
  );
}
function ui(e, t, n, r) {
  let o;
  try {
    o = r ? e(...r) : e();
  } catch (l) {
    ur(l, t, n);
  }
  return o;
}
function An(e, t, n, r) {
  if (qe(e)) {
    const l = ui(e, t, n, r);
    return (
      l &&
        su(l) &&
        l.catch((p) => {
          ur(p, t, n);
        }),
      l
    );
  }
  const o = [];
  for (let l = 0; l < e.length; l++) o.push(An(e[l], t, n, r));
  return o;
}
function ur(e, t, n, r = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let l = t.parent;
    const p = t.proxy,
      g = n;
    for (; l; ) {
      const T = l.ec;
      if (T) {
        for (let w = 0; w < T.length; w++) if (T[w](e, p, g) === !1) return;
      }
      l = l.parent;
    }
    const y = t.appContext.config.errorHandler;
    if (y) {
      ui(y, null, 10, [e, p, g]);
      return;
    }
  }
  Ad(e, n, o, r);
}
function Ad(e, t, n, r = !0) {
  console.error(e);
}
let Fr = !1,
  Go = !1;
const zt = [];
let Ln = 0;
const Ji = [];
let Wn = null,
  Ei = 0;
const ku = Promise.resolve();
let Ia = null;
function Yr(e) {
  const t = Ia || ku;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function kd(e) {
  let t = Ln + 1,
    n = zt.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1;
    $r(zt[r]) < e ? (t = r + 1) : (n = r);
  }
  return t;
}
function Us(e) {
  (!zt.length || !zt.includes(e, Fr && e.allowRecurse ? Ln + 1 : Ln)) &&
    (e.id == null ? zt.push(e) : zt.splice(kd(e.id), 0, e), Su());
}
function Su() {
  !Fr && !Go && ((Go = !0), (Ia = ku.then(Ru)));
}
function Sd(e) {
  const t = zt.indexOf(e);
  t > Ln && zt.splice(t, 1);
}
function Pu(e) {
  Fe(e)
    ? Ji.push(...e)
    : (!Wn || !Wn.includes(e, e.allowRecurse ? Ei + 1 : Ei)) && Ji.push(e),
    Su();
}
function Cl(e, t = Fr ? Ln + 1 : 0) {
  for (; t < zt.length; t++) {
    const n = zt[t];
    n && n.pre && (zt.splice(t, 1), t--, n());
  }
}
function Es(e) {
  if (Ji.length) {
    const t = [...new Set(Ji)];
    if (((Ji.length = 0), Wn)) {
      Wn.push(...t);
      return;
    }
    for (Wn = t, Wn.sort((n, r) => $r(n) - $r(r)), Ei = 0; Ei < Wn.length; Ei++)
      Wn[Ei]();
    (Wn = null), (Ei = 0);
  }
}
const $r = (e) => (e.id == null ? 1 / 0 : e.id),
  Pd = (e, t) => {
    const n = $r(e) - $r(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function Ru(e) {
  (Go = !1), (Fr = !0), zt.sort(Pd);
  const t = Cn;
  try {
    for (Ln = 0; Ln < zt.length; Ln++) {
      const n = zt[Ln];
      n && n.active !== !1 && ui(n, null, 14);
    }
  } finally {
    (Ln = 0),
      (zt.length = 0),
      Es(),
      (Fr = !1),
      (Ia = null),
      (zt.length || Ji.length) && Ru();
  }
}
function Rd(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || xt;
  let o = n;
  const l = t.startsWith("update:"),
    p = l && t.slice(7);
  if (p && p in r) {
    const w = `${p === "modelValue" ? "model" : p}Modifiers`,
      { number: A, trim: P } = r[w] || xt;
    P && (o = n.map((H) => (At(H) ? H.trim() : H))), A && (o = n.map(Oh));
  }
  let g,
    y = r[(g = wo(t))] || r[(g = wo(jn(t)))];
  !y && l && (y = r[(g = wo(ar(t)))]), y && An(y, e, 6, o);
  const T = r[g + "Once"];
  if (T) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[g]) return;
    (e.emitted[g] = !0), An(T, e, 6, o);
  }
}
function Iu(e, t, n = !1) {
  const r = t.emitsCache,
    o = r.get(e);
  if (o !== void 0) return o;
  const l = e.emits;
  let p = {},
    g = !1;
  if (!qe(e)) {
    const y = (T) => {
      const w = Iu(T, t, !0);
      w && ((g = !0), Bt(p, w));
    };
    !n && t.mixins.length && t.mixins.forEach(y),
      e.extends && y(e.extends),
      e.mixins && e.mixins.forEach(y);
  }
  return !l && !g
    ? (bt(e) && r.set(e, null), null)
    : (Fe(l) ? l.forEach((y) => (p[y] = null)) : Bt(p, l),
      bt(e) && r.set(e, p),
      p);
}
function Ws(e, t) {
  return !e || !zr(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      st(e, t[0].toLowerCase() + t.slice(1)) || st(e, ar(t)) || st(e, t));
}
let cn = null,
  zs = null;
function Cs(e) {
  const t = cn;
  return (cn = e), (zs = (e && e.type.__scopeId) || null), t;
}
function e1(e) {
  zs = e;
}
function t1() {
  zs = null;
}
function Na(e, t = cn, n) {
  if (!t || e._n) return e;
  const r = (...o) => {
    r._d && Bl(-1);
    const l = Cs(t);
    let p;
    try {
      p = e(...o);
    } finally {
      Cs(l), r._d && Bl(1);
    }
    return p;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function To(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    props: l,
    propsOptions: [p],
    slots: g,
    attrs: y,
    emit: T,
    render: w,
    renderCache: A,
    data: P,
    setupState: H,
    ctx: $,
    inheritAttrs: K,
  } = e;
  let de, L;
  const U = Cs(e);
  try {
    if (n.shapeFlag & 4) {
      const J = o || r;
      (de = gn(w.call(J, J, A, l, H, P, $))), (L = y);
    } else {
      const J = t;
      (de = gn(
        J.length > 1 ? J(l, { attrs: y, slots: g, emit: T }) : J(l, null)
      )),
        (L = t.props ? y : Nd(y));
    }
  } catch (J) {
    (Nr.length = 0), ur(J, e, 1), (de = Pt(Hn));
  }
  let ye = de;
  if (L && K !== !1) {
    const J = Object.keys(L),
      { shapeFlag: X } = ye;
    J.length && X & 7 && (p && J.some(wa) && (L = Od(L, p)), (ye = er(ye, L)));
  }
  return (
    n.dirs &&
      ((ye = er(ye)), (ye.dirs = ye.dirs ? ye.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (ye.transition = n.transition),
    (de = ye),
    Cs(U),
    de
  );
}
function Id(e) {
  let t;
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    if (Ss(r)) {
      if (r.type !== Hn || r.children === "v-if") {
        if (t) return;
        t = r;
      }
    } else return;
  }
  return t;
}
const Nd = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || zr(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Od = (e, t) => {
    const n = {};
    for (const r in e) (!wa(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function Md(e, t, n) {
  const { props: r, children: o, component: l } = e,
    { props: p, children: g, patchFlag: y } = t,
    T = l.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && y >= 0) {
    if (y & 1024) return !0;
    if (y & 16) return r ? Al(r, p, T) : !!p;
    if (y & 8) {
      const w = t.dynamicProps;
      for (let A = 0; A < w.length; A++) {
        const P = w[A];
        if (p[P] !== r[P] && !Ws(T, P)) return !0;
      }
    }
  } else
    return (o || g) && (!g || !g.$stable)
      ? !0
      : r === p
      ? !1
      : r
      ? p
        ? Al(r, p, T)
        : !0
      : !!p;
  return !1;
}
function Al(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let o = 0; o < r.length; o++) {
    const l = r[o];
    if (t[l] !== e[l] && !Ws(n, l)) return !0;
  }
  return !1;
}
function Oa({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Ld = (e) => e.__isSuspense,
  jd = {
    name: "Suspense",
    __isSuspense: !0,
    process(e, t, n, r, o, l, p, g, y, T) {
      e == null ? Dd(t, n, r, o, l, p, g, y, T) : Bd(e, t, n, r, o, p, g, y, T);
    },
    hydrate: Fd,
    create: Ma,
    normalize: $d,
  },
  Hd = jd;
function qr(e, t) {
  const n = e.props && e.props[t];
  qe(n) && n();
}
function Dd(e, t, n, r, o, l, p, g, y) {
  const {
      p: T,
      o: { createElement: w },
    } = y,
    A = w("div"),
    P = (e.suspense = Ma(e, o, r, t, A, n, l, p, g, y));
  T(null, (P.pendingBranch = e.ssContent), A, null, r, P, l, p),
    P.deps > 0
      ? (qr(e, "onPending"),
        qr(e, "onFallback"),
        T(null, e.ssFallback, t, n, r, null, l, p),
        Gi(P, e.ssFallback))
      : P.resolve(!1, !0);
}
function Bd(e, t, n, r, o, l, p, g, { p: y, um: T, o: { createElement: w } }) {
  const A = (t.suspense = e.suspense);
  (A.vnode = t), (t.el = e.el);
  const P = t.ssContent,
    H = t.ssFallback,
    { activeBranch: $, pendingBranch: K, isInFallback: de, isHydrating: L } = A;
  if (K)
    (A.pendingBranch = P),
      ai(P, K)
        ? (y(K, P, A.hiddenContainer, null, o, A, l, p, g),
          A.deps <= 0
            ? A.resolve()
            : de && (y($, H, n, r, o, null, l, p, g), Gi(A, H)))
        : (A.pendingId++,
          L ? ((A.isHydrating = !1), (A.activeBranch = K)) : T(K, o, A),
          (A.deps = 0),
          (A.effects.length = 0),
          (A.hiddenContainer = w("div")),
          de
            ? (y(null, P, A.hiddenContainer, null, o, A, l, p, g),
              A.deps <= 0
                ? A.resolve()
                : (y($, H, n, r, o, null, l, p, g), Gi(A, H)))
            : $ && ai(P, $)
            ? (y($, P, n, r, o, A, l, p, g), A.resolve(!0))
            : (y(null, P, A.hiddenContainer, null, o, A, l, p, g),
              A.deps <= 0 && A.resolve()));
  else if ($ && ai(P, $)) y($, P, n, r, o, A, l, p, g), Gi(A, P);
  else if (
    (qr(t, "onPending"),
    (A.pendingBranch = P),
    A.pendingId++,
    y(null, P, A.hiddenContainer, null, o, A, l, p, g),
    A.deps <= 0)
  )
    A.resolve();
  else {
    const { timeout: U, pendingId: ye } = A;
    U > 0
      ? setTimeout(() => {
          A.pendingId === ye && A.fallback(H);
        }, U)
      : U === 0 && A.fallback(H);
  }
}
function Ma(e, t, n, r, o, l, p, g, y, T, w = !1) {
  const {
    p: A,
    m: P,
    um: H,
    n: $,
    o: { parentNode: K, remove: de },
  } = T;
  let L;
  const U = qd(e);
  U && t != null && t.pendingBranch && ((L = t.pendingId), t.deps++);
  const ye = e.props ? Mh(e.props.timeout) : void 0,
    J = {
      vnode: e,
      parent: t,
      parentComponent: n,
      isSVG: p,
      container: r,
      hiddenContainer: o,
      anchor: l,
      deps: 0,
      pendingId: 0,
      timeout: typeof ye == "number" ? ye : -1,
      activeBranch: null,
      pendingBranch: null,
      isInFallback: !0,
      isHydrating: w,
      isUnmounted: !1,
      effects: [],
      resolve(X = !1, Se = !1) {
        const {
          vnode: f,
          activeBranch: ve,
          pendingBranch: C,
          pendingId: Ue,
          effects: We,
          parentComponent: Le,
          container: Ee,
        } = J;
        if (J.isHydrating) J.isHydrating = !1;
        else if (!X) {
          const ze = ve && C.transition && C.transition.mode === "out-in";
          ze &&
            (ve.transition.afterLeave = () => {
              Ue === J.pendingId && P(C, Ee, ae, 0);
            });
          let { anchor: ae } = J;
          ve && ((ae = $(ve)), H(ve, Le, J, !0)), ze || P(C, Ee, ae, 0);
        }
        Gi(J, C), (J.pendingBranch = null), (J.isInFallback = !1);
        let ue = J.parent,
          vt = !1;
        for (; ue; ) {
          if (ue.pendingBranch) {
            ue.effects.push(...We), (vt = !0);
            break;
          }
          ue = ue.parent;
        }
        vt || Pu(We),
          (J.effects = []),
          U &&
            t &&
            t.pendingBranch &&
            L === t.pendingId &&
            (t.deps--, t.deps === 0 && !Se && t.resolve()),
          qr(f, "onResolve");
      },
      fallback(X) {
        if (!J.pendingBranch) return;
        const {
          vnode: Se,
          activeBranch: f,
          parentComponent: ve,
          container: C,
          isSVG: Ue,
        } = J;
        qr(Se, "onFallback");
        const We = $(f),
          Le = () => {
            J.isInFallback && (A(null, X, C, We, ve, null, Ue, g, y), Gi(J, X));
          },
          Ee = X.transition && X.transition.mode === "out-in";
        Ee && (f.transition.afterLeave = Le),
          (J.isInFallback = !0),
          H(f, ve, null, !0),
          Ee || Le();
      },
      move(X, Se, f) {
        J.activeBranch && P(J.activeBranch, X, Se, f), (J.container = X);
      },
      next() {
        return J.activeBranch && $(J.activeBranch);
      },
      registerDep(X, Se) {
        const f = !!J.pendingBranch;
        f && J.deps++;
        const ve = X.vnode.el;
        X.asyncDep
          .catch((C) => {
            ur(C, X, 0);
          })
          .then((C) => {
            if (X.isUnmounted || J.isUnmounted || J.pendingId !== X.suspenseId)
              return;
            X.asyncResolved = !0;
            const { vnode: Ue } = X;
            na(X, C, !1), ve && (Ue.el = ve);
            const We = !ve && X.subTree.el;
            Se(X, Ue, K(ve || X.subTree.el), ve ? null : $(X.subTree), J, p, y),
              We && de(We),
              Oa(X, Ue.el),
              f && --J.deps === 0 && J.resolve();
          });
      },
      unmount(X, Se) {
        (J.isUnmounted = !0),
          J.activeBranch && H(J.activeBranch, n, X, Se),
          J.pendingBranch && H(J.pendingBranch, n, X, Se);
      },
    };
  return J;
}
function Fd(e, t, n, r, o, l, p, g, y) {
  const T = (t.suspense = Ma(
      t,
      r,
      n,
      e.parentNode,
      document.createElement("div"),
      null,
      o,
      l,
      p,
      g,
      !0
    )),
    w = y(e, (T.pendingBranch = t.ssContent), n, T, l, p);
  return T.deps === 0 && T.resolve(!1, !0), w;
}
function $d(e) {
  const { shapeFlag: t, children: n } = e,
    r = t & 32;
  (e.ssContent = kl(r ? n.default : n)),
    (e.ssFallback = r ? kl(n.fallback) : Pt(Hn));
}
function kl(e) {
  let t;
  if (qe(e)) {
    const n = Zi && e._c;
    n && ((e._d = !1), ln()), (e = e()), n && ((e._d = !0), (t = mn), Ju());
  }
  return (
    Fe(e) && (e = Id(e)),
    (e = gn(e)),
    t && !e.dynamicChildren && (e.dynamicChildren = t.filter((n) => n !== e)),
    e
  );
}
function Nu(e, t) {
  t && t.pendingBranch
    ? Fe(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Pu(e);
}
function Gi(e, t) {
  e.activeBranch = t;
  const { vnode: n, parentComponent: r } = e,
    o = (n.el = t.el);
  r && r.subTree === n && ((r.vnode.el = o), Oa(r, o));
}
function qd(e) {
  var t;
  return (
    ((t = e.props) == null ? void 0 : t.suspensible) != null &&
    e.props.suspensible !== !1
  );
}
function n1(e, t) {
  return La(e, null, t);
}
const cs = {};
function gs(e, t, n) {
  return La(e, t, n);
}
function La(
  e,
  t,
  { immediate: n, deep: r, flush: o, onTrack: l, onTrigger: p } = xt
) {
  var g;
  const y = Wh() === ((g = Rt) == null ? void 0 : g.scope) ? Rt : null;
  let T,
    w = !1,
    A = !1;
  if (
    (Dt(e)
      ? ((T = () => e.value), (w = _s(e)))
      : Qi(e)
      ? ((T = () => e), (r = !0))
      : Fe(e)
      ? ((A = !0),
        (w = e.some((J) => Qi(J) || _s(J))),
        (T = () =>
          e.map((J) => {
            if (Dt(J)) return J.value;
            if (Qi(J)) return zi(J);
            if (qe(J)) return ui(J, y, 2);
          })))
      : qe(e)
      ? t
        ? (T = () => ui(e, y, 2))
        : (T = () => {
            if (!(y && y.isUnmounted)) return P && P(), An(e, y, 3, [H]);
          })
      : (T = Cn),
    t && r)
  ) {
    const J = T;
    T = () => zi(J());
  }
  let P,
    H = (J) => {
      P = U.onStop = () => {
        ui(J, y, 4);
      };
    },
    $;
  if (nr)
    if (
      ((H = Cn),
      t ? n && An(t, y, 3, [T(), A ? [] : void 0, H]) : T(),
      o === "sync")
    ) {
      const J = Op();
      $ = J.__watcherHandles || (J.__watcherHandles = []);
    } else return Cn;
  let K = A ? new Array(e.length).fill(cs) : cs;
  const de = () => {
    if (U.active)
      if (t) {
        const J = U.run();
        (r || w || (A ? J.some((X, Se) => Hr(X, K[Se])) : Hr(J, K))) &&
          (P && P(),
          An(t, y, 3, [J, K === cs ? void 0 : A && K[0] === cs ? [] : K, H]),
          (K = J));
      } else U.run();
  };
  de.allowRecurse = !!t;
  let L;
  o === "sync"
    ? (L = de)
    : o === "post"
    ? (L = () => Zt(de, y && y.suspense))
    : ((de.pre = !0), y && (de.id = y.uid), (L = () => Us(de)));
  const U = new Ca(T, L);
  t
    ? n
      ? de()
      : (K = U.run())
    : o === "post"
    ? Zt(U.run.bind(U), y && y.suspense)
    : U.run();
  const ye = () => {
    U.stop(), y && y.scope && xa(y.scope.effects, U);
  };
  return $ && $.push(ye), ye;
}
function Ud(e, t, n) {
  const r = this.proxy,
    o = At(e) ? (e.includes(".") ? Ou(r, e) : () => r[e]) : e.bind(r, r);
  let l;
  qe(t) ? (l = t) : ((l = t.handler), (n = t));
  const p = Rt;
  tr(this);
  const g = La(o, l.bind(r), n);
  return p ? tr(p) : Si(), g;
}
function Ou(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++) r = r[n[o]];
    return r;
  };
}
function zi(e, t) {
  if (!bt(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), Dt(e))) zi(e.value, t);
  else if (Fe(e)) for (let n = 0; n < e.length; n++) zi(e[n], t);
  else if (ru(e) || Ki(e))
    e.forEach((n) => {
      zi(n, t);
    });
  else if (au(e)) for (const n in e) zi(e[n], t);
  return e;
}
function Mn(e, t, n, r) {
  const o = e.dirs,
    l = t && t.dirs;
  for (let p = 0; p < o.length; p++) {
    const g = o[p];
    l && (g.oldValue = l[p].value);
    let y = g.dir[r];
    y && (lr(), An(y, n, 8, [e.el, g, e, t]), cr());
  }
}
function Vs(e, t) {
  return qe(e) ? (() => Bt({ name: e.name }, t, { setup: e }))() : e;
}
const Pr = (e) => !!e.type.__asyncLoader;
function Sl(e) {
  qe(e) && (e = { loader: e });
  const {
    loader: t,
    loadingComponent: n,
    errorComponent: r,
    delay: o = 200,
    timeout: l,
    suspensible: p = !0,
    onError: g,
  } = e;
  let y = null,
    T,
    w = 0;
  const A = () => (w++, (y = null), P()),
    P = () => {
      let H;
      return (
        y ||
        (H = y =
          t()
            .catch(($) => {
              if ((($ = $ instanceof Error ? $ : new Error(String($))), g))
                return new Promise((K, de) => {
                  g(
                    $,
                    () => K(A()),
                    () => de($),
                    w + 1
                  );
                });
              throw $;
            })
            .then(($) =>
              H !== y && y
                ? y
                : ($ &&
                    ($.__esModule || $[Symbol.toStringTag] === "Module") &&
                    ($ = $.default),
                  (T = $),
                  $)
            ))
      );
    };
  return Vs({
    name: "AsyncComponentWrapper",
    __asyncLoader: P,
    get __asyncResolved() {
      return T;
    },
    setup() {
      const H = Rt;
      if (T) return () => _o(T, H);
      const $ = (U) => {
        (y = null), ur(U, H, 13, !r);
      };
      if ((p && H.suspense) || nr)
        return P()
          .then((U) => () => _o(U, H))
          .catch((U) => ($(U), () => (r ? Pt(r, { error: U }) : null)));
      const K = ci(!1),
        de = ci(),
        L = ci(!!o);
      return (
        o &&
          setTimeout(() => {
            L.value = !1;
          }, o),
        l != null &&
          setTimeout(() => {
            if (!K.value && !de.value) {
              const U = new Error(`Async component timed out after ${l}ms.`);
              $(U), (de.value = U);
            }
          }, l),
        P()
          .then(() => {
            (K.value = !0),
              H.parent && ja(H.parent.vnode) && Us(H.parent.update);
          })
          .catch((U) => {
            $(U), (de.value = U);
          }),
        () => {
          if (K.value && T) return _o(T, H);
          if (de.value && r) return Pt(r, { error: de.value });
          if (n && !L.value) return Pt(n);
        }
      );
    },
  });
}
function _o(e, t) {
  const { ref: n, props: r, children: o, ce: l } = t.vnode,
    p = Pt(e, r, o);
  return (p.ref = n), (p.ce = l), delete t.vnode.ce, p;
}
const ja = (e) => e.type.__isKeepAlive;
function Wd(e, t) {
  Mu(e, "a", t);
}
function zd(e, t) {
  Mu(e, "da", t);
}
function Mu(e, t, n = Rt) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let o = n;
      for (; o; ) {
        if (o.isDeactivated) return;
        o = o.parent;
      }
      return e();
    });
  if ((Ys(t, r, n), n)) {
    let o = n.parent;
    for (; o && o.parent; )
      ja(o.parent.vnode) && Vd(r, t, n, o), (o = o.parent);
  }
}
function Vd(e, t, n, r) {
  const o = Ys(t, e, r, !0);
  ju(() => {
    xa(r[t], o);
  }, n);
}
function Ys(e, t, n = Rt, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []),
      l =
        t.__weh ||
        (t.__weh = (...p) => {
          if (n.isUnmounted) return;
          lr(), tr(n);
          const g = An(t, n, e, p);
          return Si(), cr(), g;
        });
    return r ? o.unshift(l) : o.push(l), l;
  }
}
const Vn =
    (e) =>
    (t, n = Rt) =>
      (!nr || e === "sp") && Ys(e, (...r) => t(...r), n),
  Yd = Vn("bm"),
  Lu = Vn("m"),
  Kd = Vn("bu"),
  Qd = Vn("u"),
  Jd = Vn("bum"),
  ju = Vn("um"),
  Gd = Vn("sp"),
  Xd = Vn("rtg"),
  Zd = Vn("rtc");
function Hu(e, t = Rt) {
  Ys("ec", e, t);
}
const Ha = "components";
function ep(e, t) {
  return Bu(Ha, e, !0, t) || e;
}
const Du = Symbol.for("v-ndc");
function tp(e) {
  return At(e) ? Bu(Ha, e, !1) || e : e || Du;
}
function Bu(e, t, n = !0, r = !1) {
  const o = cn || Rt;
  if (o) {
    const l = o.type;
    if (e === Ha) {
      const g = Rp(l, !1);
      if (g && (g === t || g === jn(t) || g === Fs(jn(t)))) return l;
    }
    const p = Pl(o[e] || l[e], t) || Pl(o.appContext[e], t);
    return !p && r ? l : p;
  }
}
function Pl(e, t) {
  return e && (e[t] || e[jn(t)] || e[Fs(jn(t))]);
}
function Rl(e, t, n, r) {
  let o;
  const l = n && n[r];
  if (Fe(e) || At(e)) {
    o = new Array(e.length);
    for (let p = 0, g = e.length; p < g; p++)
      o[p] = t(e[p], p, void 0, l && l[p]);
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let p = 0; p < e; p++) o[p] = t(p + 1, p, void 0, l && l[p]);
  } else if (bt(e))
    if (e[Symbol.iterator])
      o = Array.from(e, (p, g) => t(p, g, void 0, l && l[g]));
    else {
      const p = Object.keys(e);
      o = new Array(p.length);
      for (let g = 0, y = p.length; g < y; g++) {
        const T = p[g];
        o[g] = t(e[T], T, g, l && l[g]);
      }
    }
  else o = [];
  return n && (n[r] = o), o;
}
const Xo = (e) => (e ? (ef(e) ? qa(e) || e.proxy : Xo(e.parent)) : null),
  Rr = Bt(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Xo(e.parent),
    $root: (e) => Xo(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Da(e),
    $forceUpdate: (e) => e.f || (e.f = () => Us(e.update)),
    $nextTick: (e) => e.n || (e.n = Yr.bind(e.proxy)),
    $watch: (e) => Ud.bind(e),
  }),
  Eo = (e, t) => e !== xt && !e.__isScriptSetup && st(e, t),
  np = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: o,
        props: l,
        accessCache: p,
        type: g,
        appContext: y,
      } = e;
      let T;
      if (t[0] !== "$") {
        const H = p[t];
        if (H !== void 0)
          switch (H) {
            case 1:
              return r[t];
            case 2:
              return o[t];
            case 4:
              return n[t];
            case 3:
              return l[t];
          }
        else {
          if (Eo(r, t)) return (p[t] = 1), r[t];
          if (o !== xt && st(o, t)) return (p[t] = 2), o[t];
          if ((T = e.propsOptions[0]) && st(T, t)) return (p[t] = 3), l[t];
          if (n !== xt && st(n, t)) return (p[t] = 4), n[t];
          Zo && (p[t] = 0);
        }
      }
      const w = Rr[t];
      let A, P;
      if (w) return t === "$attrs" && en(e, "get", t), w(e);
      if ((A = g.__cssModules) && (A = A[t])) return A;
      if (n !== xt && st(n, t)) return (p[t] = 4), n[t];
      if (((P = y.config.globalProperties), st(P, t))) return P[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: o, ctx: l } = e;
      return Eo(o, t)
        ? ((o[t] = n), !0)
        : r !== xt && st(r, t)
        ? ((r[t] = n), !0)
        : st(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((l[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: o,
          propsOptions: l,
        },
      },
      p
    ) {
      let g;
      return (
        !!n[p] ||
        (e !== xt && st(e, p)) ||
        Eo(t, p) ||
        ((g = l[0]) && st(g, p)) ||
        st(r, p) ||
        st(Rr, p) ||
        st(o.config.globalProperties, p)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : st(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function Il(e) {
  return Fe(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let Zo = !0;
function ip(e) {
  const t = Da(e),
    n = e.proxy,
    r = e.ctx;
  (Zo = !1), t.beforeCreate && Nl(t.beforeCreate, e, "bc");
  const {
    data: o,
    computed: l,
    methods: p,
    watch: g,
    provide: y,
    inject: T,
    created: w,
    beforeMount: A,
    mounted: P,
    beforeUpdate: H,
    updated: $,
    activated: K,
    deactivated: de,
    beforeDestroy: L,
    beforeUnmount: U,
    destroyed: ye,
    unmounted: J,
    render: X,
    renderTracked: Se,
    renderTriggered: f,
    errorCaptured: ve,
    serverPrefetch: C,
    expose: Ue,
    inheritAttrs: We,
    components: Le,
    directives: Ee,
    filters: ue,
  } = t;
  if ((T && rp(T, r, null), p))
    for (const ae in p) {
      const Qe = p[ae];
      qe(Qe) && (r[ae] = Qe.bind(n));
    }
  if (o) {
    const ae = o.call(n, n);
    bt(ae) && (e.data = hi(ae));
  }
  if (((Zo = !0), l))
    for (const ae in l) {
      const Qe = l[ae],
        ht = qe(Qe) ? Qe.bind(n, n) : qe(Qe.get) ? Qe.get.bind(n, n) : Cn,
        Ut = !qe(Qe) && qe(Qe.set) ? Qe.set.bind(n) : Cn,
        Mt = En({ get: ht, set: Ut });
      Object.defineProperty(r, ae, {
        enumerable: !0,
        configurable: !0,
        get: () => Mt.value,
        set: (ft) => (Mt.value = ft),
      });
    }
  if (g) for (const ae in g) Fu(g[ae], r, n, ae);
  if (y) {
    const ae = qe(y) ? y.call(n) : y;
    Reflect.ownKeys(ae).forEach((Qe) => {
      Ir(Qe, ae[Qe]);
    });
  }
  w && Nl(w, e, "c");
  function ze(ae, Qe) {
    Fe(Qe) ? Qe.forEach((ht) => ae(ht.bind(n))) : Qe && ae(Qe.bind(n));
  }
  if (
    (ze(Yd, A),
    ze(Lu, P),
    ze(Kd, H),
    ze(Qd, $),
    ze(Wd, K),
    ze(zd, de),
    ze(Hu, ve),
    ze(Zd, Se),
    ze(Xd, f),
    ze(Jd, U),
    ze(ju, J),
    ze(Gd, C),
    Fe(Ue))
  )
    if (Ue.length) {
      const ae = e.exposed || (e.exposed = {});
      Ue.forEach((Qe) => {
        Object.defineProperty(ae, Qe, {
          get: () => n[Qe],
          set: (ht) => (n[Qe] = ht),
        });
      });
    } else e.exposed || (e.exposed = {});
  X && e.render === Cn && (e.render = X),
    We != null && (e.inheritAttrs = We),
    Le && (e.components = Le),
    Ee && (e.directives = Ee);
}
function rp(e, t, n = Cn) {
  Fe(e) && (e = ea(e));
  for (const r in e) {
    const o = e[r];
    let l;
    bt(o)
      ? "default" in o
        ? (l = yn(o.from || r, o.default, !0))
        : (l = yn(o.from || r))
      : (l = yn(o)),
      Dt(l)
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => l.value,
            set: (p) => (l.value = p),
          })
        : (t[r] = l);
  }
}
function Nl(e, t, n) {
  An(Fe(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Fu(e, t, n, r) {
  const o = r.includes(".") ? Ou(n, r) : () => n[r];
  if (At(e)) {
    const l = t[e];
    qe(l) && gs(o, l);
  } else if (qe(e)) gs(o, e.bind(n));
  else if (bt(e))
    if (Fe(e)) e.forEach((l) => Fu(l, t, n, r));
    else {
      const l = qe(e.handler) ? e.handler.bind(n) : t[e.handler];
      qe(l) && gs(o, l, e);
    }
}
function Da(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: o,
      optionsCache: l,
      config: { optionMergeStrategies: p },
    } = e.appContext,
    g = l.get(t);
  let y;
  return (
    g
      ? (y = g)
      : !o.length && !n && !r
      ? (y = t)
      : ((y = {}), o.length && o.forEach((T) => As(y, T, p, !0)), As(y, t, p)),
    bt(t) && l.set(t, y),
    y
  );
}
function As(e, t, n, r = !1) {
  const { mixins: o, extends: l } = t;
  l && As(e, l, n, !0), o && o.forEach((p) => As(e, p, n, !0));
  for (const p in t)
    if (!(r && p === "expose")) {
      const g = sp[p] || (n && n[p]);
      e[p] = g ? g(e[p], t[p]) : t[p];
    }
  return e;
}
const sp = {
  data: Ol,
  props: Ml,
  emits: Ml,
  methods: Ar,
  computed: Ar,
  beforeCreate: Qt,
  created: Qt,
  beforeMount: Qt,
  mounted: Qt,
  beforeUpdate: Qt,
  updated: Qt,
  beforeDestroy: Qt,
  beforeUnmount: Qt,
  destroyed: Qt,
  unmounted: Qt,
  activated: Qt,
  deactivated: Qt,
  errorCaptured: Qt,
  serverPrefetch: Qt,
  components: Ar,
  directives: Ar,
  watch: ap,
  provide: Ol,
  inject: op,
};
function Ol(e, t) {
  return t
    ? e
      ? function () {
          return Bt(
            qe(e) ? e.call(this, this) : e,
            qe(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function op(e, t) {
  return Ar(ea(e), ea(t));
}
function ea(e) {
  if (Fe(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Qt(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ar(e, t) {
  return e ? Bt(Object.create(null), e, t) : t;
}
function Ml(e, t) {
  return e
    ? Fe(e) && Fe(t)
      ? [...new Set([...e, ...t])]
      : Bt(Object.create(null), Il(e), Il(t ?? {}))
    : t;
}
function ap(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Bt(Object.create(null), e);
  for (const r in t) n[r] = Qt(e[r], t[r]);
  return n;
}
function $u() {
  return {
    app: null,
    config: {
      isNativeTag: kh,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let lp = 0;
function cp(e, t) {
  return function (r, o = null) {
    qe(r) || (r = Bt({}, r)), o != null && !bt(o) && (o = null);
    const l = $u(),
      p = new Set();
    let g = !1;
    const y = (l.app = {
      _uid: lp++,
      _component: r,
      _props: o,
      _container: null,
      _context: l,
      _instance: null,
      version: rf,
      get config() {
        return l.config;
      },
      set config(T) {},
      use(T, ...w) {
        return (
          p.has(T) ||
            (T && qe(T.install)
              ? (p.add(T), T.install(y, ...w))
              : qe(T) && (p.add(T), T(y, ...w))),
          y
        );
      },
      mixin(T) {
        return l.mixins.includes(T) || l.mixins.push(T), y;
      },
      component(T, w) {
        return w ? ((l.components[T] = w), y) : l.components[T];
      },
      directive(T, w) {
        return w ? ((l.directives[T] = w), y) : l.directives[T];
      },
      mount(T, w, A) {
        if (!g) {
          const P = Pt(r, o);
          return (
            (P.appContext = l),
            w && t ? t(P, T) : e(P, T, A),
            (g = !0),
            (y._container = T),
            (T.__vue_app__ = y),
            qa(P.component) || P.component.proxy
          );
        }
      },
      unmount() {
        g && (e(null, y._container), delete y._container.__vue_app__);
      },
      provide(T, w) {
        return (l.provides[T] = w), y;
      },
      runWithContext(T) {
        Ur = y;
        try {
          return T();
        } finally {
          Ur = null;
        }
      },
    });
    return y;
  };
}
let Ur = null;
function Ir(e, t) {
  if (Rt) {
    let n = Rt.provides;
    const r = Rt.parent && Rt.parent.provides;
    r === n && (n = Rt.provides = Object.create(r)), (n[e] = t);
  }
}
function yn(e, t, n = !1) {
  const r = Rt || cn;
  if (r || Ur) {
    const o = r
      ? r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides
      : Ur._context.provides;
    if (o && e in o) return o[e];
    if (arguments.length > 1) return n && qe(t) ? t.call(r && r.proxy) : t;
  }
}
function qu() {
  return !!(Rt || cn || Ur);
}
function up(e, t, n, r = !1) {
  const o = {},
    l = {};
  xs(l, Ks, 1), (e.propsDefaults = Object.create(null)), Uu(e, t, o, l);
  for (const p in e.propsOptions[0]) p in o || (o[p] = void 0);
  n ? (e.props = r ? o : qs(o)) : e.type.props ? (e.props = o) : (e.props = l),
    (e.attrs = l);
}
function fp(e, t, n, r) {
  const {
      props: o,
      attrs: l,
      vnode: { patchFlag: p },
    } = e,
    g = at(o),
    [y] = e.propsOptions;
  let T = !1;
  if ((r || p > 0) && !(p & 16)) {
    if (p & 8) {
      const w = e.vnode.dynamicProps;
      for (let A = 0; A < w.length; A++) {
        let P = w[A];
        if (Ws(e.emitsOptions, P)) continue;
        const H = t[P];
        if (y)
          if (st(l, P)) H !== l[P] && ((l[P] = H), (T = !0));
          else {
            const $ = jn(P);
            o[$] = ta(y, g, $, H, e, !1);
          }
        else H !== l[P] && ((l[P] = H), (T = !0));
      }
    }
  } else {
    Uu(e, t, o, l) && (T = !0);
    let w;
    for (const A in g)
      (!t || (!st(t, A) && ((w = ar(A)) === A || !st(t, w)))) &&
        (y
          ? n &&
            (n[A] !== void 0 || n[w] !== void 0) &&
            (o[A] = ta(y, g, A, void 0, e, !0))
          : delete o[A]);
    if (l !== g)
      for (const A in l) (!t || !st(t, A)) && (delete l[A], (T = !0));
  }
  T && zn(e, "set", "$attrs");
}
function Uu(e, t, n, r) {
  const [o, l] = e.propsOptions;
  let p = !1,
    g;
  if (t)
    for (let y in t) {
      if (Sr(y)) continue;
      const T = t[y];
      let w;
      o && st(o, (w = jn(y)))
        ? !l || !l.includes(w)
          ? (n[w] = T)
          : ((g || (g = {}))[w] = T)
        : Ws(e.emitsOptions, y) ||
          ((!(y in r) || T !== r[y]) && ((r[y] = T), (p = !0)));
    }
  if (l) {
    const y = at(n),
      T = g || xt;
    for (let w = 0; w < l.length; w++) {
      const A = l[w];
      n[A] = ta(o, y, A, T[A], e, !st(T, A));
    }
  }
  return p;
}
function ta(e, t, n, r, o, l) {
  const p = e[n];
  if (p != null) {
    const g = st(p, "default");
    if (g && r === void 0) {
      const y = p.default;
      if (p.type !== Function && !p.skipFactory && qe(y)) {
        const { propsDefaults: T } = o;
        n in T ? (r = T[n]) : (tr(o), (r = T[n] = y.call(null, t)), Si());
      } else r = y;
    }
    p[0] &&
      (l && !g ? (r = !1) : p[1] && (r === "" || r === ar(n)) && (r = !0));
  }
  return r;
}
function Wu(e, t, n = !1) {
  const r = t.propsCache,
    o = r.get(e);
  if (o) return o;
  const l = e.props,
    p = {},
    g = [];
  let y = !1;
  if (!qe(e)) {
    const w = (A) => {
      y = !0;
      const [P, H] = Wu(A, t, !0);
      Bt(p, P), H && g.push(...H);
    };
    !n && t.mixins.length && t.mixins.forEach(w),
      e.extends && w(e.extends),
      e.mixins && e.mixins.forEach(w);
  }
  if (!l && !y) return bt(e) && r.set(e, Yi), Yi;
  if (Fe(l))
    for (let w = 0; w < l.length; w++) {
      const A = jn(l[w]);
      Ll(A) && (p[A] = xt);
    }
  else if (l)
    for (const w in l) {
      const A = jn(w);
      if (Ll(A)) {
        const P = l[w],
          H = (p[A] = Fe(P) || qe(P) ? { type: P } : Bt({}, P));
        if (H) {
          const $ = Dl(Boolean, H.type),
            K = Dl(String, H.type);
          (H[0] = $ > -1),
            (H[1] = K < 0 || $ < K),
            ($ > -1 || st(H, "default")) && g.push(A);
        }
      }
    }
  const T = [p, g];
  return bt(e) && r.set(e, T), T;
}
function Ll(e) {
  return e[0] !== "$";
}
function jl(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function Hl(e, t) {
  return jl(e) === jl(t);
}
function Dl(e, t) {
  return Fe(t) ? t.findIndex((n) => Hl(n, e)) : qe(t) && Hl(t, e) ? 0 : -1;
}
const zu = (e) => e[0] === "_" || e === "$stable",
  Ba = (e) => (Fe(e) ? e.map(gn) : [gn(e)]),
  hp = (e, t, n) => {
    if (t._n) return t;
    const r = Na((...o) => Ba(t(...o)), n);
    return (r._c = !1), r;
  },
  Vu = (e, t, n) => {
    const r = e._ctx;
    for (const o in e) {
      if (zu(o)) continue;
      const l = e[o];
      if (qe(l)) t[o] = hp(o, l, r);
      else if (l != null) {
        const p = Ba(l);
        t[o] = () => p;
      }
    }
  },
  Yu = (e, t) => {
    const n = Ba(t);
    e.slots.default = () => n;
  },
  dp = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = at(t)), xs(t, "_", n)) : Vu(t, (e.slots = {}));
    } else (e.slots = {}), t && Yu(e, t);
    xs(e.slots, Ks, 1);
  },
  pp = (e, t, n) => {
    const { vnode: r, slots: o } = e;
    let l = !0,
      p = xt;
    if (r.shapeFlag & 32) {
      const g = t._;
      g
        ? n && g === 1
          ? (l = !1)
          : (Bt(o, t), !n && g === 1 && delete o._)
        : ((l = !t.$stable), Vu(t, o)),
        (p = t);
    } else t && (Yu(e, t), (p = { default: 1 }));
    if (l) for (const g in o) !zu(g) && !(g in p) && delete o[g];
  };
function ks(e, t, n, r, o = !1) {
  if (Fe(e)) {
    e.forEach((P, H) => ks(P, t && (Fe(t) ? t[H] : t), n, r, o));
    return;
  }
  if (Pr(r) && !o) return;
  const l = r.shapeFlag & 4 ? qa(r.component) || r.component.proxy : r.el,
    p = o ? null : l,
    { i: g, r: y } = e,
    T = t && t.r,
    w = g.refs === xt ? (g.refs = {}) : g.refs,
    A = g.setupState;
  if (
    (T != null &&
      T !== y &&
      (At(T)
        ? ((w[T] = null), st(A, T) && (A[T] = null))
        : Dt(T) && (T.value = null)),
    qe(y))
  )
    ui(y, g, 12, [p, w]);
  else {
    const P = At(y),
      H = Dt(y);
    if (P || H) {
      const $ = () => {
        if (e.f) {
          const K = P ? (st(A, y) ? A[y] : w[y]) : y.value;
          o
            ? Fe(K) && xa(K, l)
            : Fe(K)
            ? K.includes(l) || K.push(l)
            : P
            ? ((w[y] = [l]), st(A, y) && (A[y] = w[y]))
            : ((y.value = [l]), e.k && (w[e.k] = y.value));
        } else
          P
            ? ((w[y] = p), st(A, y) && (A[y] = p))
            : H && ((y.value = p), e.k && (w[e.k] = p));
      };
      p ? (($.id = -1), Zt($, n)) : $();
    }
  }
}
let ti = !1;
const us = (e) => /svg/.test(e.namespaceURI) && e.tagName !== "foreignObject",
  fs = (e) => e.nodeType === 8;
function gp(e) {
  const {
      mt: t,
      p: n,
      o: {
        patchProp: r,
        createText: o,
        nextSibling: l,
        parentNode: p,
        remove: g,
        insert: y,
        createComment: T,
      },
    } = e,
    w = (L, U) => {
      if (!U.hasChildNodes()) {
        n(null, L, U), Es(), (U._vnode = L);
        return;
      }
      (ti = !1),
        A(U.firstChild, L, null, null, null),
        Es(),
        (U._vnode = L),
        ti && console.error("Hydration completed but contains mismatches.");
    },
    A = (L, U, ye, J, X, Se = !1) => {
      const f = fs(L) && L.data === "[",
        ve = () => K(L, U, ye, J, X, f),
        { type: C, ref: Ue, shapeFlag: We, patchFlag: Le } = U;
      let Ee = L.nodeType;
      (U.el = L), Le === -2 && ((Se = !1), (U.dynamicChildren = null));
      let ue = null;
      switch (C) {
        case Xi:
          Ee !== 3
            ? U.children === ""
              ? (y((U.el = o("")), p(L), L), (ue = L))
              : (ue = ve())
            : (L.data !== U.children && ((ti = !0), (L.data = U.children)),
              (ue = l(L)));
          break;
        case Hn:
          Ee !== 8 || f ? (ue = ve()) : (ue = l(L));
          break;
        case ms:
          if ((f && ((L = l(L)), (Ee = L.nodeType)), Ee === 1 || Ee === 3)) {
            ue = L;
            const vt = !U.children.length;
            for (let ze = 0; ze < U.staticCount; ze++)
              vt && (U.children += ue.nodeType === 1 ? ue.outerHTML : ue.data),
                ze === U.staticCount - 1 && (U.anchor = ue),
                (ue = l(ue));
            return f ? l(ue) : ue;
          } else ve();
          break;
        case an:
          f ? (ue = $(L, U, ye, J, X, Se)) : (ue = ve());
          break;
        default:
          if (We & 1)
            Ee !== 1 || U.type.toLowerCase() !== L.tagName.toLowerCase()
              ? (ue = ve())
              : (ue = P(L, U, ye, J, X, Se));
          else if (We & 6) {
            U.slotScopeIds = X;
            const vt = p(L);
            if (
              (t(U, vt, null, ye, J, us(vt), Se),
              (ue = f ? de(L) : l(L)),
              ue && fs(ue) && ue.data === "teleport end" && (ue = l(ue)),
              Pr(U))
            ) {
              let ze;
              f
                ? ((ze = Pt(an)),
                  (ze.anchor = ue ? ue.previousSibling : vt.lastChild))
                : (ze = L.nodeType === 3 ? bn("") : Pt("div")),
                (ze.el = L),
                (U.component.subTree = ze);
            }
          } else
            We & 64
              ? Ee !== 8
                ? (ue = ve())
                : (ue = U.type.hydrate(L, U, ye, J, X, Se, e, H))
              : We & 128 &&
                (ue = U.type.hydrate(L, U, ye, J, us(p(L)), X, Se, e, A));
      }
      return Ue != null && ks(Ue, null, J, U), ue;
    },
    P = (L, U, ye, J, X, Se) => {
      Se = Se || !!U.dynamicChildren;
      const { type: f, props: ve, patchFlag: C, shapeFlag: Ue, dirs: We } = U,
        Le = (f === "input" && We) || f === "option";
      if (Le || C !== -1) {
        if ((We && Mn(U, null, ye, "created"), ve))
          if (Le || !Se || C & 48)
            for (const ue in ve)
              ((Le && ue.endsWith("value")) || (zr(ue) && !Sr(ue))) &&
                r(L, ue, null, ve[ue], !1, void 0, ye);
          else ve.onClick && r(L, "onClick", null, ve.onClick, !1, void 0, ye);
        let Ee;
        if (
          ((Ee = ve && ve.onVnodeBeforeMount) && pn(Ee, ye, U),
          We && Mn(U, null, ye, "beforeMount"),
          ((Ee = ve && ve.onVnodeMounted) || We) &&
            Nu(() => {
              Ee && pn(Ee, ye, U), We && Mn(U, null, ye, "mounted");
            }, J),
          Ue & 16 && !(ve && (ve.innerHTML || ve.textContent)))
        ) {
          let ue = H(L.firstChild, U, L, ye, J, X, Se);
          for (; ue; ) {
            ti = !0;
            const vt = ue;
            (ue = ue.nextSibling), g(vt);
          }
        } else
          Ue & 8 &&
            L.textContent !== U.children &&
            ((ti = !0), (L.textContent = U.children));
      }
      return L.nextSibling;
    },
    H = (L, U, ye, J, X, Se, f) => {
      f = f || !!U.dynamicChildren;
      const ve = U.children,
        C = ve.length;
      for (let Ue = 0; Ue < C; Ue++) {
        const We = f ? ve[Ue] : (ve[Ue] = gn(ve[Ue]));
        if (L) L = A(L, We, J, X, Se, f);
        else {
          if (We.type === Xi && !We.children) continue;
          (ti = !0), n(null, We, ye, null, J, X, us(ye), Se);
        }
      }
      return L;
    },
    $ = (L, U, ye, J, X, Se) => {
      const { slotScopeIds: f } = U;
      f && (X = X ? X.concat(f) : f);
      const ve = p(L),
        C = H(l(L), U, ve, ye, J, X, Se);
      return C && fs(C) && C.data === "]"
        ? l((U.anchor = C))
        : ((ti = !0), y((U.anchor = T("]")), ve, C), C);
    },
    K = (L, U, ye, J, X, Se) => {
      if (((ti = !0), (U.el = null), Se)) {
        const C = de(L);
        for (;;) {
          const Ue = l(L);
          if (Ue && Ue !== C) g(Ue);
          else break;
        }
      }
      const f = l(L),
        ve = p(L);
      return g(L), n(null, U, ve, f, ye, J, us(ve), X), f;
    },
    de = (L) => {
      let U = 0;
      for (; L; )
        if (
          ((L = l(L)), L && fs(L) && (L.data === "[" && U++, L.data === "]"))
        ) {
          if (U === 0) return l(L);
          U--;
        }
      return L;
    };
  return [w, A];
}
const Zt = Nu;
function mp(e) {
  return Ku(e);
}
function yp(e) {
  return Ku(e, gp);
}
function Ku(e, t) {
  const n = Yo();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: o,
      patchProp: l,
      createElement: p,
      createText: g,
      createComment: y,
      setText: T,
      setElementText: w,
      parentNode: A,
      nextSibling: P,
      setScopeId: H = Cn,
      insertStaticContent: $,
    } = e,
    K = (
      I,
      M,
      D,
      G = null,
      ne = null,
      z = null,
      be = !1,
      fe = null,
      le = !!M.dynamicChildren
    ) => {
      if (I === M) return;
      I && !ai(I, M) && ((G = te(I)), ft(I, ne, z, !0), (I = null)),
        M.patchFlag === -2 && ((le = !1), (M.dynamicChildren = null));
      const { type: se, ref: ke, shapeFlag: Ae } = M;
      switch (se) {
        case Xi:
          de(I, M, D, G);
          break;
        case Hn:
          L(I, M, D, G);
          break;
        case ms:
          I == null && U(M, D, G, be);
          break;
        case an:
          Le(I, M, D, G, ne, z, be, fe, le);
          break;
        default:
          Ae & 1
            ? X(I, M, D, G, ne, z, be, fe, le)
            : Ae & 6
            ? Ee(I, M, D, G, ne, z, be, fe, le)
            : (Ae & 64 || Ae & 128) &&
              se.process(I, M, D, G, ne, z, be, fe, le, ge);
      }
      ke != null && ne && ks(ke, I && I.ref, z, M || I, !M);
    },
    de = (I, M, D, G) => {
      if (I == null) r((M.el = g(M.children)), D, G);
      else {
        const ne = (M.el = I.el);
        M.children !== I.children && T(ne, M.children);
      }
    },
    L = (I, M, D, G) => {
      I == null ? r((M.el = y(M.children || "")), D, G) : (M.el = I.el);
    },
    U = (I, M, D, G) => {
      [I.el, I.anchor] = $(I.children, M, D, G, I.el, I.anchor);
    },
    ye = ({ el: I, anchor: M }, D, G) => {
      let ne;
      for (; I && I !== M; ) (ne = P(I)), r(I, D, G), (I = ne);
      r(M, D, G);
    },
    J = ({ el: I, anchor: M }) => {
      let D;
      for (; I && I !== M; ) (D = P(I)), o(I), (I = D);
      o(M);
    },
    X = (I, M, D, G, ne, z, be, fe, le) => {
      (be = be || M.type === "svg"),
        I == null ? Se(M, D, G, ne, z, be, fe, le) : C(I, M, ne, z, be, fe, le);
    },
    Se = (I, M, D, G, ne, z, be, fe) => {
      let le, se;
      const {
        type: ke,
        props: Ae,
        shapeFlag: Pe,
        transition: re,
        dirs: Ie,
      } = I;
      if (
        ((le = I.el = p(I.type, z, Ae && Ae.is, Ae)),
        Pe & 8
          ? w(le, I.children)
          : Pe & 16 &&
            ve(
              I.children,
              le,
              null,
              G,
              ne,
              z && ke !== "foreignObject",
              be,
              fe
            ),
        Ie && Mn(I, null, G, "created"),
        f(le, I, I.scopeId, be, G),
        Ae)
      ) {
        for (const Je in Ae)
          Je !== "value" &&
            !Sr(Je) &&
            l(le, Je, null, Ae[Je], z, I.children, G, ne, dt);
        "value" in Ae && l(le, "value", null, Ae.value),
          (se = Ae.onVnodeBeforeMount) && pn(se, G, I);
      }
      Ie && Mn(I, null, G, "beforeMount");
      const ot = (!ne || (ne && !ne.pendingBranch)) && re && !re.persisted;
      ot && re.beforeEnter(le),
        r(le, M, D),
        ((se = Ae && Ae.onVnodeMounted) || ot || Ie) &&
          Zt(() => {
            se && pn(se, G, I),
              ot && re.enter(le),
              Ie && Mn(I, null, G, "mounted");
          }, ne);
    },
    f = (I, M, D, G, ne) => {
      if ((D && H(I, D), G)) for (let z = 0; z < G.length; z++) H(I, G[z]);
      if (ne) {
        let z = ne.subTree;
        if (M === z) {
          const be = ne.vnode;
          f(I, be, be.scopeId, be.slotScopeIds, ne.parent);
        }
      }
    },
    ve = (I, M, D, G, ne, z, be, fe, le = 0) => {
      for (let se = le; se < I.length; se++) {
        const ke = (I[se] = fe ? ii(I[se]) : gn(I[se]));
        K(null, ke, M, D, G, ne, z, be, fe);
      }
    },
    C = (I, M, D, G, ne, z, be) => {
      const fe = (M.el = I.el);
      let { patchFlag: le, dynamicChildren: se, dirs: ke } = M;
      le |= I.patchFlag & 16;
      const Ae = I.props || xt,
        Pe = M.props || xt;
      let re;
      D && xi(D, !1),
        (re = Pe.onVnodeBeforeUpdate) && pn(re, D, M, I),
        ke && Mn(M, I, D, "beforeUpdate"),
        D && xi(D, !0);
      const Ie = ne && M.type !== "foreignObject";
      if (
        (se
          ? Ue(I.dynamicChildren, se, fe, D, G, Ie, z)
          : be || Qe(I, M, fe, null, D, G, Ie, z, !1),
        le > 0)
      ) {
        if (le & 16) We(fe, M, Ae, Pe, D, G, ne);
        else if (
          (le & 2 &&
            Ae.class !== Pe.class &&
            l(fe, "class", null, Pe.class, ne),
          le & 4 && l(fe, "style", Ae.style, Pe.style, ne),
          le & 8)
        ) {
          const ot = M.dynamicProps;
          for (let Je = 0; Je < ot.length; Je++) {
            const mt = ot[Je],
              Tt = Ae[mt],
              nn = Pe[mt];
            (nn !== Tt || mt === "value") &&
              l(fe, mt, Tt, nn, ne, I.children, D, G, dt);
          }
        }
        le & 1 && I.children !== M.children && w(fe, M.children);
      } else !be && se == null && We(fe, M, Ae, Pe, D, G, ne);
      ((re = Pe.onVnodeUpdated) || ke) &&
        Zt(() => {
          re && pn(re, D, M, I), ke && Mn(M, I, D, "updated");
        }, G);
    },
    Ue = (I, M, D, G, ne, z, be) => {
      for (let fe = 0; fe < M.length; fe++) {
        const le = I[fe],
          se = M[fe],
          ke =
            le.el && (le.type === an || !ai(le, se) || le.shapeFlag & 70)
              ? A(le.el)
              : D;
        K(le, se, ke, null, G, ne, z, be, !0);
      }
    },
    We = (I, M, D, G, ne, z, be) => {
      if (D !== G) {
        if (D !== xt)
          for (const fe in D)
            !Sr(fe) &&
              !(fe in G) &&
              l(I, fe, D[fe], null, be, M.children, ne, z, dt);
        for (const fe in G) {
          if (Sr(fe)) continue;
          const le = G[fe],
            se = D[fe];
          le !== se &&
            fe !== "value" &&
            l(I, fe, se, le, be, M.children, ne, z, dt);
        }
        "value" in G && l(I, "value", D.value, G.value);
      }
    },
    Le = (I, M, D, G, ne, z, be, fe, le) => {
      const se = (M.el = I ? I.el : g("")),
        ke = (M.anchor = I ? I.anchor : g(""));
      let { patchFlag: Ae, dynamicChildren: Pe, slotScopeIds: re } = M;
      re && (fe = fe ? fe.concat(re) : re),
        I == null
          ? (r(se, D, G), r(ke, D, G), ve(M.children, D, ke, ne, z, be, fe, le))
          : Ae > 0 && Ae & 64 && Pe && I.dynamicChildren
          ? (Ue(I.dynamicChildren, Pe, D, ne, z, be, fe),
            (M.key != null || (ne && M === ne.subTree)) && Qu(I, M, !0))
          : Qe(I, M, D, ke, ne, z, be, fe, le);
    },
    Ee = (I, M, D, G, ne, z, be, fe, le) => {
      (M.slotScopeIds = fe),
        I == null
          ? M.shapeFlag & 512
            ? ne.ctx.activate(M, D, G, be, le)
            : ue(M, D, G, ne, z, be, le)
          : vt(I, M, le);
    },
    ue = (I, M, D, G, ne, z, be) => {
      const fe = (I.component = Ep(I, G, ne));
      if ((ja(I) && (fe.ctx.renderer = ge), Ap(fe), fe.asyncDep)) {
        if ((ne && ne.registerDep(fe, ze), !I.el)) {
          const le = (fe.subTree = Pt(Hn));
          L(null, le, M, D);
        }
        return;
      }
      ze(fe, I, M, D, ne, z, be);
    },
    vt = (I, M, D) => {
      const G = (M.component = I.component);
      if (Md(I, M, D))
        if (G.asyncDep && !G.asyncResolved) {
          ae(G, M, D);
          return;
        } else (G.next = M), Sd(G.update), G.update();
      else (M.el = I.el), (G.vnode = M);
    },
    ze = (I, M, D, G, ne, z, be) => {
      const fe = () => {
          if (I.isMounted) {
            let { next: ke, bu: Ae, u: Pe, parent: re, vnode: Ie } = I,
              ot = ke,
              Je;
            xi(I, !1),
              ke ? ((ke.el = Ie.el), ae(I, ke, be)) : (ke = Ie),
              Ae && xo(Ae),
              (Je = ke.props && ke.props.onVnodeBeforeUpdate) &&
                pn(Je, re, ke, Ie),
              xi(I, !0);
            const mt = To(I),
              Tt = I.subTree;
            (I.subTree = mt),
              K(Tt, mt, A(Tt.el), te(Tt), I, ne, z),
              (ke.el = mt.el),
              ot === null && Oa(I, mt.el),
              Pe && Zt(Pe, ne),
              (Je = ke.props && ke.props.onVnodeUpdated) &&
                Zt(() => pn(Je, re, ke, Ie), ne);
          } else {
            let ke;
            const { el: Ae, props: Pe } = M,
              { bm: re, m: Ie, parent: ot } = I,
              Je = Pr(M);
            if (
              (xi(I, !1),
              re && xo(re),
              !Je && (ke = Pe && Pe.onVnodeBeforeMount) && pn(ke, ot, M),
              xi(I, !0),
              Ae && Oe)
            ) {
              const mt = () => {
                (I.subTree = To(I)), Oe(Ae, I.subTree, I, ne, null);
              };
              Je
                ? M.type.__asyncLoader().then(() => !I.isUnmounted && mt())
                : mt();
            } else {
              const mt = (I.subTree = To(I));
              K(null, mt, D, G, I, ne, z), (M.el = mt.el);
            }
            if ((Ie && Zt(Ie, ne), !Je && (ke = Pe && Pe.onVnodeMounted))) {
              const mt = M;
              Zt(() => pn(ke, ot, mt), ne);
            }
            (M.shapeFlag & 256 ||
              (ot && Pr(ot.vnode) && ot.vnode.shapeFlag & 256)) &&
              I.a &&
              Zt(I.a, ne),
              (I.isMounted = !0),
              (M = D = G = null);
          }
        },
        le = (I.effect = new Ca(fe, () => Us(se), I.scope)),
        se = (I.update = () => le.run());
      (se.id = I.uid), xi(I, !0), se();
    },
    ae = (I, M, D) => {
      M.component = I;
      const G = I.vnode.props;
      (I.vnode = M),
        (I.next = null),
        fp(I, M.props, G, D),
        pp(I, M.children, D),
        lr(),
        Cl(),
        cr();
    },
    Qe = (I, M, D, G, ne, z, be, fe, le = !1) => {
      const se = I && I.children,
        ke = I ? I.shapeFlag : 0,
        Ae = M.children,
        { patchFlag: Pe, shapeFlag: re } = M;
      if (Pe > 0) {
        if (Pe & 128) {
          Ut(se, Ae, D, G, ne, z, be, fe, le);
          return;
        } else if (Pe & 256) {
          ht(se, Ae, D, G, ne, z, be, fe, le);
          return;
        }
      }
      re & 8
        ? (ke & 16 && dt(se, ne, z), Ae !== se && w(D, Ae))
        : ke & 16
        ? re & 16
          ? Ut(se, Ae, D, G, ne, z, be, fe, le)
          : dt(se, ne, z, !0)
        : (ke & 8 && w(D, ""), re & 16 && ve(Ae, D, G, ne, z, be, fe, le));
    },
    ht = (I, M, D, G, ne, z, be, fe, le) => {
      (I = I || Yi), (M = M || Yi);
      const se = I.length,
        ke = M.length,
        Ae = Math.min(se, ke);
      let Pe;
      for (Pe = 0; Pe < Ae; Pe++) {
        const re = (M[Pe] = le ? ii(M[Pe]) : gn(M[Pe]));
        K(I[Pe], re, D, null, ne, z, be, fe, le);
      }
      se > ke ? dt(I, ne, z, !0, !1, Ae) : ve(M, D, G, ne, z, be, fe, le, Ae);
    },
    Ut = (I, M, D, G, ne, z, be, fe, le) => {
      let se = 0;
      const ke = M.length;
      let Ae = I.length - 1,
        Pe = ke - 1;
      for (; se <= Ae && se <= Pe; ) {
        const re = I[se],
          Ie = (M[se] = le ? ii(M[se]) : gn(M[se]));
        if (ai(re, Ie)) K(re, Ie, D, null, ne, z, be, fe, le);
        else break;
        se++;
      }
      for (; se <= Ae && se <= Pe; ) {
        const re = I[Ae],
          Ie = (M[Pe] = le ? ii(M[Pe]) : gn(M[Pe]));
        if (ai(re, Ie)) K(re, Ie, D, null, ne, z, be, fe, le);
        else break;
        Ae--, Pe--;
      }
      if (se > Ae) {
        if (se <= Pe) {
          const re = Pe + 1,
            Ie = re < ke ? M[re].el : G;
          for (; se <= Pe; )
            K(
              null,
              (M[se] = le ? ii(M[se]) : gn(M[se])),
              D,
              Ie,
              ne,
              z,
              be,
              fe,
              le
            ),
              se++;
        }
      } else if (se > Pe) for (; se <= Ae; ) ft(I[se], ne, z, !0), se++;
      else {
        const re = se,
          Ie = se,
          ot = new Map();
        for (se = Ie; se <= Pe; se++) {
          const Et = (M[se] = le ? ii(M[se]) : gn(M[se]));
          Et.key != null && ot.set(Et.key, se);
        }
        let Je,
          mt = 0;
        const Tt = Pe - Ie + 1;
        let nn = !1,
          Jt = 0;
        const jt = new Array(Tt);
        for (se = 0; se < Tt; se++) jt[se] = 0;
        for (se = re; se <= Ae; se++) {
          const Et = I[se];
          if (mt >= Tt) {
            ft(Et, ne, z, !0);
            continue;
          }
          let Vt;
          if (Et.key != null) Vt = ot.get(Et.key);
          else
            for (Je = Ie; Je <= Pe; Je++)
              if (jt[Je - Ie] === 0 && ai(Et, M[Je])) {
                Vt = Je;
                break;
              }
          Vt === void 0
            ? ft(Et, ne, z, !0)
            : ((jt[Vt - Ie] = se + 1),
              Vt >= Jt ? (Jt = Vt) : (nn = !0),
              K(Et, M[Vt], D, null, ne, z, be, fe, le),
              mt++);
        }
        const un = nn ? bp(jt) : Yi;
        for (Je = un.length - 1, se = Tt - 1; se >= 0; se--) {
          const Et = Ie + se,
            Vt = M[Et],
            pt = Et + 1 < ke ? M[Et + 1].el : G;
          jt[se] === 0
            ? K(null, Vt, D, pt, ne, z, be, fe, le)
            : nn && (Je < 0 || se !== un[Je] ? Mt(Vt, D, pt, 2) : Je--);
        }
      }
    },
    Mt = (I, M, D, G, ne = null) => {
      const {
        el: z,
        type: be,
        transition: fe,
        children: le,
        shapeFlag: se,
      } = I;
      if (se & 6) {
        Mt(I.component.subTree, M, D, G);
        return;
      }
      if (se & 128) {
        I.suspense.move(M, D, G);
        return;
      }
      if (se & 64) {
        be.move(I, M, D, ge);
        return;
      }
      if (be === an) {
        r(z, M, D);
        for (let Ae = 0; Ae < le.length; Ae++) Mt(le[Ae], M, D, G);
        r(I.anchor, M, D);
        return;
      }
      if (be === ms) {
        ye(I, M, D);
        return;
      }
      if (G !== 2 && se & 1 && fe)
        if (G === 0) fe.beforeEnter(z), r(z, M, D), Zt(() => fe.enter(z), ne);
        else {
          const { leave: Ae, delayLeave: Pe, afterLeave: re } = fe,
            Ie = () => r(z, M, D),
            ot = () => {
              Ae(z, () => {
                Ie(), re && re();
              });
            };
          Pe ? Pe(z, Ie, ot) : ot();
        }
      else r(z, M, D);
    },
    ft = (I, M, D, G = !1, ne = !1) => {
      const {
        type: z,
        props: be,
        ref: fe,
        children: le,
        dynamicChildren: se,
        shapeFlag: ke,
        patchFlag: Ae,
        dirs: Pe,
      } = I;
      if ((fe != null && ks(fe, null, D, I, !0), ke & 256)) {
        M.ctx.deactivate(I);
        return;
      }
      const re = ke & 1 && Pe,
        Ie = !Pr(I);
      let ot;
      if ((Ie && (ot = be && be.onVnodeBeforeUnmount) && pn(ot, M, I), ke & 6))
        vn(I.component, D, G);
      else {
        if (ke & 128) {
          I.suspense.unmount(D, G);
          return;
        }
        re && Mn(I, null, M, "beforeUnmount"),
          ke & 64
            ? I.type.remove(I, M, D, ne, ge, G)
            : se && (z !== an || (Ae > 0 && Ae & 64))
            ? dt(se, M, D, !1, !0)
            : ((z === an && Ae & 384) || (!ne && ke & 16)) && dt(le, M, D),
          G && Lt(I);
      }
      ((Ie && (ot = be && be.onVnodeUnmounted)) || re) &&
        Zt(() => {
          ot && pn(ot, M, I), re && Mn(I, null, M, "unmounted");
        }, D);
    },
    Lt = (I) => {
      const { type: M, el: D, anchor: G, transition: ne } = I;
      if (M === an) {
        Ve(D, G);
        return;
      }
      if (M === ms) {
        J(I);
        return;
      }
      const z = () => {
        o(D), ne && !ne.persisted && ne.afterLeave && ne.afterLeave();
      };
      if (I.shapeFlag & 1 && ne && !ne.persisted) {
        const { leave: be, delayLeave: fe } = ne,
          le = () => be(D, z);
        fe ? fe(I.el, z, le) : le();
      } else z();
    },
    Ve = (I, M) => {
      let D;
      for (; I !== M; ) (D = P(I)), o(I), (I = D);
      o(M);
    },
    vn = (I, M, D) => {
      const { bum: G, scope: ne, update: z, subTree: be, um: fe } = I;
      G && xo(G),
        ne.stop(),
        z && ((z.active = !1), ft(be, I, M, D)),
        fe && Zt(fe, M),
        Zt(() => {
          I.isUnmounted = !0;
        }, M),
        M &&
          M.pendingBranch &&
          !M.isUnmounted &&
          I.asyncDep &&
          !I.asyncResolved &&
          I.suspenseId === M.pendingId &&
          (M.deps--, M.deps === 0 && M.resolve());
    },
    dt = (I, M, D, G = !1, ne = !1, z = 0) => {
      for (let be = z; be < I.length; be++) ft(I[be], M, D, G, ne);
    },
    te = (I) =>
      I.shapeFlag & 6
        ? te(I.component.subTree)
        : I.shapeFlag & 128
        ? I.suspense.next()
        : P(I.anchor || I.el),
    he = (I, M, D) => {
      I == null
        ? M._vnode && ft(M._vnode, null, null, !0)
        : K(M._vnode || null, I, M, null, null, null, D),
        Cl(),
        Es(),
        (M._vnode = I);
    },
    ge = {
      p: K,
      um: ft,
      m: Mt,
      r: Lt,
      mt: ue,
      mc: ve,
      pc: Qe,
      pbc: Ue,
      n: te,
      o: e,
    };
  let Ce, Oe;
  return (
    t && ([Ce, Oe] = t(ge)), { render: he, hydrate: Ce, createApp: cp(he, Ce) }
  );
}
function xi({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Qu(e, t, n = !1) {
  const r = e.children,
    o = t.children;
  if (Fe(r) && Fe(o))
    for (let l = 0; l < r.length; l++) {
      const p = r[l];
      let g = o[l];
      g.shapeFlag & 1 &&
        !g.dynamicChildren &&
        ((g.patchFlag <= 0 || g.patchFlag === 32) &&
          ((g = o[l] = ii(o[l])), (g.el = p.el)),
        n || Qu(p, g)),
        g.type === Xi && (g.el = p.el);
    }
}
function bp(e) {
  const t = e.slice(),
    n = [0];
  let r, o, l, p, g;
  const y = e.length;
  for (r = 0; r < y; r++) {
    const T = e[r];
    if (T !== 0) {
      if (((o = n[n.length - 1]), e[o] < T)) {
        (t[r] = o), n.push(r);
        continue;
      }
      for (l = 0, p = n.length - 1; l < p; )
        (g = (l + p) >> 1), e[n[g]] < T ? (l = g + 1) : (p = g);
      T < e[n[l]] && (l > 0 && (t[r] = n[l - 1]), (n[l] = r));
    }
  }
  for (l = n.length, p = n[l - 1]; l-- > 0; ) (n[l] = p), (p = t[p]);
  return n;
}
const vp = (e) => e.__isTeleport,
  an = Symbol.for("v-fgt"),
  Xi = Symbol.for("v-txt"),
  Hn = Symbol.for("v-cmt"),
  ms = Symbol.for("v-stc"),
  Nr = [];
let mn = null;
function ln(e = !1) {
  Nr.push((mn = e ? null : []));
}
function Ju() {
  Nr.pop(), (mn = Nr[Nr.length - 1] || null);
}
let Zi = 1;
function Bl(e) {
  Zi += e;
}
function Gu(e) {
  return (
    (e.dynamicChildren = Zi > 0 ? mn || Yi : null),
    Ju(),
    Zi > 0 && mn && mn.push(e),
    e
  );
}
function kr(e, t, n, r, o, l) {
  return Gu(k(e, t, n, r, o, l, !0));
}
function oi(e, t, n, r, o) {
  return Gu(Pt(e, t, n, r, o, !0));
}
function Ss(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function ai(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ks = "__vInternal",
  Xu = ({ key: e }) => e ?? null,
  ys = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? At(e) || Dt(e) || qe(e)
        ? { i: cn, r: e, k: t, f: !!n }
        : e
      : null
  );
function k(
  e,
  t = null,
  n = null,
  r = 0,
  o = null,
  l = e === an ? 0 : 1,
  p = !1,
  g = !1
) {
  const y = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Xu(t),
    ref: t && ys(t),
    scopeId: zs,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: l,
    patchFlag: r,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: cn,
  };
  return (
    g
      ? (Fa(y, n), l & 128 && e.normalize(y))
      : n && (y.shapeFlag |= At(n) ? 8 : 16),
    Zi > 0 &&
      !p &&
      mn &&
      (y.patchFlag > 0 || l & 6) &&
      y.patchFlag !== 32 &&
      mn.push(y),
    y
  );
}
const Pt = wp;
function wp(e, t = null, n = null, r = 0, o = null, l = !1) {
  if (((!e || e === Du) && (e = Hn), Ss(e))) {
    const g = er(e, t, !0);
    return (
      n && Fa(g, n),
      Zi > 0 &&
        !l &&
        mn &&
        (g.shapeFlag & 6 ? (mn[mn.indexOf(e)] = g) : mn.push(g)),
      (g.patchFlag |= -2),
      g
    );
  }
  if ((Ip(e) && (e = e.__vccOpts), t)) {
    t = Zu(t);
    let { class: g, style: y } = t;
    g && !At(g) && (t.class = Vr(g)),
      bt(y) && (xu(y) && !Fe(y) && (y = Bt({}, y)), (t.style = Ai(y)));
  }
  const p = At(e) ? 1 : Ld(e) ? 128 : vp(e) ? 64 : bt(e) ? 4 : qe(e) ? 2 : 0;
  return k(e, t, n, r, o, p, l, !0);
}
function Zu(e) {
  return e ? (xu(e) || Ks in e ? Bt({}, e) : e) : null;
}
function er(e, t, n = !1) {
  const { props: r, ref: o, patchFlag: l, children: p } = e,
    g = t ? xp(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: g,
    key: g && Xu(g),
    ref:
      t && t.ref
        ? n && o
          ? Fe(o)
            ? o.concat(ys(t))
            : [o, ys(t)]
          : ys(t)
        : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: p,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== an ? (l === -1 ? 16 : l | 16) : l,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && er(e.ssContent),
    ssFallback: e.ssFallback && er(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function bn(e = " ", t = 0) {
  return Pt(Xi, null, e, t);
}
function i1(e = "", t = !1) {
  return t ? (ln(), oi(Hn, null, e)) : Pt(Hn, null, e);
}
function gn(e) {
  return e == null || typeof e == "boolean"
    ? Pt(Hn)
    : Fe(e)
    ? Pt(an, null, e.slice())
    : typeof e == "object"
    ? ii(e)
    : Pt(Xi, null, String(e));
}
function ii(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : er(e);
}
function Fa(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (Fe(t)) n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Fa(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !(Ks in t)
        ? (t._ctx = cn)
        : o === 3 &&
          cn &&
          (cn.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    qe(t)
      ? ((t = { default: t, _ctx: cn }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [bn(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function xp(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = Vr([t.class, r.class]));
      else if (o === "style") t.style = Ai([t.style, r.style]);
      else if (zr(o)) {
        const l = t[o],
          p = r[o];
        p &&
          l !== p &&
          !(Fe(l) && l.includes(p)) &&
          (t[o] = l ? [].concat(l, p) : p);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function pn(e, t, n, r = null) {
  An(e, t, 7, [n, r]);
}
const Tp = $u();
let _p = 0;
function Ep(e, t, n) {
  const r = e.type,
    o = (t ? t.appContext : e.appContext) || Tp,
    l = {
      uid: _p++,
      vnode: e,
      type: r,
      parent: t,
      appContext: o,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new qh(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(o.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Wu(r, o),
      emitsOptions: Iu(r, o),
      emit: null,
      emitted: null,
      propsDefaults: xt,
      inheritAttrs: r.inheritAttrs,
      ctx: xt,
      data: xt,
      props: xt,
      attrs: xt,
      slots: xt,
      refs: xt,
      setupState: xt,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (l.ctx = { _: l }),
    (l.root = t ? t.root : l),
    (l.emit = Rd.bind(null, l)),
    e.ce && e.ce(l),
    l
  );
}
let Rt = null;
const Cp = () => Rt || cn;
let $a,
  $i,
  Fl = "__VUE_INSTANCE_SETTERS__";
($i = Yo()[Fl]) || ($i = Yo()[Fl] = []),
  $i.push((e) => (Rt = e)),
  ($a = (e) => {
    $i.length > 1 ? $i.forEach((t) => t(e)) : $i[0](e);
  });
const tr = (e) => {
    $a(e), e.scope.on();
  },
  Si = () => {
    Rt && Rt.scope.off(), $a(null);
  };
function ef(e) {
  return e.vnode.shapeFlag & 4;
}
let nr = !1;
function Ap(e, t = !1) {
  nr = t;
  const { props: n, children: r } = e.vnode,
    o = ef(e);
  up(e, n, o, t), dp(e, r);
  const l = o ? kp(e, t) : void 0;
  return (nr = !1), l;
}
function kp(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Tu(new Proxy(e.ctx, np)));
  const { setup: r } = n;
  if (r) {
    const o = (e.setupContext = r.length > 1 ? Pp(e) : null);
    tr(e), lr();
    const l = ui(r, e, 0, [e.props, o]);
    if ((cr(), Si(), su(l))) {
      if ((l.then(Si, Si), t))
        return l
          .then((p) => {
            na(e, p, t);
          })
          .catch((p) => {
            ur(p, e, 0);
          });
      e.asyncDep = l;
    } else na(e, l, t);
  } else tf(e, t);
}
function na(e, t, n) {
  qe(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : bt(t) && (e.setupState = Au(t)),
    tf(e, n);
}
let $l;
function tf(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && $l && !r.render) {
      const o = r.template || Da(e).template;
      if (o) {
        const { isCustomElement: l, compilerOptions: p } = e.appContext.config,
          { delimiters: g, compilerOptions: y } = r,
          T = Bt(Bt({ isCustomElement: l, delimiters: g }, p), y);
        r.render = $l(o, T);
      }
    }
    e.render = r.render || Cn;
  }
  tr(e), lr(), ip(e), cr(), Si();
}
function Sp(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return en(e, "get", "$attrs"), t[n];
      },
    }))
  );
}
function Pp(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Sp(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function qa(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Au(Tu(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in Rr) return Rr[n](e);
        },
        has(t, n) {
          return n in t || n in Rr;
        },
      }))
    );
}
function Rp(e, t = !0) {
  return qe(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Ip(e) {
  return qe(e) && "__vccOpts" in e;
}
const En = (e, t) => Cd(e, t, nr);
function nf(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? bt(t) && !Fe(t)
      ? Ss(t)
        ? Pt(e, null, [t])
        : Pt(e, t)
      : Pt(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && Ss(n) && (n = [n]),
      Pt(e, t, n));
}
const Np = Symbol.for("v-scx"),
  Op = () => yn(Np),
  rf = "3.3.4",
  Mp = "http://www.w3.org/2000/svg",
  Ci = typeof document < "u" ? document : null,
  ql = Ci && Ci.createElement("template"),
  Lp = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const o = t
        ? Ci.createElementNS(Mp, e)
        : Ci.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          r &&
          r.multiple != null &&
          o.setAttribute("multiple", r.multiple),
        o
      );
    },
    createText: (e) => Ci.createTextNode(e),
    createComment: (e) => Ci.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Ci.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, r, o, l) {
      const p = n ? n.previousSibling : t.lastChild;
      if (o && (o === l || o.nextSibling))
        for (
          ;
          t.insertBefore(o.cloneNode(!0), n),
            !(o === l || !(o = o.nextSibling));

        );
      else {
        ql.innerHTML = r ? `<svg>${e}</svg>` : e;
        const g = ql.content;
        if (r) {
          const y = g.firstChild;
          for (; y.firstChild; ) g.appendChild(y.firstChild);
          g.removeChild(y);
        }
        t.insertBefore(g, n);
      }
      return [
        p ? p.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function jp(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function Hp(e, t, n) {
  const r = e.style,
    o = At(n);
  if (n && !o) {
    if (t && !At(t)) for (const l in t) n[l] == null && ia(r, l, "");
    for (const l in n) ia(r, l, n[l]);
  } else {
    const l = r.display;
    o ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (r.display = l);
  }
}
const Ul = /\s*!important$/;
function ia(e, t, n) {
  if (Fe(n)) n.forEach((r) => ia(e, t, r));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const r = Dp(e, t);
    Ul.test(n)
      ? e.setProperty(ar(r), n.replace(Ul, ""), "important")
      : (e[r] = n);
  }
}
const Wl = ["Webkit", "Moz", "ms"],
  Co = {};
function Dp(e, t) {
  const n = Co[t];
  if (n) return n;
  let r = jn(t);
  if (r !== "filter" && r in e) return (Co[t] = r);
  r = Fs(r);
  for (let o = 0; o < Wl.length; o++) {
    const l = Wl[o] + r;
    if (l in e) return (Co[t] = l);
  }
  return t;
}
const zl = "http://www.w3.org/1999/xlink";
function Bp(e, t, n, r, o) {
  if (r && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(zl, t.slice(6, t.length))
      : e.setAttributeNS(zl, t, n);
  else {
    const l = $h(t);
    n == null || (l && !lu(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, l ? "" : n);
  }
}
function Fp(e, t, n, r, o, l, p) {
  if (t === "innerHTML" || t === "textContent") {
    r && p(r, o, l), (e[t] = n ?? "");
    return;
  }
  const g = e.tagName;
  if (t === "value" && g !== "PROGRESS" && !g.includes("-")) {
    e._value = n;
    const T = g === "OPTION" ? e.getAttribute("value") : e.value,
      w = n ?? "";
    T !== w && (e.value = w), n == null && e.removeAttribute(t);
    return;
  }
  let y = !1;
  if (n === "" || n == null) {
    const T = typeof e[t];
    T === "boolean"
      ? (n = lu(n))
      : n == null && T === "string"
      ? ((n = ""), (y = !0))
      : T === "number" && ((n = 0), (y = !0));
  }
  try {
    e[t] = n;
  } catch {}
  y && e.removeAttribute(t);
}
function $p(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function qp(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function Up(e, t, n, r, o = null) {
  const l = e._vei || (e._vei = {}),
    p = l[t];
  if (r && p) p.value = r;
  else {
    const [g, y] = Wp(t);
    if (r) {
      const T = (l[t] = Yp(r, o));
      $p(e, g, T, y);
    } else p && (qp(e, g, p, y), (l[t] = void 0));
  }
}
const Vl = /(?:Once|Passive|Capture)$/;
function Wp(e) {
  let t;
  if (Vl.test(e)) {
    t = {};
    let r;
    for (; (r = e.match(Vl)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : ar(e.slice(2)), t];
}
let Ao = 0;
const zp = Promise.resolve(),
  Vp = () => Ao || (zp.then(() => (Ao = 0)), (Ao = Date.now()));
function Yp(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    An(Kp(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = Vp()), n;
}
function Kp(e, t) {
  if (Fe(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((r) => (o) => !o._stopped && r && r(o))
    );
  } else return t;
}
const Yl = /^on[a-z]/,
  Qp = (e, t, n, r, o = !1, l, p, g, y) => {
    t === "class"
      ? jp(e, r, o)
      : t === "style"
      ? Hp(e, n, r)
      : zr(t)
      ? wa(t) || Up(e, t, n, r, p)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : Jp(e, t, r, o)
        )
      ? Fp(e, t, r, l, p, g, y)
      : (t === "true-value"
          ? (e._trueValue = r)
          : t === "false-value" && (e._falseValue = r),
        Bp(e, t, r, o));
  };
function Jp(e, t, n, r) {
  return r
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && Yl.test(t) && qe(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (Yl.test(t) && At(n))
    ? !1
    : t in e;
}
const sf = Bt({ patchProp: Qp }, Lp);
let Or,
  Kl = !1;
function Gp() {
  return Or || (Or = mp(sf));
}
function Xp() {
  return (Or = Kl ? Or : yp(sf)), (Kl = !0), Or;
}
const Zp = (...e) => {
    const t = Gp().createApp(...e),
      { mount: n } = t;
    return (
      (t.mount = (r) => {
        const o = of(r);
        if (!o) return;
        const l = t._component;
        !qe(l) && !l.render && !l.template && (l.template = o.innerHTML),
          (o.innerHTML = "");
        const p = n(o, !1, o instanceof SVGElement);
        return (
          o instanceof Element &&
            (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")),
          p
        );
      }),
      t
    );
  },
  eg = (...e) => {
    const t = Xp().createApp(...e),
      { mount: n } = t;
    return (
      (t.mount = (r) => {
        const o = of(r);
        if (o) return n(o, !0, o instanceof SVGElement);
      }),
      t
    );
  };
function of(e) {
  return At(e) ? document.querySelector(e) : e;
}
const tg =
    /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
  ng =
    /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
  ig = /^\s*["[{]|^\s*-?\d[\d.]{0,14}\s*$/;
function rg(e, t) {
  if (
    e === "__proto__" ||
    (e === "constructor" && t && typeof t == "object" && "prototype" in t)
  ) {
    sg(e);
    return;
  }
  return t;
}
function sg(e) {
  console.warn(`[destr] Dropping "${e}" key to prevent prototype pollution.`);
}
function Ps(e, t = {}) {
  if (typeof e != "string") return e;
  const n = e.trim();
  if (e[0] === '"' && e[e.length - 1] === '"') return n.slice(1, -1);
  if (n.length <= 9) {
    const r = n.toLowerCase();
    if (r === "true") return !0;
    if (r === "false") return !1;
    if (r === "undefined") return;
    if (r === "null") return null;
    if (r === "nan") return Number.NaN;
    if (r === "infinity") return Number.POSITIVE_INFINITY;
    if (r === "-infinity") return Number.NEGATIVE_INFINITY;
  }
  if (!ig.test(e)) {
    if (t.strict) throw new SyntaxError("[destr] Invalid JSON");
    return e;
  }
  try {
    if (tg.test(e) || ng.test(e)) {
      if (t.strict) throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(e, rg);
    }
    return JSON.parse(e);
  } catch (r) {
    if (t.strict) throw r;
    return e;
  }
}
const og = /#/g,
  ag = /&/g,
  lg = /=/g,
  Ua = /\+/g,
  cg = /%5e/gi,
  ug = /%60/gi,
  fg = /%7c/gi,
  hg = /%20/gi;
function dg(e) {
  return encodeURI("" + e).replace(fg, "|");
}
function ra(e) {
  return dg(typeof e == "string" ? e : JSON.stringify(e))
    .replace(Ua, "%2B")
    .replace(hg, "+")
    .replace(og, "%23")
    .replace(ag, "%26")
    .replace(ug, "`")
    .replace(cg, "^");
}
function ko(e) {
  return ra(e).replace(lg, "%3D");
}
function Rs(e = "") {
  try {
    return decodeURIComponent("" + e);
  } catch {
    return "" + e;
  }
}
function pg(e) {
  return Rs(e.replace(Ua, " "));
}
function gg(e) {
  return Rs(e.replace(Ua, " "));
}
function mg(e = "") {
  const t = {};
  e[0] === "?" && (e = e.slice(1));
  for (const n of e.split("&")) {
    const r = n.match(/([^=]+)=?(.*)/) || [];
    if (r.length < 2) continue;
    const o = pg(r[1]);
    if (o === "__proto__" || o === "constructor") continue;
    const l = gg(r[2] || "");
    t[o] === void 0
      ? (t[o] = l)
      : Array.isArray(t[o])
      ? t[o].push(l)
      : (t[o] = [t[o], l]);
  }
  return t;
}
function yg(e, t) {
  return (
    (typeof t == "number" || typeof t == "boolean") && (t = String(t)),
    t
      ? Array.isArray(t)
        ? t.map((n) => `${ko(e)}=${ra(n)}`).join("&")
        : `${ko(e)}=${ra(t)}`
      : ko(e)
  );
}
function bg(e) {
  return Object.keys(e)
    .filter((t) => e[t] !== void 0)
    .map((t) => yg(t, e[t]))
    .filter(Boolean)
    .join("&");
}
const vg = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/,
  wg = /^[\s\w\0+.-]{2,}:([/\\]{2})?/,
  xg = /^([/\\]\s*){2,}[^/\\]/;
function Kr(e, t = {}) {
  return (
    typeof t == "boolean" && (t = { acceptRelative: t }),
    t.strict ? vg.test(e) : wg.test(e) || (t.acceptRelative ? xg.test(e) : !1)
  );
}
const Tg = /^[\s\0]*(blob|data|javascript|vbscript):$/;
function _g(e) {
  return !!e && Tg.test(e);
}
const Eg = /\/$|\/\?/;
function sa(e = "", t = !1) {
  return t ? Eg.test(e) : e.endsWith("/");
}
function af(e = "", t = !1) {
  if (!t) return (sa(e) ? e.slice(0, -1) : e) || "/";
  if (!sa(e, !0)) return e || "/";
  const [n, ...r] = e.split("?");
  return (n.slice(0, -1) || "/") + (r.length > 0 ? `?${r.join("?")}` : "");
}
function oa(e = "", t = !1) {
  if (!t) return e.endsWith("/") ? e : e + "/";
  if (sa(e, !0)) return e || "/";
  const [n, ...r] = e.split("?");
  return n + "/" + (r.length > 0 ? `?${r.join("?")}` : "");
}
function Cg(e = "") {
  return e.startsWith("/");
}
function Ql(e = "") {
  return Cg(e) ? e : "/" + e;
}
function Ag(e, t) {
  if (cf(t) || Kr(e)) return e;
  const n = af(t);
  return e.startsWith(n) ? e : Qr(n, e);
}
function Jl(e, t) {
  if (cf(t)) return e;
  const n = af(t);
  if (!e.startsWith(n)) return e;
  const r = e.slice(n.length);
  return r[0] === "/" ? r : "/" + r;
}
function lf(e, t) {
  const n = Qs(e),
    r = { ...mg(n.search), ...t };
  return (n.search = bg(r)), Rg(n);
}
function cf(e) {
  return !e || e === "/";
}
function kg(e) {
  return e && e !== "/";
}
const Sg = /^\.?\//;
function Qr(e, ...t) {
  let n = e || "";
  for (const r of t.filter((o) => kg(o)))
    if (n) {
      const o = r.replace(Sg, "");
      n = oa(n) + o;
    } else n = r;
  return n;
}
function Pg(e, t, n = {}) {
  return (
    n.trailingSlash || ((e = oa(e)), (t = oa(t))),
    n.leadingSlash || ((e = Ql(e)), (t = Ql(t))),
    n.encoding || ((e = Rs(e)), (t = Rs(t))),
    e === t
  );
}
function Qs(e = "", t) {
  const n = e.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/);
  if (n) {
    const [, A, P = ""] = n;
    return {
      protocol: A,
      pathname: P,
      href: A + P,
      auth: "",
      host: "",
      search: "",
      hash: "",
    };
  }
  if (!Kr(e, { acceptRelative: !0 })) return t ? Qs(t + e) : Gl(e);
  const [, r = "", o, l = ""] =
      e
        .replace(/\\/g, "/")
        .match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [],
    [, p = "", g = ""] = l.match(/([^#/?]*)(.*)?/) || [],
    { pathname: y, search: T, hash: w } = Gl(g.replace(/\/(?=[A-Za-z]:)/, ""));
  return {
    protocol: r,
    auth: o ? o.slice(0, Math.max(0, o.length - 1)) : "",
    host: p,
    pathname: y,
    search: T,
    hash: w,
  };
}
function Gl(e = "") {
  const [t = "", n = "", r = ""] = (
    e.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []
  ).splice(1);
  return { pathname: t, search: n, hash: r };
}
function Rg(e) {
  const t = e.pathname || "",
    n = e.search ? (e.search.startsWith("?") ? "" : "?") + e.search : "",
    r = e.hash || "",
    o = e.auth ? e.auth + "@" : "",
    l = e.host || "";
  return (e.protocol ? e.protocol + "//" : "") + o + l + t + n + r;
}
class Ig extends Error {
  constructor(t, n) {
    super(t, n),
      (this.name = "FetchError"),
      n != null && n.cause && !this.cause && (this.cause = n.cause);
  }
}
function Ng(e) {
  var y, T, w, A, P;
  const t =
      ((y = e.error) == null ? void 0 : y.message) ||
      ((T = e.error) == null ? void 0 : T.toString()) ||
      "",
    n =
      ((w = e.request) == null ? void 0 : w.method) ||
      ((A = e.options) == null ? void 0 : A.method) ||
      "GET",
    r = ((P = e.request) == null ? void 0 : P.url) || String(e.request) || "/",
    o = `[${n}] ${JSON.stringify(r)}`,
    l = e.response
      ? `${e.response.status} ${e.response.statusText}`
      : "<no response>",
    p = `${o}: ${l}${t ? ` ${t}` : ""}`,
    g = new Ig(p, e.error ? { cause: e.error } : void 0);
  for (const H of ["request", "options", "response"])
    Object.defineProperty(g, H, {
      get() {
        return e[H];
      },
    });
  for (const [H, $] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"],
  ])
    Object.defineProperty(g, H, {
      get() {
        return e.response && e.response[$];
      },
    });
  return g;
}
const Og = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
function Xl(e = "GET") {
  return Og.has(e.toUpperCase());
}
function Mg(e) {
  if (e === void 0) return !1;
  const t = typeof e;
  return t === "string" || t === "number" || t === "boolean" || t === null
    ? !0
    : t !== "object"
    ? !1
    : Array.isArray(e)
    ? !0
    : e.buffer
    ? !1
    : (e.constructor && e.constructor.name === "Object") ||
      typeof e.toJSON == "function";
}
const Lg = new Set([
    "image/svg",
    "application/xml",
    "application/xhtml",
    "application/html",
  ]),
  jg = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function Hg(e = "") {
  if (!e) return "json";
  const t = e.split(";").shift() || "";
  return jg.test(t)
    ? "json"
    : Lg.has(t) || t.startsWith("text/")
    ? "text"
    : "blob";
}
function Dg(e, t, n = globalThis.Headers) {
  const r = { ...t, ...e };
  if (
    (t != null &&
      t.params &&
      e != null &&
      e.params &&
      (r.params = {
        ...(t == null ? void 0 : t.params),
        ...(e == null ? void 0 : e.params),
      }),
    t != null &&
      t.query &&
      e != null &&
      e.query &&
      (r.query = {
        ...(t == null ? void 0 : t.query),
        ...(e == null ? void 0 : e.query),
      }),
    t != null && t.headers && e != null && e.headers)
  ) {
    r.headers = new n((t == null ? void 0 : t.headers) || {});
    for (const [o, l] of new n((e == null ? void 0 : e.headers) || {}))
      r.headers.set(o, l);
  }
  return r;
}
const Bg = new Set([408, 409, 425, 429, 500, 502, 503, 504]),
  Fg = new Set([101, 204, 205, 304]);
function uf(e = {}) {
  const {
    fetch: t = globalThis.fetch,
    Headers: n = globalThis.Headers,
    AbortController: r = globalThis.AbortController,
  } = e;
  async function o(g) {
    const y =
      (g.error && g.error.name === "AbortError" && !g.options.timeout) || !1;
    if (g.options.retry !== !1 && !y) {
      let w;
      typeof g.options.retry == "number"
        ? (w = g.options.retry)
        : (w = Xl(g.options.method) ? 0 : 1);
      const A = (g.response && g.response.status) || 500;
      if (
        w > 0 &&
        (Array.isArray(g.options.retryStatusCodes)
          ? g.options.retryStatusCodes.includes(A)
          : Bg.has(A))
      ) {
        const P = g.options.retryDelay || 0;
        return (
          P > 0 && (await new Promise((H) => setTimeout(H, P))),
          l(g.request, {
            ...g.options,
            retry: w - 1,
            timeout: g.options.timeout,
          })
        );
      }
    }
    const T = Ng(g);
    throw (Error.captureStackTrace && Error.captureStackTrace(T, l), T);
  }
  const l = async function (y, T = {}) {
      var P;
      const w = {
        request: y,
        options: Dg(T, e.defaults, n),
        response: void 0,
        error: void 0,
      };
      if (
        ((w.options.method =
          (P = w.options.method) == null ? void 0 : P.toUpperCase()),
        w.options.onRequest && (await w.options.onRequest(w)),
        typeof w.request == "string" &&
          (w.options.baseURL && (w.request = Ag(w.request, w.options.baseURL)),
          (w.options.query || w.options.params) &&
            (w.request = lf(w.request, {
              ...w.options.params,
              ...w.options.query,
            }))),
        w.options.body &&
          Xl(w.options.method) &&
          (Mg(w.options.body)
            ? ((w.options.body =
                typeof w.options.body == "string"
                  ? w.options.body
                  : JSON.stringify(w.options.body)),
              (w.options.headers = new n(w.options.headers || {})),
              w.options.headers.has("content-type") ||
                w.options.headers.set("content-type", "application/json"),
              w.options.headers.has("accept") ||
                w.options.headers.set("accept", "application/json"))
            : (("pipeTo" in w.options.body &&
                typeof w.options.body.pipeTo == "function") ||
                typeof w.options.body.pipe == "function") &&
              ("duplex" in w.options || (w.options.duplex = "half"))),
        !w.options.signal && w.options.timeout)
      ) {
        const H = new r();
        setTimeout(() => H.abort(), w.options.timeout),
          (w.options.signal = H.signal);
      }
      try {
        w.response = await t(w.request, w.options);
      } catch (H) {
        return (
          (w.error = H),
          w.options.onRequestError && (await w.options.onRequestError(w)),
          await o(w)
        );
      }
      if (
        w.response.body &&
        !Fg.has(w.response.status) &&
        w.options.method !== "HEAD"
      ) {
        const H =
          (w.options.parseResponse ? "json" : w.options.responseType) ||
          Hg(w.response.headers.get("content-type") || "");
        switch (H) {
          case "json": {
            const $ = await w.response.text(),
              K = w.options.parseResponse || Ps;
            w.response._data = K($);
            break;
          }
          case "stream": {
            w.response._data = w.response.body;
            break;
          }
          default:
            w.response._data = await w.response[H]();
        }
      }
      return (
        w.options.onResponse && (await w.options.onResponse(w)),
        !w.options.ignoreResponseError &&
        w.response.status >= 400 &&
        w.response.status < 600
          ? (w.options.onResponseError && (await w.options.onResponseError(w)),
            await o(w))
          : w.response
      );
    },
    p = async function (y, T) {
      return (await l(y, T))._data;
    };
  return (
    (p.raw = l),
    (p.native = (...g) => t(...g)),
    (p.create = (g = {}) => uf({ ...e, defaults: { ...e.defaults, ...g } })),
    p
  );
}
const Wa = (function () {
    if (typeof globalThis < "u") return globalThis;
    if (typeof self < "u") return self;
    if (typeof window < "u") return window;
    if (typeof global < "u") return global;
    throw new Error("unable to locate global object");
  })(),
  $g =
    Wa.fetch ||
    (() =>
      Promise.reject(new Error("[ofetch] global.fetch is not supported!"))),
  qg = Wa.Headers,
  Ug = Wa.AbortController,
  Wg = uf({ fetch: $g, Headers: qg, AbortController: Ug }),
  zg = Wg,
  Vg = () => {
    var e;
    return (
      ((e = window == null ? void 0 : window.__NUXT__) == null
        ? void 0
        : e.config) || {}
    );
  },
  Is = Vg().app,
  Yg = () => Is.baseURL,
  Kg = () => Is.buildAssetsDir,
  Qg = (...e) => Qr(ff(), Kg(), ...e),
  ff = (...e) => {
    const t = Is.cdnURL || Is.baseURL;
    return e.length ? Qr(t, ...e) : t;
  };
(globalThis.__buildAssetsURL = Qg), (globalThis.__publicAssetsURL = ff);
function aa(e, t = {}, n) {
  for (const r in e) {
    const o = e[r],
      l = n ? `${n}:${r}` : r;
    typeof o == "object" && o !== null
      ? aa(o, t, l)
      : typeof o == "function" && (t[l] = o);
  }
  return t;
}
const Jg = { run: (e) => e() },
  Gg = () => Jg,
  hf = typeof console.createTask < "u" ? console.createTask : Gg;
function Xg(e, t) {
  const n = t.shift(),
    r = hf(n);
  return e.reduce(
    (o, l) => o.then(() => r.run(() => l(...t))),
    Promise.resolve()
  );
}
function Zg(e, t) {
  const n = t.shift(),
    r = hf(n);
  return Promise.all(e.map((o) => r.run(() => o(...t))));
}
function So(e, t) {
  for (const n of [...e]) n(t);
}
class em {
  constructor() {
    (this._hooks = {}),
      (this._before = void 0),
      (this._after = void 0),
      (this._deprecatedMessages = void 0),
      (this._deprecatedHooks = {}),
      (this.hook = this.hook.bind(this)),
      (this.callHook = this.callHook.bind(this)),
      (this.callHookWith = this.callHookWith.bind(this));
  }
  hook(t, n, r = {}) {
    if (!t || typeof n != "function") return () => {};
    const o = t;
    let l;
    for (; this._deprecatedHooks[t]; )
      (l = this._deprecatedHooks[t]), (t = l.to);
    if (l && !r.allowDeprecated) {
      let p = l.message;
      p ||
        (p =
          `${o} hook has been deprecated` +
          (l.to ? `, please use ${l.to}` : "")),
        this._deprecatedMessages || (this._deprecatedMessages = new Set()),
        this._deprecatedMessages.has(p) ||
          (console.warn(p), this._deprecatedMessages.add(p));
    }
    if (!n.name)
      try {
        Object.defineProperty(n, "name", {
          get: () => "_" + t.replace(/\W+/g, "_") + "_hook_cb",
          configurable: !0,
        });
      } catch {}
    return (
      (this._hooks[t] = this._hooks[t] || []),
      this._hooks[t].push(n),
      () => {
        n && (this.removeHook(t, n), (n = void 0));
      }
    );
  }
  hookOnce(t, n) {
    let r,
      o = (...l) => (
        typeof r == "function" && r(), (r = void 0), (o = void 0), n(...l)
      );
    return (r = this.hook(t, o)), r;
  }
  removeHook(t, n) {
    if (this._hooks[t]) {
      const r = this._hooks[t].indexOf(n);
      r !== -1 && this._hooks[t].splice(r, 1),
        this._hooks[t].length === 0 && delete this._hooks[t];
    }
  }
  deprecateHook(t, n) {
    this._deprecatedHooks[t] = typeof n == "string" ? { to: n } : n;
    const r = this._hooks[t] || [];
    delete this._hooks[t];
    for (const o of r) this.hook(t, o);
  }
  deprecateHooks(t) {
    Object.assign(this._deprecatedHooks, t);
    for (const n in t) this.deprecateHook(n, t[n]);
  }
  addHooks(t) {
    const n = aa(t),
      r = Object.keys(n).map((o) => this.hook(o, n[o]));
    return () => {
      for (const o of r.splice(0, r.length)) o();
    };
  }
  removeHooks(t) {
    const n = aa(t);
    for (const r in n) this.removeHook(r, n[r]);
  }
  removeAllHooks() {
    for (const t in this._hooks) delete this._hooks[t];
  }
  callHook(t, ...n) {
    return n.unshift(t), this.callHookWith(Xg, t, ...n);
  }
  callHookParallel(t, ...n) {
    return n.unshift(t), this.callHookWith(Zg, t, ...n);
  }
  callHookWith(t, n, ...r) {
    const o =
      this._before || this._after ? { name: n, args: r, context: {} } : void 0;
    this._before && So(this._before, o);
    const l = t(n in this._hooks ? [...this._hooks[n]] : [], r);
    return l instanceof Promise
      ? l.finally(() => {
          this._after && o && So(this._after, o);
        })
      : (this._after && o && So(this._after, o), l);
  }
  beforeEach(t) {
    return (
      (this._before = this._before || []),
      this._before.push(t),
      () => {
        if (this._before !== void 0) {
          const n = this._before.indexOf(t);
          n !== -1 && this._before.splice(n, 1);
        }
      }
    );
  }
  afterEach(t) {
    return (
      (this._after = this._after || []),
      this._after.push(t),
      () => {
        if (this._after !== void 0) {
          const n = this._after.indexOf(t);
          n !== -1 && this._after.splice(n, 1);
        }
      }
    );
  }
}
function df() {
  return new em();
}
function tm(e = {}) {
  let t,
    n = !1;
  const r = (p) => {
    if (t && t !== p) throw new Error("Context conflict");
  };
  let o;
  if (e.asyncContext) {
    const p = e.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    p
      ? (o = new p())
      : console.warn("[unctx] `AsyncLocalStorage` is not provided.");
  }
  const l = () => {
    if (o && t === void 0) {
      const p = o.getStore();
      if (p !== void 0) return p;
    }
    return t;
  };
  return {
    use: () => {
      const p = l();
      if (p === void 0) throw new Error("Context is not available");
      return p;
    },
    tryUse: () => l(),
    set: (p, g) => {
      g || r(p), (t = p), (n = !0);
    },
    unset: () => {
      (t = void 0), (n = !1);
    },
    call: (p, g) => {
      r(p), (t = p);
      try {
        return o ? o.run(p, g) : g();
      } finally {
        n || (t = void 0);
      }
    },
    async callAsync(p, g) {
      t = p;
      const y = () => {
          t = p;
        },
        T = () => (t === p ? y : void 0);
      la.add(T);
      try {
        const w = o ? o.run(p, g) : g();
        return n || (t = void 0), await w;
      } finally {
        la.delete(T);
      }
    },
  };
}
function nm(e = {}) {
  const t = {};
  return {
    get(n, r = {}) {
      return t[n] || (t[n] = tm({ ...e, ...r })), t[n], t[n];
    },
  };
}
const Ns =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof global < "u"
      ? global
      : typeof window < "u"
      ? window
      : {},
  Zl = "__unctx__",
  im = Ns[Zl] || (Ns[Zl] = nm()),
  rm = (e, t = {}) => im.get(e, t),
  ec = "__unctx_async_handlers__",
  la = Ns[ec] || (Ns[ec] = new Set());
function Os(e) {
  const t = [];
  for (const o of la) {
    const l = o();
    l && t.push(l);
  }
  const n = () => {
    for (const o of t) o();
  };
  let r = e();
  return (
    r &&
      typeof r == "object" &&
      "catch" in r &&
      (r = r.catch((o) => {
        throw (n(), o);
      })),
    [r, n]
  );
}
const pf = rm("nuxt-app", { asyncContext: !1 }),
  sm = "__nuxt_plugin";
function om(e) {
  let t = 0;
  const n = {
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.7.4";
      },
      get vue() {
        return n.vueApp.version;
      },
    },
    payload: hi({
      data: {},
      state: {},
      _errors: {},
      ...(window.__NUXT__ ?? {}),
    }),
    static: { data: {} },
    runWithContext: (o) => cm(n, o),
    isHydrating: !0,
    deferHydration() {
      if (!n.isHydrating) return () => {};
      t++;
      let o = !1;
      return () => {
        if (!o && ((o = !0), t--, t === 0))
          return (n.isHydrating = !1), n.callHook("app:suspense:resolve");
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...e,
  };
  (n.hooks = df()),
    (n.hook = n.hooks.hook),
    (n.callHook = n.hooks.callHook),
    (n.provide = (o, l) => {
      const p = "$" + o;
      hs(n, p, l), hs(n.vueApp.config.globalProperties, p, l);
    }),
    hs(n.vueApp, "$nuxt", n),
    hs(n.vueApp.config.globalProperties, "$nuxt", n);
  {
    window.addEventListener("nuxt.preloadError", (l) => {
      n.callHook("app:chunkError", { error: l.payload });
    }),
      (window.useNuxtApp = window.useNuxtApp || It);
    const o = n.hook("app:error", (...l) => {
      console.error("[nuxt] error caught during app initialization", ...l);
    });
    n.hook("app:mounted", o);
  }
  const r = hi(n.payload.config);
  return n.provide("config", r), n;
}
async function am(e, t) {
  if ((t.hooks && e.hooks.addHooks(t.hooks), typeof t == "function")) {
    const { provide: n } = (await e.runWithContext(() => t(e))) || {};
    if (n && typeof n == "object") for (const r in n) e.provide(r, n[r]);
  }
}
async function lm(e, t) {
  const n = [],
    r = [];
  for (const o of t) {
    const l = am(e, o);
    o.parallel ? n.push(l.catch((p) => r.push(p))) : await l;
  }
  if ((await Promise.all(n), r.length)) throw r[0];
}
/*! @__NO_SIDE_EFFECTS__ */ function Ri(e) {
  return typeof e == "function"
    ? e
    : (delete e.name, Object.assign(e.setup || (() => {}), e, { [sm]: !0 }));
}
function cm(e, t, n) {
  const r = () => (n ? t(...n) : t());
  return pf.set(e), e.vueApp.runWithContext(r);
}
/*! @__NO_SIDE_EFFECTS__ */ function It() {
  var t;
  let e;
  if (
    (qu() && (e = (t = Cp()) == null ? void 0 : t.appContext.app.$nuxt),
    (e = e || pf.tryUse()),
    !e)
  )
    throw new Error("[nuxt] instance unavailable");
  return e;
}
/*! @__NO_SIDE_EFFECTS__ */ function za() {
  return It().$config;
}
function hs(e, t, n) {
  Object.defineProperty(e, t, { get: () => n });
}
const um = "modulepreload",
  fm = function (e, t) {
    return e[0] === "." ? new URL(e, t).href : e;
  },
  tc = {},
  hm = function (t, n, r) {
    if (!n || n.length === 0) return t();
    const o = document.getElementsByTagName("link");
    return Promise.all(
      n.map((l) => {
        if (((l = fm(l, r)), l in tc)) return;
        tc[l] = !0;
        const p = l.endsWith(".css"),
          g = p ? '[rel="stylesheet"]' : "";
        if (!!r)
          for (let w = o.length - 1; w >= 0; w--) {
            const A = o[w];
            if (A.href === l && (!p || A.rel === "stylesheet")) return;
          }
        else if (document.querySelector(`link[href="${l}"]${g}`)) return;
        const T = document.createElement("link");
        if (
          ((T.rel = p ? "stylesheet" : um),
          p || ((T.as = "script"), (T.crossOrigin = "")),
          (T.href = l),
          document.head.appendChild(T),
          p)
        )
          return new Promise((w, A) => {
            T.addEventListener("load", w),
              T.addEventListener("error", () =>
                A(new Error(`Unable to preload CSS for ${l}`))
              );
          });
      })
    )
      .then(() => t())
      .catch((l) => {
        const p = new Event("vite:preloadError", { cancelable: !0 });
        if (((p.payload = l), window.dispatchEvent(p), !p.defaultPrevented))
          throw l;
      });
  },
  Ms = (...e) =>
    hm(...e).catch((t) => {
      const n = new Event("nuxt.preloadError");
      throw ((n.payload = t), window.dispatchEvent(n), t);
    }),
  dm = -1,
  pm = -2,
  gm = -3,
  mm = -4,
  ym = -5,
  bm = -6;
function vm(e, t) {
  return wm(JSON.parse(e), t);
}
function wm(e, t) {
  if (typeof e == "number") return o(e, !0);
  if (!Array.isArray(e) || e.length === 0) throw new Error("Invalid input");
  const n = e,
    r = Array(n.length);
  function o(l, p = !1) {
    if (l === dm) return;
    if (l === gm) return NaN;
    if (l === mm) return 1 / 0;
    if (l === ym) return -1 / 0;
    if (l === bm) return -0;
    if (p) throw new Error("Invalid input");
    if (l in r) return r[l];
    const g = n[l];
    if (!g || typeof g != "object") r[l] = g;
    else if (Array.isArray(g))
      if (typeof g[0] == "string") {
        const y = g[0],
          T = t == null ? void 0 : t[y];
        if (T) return (r[l] = T(o(g[1])));
        switch (y) {
          case "Date":
            r[l] = new Date(g[1]);
            break;
          case "Set":
            const w = new Set();
            r[l] = w;
            for (let H = 1; H < g.length; H += 1) w.add(o(g[H]));
            break;
          case "Map":
            const A = new Map();
            r[l] = A;
            for (let H = 1; H < g.length; H += 2) A.set(o(g[H]), o(g[H + 1]));
            break;
          case "RegExp":
            r[l] = new RegExp(g[1], g[2]);
            break;
          case "Object":
            r[l] = Object(g[1]);
            break;
          case "BigInt":
            r[l] = BigInt(g[1]);
            break;
          case "null":
            const P = Object.create(null);
            r[l] = P;
            for (let H = 1; H < g.length; H += 2) P[g[H]] = o(g[H + 1]);
            break;
          default:
            throw new Error(`Unknown type ${y}`);
        }
      } else {
        const y = new Array(g.length);
        r[l] = y;
        for (let T = 0; T < g.length; T += 1) {
          const w = g[T];
          w !== pm && (y[T] = o(w));
        }
      }
    else {
      const y = {};
      r[l] = y;
      for (const T in g) {
        const w = g[T];
        y[T] = o(w);
      }
    }
    return r[l];
  }
  return o(0);
}
function xm(e) {
  return Array.isArray(e) ? e : [e];
}
const Tm = ["title", "titleTemplate", "script", "style", "noscript"],
  bs = ["base", "meta", "link", "style", "script", "noscript"],
  _m = [
    "title",
    "titleTemplate",
    "templateParams",
    "base",
    "htmlAttrs",
    "bodyAttrs",
    "meta",
    "link",
    "style",
    "script",
    "noscript",
  ],
  Em = [
    "base",
    "title",
    "titleTemplate",
    "bodyAttrs",
    "htmlAttrs",
    "templateParams",
  ],
  gf = [
    "tagPosition",
    "tagPriority",
    "tagDuplicateStrategy",
    "innerHTML",
    "textContent",
    "processTemplateParams",
  ],
  Cm = typeof window < "u";
function mf(e) {
  let t = 9;
  for (let n = 0; n < e.length; ) t = Math.imul(t ^ e.charCodeAt(n++), 9 ** 9);
  return ((t ^ (t >>> 9)) + 65536).toString(16).substring(1, 8).toLowerCase();
}
function nc(e) {
  return (
    e._h ||
    mf(
      e._d
        ? e._d
        : `${e.tag}:${e.textContent || e.innerHTML || ""}:${Object.entries(
            e.props
          )
            .map(([t, n]) => `${t}:${String(n)}`)
            .join(",")}`
    )
  );
}
function yf(e, t) {
  const { props: n, tag: r } = e;
  if (Em.includes(r)) return r;
  if (r === "link" && n.rel === "canonical") return "canonical";
  if (n.charset) return "charset";
  const o = ["id"];
  r === "meta" && o.push("name", "property", "http-equiv");
  for (const l of o)
    if (typeof n[l] < "u") {
      const p = String(n[l]);
      return t && !t(p) ? !1 : `${r}:${l}:${p}`;
    }
  return !1;
}
function ic(e, t) {
  return e == null ? t || null : typeof e == "function" ? e(t) : e;
}
async function Am(e, t, n) {
  const r = {
    tag: e,
    props: await bf(
      typeof t == "object" && typeof t != "function" && !(t instanceof Promise)
        ? { ...t }
        : {
            [["script", "noscript", "style"].includes(e)
              ? "innerHTML"
              : "textContent"]: t,
          },
      ["templateParams", "titleTemplate"].includes(e)
    ),
  };
  return (
    gf.forEach((o) => {
      const l = typeof r.props[o] < "u" ? r.props[o] : n[o];
      typeof l < "u" &&
        ((!["innerHTML", "textContent"].includes(o) || Tm.includes(r.tag)) &&
          (r[o] = l),
        delete r.props[o]);
    }),
    r.props.body && ((r.tagPosition = "bodyClose"), delete r.props.body),
    r.props.children &&
      ((r.innerHTML = r.props.children), delete r.props.children),
    r.tag === "script" &&
      (typeof r.innerHTML == "object" &&
        ((r.innerHTML = JSON.stringify(r.innerHTML)),
        (r.props.type = r.props.type || "application/json")),
      r.innerHTML &&
        ["application/ld+json", "application/json"].includes(r.props.type) &&
        (r.innerHTML = r.innerHTML.replace(/</g, "\\u003C"))),
    Array.isArray(r.props.content)
      ? r.props.content.map((o) => ({
          ...r,
          props: { ...r.props, content: o },
        }))
      : r
  );
}
function km(e) {
  return (
    typeof e == "object" &&
      !Array.isArray(e) &&
      (e = Object.keys(e).filter((t) => e[t])),
    (Array.isArray(e) ? e.join(" ") : e)
      .split(" ")
      .filter((t) => t.trim())
      .filter(Boolean)
      .join(" ")
  );
}
async function bf(e, t) {
  for (const n of Object.keys(e)) {
    if (n === "class") {
      e[n] = km(e[n]);
      continue;
    }
    if (
      (e[n] instanceof Promise && (e[n] = await e[n]), !t && !gf.includes(n))
    ) {
      const r = String(e[n]),
        o = n.startsWith("data-");
      r === "true" || r === ""
        ? (e[n] = o ? "true" : !0)
        : e[n] || (o && r === "false" ? (e[n] = "false") : delete e[n]);
    }
  }
  return e;
}
const Sm = 10;
async function Pm(e) {
  const t = [];
  return (
    Object.entries(e.resolvedInput)
      .filter(([n, r]) => typeof r < "u" && _m.includes(n))
      .forEach(([n, r]) => {
        const o = xm(r);
        t.push(...o.map((l) => Am(n, l, e)).flat());
      }),
    (await Promise.all(t))
      .flat()
      .filter(Boolean)
      .map(
        (n, r) => (
          (n._e = e._i), e.mode && (n._m = e.mode), (n._p = (e._i << Sm) + r), n
        )
      )
  );
}
const rc = { base: -10, title: 10 },
  sc = { critical: -80, high: -10, low: 20 };
function Ls(e) {
  let t = 100;
  const n = e.tagPriority;
  return typeof n == "number"
    ? n
    : (e.tag === "meta"
        ? (e.props["http-equiv"] === "content-security-policy" && (t = -30),
          e.props.charset && (t = -20),
          e.props.name === "viewport" && (t = -15))
        : e.tag === "link" && e.props.rel === "preconnect"
        ? (t = 20)
        : e.tag in rc && (t = rc[e.tag]),
      typeof n == "string" && n in sc ? t + sc[n] : t);
}
const Rm = [
    { prefix: "before:", offset: -1 },
    { prefix: "after:", offset: 1 },
  ],
  ni = "%separator";
function Ti(e, t, n) {
  if (typeof e != "string" || !e.includes("%")) return e;
  function r(p) {
    let g;
    return (
      ["s", "pageTitle"].includes(p)
        ? (g = t.pageTitle)
        : p.includes(".")
        ? (g = p.split(".").reduce((y, T) => (y && y[T]) || void 0, t))
        : (g = t[p]),
      typeof g < "u" ? (g || "").replace(/"/g, '\\"') : !1
    );
  }
  let o = e;
  try {
    o = decodeURI(e);
  } catch {}
  return (
    (o.match(/%(\w+\.+\w+)|%(\w+)/g) || [])
      .sort()
      .reverse()
      .forEach((p) => {
        const g = r(p.slice(1));
        typeof g == "string" &&
          (e = e
            .replace(new RegExp(`\\${p}(\\W|$)`, "g"), (y, T) => `${g}${T}`)
            .trim());
      }),
    e.includes(ni) &&
      (e.endsWith(ni) && (e = e.slice(0, -ni.length).trim()),
      e.startsWith(ni) && (e = e.slice(ni.length).trim()),
      (e = e.replace(new RegExp(`\\${ni}\\s*\\${ni}`, "g"), ni)),
      (e = Ti(e, { separator: n }, n))),
    e
  );
}
async function Im(e) {
  const t = {
    tag: e.tagName.toLowerCase(),
    props: await bf(
      e
        .getAttributeNames()
        .reduce((n, r) => ({ ...n, [r]: e.getAttribute(r) }), {})
    ),
    innerHTML: e.innerHTML,
  };
  return (t._d = yf(t)), t;
}
async function vf(e, t = {}) {
  var w;
  const n = t.document || e.resolvedOptions.document;
  if (!n) return;
  const r = { shouldRender: e.dirty, tags: [] };
  if ((await e.hooks.callHook("dom:beforeRender", r), !r.shouldRender)) return;
  const o = (await e.resolveTags()).map((A) => ({
    tag: A,
    id: bs.includes(A.tag) ? nc(A) : A.tag,
    shouldRender: !0,
  }));
  let l = e._dom;
  if (!l) {
    l = { elMap: { htmlAttrs: n.documentElement, bodyAttrs: n.body } };
    for (const A of ["body", "head"]) {
      const P = (w = n == null ? void 0 : n[A]) == null ? void 0 : w.children;
      for (const H of [...P].filter(($) =>
        bs.includes($.tagName.toLowerCase())
      ))
        l.elMap[H.getAttribute("data-hid") || nc(await Im(H))] = H;
    }
  }
  (l.pendingSideEffects = { ...(l.sideEffects || {}) }), (l.sideEffects = {});
  function p(A, P, H) {
    const $ = `${A}:${P}`;
    (l.sideEffects[$] = H), delete l.pendingSideEffects[$];
  }
  function g({ id: A, $el: P, tag: H }) {
    const $ = H.tag.endsWith("Attrs");
    (l.elMap[A] = P),
      $ ||
        (["textContent", "innerHTML"].forEach((K) => {
          H[K] && H[K] !== P[K] && (P[K] = H[K]);
        }),
        p(A, "el", () => {
          l.elMap[A].remove(), delete l.elMap[A];
        })),
      Object.entries(H.props).forEach(([K, de]) => {
        const L = `attr:${K}`;
        if (K === "class")
          for (const U of (de || "").split(" ").filter(Boolean))
            $ && p(A, `${L}:${U}`, () => P.classList.remove(U)),
              !P.classList.contains(U) && P.classList.add(U);
        else
          P.getAttribute(K) !== de &&
            P.setAttribute(K, de === !0 ? "" : String(de)),
            $ && p(A, L, () => P.removeAttribute(K));
      });
  }
  const y = [],
    T = { bodyClose: void 0, bodyOpen: void 0, head: void 0 };
  for (const A of o) {
    const { tag: P, shouldRender: H, id: $ } = A;
    if (H) {
      if (P.tag === "title") {
        n.title = P.textContent;
        continue;
      }
      (A.$el = A.$el || l.elMap[$]),
        A.$el ? g(A) : bs.includes(P.tag) && y.push(A);
    }
  }
  for (const A of y) {
    const P = A.tag.tagPosition || "head";
    (A.$el = n.createElement(A.tag.tag)),
      g(A),
      (T[P] = T[P] || n.createDocumentFragment()),
      T[P].appendChild(A.$el);
  }
  for (const A of o) await e.hooks.callHook("dom:renderTag", A, n, p);
  T.head && n.head.appendChild(T.head),
    T.bodyOpen && n.body.insertBefore(T.bodyOpen, n.body.firstChild),
    T.bodyClose && n.body.appendChild(T.bodyClose),
    Object.values(l.pendingSideEffects).forEach((A) => A()),
    (e._dom = l),
    (e.dirty = !1),
    await e.hooks.callHook("dom:rendered", { renders: o });
}
async function Nm(e, t = {}) {
  const n = t.delayFn || ((r) => setTimeout(r, 10));
  return (e._domUpdatePromise =
    e._domUpdatePromise ||
    new Promise((r) =>
      n(async () => {
        await vf(e, t), delete e._domUpdatePromise, r();
      })
    ));
}
function Om(e) {
  return (t) => {
    var r, o;
    const n =
      ((o =
        (r = t.resolvedOptions.document) == null
          ? void 0
          : r.head.querySelector('script[id="unhead:payload"]')) == null
        ? void 0
        : o.innerHTML) || !1;
    return (
      n && t.push(JSON.parse(n)),
      {
        mode: "client",
        hooks: {
          "entries:updated": function (l) {
            Nm(l, e);
          },
        },
      }
    );
  };
}
const Mm = ["templateParams", "htmlAttrs", "bodyAttrs"],
  Lm = {
    hooks: {
      "tag:normalise": function ({ tag: e }) {
        ["hid", "vmid", "key"].forEach((r) => {
          e.props[r] && ((e.key = e.props[r]), delete e.props[r]);
        });
        const n = yf(e) || (e.key ? `${e.tag}:${e.key}` : !1);
        n && (e._d = n);
      },
      "tags:resolve": function (e) {
        const t = {};
        e.tags.forEach((r) => {
          const o = (r.key ? `${r.tag}:${r.key}` : r._d) || r._p,
            l = t[o];
          if (l) {
            let g = r == null ? void 0 : r.tagDuplicateStrategy;
            if ((!g && Mm.includes(r.tag) && (g = "merge"), g === "merge")) {
              const y = l.props;
              ["class", "style"].forEach((T) => {
                r.props[T] &&
                  y[T] &&
                  (T === "style" && !y[T].endsWith(";") && (y[T] += ";"),
                  (r.props[T] = `${y[T]} ${r.props[T]}`));
              }),
                (t[o].props = { ...y, ...r.props });
              return;
            } else if (r._e === l._e) {
              (l._duped = l._duped || []),
                (r._d = `${l._d}:${l._duped.length + 1}`),
                l._duped.push(r);
              return;
            } else if (Ls(r) > Ls(l)) return;
          }
          const p =
            Object.keys(r.props).length +
            (r.innerHTML ? 1 : 0) +
            (r.textContent ? 1 : 0);
          if (bs.includes(r.tag) && p === 0) {
            delete t[o];
            return;
          }
          t[o] = r;
        });
        const n = [];
        Object.values(t).forEach((r) => {
          const o = r._duped;
          delete r._duped, n.push(r), o && n.push(...o);
        }),
          (e.tags = n),
          (e.tags = e.tags.filter(
            (r) =>
              !(
                r.tag === "meta" &&
                (r.props.name || r.props.property) &&
                !r.props.content
              )
          ));
      },
    },
  },
  jm = {
    mode: "server",
    hooks: {
      "tags:resolve": function (e) {
        const t = {};
        e.tags
          .filter(
            (n) =>
              ["titleTemplate", "templateParams", "title"].includes(n.tag) &&
              n._m === "server"
          )
          .forEach((n) => {
            t[n.tag] = n.tag.startsWith("title") ? n.textContent : n.props;
          }),
          Object.keys(t).length &&
            e.tags.push({
              tag: "script",
              innerHTML: JSON.stringify(t),
              props: { id: "unhead:payload", type: "application/json" },
            });
      },
    },
  },
  oc = ["script", "link", "bodyAttrs"];
function ac(e) {
  const t = {},
    n = {};
  return (
    Object.entries(e.props).forEach(([r, o]) => {
      r.startsWith("on") && typeof o == "function" ? (n[r] = o) : (t[r] = o);
    }),
    { props: t, eventHandlers: n }
  );
}
const Hm = {
    hooks: {
      "ssr:render": function (e) {
        e.tags = e.tags.map(
          (t) => (
            !oc.includes(t.tag) ||
              !Object.entries(t.props).find(
                ([n, r]) => n.startsWith("on") && typeof r == "function"
              ) ||
              (t.props = ac(t).props),
            t
          )
        );
      },
      "tags:resolve": function (e) {
        e.tags = e.tags.map((t) => {
          if (!oc.includes(t.tag)) return t;
          const { props: n, eventHandlers: r } = ac(t);
          return (
            Object.keys(r).length && ((t.props = n), (t._eventHandlers = r)), t
          );
        });
      },
      "dom:renderTag": function (e, t, n) {
        if (!e.tag._eventHandlers) return;
        const r = e.tag.tag === "bodyAttrs" ? t.defaultView : e.$el;
        Object.entries(e.tag._eventHandlers).forEach(([o, l]) => {
          const p = `${e.tag._d || e.tag._p}:${o}`,
            g = o.slice(2).toLowerCase(),
            y = `data-h-${g}`;
          if ((n(e.id, p, () => {}), e.$el.hasAttribute(y))) return;
          const T = l;
          e.$el.setAttribute(y, ""),
            r.addEventListener(g, T),
            e.entry &&
              n(e.id, p, () => {
                r.removeEventListener(g, T), e.$el.removeAttribute(y);
              });
        });
      },
    },
  },
  Dm = ["link", "style", "script", "noscript"],
  Bm = {
    hooks: {
      "tag:normalise": ({ tag: e }) => {
        e.key && Dm.includes(e.tag) && (e.props["data-hid"] = e._h = mf(e.key));
      },
    },
  },
  Fm = {
    hooks: {
      "tags:resolve": (e) => {
        const t = (n) => {
          var r;
          return (r = e.tags.find((o) => o._d === n)) == null ? void 0 : r._p;
        };
        for (const { prefix: n, offset: r } of Rm)
          for (const o of e.tags.filter(
            (l) =>
              typeof l.tagPriority == "string" && l.tagPriority.startsWith(n)
          )) {
            const l = t(o.tagPriority.replace(n, ""));
            typeof l < "u" && (o._p = l + r);
          }
        e.tags.sort((n, r) => n._p - r._p).sort((n, r) => Ls(n) - Ls(r));
      },
    },
  },
  $m = {
    hooks: {
      "tags:resolve": (e) => {
        var p;
        const { tags: t } = e,
          n =
            (p = t.find((g) => g.tag === "title")) == null
              ? void 0
              : p.textContent,
          r = t.findIndex((g) => g.tag === "templateParams"),
          o = r !== -1 ? t[r].props : {},
          l = o.separator || "|";
        delete o.separator, (o.pageTitle = Ti(o.pageTitle || n || "", o, l));
        for (const g of t)
          g.processTemplateParams !== !1 &&
            (["titleTemplate", "title"].includes(g.tag) &&
            typeof g.textContent == "string"
              ? (g.textContent = Ti(g.textContent, o, l))
              : g.tag === "meta" && typeof g.props.content == "string"
              ? (g.props.content = Ti(g.props.content, o, l))
              : g.tag === "link" && typeof g.props.href == "string"
              ? (g.props.href = Ti(g.props.href, o, l))
              : g.processTemplateParams === !0 &&
                (g.innerHTML
                  ? (g.innerHTML = Ti(g.innerHTML, o, l))
                  : g.textContent &&
                    (g.textContent = Ti(g.textContent, o, l))));
        e.tags = t.filter((g) => g.tag !== "templateParams");
      },
    },
  },
  qm = {
    hooks: {
      "tags:resolve": (e) => {
        const { tags: t } = e;
        let n = t.findIndex((o) => o.tag === "titleTemplate");
        const r = t.findIndex((o) => o.tag === "title");
        if (r !== -1 && n !== -1) {
          const o = ic(t[n].textContent, t[r].textContent);
          o !== null ? (t[r].textContent = o || t[r].textContent) : delete t[r];
        } else if (n !== -1) {
          const o = ic(t[n].textContent);
          o !== null &&
            ((t[n].textContent = o), (t[n].tag = "title"), (n = -1));
        }
        n !== -1 && delete t[n], (e.tags = t.filter(Boolean));
      },
    },
  };
let wf;
function Um(e = {}) {
  const t = Wm(e);
  return t.use(Om()), (wf = t);
}
function lc(e, t) {
  return !e || (e === "server" && t) || (e === "client" && !t);
}
function Wm(e = {}) {
  const t = df();
  t.addHooks(e.hooks || {}),
    (e.document = e.document || (Cm ? document : void 0));
  const n = !e.document;
  e.plugins = [
    Lm,
    jm,
    Hm,
    Bm,
    Fm,
    $m,
    qm,
    ...((e == null ? void 0 : e.plugins) || []),
  ];
  const r = () => {
    (p.dirty = !0), t.callHook("entries:updated", p);
  };
  let o = 0,
    l = [];
  const p = {
    dirty: !1,
    resolvedOptions: e,
    hooks: t,
    headEntries() {
      return l;
    },
    use(g) {
      const y = typeof g == "function" ? g(p) : g;
      lc(y.mode, n) && t.addHooks(y.hooks || {});
    },
    push(g, y) {
      y == null || delete y.head;
      const T = { _i: o++, input: g, ...y };
      return (
        lc(T.mode, n) && (l.push(T), r()),
        {
          dispose() {
            (l = l.filter((w) => w._i !== T._i)),
              t.callHook("entries:updated", p),
              r();
          },
          patch(w) {
            (l = l.map((A) => (A._i === T._i && (A.input = T.input = w), A))),
              r();
          },
        }
      );
    },
    async resolveTags() {
      const g = { tags: [], entries: [...l] };
      await t.callHook("entries:resolve", g);
      for (const y of g.entries) {
        const T = y.resolvedInput || y.input;
        if (
          ((y.resolvedInput = await (y.transform ? y.transform(T) : T)),
          y.resolvedInput)
        )
          for (const w of await Pm(y)) {
            const A = { tag: w, entry: y, resolvedOptions: p.resolvedOptions };
            await t.callHook("tag:normalise", A), g.tags.push(A.tag);
          }
      }
      return (
        await t.callHook("tags:beforeResolve", g),
        await t.callHook("tags:resolve", g),
        g.tags
      );
    },
    ssr: n,
  };
  return e.plugins.forEach((g) => p.use(g)), p.hooks.callHook("init", p), p;
}
function zm() {
  return wf;
}
const Vm = rf.startsWith("3");
function Ym(e) {
  return typeof e == "function" ? e() : _t(e);
}
function ca(e, t = "") {
  if (e instanceof Promise) return e;
  const n = Ym(e);
  return !e || !n
    ? n
    : Array.isArray(n)
    ? n.map((r) => ca(r, t))
    : typeof n == "object"
    ? Object.fromEntries(
        Object.entries(n).map(([r, o]) =>
          r === "titleTemplate" || r.startsWith("on")
            ? [r, _t(o)]
            : [r, ca(o, r)]
        )
      )
    : n;
}
const Km = {
    hooks: {
      "entries:resolve": function (e) {
        for (const t of e.entries) t.resolvedInput = ca(t.input);
      },
    },
  },
  xf = "usehead";
function Qm(e) {
  return {
    install(n) {
      Vm &&
        ((n.config.globalProperties.$unhead = e),
        (n.config.globalProperties.$head = e),
        n.provide(xf, e));
    },
  }.install;
}
function Jm(e = {}) {
  e.domDelayFn = e.domDelayFn || ((n) => Yr(() => setTimeout(() => n(), 0)));
  const t = Um(e);
  return t.use(Km), (t.install = Qm(t)), t;
}
const ua =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : typeof self < "u"
      ? self
      : {},
  fa = "__unhead_injection_handler__";
function Gm(e) {
  ua[fa] = e;
}
function r1() {
  if (fa in ua) return ua[fa]();
  const e = yn(xf);
  return e || zm();
}
function Xm(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
var Zm = Object.defineProperty,
  ey = (e, t, n) =>
    t in e
      ? Zm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  _i = (e, t, n) => (ey(e, typeof t != "symbol" ? t + "" : t, n), n);
class ha extends Error {
  constructor(t, n = {}) {
    super(t, n),
      _i(this, "statusCode", 500),
      _i(this, "fatal", !1),
      _i(this, "unhandled", !1),
      _i(this, "statusMessage"),
      _i(this, "data"),
      _i(this, "cause"),
      n.cause && !this.cause && (this.cause = n.cause);
  }
  toJSON() {
    const t = { message: this.message, statusCode: pa(this.statusCode, 500) };
    return (
      this.statusMessage && (t.statusMessage = Tf(this.statusMessage)),
      this.data !== void 0 && (t.data = this.data),
      t
    );
  }
}
_i(ha, "__h3_error__", !0);
function da(e) {
  if (typeof e == "string") return new ha(e);
  if (ty(e)) return e;
  const t = new ha(e.message ?? e.statusMessage ?? "", { cause: e.cause || e });
  if (Xm(e, "stack"))
    try {
      Object.defineProperty(t, "stack", {
        get() {
          return e.stack;
        },
      });
    } catch {
      try {
        t.stack = e.stack;
      } catch {}
    }
  if (
    (e.data && (t.data = e.data),
    e.statusCode
      ? (t.statusCode = pa(e.statusCode, t.statusCode))
      : e.status && (t.statusCode = pa(e.status, t.statusCode)),
    e.statusMessage
      ? (t.statusMessage = e.statusMessage)
      : e.statusText && (t.statusMessage = e.statusText),
    t.statusMessage)
  ) {
    const n = t.statusMessage;
    Tf(t.statusMessage) !== n &&
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
  }
  return (
    e.fatal !== void 0 && (t.fatal = e.fatal),
    e.unhandled !== void 0 && (t.unhandled = e.unhandled),
    t
  );
}
function ty(e) {
  var t;
  return (
    ((t = e == null ? void 0 : e.constructor) == null
      ? void 0
      : t.__h3_error__) === !0
  );
}
const ny = /[^\u0009\u0020-\u007E]/g;
function Tf(e = "") {
  return e.replace(ny, "");
}
function pa(e, t = 200) {
  return !e ||
    (typeof e == "string" && (e = Number.parseInt(e, 10)), e < 100 || e > 999)
    ? t
    : e;
}
const _f = Symbol("route"),
  Ii = () => {
    var e;
    return (e = It()) == null ? void 0 : e.$router;
  },
  Ef = () => (qu() ? yn(_f, It()._route) : It()._route);
/*! @__NO_SIDE_EFFECTS__ */ const iy = () => {
    try {
      if (It()._processingMiddleware) return !0;
    } catch {
      return !0;
    }
    return !1;
  },
  s1 = (e, t) => {
    e || (e = "/");
    const n =
      typeof e == "string"
        ? e
        : lf(e.path || "/", e.query || {}) + (e.hash || "");
    if (t != null && t.open) {
      {
        const { target: g = "_blank", windowFeatures: y = {} } = t.open,
          T = Object.entries(y)
            .filter(([w, A]) => A !== void 0)
            .map(([w, A]) => `${w.toLowerCase()}=${A}`)
            .join(", ");
        open(n, g, T);
      }
      return Promise.resolve();
    }
    const r =
      (t == null ? void 0 : t.external) || Kr(n, { acceptRelative: !0 });
    if (r) {
      if (!(t != null && t.external))
        throw new Error(
          "Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`."
        );
      const g = Qs(n).protocol;
      if (g && _g(g))
        throw new Error(`Cannot navigate to a URL with '${g}' protocol.`);
    }
    const o = iy();
    if (!r && o) return e;
    const l = Ii(),
      p = It();
    return r
      ? (t != null && t.replace ? location.replace(n) : (location.href = n),
        o ? (p.isHydrating ? new Promise(() => {}) : !1) : Promise.resolve())
      : t != null && t.replace
      ? l.replace(e)
      : l.push(e);
  },
  Js = () => Td(It().payload, "error"),
  Vi = (e) => {
    const t = Va(e);
    try {
      const n = It(),
        r = Js();
      n.hooks.callHook("app:error", t), (r.value = r.value || t);
    } catch {
      throw t;
    }
    return t;
  },
  ry = async (e = {}) => {
    const t = It(),
      n = Js();
    t.callHook("app:error:cleared", e),
      e.redirect && (await Ii().replace(e.redirect)),
      (n.value = null);
  },
  sy = (e) => !!(e && typeof e == "object" && "__nuxt_error" in e),
  Va = (e) => {
    const t = da(e);
    return (t.__nuxt_error = !0), t;
  },
  cc =
    globalThis.requestIdleCallback ||
    ((e) => {
      const t = Date.now(),
        n = {
          didTimeout: !1,
          timeRemaining: () => Math.max(0, 50 - (Date.now() - t)),
        };
      return setTimeout(() => {
        e(n);
      }, 1);
    }),
  o1 =
    globalThis.cancelIdleCallback ||
    ((e) => {
      clearTimeout(e);
    }),
  oy = (e) => {
    const t = It();
    t.isHydrating
      ? t.hooks.hookOnce("app:suspense:resolve", () => {
          cc(e);
        })
      : cc(e);
  };
function ay(e = {}) {
  const t = e.path || window.location.pathname;
  let n = {};
  try {
    n = Ps(sessionStorage.getItem("nuxt:reload") || "{}");
  } catch {}
  if (
    e.force ||
    (n == null ? void 0 : n.path) !== t ||
    (n == null ? void 0 : n.expires) < Date.now()
  ) {
    try {
      sessionStorage.setItem(
        "nuxt:reload",
        JSON.stringify({ path: t, expires: Date.now() + (e.ttl ?? 1e4) })
      );
    } catch {}
    if (e.persistState)
      try {
        sessionStorage.setItem(
          "nuxt:reload:state",
          JSON.stringify({ state: It().payload.state })
        );
      } catch {}
    window.location.pathname !== t
      ? (window.location.href = t)
      : window.location.reload();
  }
}
const ly = !1,
  cy = "#__nuxt";
function uc(e, t = {}) {
  const n = uy(e, t),
    r = It(),
    o = (r._payloadCache = r._payloadCache || {});
  return (
    n in o ||
      (o[n] = fy().then((l) =>
        l ? Cf(n).then((p) => p || (delete o[n], null)) : ((o[n] = null), null)
      )),
    o[n]
  );
}
const fc = "json";
function uy(e, t = {}) {
  const n = new URL(e, "http://localhost");
  if (n.search)
    throw new Error("Payload URL cannot contain search params: " + e);
  if (n.host !== "localhost" || Kr(n.pathname, { acceptRelative: !0 }))
    throw new Error("Payload URL must not include hostname: " + e);
  const r = t.hash || (t.fresh ? Date.now() : "");
  return Qr(
    za().app.baseURL,
    n.pathname,
    r ? `_payload.${r}.${fc}` : `_payload.${fc}`
  );
}
async function Cf(e) {
  const t = fetch(e).then((n) => n.text().then(Af));
  try {
    return await t;
  } catch (n) {
    console.warn("[nuxt] Cannot load payload ", e, n);
  }
  return null;
}
async function fy(e = Ef().path) {
  return !!It().payload.prerenderedAt;
}
let ds = null;
async function hy() {
  if (ds) return ds;
  const e = document.getElementById("__NUXT_DATA__");
  if (!e) return {};
  const t = Af(e.textContent || ""),
    n = e.dataset.src ? await Cf(e.dataset.src) : void 0;
  return (ds = { ...t, ...n, ...window.__NUXT__ }), ds;
}
function Af(e) {
  return vm(e, It()._payloadRevivers);
}
function dy(e, t) {
  It()._payloadRevivers[e] = t;
}
const hc = {
    NuxtError: (e) => Va(e),
    EmptyShallowRef: (e) =>
      Br(e === "_" ? void 0 : e === "0n" ? BigInt(0) : Ps(e)),
    EmptyRef: (e) => ci(e === "_" ? void 0 : e === "0n" ? BigInt(0) : Ps(e)),
    ShallowRef: (e) => Br(e),
    ShallowReactive: (e) => qs(e),
    Ref: (e) => ci(e),
    Reactive: (e) => hi(e),
  },
  py = Ri({
    name: "nuxt:revive-payload:client",
    order: -30,
    async setup(e) {
      let t, n;
      for (const r in hc) dy(r, hc[r]);
      Object.assign(
        e.payload,
        (([t, n] = Os(() => e.runWithContext(hy))), (t = await t), n(), t)
      ),
        (window.__NUXT__ = e.payload);
    },
  }),
  gy = [],
  my = Ri({
    name: "nuxt:head",
    enforce: "pre",
    setup(e) {
      const t = Jm({ plugins: gy });
      Gm(() => It().vueApp._context.provides.usehead), e.vueApp.use(t);
      {
        let n = !0;
        const r = async () => {
          (n = !1), await vf(t);
        };
        t.hooks.hook("dom:beforeRender", (o) => {
          o.shouldRender = !n;
        }),
          e.hooks.hook("page:start", () => {
            n = !0;
          }),
          e.hooks.hook("page:finish", () => {
            e.isHydrating || r();
          }),
          e.hooks.hook("app:error", r),
          e.hooks.hook("app:suspense:resolve", r);
      }
    },
  });
/*!
 * vue-router v4.2.5
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const Wi = typeof window < "u";
function yy(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const ut = Object.assign;
function Po(e, t) {
  const n = {};
  for (const r in t) {
    const o = t[r];
    n[r] = kn(o) ? o.map(e) : e(o);
  }
  return n;
}
const Mr = () => {},
  kn = Array.isArray,
  by = /\/$/,
  vy = (e) => e.replace(by, "");
function Ro(e, t, n = "/") {
  let r,
    o = {},
    l = "",
    p = "";
  const g = t.indexOf("#");
  let y = t.indexOf("?");
  return (
    g < y && g >= 0 && (y = -1),
    y > -1 &&
      ((r = t.slice(0, y)),
      (l = t.slice(y + 1, g > -1 ? g : t.length)),
      (o = e(l))),
    g > -1 && ((r = r || t.slice(0, g)), (p = t.slice(g, t.length))),
    (r = _y(r ?? t, n)),
    { fullPath: r + (l && "?") + l + p, path: r, query: o, hash: p }
  );
}
function wy(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function dc(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/";
}
function xy(e, t, n) {
  const r = t.matched.length - 1,
    o = n.matched.length - 1;
  return (
    r > -1 &&
    r === o &&
    ir(t.matched[r], n.matched[o]) &&
    kf(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function ir(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function kf(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!Ty(e[n], t[n])) return !1;
  return !0;
}
function Ty(e, t) {
  return kn(e) ? pc(e, t) : kn(t) ? pc(t, e) : e === t;
}
function pc(e, t) {
  return kn(t)
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t;
}
function _y(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"),
    r = e.split("/"),
    o = r[r.length - 1];
  (o === ".." || o === ".") && r.push("");
  let l = n.length - 1,
    p,
    g;
  for (p = 0; p < r.length; p++)
    if (((g = r[p]), g !== "."))
      if (g === "..") l > 1 && l--;
      else break;
  return (
    n.slice(0, l).join("/") +
    "/" +
    r.slice(p - (p === r.length ? 1 : 0)).join("/")
  );
}
var Wr;
(function (e) {
  (e.pop = "pop"), (e.push = "push");
})(Wr || (Wr = {}));
var Lr;
(function (e) {
  (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(Lr || (Lr = {}));
function Ey(e) {
  if (!e)
    if (Wi) {
      const t = document.querySelector("base");
      (e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
    } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), vy(e);
}
const Cy = /^[^#]+#/;
function Ay(e, t) {
  return e.replace(Cy, "#") + t;
}
function ky(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0),
  };
}
const Gs = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function Sy(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      r = typeof n == "string" && n.startsWith("#"),
      o =
        typeof n == "string"
          ? r
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!o) return;
    t = ky(o, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      );
}
function gc(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const ga = new Map();
function Py(e, t) {
  ga.set(e, t);
}
function Ry(e) {
  const t = ga.get(e);
  return ga.delete(e), t;
}
let Iy = () => location.protocol + "//" + location.host;
function Sf(e, t) {
  const { pathname: n, search: r, hash: o } = t,
    l = e.indexOf("#");
  if (l > -1) {
    let g = o.includes(e.slice(l)) ? e.slice(l).length : 1,
      y = o.slice(g);
    return y[0] !== "/" && (y = "/" + y), dc(y, "");
  }
  return dc(n, e) + r + o;
}
function Ny(e, t, n, r) {
  let o = [],
    l = [],
    p = null;
  const g = ({ state: P }) => {
    const H = Sf(e, location),
      $ = n.value,
      K = t.value;
    let de = 0;
    if (P) {
      if (((n.value = H), (t.value = P), p && p === $)) {
        p = null;
        return;
      }
      de = K ? P.position - K.position : 0;
    } else r(H);
    o.forEach((L) => {
      L(n.value, $, {
        delta: de,
        type: Wr.pop,
        direction: de ? (de > 0 ? Lr.forward : Lr.back) : Lr.unknown,
      });
    });
  };
  function y() {
    p = n.value;
  }
  function T(P) {
    o.push(P);
    const H = () => {
      const $ = o.indexOf(P);
      $ > -1 && o.splice($, 1);
    };
    return l.push(H), H;
  }
  function w() {
    const { history: P } = window;
    P.state && P.replaceState(ut({}, P.state, { scroll: Gs() }), "");
  }
  function A() {
    for (const P of l) P();
    (l = []),
      window.removeEventListener("popstate", g),
      window.removeEventListener("beforeunload", w);
  }
  return (
    window.addEventListener("popstate", g),
    window.addEventListener("beforeunload", w, { passive: !0 }),
    { pauseListeners: y, listen: T, destroy: A }
  );
}
function mc(e, t, n, r = !1, o = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: o ? Gs() : null,
  };
}
function Oy(e) {
  const { history: t, location: n } = window,
    r = { value: Sf(e, n) },
    o = { value: t.state };
  o.value ||
    l(
      r.value,
      {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0
    );
  function l(y, T, w) {
    const A = e.indexOf("#"),
      P =
        A > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(A)) + y
          : Iy() + e + y;
    try {
      t[w ? "replaceState" : "pushState"](T, "", P), (o.value = T);
    } catch (H) {
      console.error(H), n[w ? "replace" : "assign"](P);
    }
  }
  function p(y, T) {
    const w = ut({}, t.state, mc(o.value.back, y, o.value.forward, !0), T, {
      position: o.value.position,
    });
    l(y, w, !0), (r.value = y);
  }
  function g(y, T) {
    const w = ut({}, o.value, t.state, { forward: y, scroll: Gs() });
    l(w.current, w, !0);
    const A = ut({}, mc(r.value, y, null), { position: w.position + 1 }, T);
    l(y, A, !1), (r.value = y);
  }
  return { location: r, state: o, push: g, replace: p };
}
function Pf(e) {
  e = Ey(e);
  const t = Oy(e),
    n = Ny(e, t.state, t.location, t.replace);
  function r(l, p = !0) {
    p || n.pauseListeners(), history.go(l);
  }
  const o = ut(
    { location: "", base: e, go: r, createHref: Ay.bind(null, e) },
    t,
    n
  );
  return (
    Object.defineProperty(o, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(o, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    o
  );
}
function My(e) {
  return (
    (e = location.host ? e || location.pathname + location.search : ""),
    e.includes("#") || (e += "#"),
    Pf(e)
  );
}
function Ly(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function Rf(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const On = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  If = Symbol("");
var yc;
(function (e) {
  (e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated");
})(yc || (yc = {}));
function rr(e, t) {
  return ut(new Error(), { type: e, [If]: !0 }, t);
}
function Un(e, t) {
  return e instanceof Error && If in e && (t == null || !!(e.type & t));
}
const bc = "[^/]+?",
  jy = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Hy = /[.+*?^${}()[\]/\\]/g;
function Dy(e, t) {
  const n = ut({}, jy, t),
    r = [];
  let o = n.start ? "^" : "";
  const l = [];
  for (const T of e) {
    const w = T.length ? [] : [90];
    n.strict && !T.length && (o += "/");
    for (let A = 0; A < T.length; A++) {
      const P = T[A];
      let H = 40 + (n.sensitive ? 0.25 : 0);
      if (P.type === 0)
        A || (o += "/"), (o += P.value.replace(Hy, "\\$&")), (H += 40);
      else if (P.type === 1) {
        const { value: $, repeatable: K, optional: de, regexp: L } = P;
        l.push({ name: $, repeatable: K, optional: de });
        const U = L || bc;
        if (U !== bc) {
          H += 10;
          try {
            new RegExp(`(${U})`);
          } catch (J) {
            throw new Error(
              `Invalid custom RegExp for param "${$}" (${U}): ` + J.message
            );
          }
        }
        let ye = K ? `((?:${U})(?:/(?:${U}))*)` : `(${U})`;
        A || (ye = de && T.length < 2 ? `(?:/${ye})` : "/" + ye),
          de && (ye += "?"),
          (o += ye),
          (H += 20),
          de && (H += -8),
          K && (H += -20),
          U === ".*" && (H += -50);
      }
      w.push(H);
    }
    r.push(w);
  }
  if (n.strict && n.end) {
    const T = r.length - 1;
    r[T][r[T].length - 1] += 0.7000000000000001;
  }
  n.strict || (o += "/?"), n.end ? (o += "$") : n.strict && (o += "(?:/|$)");
  const p = new RegExp(o, n.sensitive ? "" : "i");
  function g(T) {
    const w = T.match(p),
      A = {};
    if (!w) return null;
    for (let P = 1; P < w.length; P++) {
      const H = w[P] || "",
        $ = l[P - 1];
      A[$.name] = H && $.repeatable ? H.split("/") : H;
    }
    return A;
  }
  function y(T) {
    let w = "",
      A = !1;
    for (const P of e) {
      (!A || !w.endsWith("/")) && (w += "/"), (A = !1);
      for (const H of P)
        if (H.type === 0) w += H.value;
        else if (H.type === 1) {
          const { value: $, repeatable: K, optional: de } = H,
            L = $ in T ? T[$] : "";
          if (kn(L) && !K)
            throw new Error(
              `Provided param "${$}" is an array but it is not repeatable (* or + modifiers)`
            );
          const U = kn(L) ? L.join("/") : L;
          if (!U)
            if (de)
              P.length < 2 &&
                (w.endsWith("/") ? (w = w.slice(0, -1)) : (A = !0));
            else throw new Error(`Missing required param "${$}"`);
          w += U;
        }
    }
    return w || "/";
  }
  return { re: p, score: r, keys: l, parse: g, stringify: y };
}
function By(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r) return r;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0;
}
function Fy(e, t) {
  let n = 0;
  const r = e.score,
    o = t.score;
  for (; n < r.length && n < o.length; ) {
    const l = By(r[n], o[n]);
    if (l) return l;
    n++;
  }
  if (Math.abs(o.length - r.length) === 1) {
    if (vc(r)) return 1;
    if (vc(o)) return -1;
  }
  return o.length - r.length;
}
function vc(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const $y = { type: 0, value: "" },
  qy = /[a-zA-Z0-9_]/;
function Uy(e) {
  if (!e) return [[]];
  if (e === "/") return [[$y]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(H) {
    throw new Error(`ERR (${n})/"${T}": ${H}`);
  }
  let n = 0,
    r = n;
  const o = [];
  let l;
  function p() {
    l && o.push(l), (l = []);
  }
  let g = 0,
    y,
    T = "",
    w = "";
  function A() {
    T &&
      (n === 0
        ? l.push({ type: 0, value: T })
        : n === 1 || n === 2 || n === 3
        ? (l.length > 1 &&
            (y === "*" || y === "+") &&
            t(
              `A repeatable param (${T}) must be alone in its segment. eg: '/:ids+.`
            ),
          l.push({
            type: 1,
            value: T,
            regexp: w,
            repeatable: y === "*" || y === "+",
            optional: y === "*" || y === "?",
          }))
        : t("Invalid state to consume buffer"),
      (T = ""));
  }
  function P() {
    T += y;
  }
  for (; g < e.length; ) {
    if (((y = e[g++]), y === "\\" && n !== 2)) {
      (r = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        y === "/" ? (T && A(), p()) : y === ":" ? (A(), (n = 1)) : P();
        break;
      case 4:
        P(), (n = r);
        break;
      case 1:
        y === "("
          ? (n = 2)
          : qy.test(y)
          ? P()
          : (A(), (n = 0), y !== "*" && y !== "?" && y !== "+" && g--);
        break;
      case 2:
        y === ")"
          ? w[w.length - 1] == "\\"
            ? (w = w.slice(0, -1) + y)
            : (n = 3)
          : (w += y);
        break;
      case 3:
        A(), (n = 0), y !== "*" && y !== "?" && y !== "+" && g--, (w = "");
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${T}"`), A(), p(), o;
}
function Wy(e, t, n) {
  const r = Dy(Uy(e.path), n),
    o = ut(r, { record: e, parent: t, children: [], alias: [] });
  return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o;
}
function zy(e, t) {
  const n = [],
    r = new Map();
  t = Tc({ strict: !1, end: !0, sensitive: !1 }, t);
  function o(w) {
    return r.get(w);
  }
  function l(w, A, P) {
    const H = !P,
      $ = Vy(w);
    $.aliasOf = P && P.record;
    const K = Tc(t, w),
      de = [$];
    if ("alias" in w) {
      const ye = typeof w.alias == "string" ? [w.alias] : w.alias;
      for (const J of ye)
        de.push(
          ut({}, $, {
            components: P ? P.record.components : $.components,
            path: J,
            aliasOf: P ? P.record : $,
          })
        );
    }
    let L, U;
    for (const ye of de) {
      const { path: J } = ye;
      if (A && J[0] !== "/") {
        const X = A.record.path,
          Se = X[X.length - 1] === "/" ? "" : "/";
        ye.path = A.record.path + (J && Se + J);
      }
      if (
        ((L = Wy(ye, A, K)),
        P
          ? P.alias.push(L)
          : ((U = U || L),
            U !== L && U.alias.push(L),
            H && w.name && !xc(L) && p(w.name)),
        $.children)
      ) {
        const X = $.children;
        for (let Se = 0; Se < X.length; Se++) l(X[Se], L, P && P.children[Se]);
      }
      (P = P || L),
        ((L.record.components && Object.keys(L.record.components).length) ||
          L.record.name ||
          L.record.redirect) &&
          y(L);
    }
    return U
      ? () => {
          p(U);
        }
      : Mr;
  }
  function p(w) {
    if (Rf(w)) {
      const A = r.get(w);
      A &&
        (r.delete(w),
        n.splice(n.indexOf(A), 1),
        A.children.forEach(p),
        A.alias.forEach(p));
    } else {
      const A = n.indexOf(w);
      A > -1 &&
        (n.splice(A, 1),
        w.record.name && r.delete(w.record.name),
        w.children.forEach(p),
        w.alias.forEach(p));
    }
  }
  function g() {
    return n;
  }
  function y(w) {
    let A = 0;
    for (
      ;
      A < n.length &&
      Fy(w, n[A]) >= 0 &&
      (w.record.path !== n[A].record.path || !Nf(w, n[A]));

    )
      A++;
    n.splice(A, 0, w), w.record.name && !xc(w) && r.set(w.record.name, w);
  }
  function T(w, A) {
    let P,
      H = {},
      $,
      K;
    if ("name" in w && w.name) {
      if (((P = r.get(w.name)), !P)) throw rr(1, { location: w });
      (K = P.record.name),
        (H = ut(
          wc(
            A.params,
            P.keys.filter((U) => !U.optional).map((U) => U.name)
          ),
          w.params &&
            wc(
              w.params,
              P.keys.map((U) => U.name)
            )
        )),
        ($ = P.stringify(H));
    } else if ("path" in w)
      ($ = w.path),
        (P = n.find((U) => U.re.test($))),
        P && ((H = P.parse($)), (K = P.record.name));
    else {
      if (((P = A.name ? r.get(A.name) : n.find((U) => U.re.test(A.path))), !P))
        throw rr(1, { location: w, currentLocation: A });
      (K = P.record.name),
        (H = ut({}, A.params, w.params)),
        ($ = P.stringify(H));
    }
    const de = [];
    let L = P;
    for (; L; ) de.unshift(L.record), (L = L.parent);
    return { name: K, path: $, params: H, matched: de, meta: Ky(de) };
  }
  return (
    e.forEach((w) => l(w)),
    {
      addRoute: l,
      resolve: T,
      removeRoute: p,
      getRoutes: g,
      getRecordMatcher: o,
    }
  );
}
function wc(e, t) {
  const n = {};
  for (const r of t) r in e && (n[r] = e[r]);
  return n;
}
function Vy(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Yy(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e
        ? e.components || null
        : e.component && { default: e.component },
  };
}
function Yy(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const r in e.components) t[r] = typeof n == "object" ? n[r] : n;
  return t;
}
function xc(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function Ky(e) {
  return e.reduce((t, n) => ut(t, n.meta), {});
}
function Tc(e, t) {
  const n = {};
  for (const r in e) n[r] = r in t ? t[r] : e[r];
  return n;
}
function Nf(e, t) {
  return t.children.some((n) => n === e || Nf(e, n));
}
const Of = /#/g,
  Qy = /&/g,
  Jy = /\//g,
  Gy = /=/g,
  Xy = /\?/g,
  Mf = /\+/g,
  Zy = /%5B/g,
  eb = /%5D/g,
  Lf = /%5E/g,
  tb = /%60/g,
  jf = /%7B/g,
  nb = /%7C/g,
  Hf = /%7D/g,
  ib = /%20/g;
function Ya(e) {
  return encodeURI("" + e)
    .replace(nb, "|")
    .replace(Zy, "[")
    .replace(eb, "]");
}
function rb(e) {
  return Ya(e).replace(jf, "{").replace(Hf, "}").replace(Lf, "^");
}
function ma(e) {
  return Ya(e)
    .replace(Mf, "%2B")
    .replace(ib, "+")
    .replace(Of, "%23")
    .replace(Qy, "%26")
    .replace(tb, "`")
    .replace(jf, "{")
    .replace(Hf, "}")
    .replace(Lf, "^");
}
function sb(e) {
  return ma(e).replace(Gy, "%3D");
}
function ob(e) {
  return Ya(e).replace(Of, "%23").replace(Xy, "%3F");
}
function ab(e) {
  return e == null ? "" : ob(e).replace(Jy, "%2F");
}
function js(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
function lb(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const r = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let o = 0; o < r.length; ++o) {
    const l = r[o].replace(Mf, " "),
      p = l.indexOf("="),
      g = js(p < 0 ? l : l.slice(0, p)),
      y = p < 0 ? null : js(l.slice(p + 1));
    if (g in t) {
      let T = t[g];
      kn(T) || (T = t[g] = [T]), T.push(y);
    } else t[g] = y;
  }
  return t;
}
function _c(e) {
  let t = "";
  for (let n in e) {
    const r = e[n];
    if (((n = sb(n)), r == null)) {
      r !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (kn(r) ? r.map((l) => l && ma(l)) : [r && ma(r)]).forEach((l) => {
      l !== void 0 &&
        ((t += (t.length ? "&" : "") + n), l != null && (t += "=" + l));
    });
  }
  return t;
}
function cb(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 &&
      (t[n] = kn(r)
        ? r.map((o) => (o == null ? null : "" + o))
        : r == null
        ? r
        : "" + r);
  }
  return t;
}
const ub = Symbol(""),
  Ec = Symbol(""),
  Ka = Symbol(""),
  Qa = Symbol(""),
  ya = Symbol("");
function Er() {
  let e = [];
  function t(r) {
    return (
      e.push(r),
      () => {
        const o = e.indexOf(r);
        o > -1 && e.splice(o, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e.slice(), reset: n };
}
function ri(e, t, n, r, o) {
  const l = r && (r.enterCallbacks[o] = r.enterCallbacks[o] || []);
  return () =>
    new Promise((p, g) => {
      const y = (A) => {
          A === !1
            ? g(rr(4, { from: n, to: t }))
            : A instanceof Error
            ? g(A)
            : Ly(A)
            ? g(rr(2, { from: t, to: A }))
            : (l &&
                r.enterCallbacks[o] === l &&
                typeof A == "function" &&
                l.push(A),
              p());
        },
        T = e.call(r && r.instances[o], t, n, y);
      let w = Promise.resolve(T);
      e.length < 3 && (w = w.then(y)), w.catch((A) => g(A));
    });
}
function Io(e, t, n, r) {
  const o = [];
  for (const l of e)
    for (const p in l.components) {
      let g = l.components[p];
      if (!(t !== "beforeRouteEnter" && !l.instances[p]))
        if (fb(g)) {
          const T = (g.__vccOpts || g)[t];
          T && o.push(ri(T, n, r, l, p));
        } else {
          let y = g();
          o.push(() =>
            y.then((T) => {
              if (!T)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${p}" at "${l.path}"`)
                );
              const w = yy(T) ? T.default : T;
              l.components[p] = w;
              const P = (w.__vccOpts || w)[t];
              return P && ri(P, n, r, l, p)();
            })
          );
        }
    }
  return o;
}
function fb(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  );
}
function Cc(e) {
  const t = yn(Ka),
    n = yn(Qa),
    r = En(() => t.resolve(_t(e.to))),
    o = En(() => {
      const { matched: y } = r.value,
        { length: T } = y,
        w = y[T - 1],
        A = n.matched;
      if (!w || !A.length) return -1;
      const P = A.findIndex(ir.bind(null, w));
      if (P > -1) return P;
      const H = Ac(y[T - 2]);
      return T > 1 && Ac(w) === H && A[A.length - 1].path !== H
        ? A.findIndex(ir.bind(null, y[T - 2]))
        : P;
    }),
    l = En(() => o.value > -1 && gb(n.params, r.value.params)),
    p = En(
      () =>
        o.value > -1 &&
        o.value === n.matched.length - 1 &&
        kf(n.params, r.value.params)
    );
  function g(y = {}) {
    return pb(y)
      ? t[_t(e.replace) ? "replace" : "push"](_t(e.to)).catch(Mr)
      : Promise.resolve();
  }
  return {
    route: r,
    href: En(() => r.value.href),
    isActive: l,
    isExactActive: p,
    navigate: g,
  };
}
const hb = Vs({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: Cc,
    setup(e, { slots: t }) {
      const n = hi(Cc(e)),
        { options: r } = yn(Ka),
        o = En(() => ({
          [kc(e.activeClass, r.linkActiveClass, "router-link-active")]:
            n.isActive,
          [kc(
            e.exactActiveClass,
            r.linkExactActiveClass,
            "router-link-exact-active"
          )]: n.isExactActive,
        }));
      return () => {
        const l = t.default && t.default(n);
        return e.custom
          ? l
          : nf(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: o.value,
              },
              l
            );
      };
    },
  }),
  db = hb;
function pb(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function gb(e, t) {
  for (const n in t) {
    const r = t[n],
      o = e[n];
    if (typeof r == "string") {
      if (r !== o) return !1;
    } else if (!kn(o) || o.length !== r.length || r.some((l, p) => l !== o[p]))
      return !1;
  }
  return !0;
}
function Ac(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const kc = (e, t, n) => e ?? t ?? n,
  mb = Vs({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const r = yn(ya),
        o = En(() => e.route || r.value),
        l = yn(Ec, 0),
        p = En(() => {
          let T = _t(l);
          const { matched: w } = o.value;
          let A;
          for (; (A = w[T]) && !A.components; ) T++;
          return T;
        }),
        g = En(() => o.value.matched[p.value]);
      Ir(
        Ec,
        En(() => p.value + 1)
      ),
        Ir(ub, g),
        Ir(ya, o);
      const y = ci();
      return (
        gs(
          () => [y.value, g.value, e.name],
          ([T, w, A], [P, H, $]) => {
            w &&
              ((w.instances[A] = T),
              H &&
                H !== w &&
                T &&
                T === P &&
                (w.leaveGuards.size || (w.leaveGuards = H.leaveGuards),
                w.updateGuards.size || (w.updateGuards = H.updateGuards))),
              T &&
                w &&
                (!H || !ir(w, H) || !P) &&
                (w.enterCallbacks[A] || []).forEach((K) => K(T));
          },
          { flush: "post" }
        ),
        () => {
          const T = o.value,
            w = e.name,
            A = g.value,
            P = A && A.components[w];
          if (!P) return Sc(n.default, { Component: P, route: T });
          const H = A.props[w],
            $ = H
              ? H === !0
                ? T.params
                : typeof H == "function"
                ? H(T)
                : H
              : null,
            de = nf(
              P,
              ut({}, $, t, {
                onVnodeUnmounted: (L) => {
                  L.component.isUnmounted && (A.instances[w] = null);
                },
                ref: y,
              })
            );
          return Sc(n.default, { Component: de, route: T }) || de;
        }
      );
    },
  });
function Sc(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const yb = mb;
function bb(e) {
  const t = zy(e.routes, e),
    n = e.parseQuery || lb,
    r = e.stringifyQuery || _c,
    o = e.history,
    l = Er(),
    p = Er(),
    g = Er(),
    y = Br(On);
  let T = On;
  Wi &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const w = Po.bind(null, (te) => "" + te),
    A = Po.bind(null, ab),
    P = Po.bind(null, js);
  function H(te, he) {
    let ge, Ce;
    return (
      Rf(te) ? ((ge = t.getRecordMatcher(te)), (Ce = he)) : (Ce = te),
      t.addRoute(Ce, ge)
    );
  }
  function $(te) {
    const he = t.getRecordMatcher(te);
    he && t.removeRoute(he);
  }
  function K() {
    return t.getRoutes().map((te) => te.record);
  }
  function de(te) {
    return !!t.getRecordMatcher(te);
  }
  function L(te, he) {
    if (((he = ut({}, he || y.value)), typeof te == "string")) {
      const D = Ro(n, te, he.path),
        G = t.resolve({ path: D.path }, he),
        ne = o.createHref(D.fullPath);
      return ut(D, G, {
        params: P(G.params),
        hash: js(D.hash),
        redirectedFrom: void 0,
        href: ne,
      });
    }
    let ge;
    if ("path" in te) ge = ut({}, te, { path: Ro(n, te.path, he.path).path });
    else {
      const D = ut({}, te.params);
      for (const G in D) D[G] == null && delete D[G];
      (ge = ut({}, te, { params: A(D) })), (he.params = A(he.params));
    }
    const Ce = t.resolve(ge, he),
      Oe = te.hash || "";
    Ce.params = w(P(Ce.params));
    const I = wy(r, ut({}, te, { hash: rb(Oe), path: Ce.path })),
      M = o.createHref(I);
    return ut(
      {
        fullPath: I,
        hash: Oe,
        query: r === _c ? cb(te.query) : te.query || {},
      },
      Ce,
      { redirectedFrom: void 0, href: M }
    );
  }
  function U(te) {
    return typeof te == "string" ? Ro(n, te, y.value.path) : ut({}, te);
  }
  function ye(te, he) {
    if (T !== te) return rr(8, { from: he, to: te });
  }
  function J(te) {
    return f(te);
  }
  function X(te) {
    return J(ut(U(te), { replace: !0 }));
  }
  function Se(te) {
    const he = te.matched[te.matched.length - 1];
    if (he && he.redirect) {
      const { redirect: ge } = he;
      let Ce = typeof ge == "function" ? ge(te) : ge;
      return (
        typeof Ce == "string" &&
          ((Ce =
            Ce.includes("?") || Ce.includes("#") ? (Ce = U(Ce)) : { path: Ce }),
          (Ce.params = {})),
        ut(
          {
            query: te.query,
            hash: te.hash,
            params: "path" in Ce ? {} : te.params,
          },
          Ce
        )
      );
    }
  }
  function f(te, he) {
    const ge = (T = L(te)),
      Ce = y.value,
      Oe = te.state,
      I = te.force,
      M = te.replace === !0,
      D = Se(ge);
    if (D)
      return f(
        ut(U(D), {
          state: typeof D == "object" ? ut({}, Oe, D.state) : Oe,
          force: I,
          replace: M,
        }),
        he || ge
      );
    const G = ge;
    G.redirectedFrom = he;
    let ne;
    return (
      !I &&
        xy(r, Ce, ge) &&
        ((ne = rr(16, { to: G, from: Ce })), Mt(Ce, Ce, !0, !1)),
      (ne ? Promise.resolve(ne) : Ue(G, Ce))
        .catch((z) => (Un(z) ? (Un(z, 2) ? z : Ut(z)) : Qe(z, G, Ce)))
        .then((z) => {
          if (z) {
            if (Un(z, 2))
              return f(
                ut({ replace: M }, U(z.to), {
                  state: typeof z.to == "object" ? ut({}, Oe, z.to.state) : Oe,
                  force: I,
                }),
                he || G
              );
          } else z = Le(G, Ce, !0, M, Oe);
          return We(G, Ce, z), z;
        })
    );
  }
  function ve(te, he) {
    const ge = ye(te, he);
    return ge ? Promise.reject(ge) : Promise.resolve();
  }
  function C(te) {
    const he = Ve.values().next().value;
    return he && typeof he.runWithContext == "function"
      ? he.runWithContext(te)
      : te();
  }
  function Ue(te, he) {
    let ge;
    const [Ce, Oe, I] = vb(te, he);
    ge = Io(Ce.reverse(), "beforeRouteLeave", te, he);
    for (const D of Ce)
      D.leaveGuards.forEach((G) => {
        ge.push(ri(G, te, he));
      });
    const M = ve.bind(null, te, he);
    return (
      ge.push(M),
      dt(ge)
        .then(() => {
          ge = [];
          for (const D of l.list()) ge.push(ri(D, te, he));
          return ge.push(M), dt(ge);
        })
        .then(() => {
          ge = Io(Oe, "beforeRouteUpdate", te, he);
          for (const D of Oe)
            D.updateGuards.forEach((G) => {
              ge.push(ri(G, te, he));
            });
          return ge.push(M), dt(ge);
        })
        .then(() => {
          ge = [];
          for (const D of I)
            if (D.beforeEnter)
              if (kn(D.beforeEnter))
                for (const G of D.beforeEnter) ge.push(ri(G, te, he));
              else ge.push(ri(D.beforeEnter, te, he));
          return ge.push(M), dt(ge);
        })
        .then(
          () => (
            te.matched.forEach((D) => (D.enterCallbacks = {})),
            (ge = Io(I, "beforeRouteEnter", te, he)),
            ge.push(M),
            dt(ge)
          )
        )
        .then(() => {
          ge = [];
          for (const D of p.list()) ge.push(ri(D, te, he));
          return ge.push(M), dt(ge);
        })
        .catch((D) => (Un(D, 8) ? D : Promise.reject(D)))
    );
  }
  function We(te, he, ge) {
    g.list().forEach((Ce) => C(() => Ce(te, he, ge)));
  }
  function Le(te, he, ge, Ce, Oe) {
    const I = ye(te, he);
    if (I) return I;
    const M = he === On,
      D = Wi ? history.state : {};
    ge &&
      (Ce || M
        ? o.replace(te.fullPath, ut({ scroll: M && D && D.scroll }, Oe))
        : o.push(te.fullPath, Oe)),
      (y.value = te),
      Mt(te, he, ge, M),
      Ut();
  }
  let Ee;
  function ue() {
    Ee ||
      (Ee = o.listen((te, he, ge) => {
        if (!vn.listening) return;
        const Ce = L(te),
          Oe = Se(Ce);
        if (Oe) {
          f(ut(Oe, { replace: !0 }), Ce).catch(Mr);
          return;
        }
        T = Ce;
        const I = y.value;
        Wi && Py(gc(I.fullPath, ge.delta), Gs()),
          Ue(Ce, I)
            .catch((M) =>
              Un(M, 12)
                ? M
                : Un(M, 2)
                ? (f(M.to, Ce)
                    .then((D) => {
                      Un(D, 20) &&
                        !ge.delta &&
                        ge.type === Wr.pop &&
                        o.go(-1, !1);
                    })
                    .catch(Mr),
                  Promise.reject())
                : (ge.delta && o.go(-ge.delta, !1), Qe(M, Ce, I))
            )
            .then((M) => {
              (M = M || Le(Ce, I, !1)),
                M &&
                  (ge.delta && !Un(M, 8)
                    ? o.go(-ge.delta, !1)
                    : ge.type === Wr.pop && Un(M, 20) && o.go(-1, !1)),
                We(Ce, I, M);
            })
            .catch(Mr);
      }));
  }
  let vt = Er(),
    ze = Er(),
    ae;
  function Qe(te, he, ge) {
    Ut(te);
    const Ce = ze.list();
    return (
      Ce.length ? Ce.forEach((Oe) => Oe(te, he, ge)) : console.error(te),
      Promise.reject(te)
    );
  }
  function ht() {
    return ae && y.value !== On
      ? Promise.resolve()
      : new Promise((te, he) => {
          vt.add([te, he]);
        });
  }
  function Ut(te) {
    return (
      ae ||
        ((ae = !te),
        ue(),
        vt.list().forEach(([he, ge]) => (te ? ge(te) : he())),
        vt.reset()),
      te
    );
  }
  function Mt(te, he, ge, Ce) {
    const { scrollBehavior: Oe } = e;
    if (!Wi || !Oe) return Promise.resolve();
    const I =
      (!ge && Ry(gc(te.fullPath, 0))) ||
      ((Ce || !ge) && history.state && history.state.scroll) ||
      null;
    return Yr()
      .then(() => Oe(te, he, I))
      .then((M) => M && Sy(M))
      .catch((M) => Qe(M, te, he));
  }
  const ft = (te) => o.go(te);
  let Lt;
  const Ve = new Set(),
    vn = {
      currentRoute: y,
      listening: !0,
      addRoute: H,
      removeRoute: $,
      hasRoute: de,
      getRoutes: K,
      resolve: L,
      options: e,
      push: J,
      replace: X,
      go: ft,
      back: () => ft(-1),
      forward: () => ft(1),
      beforeEach: l.add,
      beforeResolve: p.add,
      afterEach: g.add,
      onError: ze.add,
      isReady: ht,
      install(te) {
        const he = this;
        te.component("RouterLink", db),
          te.component("RouterView", yb),
          (te.config.globalProperties.$router = he),
          Object.defineProperty(te.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => _t(y),
          }),
          Wi &&
            !Lt &&
            y.value === On &&
            ((Lt = !0), J(o.location).catch((Oe) => {}));
        const ge = {};
        for (const Oe in On)
          Object.defineProperty(ge, Oe, {
            get: () => y.value[Oe],
            enumerable: !0,
          });
        te.provide(Ka, he), te.provide(Qa, qs(ge)), te.provide(ya, y);
        const Ce = te.unmount;
        Ve.add(te),
          (te.unmount = function () {
            Ve.delete(te),
              Ve.size < 1 &&
                ((T = On),
                Ee && Ee(),
                (Ee = null),
                (y.value = On),
                (Lt = !1),
                (ae = !1)),
              Ce();
          });
      },
    };
  function dt(te) {
    return te.reduce((he, ge) => he.then(() => C(ge)), Promise.resolve());
  }
  return vn;
}
function vb(e, t) {
  const n = [],
    r = [],
    o = [],
    l = Math.max(t.matched.length, e.matched.length);
  for (let p = 0; p < l; p++) {
    const g = t.matched[p];
    g && (e.matched.find((T) => ir(T, g)) ? r.push(g) : n.push(g));
    const y = e.matched[p];
    y && (t.matched.find((T) => ir(T, y)) || o.push(y));
  }
  return [n, r, o];
}
function a1() {
  return yn(Qa);
}
const Pc = [
    {
      name: "post-slug",
      path: "/post/:slug()",
      meta: {},
      alias: [],
      redirect: void 0,
      component: () =>
        Ms(
          () => import("./_slug_.07de89af.js"),
          [
            "./_slug_.07de89af.js",
            "./article.store.reducer.bdc8ffb3.js",
            "./_slug_.26e2edd1.css",
          ],
          import.meta.url
        ).then((e) => e.default || e),
    },
    {
      name: "post",
      path: "/post",
      meta: {},
      alias: [],
      redirect: void 0,
      component: () =>
        Ms(
          () => import("./index.e2c1480a.js"),
          [
            "./index.e2c1480a.js",
            "./article.store.reducer.bdc8ffb3.js",
            "./index.a2767a86.css",
          ],
          import.meta.url
        ).then((e) => e.default || e),
    },
  ],
  wb = {
    scrollBehavior(e, t, n) {
      var T;
      const r = It(),
        o =
          ((T = Ii().options) == null ? void 0 : T.scrollBehaviorType) ??
          "auto";
      let l = n || void 0;
      const p =
        typeof e.meta.scrollToTop == "function"
          ? e.meta.scrollToTop(e, t)
          : e.meta.scrollToTop;
      if (
        (!l && t && e && p !== !1 && xb(t, e) && (l = { left: 0, top: 0 }),
        e.path === t.path)
      ) {
        if (t.hash && !e.hash) return { left: 0, top: 0 };
        if (e.hash) return { el: e.hash, top: Rc(e.hash), behavior: o };
      }
      const g = (w) => !!(w.meta.pageTransition ?? ly),
        y = g(t) && g(e) ? "page:transition:finish" : "page:finish";
      return new Promise((w) => {
        r.hooks.hookOnce(y, async () => {
          await Yr(),
            e.hash && (l = { el: e.hash, top: Rc(e.hash), behavior: o }),
            w(l);
        });
      });
    },
  };
function Rc(e) {
  try {
    const t = document.querySelector(e);
    if (t) return parseFloat(getComputedStyle(t).scrollMarginTop);
  } catch {}
  return 0;
}
function xb(e, t) {
  return (
    t.path !== e.path || JSON.stringify(e.params) !== JSON.stringify(t.params)
  );
}
const Tb = {},
  Xt = { ...Tb, ...wb },
  _b = async (e) => {
    var y;
    let t, n;
    if (!((y = e.meta) != null && y.validate)) return;
    const r = It(),
      o = Ii();
    if (
      (([t, n] = Os(() => Promise.resolve(e.meta.validate(e)))),
      (t = await t),
      n(),
      t) === !0
    )
      return;
    const p = Va({
        statusCode: 404,
        statusMessage: `Page Not Found: ${e.fullPath}`,
      }),
      g = o.beforeResolve((T) => {
        if ((g(), T === e)) {
          const w = o.afterEach(async () => {
            w(),
              await r.runWithContext(() => Vi(p)),
              window.history.pushState({}, "", e.fullPath);
          });
          return !1;
        }
      });
  },
  Eb = [_b],
  jr = {};
function Cb(e, t, n) {
  const { pathname: r, search: o, hash: l } = t,
    p = e.indexOf("#");
  if (p > -1) {
    const T = l.includes(e.slice(p)) ? e.slice(p).length : 1;
    let w = l.slice(T);
    return w[0] !== "/" && (w = "/" + w), Jl(w, "");
  }
  const g = Jl(r, e),
    y = !n || Pg(g, n, { trailingSlash: !0 }) ? g : n;
  return y + (y.includes("?") ? "" : o) + l;
}
const Ab = Ri({
    name: "nuxt:router",
    enforce: "pre",
    async setup(e) {
      var K, de;
      let t,
        n,
        r = za().app.baseURL;
      Xt.hashMode && !r.includes("#") && (r += "#");
      const o =
          ((K = Xt.history) == null ? void 0 : K.call(Xt, r)) ??
          (Xt.hashMode ? My(r) : Pf(r)),
        l = ((de = Xt.routes) == null ? void 0 : de.call(Xt, Pc)) ?? Pc;
      let p;
      const g = Cb(r, window.location, e.payload.path),
        y = bb({
          ...Xt,
          scrollBehavior: (L, U, ye) => {
            var J;
            if (U === On) {
              p = ye;
              return;
            }
            return (
              (y.options.scrollBehavior = Xt.scrollBehavior),
              (J = Xt.scrollBehavior) == null
                ? void 0
                : J.call(Xt, L, On, p || ye)
            );
          },
          history: o,
          routes: l,
        });
      e.vueApp.use(y);
      const T = Br(y.currentRoute.value);
      y.afterEach((L, U) => {
        T.value = U;
      }),
        Object.defineProperty(
          e.vueApp.config.globalProperties,
          "previousRoute",
          { get: () => T.value }
        );
      const w = Br(y.resolve(g)),
        A = () => {
          w.value = y.currentRoute.value;
        };
      e.hook("page:finish", A),
        y.afterEach((L, U) => {
          var ye, J, X, Se;
          ((J = (ye = L.matched[0]) == null ? void 0 : ye.components) == null
            ? void 0
            : J.default) ===
            ((Se = (X = U.matched[0]) == null ? void 0 : X.components) == null
              ? void 0
              : Se.default) && A();
        });
      const P = {};
      for (const L in w.value)
        Object.defineProperty(P, L, { get: () => w.value[L] });
      (e._route = qs(P)),
        (e._middleware = e._middleware || { global: [], named: {} });
      const H = Js();
      try {
        ([t, n] = Os(() => y.isReady())), await t, n();
      } catch (L) {
        ([t, n] = Os(() => e.runWithContext(() => Vi(L)))), await t, n();
      }
      const $ = e.payload.state._layout;
      return (
        y.beforeEach(async (L, U) => {
          var ye;
          (L.meta = hi(L.meta)),
            e.isHydrating && $ && !Pi(L.meta.layout) && (L.meta.layout = $),
            (e._processingMiddleware = !0);
          {
            const J = new Set([...Eb, ...e._middleware.global]);
            for (const X of L.matched) {
              const Se = X.meta.middleware;
              if (Se)
                if (Array.isArray(Se)) for (const f of Se) J.add(f);
                else J.add(Se);
            }
            for (const X of J) {
              const Se =
                typeof X == "string"
                  ? e._middleware.named[X] ||
                    (await ((ye = jr[X]) == null
                      ? void 0
                      : ye.call(jr).then((ve) => ve.default || ve)))
                  : X;
              if (!Se) throw new Error(`Unknown route middleware: '${X}'.`);
              const f = await e.runWithContext(() => Se(L, U));
              if (
                !e.payload.serverRendered &&
                e.isHydrating &&
                (f === !1 || f instanceof Error)
              ) {
                const ve =
                  f ||
                  da({
                    statusCode: 404,
                    statusMessage: `Page Not Found: ${g}`,
                  });
                return await e.runWithContext(() => Vi(ve)), !1;
              }
              if (f !== !0 && (f || f === !1)) return f;
            }
          }
        }),
        y.onError(() => {
          delete e._processingMiddleware;
        }),
        y.afterEach(async (L, U, ye) => {
          delete e._processingMiddleware,
            !e.isHydrating && H.value && (await e.runWithContext(ry)),
            L.matched.length === 0 &&
              (await e.runWithContext(() =>
                Vi(
                  da({
                    statusCode: 404,
                    fatal: !1,
                    statusMessage: `Page not found: ${L.fullPath}`,
                  })
                )
              ));
        }),
        e.hooks.hookOnce("app:created", async () => {
          try {
            await y.replace({ ...y.resolve(g), name: void 0, force: !0 }),
              (y.options.scrollBehavior = Xt.scrollBehavior);
          } catch (L) {
            await e.runWithContext(() => Vi(L));
          }
        }),
        { provide: { router: y } }
      );
    },
  }),
  kb = Ri({
    name: "nuxt:payload",
    setup(e) {
      Ii().beforeResolve(async (t, n) => {
        if (t.path === n.path) return;
        const r = await uc(t.path);
        r && Object.assign(e.static.data, r.data);
      }),
        oy(() => {
          e.hooks.hook("link:prefetch", async (t) => {
            Qs(t).protocol || (await uc(t));
          });
        });
    },
  }),
  Sb = Ri({ name: "nuxt:global-components" }),
  ps = {},
  Pb = Ri({
    name: "nuxt:prefetch",
    setup(e) {
      const t = Ii();
      e.hooks.hook("app:mounted", () => {
        t.beforeEach(async (n) => {
          var o;
          const r =
            (o = n == null ? void 0 : n.meta) == null ? void 0 : o.layout;
          r && typeof ps[r] == "function" && (await ps[r]());
        });
      }),
        e.hooks.hook("link:prefetch", (n) => {
          var p, g, y, T;
          if (Kr(n)) return;
          const r = t.resolve(n);
          if (!r) return;
          const o =
            (p = r == null ? void 0 : r.meta) == null ? void 0 : p.layout;
          let l = Array.isArray(
            (g = r == null ? void 0 : r.meta) == null ? void 0 : g.middleware
          )
            ? (y = r == null ? void 0 : r.meta) == null
              ? void 0
              : y.middleware
            : [
                (T = r == null ? void 0 : r.meta) == null
                  ? void 0
                  : T.middleware,
              ];
          l = l.filter((w) => typeof w == "string");
          for (const w of l) typeof jr[w] == "function" && jr[w]();
          o && typeof ps[o] == "function" && ps[o]();
        });
    },
  }),
  Rb = Ri({
    name: "nuxt:chunk-reload",
    setup(e) {
      const t = Ii(),
        n = za(),
        r = new Set();
      t.beforeEach(() => {
        r.clear();
      }),
        e.hook("app:chunkError", ({ error: l }) => {
          r.add(l);
        });
      function o(l) {
        const g =
          "href" in l && l.href.startsWith("#")
            ? n.app.baseURL + l.href
            : Qr(n.app.baseURL, l.fullPath);
        ay({ path: g, persistState: !0 });
      }
      e.hook("app:manifest:update", () => {
        t.beforeResolve(o);
      }),
        t.onError((l, p) => {
          r.has(l) && o(p);
        });
    },
  }),
  Ib = [py, my, Ab, kb, Sb, Pb, Rb],
  Nb = Vs({
    name: "ClientOnly",
    inheritAttrs: !1,
    props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
    setup(e, { slots: t, attrs: n }) {
      const r = ci(!1);
      return (
        Lu(() => {
          r.value = !0;
        }),
        (o) => {
          var y;
          if (r.value) return (y = t.default) == null ? void 0 : y.call(t);
          const l = t.fallback || t.placeholder;
          if (l) return l();
          const p = o.fallback || o.placeholder || "",
            g = o.fallbackTag || o.placeholderTag || "span";
          return kr(g, n, p);
        }
      );
    },
  });
var Ob =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : typeof self < "u"
    ? self
    : {};
function Mb(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Lb = { exports: {} };
/*!
 * jQuery JavaScript Library v3.7.1
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-08-28T13:37Z
 */ (function (e) {
  (function (t, n) {
    e.exports = t.document
      ? n(t, !0)
      : function (r) {
          if (!r.document)
            throw new Error("jQuery requires a window with a document");
          return n(r);
        };
  })(typeof window < "u" ? window : Ob, function (t, n) {
    var r = [],
      o = Object.getPrototypeOf,
      l = r.slice,
      p = r.flat
        ? function (i) {
            return r.flat.call(i);
          }
        : function (i) {
            return r.concat.apply([], i);
          },
      g = r.push,
      y = r.indexOf,
      T = {},
      w = T.toString,
      A = T.hasOwnProperty,
      P = A.toString,
      H = P.call(Object),
      $ = {},
      K = function (s) {
        return (
          typeof s == "function" &&
          typeof s.nodeType != "number" &&
          typeof s.item != "function"
        );
      },
      de = function (s) {
        return s != null && s === s.window;
      },
      L = t.document,
      U = { type: !0, src: !0, nonce: !0, noModule: !0 };
    function ye(i, s, u) {
      u = u || L;
      var h,
        b,
        v = u.createElement("script");
      if (((v.text = i), s))
        for (h in U)
          (b = s[h] || (s.getAttribute && s.getAttribute(h))),
            b && v.setAttribute(h, b);
      u.head.appendChild(v).parentNode.removeChild(v);
    }
    function J(i) {
      return i == null
        ? i + ""
        : typeof i == "object" || typeof i == "function"
        ? T[w.call(i)] || "object"
        : typeof i;
    }
    var X = "3.7.1",
      Se = /HTML$/i,
      f = function (i, s) {
        return new f.fn.init(i, s);
      };
    (f.fn = f.prototype =
      {
        jquery: X,
        constructor: f,
        length: 0,
        toArray: function () {
          return l.call(this);
        },
        get: function (i) {
          return i == null
            ? l.call(this)
            : i < 0
            ? this[i + this.length]
            : this[i];
        },
        pushStack: function (i) {
          var s = f.merge(this.constructor(), i);
          return (s.prevObject = this), s;
        },
        each: function (i) {
          return f.each(this, i);
        },
        map: function (i) {
          return this.pushStack(
            f.map(this, function (s, u) {
              return i.call(s, u, s);
            })
          );
        },
        slice: function () {
          return this.pushStack(l.apply(this, arguments));
        },
        first: function () {
          return this.eq(0);
        },
        last: function () {
          return this.eq(-1);
        },
        even: function () {
          return this.pushStack(
            f.grep(this, function (i, s) {
              return (s + 1) % 2;
            })
          );
        },
        odd: function () {
          return this.pushStack(
            f.grep(this, function (i, s) {
              return s % 2;
            })
          );
        },
        eq: function (i) {
          var s = this.length,
            u = +i + (i < 0 ? s : 0);
          return this.pushStack(u >= 0 && u < s ? [this[u]] : []);
        },
        end: function () {
          return this.prevObject || this.constructor();
        },
        push: g,
        sort: r.sort,
        splice: r.splice,
      }),
      (f.extend = f.fn.extend =
        function () {
          var i,
            s,
            u,
            h,
            b,
            v,
            x = arguments[0] || {},
            O = 1,
            R = arguments.length,
            F = !1;
          for (
            typeof x == "boolean" && ((F = x), (x = arguments[O] || {}), O++),
              typeof x != "object" && !K(x) && (x = {}),
              O === R && ((x = this), O--);
            O < R;
            O++
          )
            if ((i = arguments[O]) != null)
              for (s in i)
                (h = i[s]),
                  !(s === "__proto__" || x === h) &&
                    (F && h && (f.isPlainObject(h) || (b = Array.isArray(h)))
                      ? ((u = x[s]),
                        b && !Array.isArray(u)
                          ? (v = [])
                          : !b && !f.isPlainObject(u)
                          ? (v = {})
                          : (v = u),
                        (b = !1),
                        (x[s] = f.extend(F, v, h)))
                      : h !== void 0 && (x[s] = h));
          return x;
        }),
      f.extend({
        expando: "jQuery" + (X + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function (i) {
          throw new Error(i);
        },
        noop: function () {},
        isPlainObject: function (i) {
          var s, u;
          return !i || w.call(i) !== "[object Object]"
            ? !1
            : ((s = o(i)),
              s
                ? ((u = A.call(s, "constructor") && s.constructor),
                  typeof u == "function" && P.call(u) === H)
                : !0);
        },
        isEmptyObject: function (i) {
          var s;
          for (s in i) return !1;
          return !0;
        },
        globalEval: function (i, s, u) {
          ye(i, { nonce: s && s.nonce }, u);
        },
        each: function (i, s) {
          var u,
            h = 0;
          if (ve(i))
            for (u = i.length; h < u && s.call(i[h], h, i[h]) !== !1; h++);
          else for (h in i) if (s.call(i[h], h, i[h]) === !1) break;
          return i;
        },
        text: function (i) {
          var s,
            u = "",
            h = 0,
            b = i.nodeType;
          if (!b) for (; (s = i[h++]); ) u += f.text(s);
          return b === 1 || b === 11
            ? i.textContent
            : b === 9
            ? i.documentElement.textContent
            : b === 3 || b === 4
            ? i.nodeValue
            : u;
        },
        makeArray: function (i, s) {
          var u = s || [];
          return (
            i != null &&
              (ve(Object(i))
                ? f.merge(u, typeof i == "string" ? [i] : i)
                : g.call(u, i)),
            u
          );
        },
        inArray: function (i, s, u) {
          return s == null ? -1 : y.call(s, i, u);
        },
        isXMLDoc: function (i) {
          var s = i && i.namespaceURI,
            u = i && (i.ownerDocument || i).documentElement;
          return !Se.test(s || (u && u.nodeName) || "HTML");
        },
        merge: function (i, s) {
          for (var u = +s.length, h = 0, b = i.length; h < u; h++)
            i[b++] = s[h];
          return (i.length = b), i;
        },
        grep: function (i, s, u) {
          for (var h, b = [], v = 0, x = i.length, O = !u; v < x; v++)
            (h = !s(i[v], v)), h !== O && b.push(i[v]);
          return b;
        },
        map: function (i, s, u) {
          var h,
            b,
            v = 0,
            x = [];
          if (ve(i))
            for (h = i.length; v < h; v++)
              (b = s(i[v], v, u)), b != null && x.push(b);
          else for (v in i) (b = s(i[v], v, u)), b != null && x.push(b);
          return p(x);
        },
        guid: 1,
        support: $,
      }),
      typeof Symbol == "function" &&
        (f.fn[Symbol.iterator] = r[Symbol.iterator]),
      f.each(
        "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
          " "
        ),
        function (i, s) {
          T["[object " + s + "]"] = s.toLowerCase();
        }
      );
    function ve(i) {
      var s = !!i && "length" in i && i.length,
        u = J(i);
      return K(i) || de(i)
        ? !1
        : u === "array" ||
            s === 0 ||
            (typeof s == "number" && s > 0 && s - 1 in i);
    }
    function C(i, s) {
      return i.nodeName && i.nodeName.toLowerCase() === s.toLowerCase();
    }
    var Ue = r.pop,
      We = r.sort,
      Le = r.splice,
      Ee = "[\\x20\\t\\r\\n\\f]",
      ue = new RegExp(
        "^" + Ee + "+|((?:^|[^\\\\])(?:\\\\.)*)" + Ee + "+$",
        "g"
      );
    f.contains = function (i, s) {
      var u = s && s.parentNode;
      return (
        i === u ||
        !!(
          u &&
          u.nodeType === 1 &&
          (i.contains
            ? i.contains(u)
            : i.compareDocumentPosition && i.compareDocumentPosition(u) & 16)
        )
      );
    };
    var vt = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
    function ze(i, s) {
      return s
        ? i === "\0"
          ? "�"
          : i.slice(0, -1) +
            "\\" +
            i.charCodeAt(i.length - 1).toString(16) +
            " "
        : "\\" + i;
    }
    f.escapeSelector = function (i) {
      return (i + "").replace(vt, ze);
    };
    var ae = L,
      Qe = g;
    (function () {
      var i,
        s,
        u,
        h,
        b,
        v = Qe,
        x,
        O,
        R,
        F,
        Q,
        ee = f.expando,
        W = 0,
        oe = 0,
        Be = es(),
        it = es(),
        Ye = es(),
        $t = es(),
        Ot = function (S, j) {
          return S === j && (b = !0), 0;
        },
        Sn =
          "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        Pn =
          "(?:\\\\[\\da-fA-F]{1,6}" +
          Ee +
          "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
        tt =
          "\\[" +
          Ee +
          "*(" +
          Pn +
          ")(?:" +
          Ee +
          "*([*^$|!~]?=)" +
          Ee +
          `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` +
          Pn +
          "))|)" +
          Ee +
          "*\\]",
        vi =
          ":(" +
          Pn +
          `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` +
          tt +
          ")*)|.*)\\)|)",
        rt = new RegExp(Ee + "+", "g"),
        Ct = new RegExp("^" + Ee + "*," + Ee + "*"),
        xr = new RegExp("^" + Ee + "*([>+~]|" + Ee + ")" + Ee + "*"),
        fo = new RegExp(Ee + "|>"),
        Rn = new RegExp(vi),
        Tr = new RegExp("^" + Pn + "$"),
        In = {
          ID: new RegExp("^#(" + Pn + ")"),
          CLASS: new RegExp("^\\.(" + Pn + ")"),
          TAG: new RegExp("^(" + Pn + "|[*])"),
          ATTR: new RegExp("^" + tt),
          PSEUDO: new RegExp("^" + vi),
          CHILD: new RegExp(
            "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
              Ee +
              "*(even|odd|(([+-]|)(\\d*)n|)" +
              Ee +
              "*(?:([+-]|)" +
              Ee +
              "*(\\d+)|))" +
              Ee +
              "*\\)|)",
            "i"
          ),
          bool: new RegExp("^(?:" + Sn + ")$", "i"),
          needsContext: new RegExp(
            "^" +
              Ee +
              "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
              Ee +
              "*((?:-\\d)?\\d*)" +
              Ee +
              "*\\)|)(?=[^-]|$)",
            "i"
          ),
        },
        Gn = /^(?:input|select|textarea|button)$/i,
        Xn = /^h\d$/i,
        hn = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        ho = /[+~]/,
        $n = new RegExp(
          "\\\\[\\da-fA-F]{1,6}" + Ee + "?|\\\\([^\\r\\n\\f])",
          "g"
        ),
        qn = function (S, j) {
          var q = "0x" + S.slice(1) - 65536;
          return (
            j ||
            (q < 0
              ? String.fromCharCode(q + 65536)
              : String.fromCharCode((q >> 10) | 55296, (q & 1023) | 56320))
          );
        },
        bh = function () {
          Zn();
        },
        vh = ns(
          function (S) {
            return S.disabled === !0 && C(S, "fieldset");
          },
          { dir: "parentNode", next: "legend" }
        );
      function wh() {
        try {
          return x.activeElement;
        } catch {}
      }
      try {
        v.apply((r = l.call(ae.childNodes)), ae.childNodes),
          r[ae.childNodes.length].nodeType;
      } catch {
        v = {
          apply: function (j, q) {
            Qe.apply(j, l.call(q));
          },
          call: function (j) {
            Qe.apply(j, l.call(arguments, 1));
          },
        };
      }
      function ct(S, j, q, Y) {
        var Z,
          me,
          we,
          Re,
          xe,
          Xe,
          De,
          $e = j && j.ownerDocument,
          Ze = j ? j.nodeType : 9;
        if (
          ((q = q || []),
          typeof S != "string" || !S || (Ze !== 1 && Ze !== 9 && Ze !== 11))
        )
          return q;
        if (!Y && (Zn(j), (j = j || x), R)) {
          if (Ze !== 11 && (xe = hn.exec(S)))
            if ((Z = xe[1])) {
              if (Ze === 9)
                if ((we = j.getElementById(Z))) {
                  if (we.id === Z) return v.call(q, we), q;
                } else return q;
              else if (
                $e &&
                (we = $e.getElementById(Z)) &&
                ct.contains(j, we) &&
                we.id === Z
              )
                return v.call(q, we), q;
            } else {
              if (xe[2]) return v.apply(q, j.getElementsByTagName(S)), q;
              if ((Z = xe[3]) && j.getElementsByClassName)
                return v.apply(q, j.getElementsByClassName(Z)), q;
            }
          if (!$t[S + " "] && (!F || !F.test(S))) {
            if (((De = S), ($e = j), Ze === 1 && (fo.test(S) || xr.test(S)))) {
              for (
                $e = (ho.test(S) && po(j.parentNode)) || j,
                  ($e != j || !$.scope) &&
                    ((Re = j.getAttribute("id"))
                      ? (Re = f.escapeSelector(Re))
                      : j.setAttribute("id", (Re = ee))),
                  Xe = _r(S),
                  me = Xe.length;
                me--;

              )
                Xe[me] = (Re ? "#" + Re : ":scope") + " " + ts(Xe[me]);
              De = Xe.join(",");
            }
            try {
              return v.apply(q, $e.querySelectorAll(De)), q;
            } catch {
              $t(S, !0);
            } finally {
              Re === ee && j.removeAttribute("id");
            }
          }
        }
        return gl(S.replace(ue, "$1"), j, q, Y);
      }
      function es() {
        var S = [];
        function j(q, Y) {
          return (
            S.push(q + " ") > s.cacheLength && delete j[S.shift()],
            (j[q + " "] = Y)
          );
        }
        return j;
      }
      function wn(S) {
        return (S[ee] = !0), S;
      }
      function Bi(S) {
        var j = x.createElement("fieldset");
        try {
          return !!S(j);
        } catch {
          return !1;
        } finally {
          j.parentNode && j.parentNode.removeChild(j), (j = null);
        }
      }
      function xh(S) {
        return function (j) {
          return C(j, "input") && j.type === S;
        };
      }
      function Th(S) {
        return function (j) {
          return (C(j, "input") || C(j, "button")) && j.type === S;
        };
      }
      function dl(S) {
        return function (j) {
          return "form" in j
            ? j.parentNode && j.disabled === !1
              ? "label" in j
                ? "label" in j.parentNode
                  ? j.parentNode.disabled === S
                  : j.disabled === S
                : j.isDisabled === S || (j.isDisabled !== !S && vh(j) === S)
              : j.disabled === S
            : "label" in j
            ? j.disabled === S
            : !1;
        };
      }
      function wi(S) {
        return wn(function (j) {
          return (
            (j = +j),
            wn(function (q, Y) {
              for (var Z, me = S([], q.length, j), we = me.length; we--; )
                q[(Z = me[we])] && (q[Z] = !(Y[Z] = q[Z]));
            })
          );
        });
      }
      function po(S) {
        return S && typeof S.getElementsByTagName < "u" && S;
      }
      function Zn(S) {
        var j,
          q = S ? S.ownerDocument || S : ae;
        return (
          q == x ||
            q.nodeType !== 9 ||
            !q.documentElement ||
            ((x = q),
            (O = x.documentElement),
            (R = !f.isXMLDoc(x)),
            (Q = O.matches || O.webkitMatchesSelector || O.msMatchesSelector),
            O.msMatchesSelector &&
              ae != x &&
              (j = x.defaultView) &&
              j.top !== j &&
              j.addEventListener("unload", bh),
            ($.getById = Bi(function (Y) {
              return (
                (O.appendChild(Y).id = f.expando),
                !x.getElementsByName || !x.getElementsByName(f.expando).length
              );
            })),
            ($.disconnectedMatch = Bi(function (Y) {
              return Q.call(Y, "*");
            })),
            ($.scope = Bi(function () {
              return x.querySelectorAll(":scope");
            })),
            ($.cssHas = Bi(function () {
              try {
                return x.querySelector(":has(*,:jqfake)"), !1;
              } catch {
                return !0;
              }
            })),
            $.getById
              ? ((s.filter.ID = function (Y) {
                  var Z = Y.replace($n, qn);
                  return function (me) {
                    return me.getAttribute("id") === Z;
                  };
                }),
                (s.find.ID = function (Y, Z) {
                  if (typeof Z.getElementById < "u" && R) {
                    var me = Z.getElementById(Y);
                    return me ? [me] : [];
                  }
                }))
              : ((s.filter.ID = function (Y) {
                  var Z = Y.replace($n, qn);
                  return function (me) {
                    var we =
                      typeof me.getAttributeNode < "u" &&
                      me.getAttributeNode("id");
                    return we && we.value === Z;
                  };
                }),
                (s.find.ID = function (Y, Z) {
                  if (typeof Z.getElementById < "u" && R) {
                    var me,
                      we,
                      Re,
                      xe = Z.getElementById(Y);
                    if (xe) {
                      if (
                        ((me = xe.getAttributeNode("id")), me && me.value === Y)
                      )
                        return [xe];
                      for (
                        Re = Z.getElementsByName(Y), we = 0;
                        (xe = Re[we++]);

                      )
                        if (
                          ((me = xe.getAttributeNode("id")),
                          me && me.value === Y)
                        )
                          return [xe];
                    }
                    return [];
                  }
                })),
            (s.find.TAG = function (Y, Z) {
              return typeof Z.getElementsByTagName < "u"
                ? Z.getElementsByTagName(Y)
                : Z.querySelectorAll(Y);
            }),
            (s.find.CLASS = function (Y, Z) {
              if (typeof Z.getElementsByClassName < "u" && R)
                return Z.getElementsByClassName(Y);
            }),
            (F = []),
            Bi(function (Y) {
              var Z;
              (O.appendChild(Y).innerHTML =
                "<a id='" +
                ee +
                "' href='' disabled='disabled'></a><select id='" +
                ee +
                "-\r\\' disabled='disabled'><option selected=''></option></select>"),
                Y.querySelectorAll("[selected]").length ||
                  F.push("\\[" + Ee + "*(?:value|" + Sn + ")"),
                Y.querySelectorAll("[id~=" + ee + "-]").length || F.push("~="),
                Y.querySelectorAll("a#" + ee + "+*").length ||
                  F.push(".#.+[+~]"),
                Y.querySelectorAll(":checked").length || F.push(":checked"),
                (Z = x.createElement("input")),
                Z.setAttribute("type", "hidden"),
                Y.appendChild(Z).setAttribute("name", "D"),
                (O.appendChild(Y).disabled = !0),
                Y.querySelectorAll(":disabled").length !== 2 &&
                  F.push(":enabled", ":disabled"),
                (Z = x.createElement("input")),
                Z.setAttribute("name", ""),
                Y.appendChild(Z),
                Y.querySelectorAll("[name='']").length ||
                  F.push("\\[" + Ee + "*name" + Ee + "*=" + Ee + `*(?:''|"")`);
            }),
            $.cssHas || F.push(":has"),
            (F = F.length && new RegExp(F.join("|"))),
            (Ot = function (Y, Z) {
              if (Y === Z) return (b = !0), 0;
              var me = !Y.compareDocumentPosition - !Z.compareDocumentPosition;
              return (
                me ||
                ((me =
                  (Y.ownerDocument || Y) == (Z.ownerDocument || Z)
                    ? Y.compareDocumentPosition(Z)
                    : 1),
                me & 1 ||
                (!$.sortDetached && Z.compareDocumentPosition(Y) === me)
                  ? Y === x || (Y.ownerDocument == ae && ct.contains(ae, Y))
                    ? -1
                    : Z === x || (Z.ownerDocument == ae && ct.contains(ae, Z))
                    ? 1
                    : h
                    ? y.call(h, Y) - y.call(h, Z)
                    : 0
                  : me & 4
                  ? -1
                  : 1)
              );
            })),
          x
        );
      }
      (ct.matches = function (S, j) {
        return ct(S, null, null, j);
      }),
        (ct.matchesSelector = function (S, j) {
          if ((Zn(S), R && !$t[j + " "] && (!F || !F.test(j))))
            try {
              var q = Q.call(S, j);
              if (
                q ||
                $.disconnectedMatch ||
                (S.document && S.document.nodeType !== 11)
              )
                return q;
            } catch {
              $t(j, !0);
            }
          return ct(j, x, null, [S]).length > 0;
        }),
        (ct.contains = function (S, j) {
          return (S.ownerDocument || S) != x && Zn(S), f.contains(S, j);
        }),
        (ct.attr = function (S, j) {
          (S.ownerDocument || S) != x && Zn(S);
          var q = s.attrHandle[j.toLowerCase()],
            Y =
              q && A.call(s.attrHandle, j.toLowerCase()) ? q(S, j, !R) : void 0;
          return Y !== void 0 ? Y : S.getAttribute(j);
        }),
        (ct.error = function (S) {
          throw new Error("Syntax error, unrecognized expression: " + S);
        }),
        (f.uniqueSort = function (S) {
          var j,
            q = [],
            Y = 0,
            Z = 0;
          if (
            ((b = !$.sortStable),
            (h = !$.sortStable && l.call(S, 0)),
            We.call(S, Ot),
            b)
          ) {
            for (; (j = S[Z++]); ) j === S[Z] && (Y = q.push(Z));
            for (; Y--; ) Le.call(S, q[Y], 1);
          }
          return (h = null), S;
        }),
        (f.fn.uniqueSort = function () {
          return this.pushStack(f.uniqueSort(l.apply(this)));
        }),
        (s = f.expr =
          {
            cacheLength: 50,
            createPseudo: wn,
            match: In,
            attrHandle: {},
            find: {},
            relative: {
              ">": { dir: "parentNode", first: !0 },
              " ": { dir: "parentNode" },
              "+": { dir: "previousSibling", first: !0 },
              "~": { dir: "previousSibling" },
            },
            preFilter: {
              ATTR: function (S) {
                return (
                  (S[1] = S[1].replace($n, qn)),
                  (S[3] = (S[3] || S[4] || S[5] || "").replace($n, qn)),
                  S[2] === "~=" && (S[3] = " " + S[3] + " "),
                  S.slice(0, 4)
                );
              },
              CHILD: function (S) {
                return (
                  (S[1] = S[1].toLowerCase()),
                  S[1].slice(0, 3) === "nth"
                    ? (S[3] || ct.error(S[0]),
                      (S[4] = +(S[4]
                        ? S[5] + (S[6] || 1)
                        : 2 * (S[3] === "even" || S[3] === "odd"))),
                      (S[5] = +(S[7] + S[8] || S[3] === "odd")))
                    : S[3] && ct.error(S[0]),
                  S
                );
              },
              PSEUDO: function (S) {
                var j,
                  q = !S[6] && S[2];
                return In.CHILD.test(S[0])
                  ? null
                  : (S[3]
                      ? (S[2] = S[4] || S[5] || "")
                      : q &&
                        Rn.test(q) &&
                        (j = _r(q, !0)) &&
                        (j = q.indexOf(")", q.length - j) - q.length) &&
                        ((S[0] = S[0].slice(0, j)), (S[2] = q.slice(0, j))),
                    S.slice(0, 3));
              },
            },
            filter: {
              TAG: function (S) {
                var j = S.replace($n, qn).toLowerCase();
                return S === "*"
                  ? function () {
                      return !0;
                    }
                  : function (q) {
                      return C(q, j);
                    };
              },
              CLASS: function (S) {
                var j = Be[S + " "];
                return (
                  j ||
                  ((j = new RegExp("(^|" + Ee + ")" + S + "(" + Ee + "|$)")) &&
                    Be(S, function (q) {
                      return j.test(
                        (typeof q.className == "string" && q.className) ||
                          (typeof q.getAttribute < "u" &&
                            q.getAttribute("class")) ||
                          ""
                      );
                    }))
                );
              },
              ATTR: function (S, j, q) {
                return function (Y) {
                  var Z = ct.attr(Y, S);
                  return Z == null
                    ? j === "!="
                    : j
                    ? ((Z += ""),
                      j === "="
                        ? Z === q
                        : j === "!="
                        ? Z !== q
                        : j === "^="
                        ? q && Z.indexOf(q) === 0
                        : j === "*="
                        ? q && Z.indexOf(q) > -1
                        : j === "$="
                        ? q && Z.slice(-q.length) === q
                        : j === "~="
                        ? (" " + Z.replace(rt, " ") + " ").indexOf(q) > -1
                        : j === "|="
                        ? Z === q || Z.slice(0, q.length + 1) === q + "-"
                        : !1)
                    : !0;
                };
              },
              CHILD: function (S, j, q, Y, Z) {
                var me = S.slice(0, 3) !== "nth",
                  we = S.slice(-4) !== "last",
                  Re = j === "of-type";
                return Y === 1 && Z === 0
                  ? function (xe) {
                      return !!xe.parentNode;
                    }
                  : function (xe, Xe, De) {
                      var $e,
                        Ze,
                        Me,
                        gt,
                        Gt,
                        Wt = me !== we ? "nextSibling" : "previousSibling",
                        dn = xe.parentNode,
                        Nn = Re && xe.nodeName.toLowerCase(),
                        Fi = !De && !Re,
                        Kt = !1;
                      if (dn) {
                        if (me) {
                          for (; Wt; ) {
                            for (Me = xe; (Me = Me[Wt]); )
                              if (Re ? C(Me, Nn) : Me.nodeType === 1) return !1;
                            Gt = Wt = S === "only" && !Gt && "nextSibling";
                          }
                          return !0;
                        }
                        if (
                          ((Gt = [we ? dn.firstChild : dn.lastChild]), we && Fi)
                        ) {
                          for (
                            Ze = dn[ee] || (dn[ee] = {}),
                              $e = Ze[S] || [],
                              gt = $e[0] === W && $e[1],
                              Kt = gt && $e[2],
                              Me = gt && dn.childNodes[gt];
                            (Me =
                              (++gt && Me && Me[Wt]) ||
                              (Kt = gt = 0) ||
                              Gt.pop());

                          )
                            if (Me.nodeType === 1 && ++Kt && Me === xe) {
                              Ze[S] = [W, gt, Kt];
                              break;
                            }
                        } else if (
                          (Fi &&
                            ((Ze = xe[ee] || (xe[ee] = {})),
                            ($e = Ze[S] || []),
                            (gt = $e[0] === W && $e[1]),
                            (Kt = gt)),
                          Kt === !1)
                        )
                          for (
                            ;
                            (Me =
                              (++gt && Me && Me[Wt]) ||
                              (Kt = gt = 0) ||
                              Gt.pop()) &&
                            !(
                              (Re ? C(Me, Nn) : Me.nodeType === 1) &&
                              ++Kt &&
                              (Fi &&
                                ((Ze = Me[ee] || (Me[ee] = {})),
                                (Ze[S] = [W, Kt])),
                              Me === xe)
                            );

                          );
                        return (
                          (Kt -= Z), Kt === Y || (Kt % Y === 0 && Kt / Y >= 0)
                        );
                      }
                    };
              },
              PSEUDO: function (S, j) {
                var q,
                  Y =
                    s.pseudos[S] ||
                    s.setFilters[S.toLowerCase()] ||
                    ct.error("unsupported pseudo: " + S);
                return Y[ee]
                  ? Y(j)
                  : Y.length > 1
                  ? ((q = [S, S, "", j]),
                    s.setFilters.hasOwnProperty(S.toLowerCase())
                      ? wn(function (Z, me) {
                          for (var we, Re = Y(Z, j), xe = Re.length; xe--; )
                            (we = y.call(Z, Re[xe])),
                              (Z[we] = !(me[we] = Re[xe]));
                        })
                      : function (Z) {
                          return Y(Z, 0, q);
                        })
                  : Y;
              },
            },
            pseudos: {
              not: wn(function (S) {
                var j = [],
                  q = [],
                  Y = bo(S.replace(ue, "$1"));
                return Y[ee]
                  ? wn(function (Z, me, we, Re) {
                      for (
                        var xe, Xe = Y(Z, null, Re, []), De = Z.length;
                        De--;

                      )
                        (xe = Xe[De]) && (Z[De] = !(me[De] = xe));
                    })
                  : function (Z, me, we) {
                      return (
                        (j[0] = Z), Y(j, null, we, q), (j[0] = null), !q.pop()
                      );
                    };
              }),
              has: wn(function (S) {
                return function (j) {
                  return ct(S, j).length > 0;
                };
              }),
              contains: wn(function (S) {
                return (
                  (S = S.replace($n, qn)),
                  function (j) {
                    return (j.textContent || f.text(j)).indexOf(S) > -1;
                  }
                );
              }),
              lang: wn(function (S) {
                return (
                  Tr.test(S || "") || ct.error("unsupported lang: " + S),
                  (S = S.replace($n, qn).toLowerCase()),
                  function (j) {
                    var q;
                    do
                      if (
                        (q = R
                          ? j.lang
                          : j.getAttribute("xml:lang") ||
                            j.getAttribute("lang"))
                      )
                        return (
                          (q = q.toLowerCase()),
                          q === S || q.indexOf(S + "-") === 0
                        );
                    while ((j = j.parentNode) && j.nodeType === 1);
                    return !1;
                  }
                );
              }),
              target: function (S) {
                var j = t.location && t.location.hash;
                return j && j.slice(1) === S.id;
              },
              root: function (S) {
                return S === O;
              },
              focus: function (S) {
                return (
                  S === wh() &&
                  x.hasFocus() &&
                  !!(S.type || S.href || ~S.tabIndex)
                );
              },
              enabled: dl(!1),
              disabled: dl(!0),
              checked: function (S) {
                return (
                  (C(S, "input") && !!S.checked) ||
                  (C(S, "option") && !!S.selected)
                );
              },
              selected: function (S) {
                return (
                  S.parentNode && S.parentNode.selectedIndex, S.selected === !0
                );
              },
              empty: function (S) {
                for (S = S.firstChild; S; S = S.nextSibling)
                  if (S.nodeType < 6) return !1;
                return !0;
              },
              parent: function (S) {
                return !s.pseudos.empty(S);
              },
              header: function (S) {
                return Xn.test(S.nodeName);
              },
              input: function (S) {
                return Gn.test(S.nodeName);
              },
              button: function (S) {
                return (C(S, "input") && S.type === "button") || C(S, "button");
              },
              text: function (S) {
                var j;
                return (
                  C(S, "input") &&
                  S.type === "text" &&
                  ((j = S.getAttribute("type")) == null ||
                    j.toLowerCase() === "text")
                );
              },
              first: wi(function () {
                return [0];
              }),
              last: wi(function (S, j) {
                return [j - 1];
              }),
              eq: wi(function (S, j, q) {
                return [q < 0 ? q + j : q];
              }),
              even: wi(function (S, j) {
                for (var q = 0; q < j; q += 2) S.push(q);
                return S;
              }),
              odd: wi(function (S, j) {
                for (var q = 1; q < j; q += 2) S.push(q);
                return S;
              }),
              lt: wi(function (S, j, q) {
                var Y;
                for (
                  q < 0 ? (Y = q + j) : q > j ? (Y = j) : (Y = q);
                  --Y >= 0;

                )
                  S.push(Y);
                return S;
              }),
              gt: wi(function (S, j, q) {
                for (var Y = q < 0 ? q + j : q; ++Y < j; ) S.push(Y);
                return S;
              }),
            },
          }),
        (s.pseudos.nth = s.pseudos.eq);
      for (i in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 })
        s.pseudos[i] = xh(i);
      for (i in { submit: !0, reset: !0 }) s.pseudos[i] = Th(i);
      function pl() {}
      (pl.prototype = s.filters = s.pseudos), (s.setFilters = new pl());
      function _r(S, j) {
        var q,
          Y,
          Z,
          me,
          we,
          Re,
          xe,
          Xe = it[S + " "];
        if (Xe) return j ? 0 : Xe.slice(0);
        for (we = S, Re = [], xe = s.preFilter; we; ) {
          (!q || (Y = Ct.exec(we))) &&
            (Y && (we = we.slice(Y[0].length) || we), Re.push((Z = []))),
            (q = !1),
            (Y = xr.exec(we)) &&
              ((q = Y.shift()),
              Z.push({ value: q, type: Y[0].replace(ue, " ") }),
              (we = we.slice(q.length)));
          for (me in s.filter)
            (Y = In[me].exec(we)) &&
              (!xe[me] || (Y = xe[me](Y))) &&
              ((q = Y.shift()),
              Z.push({ value: q, type: me, matches: Y }),
              (we = we.slice(q.length)));
          if (!q) break;
        }
        return j ? we.length : we ? ct.error(S) : it(S, Re).slice(0);
      }
      function ts(S) {
        for (var j = 0, q = S.length, Y = ""; j < q; j++) Y += S[j].value;
        return Y;
      }
      function ns(S, j, q) {
        var Y = j.dir,
          Z = j.next,
          me = Z || Y,
          we = q && me === "parentNode",
          Re = oe++;
        return j.first
          ? function (xe, Xe, De) {
              for (; (xe = xe[Y]); )
                if (xe.nodeType === 1 || we) return S(xe, Xe, De);
              return !1;
            }
          : function (xe, Xe, De) {
              var $e,
                Ze,
                Me = [W, Re];
              if (De) {
                for (; (xe = xe[Y]); )
                  if ((xe.nodeType === 1 || we) && S(xe, Xe, De)) return !0;
              } else
                for (; (xe = xe[Y]); )
                  if (xe.nodeType === 1 || we)
                    if (((Ze = xe[ee] || (xe[ee] = {})), Z && C(xe, Z)))
                      xe = xe[Y] || xe;
                    else {
                      if (($e = Ze[me]) && $e[0] === W && $e[1] === Re)
                        return (Me[2] = $e[2]);
                      if (((Ze[me] = Me), (Me[2] = S(xe, Xe, De)))) return !0;
                    }
              return !1;
            };
      }
      function go(S) {
        return S.length > 1
          ? function (j, q, Y) {
              for (var Z = S.length; Z--; ) if (!S[Z](j, q, Y)) return !1;
              return !0;
            }
          : S[0];
      }
      function _h(S, j, q) {
        for (var Y = 0, Z = j.length; Y < Z; Y++) ct(S, j[Y], q);
        return q;
      }
      function is(S, j, q, Y, Z) {
        for (
          var me, we = [], Re = 0, xe = S.length, Xe = j != null;
          Re < xe;
          Re++
        )
          (me = S[Re]) &&
            (!q || q(me, Y, Z)) &&
            (we.push(me), Xe && j.push(Re));
        return we;
      }
      function mo(S, j, q, Y, Z, me) {
        return (
          Y && !Y[ee] && (Y = mo(Y)),
          Z && !Z[ee] && (Z = mo(Z, me)),
          wn(function (we, Re, xe, Xe) {
            var De,
              $e,
              Ze,
              Me,
              gt = [],
              Gt = [],
              Wt = Re.length,
              dn = we || _h(j || "*", xe.nodeType ? [xe] : xe, []),
              Nn = S && (we || !j) ? is(dn, gt, S, xe, Xe) : dn;
            if (
              (q
                ? ((Me = Z || (we ? S : Wt || Y) ? [] : Re), q(Nn, Me, xe, Xe))
                : (Me = Nn),
              Y)
            )
              for (De = is(Me, Gt), Y(De, [], xe, Xe), $e = De.length; $e--; )
                (Ze = De[$e]) && (Me[Gt[$e]] = !(Nn[Gt[$e]] = Ze));
            if (we) {
              if (Z || S) {
                if (Z) {
                  for (De = [], $e = Me.length; $e--; )
                    (Ze = Me[$e]) && De.push((Nn[$e] = Ze));
                  Z(null, (Me = []), De, Xe);
                }
                for ($e = Me.length; $e--; )
                  (Ze = Me[$e]) &&
                    (De = Z ? y.call(we, Ze) : gt[$e]) > -1 &&
                    (we[De] = !(Re[De] = Ze));
              }
            } else (Me = is(Me === Re ? Me.splice(Wt, Me.length) : Me)), Z ? Z(null, Re, Me, Xe) : v.apply(Re, Me);
          })
        );
      }
      function yo(S) {
        for (
          var j,
            q,
            Y,
            Z = S.length,
            me = s.relative[S[0].type],
            we = me || s.relative[" "],
            Re = me ? 1 : 0,
            xe = ns(
              function ($e) {
                return $e === j;
              },
              we,
              !0
            ),
            Xe = ns(
              function ($e) {
                return y.call(j, $e) > -1;
              },
              we,
              !0
            ),
            De = [
              function ($e, Ze, Me) {
                var gt =
                  (!me && (Me || Ze != u)) ||
                  ((j = Ze).nodeType ? xe($e, Ze, Me) : Xe($e, Ze, Me));
                return (j = null), gt;
              },
            ];
          Re < Z;
          Re++
        )
          if ((q = s.relative[S[Re].type])) De = [ns(go(De), q)];
          else {
            if (
              ((q = s.filter[S[Re].type].apply(null, S[Re].matches)), q[ee])
            ) {
              for (Y = ++Re; Y < Z && !s.relative[S[Y].type]; Y++);
              return mo(
                Re > 1 && go(De),
                Re > 1 &&
                  ts(
                    S.slice(0, Re - 1).concat({
                      value: S[Re - 2].type === " " ? "*" : "",
                    })
                  ).replace(ue, "$1"),
                q,
                Re < Y && yo(S.slice(Re, Y)),
                Y < Z && yo((S = S.slice(Y))),
                Y < Z && ts(S)
              );
            }
            De.push(q);
          }
        return go(De);
      }
      function Eh(S, j) {
        var q = j.length > 0,
          Y = S.length > 0,
          Z = function (me, we, Re, xe, Xe) {
            var De,
              $e,
              Ze,
              Me = 0,
              gt = "0",
              Gt = me && [],
              Wt = [],
              dn = u,
              Nn = me || (Y && s.find.TAG("*", Xe)),
              Fi = (W += dn == null ? 1 : Math.random() || 0.1),
              Kt = Nn.length;
            for (
              Xe && (u = we == x || we || Xe);
              gt !== Kt && (De = Nn[gt]) != null;
              gt++
            ) {
              if (Y && De) {
                for (
                  $e = 0, !we && De.ownerDocument != x && (Zn(De), (Re = !R));
                  (Ze = S[$e++]);

                )
                  if (Ze(De, we || x, Re)) {
                    v.call(xe, De);
                    break;
                  }
                Xe && (W = Fi);
              }
              q && ((De = !Ze && De) && Me--, me && Gt.push(De));
            }
            if (((Me += gt), q && gt !== Me)) {
              for ($e = 0; (Ze = j[$e++]); ) Ze(Gt, Wt, we, Re);
              if (me) {
                if (Me > 0)
                  for (; gt--; ) Gt[gt] || Wt[gt] || (Wt[gt] = Ue.call(xe));
                Wt = is(Wt);
              }
              v.apply(xe, Wt),
                Xe &&
                  !me &&
                  Wt.length > 0 &&
                  Me + j.length > 1 &&
                  f.uniqueSort(xe);
            }
            return Xe && ((W = Fi), (u = dn)), Gt;
          };
        return q ? wn(Z) : Z;
      }
      function bo(S, j) {
        var q,
          Y = [],
          Z = [],
          me = Ye[S + " "];
        if (!me) {
          for (j || (j = _r(S)), q = j.length; q--; )
            (me = yo(j[q])), me[ee] ? Y.push(me) : Z.push(me);
          (me = Ye(S, Eh(Z, Y))), (me.selector = S);
        }
        return me;
      }
      function gl(S, j, q, Y) {
        var Z,
          me,
          we,
          Re,
          xe,
          Xe = typeof S == "function" && S,
          De = !Y && _r((S = Xe.selector || S));
        if (((q = q || []), De.length === 1)) {
          if (
            ((me = De[0] = De[0].slice(0)),
            me.length > 2 &&
              (we = me[0]).type === "ID" &&
              j.nodeType === 9 &&
              R &&
              s.relative[me[1].type])
          ) {
            if (
              ((j = (s.find.ID(we.matches[0].replace($n, qn), j) || [])[0]), j)
            )
              Xe && (j = j.parentNode);
            else return q;
            S = S.slice(me.shift().value.length);
          }
          for (
            Z = In.needsContext.test(S) ? 0 : me.length;
            Z-- && ((we = me[Z]), !s.relative[(Re = we.type)]);

          )
            if (
              (xe = s.find[Re]) &&
              (Y = xe(
                we.matches[0].replace($n, qn),
                (ho.test(me[0].type) && po(j.parentNode)) || j
              ))
            ) {
              if ((me.splice(Z, 1), (S = Y.length && ts(me)), !S))
                return v.apply(q, Y), q;
              break;
            }
        }
        return (
          (Xe || bo(S, De))(
            Y,
            j,
            !R,
            q,
            !j || (ho.test(S) && po(j.parentNode)) || j
          ),
          q
        );
      }
      ($.sortStable = ee.split("").sort(Ot).join("") === ee),
        Zn(),
        ($.sortDetached = Bi(function (S) {
          return S.compareDocumentPosition(x.createElement("fieldset")) & 1;
        })),
        (f.find = ct),
        (f.expr[":"] = f.expr.pseudos),
        (f.unique = f.uniqueSort),
        (ct.compile = bo),
        (ct.select = gl),
        (ct.setDocument = Zn),
        (ct.tokenize = _r),
        (ct.escape = f.escapeSelector),
        (ct.getText = f.text),
        (ct.isXML = f.isXMLDoc),
        (ct.selectors = f.expr),
        (ct.support = f.support),
        (ct.uniqueSort = f.uniqueSort);
    })();
    var ht = function (i, s, u) {
        for (var h = [], b = u !== void 0; (i = i[s]) && i.nodeType !== 9; )
          if (i.nodeType === 1) {
            if (b && f(i).is(u)) break;
            h.push(i);
          }
        return h;
      },
      Ut = function (i, s) {
        for (var u = []; i; i = i.nextSibling)
          i.nodeType === 1 && i !== s && u.push(i);
        return u;
      },
      Mt = f.expr.match.needsContext,
      ft = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    function Lt(i, s, u) {
      return K(s)
        ? f.grep(i, function (h, b) {
            return !!s.call(h, b, h) !== u;
          })
        : s.nodeType
        ? f.grep(i, function (h) {
            return (h === s) !== u;
          })
        : typeof s != "string"
        ? f.grep(i, function (h) {
            return y.call(s, h) > -1 !== u;
          })
        : f.filter(s, i, u);
    }
    (f.filter = function (i, s, u) {
      var h = s[0];
      return (
        u && (i = ":not(" + i + ")"),
        s.length === 1 && h.nodeType === 1
          ? f.find.matchesSelector(h, i)
            ? [h]
            : []
          : f.find.matches(
              i,
              f.grep(s, function (b) {
                return b.nodeType === 1;
              })
            )
      );
    }),
      f.fn.extend({
        find: function (i) {
          var s,
            u,
            h = this.length,
            b = this;
          if (typeof i != "string")
            return this.pushStack(
              f(i).filter(function () {
                for (s = 0; s < h; s++) if (f.contains(b[s], this)) return !0;
              })
            );
          for (u = this.pushStack([]), s = 0; s < h; s++) f.find(i, b[s], u);
          return h > 1 ? f.uniqueSort(u) : u;
        },
        filter: function (i) {
          return this.pushStack(Lt(this, i || [], !1));
        },
        not: function (i) {
          return this.pushStack(Lt(this, i || [], !0));
        },
        is: function (i) {
          return !!Lt(
            this,
            typeof i == "string" && Mt.test(i) ? f(i) : i || [],
            !1
          ).length;
        },
      });
    var Ve,
      vn = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
      dt = (f.fn.init = function (i, s, u) {
        var h, b;
        if (!i) return this;
        if (((u = u || Ve), typeof i == "string"))
          if (
            (i[0] === "<" && i[i.length - 1] === ">" && i.length >= 3
              ? (h = [null, i, null])
              : (h = vn.exec(i)),
            h && (h[1] || !s))
          )
            if (h[1]) {
              if (
                ((s = s instanceof f ? s[0] : s),
                f.merge(
                  this,
                  f.parseHTML(
                    h[1],
                    s && s.nodeType ? s.ownerDocument || s : L,
                    !0
                  )
                ),
                ft.test(h[1]) && f.isPlainObject(s))
              )
                for (h in s) K(this[h]) ? this[h](s[h]) : this.attr(h, s[h]);
              return this;
            } else
              return (
                (b = L.getElementById(h[2])),
                b && ((this[0] = b), (this.length = 1)),
                this
              );
          else
            return !s || s.jquery
              ? (s || u).find(i)
              : this.constructor(s).find(i);
        else {
          if (i.nodeType) return (this[0] = i), (this.length = 1), this;
          if (K(i)) return u.ready !== void 0 ? u.ready(i) : i(f);
        }
        return f.makeArray(i, this);
      });
    (dt.prototype = f.fn), (Ve = f(L));
    var te = /^(?:parents|prev(?:Until|All))/,
      he = { children: !0, contents: !0, next: !0, prev: !0 };
    f.fn.extend({
      has: function (i) {
        var s = f(i, this),
          u = s.length;
        return this.filter(function () {
          for (var h = 0; h < u; h++) if (f.contains(this, s[h])) return !0;
        });
      },
      closest: function (i, s) {
        var u,
          h = 0,
          b = this.length,
          v = [],
          x = typeof i != "string" && f(i);
        if (!Mt.test(i)) {
          for (; h < b; h++)
            for (u = this[h]; u && u !== s; u = u.parentNode)
              if (
                u.nodeType < 11 &&
                (x
                  ? x.index(u) > -1
                  : u.nodeType === 1 && f.find.matchesSelector(u, i))
              ) {
                v.push(u);
                break;
              }
        }
        return this.pushStack(v.length > 1 ? f.uniqueSort(v) : v);
      },
      index: function (i) {
        return i
          ? typeof i == "string"
            ? y.call(f(i), this[0])
            : y.call(this, i.jquery ? i[0] : i)
          : this[0] && this[0].parentNode
          ? this.first().prevAll().length
          : -1;
      },
      add: function (i, s) {
        return this.pushStack(f.uniqueSort(f.merge(this.get(), f(i, s))));
      },
      addBack: function (i) {
        return this.add(
          i == null ? this.prevObject : this.prevObject.filter(i)
        );
      },
    });
    function ge(i, s) {
      for (; (i = i[s]) && i.nodeType !== 1; );
      return i;
    }
    f.each(
      {
        parent: function (i) {
          var s = i.parentNode;
          return s && s.nodeType !== 11 ? s : null;
        },
        parents: function (i) {
          return ht(i, "parentNode");
        },
        parentsUntil: function (i, s, u) {
          return ht(i, "parentNode", u);
        },
        next: function (i) {
          return ge(i, "nextSibling");
        },
        prev: function (i) {
          return ge(i, "previousSibling");
        },
        nextAll: function (i) {
          return ht(i, "nextSibling");
        },
        prevAll: function (i) {
          return ht(i, "previousSibling");
        },
        nextUntil: function (i, s, u) {
          return ht(i, "nextSibling", u);
        },
        prevUntil: function (i, s, u) {
          return ht(i, "previousSibling", u);
        },
        siblings: function (i) {
          return Ut((i.parentNode || {}).firstChild, i);
        },
        children: function (i) {
          return Ut(i.firstChild);
        },
        contents: function (i) {
          return i.contentDocument != null && o(i.contentDocument)
            ? i.contentDocument
            : (C(i, "template") && (i = i.content || i),
              f.merge([], i.childNodes));
        },
      },
      function (i, s) {
        f.fn[i] = function (u, h) {
          var b = f.map(this, s, u);
          return (
            i.slice(-5) !== "Until" && (h = u),
            h && typeof h == "string" && (b = f.filter(h, b)),
            this.length > 1 &&
              (he[i] || f.uniqueSort(b), te.test(i) && b.reverse()),
            this.pushStack(b)
          );
        };
      }
    );
    var Ce = /[^\x20\t\r\n\f]+/g;
    function Oe(i) {
      var s = {};
      return (
        f.each(i.match(Ce) || [], function (u, h) {
          s[h] = !0;
        }),
        s
      );
    }
    f.Callbacks = function (i) {
      i = typeof i == "string" ? Oe(i) : f.extend({}, i);
      var s,
        u,
        h,
        b,
        v = [],
        x = [],
        O = -1,
        R = function () {
          for (b = b || i.once, h = s = !0; x.length; O = -1)
            for (u = x.shift(); ++O < v.length; )
              v[O].apply(u[0], u[1]) === !1 &&
                i.stopOnFalse &&
                ((O = v.length), (u = !1));
          i.memory || (u = !1), (s = !1), b && (u ? (v = []) : (v = ""));
        },
        F = {
          add: function () {
            return (
              v &&
                (u && !s && ((O = v.length - 1), x.push(u)),
                (function Q(ee) {
                  f.each(ee, function (W, oe) {
                    K(oe)
                      ? (!i.unique || !F.has(oe)) && v.push(oe)
                      : oe && oe.length && J(oe) !== "string" && Q(oe);
                  });
                })(arguments),
                u && !s && R()),
              this
            );
          },
          remove: function () {
            return (
              f.each(arguments, function (Q, ee) {
                for (var W; (W = f.inArray(ee, v, W)) > -1; )
                  v.splice(W, 1), W <= O && O--;
              }),
              this
            );
          },
          has: function (Q) {
            return Q ? f.inArray(Q, v) > -1 : v.length > 0;
          },
          empty: function () {
            return v && (v = []), this;
          },
          disable: function () {
            return (b = x = []), (v = u = ""), this;
          },
          disabled: function () {
            return !v;
          },
          lock: function () {
            return (b = x = []), !u && !s && (v = u = ""), this;
          },
          locked: function () {
            return !!b;
          },
          fireWith: function (Q, ee) {
            return (
              b ||
                ((ee = ee || []),
                (ee = [Q, ee.slice ? ee.slice() : ee]),
                x.push(ee),
                s || R()),
              this
            );
          },
          fire: function () {
            return F.fireWith(this, arguments), this;
          },
          fired: function () {
            return !!h;
          },
        };
      return F;
    };
    function I(i) {
      return i;
    }
    function M(i) {
      throw i;
    }
    function D(i, s, u, h) {
      var b;
      try {
        i && K((b = i.promise))
          ? b.call(i).done(s).fail(u)
          : i && K((b = i.then))
          ? b.call(i, s, u)
          : s.apply(void 0, [i].slice(h));
      } catch (v) {
        u.apply(void 0, [v]);
      }
    }
    f.extend({
      Deferred: function (i) {
        var s = [
            [
              "notify",
              "progress",
              f.Callbacks("memory"),
              f.Callbacks("memory"),
              2,
            ],
            [
              "resolve",
              "done",
              f.Callbacks("once memory"),
              f.Callbacks("once memory"),
              0,
              "resolved",
            ],
            [
              "reject",
              "fail",
              f.Callbacks("once memory"),
              f.Callbacks("once memory"),
              1,
              "rejected",
            ],
          ],
          u = "pending",
          h = {
            state: function () {
              return u;
            },
            always: function () {
              return b.done(arguments).fail(arguments), this;
            },
            catch: function (v) {
              return h.then(null, v);
            },
            pipe: function () {
              var v = arguments;
              return f
                .Deferred(function (x) {
                  f.each(s, function (O, R) {
                    var F = K(v[R[4]]) && v[R[4]];
                    b[R[1]](function () {
                      var Q = F && F.apply(this, arguments);
                      Q && K(Q.promise)
                        ? Q.promise()
                            .progress(x.notify)
                            .done(x.resolve)
                            .fail(x.reject)
                        : x[R[0] + "With"](this, F ? [Q] : arguments);
                    });
                  }),
                    (v = null);
                })
                .promise();
            },
            then: function (v, x, O) {
              var R = 0;
              function F(Q, ee, W, oe) {
                return function () {
                  var Be = this,
                    it = arguments,
                    Ye = function () {
                      var Ot, Sn;
                      if (!(Q < R)) {
                        if (((Ot = W.apply(Be, it)), Ot === ee.promise()))
                          throw new TypeError("Thenable self-resolution");
                        (Sn =
                          Ot &&
                          (typeof Ot == "object" || typeof Ot == "function") &&
                          Ot.then),
                          K(Sn)
                            ? oe
                              ? Sn.call(Ot, F(R, ee, I, oe), F(R, ee, M, oe))
                              : (R++,
                                Sn.call(
                                  Ot,
                                  F(R, ee, I, oe),
                                  F(R, ee, M, oe),
                                  F(R, ee, I, ee.notifyWith)
                                ))
                            : (W !== I && ((Be = void 0), (it = [Ot])),
                              (oe || ee.resolveWith)(Be, it));
                      }
                    },
                    $t = oe
                      ? Ye
                      : function () {
                          try {
                            Ye();
                          } catch (Ot) {
                            f.Deferred.exceptionHook &&
                              f.Deferred.exceptionHook(Ot, $t.error),
                              Q + 1 >= R &&
                                (W !== M && ((Be = void 0), (it = [Ot])),
                                ee.rejectWith(Be, it));
                          }
                        };
                  Q
                    ? $t()
                    : (f.Deferred.getErrorHook
                        ? ($t.error = f.Deferred.getErrorHook())
                        : f.Deferred.getStackHook &&
                          ($t.error = f.Deferred.getStackHook()),
                      t.setTimeout($t));
                };
              }
              return f
                .Deferred(function (Q) {
                  s[0][3].add(F(0, Q, K(O) ? O : I, Q.notifyWith)),
                    s[1][3].add(F(0, Q, K(v) ? v : I)),
                    s[2][3].add(F(0, Q, K(x) ? x : M));
                })
                .promise();
            },
            promise: function (v) {
              return v != null ? f.extend(v, h) : h;
            },
          },
          b = {};
        return (
          f.each(s, function (v, x) {
            var O = x[2],
              R = x[5];
            (h[x[1]] = O.add),
              R &&
                O.add(
                  function () {
                    u = R;
                  },
                  s[3 - v][2].disable,
                  s[3 - v][3].disable,
                  s[0][2].lock,
                  s[0][3].lock
                ),
              O.add(x[3].fire),
              (b[x[0]] = function () {
                return (
                  b[x[0] + "With"](this === b ? void 0 : this, arguments), this
                );
              }),
              (b[x[0] + "With"] = O.fireWith);
          }),
          h.promise(b),
          i && i.call(b, b),
          b
        );
      },
      when: function (i) {
        var s = arguments.length,
          u = s,
          h = Array(u),
          b = l.call(arguments),
          v = f.Deferred(),
          x = function (O) {
            return function (R) {
              (h[O] = this),
                (b[O] = arguments.length > 1 ? l.call(arguments) : R),
                --s || v.resolveWith(h, b);
            };
          };
        if (
          s <= 1 &&
          (D(i, v.done(x(u)).resolve, v.reject, !s),
          v.state() === "pending" || K(b[u] && b[u].then))
        )
          return v.then();
        for (; u--; ) D(b[u], x(u), v.reject);
        return v.promise();
      },
    });
    var G = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    (f.Deferred.exceptionHook = function (i, s) {
      t.console &&
        t.console.warn &&
        i &&
        G.test(i.name) &&
        t.console.warn("jQuery.Deferred exception: " + i.message, i.stack, s);
    }),
      (f.readyException = function (i) {
        t.setTimeout(function () {
          throw i;
        });
      });
    var ne = f.Deferred();
    (f.fn.ready = function (i) {
      return (
        ne.then(i).catch(function (s) {
          f.readyException(s);
        }),
        this
      );
    }),
      f.extend({
        isReady: !1,
        readyWait: 1,
        ready: function (i) {
          (i === !0 ? --f.readyWait : f.isReady) ||
            ((f.isReady = !0),
            !(i !== !0 && --f.readyWait > 0) && ne.resolveWith(L, [f]));
        },
      }),
      (f.ready.then = ne.then);
    function z() {
      L.removeEventListener("DOMContentLoaded", z),
        t.removeEventListener("load", z),
        f.ready();
    }
    L.readyState === "complete" ||
    (L.readyState !== "loading" && !L.documentElement.doScroll)
      ? t.setTimeout(f.ready)
      : (L.addEventListener("DOMContentLoaded", z),
        t.addEventListener("load", z));
    var be = function (i, s, u, h, b, v, x) {
        var O = 0,
          R = i.length,
          F = u == null;
        if (J(u) === "object") {
          b = !0;
          for (O in u) be(i, s, O, u[O], !0, v, x);
        } else if (
          h !== void 0 &&
          ((b = !0),
          K(h) || (x = !0),
          F &&
            (x
              ? (s.call(i, h), (s = null))
              : ((F = s),
                (s = function (Q, ee, W) {
                  return F.call(f(Q), W);
                }))),
          s)
        )
          for (; O < R; O++) s(i[O], u, x ? h : h.call(i[O], O, s(i[O], u)));
        return b ? i : F ? s.call(i) : R ? s(i[0], u) : v;
      },
      fe = /^-ms-/,
      le = /-([a-z])/g;
    function se(i, s) {
      return s.toUpperCase();
    }
    function ke(i) {
      return i.replace(fe, "ms-").replace(le, se);
    }
    var Ae = function (i) {
      return i.nodeType === 1 || i.nodeType === 9 || !+i.nodeType;
    };
    function Pe() {
      this.expando = f.expando + Pe.uid++;
    }
    (Pe.uid = 1),
      (Pe.prototype = {
        cache: function (i) {
          var s = i[this.expando];
          return (
            s ||
              ((s = {}),
              Ae(i) &&
                (i.nodeType
                  ? (i[this.expando] = s)
                  : Object.defineProperty(i, this.expando, {
                      value: s,
                      configurable: !0,
                    }))),
            s
          );
        },
        set: function (i, s, u) {
          var h,
            b = this.cache(i);
          if (typeof s == "string") b[ke(s)] = u;
          else for (h in s) b[ke(h)] = s[h];
          return b;
        },
        get: function (i, s) {
          return s === void 0
            ? this.cache(i)
            : i[this.expando] && i[this.expando][ke(s)];
        },
        access: function (i, s, u) {
          return s === void 0 || (s && typeof s == "string" && u === void 0)
            ? this.get(i, s)
            : (this.set(i, s, u), u !== void 0 ? u : s);
        },
        remove: function (i, s) {
          var u,
            h = i[this.expando];
          if (h !== void 0) {
            if (s !== void 0)
              for (
                Array.isArray(s)
                  ? (s = s.map(ke))
                  : ((s = ke(s)), (s = (s in h) ? [s] : s.match(Ce) || [])),
                  u = s.length;
                u--;

              )
                delete h[s[u]];
            (s === void 0 || f.isEmptyObject(h)) &&
              (i.nodeType
                ? (i[this.expando] = void 0)
                : delete i[this.expando]);
          }
        },
        hasData: function (i) {
          var s = i[this.expando];
          return s !== void 0 && !f.isEmptyObject(s);
        },
      });
    var re = new Pe(),
      Ie = new Pe(),
      ot = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      Je = /[A-Z]/g;
    function mt(i) {
      return i === "true"
        ? !0
        : i === "false"
        ? !1
        : i === "null"
        ? null
        : i === +i + ""
        ? +i
        : ot.test(i)
        ? JSON.parse(i)
        : i;
    }
    function Tt(i, s, u) {
      var h;
      if (u === void 0 && i.nodeType === 1)
        if (
          ((h = "data-" + s.replace(Je, "-$&").toLowerCase()),
          (u = i.getAttribute(h)),
          typeof u == "string")
        ) {
          try {
            u = mt(u);
          } catch {}
          Ie.set(i, s, u);
        } else u = void 0;
      return u;
    }
    f.extend({
      hasData: function (i) {
        return Ie.hasData(i) || re.hasData(i);
      },
      data: function (i, s, u) {
        return Ie.access(i, s, u);
      },
      removeData: function (i, s) {
        Ie.remove(i, s);
      },
      _data: function (i, s, u) {
        return re.access(i, s, u);
      },
      _removeData: function (i, s) {
        re.remove(i, s);
      },
    }),
      f.fn.extend({
        data: function (i, s) {
          var u,
            h,
            b,
            v = this[0],
            x = v && v.attributes;
          if (i === void 0) {
            if (
              this.length &&
              ((b = Ie.get(v)), v.nodeType === 1 && !re.get(v, "hasDataAttrs"))
            ) {
              for (u = x.length; u--; )
                x[u] &&
                  ((h = x[u].name),
                  h.indexOf("data-") === 0 &&
                    ((h = ke(h.slice(5))), Tt(v, h, b[h])));
              re.set(v, "hasDataAttrs", !0);
            }
            return b;
          }
          return typeof i == "object"
            ? this.each(function () {
                Ie.set(this, i);
              })
            : be(
                this,
                function (O) {
                  var R;
                  if (v && O === void 0)
                    return (
                      (R = Ie.get(v, i)),
                      R !== void 0 || ((R = Tt(v, i)), R !== void 0)
                        ? R
                        : void 0
                    );
                  this.each(function () {
                    Ie.set(this, i, O);
                  });
                },
                null,
                s,
                arguments.length > 1,
                null,
                !0
              );
        },
        removeData: function (i) {
          return this.each(function () {
            Ie.remove(this, i);
          });
        },
      }),
      f.extend({
        queue: function (i, s, u) {
          var h;
          if (i)
            return (
              (s = (s || "fx") + "queue"),
              (h = re.get(i, s)),
              u &&
                (!h || Array.isArray(u)
                  ? (h = re.access(i, s, f.makeArray(u)))
                  : h.push(u)),
              h || []
            );
        },
        dequeue: function (i, s) {
          s = s || "fx";
          var u = f.queue(i, s),
            h = u.length,
            b = u.shift(),
            v = f._queueHooks(i, s),
            x = function () {
              f.dequeue(i, s);
            };
          b === "inprogress" && ((b = u.shift()), h--),
            b &&
              (s === "fx" && u.unshift("inprogress"),
              delete v.stop,
              b.call(i, x, v)),
            !h && v && v.empty.fire();
        },
        _queueHooks: function (i, s) {
          var u = s + "queueHooks";
          return (
            re.get(i, u) ||
            re.access(i, u, {
              empty: f.Callbacks("once memory").add(function () {
                re.remove(i, [s + "queue", u]);
              }),
            })
          );
        },
      }),
      f.fn.extend({
        queue: function (i, s) {
          var u = 2;
          return (
            typeof i != "string" && ((s = i), (i = "fx"), u--),
            arguments.length < u
              ? f.queue(this[0], i)
              : s === void 0
              ? this
              : this.each(function () {
                  var h = f.queue(this, i, s);
                  f._queueHooks(this, i),
                    i === "fx" && h[0] !== "inprogress" && f.dequeue(this, i);
                })
          );
        },
        dequeue: function (i) {
          return this.each(function () {
            f.dequeue(this, i);
          });
        },
        clearQueue: function (i) {
          return this.queue(i || "fx", []);
        },
        promise: function (i, s) {
          var u,
            h = 1,
            b = f.Deferred(),
            v = this,
            x = this.length,
            O = function () {
              --h || b.resolveWith(v, [v]);
            };
          for (
            typeof i != "string" && ((s = i), (i = void 0)), i = i || "fx";
            x--;

          )
            (u = re.get(v[x], i + "queueHooks")),
              u && u.empty && (h++, u.empty.add(O));
          return O(), b.promise(s);
        },
      });
    var nn = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      Jt = new RegExp("^(?:([+-])=|)(" + nn + ")([a-z%]*)$", "i"),
      jt = ["Top", "Right", "Bottom", "Left"],
      un = L.documentElement,
      Et = function (i) {
        return f.contains(i.ownerDocument, i);
      },
      Vt = { composed: !0 };
    un.getRootNode &&
      (Et = function (i) {
        return (
          f.contains(i.ownerDocument, i) ||
          i.getRootNode(Vt) === i.ownerDocument
        );
      });
    var pt = function (i, s) {
      return (
        (i = s || i),
        i.style.display === "none" ||
          (i.style.display === "" && Et(i) && f.css(i, "display") === "none")
      );
    };
    function Yn(i, s, u, h) {
      var b,
        v,
        x = 20,
        O = h
          ? function () {
              return h.cur();
            }
          : function () {
              return f.css(i, s, "");
            },
        R = O(),
        F = (u && u[3]) || (f.cssNumber[s] ? "" : "px"),
        Q =
          i.nodeType &&
          (f.cssNumber[s] || (F !== "px" && +R)) &&
          Jt.exec(f.css(i, s));
      if (Q && Q[3] !== F) {
        for (R = R / 2, F = F || Q[3], Q = +R || 1; x--; )
          f.style(i, s, Q + F),
            (1 - v) * (1 - (v = O() / R || 0.5)) <= 0 && (x = 0),
            (Q = Q / v);
        (Q = Q * 2), f.style(i, s, Q + F), (u = u || []);
      }
      return (
        u &&
          ((Q = +Q || +R || 0),
          (b = u[1] ? Q + (u[1] + 1) * u[2] : +u[2]),
          h && ((h.unit = F), (h.start = Q), (h.end = b))),
        b
      );
    }
    var Kn = {};
    function Jr(i) {
      var s,
        u = i.ownerDocument,
        h = i.nodeName,
        b = Kn[h];
      return (
        b ||
        ((s = u.body.appendChild(u.createElement(h))),
        (b = f.css(s, "display")),
        s.parentNode.removeChild(s),
        b === "none" && (b = "block"),
        (Kn[h] = b),
        b)
      );
    }
    function Dn(i, s) {
      for (var u, h, b = [], v = 0, x = i.length; v < x; v++)
        (h = i[v]),
          h.style &&
            ((u = h.style.display),
            s
              ? (u === "none" &&
                  ((b[v] = re.get(h, "display") || null),
                  b[v] || (h.style.display = "")),
                h.style.display === "" && pt(h) && (b[v] = Jr(h)))
              : u !== "none" && ((b[v] = "none"), re.set(h, "display", u)));
      for (v = 0; v < x; v++) b[v] != null && (i[v].style.display = b[v]);
      return i;
    }
    f.fn.extend({
      show: function () {
        return Dn(this, !0);
      },
      hide: function () {
        return Dn(this);
      },
      toggle: function (i) {
        return typeof i == "boolean"
          ? i
            ? this.show()
            : this.hide()
          : this.each(function () {
              pt(this) ? f(this).show() : f(this).hide();
            });
      },
    });
    var di = /^(?:checkbox|radio)$/i,
      Gr = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
      pi = /^$|^module$|\/(?:java|ecma)script/i;
    (function () {
      var i = L.createDocumentFragment(),
        s = i.appendChild(L.createElement("div")),
        u = L.createElement("input");
      u.setAttribute("type", "radio"),
        u.setAttribute("checked", "checked"),
        u.setAttribute("name", "t"),
        s.appendChild(u),
        ($.checkClone = s.cloneNode(!0).cloneNode(!0).lastChild.checked),
        (s.innerHTML = "<textarea>x</textarea>"),
        ($.noCloneChecked = !!s.cloneNode(!0).lastChild.defaultValue),
        (s.innerHTML = "<option></option>"),
        ($.option = !!s.lastChild);
    })();
    var ce = {
      thead: [1, "<table>", "</table>"],
      col: [2, "<table><colgroup>", "</colgroup></table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: [0, "", ""],
    };
    (ce.tbody = ce.tfoot = ce.colgroup = ce.caption = ce.thead),
      (ce.th = ce.td),
      $.option ||
        (ce.optgroup = ce.option =
          [1, "<select multiple='multiple'>", "</select>"]);
    function Ft(i, s) {
      var u;
      return (
        typeof i.getElementsByTagName < "u"
          ? (u = i.getElementsByTagName(s || "*"))
          : typeof i.querySelectorAll < "u"
          ? (u = i.querySelectorAll(s || "*"))
          : (u = []),
        s === void 0 || (s && C(i, s)) ? f.merge([i], u) : u
      );
    }
    function Oi(i, s) {
      for (var u = 0, h = i.length; u < h; u++)
        re.set(i[u], "globalEval", !s || re.get(s[u], "globalEval"));
    }
    var nt = /<|&#?\w+;/;
    function hr(i, s, u, h, b) {
      for (
        var v,
          x,
          O,
          R,
          F,
          Q,
          ee = s.createDocumentFragment(),
          W = [],
          oe = 0,
          Be = i.length;
        oe < Be;
        oe++
      )
        if (((v = i[oe]), v || v === 0))
          if (J(v) === "object") f.merge(W, v.nodeType ? [v] : v);
          else if (!nt.test(v)) W.push(s.createTextNode(v));
          else {
            for (
              x = x || ee.appendChild(s.createElement("div")),
                O = (Gr.exec(v) || ["", ""])[1].toLowerCase(),
                R = ce[O] || ce._default,
                x.innerHTML = R[1] + f.htmlPrefilter(v) + R[2],
                Q = R[0];
              Q--;

            )
              x = x.lastChild;
            f.merge(W, x.childNodes), (x = ee.firstChild), (x.textContent = "");
          }
      for (ee.textContent = "", oe = 0; (v = W[oe++]); ) {
        if (h && f.inArray(v, h) > -1) {
          b && b.push(v);
          continue;
        }
        if (((F = Et(v)), (x = Ft(ee.appendChild(v), "script")), F && Oi(x), u))
          for (Q = 0; (v = x[Q++]); ) pi.test(v.type || "") && u.push(v);
      }
      return ee;
    }
    var dr = /^([^.]*)(?:\.(.+)|)/;
    function Qn() {
      return !0;
    }
    function Yt() {
      return !1;
    }
    function pr(i, s, u, h, b, v) {
      var x, O;
      if (typeof s == "object") {
        typeof u != "string" && ((h = h || u), (u = void 0));
        for (O in s) pr(i, O, u, h, s[O], v);
        return i;
      }
      if (
        (h == null && b == null
          ? ((b = u), (h = u = void 0))
          : b == null &&
            (typeof u == "string"
              ? ((b = h), (h = void 0))
              : ((b = h), (h = u), (u = void 0))),
        b === !1)
      )
        b = Yt;
      else if (!b) return i;
      return (
        v === 1 &&
          ((x = b),
          (b = function (R) {
            return f().off(R), x.apply(this, arguments);
          }),
          (b.guid = x.guid || (x.guid = f.guid++))),
        i.each(function () {
          f.event.add(this, s, b, h, u);
        })
      );
    }
    f.event = {
      global: {},
      add: function (i, s, u, h, b) {
        var v,
          x,
          O,
          R,
          F,
          Q,
          ee,
          W,
          oe,
          Be,
          it,
          Ye = re.get(i);
        if (Ae(i))
          for (
            u.handler && ((v = u), (u = v.handler), (b = v.selector)),
              b && f.find.matchesSelector(un, b),
              u.guid || (u.guid = f.guid++),
              (R = Ye.events) || (R = Ye.events = Object.create(null)),
              (x = Ye.handle) ||
                (x = Ye.handle =
                  function ($t) {
                    return typeof f < "u" && f.event.triggered !== $t.type
                      ? f.event.dispatch.apply(i, arguments)
                      : void 0;
                  }),
              s = (s || "").match(Ce) || [""],
              F = s.length;
            F--;

          )
            (O = dr.exec(s[F]) || []),
              (oe = it = O[1]),
              (Be = (O[2] || "").split(".").sort()),
              oe &&
                ((ee = f.event.special[oe] || {}),
                (oe = (b ? ee.delegateType : ee.bindType) || oe),
                (ee = f.event.special[oe] || {}),
                (Q = f.extend(
                  {
                    type: oe,
                    origType: it,
                    data: h,
                    handler: u,
                    guid: u.guid,
                    selector: b,
                    needsContext: b && f.expr.match.needsContext.test(b),
                    namespace: Be.join("."),
                  },
                  v
                )),
                (W = R[oe]) ||
                  ((W = R[oe] = []),
                  (W.delegateCount = 0),
                  (!ee.setup || ee.setup.call(i, h, Be, x) === !1) &&
                    i.addEventListener &&
                    i.addEventListener(oe, x)),
                ee.add &&
                  (ee.add.call(i, Q),
                  Q.handler.guid || (Q.handler.guid = u.guid)),
                b ? W.splice(W.delegateCount++, 0, Q) : W.push(Q),
                (f.event.global[oe] = !0));
      },
      remove: function (i, s, u, h, b) {
        var v,
          x,
          O,
          R,
          F,
          Q,
          ee,
          W,
          oe,
          Be,
          it,
          Ye = re.hasData(i) && re.get(i);
        if (!(!Ye || !(R = Ye.events))) {
          for (s = (s || "").match(Ce) || [""], F = s.length; F--; ) {
            if (
              ((O = dr.exec(s[F]) || []),
              (oe = it = O[1]),
              (Be = (O[2] || "").split(".").sort()),
              !oe)
            ) {
              for (oe in R) f.event.remove(i, oe + s[F], u, h, !0);
              continue;
            }
            for (
              ee = f.event.special[oe] || {},
                oe = (h ? ee.delegateType : ee.bindType) || oe,
                W = R[oe] || [],
                O =
                  O[2] &&
                  new RegExp("(^|\\.)" + Be.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                x = v = W.length;
              v--;

            )
              (Q = W[v]),
                (b || it === Q.origType) &&
                  (!u || u.guid === Q.guid) &&
                  (!O || O.test(Q.namespace)) &&
                  (!h || h === Q.selector || (h === "**" && Q.selector)) &&
                  (W.splice(v, 1),
                  Q.selector && W.delegateCount--,
                  ee.remove && ee.remove.call(i, Q));
            x &&
              !W.length &&
              ((!ee.teardown || ee.teardown.call(i, Be, Ye.handle) === !1) &&
                f.removeEvent(i, oe, Ye.handle),
              delete R[oe]);
          }
          f.isEmptyObject(R) && re.remove(i, "handle events");
        }
      },
      dispatch: function (i) {
        var s,
          u,
          h,
          b,
          v,
          x,
          O = new Array(arguments.length),
          R = f.event.fix(i),
          F = (re.get(this, "events") || Object.create(null))[R.type] || [],
          Q = f.event.special[R.type] || {};
        for (O[0] = R, s = 1; s < arguments.length; s++) O[s] = arguments[s];
        if (
          ((R.delegateTarget = this),
          !(Q.preDispatch && Q.preDispatch.call(this, R) === !1))
        ) {
          for (
            x = f.event.handlers.call(this, R, F), s = 0;
            (b = x[s++]) && !R.isPropagationStopped();

          )
            for (
              R.currentTarget = b.elem, u = 0;
              (v = b.handlers[u++]) && !R.isImmediatePropagationStopped();

            )
              (!R.rnamespace ||
                v.namespace === !1 ||
                R.rnamespace.test(v.namespace)) &&
                ((R.handleObj = v),
                (R.data = v.data),
                (h = (
                  (f.event.special[v.origType] || {}).handle || v.handler
                ).apply(b.elem, O)),
                h !== void 0 &&
                  (R.result = h) === !1 &&
                  (R.preventDefault(), R.stopPropagation()));
          return Q.postDispatch && Q.postDispatch.call(this, R), R.result;
        }
      },
      handlers: function (i, s) {
        var u,
          h,
          b,
          v,
          x,
          O = [],
          R = s.delegateCount,
          F = i.target;
        if (R && F.nodeType && !(i.type === "click" && i.button >= 1)) {
          for (; F !== this; F = F.parentNode || this)
            if (
              F.nodeType === 1 &&
              !(i.type === "click" && F.disabled === !0)
            ) {
              for (v = [], x = {}, u = 0; u < R; u++)
                (h = s[u]),
                  (b = h.selector + " "),
                  x[b] === void 0 &&
                    (x[b] = h.needsContext
                      ? f(b, this).index(F) > -1
                      : f.find(b, this, null, [F]).length),
                  x[b] && v.push(h);
              v.length && O.push({ elem: F, handlers: v });
            }
        }
        return (
          (F = this),
          R < s.length && O.push({ elem: F, handlers: s.slice(R) }),
          O
        );
      },
      addProp: function (i, s) {
        Object.defineProperty(f.Event.prototype, i, {
          enumerable: !0,
          configurable: !0,
          get: K(s)
            ? function () {
                if (this.originalEvent) return s(this.originalEvent);
              }
            : function () {
                if (this.originalEvent) return this.originalEvent[i];
              },
          set: function (u) {
            Object.defineProperty(this, i, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: u,
            });
          },
        });
      },
      fix: function (i) {
        return i[f.expando] ? i : new f.Event(i);
      },
      special: {
        load: { noBubble: !0 },
        click: {
          setup: function (i) {
            var s = this || i;
            return (
              di.test(s.type) && s.click && C(s, "input") && gi(s, "click", !0),
              !1
            );
          },
          trigger: function (i) {
            var s = this || i;
            return (
              di.test(s.type) && s.click && C(s, "input") && gi(s, "click"), !0
            );
          },
          _default: function (i) {
            var s = i.target;
            return (
              (di.test(s.type) &&
                s.click &&
                C(s, "input") &&
                re.get(s, "click")) ||
              C(s, "a")
            );
          },
        },
        beforeunload: {
          postDispatch: function (i) {
            i.result !== void 0 &&
              i.originalEvent &&
              (i.originalEvent.returnValue = i.result);
          },
        },
      },
    };
    function gi(i, s, u) {
      if (!u) {
        re.get(i, s) === void 0 && f.event.add(i, s, Qn);
        return;
      }
      re.set(i, s, !1),
        f.event.add(i, s, {
          namespace: !1,
          handler: function (h) {
            var b,
              v = re.get(this, s);
            if (h.isTrigger & 1 && this[s]) {
              if (v)
                (f.event.special[s] || {}).delegateType && h.stopPropagation();
              else if (
                ((v = l.call(arguments)),
                re.set(this, s, v),
                this[s](),
                (b = re.get(this, s)),
                re.set(this, s, !1),
                v !== b)
              )
                return h.stopImmediatePropagation(), h.preventDefault(), b;
            } else
              v &&
                (re.set(this, s, f.event.trigger(v[0], v.slice(1), this)),
                h.stopPropagation(),
                (h.isImmediatePropagationStopped = Qn));
          },
        });
    }
    (f.removeEvent = function (i, s, u) {
      i.removeEventListener && i.removeEventListener(s, u);
    }),
      (f.Event = function (i, s) {
        if (!(this instanceof f.Event)) return new f.Event(i, s);
        i && i.type
          ? ((this.originalEvent = i),
            (this.type = i.type),
            (this.isDefaultPrevented =
              i.defaultPrevented ||
              (i.defaultPrevented === void 0 && i.returnValue === !1)
                ? Qn
                : Yt),
            (this.target =
              i.target && i.target.nodeType === 3
                ? i.target.parentNode
                : i.target),
            (this.currentTarget = i.currentTarget),
            (this.relatedTarget = i.relatedTarget))
          : (this.type = i),
          s && f.extend(this, s),
          (this.timeStamp = (i && i.timeStamp) || Date.now()),
          (this[f.expando] = !0);
      }),
      (f.Event.prototype = {
        constructor: f.Event,
        isDefaultPrevented: Yt,
        isPropagationStopped: Yt,
        isImmediatePropagationStopped: Yt,
        isSimulated: !1,
        preventDefault: function () {
          var i = this.originalEvent;
          (this.isDefaultPrevented = Qn),
            i && !this.isSimulated && i.preventDefault();
        },
        stopPropagation: function () {
          var i = this.originalEvent;
          (this.isPropagationStopped = Qn),
            i && !this.isSimulated && i.stopPropagation();
        },
        stopImmediatePropagation: function () {
          var i = this.originalEvent;
          (this.isImmediatePropagationStopped = Qn),
            i && !this.isSimulated && i.stopImmediatePropagation(),
            this.stopPropagation();
        },
      }),
      f.each(
        {
          altKey: !0,
          bubbles: !0,
          cancelable: !0,
          changedTouches: !0,
          ctrlKey: !0,
          detail: !0,
          eventPhase: !0,
          metaKey: !0,
          pageX: !0,
          pageY: !0,
          shiftKey: !0,
          view: !0,
          char: !0,
          code: !0,
          charCode: !0,
          key: !0,
          keyCode: !0,
          button: !0,
          buttons: !0,
          clientX: !0,
          clientY: !0,
          offsetX: !0,
          offsetY: !0,
          pointerId: !0,
          pointerType: !0,
          screenX: !0,
          screenY: !0,
          targetTouches: !0,
          toElement: !0,
          touches: !0,
          which: !0,
        },
        f.event.addProp
      ),
      f.each({ focus: "focusin", blur: "focusout" }, function (i, s) {
        function u(h) {
          if (L.documentMode) {
            var b = re.get(this, "handle"),
              v = f.event.fix(h);
            (v.type = h.type === "focusin" ? "focus" : "blur"),
              (v.isSimulated = !0),
              b(h),
              v.target === v.currentTarget && b(v);
          } else f.event.simulate(s, h.target, f.event.fix(h));
        }
        (f.event.special[i] = {
          setup: function () {
            var h;
            if ((gi(this, i, !0), L.documentMode))
              (h = re.get(this, s)),
                h || this.addEventListener(s, u),
                re.set(this, s, (h || 0) + 1);
            else return !1;
          },
          trigger: function () {
            return gi(this, i), !0;
          },
          teardown: function () {
            var h;
            if (L.documentMode)
              (h = re.get(this, s) - 1),
                h
                  ? re.set(this, s, h)
                  : (this.removeEventListener(s, u), re.remove(this, s));
            else return !1;
          },
          _default: function (h) {
            return re.get(h.target, i);
          },
          delegateType: s,
        }),
          (f.event.special[s] = {
            setup: function () {
              var h = this.ownerDocument || this.document || this,
                b = L.documentMode ? this : h,
                v = re.get(b, s);
              v ||
                (L.documentMode
                  ? this.addEventListener(s, u)
                  : h.addEventListener(i, u, !0)),
                re.set(b, s, (v || 0) + 1);
            },
            teardown: function () {
              var h = this.ownerDocument || this.document || this,
                b = L.documentMode ? this : h,
                v = re.get(b, s) - 1;
              v
                ? re.set(b, s, v)
                : (L.documentMode
                    ? this.removeEventListener(s, u)
                    : h.removeEventListener(i, u, !0),
                  re.remove(b, s));
            },
          });
      }),
      f.each(
        {
          mouseenter: "mouseover",
          mouseleave: "mouseout",
          pointerenter: "pointerover",
          pointerleave: "pointerout",
        },
        function (i, s) {
          f.event.special[i] = {
            delegateType: s,
            bindType: s,
            handle: function (u) {
              var h,
                b = this,
                v = u.relatedTarget,
                x = u.handleObj;
              return (
                (!v || (v !== b && !f.contains(b, v))) &&
                  ((u.type = x.origType),
                  (h = x.handler.apply(this, arguments)),
                  (u.type = s)),
                h
              );
            },
          };
        }
      ),
      f.fn.extend({
        on: function (i, s, u, h) {
          return pr(this, i, s, u, h);
        },
        one: function (i, s, u, h) {
          return pr(this, i, s, u, h, 1);
        },
        off: function (i, s, u) {
          var h, b;
          if (i && i.preventDefault && i.handleObj)
            return (
              (h = i.handleObj),
              f(i.delegateTarget).off(
                h.namespace ? h.origType + "." + h.namespace : h.origType,
                h.selector,
                h.handler
              ),
              this
            );
          if (typeof i == "object") {
            for (b in i) this.off(b, s, i[b]);
            return this;
          }
          return (
            (s === !1 || typeof s == "function") && ((u = s), (s = void 0)),
            u === !1 && (u = Yt),
            this.each(function () {
              f.event.remove(this, i, u, s);
            })
          );
        },
      });
    var gr = /<script|<style|<link/i,
      no = /checked\s*(?:[^=]|=\s*.checked.)/i,
      rn = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
    function mi(i, s) {
      return (
        (C(i, "table") &&
          C(s.nodeType !== 11 ? s : s.firstChild, "tr") &&
          f(i).children("tbody")[0]) ||
        i
      );
    }
    function lt(i) {
      return (i.type = (i.getAttribute("type") !== null) + "/" + i.type), i;
    }
    function io(i) {
      return (
        (i.type || "").slice(0, 5) === "true/"
          ? (i.type = i.type.slice(5))
          : i.removeAttribute("type"),
        i
      );
    }
    function Xr(i, s) {
      var u, h, b, v, x, O, R;
      if (s.nodeType === 1) {
        if (re.hasData(i) && ((v = re.get(i)), (R = v.events), R)) {
          re.remove(s, "handle events");
          for (b in R)
            for (u = 0, h = R[b].length; u < h; u++) f.event.add(s, b, R[b][u]);
        }
        Ie.hasData(i) &&
          ((x = Ie.access(i)), (O = f.extend({}, x)), Ie.set(s, O));
      }
    }
    function mr(i, s) {
      var u = s.nodeName.toLowerCase();
      u === "input" && di.test(i.type)
        ? (s.checked = i.checked)
        : (u === "input" || u === "textarea") &&
          (s.defaultValue = i.defaultValue);
    }
    function fn(i, s, u, h) {
      s = p(s);
      var b,
        v,
        x,
        O,
        R,
        F,
        Q = 0,
        ee = i.length,
        W = ee - 1,
        oe = s[0],
        Be = K(oe);
      if (
        Be ||
        (ee > 1 && typeof oe == "string" && !$.checkClone && no.test(oe))
      )
        return i.each(function (it) {
          var Ye = i.eq(it);
          Be && (s[0] = oe.call(this, it, Ye.html())), fn(Ye, s, u, h);
        });
      if (
        ee &&
        ((b = hr(s, i[0].ownerDocument, !1, i, h)),
        (v = b.firstChild),
        b.childNodes.length === 1 && (b = v),
        v || h)
      ) {
        for (x = f.map(Ft(b, "script"), lt), O = x.length; Q < ee; Q++)
          (R = b),
            Q !== W &&
              ((R = f.clone(R, !0, !0)), O && f.merge(x, Ft(R, "script"))),
            u.call(i[Q], R, Q);
        if (O)
          for (
            F = x[x.length - 1].ownerDocument, f.map(x, io), Q = 0;
            Q < O;
            Q++
          )
            (R = x[Q]),
              pi.test(R.type || "") &&
                !re.access(R, "globalEval") &&
                f.contains(F, R) &&
                (R.src && (R.type || "").toLowerCase() !== "module"
                  ? f._evalUrl &&
                    !R.noModule &&
                    f._evalUrl(
                      R.src,
                      { nonce: R.nonce || R.getAttribute("nonce") },
                      F
                    )
                  : ye(R.textContent.replace(rn, ""), R, F));
      }
      return i;
    }
    function Mi(i, s, u) {
      for (var h, b = s ? f.filter(s, i) : i, v = 0; (h = b[v]) != null; v++)
        !u && h.nodeType === 1 && f.cleanData(Ft(h)),
          h.parentNode &&
            (u && Et(h) && Oi(Ft(h, "script")), h.parentNode.removeChild(h));
      return i;
    }
    f.extend({
      htmlPrefilter: function (i) {
        return i;
      },
      clone: function (i, s, u) {
        var h,
          b,
          v,
          x,
          O = i.cloneNode(!0),
          R = Et(i);
        if (
          !$.noCloneChecked &&
          (i.nodeType === 1 || i.nodeType === 11) &&
          !f.isXMLDoc(i)
        )
          for (x = Ft(O), v = Ft(i), h = 0, b = v.length; h < b; h++)
            mr(v[h], x[h]);
        if (s)
          if (u)
            for (
              v = v || Ft(i), x = x || Ft(O), h = 0, b = v.length;
              h < b;
              h++
            )
              Xr(v[h], x[h]);
          else Xr(i, O);
        return (
          (x = Ft(O, "script")), x.length > 0 && Oi(x, !R && Ft(i, "script")), O
        );
      },
      cleanData: function (i) {
        for (
          var s, u, h, b = f.event.special, v = 0;
          (u = i[v]) !== void 0;
          v++
        )
          if (Ae(u)) {
            if ((s = u[re.expando])) {
              if (s.events)
                for (h in s.events)
                  b[h] ? f.event.remove(u, h) : f.removeEvent(u, h, s.handle);
              u[re.expando] = void 0;
            }
            u[Ie.expando] && (u[Ie.expando] = void 0);
          }
      },
    }),
      f.fn.extend({
        detach: function (i) {
          return Mi(this, i, !0);
        },
        remove: function (i) {
          return Mi(this, i);
        },
        text: function (i) {
          return be(
            this,
            function (s) {
              return s === void 0
                ? f.text(this)
                : this.empty().each(function () {
                    (this.nodeType === 1 ||
                      this.nodeType === 11 ||
                      this.nodeType === 9) &&
                      (this.textContent = s);
                  });
            },
            null,
            i,
            arguments.length
          );
        },
        append: function () {
          return fn(this, arguments, function (i) {
            if (
              this.nodeType === 1 ||
              this.nodeType === 11 ||
              this.nodeType === 9
            ) {
              var s = mi(this, i);
              s.appendChild(i);
            }
          });
        },
        prepend: function () {
          return fn(this, arguments, function (i) {
            if (
              this.nodeType === 1 ||
              this.nodeType === 11 ||
              this.nodeType === 9
            ) {
              var s = mi(this, i);
              s.insertBefore(i, s.firstChild);
            }
          });
        },
        before: function () {
          return fn(this, arguments, function (i) {
            this.parentNode && this.parentNode.insertBefore(i, this);
          });
        },
        after: function () {
          return fn(this, arguments, function (i) {
            this.parentNode &&
              this.parentNode.insertBefore(i, this.nextSibling);
          });
        },
        empty: function () {
          for (var i, s = 0; (i = this[s]) != null; s++)
            i.nodeType === 1 && (f.cleanData(Ft(i, !1)), (i.textContent = ""));
          return this;
        },
        clone: function (i, s) {
          return (
            (i = i ?? !1),
            (s = s ?? i),
            this.map(function () {
              return f.clone(this, i, s);
            })
          );
        },
        html: function (i) {
          return be(
            this,
            function (s) {
              var u = this[0] || {},
                h = 0,
                b = this.length;
              if (s === void 0 && u.nodeType === 1) return u.innerHTML;
              if (
                typeof s == "string" &&
                !gr.test(s) &&
                !ce[(Gr.exec(s) || ["", ""])[1].toLowerCase()]
              ) {
                s = f.htmlPrefilter(s);
                try {
                  for (; h < b; h++)
                    (u = this[h] || {}),
                      u.nodeType === 1 &&
                        (f.cleanData(Ft(u, !1)), (u.innerHTML = s));
                  u = 0;
                } catch {}
              }
              u && this.empty().append(s);
            },
            null,
            i,
            arguments.length
          );
        },
        replaceWith: function () {
          var i = [];
          return fn(
            this,
            arguments,
            function (s) {
              var u = this.parentNode;
              f.inArray(this, i) < 0 &&
                (f.cleanData(Ft(this)), u && u.replaceChild(s, this));
            },
            i
          );
        },
      }),
      f.each(
        {
          appendTo: "append",
          prependTo: "prepend",
          insertBefore: "before",
          insertAfter: "after",
          replaceAll: "replaceWith",
        },
        function (i, s) {
          f.fn[i] = function (u) {
            for (var h, b = [], v = f(u), x = v.length - 1, O = 0; O <= x; O++)
              (h = O === x ? this : this.clone(!0)),
                f(v[O])[s](h),
                g.apply(b, h.get());
            return this.pushStack(b);
          };
        }
      );
    var Bn = new RegExp("^(" + nn + ")(?!px)[a-z%]+$", "i"),
      yr = /^--/,
      Fn = function (i) {
        var s = i.ownerDocument.defaultView;
        return (!s || !s.opener) && (s = t), s.getComputedStyle(i);
      },
      br = function (i, s, u) {
        var h,
          b,
          v = {};
        for (b in s) (v[b] = i.style[b]), (i.style[b] = s[b]);
        h = u.call(i);
        for (b in s) i.style[b] = v[b];
        return h;
      },
      ro = new RegExp(jt.join("|"), "i");
    (function () {
      function i() {
        if (F) {
          (R.style.cssText =
            "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
            (F.style.cssText =
              "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
            un.appendChild(R).appendChild(F);
          var Q = t.getComputedStyle(F);
          (u = Q.top !== "1%"),
            (O = s(Q.marginLeft) === 12),
            (F.style.right = "60%"),
            (v = s(Q.right) === 36),
            (h = s(Q.width) === 36),
            (F.style.position = "absolute"),
            (b = s(F.offsetWidth / 3) === 12),
            un.removeChild(R),
            (F = null);
        }
      }
      function s(Q) {
        return Math.round(parseFloat(Q));
      }
      var u,
        h,
        b,
        v,
        x,
        O,
        R = L.createElement("div"),
        F = L.createElement("div");
      F.style &&
        ((F.style.backgroundClip = "content-box"),
        (F.cloneNode(!0).style.backgroundClip = ""),
        ($.clearCloneStyle = F.style.backgroundClip === "content-box"),
        f.extend($, {
          boxSizingReliable: function () {
            return i(), h;
          },
          pixelBoxStyles: function () {
            return i(), v;
          },
          pixelPosition: function () {
            return i(), u;
          },
          reliableMarginLeft: function () {
            return i(), O;
          },
          scrollboxSize: function () {
            return i(), b;
          },
          reliableTrDimensions: function () {
            var Q, ee, W, oe;
            return (
              x == null &&
                ((Q = L.createElement("table")),
                (ee = L.createElement("tr")),
                (W = L.createElement("div")),
                (Q.style.cssText =
                  "position:absolute;left:-11111px;border-collapse:separate"),
                (ee.style.cssText = "box-sizing:content-box;border:1px solid"),
                (ee.style.height = "1px"),
                (W.style.height = "9px"),
                (W.style.display = "block"),
                un.appendChild(Q).appendChild(ee).appendChild(W),
                (oe = t.getComputedStyle(ee)),
                (x =
                  parseInt(oe.height, 10) +
                    parseInt(oe.borderTopWidth, 10) +
                    parseInt(oe.borderBottomWidth, 10) ===
                  ee.offsetHeight),
                un.removeChild(Q)),
              x
            );
          },
        }));
    })();
    function Jn(i, s, u) {
      var h,
        b,
        v,
        x,
        O = yr.test(s),
        R = i.style;
      return (
        (u = u || Fn(i)),
        u &&
          ((x = u.getPropertyValue(s) || u[s]),
          O && x && (x = x.replace(ue, "$1") || void 0),
          x === "" && !Et(i) && (x = f.style(i, s)),
          !$.pixelBoxStyles() &&
            Bn.test(x) &&
            ro.test(s) &&
            ((h = R.width),
            (b = R.minWidth),
            (v = R.maxWidth),
            (R.minWidth = R.maxWidth = R.width = x),
            (x = u.width),
            (R.width = h),
            (R.minWidth = b),
            (R.maxWidth = v))),
        x !== void 0 ? x + "" : x
      );
    }
    function Zr(i, s) {
      return {
        get: function () {
          if (i()) {
            delete this.get;
            return;
          }
          return (this.get = s).apply(this, arguments);
        },
      };
    }
    var vr = ["Webkit", "Moz", "ms"],
      Li = L.createElement("div").style,
      ji = {};
    function yi(i) {
      for (var s = i[0].toUpperCase() + i.slice(1), u = vr.length; u--; )
        if (((i = vr[u] + s), i in Li)) return i;
    }
    function Hi(i) {
      var s = f.cssProps[i] || ji[i];
      return s || (i in Li ? i : (ji[i] = yi(i) || i));
    }
    var a = /^(none|table(?!-c[ea]).+)/,
      d = { position: "absolute", visibility: "hidden", display: "block" },
      c = { letterSpacing: "0", fontWeight: "400" };
    function m(i, s, u) {
      var h = Jt.exec(s);
      return h ? Math.max(0, h[2] - (u || 0)) + (h[3] || "px") : s;
    }
    function _(i, s, u, h, b, v) {
      var x = s === "width" ? 1 : 0,
        O = 0,
        R = 0,
        F = 0;
      if (u === (h ? "border" : "content")) return 0;
      for (; x < 4; x += 2)
        u === "margin" && (F += f.css(i, u + jt[x], !0, b)),
          h
            ? (u === "content" && (R -= f.css(i, "padding" + jt[x], !0, b)),
              u !== "margin" &&
                (R -= f.css(i, "border" + jt[x] + "Width", !0, b)))
            : ((R += f.css(i, "padding" + jt[x], !0, b)),
              u !== "padding"
                ? (R += f.css(i, "border" + jt[x] + "Width", !0, b))
                : (O += f.css(i, "border" + jt[x] + "Width", !0, b)));
      return (
        !h &&
          v >= 0 &&
          (R +=
            Math.max(
              0,
              Math.ceil(
                i["offset" + s[0].toUpperCase() + s.slice(1)] - v - R - O - 0.5
              )
            ) || 0),
        R + F
      );
    }
    function E(i, s, u) {
      var h = Fn(i),
        b = !$.boxSizingReliable() || u,
        v = b && f.css(i, "boxSizing", !1, h) === "border-box",
        x = v,
        O = Jn(i, s, h),
        R = "offset" + s[0].toUpperCase() + s.slice(1);
      if (Bn.test(O)) {
        if (!u) return O;
        O = "auto";
      }
      return (
        ((!$.boxSizingReliable() && v) ||
          (!$.reliableTrDimensions() && C(i, "tr")) ||
          O === "auto" ||
          (!parseFloat(O) && f.css(i, "display", !1, h) === "inline")) &&
          i.getClientRects().length &&
          ((v = f.css(i, "boxSizing", !1, h) === "border-box"),
          (x = R in i),
          x && (O = i[R])),
        (O = parseFloat(O) || 0),
        O + _(i, s, u || (v ? "border" : "content"), x, h, O) + "px"
      );
    }
    f.extend({
      cssHooks: {
        opacity: {
          get: function (i, s) {
            if (s) {
              var u = Jn(i, "opacity");
              return u === "" ? "1" : u;
            }
          },
        },
      },
      cssNumber: {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageSlice: !0,
        columnCount: !0,
        flexGrow: !0,
        flexShrink: !0,
        fontWeight: !0,
        gridArea: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnStart: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowStart: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        scale: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
      },
      cssProps: {},
      style: function (i, s, u, h) {
        if (!(!i || i.nodeType === 3 || i.nodeType === 8 || !i.style)) {
          var b,
            v,
            x,
            O = ke(s),
            R = yr.test(s),
            F = i.style;
          if (
            (R || (s = Hi(O)),
            (x = f.cssHooks[s] || f.cssHooks[O]),
            u !== void 0)
          ) {
            if (
              ((v = typeof u),
              v === "string" &&
                (b = Jt.exec(u)) &&
                b[1] &&
                ((u = Yn(i, s, b)), (v = "number")),
              u == null || u !== u)
            )
              return;
            v === "number" &&
              !R &&
              (u += (b && b[3]) || (f.cssNumber[O] ? "" : "px")),
              !$.clearCloneStyle &&
                u === "" &&
                s.indexOf("background") === 0 &&
                (F[s] = "inherit"),
              (!x || !("set" in x) || (u = x.set(i, u, h)) !== void 0) &&
                (R ? F.setProperty(s, u) : (F[s] = u));
          } else
            return x && "get" in x && (b = x.get(i, !1, h)) !== void 0
              ? b
              : F[s];
        }
      },
      css: function (i, s, u, h) {
        var b,
          v,
          x,
          O = ke(s),
          R = yr.test(s);
        return (
          R || (s = Hi(O)),
          (x = f.cssHooks[s] || f.cssHooks[O]),
          x && "get" in x && (b = x.get(i, !0, u)),
          b === void 0 && (b = Jn(i, s, h)),
          b === "normal" && s in c && (b = c[s]),
          u === "" || u
            ? ((v = parseFloat(b)), u === !0 || isFinite(v) ? v || 0 : b)
            : b
        );
      },
    }),
      f.each(["height", "width"], function (i, s) {
        f.cssHooks[s] = {
          get: function (u, h, b) {
            if (h)
              return a.test(f.css(u, "display")) &&
                (!u.getClientRects().length || !u.getBoundingClientRect().width)
                ? br(u, d, function () {
                    return E(u, s, b);
                  })
                : E(u, s, b);
          },
          set: function (u, h, b) {
            var v,
              x = Fn(u),
              O = !$.scrollboxSize() && x.position === "absolute",
              R = O || b,
              F = R && f.css(u, "boxSizing", !1, x) === "border-box",
              Q = b ? _(u, s, b, F, x) : 0;
            return (
              F &&
                O &&
                (Q -= Math.ceil(
                  u["offset" + s[0].toUpperCase() + s.slice(1)] -
                    parseFloat(x[s]) -
                    _(u, s, "border", !1, x) -
                    0.5
                )),
              Q &&
                (v = Jt.exec(h)) &&
                (v[3] || "px") !== "px" &&
                ((u.style[s] = h), (h = f.css(u, s))),
              m(u, h, Q)
            );
          },
        };
      }),
      (f.cssHooks.marginLeft = Zr($.reliableMarginLeft, function (i, s) {
        if (s)
          return (
            (parseFloat(Jn(i, "marginLeft")) ||
              i.getBoundingClientRect().left -
                br(i, { marginLeft: 0 }, function () {
                  return i.getBoundingClientRect().left;
                })) + "px"
          );
      })),
      f.each({ margin: "", padding: "", border: "Width" }, function (i, s) {
        (f.cssHooks[i + s] = {
          expand: function (u) {
            for (
              var h = 0, b = {}, v = typeof u == "string" ? u.split(" ") : [u];
              h < 4;
              h++
            )
              b[i + jt[h] + s] = v[h] || v[h - 2] || v[0];
            return b;
          },
        }),
          i !== "margin" && (f.cssHooks[i + s].set = m);
      }),
      f.fn.extend({
        css: function (i, s) {
          return be(
            this,
            function (u, h, b) {
              var v,
                x,
                O = {},
                R = 0;
              if (Array.isArray(h)) {
                for (v = Fn(u), x = h.length; R < x; R++)
                  O[h[R]] = f.css(u, h[R], !1, v);
                return O;
              }
              return b !== void 0 ? f.style(u, h, b) : f.css(u, h);
            },
            i,
            s,
            arguments.length > 1
          );
        },
      });
    function N(i, s, u, h, b) {
      return new N.prototype.init(i, s, u, h, b);
    }
    (f.Tween = N),
      (N.prototype = {
        constructor: N,
        init: function (i, s, u, h, b, v) {
          (this.elem = i),
            (this.prop = u),
            (this.easing = b || f.easing._default),
            (this.options = s),
            (this.start = this.now = this.cur()),
            (this.end = h),
            (this.unit = v || (f.cssNumber[u] ? "" : "px"));
        },
        cur: function () {
          var i = N.propHooks[this.prop];
          return i && i.get ? i.get(this) : N.propHooks._default.get(this);
        },
        run: function (i) {
          var s,
            u = N.propHooks[this.prop];
          return (
            this.options.duration
              ? (this.pos = s =
                  f.easing[this.easing](
                    i,
                    this.options.duration * i,
                    0,
                    1,
                    this.options.duration
                  ))
              : (this.pos = s = i),
            (this.now = (this.end - this.start) * s + this.start),
            this.options.step &&
              this.options.step.call(this.elem, this.now, this),
            u && u.set ? u.set(this) : N.propHooks._default.set(this),
            this
          );
        },
      }),
      (N.prototype.init.prototype = N.prototype),
      (N.propHooks = {
        _default: {
          get: function (i) {
            var s;
            return i.elem.nodeType !== 1 ||
              (i.elem[i.prop] != null && i.elem.style[i.prop] == null)
              ? i.elem[i.prop]
              : ((s = f.css(i.elem, i.prop, "")), !s || s === "auto" ? 0 : s);
          },
          set: function (i) {
            f.fx.step[i.prop]
              ? f.fx.step[i.prop](i)
              : i.elem.nodeType === 1 &&
                (f.cssHooks[i.prop] || i.elem.style[Hi(i.prop)] != null)
              ? f.style(i.elem, i.prop, i.now + i.unit)
              : (i.elem[i.prop] = i.now);
          },
        },
      }),
      (N.propHooks.scrollTop = N.propHooks.scrollLeft =
        {
          set: function (i) {
            i.elem.nodeType && i.elem.parentNode && (i.elem[i.prop] = i.now);
          },
        }),
      (f.easing = {
        linear: function (i) {
          return i;
        },
        swing: function (i) {
          return 0.5 - Math.cos(i * Math.PI) / 2;
        },
        _default: "swing",
      }),
      (f.fx = N.prototype.init),
      (f.fx.step = {});
    var B,
      V,
      ie = /^(?:toggle|show|hide)$/,
      Te = /queueHooks$/;
    function Ne() {
      V &&
        (L.hidden === !1 && t.requestAnimationFrame
          ? t.requestAnimationFrame(Ne)
          : t.setTimeout(Ne, f.fx.interval),
        f.fx.tick());
    }
    function pe() {
      return (
        t.setTimeout(function () {
          B = void 0;
        }),
        (B = Date.now())
      );
    }
    function je(i, s) {
      var u,
        h = 0,
        b = { height: i };
      for (s = s ? 1 : 0; h < 4; h += 2 - s)
        (u = jt[h]), (b["margin" + u] = b["padding" + u] = i);
      return s && (b.opacity = b.width = i), b;
    }
    function Ge(i, s, u) {
      for (
        var h,
          b = (He.tweeners[s] || []).concat(He.tweeners["*"]),
          v = 0,
          x = b.length;
        v < x;
        v++
      )
        if ((h = b[v].call(u, s, i))) return h;
    }
    function et(i, s, u) {
      var h,
        b,
        v,
        x,
        O,
        R,
        F,
        Q,
        ee = "width" in s || "height" in s,
        W = this,
        oe = {},
        Be = i.style,
        it = i.nodeType && pt(i),
        Ye = re.get(i, "fxshow");
      u.queue ||
        ((x = f._queueHooks(i, "fx")),
        x.unqueued == null &&
          ((x.unqueued = 0),
          (O = x.empty.fire),
          (x.empty.fire = function () {
            x.unqueued || O();
          })),
        x.unqueued++,
        W.always(function () {
          W.always(function () {
            x.unqueued--, f.queue(i, "fx").length || x.empty.fire();
          });
        }));
      for (h in s)
        if (((b = s[h]), ie.test(b))) {
          if (
            (delete s[h],
            (v = v || b === "toggle"),
            b === (it ? "hide" : "show"))
          )
            if (b === "show" && Ye && Ye[h] !== void 0) it = !0;
            else continue;
          oe[h] = (Ye && Ye[h]) || f.style(i, h);
        }
      if (((R = !f.isEmptyObject(s)), !(!R && f.isEmptyObject(oe)))) {
        ee &&
          i.nodeType === 1 &&
          ((u.overflow = [Be.overflow, Be.overflowX, Be.overflowY]),
          (F = Ye && Ye.display),
          F == null && (F = re.get(i, "display")),
          (Q = f.css(i, "display")),
          Q === "none" &&
            (F
              ? (Q = F)
              : (Dn([i], !0),
                (F = i.style.display || F),
                (Q = f.css(i, "display")),
                Dn([i]))),
          (Q === "inline" || (Q === "inline-block" && F != null)) &&
            f.css(i, "float") === "none" &&
            (R ||
              (W.done(function () {
                Be.display = F;
              }),
              F == null && ((Q = Be.display), (F = Q === "none" ? "" : Q))),
            (Be.display = "inline-block"))),
          u.overflow &&
            ((Be.overflow = "hidden"),
            W.always(function () {
              (Be.overflow = u.overflow[0]),
                (Be.overflowX = u.overflow[1]),
                (Be.overflowY = u.overflow[2]);
            })),
          (R = !1);
        for (h in oe)
          R ||
            (Ye
              ? "hidden" in Ye && (it = Ye.hidden)
              : (Ye = re.access(i, "fxshow", { display: F })),
            v && (Ye.hidden = !it),
            it && Dn([i], !0),
            W.done(function () {
              it || Dn([i]), re.remove(i, "fxshow");
              for (h in oe) f.style(i, h, oe[h]);
            })),
            (R = Ge(it ? Ye[h] : 0, h, W)),
            h in Ye ||
              ((Ye[h] = R.start), it && ((R.end = R.start), (R.start = 0)));
      }
    }
    function wt(i, s) {
      var u, h, b, v, x;
      for (u in i)
        if (
          ((h = ke(u)),
          (b = s[h]),
          (v = i[u]),
          Array.isArray(v) && ((b = v[1]), (v = i[u] = v[0])),
          u !== h && ((i[h] = v), delete i[u]),
          (x = f.cssHooks[h]),
          x && "expand" in x)
        ) {
          (v = x.expand(v)), delete i[h];
          for (u in v) u in i || ((i[u] = v[u]), (s[u] = b));
        } else s[h] = b;
    }
    function He(i, s, u) {
      var h,
        b,
        v = 0,
        x = He.prefilters.length,
        O = f.Deferred().always(function () {
          delete R.elem;
        }),
        R = function () {
          if (b) return !1;
          for (
            var ee = B || pe(),
              W = Math.max(0, F.startTime + F.duration - ee),
              oe = W / F.duration || 0,
              Be = 1 - oe,
              it = 0,
              Ye = F.tweens.length;
            it < Ye;
            it++
          )
            F.tweens[it].run(Be);
          return (
            O.notifyWith(i, [F, Be, W]),
            Be < 1 && Ye
              ? W
              : (Ye || O.notifyWith(i, [F, 1, 0]), O.resolveWith(i, [F]), !1)
          );
        },
        F = O.promise({
          elem: i,
          props: f.extend({}, s),
          opts: f.extend(
            !0,
            { specialEasing: {}, easing: f.easing._default },
            u
          ),
          originalProperties: s,
          originalOptions: u,
          startTime: B || pe(),
          duration: u.duration,
          tweens: [],
          createTween: function (ee, W) {
            var oe = f.Tween(
              i,
              F.opts,
              ee,
              W,
              F.opts.specialEasing[ee] || F.opts.easing
            );
            return F.tweens.push(oe), oe;
          },
          stop: function (ee) {
            var W = 0,
              oe = ee ? F.tweens.length : 0;
            if (b) return this;
            for (b = !0; W < oe; W++) F.tweens[W].run(1);
            return (
              ee
                ? (O.notifyWith(i, [F, 1, 0]), O.resolveWith(i, [F, ee]))
                : O.rejectWith(i, [F, ee]),
              this
            );
          },
        }),
        Q = F.props;
      for (wt(Q, F.opts.specialEasing); v < x; v++)
        if (((h = He.prefilters[v].call(F, i, Q, F.opts)), h))
          return (
            K(h.stop) &&
              (f._queueHooks(F.elem, F.opts.queue).stop = h.stop.bind(h)),
            h
          );
      return (
        f.map(Q, Ge, F),
        K(F.opts.start) && F.opts.start.call(i, F),
        F.progress(F.opts.progress)
          .done(F.opts.done, F.opts.complete)
          .fail(F.opts.fail)
          .always(F.opts.always),
        f.fx.timer(f.extend(R, { elem: i, anim: F, queue: F.opts.queue })),
        F
      );
    }
    (f.Animation = f.extend(He, {
      tweeners: {
        "*": [
          function (i, s) {
            var u = this.createTween(i, s);
            return Yn(u.elem, i, Jt.exec(s), u), u;
          },
        ],
      },
      tweener: function (i, s) {
        K(i) ? ((s = i), (i = ["*"])) : (i = i.match(Ce));
        for (var u, h = 0, b = i.length; h < b; h++)
          (u = i[h]),
            (He.tweeners[u] = He.tweeners[u] || []),
            He.tweeners[u].unshift(s);
      },
      prefilters: [et],
      prefilter: function (i, s) {
        s ? He.prefilters.unshift(i) : He.prefilters.push(i);
      },
    })),
      (f.speed = function (i, s, u) {
        var h =
          i && typeof i == "object"
            ? f.extend({}, i)
            : {
                complete: u || (!u && s) || (K(i) && i),
                duration: i,
                easing: (u && s) || (s && !K(s) && s),
              };
        return (
          f.fx.off
            ? (h.duration = 0)
            : typeof h.duration != "number" &&
              (h.duration in f.fx.speeds
                ? (h.duration = f.fx.speeds[h.duration])
                : (h.duration = f.fx.speeds._default)),
          (h.queue == null || h.queue === !0) && (h.queue = "fx"),
          (h.old = h.complete),
          (h.complete = function () {
            K(h.old) && h.old.call(this), h.queue && f.dequeue(this, h.queue);
          }),
          h
        );
      }),
      f.fn.extend({
        fadeTo: function (i, s, u, h) {
          return this.filter(pt)
            .css("opacity", 0)
            .show()
            .end()
            .animate({ opacity: s }, i, u, h);
        },
        animate: function (i, s, u, h) {
          var b = f.isEmptyObject(i),
            v = f.speed(s, u, h),
            x = function () {
              var O = He(this, f.extend({}, i), v);
              (b || re.get(this, "finish")) && O.stop(!0);
            };
          return (
            (x.finish = x),
            b || v.queue === !1 ? this.each(x) : this.queue(v.queue, x)
          );
        },
        stop: function (i, s, u) {
          var h = function (b) {
            var v = b.stop;
            delete b.stop, v(u);
          };
          return (
            typeof i != "string" && ((u = s), (s = i), (i = void 0)),
            s && this.queue(i || "fx", []),
            this.each(function () {
              var b = !0,
                v = i != null && i + "queueHooks",
                x = f.timers,
                O = re.get(this);
              if (v) O[v] && O[v].stop && h(O[v]);
              else for (v in O) O[v] && O[v].stop && Te.test(v) && h(O[v]);
              for (v = x.length; v--; )
                x[v].elem === this &&
                  (i == null || x[v].queue === i) &&
                  (x[v].anim.stop(u), (b = !1), x.splice(v, 1));
              (b || !u) && f.dequeue(this, i);
            })
          );
        },
        finish: function (i) {
          return (
            i !== !1 && (i = i || "fx"),
            this.each(function () {
              var s,
                u = re.get(this),
                h = u[i + "queue"],
                b = u[i + "queueHooks"],
                v = f.timers,
                x = h ? h.length : 0;
              for (
                u.finish = !0,
                  f.queue(this, i, []),
                  b && b.stop && b.stop.call(this, !0),
                  s = v.length;
                s--;

              )
                v[s].elem === this &&
                  v[s].queue === i &&
                  (v[s].anim.stop(!0), v.splice(s, 1));
              for (s = 0; s < x; s++)
                h[s] && h[s].finish && h[s].finish.call(this);
              delete u.finish;
            })
          );
        },
      }),
      f.each(["toggle", "show", "hide"], function (i, s) {
        var u = f.fn[s];
        f.fn[s] = function (h, b, v) {
          return h == null || typeof h == "boolean"
            ? u.apply(this, arguments)
            : this.animate(je(s, !0), h, b, v);
        };
      }),
      f.each(
        {
          slideDown: je("show"),
          slideUp: je("hide"),
          slideToggle: je("toggle"),
          fadeIn: { opacity: "show" },
          fadeOut: { opacity: "hide" },
          fadeToggle: { opacity: "toggle" },
        },
        function (i, s) {
          f.fn[i] = function (u, h, b) {
            return this.animate(s, u, h, b);
          };
        }
      ),
      (f.timers = []),
      (f.fx.tick = function () {
        var i,
          s = 0,
          u = f.timers;
        for (B = Date.now(); s < u.length; s++)
          (i = u[s]), !i() && u[s] === i && u.splice(s--, 1);
        u.length || f.fx.stop(), (B = void 0);
      }),
      (f.fx.timer = function (i) {
        f.timers.push(i), f.fx.start();
      }),
      (f.fx.interval = 13),
      (f.fx.start = function () {
        V || ((V = !0), Ne());
      }),
      (f.fx.stop = function () {
        V = null;
      }),
      (f.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
      (f.fn.delay = function (i, s) {
        return (
          (i = (f.fx && f.fx.speeds[i]) || i),
          (s = s || "fx"),
          this.queue(s, function (u, h) {
            var b = t.setTimeout(u, i);
            h.stop = function () {
              t.clearTimeout(b);
            };
          })
        );
      }),
      (function () {
        var i = L.createElement("input"),
          s = L.createElement("select"),
          u = s.appendChild(L.createElement("option"));
        (i.type = "checkbox"),
          ($.checkOn = i.value !== ""),
          ($.optSelected = u.selected),
          (i = L.createElement("input")),
          (i.value = "t"),
          (i.type = "radio"),
          ($.radioValue = i.value === "t");
      })();
    var yt,
      _e = f.expr.attrHandle;
    f.fn.extend({
      attr: function (i, s) {
        return be(this, f.attr, i, s, arguments.length > 1);
      },
      removeAttr: function (i) {
        return this.each(function () {
          f.removeAttr(this, i);
        });
      },
    }),
      f.extend({
        attr: function (i, s, u) {
          var h,
            b,
            v = i.nodeType;
          if (!(v === 3 || v === 8 || v === 2)) {
            if (typeof i.getAttribute > "u") return f.prop(i, s, u);
            if (
              ((v !== 1 || !f.isXMLDoc(i)) &&
                (b =
                  f.attrHooks[s.toLowerCase()] ||
                  (f.expr.match.bool.test(s) ? yt : void 0)),
              u !== void 0)
            ) {
              if (u === null) {
                f.removeAttr(i, s);
                return;
              }
              return b && "set" in b && (h = b.set(i, u, s)) !== void 0
                ? h
                : (i.setAttribute(s, u + ""), u);
            }
            return b && "get" in b && (h = b.get(i, s)) !== null
              ? h
              : ((h = f.find.attr(i, s)), h ?? void 0);
          }
        },
        attrHooks: {
          type: {
            set: function (i, s) {
              if (!$.radioValue && s === "radio" && C(i, "input")) {
                var u = i.value;
                return i.setAttribute("type", s), u && (i.value = u), s;
              }
            },
          },
        },
        removeAttr: function (i, s) {
          var u,
            h = 0,
            b = s && s.match(Ce);
          if (b && i.nodeType === 1)
            for (; (u = b[h++]); ) i.removeAttribute(u);
        },
      }),
      (yt = {
        set: function (i, s, u) {
          return s === !1 ? f.removeAttr(i, u) : i.setAttribute(u, u), u;
        },
      }),
      f.each(f.expr.match.bool.source.match(/\w+/g), function (i, s) {
        var u = _e[s] || f.find.attr;
        _e[s] = function (h, b, v) {
          var x,
            O,
            R = b.toLowerCase();
          return (
            v ||
              ((O = _e[R]),
              (_e[R] = x),
              (x = u(h, b, v) != null ? R : null),
              (_e[R] = O)),
            x
          );
        };
      });
    var Ke = /^(?:input|select|textarea|button)$/i,
      kt = /^(?:a|area)$/i;
    f.fn.extend({
      prop: function (i, s) {
        return be(this, f.prop, i, s, arguments.length > 1);
      },
      removeProp: function (i) {
        return this.each(function () {
          delete this[f.propFix[i] || i];
        });
      },
    }),
      f.extend({
        prop: function (i, s, u) {
          var h,
            b,
            v = i.nodeType;
          if (!(v === 3 || v === 8 || v === 2))
            return (
              (v !== 1 || !f.isXMLDoc(i)) &&
                ((s = f.propFix[s] || s), (b = f.propHooks[s])),
              u !== void 0
                ? b && "set" in b && (h = b.set(i, u, s)) !== void 0
                  ? h
                  : (i[s] = u)
                : b && "get" in b && (h = b.get(i, s)) !== null
                ? h
                : i[s]
            );
        },
        propHooks: {
          tabIndex: {
            get: function (i) {
              var s = f.find.attr(i, "tabindex");
              return s
                ? parseInt(s, 10)
                : Ke.test(i.nodeName) || (kt.test(i.nodeName) && i.href)
                ? 0
                : -1;
            },
          },
        },
        propFix: { for: "htmlFor", class: "className" },
      }),
      $.optSelected ||
        (f.propHooks.selected = {
          get: function (i) {
            var s = i.parentNode;
            return s && s.parentNode && s.parentNode.selectedIndex, null;
          },
          set: function (i) {
            var s = i.parentNode;
            s && (s.selectedIndex, s.parentNode && s.parentNode.selectedIndex);
          },
        }),
      f.each(
        [
          "tabIndex",
          "readOnly",
          "maxLength",
          "cellSpacing",
          "cellPadding",
          "rowSpan",
          "colSpan",
          "useMap",
          "frameBorder",
          "contentEditable",
        ],
        function () {
          f.propFix[this.toLowerCase()] = this;
        }
      );
    function St(i) {
      var s = i.match(Ce) || [];
      return s.join(" ");
    }
    function Nt(i) {
      return (i.getAttribute && i.getAttribute("class")) || "";
    }
    function sn(i) {
      return Array.isArray(i)
        ? i
        : typeof i == "string"
        ? i.match(Ce) || []
        : [];
    }
    f.fn.extend({
      addClass: function (i) {
        var s, u, h, b, v, x;
        return K(i)
          ? this.each(function (O) {
              f(this).addClass(i.call(this, O, Nt(this)));
            })
          : ((s = sn(i)),
            s.length
              ? this.each(function () {
                  if (
                    ((h = Nt(this)),
                    (u = this.nodeType === 1 && " " + St(h) + " "),
                    u)
                  ) {
                    for (v = 0; v < s.length; v++)
                      (b = s[v]),
                        u.indexOf(" " + b + " ") < 0 && (u += b + " ");
                    (x = St(u)), h !== x && this.setAttribute("class", x);
                  }
                })
              : this);
      },
      removeClass: function (i) {
        var s, u, h, b, v, x;
        return K(i)
          ? this.each(function (O) {
              f(this).removeClass(i.call(this, O, Nt(this)));
            })
          : arguments.length
          ? ((s = sn(i)),
            s.length
              ? this.each(function () {
                  if (
                    ((h = Nt(this)),
                    (u = this.nodeType === 1 && " " + St(h) + " "),
                    u)
                  ) {
                    for (v = 0; v < s.length; v++)
                      for (b = s[v]; u.indexOf(" " + b + " ") > -1; )
                        u = u.replace(" " + b + " ", " ");
                    (x = St(u)), h !== x && this.setAttribute("class", x);
                  }
                })
              : this)
          : this.attr("class", "");
      },
      toggleClass: function (i, s) {
        var u,
          h,
          b,
          v,
          x = typeof i,
          O = x === "string" || Array.isArray(i);
        return K(i)
          ? this.each(function (R) {
              f(this).toggleClass(i.call(this, R, Nt(this), s), s);
            })
          : typeof s == "boolean" && O
          ? s
            ? this.addClass(i)
            : this.removeClass(i)
          : ((u = sn(i)),
            this.each(function () {
              if (O)
                for (v = f(this), b = 0; b < u.length; b++)
                  (h = u[b]), v.hasClass(h) ? v.removeClass(h) : v.addClass(h);
              else
                (i === void 0 || x === "boolean") &&
                  ((h = Nt(this)),
                  h && re.set(this, "__className__", h),
                  this.setAttribute &&
                    this.setAttribute(
                      "class",
                      h || i === !1 ? "" : re.get(this, "__className__") || ""
                    ));
            }));
      },
      hasClass: function (i) {
        var s,
          u,
          h = 0;
        for (s = " " + i + " "; (u = this[h++]); )
          if (u.nodeType === 1 && (" " + St(Nt(u)) + " ").indexOf(s) > -1)
            return !0;
        return !1;
      },
    });
    var Di = /\r/g;
    f.fn.extend({
      val: function (i) {
        var s,
          u,
          h,
          b = this[0];
        return arguments.length
          ? ((h = K(i)),
            this.each(function (v) {
              var x;
              this.nodeType === 1 &&
                (h ? (x = i.call(this, v, f(this).val())) : (x = i),
                x == null
                  ? (x = "")
                  : typeof x == "number"
                  ? (x += "")
                  : Array.isArray(x) &&
                    (x = f.map(x, function (O) {
                      return O == null ? "" : O + "";
                    })),
                (s =
                  f.valHooks[this.type] ||
                  f.valHooks[this.nodeName.toLowerCase()]),
                (!s || !("set" in s) || s.set(this, x, "value") === void 0) &&
                  (this.value = x));
            }))
          : b
          ? ((s = f.valHooks[b.type] || f.valHooks[b.nodeName.toLowerCase()]),
            s && "get" in s && (u = s.get(b, "value")) !== void 0
              ? u
              : ((u = b.value),
                typeof u == "string" ? u.replace(Di, "") : u ?? ""))
          : void 0;
      },
    }),
      f.extend({
        valHooks: {
          option: {
            get: function (i) {
              var s = f.find.attr(i, "value");
              return s ?? St(f.text(i));
            },
          },
          select: {
            get: function (i) {
              var s,
                u,
                h,
                b = i.options,
                v = i.selectedIndex,
                x = i.type === "select-one",
                O = x ? null : [],
                R = x ? v + 1 : b.length;
              for (v < 0 ? (h = R) : (h = x ? v : 0); h < R; h++)
                if (
                  ((u = b[h]),
                  (u.selected || h === v) &&
                    !u.disabled &&
                    (!u.parentNode.disabled || !C(u.parentNode, "optgroup")))
                ) {
                  if (((s = f(u).val()), x)) return s;
                  O.push(s);
                }
              return O;
            },
            set: function (i, s) {
              for (
                var u, h, b = i.options, v = f.makeArray(s), x = b.length;
                x--;

              )
                (h = b[x]),
                  (h.selected = f.inArray(f.valHooks.option.get(h), v) > -1) &&
                    (u = !0);
              return u || (i.selectedIndex = -1), v;
            },
          },
        },
      }),
      f.each(["radio", "checkbox"], function () {
        (f.valHooks[this] = {
          set: function (i, s) {
            if (Array.isArray(s))
              return (i.checked = f.inArray(f(i).val(), s) > -1);
          },
        }),
          $.checkOn ||
            (f.valHooks[this].get = function (i) {
              return i.getAttribute("value") === null ? "on" : i.value;
            });
      });
    var bi = t.location,
      rl = { guid: Date.now() },
      so = /\?/;
    f.parseXML = function (i) {
      var s, u;
      if (!i || typeof i != "string") return null;
      try {
        s = new t.DOMParser().parseFromString(i, "text/xml");
      } catch {}
      return (
        (u = s && s.getElementsByTagName("parsererror")[0]),
        (!s || u) &&
          f.error(
            "Invalid XML: " +
              (u
                ? f.map(u.childNodes, function (h) {
                    return h.textContent;
                  }).join(`
`)
                : i)
          ),
        s
      );
    };
    var sl = /^(?:focusinfocus|focusoutblur)$/,
      ol = function (i) {
        i.stopPropagation();
      };
    f.extend(f.event, {
      trigger: function (i, s, u, h) {
        var b,
          v,
          x,
          O,
          R,
          F,
          Q,
          ee,
          W = [u || L],
          oe = A.call(i, "type") ? i.type : i,
          Be = A.call(i, "namespace") ? i.namespace.split(".") : [];
        if (
          ((v = ee = x = u = u || L),
          !(u.nodeType === 3 || u.nodeType === 8) &&
            !sl.test(oe + f.event.triggered) &&
            (oe.indexOf(".") > -1 &&
              ((Be = oe.split(".")), (oe = Be.shift()), Be.sort()),
            (R = oe.indexOf(":") < 0 && "on" + oe),
            (i = i[f.expando] ? i : new f.Event(oe, typeof i == "object" && i)),
            (i.isTrigger = h ? 2 : 3),
            (i.namespace = Be.join(".")),
            (i.rnamespace = i.namespace
              ? new RegExp("(^|\\.)" + Be.join("\\.(?:.*\\.|)") + "(\\.|$)")
              : null),
            (i.result = void 0),
            i.target || (i.target = u),
            (s = s == null ? [i] : f.makeArray(s, [i])),
            (Q = f.event.special[oe] || {}),
            !(!h && Q.trigger && Q.trigger.apply(u, s) === !1)))
        ) {
          if (!h && !Q.noBubble && !de(u)) {
            for (
              O = Q.delegateType || oe, sl.test(O + oe) || (v = v.parentNode);
              v;
              v = v.parentNode
            )
              W.push(v), (x = v);
            x === (u.ownerDocument || L) &&
              W.push(x.defaultView || x.parentWindow || t);
          }
          for (b = 0; (v = W[b++]) && !i.isPropagationStopped(); )
            (ee = v),
              (i.type = b > 1 ? O : Q.bindType || oe),
              (F =
                (re.get(v, "events") || Object.create(null))[i.type] &&
                re.get(v, "handle")),
              F && F.apply(v, s),
              (F = R && v[R]),
              F &&
                F.apply &&
                Ae(v) &&
                ((i.result = F.apply(v, s)),
                i.result === !1 && i.preventDefault());
          return (
            (i.type = oe),
            !h &&
              !i.isDefaultPrevented() &&
              (!Q._default || Q._default.apply(W.pop(), s) === !1) &&
              Ae(u) &&
              R &&
              K(u[oe]) &&
              !de(u) &&
              ((x = u[R]),
              x && (u[R] = null),
              (f.event.triggered = oe),
              i.isPropagationStopped() && ee.addEventListener(oe, ol),
              u[oe](),
              i.isPropagationStopped() && ee.removeEventListener(oe, ol),
              (f.event.triggered = void 0),
              x && (u[R] = x)),
            i.result
          );
        }
      },
      simulate: function (i, s, u) {
        var h = f.extend(new f.Event(), u, { type: i, isSimulated: !0 });
        f.event.trigger(h, null, s);
      },
    }),
      f.fn.extend({
        trigger: function (i, s) {
          return this.each(function () {
            f.event.trigger(i, s, this);
          });
        },
        triggerHandler: function (i, s) {
          var u = this[0];
          if (u) return f.event.trigger(i, s, u, !0);
        },
      });
    var nh = /\[\]$/,
      al = /\r?\n/g,
      ih = /^(?:submit|button|image|reset|file)$/i,
      rh = /^(?:input|select|textarea|keygen)/i;
    function oo(i, s, u, h) {
      var b;
      if (Array.isArray(s))
        f.each(s, function (v, x) {
          u || nh.test(i)
            ? h(i, x)
            : oo(
                i + "[" + (typeof x == "object" && x != null ? v : "") + "]",
                x,
                u,
                h
              );
        });
      else if (!u && J(s) === "object")
        for (b in s) oo(i + "[" + b + "]", s[b], u, h);
      else h(i, s);
    }
    (f.param = function (i, s) {
      var u,
        h = [],
        b = function (v, x) {
          var O = K(x) ? x() : x;
          h[h.length] =
            encodeURIComponent(v) + "=" + encodeURIComponent(O ?? "");
        };
      if (i == null) return "";
      if (Array.isArray(i) || (i.jquery && !f.isPlainObject(i)))
        f.each(i, function () {
          b(this.name, this.value);
        });
      else for (u in i) oo(u, i[u], s, b);
      return h.join("&");
    }),
      f.fn.extend({
        serialize: function () {
          return f.param(this.serializeArray());
        },
        serializeArray: function () {
          return this.map(function () {
            var i = f.prop(this, "elements");
            return i ? f.makeArray(i) : this;
          })
            .filter(function () {
              var i = this.type;
              return (
                this.name &&
                !f(this).is(":disabled") &&
                rh.test(this.nodeName) &&
                !ih.test(i) &&
                (this.checked || !di.test(i))
              );
            })
            .map(function (i, s) {
              var u = f(this).val();
              return u == null
                ? null
                : Array.isArray(u)
                ? f.map(u, function (h) {
                    return {
                      name: s.name,
                      value: h.replace(
                        al,
                        `\r
`
                      ),
                    };
                  })
                : {
                    name: s.name,
                    value: u.replace(
                      al,
                      `\r
`
                    ),
                  };
            })
            .get();
        },
      });
    var sh = /%20/g,
      oh = /#.*$/,
      ah = /([?&])_=[^&]*/,
      lh = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      ch = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      uh = /^(?:GET|HEAD)$/,
      fh = /^\/\//,
      ll = {},
      ao = {},
      cl = "*/".concat("*"),
      lo = L.createElement("a");
    lo.href = bi.href;
    function ul(i) {
      return function (s, u) {
        typeof s != "string" && ((u = s), (s = "*"));
        var h,
          b = 0,
          v = s.toLowerCase().match(Ce) || [];
        if (K(u))
          for (; (h = v[b++]); )
            h[0] === "+"
              ? ((h = h.slice(1) || "*"), (i[h] = i[h] || []).unshift(u))
              : (i[h] = i[h] || []).push(u);
      };
    }
    function fl(i, s, u, h) {
      var b = {},
        v = i === ao;
      function x(O) {
        var R;
        return (
          (b[O] = !0),
          f.each(i[O] || [], function (F, Q) {
            var ee = Q(s, u, h);
            if (typeof ee == "string" && !v && !b[ee])
              return s.dataTypes.unshift(ee), x(ee), !1;
            if (v) return !(R = ee);
          }),
          R
        );
      }
      return x(s.dataTypes[0]) || (!b["*"] && x("*"));
    }
    function co(i, s) {
      var u,
        h,
        b = f.ajaxSettings.flatOptions || {};
      for (u in s) s[u] !== void 0 && ((b[u] ? i : h || (h = {}))[u] = s[u]);
      return h && f.extend(!0, i, h), i;
    }
    function hh(i, s, u) {
      for (var h, b, v, x, O = i.contents, R = i.dataTypes; R[0] === "*"; )
        R.shift(),
          h === void 0 &&
            (h = i.mimeType || s.getResponseHeader("Content-Type"));
      if (h) {
        for (b in O)
          if (O[b] && O[b].test(h)) {
            R.unshift(b);
            break;
          }
      }
      if (R[0] in u) v = R[0];
      else {
        for (b in u) {
          if (!R[0] || i.converters[b + " " + R[0]]) {
            v = b;
            break;
          }
          x || (x = b);
        }
        v = v || x;
      }
      if (v) return v !== R[0] && R.unshift(v), u[v];
    }
    function dh(i, s, u, h) {
      var b,
        v,
        x,
        O,
        R,
        F = {},
        Q = i.dataTypes.slice();
      if (Q[1]) for (x in i.converters) F[x.toLowerCase()] = i.converters[x];
      for (v = Q.shift(); v; )
        if (
          (i.responseFields[v] && (u[i.responseFields[v]] = s),
          !R && h && i.dataFilter && (s = i.dataFilter(s, i.dataType)),
          (R = v),
          (v = Q.shift()),
          v)
        ) {
          if (v === "*") v = R;
          else if (R !== "*" && R !== v) {
            if (((x = F[R + " " + v] || F["* " + v]), !x)) {
              for (b in F)
                if (
                  ((O = b.split(" ")),
                  O[1] === v && ((x = F[R + " " + O[0]] || F["* " + O[0]]), x))
                ) {
                  x === !0
                    ? (x = F[b])
                    : F[b] !== !0 && ((v = O[0]), Q.unshift(O[1]));
                  break;
                }
            }
            if (x !== !0)
              if (x && i.throws) s = x(s);
              else
                try {
                  s = x(s);
                } catch (ee) {
                  return {
                    state: "parsererror",
                    error: x ? ee : "No conversion from " + R + " to " + v,
                  };
                }
          }
        }
      return { state: "success", data: s };
    }
    f.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: bi.href,
        type: "GET",
        isLocal: ch.test(bi.protocol),
        global: !0,
        processData: !0,
        async: !0,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        accepts: {
          "*": cl,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript",
        },
        contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
        responseFields: {
          xml: "responseXML",
          text: "responseText",
          json: "responseJSON",
        },
        converters: {
          "* text": String,
          "text html": !0,
          "text json": JSON.parse,
          "text xml": f.parseXML,
        },
        flatOptions: { url: !0, context: !0 },
      },
      ajaxSetup: function (i, s) {
        return s ? co(co(i, f.ajaxSettings), s) : co(f.ajaxSettings, i);
      },
      ajaxPrefilter: ul(ll),
      ajaxTransport: ul(ao),
      ajax: function (i, s) {
        typeof i == "object" && ((s = i), (i = void 0)), (s = s || {});
        var u,
          h,
          b,
          v,
          x,
          O,
          R,
          F,
          Q,
          ee,
          W = f.ajaxSetup({}, s),
          oe = W.context || W,
          Be = W.context && (oe.nodeType || oe.jquery) ? f(oe) : f.event,
          it = f.Deferred(),
          Ye = f.Callbacks("once memory"),
          $t = W.statusCode || {},
          Ot = {},
          Sn = {},
          Pn = "canceled",
          tt = {
            readyState: 0,
            getResponseHeader: function (rt) {
              var Ct;
              if (R) {
                if (!v)
                  for (v = {}; (Ct = lh.exec(b)); )
                    v[Ct[1].toLowerCase() + " "] = (
                      v[Ct[1].toLowerCase() + " "] || []
                    ).concat(Ct[2]);
                Ct = v[rt.toLowerCase() + " "];
              }
              return Ct == null ? null : Ct.join(", ");
            },
            getAllResponseHeaders: function () {
              return R ? b : null;
            },
            setRequestHeader: function (rt, Ct) {
              return (
                R == null &&
                  ((rt = Sn[rt.toLowerCase()] = Sn[rt.toLowerCase()] || rt),
                  (Ot[rt] = Ct)),
                this
              );
            },
            overrideMimeType: function (rt) {
              return R == null && (W.mimeType = rt), this;
            },
            statusCode: function (rt) {
              var Ct;
              if (rt)
                if (R) tt.always(rt[tt.status]);
                else for (Ct in rt) $t[Ct] = [$t[Ct], rt[Ct]];
              return this;
            },
            abort: function (rt) {
              var Ct = rt || Pn;
              return u && u.abort(Ct), vi(0, Ct), this;
            },
          };
        if (
          (it.promise(tt),
          (W.url = ((i || W.url || bi.href) + "").replace(
            fh,
            bi.protocol + "//"
          )),
          (W.type = s.method || s.type || W.method || W.type),
          (W.dataTypes = (W.dataType || "*").toLowerCase().match(Ce) || [""]),
          W.crossDomain == null)
        ) {
          O = L.createElement("a");
          try {
            (O.href = W.url),
              (O.href = O.href),
              (W.crossDomain =
                lo.protocol + "//" + lo.host != O.protocol + "//" + O.host);
          } catch {
            W.crossDomain = !0;
          }
        }
        if (
          (W.data &&
            W.processData &&
            typeof W.data != "string" &&
            (W.data = f.param(W.data, W.traditional)),
          fl(ll, W, s, tt),
          R)
        )
          return tt;
        (F = f.event && W.global),
          F && f.active++ === 0 && f.event.trigger("ajaxStart"),
          (W.type = W.type.toUpperCase()),
          (W.hasContent = !uh.test(W.type)),
          (h = W.url.replace(oh, "")),
          W.hasContent
            ? W.data &&
              W.processData &&
              (W.contentType || "").indexOf(
                "application/x-www-form-urlencoded"
              ) === 0 &&
              (W.data = W.data.replace(sh, "+"))
            : ((ee = W.url.slice(h.length)),
              W.data &&
                (W.processData || typeof W.data == "string") &&
                ((h += (so.test(h) ? "&" : "?") + W.data), delete W.data),
              W.cache === !1 &&
                ((h = h.replace(ah, "$1")),
                (ee = (so.test(h) ? "&" : "?") + "_=" + rl.guid++ + ee)),
              (W.url = h + ee)),
          W.ifModified &&
            (f.lastModified[h] &&
              tt.setRequestHeader("If-Modified-Since", f.lastModified[h]),
            f.etag[h] && tt.setRequestHeader("If-None-Match", f.etag[h])),
          ((W.data && W.hasContent && W.contentType !== !1) || s.contentType) &&
            tt.setRequestHeader("Content-Type", W.contentType),
          tt.setRequestHeader(
            "Accept",
            W.dataTypes[0] && W.accepts[W.dataTypes[0]]
              ? W.accepts[W.dataTypes[0]] +
                  (W.dataTypes[0] !== "*" ? ", " + cl + "; q=0.01" : "")
              : W.accepts["*"]
          );
        for (Q in W.headers) tt.setRequestHeader(Q, W.headers[Q]);
        if (W.beforeSend && (W.beforeSend.call(oe, tt, W) === !1 || R))
          return tt.abort();
        if (
          ((Pn = "abort"),
          Ye.add(W.complete),
          tt.done(W.success),
          tt.fail(W.error),
          (u = fl(ao, W, s, tt)),
          !u)
        )
          vi(-1, "No Transport");
        else {
          if (((tt.readyState = 1), F && Be.trigger("ajaxSend", [tt, W]), R))
            return tt;
          W.async &&
            W.timeout > 0 &&
            (x = t.setTimeout(function () {
              tt.abort("timeout");
            }, W.timeout));
          try {
            (R = !1), u.send(Ot, vi);
          } catch (rt) {
            if (R) throw rt;
            vi(-1, rt);
          }
        }
        function vi(rt, Ct, xr, fo) {
          var Rn,
            Tr,
            In,
            Gn,
            Xn,
            hn = Ct;
          R ||
            ((R = !0),
            x && t.clearTimeout(x),
            (u = void 0),
            (b = fo || ""),
            (tt.readyState = rt > 0 ? 4 : 0),
            (Rn = (rt >= 200 && rt < 300) || rt === 304),
            xr && (Gn = hh(W, tt, xr)),
            !Rn &&
              f.inArray("script", W.dataTypes) > -1 &&
              f.inArray("json", W.dataTypes) < 0 &&
              (W.converters["text script"] = function () {}),
            (Gn = dh(W, Gn, tt, Rn)),
            Rn
              ? (W.ifModified &&
                  ((Xn = tt.getResponseHeader("Last-Modified")),
                  Xn && (f.lastModified[h] = Xn),
                  (Xn = tt.getResponseHeader("etag")),
                  Xn && (f.etag[h] = Xn)),
                rt === 204 || W.type === "HEAD"
                  ? (hn = "nocontent")
                  : rt === 304
                  ? (hn = "notmodified")
                  : ((hn = Gn.state),
                    (Tr = Gn.data),
                    (In = Gn.error),
                    (Rn = !In)))
              : ((In = hn),
                (rt || !hn) && ((hn = "error"), rt < 0 && (rt = 0))),
            (tt.status = rt),
            (tt.statusText = (Ct || hn) + ""),
            Rn
              ? it.resolveWith(oe, [Tr, hn, tt])
              : it.rejectWith(oe, [tt, hn, In]),
            tt.statusCode($t),
            ($t = void 0),
            F &&
              Be.trigger(Rn ? "ajaxSuccess" : "ajaxError", [
                tt,
                W,
                Rn ? Tr : In,
              ]),
            Ye.fireWith(oe, [tt, hn]),
            F &&
              (Be.trigger("ajaxComplete", [tt, W]),
              --f.active || f.event.trigger("ajaxStop")));
        }
        return tt;
      },
      getJSON: function (i, s, u) {
        return f.get(i, s, u, "json");
      },
      getScript: function (i, s) {
        return f.get(i, void 0, s, "script");
      },
    }),
      f.each(["get", "post"], function (i, s) {
        f[s] = function (u, h, b, v) {
          return (
            K(h) && ((v = v || b), (b = h), (h = void 0)),
            f.ajax(
              f.extend(
                { url: u, type: s, dataType: v, data: h, success: b },
                f.isPlainObject(u) && u
              )
            )
          );
        };
      }),
      f.ajaxPrefilter(function (i) {
        var s;
        for (s in i.headers)
          s.toLowerCase() === "content-type" &&
            (i.contentType = i.headers[s] || "");
      }),
      (f._evalUrl = function (i, s, u) {
        return f.ajax({
          url: i,
          type: "GET",
          dataType: "script",
          cache: !0,
          async: !1,
          global: !1,
          converters: { "text script": function () {} },
          dataFilter: function (h) {
            f.globalEval(h, s, u);
          },
        });
      }),
      f.fn.extend({
        wrapAll: function (i) {
          var s;
          return (
            this[0] &&
              (K(i) && (i = i.call(this[0])),
              (s = f(i, this[0].ownerDocument).eq(0).clone(!0)),
              this[0].parentNode && s.insertBefore(this[0]),
              s
                .map(function () {
                  for (var u = this; u.firstElementChild; )
                    u = u.firstElementChild;
                  return u;
                })
                .append(this)),
            this
          );
        },
        wrapInner: function (i) {
          return K(i)
            ? this.each(function (s) {
                f(this).wrapInner(i.call(this, s));
              })
            : this.each(function () {
                var s = f(this),
                  u = s.contents();
                u.length ? u.wrapAll(i) : s.append(i);
              });
        },
        wrap: function (i) {
          var s = K(i);
          return this.each(function (u) {
            f(this).wrapAll(s ? i.call(this, u) : i);
          });
        },
        unwrap: function (i) {
          return (
            this.parent(i)
              .not("body")
              .each(function () {
                f(this).replaceWith(this.childNodes);
              }),
            this
          );
        },
      }),
      (f.expr.pseudos.hidden = function (i) {
        return !f.expr.pseudos.visible(i);
      }),
      (f.expr.pseudos.visible = function (i) {
        return !!(i.offsetWidth || i.offsetHeight || i.getClientRects().length);
      }),
      (f.ajaxSettings.xhr = function () {
        try {
          return new t.XMLHttpRequest();
        } catch {}
      });
    var ph = { 0: 200, 1223: 204 },
      wr = f.ajaxSettings.xhr();
    ($.cors = !!wr && "withCredentials" in wr),
      ($.ajax = wr = !!wr),
      f.ajaxTransport(function (i) {
        var s, u;
        if ($.cors || (wr && !i.crossDomain))
          return {
            send: function (h, b) {
              var v,
                x = i.xhr();
              if (
                (x.open(i.type, i.url, i.async, i.username, i.password),
                i.xhrFields)
              )
                for (v in i.xhrFields) x[v] = i.xhrFields[v];
              i.mimeType &&
                x.overrideMimeType &&
                x.overrideMimeType(i.mimeType),
                !i.crossDomain &&
                  !h["X-Requested-With"] &&
                  (h["X-Requested-With"] = "XMLHttpRequest");
              for (v in h) x.setRequestHeader(v, h[v]);
              (s = function (O) {
                return function () {
                  s &&
                    ((s =
                      u =
                      x.onload =
                      x.onerror =
                      x.onabort =
                      x.ontimeout =
                      x.onreadystatechange =
                        null),
                    O === "abort"
                      ? x.abort()
                      : O === "error"
                      ? typeof x.status != "number"
                        ? b(0, "error")
                        : b(x.status, x.statusText)
                      : b(
                          ph[x.status] || x.status,
                          x.statusText,
                          (x.responseType || "text") !== "text" ||
                            typeof x.responseText != "string"
                            ? { binary: x.response }
                            : { text: x.responseText },
                          x.getAllResponseHeaders()
                        ));
                };
              }),
                (x.onload = s()),
                (u = x.onerror = x.ontimeout = s("error")),
                x.onabort !== void 0
                  ? (x.onabort = u)
                  : (x.onreadystatechange = function () {
                      x.readyState === 4 &&
                        t.setTimeout(function () {
                          s && u();
                        });
                    }),
                (s = s("abort"));
              try {
                x.send((i.hasContent && i.data) || null);
              } catch (O) {
                if (s) throw O;
              }
            },
            abort: function () {
              s && s();
            },
          };
      }),
      f.ajaxPrefilter(function (i) {
        i.crossDomain && (i.contents.script = !1);
      }),
      f.ajaxSetup({
        accepts: {
          script:
            "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
        },
        contents: { script: /\b(?:java|ecma)script\b/ },
        converters: {
          "text script": function (i) {
            return f.globalEval(i), i;
          },
        },
      }),
      f.ajaxPrefilter("script", function (i) {
        i.cache === void 0 && (i.cache = !1), i.crossDomain && (i.type = "GET");
      }),
      f.ajaxTransport("script", function (i) {
        if (i.crossDomain || i.scriptAttrs) {
          var s, u;
          return {
            send: function (h, b) {
              (s = f("<script>")
                .attr(i.scriptAttrs || {})
                .prop({ charset: i.scriptCharset, src: i.url })
                .on(
                  "load error",
                  (u = function (v) {
                    s.remove(),
                      (u = null),
                      v && b(v.type === "error" ? 404 : 200, v.type);
                  })
                )),
                L.head.appendChild(s[0]);
            },
            abort: function () {
              u && u();
            },
          };
        }
      });
    var hl = [],
      uo = /(=)\?(?=&|$)|\?\?/;
    f.ajaxSetup({
      jsonp: "callback",
      jsonpCallback: function () {
        var i = hl.pop() || f.expando + "_" + rl.guid++;
        return (this[i] = !0), i;
      },
    }),
      f.ajaxPrefilter("json jsonp", function (i, s, u) {
        var h,
          b,
          v,
          x =
            i.jsonp !== !1 &&
            (uo.test(i.url)
              ? "url"
              : typeof i.data == "string" &&
                (i.contentType || "").indexOf(
                  "application/x-www-form-urlencoded"
                ) === 0 &&
                uo.test(i.data) &&
                "data");
        if (x || i.dataTypes[0] === "jsonp")
          return (
            (h = i.jsonpCallback =
              K(i.jsonpCallback) ? i.jsonpCallback() : i.jsonpCallback),
            x
              ? (i[x] = i[x].replace(uo, "$1" + h))
              : i.jsonp !== !1 &&
                (i.url += (so.test(i.url) ? "&" : "?") + i.jsonp + "=" + h),
            (i.converters["script json"] = function () {
              return v || f.error(h + " was not called"), v[0];
            }),
            (i.dataTypes[0] = "json"),
            (b = t[h]),
            (t[h] = function () {
              v = arguments;
            }),
            u.always(function () {
              b === void 0 ? f(t).removeProp(h) : (t[h] = b),
                i[h] && ((i.jsonpCallback = s.jsonpCallback), hl.push(h)),
                v && K(b) && b(v[0]),
                (v = b = void 0);
            }),
            "script"
          );
      }),
      ($.createHTMLDocument = (function () {
        var i = L.implementation.createHTMLDocument("").body;
        return (
          (i.innerHTML = "<form></form><form></form>"),
          i.childNodes.length === 2
        );
      })()),
      (f.parseHTML = function (i, s, u) {
        if (typeof i != "string") return [];
        typeof s == "boolean" && ((u = s), (s = !1));
        var h, b, v;
        return (
          s ||
            ($.createHTMLDocument
              ? ((s = L.implementation.createHTMLDocument("")),
                (h = s.createElement("base")),
                (h.href = L.location.href),
                s.head.appendChild(h))
              : (s = L)),
          (b = ft.exec(i)),
          (v = !u && []),
          b
            ? [s.createElement(b[1])]
            : ((b = hr([i], s, v)),
              v && v.length && f(v).remove(),
              f.merge([], b.childNodes))
        );
      }),
      (f.fn.load = function (i, s, u) {
        var h,
          b,
          v,
          x = this,
          O = i.indexOf(" ");
        return (
          O > -1 && ((h = St(i.slice(O))), (i = i.slice(0, O))),
          K(s)
            ? ((u = s), (s = void 0))
            : s && typeof s == "object" && (b = "POST"),
          x.length > 0 &&
            f
              .ajax({ url: i, type: b || "GET", dataType: "html", data: s })
              .done(function (R) {
                (v = arguments),
                  x.html(h ? f("<div>").append(f.parseHTML(R)).find(h) : R);
              })
              .always(
                u &&
                  function (R, F) {
                    x.each(function () {
                      u.apply(this, v || [R.responseText, F, R]);
                    });
                  }
              ),
          this
        );
      }),
      (f.expr.pseudos.animated = function (i) {
        return f.grep(f.timers, function (s) {
          return i === s.elem;
        }).length;
      }),
      (f.offset = {
        setOffset: function (i, s, u) {
          var h,
            b,
            v,
            x,
            O,
            R,
            F,
            Q = f.css(i, "position"),
            ee = f(i),
            W = {};
          Q === "static" && (i.style.position = "relative"),
            (O = ee.offset()),
            (v = f.css(i, "top")),
            (R = f.css(i, "left")),
            (F =
              (Q === "absolute" || Q === "fixed") &&
              (v + R).indexOf("auto") > -1),
            F
              ? ((h = ee.position()), (x = h.top), (b = h.left))
              : ((x = parseFloat(v) || 0), (b = parseFloat(R) || 0)),
            K(s) && (s = s.call(i, u, f.extend({}, O))),
            s.top != null && (W.top = s.top - O.top + x),
            s.left != null && (W.left = s.left - O.left + b),
            "using" in s ? s.using.call(i, W) : ee.css(W);
        },
      }),
      f.fn.extend({
        offset: function (i) {
          if (arguments.length)
            return i === void 0
              ? this
              : this.each(function (b) {
                  f.offset.setOffset(this, i, b);
                });
          var s,
            u,
            h = this[0];
          if (h)
            return h.getClientRects().length
              ? ((s = h.getBoundingClientRect()),
                (u = h.ownerDocument.defaultView),
                { top: s.top + u.pageYOffset, left: s.left + u.pageXOffset })
              : { top: 0, left: 0 };
        },
        position: function () {
          if (this[0]) {
            var i,
              s,
              u,
              h = this[0],
              b = { top: 0, left: 0 };
            if (f.css(h, "position") === "fixed") s = h.getBoundingClientRect();
            else {
              for (
                s = this.offset(),
                  u = h.ownerDocument,
                  i = h.offsetParent || u.documentElement;
                i &&
                (i === u.body || i === u.documentElement) &&
                f.css(i, "position") === "static";

              )
                i = i.parentNode;
              i &&
                i !== h &&
                i.nodeType === 1 &&
                ((b = f(i).offset()),
                (b.top += f.css(i, "borderTopWidth", !0)),
                (b.left += f.css(i, "borderLeftWidth", !0)));
            }
            return {
              top: s.top - b.top - f.css(h, "marginTop", !0),
              left: s.left - b.left - f.css(h, "marginLeft", !0),
            };
          }
        },
        offsetParent: function () {
          return this.map(function () {
            for (
              var i = this.offsetParent;
              i && f.css(i, "position") === "static";

            )
              i = i.offsetParent;
            return i || un;
          });
        },
      }),
      f.each(
        { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
        function (i, s) {
          var u = s === "pageYOffset";
          f.fn[i] = function (h) {
            return be(
              this,
              function (b, v, x) {
                var O;
                if (
                  (de(b) ? (O = b) : b.nodeType === 9 && (O = b.defaultView),
                  x === void 0)
                )
                  return O ? O[s] : b[v];
                O
                  ? O.scrollTo(u ? O.pageXOffset : x, u ? x : O.pageYOffset)
                  : (b[v] = x);
              },
              i,
              h,
              arguments.length
            );
          };
        }
      ),
      f.each(["top", "left"], function (i, s) {
        f.cssHooks[s] = Zr($.pixelPosition, function (u, h) {
          if (h)
            return (h = Jn(u, s)), Bn.test(h) ? f(u).position()[s] + "px" : h;
        });
      }),
      f.each({ Height: "height", Width: "width" }, function (i, s) {
        f.each(
          { padding: "inner" + i, content: s, "": "outer" + i },
          function (u, h) {
            f.fn[h] = function (b, v) {
              var x = arguments.length && (u || typeof b != "boolean"),
                O = u || (b === !0 || v === !0 ? "margin" : "border");
              return be(
                this,
                function (R, F, Q) {
                  var ee;
                  return de(R)
                    ? h.indexOf("outer") === 0
                      ? R["inner" + i]
                      : R.document.documentElement["client" + i]
                    : R.nodeType === 9
                    ? ((ee = R.documentElement),
                      Math.max(
                        R.body["scroll" + i],
                        ee["scroll" + i],
                        R.body["offset" + i],
                        ee["offset" + i],
                        ee["client" + i]
                      ))
                    : Q === void 0
                    ? f.css(R, F, O)
                    : f.style(R, F, Q, O);
                },
                s,
                x ? b : void 0,
                x
              );
            };
          }
        );
      }),
      f.each(
        [
          "ajaxStart",
          "ajaxStop",
          "ajaxComplete",
          "ajaxError",
          "ajaxSuccess",
          "ajaxSend",
        ],
        function (i, s) {
          f.fn[s] = function (u) {
            return this.on(s, u);
          };
        }
      ),
      f.fn.extend({
        bind: function (i, s, u) {
          return this.on(i, null, s, u);
        },
        unbind: function (i, s) {
          return this.off(i, null, s);
        },
        delegate: function (i, s, u, h) {
          return this.on(s, i, u, h);
        },
        undelegate: function (i, s, u) {
          return arguments.length === 1
            ? this.off(i, "**")
            : this.off(s, i || "**", u);
        },
        hover: function (i, s) {
          return this.on("mouseenter", i).on("mouseleave", s || i);
        },
      }),
      f.each(
        "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
          " "
        ),
        function (i, s) {
          f.fn[s] = function (u, h) {
            return arguments.length > 0
              ? this.on(s, null, u, h)
              : this.trigger(s);
          };
        }
      );
    var gh = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
    (f.proxy = function (i, s) {
      var u, h, b;
      if ((typeof s == "string" && ((u = i[s]), (s = i), (i = u)), !!K(i)))
        return (
          (h = l.call(arguments, 2)),
          (b = function () {
            return i.apply(s || this, h.concat(l.call(arguments)));
          }),
          (b.guid = i.guid = i.guid || f.guid++),
          b
        );
    }),
      (f.holdReady = function (i) {
        i ? f.readyWait++ : f.ready(!0);
      }),
      (f.isArray = Array.isArray),
      (f.parseJSON = JSON.parse),
      (f.nodeName = C),
      (f.isFunction = K),
      (f.isWindow = de),
      (f.camelCase = ke),
      (f.type = J),
      (f.now = Date.now),
      (f.isNumeric = function (i) {
        var s = f.type(i);
        return (s === "number" || s === "string") && !isNaN(i - parseFloat(i));
      }),
      (f.trim = function (i) {
        return i == null ? "" : (i + "").replace(gh, "$1");
      });
    var mh = t.jQuery,
      yh = t.$;
    return (
      (f.noConflict = function (i) {
        return (
          t.$ === f && (t.$ = yh), i && t.jQuery === f && (t.jQuery = mh), f
        );
      }),
      typeof n > "u" && (t.jQuery = t.$ = f),
      f
    );
  });
})(Lb);
typeof navigator == "object" &&
  (function (e, t) {
    typeof exports == "object" && typeof module < "u"
      ? (module.exports = t())
      : typeof define == "function" && define.amd
      ? define("Plyr", t)
      : ((e = typeof globalThis < "u" ? globalThis : e || self).Plyr = t());
  })(globalThis, function () {
    function e(a, d, c) {
      return (
        (d = (function (m) {
          var _ = (function (E, N) {
            if (typeof E != "object" || E === null) return E;
            var B = E[Symbol.toPrimitive];
            if (B !== void 0) {
              var V = B.call(E, N || "default");
              if (typeof V != "object") return V;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return (N === "string" ? String : Number)(E);
          })(m, "string");
          return typeof _ == "symbol" ? _ : String(_);
        })(d)) in a
          ? Object.defineProperty(a, d, {
              value: c,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (a[d] = c),
        a
      );
    }
    function t(a, d) {
      for (var c = 0; c < d.length; c++) {
        var m = d[c];
        (m.enumerable = m.enumerable || !1),
          (m.configurable = !0),
          "value" in m && (m.writable = !0),
          Object.defineProperty(a, m.key, m);
      }
    }
    function n(a, d, c) {
      return (
        d in a
          ? Object.defineProperty(a, d, {
              value: c,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (a[d] = c),
        a
      );
    }
    function r(a, d) {
      var c = Object.keys(a);
      if (Object.getOwnPropertySymbols) {
        var m = Object.getOwnPropertySymbols(a);
        d &&
          (m = m.filter(function (_) {
            return Object.getOwnPropertyDescriptor(a, _).enumerable;
          })),
          c.push.apply(c, m);
      }
      return c;
    }
    function o(a) {
      for (var d = 1; d < arguments.length; d++) {
        var c = arguments[d] != null ? arguments[d] : {};
        d % 2
          ? r(Object(c), !0).forEach(function (m) {
              n(a, m, c[m]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(c))
          : r(Object(c)).forEach(function (m) {
              Object.defineProperty(
                a,
                m,
                Object.getOwnPropertyDescriptor(c, m)
              );
            });
      }
      return a;
    }
    var l = { addCSS: !0, thumbWidth: 15, watch: !0 },
      p = function (a) {
        return a != null ? a.constructor : null;
      },
      g = function (a, d) {
        return !!(a && d && a instanceof d);
      },
      y = function (a) {
        return a == null;
      },
      T = function (a) {
        return p(a) === Object;
      },
      w = function (a) {
        return p(a) === String;
      },
      A = function (a) {
        return Array.isArray(a);
      },
      P = function (a) {
        return g(a, NodeList);
      },
      H = {
        nullOrUndefined: y,
        object: T,
        number: function (a) {
          return p(a) === Number && !Number.isNaN(a);
        },
        string: w,
        boolean: function (a) {
          return p(a) === Boolean;
        },
        function: function (a) {
          return p(a) === Function;
        },
        array: A,
        nodeList: P,
        element: function (a) {
          return g(a, Element);
        },
        event: function (a) {
          return g(a, Event);
        },
        empty: function (a) {
          return (
            y(a) ||
            ((w(a) || A(a) || P(a)) && !a.length) ||
            (T(a) && !Object.keys(a).length)
          );
        },
      };
    function $(a, d) {
      if (1 > d) {
        var c = (function (m) {
          var _ = "".concat(m).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
          return _
            ? Math.max(0, (_[1] ? _[1].length : 0) - (_[2] ? +_[2] : 0))
            : 0;
        })(d);
        return parseFloat(a.toFixed(c));
      }
      return Math.round(a / d) * d;
    }
    var K = (function () {
      function a(d, c) {
        (function (m, _) {
          if (!(m instanceof _))
            throw new TypeError("Cannot call a class as a function");
        })(this, a),
          H.element(d)
            ? (this.element = d)
            : H.string(d) && (this.element = document.querySelector(d)),
          H.element(this.element) &&
            H.empty(this.element.rangeTouch) &&
            ((this.config = o({}, l, {}, c)), this.init());
      }
      return (
        (function (d, c, m) {
          c && t(d.prototype, c), m && t(d, m);
        })(
          a,
          [
            {
              key: "init",
              value: function () {
                a.enabled &&
                  (this.config.addCSS &&
                    ((this.element.style.userSelect = "none"),
                    (this.element.style.webKitUserSelect = "none"),
                    (this.element.style.touchAction = "manipulation")),
                  this.listeners(!0),
                  (this.element.rangeTouch = this));
              },
            },
            {
              key: "destroy",
              value: function () {
                a.enabled &&
                  (this.config.addCSS &&
                    ((this.element.style.userSelect = ""),
                    (this.element.style.webKitUserSelect = ""),
                    (this.element.style.touchAction = "")),
                  this.listeners(!1),
                  (this.element.rangeTouch = null));
              },
            },
            {
              key: "listeners",
              value: function (d) {
                var c = this,
                  m = d ? "addEventListener" : "removeEventListener";
                ["touchstart", "touchmove", "touchend"].forEach(function (_) {
                  c.element[m](
                    _,
                    function (E) {
                      return c.set(E);
                    },
                    !1
                  );
                });
              },
            },
            {
              key: "get",
              value: function (d) {
                if (!a.enabled || !H.event(d)) return null;
                var c,
                  m = d.target,
                  _ = d.changedTouches[0],
                  E = parseFloat(m.getAttribute("min")) || 0,
                  N = parseFloat(m.getAttribute("max")) || 100,
                  B = parseFloat(m.getAttribute("step")) || 1,
                  V = m.getBoundingClientRect(),
                  ie = ((100 / V.width) * (this.config.thumbWidth / 2)) / 100;
                return (
                  0 > (c = (100 / V.width) * (_.clientX - V.left))
                    ? (c = 0)
                    : 100 < c && (c = 100),
                  50 > c
                    ? (c -= (100 - 2 * c) * ie)
                    : 50 < c && (c += 2 * (c - 50) * ie),
                  E + $((c / 100) * (N - E), B)
                );
              },
            },
            {
              key: "set",
              value: function (d) {
                a.enabled &&
                  H.event(d) &&
                  !d.target.disabled &&
                  (d.preventDefault(),
                  (d.target.value = this.get(d)),
                  (function (c, m) {
                    if (c && m) {
                      var _ = new Event(m, { bubbles: !0 });
                      c.dispatchEvent(_);
                    }
                  })(d.target, d.type === "touchend" ? "change" : "input"));
              },
            },
          ],
          [
            {
              key: "setup",
              value: function (d) {
                var c =
                    1 < arguments.length && arguments[1] !== void 0
                      ? arguments[1]
                      : {},
                  m = null;
                if (
                  (H.empty(d) || H.string(d)
                    ? (m = Array.from(
                        document.querySelectorAll(
                          H.string(d) ? d : 'input[type="range"]'
                        )
                      ))
                    : H.element(d)
                    ? (m = [d])
                    : H.nodeList(d)
                    ? (m = Array.from(d))
                    : H.array(d) && (m = d.filter(H.element)),
                  H.empty(m))
                )
                  return null;
                var _ = o({}, l, {}, c);
                if (H.string(d) && _.watch) {
                  var E = new MutationObserver(function (N) {
                    Array.from(N).forEach(function (B) {
                      Array.from(B.addedNodes).forEach(function (V) {
                        H.element(V) &&
                          (function (ie, Te) {
                            return function () {
                              return Array.from(
                                document.querySelectorAll(Te)
                              ).includes(this);
                            }.call(ie, Te);
                          })(V, d) &&
                          new a(V, _);
                      });
                    });
                  });
                  E.observe(document.body, { childList: !0, subtree: !0 });
                }
                return m.map(function (N) {
                  return new a(N, c);
                });
              },
            },
            {
              key: "enabled",
              get: function () {
                return "ontouchstart" in document.documentElement;
              },
            },
          ]
        ),
        a
      );
    })();
    const de = (a) => (a != null ? a.constructor : null),
      L = (a, d) => !!(a && d && a instanceof d),
      U = (a) => a == null,
      ye = (a) => de(a) === Object,
      J = (a) => de(a) === String,
      X = (a) => typeof a == "function",
      Se = (a) => Array.isArray(a),
      f = (a) => L(a, NodeList),
      ve = (a) =>
        U(a) ||
        ((J(a) || Se(a) || f(a)) && !a.length) ||
        (ye(a) && !Object.keys(a).length);
    var C = {
      nullOrUndefined: U,
      object: ye,
      number: (a) => de(a) === Number && !Number.isNaN(a),
      string: J,
      boolean: (a) => de(a) === Boolean,
      function: X,
      array: Se,
      weakMap: (a) => L(a, WeakMap),
      nodeList: f,
      element: (a) =>
        a !== null &&
        typeof a == "object" &&
        a.nodeType === 1 &&
        typeof a.style == "object" &&
        typeof a.ownerDocument == "object",
      textNode: (a) => de(a) === Text,
      event: (a) => L(a, Event),
      keyboardEvent: (a) => L(a, KeyboardEvent),
      cue: (a) => L(a, window.TextTrackCue) || L(a, window.VTTCue),
      track: (a) => L(a, TextTrack) || (!U(a) && J(a.kind)),
      promise: (a) => L(a, Promise) && X(a.then),
      url: (a) => {
        if (L(a, window.URL)) return !0;
        if (!J(a)) return !1;
        let d = a;
        (a.startsWith("http://") && a.startsWith("https://")) ||
          (d = `http://${a}`);
        try {
          return !ve(new URL(d).hostname);
        } catch {
          return !1;
        }
      },
      empty: ve,
    };
    const Ue = (() => {
      const a = document.createElement("span"),
        d = {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "oTransitionEnd otransitionend",
          transition: "transitionend",
        },
        c = Object.keys(d).find((m) => a.style[m] !== void 0);
      return !!C.string(c) && d[c];
    })();
    function We(a, d) {
      setTimeout(() => {
        try {
          (a.hidden = !0), a.offsetHeight, (a.hidden = !1);
        } catch {}
      }, d);
    }
    var Le = {
      isIE: !!window.document.documentMode,
      isEdge: /Edge/g.test(navigator.userAgent),
      isWebKit:
        "WebkitAppearance" in document.documentElement.style &&
        !/Edge/g.test(navigator.userAgent),
      isIPhone:
        /iPhone|iPod/gi.test(navigator.userAgent) &&
        navigator.maxTouchPoints > 1,
      isIPadOS:
        navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1,
      isIos:
        /iPad|iPhone|iPod/gi.test(navigator.userAgent) &&
        navigator.maxTouchPoints > 1,
    };
    function Ee(a, d) {
      return d.split(".").reduce((c, m) => c && c[m], a);
    }
    function ue(a = {}, ...d) {
      if (!d.length) return a;
      const c = d.shift();
      return C.object(c)
        ? (Object.keys(c).forEach((m) => {
            C.object(c[m])
              ? (Object.keys(a).includes(m) || Object.assign(a, { [m]: {} }),
                ue(a[m], c[m]))
              : Object.assign(a, { [m]: c[m] });
          }),
          ue(a, ...d))
        : a;
    }
    function vt(a, d) {
      const c = a.length ? a : [a];
      Array.from(c)
        .reverse()
        .forEach((m, _) => {
          const E = _ > 0 ? d.cloneNode(!0) : d,
            N = m.parentNode,
            B = m.nextSibling;
          E.appendChild(m), B ? N.insertBefore(E, B) : N.appendChild(E);
        });
    }
    function ze(a, d) {
      C.element(a) &&
        !C.empty(d) &&
        Object.entries(d)
          .filter(([, c]) => !C.nullOrUndefined(c))
          .forEach(([c, m]) => a.setAttribute(c, m));
    }
    function ae(a, d, c) {
      const m = document.createElement(a);
      return C.object(d) && ze(m, d), C.string(c) && (m.innerText = c), m;
    }
    function Qe(a, d, c, m) {
      C.element(d) && d.appendChild(ae(a, c, m));
    }
    function ht(a) {
      C.nodeList(a) || C.array(a)
        ? Array.from(a).forEach(ht)
        : C.element(a) &&
          C.element(a.parentNode) &&
          a.parentNode.removeChild(a);
    }
    function Ut(a) {
      if (!C.element(a)) return;
      let { length: d } = a.childNodes;
      for (; d > 0; ) a.removeChild(a.lastChild), (d -= 1);
    }
    function Mt(a, d) {
      return C.element(d) && C.element(d.parentNode) && C.element(a)
        ? (d.parentNode.replaceChild(a, d), a)
        : null;
    }
    function ft(a, d) {
      if (!C.string(a) || C.empty(a)) return {};
      const c = {},
        m = ue({}, d);
      return (
        a.split(",").forEach((_) => {
          const E = _.trim(),
            N = E.replace(".", ""),
            B = E.replace(/[[\]]/g, "").split("="),
            [V] = B,
            ie = B.length > 1 ? B[1].replace(/["']/g, "") : "";
          switch (E.charAt(0)) {
            case ".":
              C.string(m.class) ? (c.class = `${m.class} ${N}`) : (c.class = N);
              break;
            case "#":
              c.id = E.replace("#", "");
              break;
            case "[":
              c[V] = ie;
          }
        }),
        ue(m, c)
      );
    }
    function Lt(a, d) {
      if (!C.element(a)) return;
      let c = d;
      C.boolean(c) || (c = !a.hidden), (a.hidden = c);
    }
    function Ve(a, d, c) {
      if (C.nodeList(a)) return Array.from(a).map((m) => Ve(m, d, c));
      if (C.element(a)) {
        let m = "toggle";
        return (
          c !== void 0 && (m = c ? "add" : "remove"),
          a.classList[m](d),
          a.classList.contains(d)
        );
      }
      return !1;
    }
    function vn(a, d) {
      return C.element(a) && a.classList.contains(d);
    }
    function dt(a, d) {
      const { prototype: c } = Element;
      return (
        c.matches ||
        c.webkitMatchesSelector ||
        c.mozMatchesSelector ||
        c.msMatchesSelector ||
        function () {
          return Array.from(document.querySelectorAll(d)).includes(this);
        }
      ).call(a, d);
    }
    function te(a) {
      return this.elements.container.querySelectorAll(a);
    }
    function he(a) {
      return this.elements.container.querySelector(a);
    }
    function ge(a = null, d = !1) {
      C.element(a) && a.focus({ preventScroll: !0, focusVisible: d });
    }
    const Ce = {
        "audio/ogg": "vorbis",
        "audio/wav": "1",
        "video/webm": "vp8, vorbis",
        "video/mp4": "avc1.42E01E, mp4a.40.2",
        "video/ogg": "theora",
      },
      Oe = {
        audio: "canPlayType" in document.createElement("audio"),
        video: "canPlayType" in document.createElement("video"),
        check(a, d) {
          const c = Oe[a] || d !== "html5";
          return { api: c, ui: c && Oe.rangeInput };
        },
        pip: !(
          Le.isIPhone ||
          (!C.function(ae("video").webkitSetPresentationMode) &&
            (!document.pictureInPictureEnabled ||
              ae("video").disablePictureInPicture))
        ),
        airplay: C.function(window.WebKitPlaybackTargetAvailabilityEvent),
        playsinline: "playsInline" in document.createElement("video"),
        mime(a) {
          if (C.empty(a)) return !1;
          const [d] = a.split("/");
          let c = a;
          if (!this.isHTML5 || d !== this.type) return !1;
          Object.keys(Ce).includes(c) && (c += `; codecs="${Ce[a]}"`);
          try {
            return !!(c && this.media.canPlayType(c).replace(/no/, ""));
          } catch {
            return !1;
          }
        },
        textTracks: "textTracks" in document.createElement("video"),
        rangeInput: (() => {
          const a = document.createElement("input");
          return (a.type = "range"), a.type === "range";
        })(),
        touch: "ontouchstart" in document.documentElement,
        transitions: Ue !== !1,
        reducedMotion:
          "matchMedia" in window &&
          window.matchMedia("(prefers-reduced-motion)").matches,
      },
      I = (() => {
        let a = !1;
        try {
          const d = Object.defineProperty({}, "passive", {
            get: () => ((a = !0), null),
          });
          window.addEventListener("test", null, d),
            window.removeEventListener("test", null, d);
        } catch {}
        return a;
      })();
    function M(a, d, c, m = !1, _ = !0, E = !1) {
      if (!a || !("addEventListener" in a) || C.empty(d) || !C.function(c))
        return;
      const N = d.split(" ");
      let B = E;
      I && (B = { passive: _, capture: E }),
        N.forEach((V) => {
          this &&
            this.eventListeners &&
            m &&
            this.eventListeners.push({
              element: a,
              type: V,
              callback: c,
              options: B,
            }),
            a[m ? "addEventListener" : "removeEventListener"](V, c, B);
        });
    }
    function D(a, d = "", c, m = !0, _ = !1) {
      M.call(this, a, d, c, !0, m, _);
    }
    function G(a, d = "", c, m = !0, _ = !1) {
      M.call(this, a, d, c, !1, m, _);
    }
    function ne(a, d = "", c, m = !0, _ = !1) {
      const E = (...N) => {
        G(a, d, E, m, _), c.apply(this, N);
      };
      M.call(this, a, d, E, !0, m, _);
    }
    function z(a, d = "", c = !1, m = {}) {
      if (!C.element(a) || C.empty(d)) return;
      const _ = new CustomEvent(d, {
        bubbles: c,
        detail: { ...m, plyr: this },
      });
      a.dispatchEvent(_);
    }
    function be() {
      this &&
        this.eventListeners &&
        (this.eventListeners.forEach((a) => {
          const { element: d, type: c, callback: m, options: _ } = a;
          d.removeEventListener(c, m, _);
        }),
        (this.eventListeners = []));
    }
    function fe() {
      return new Promise((a) =>
        this.ready
          ? setTimeout(a, 0)
          : D.call(this, this.elements.container, "ready", a)
      ).then(() => {});
    }
    function le(a) {
      C.promise(a) && a.then(null, () => {});
    }
    function se(a) {
      return C.array(a) ? a.filter((d, c) => a.indexOf(d) === c) : a;
    }
    function ke(a, d) {
      return C.array(a) && a.length
        ? a.reduce((c, m) => (Math.abs(m - d) < Math.abs(c - d) ? m : c))
        : null;
    }
    function Ae(a) {
      return !(!window || !window.CSS) && window.CSS.supports(a);
    }
    const Pe = [
      [1, 1],
      [4, 3],
      [3, 4],
      [5, 4],
      [4, 5],
      [3, 2],
      [2, 3],
      [16, 10],
      [10, 16],
      [16, 9],
      [9, 16],
      [21, 9],
      [9, 21],
      [32, 9],
      [9, 32],
    ].reduce((a, [d, c]) => ({ ...a, [d / c]: [d, c] }), {});
    function re(a) {
      return C.array(a) || (C.string(a) && a.includes(":"))
        ? (C.array(a) ? a : a.split(":")).map(Number).every(C.number)
        : !1;
    }
    function Ie(a) {
      if (!C.array(a) || !a.every(C.number)) return null;
      const [d, c] = a,
        m = (E, N) => (N === 0 ? E : m(N, E % N)),
        _ = m(d, c);
      return [d / _, c / _];
    }
    function ot(a) {
      const d = (m) => (re(m) ? m.split(":").map(Number) : null);
      let c = d(a);
      if (
        (c === null && (c = d(this.config.ratio)),
        c === null &&
          !C.empty(this.embed) &&
          C.array(this.embed.ratio) &&
          ({ ratio: c } = this.embed),
        c === null && this.isHTML5)
      ) {
        const { videoWidth: m, videoHeight: _ } = this.media;
        c = [m, _];
      }
      return Ie(c);
    }
    function Je(a) {
      if (!this.isVideo) return {};
      const { wrapper: d } = this.elements,
        c = ot.call(this, a);
      if (!C.array(c)) return {};
      const [m, _] = Ie(c),
        E = (100 / m) * _;
      if (
        (Ae(`aspect-ratio: ${m}/${_}`)
          ? (d.style.aspectRatio = `${m}/${_}`)
          : (d.style.paddingBottom = `${E}%`),
        this.isVimeo && !this.config.vimeo.premium && this.supported.ui)
      ) {
        const N =
            (100 / this.media.offsetWidth) *
            parseInt(window.getComputedStyle(this.media).paddingBottom, 10),
          B = (N - E) / (N / 50);
        this.fullscreen.active
          ? (d.style.paddingBottom = null)
          : (this.media.style.transform = `translateY(-${B}%)`);
      } else this.isHTML5 && d.classList.add(this.config.classNames.videoFixedRatio);
      return { padding: E, ratio: c };
    }
    function mt(a, d, c = 0.05) {
      const m = a / d,
        _ = ke(Object.keys(Pe), m);
      return Math.abs(_ - m) <= c ? Pe[_] : [a, d];
    }
    const Tt = {
      getSources() {
        return this.isHTML5
          ? Array.from(this.media.querySelectorAll("source")).filter((a) => {
              const d = a.getAttribute("type");
              return !!C.empty(d) || Oe.mime.call(this, d);
            })
          : [];
      },
      getQualityOptions() {
        return this.config.quality.forced
          ? this.config.quality.options
          : Tt.getSources
              .call(this)
              .map((a) => Number(a.getAttribute("size")))
              .filter(Boolean);
      },
      setup() {
        if (!this.isHTML5) return;
        const a = this;
        (a.options.speed = a.config.speed.options),
          C.empty(this.config.ratio) || Je.call(a),
          Object.defineProperty(a.media, "quality", {
            get() {
              const d = Tt.getSources
                .call(a)
                .find((c) => c.getAttribute("src") === a.source);
              return d && Number(d.getAttribute("size"));
            },
            set(d) {
              if (a.quality !== d) {
                if (
                  a.config.quality.forced &&
                  C.function(a.config.quality.onChange)
                )
                  a.config.quality.onChange(d);
                else {
                  const c = Tt.getSources
                    .call(a)
                    .find((V) => Number(V.getAttribute("size")) === d);
                  if (!c) return;
                  const {
                    currentTime: m,
                    paused: _,
                    preload: E,
                    readyState: N,
                    playbackRate: B,
                  } = a.media;
                  (a.media.src = c.getAttribute("src")),
                    (E !== "none" || N) &&
                      (a.once("loadedmetadata", () => {
                        (a.speed = B), (a.currentTime = m), _ || le(a.play());
                      }),
                      a.media.load());
                }
                z.call(a, a.media, "qualitychange", !1, { quality: d });
              }
            },
          });
      },
      cancelRequests() {
        this.isHTML5 &&
          (ht(Tt.getSources.call(this)),
          this.media.setAttribute("src", this.config.blankVideo),
          this.media.load(),
          this.debug.log("Cancelled network requests"));
      },
    };
    function nn(a, ...d) {
      return C.empty(a)
        ? a
        : a.toString().replace(/{(\d+)}/g, (c, m) => d[m].toString());
    }
    const Jt = (a = "", d = "", c = "") =>
        a.replace(
          new RegExp(
            d.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1"),
            "g"
          ),
          c.toString()
        ),
      jt = (a = "") =>
        a
          .toString()
          .replace(
            /\w\S*/g,
            (d) => d.charAt(0).toUpperCase() + d.slice(1).toLowerCase()
          );
    function un(a = "") {
      let d = a.toString();
      return (
        (d = (function (c = "") {
          let m = c.toString();
          return (
            (m = Jt(m, "-", " ")),
            (m = Jt(m, "_", " ")),
            (m = jt(m)),
            Jt(m, " ", "")
          );
        })(d)),
        d.charAt(0).toLowerCase() + d.slice(1)
      );
    }
    function Et(a) {
      const d = document.createElement("div");
      return d.appendChild(a), d.innerHTML;
    }
    const Vt = {
        pip: "PIP",
        airplay: "AirPlay",
        html5: "HTML5",
        vimeo: "Vimeo",
        youtube: "YouTube",
      },
      pt = {
        get(a = "", d = {}) {
          if (C.empty(a) || C.empty(d)) return "";
          let c = Ee(d.i18n, a);
          if (C.empty(c)) return Object.keys(Vt).includes(a) ? Vt[a] : "";
          const m = { "{seektime}": d.seekTime, "{title}": d.title };
          return (
            Object.entries(m).forEach(([_, E]) => {
              c = Jt(c, _, E);
            }),
            c
          );
        },
      };
    class Yn {
      constructor(d) {
        e(this, "get", (c) => {
          if (!Yn.supported || !this.enabled) return null;
          const m = window.localStorage.getItem(this.key);
          if (C.empty(m)) return null;
          const _ = JSON.parse(m);
          return C.string(c) && c.length ? _[c] : _;
        }),
          e(this, "set", (c) => {
            if (!Yn.supported || !this.enabled || !C.object(c)) return;
            let m = this.get();
            C.empty(m) && (m = {}), ue(m, c);
            try {
              window.localStorage.setItem(this.key, JSON.stringify(m));
            } catch {}
          }),
          (this.enabled = d.config.storage.enabled),
          (this.key = d.config.storage.key);
      }
      static get supported() {
        try {
          if (!("localStorage" in window)) return !1;
          const d = "___test";
          return (
            window.localStorage.setItem(d, d),
            window.localStorage.removeItem(d),
            !0
          );
        } catch {
          return !1;
        }
      }
    }
    function Kn(a, d = "text") {
      return new Promise((c, m) => {
        try {
          const _ = new XMLHttpRequest();
          if (!("withCredentials" in _)) return;
          _.addEventListener("load", () => {
            if (d === "text")
              try {
                c(JSON.parse(_.responseText));
              } catch {
                c(_.responseText);
              }
            else c(_.response);
          }),
            _.addEventListener("error", () => {
              throw new Error(_.status);
            }),
            _.open("GET", a, !0),
            (_.responseType = d),
            _.send();
        } catch (_) {
          m(_);
        }
      });
    }
    function Jr(a, d) {
      if (!C.string(a)) return;
      const c = "cache",
        m = C.string(d);
      let _ = !1;
      const E = () => document.getElementById(d) !== null,
        N = (B, V) => {
          (B.innerHTML = V),
            (m && E()) || document.body.insertAdjacentElement("afterbegin", B);
        };
      if (!m || !E()) {
        const B = Yn.supported,
          V = document.createElement("div");
        if ((V.setAttribute("hidden", ""), m && V.setAttribute("id", d), B)) {
          const ie = window.localStorage.getItem(`${c}-${d}`);
          if (((_ = ie !== null), _)) {
            const Te = JSON.parse(ie);
            N(V, Te.content);
          }
        }
        Kn(a)
          .then((ie) => {
            if (!C.empty(ie)) {
              if (B)
                try {
                  window.localStorage.setItem(
                    `${c}-${d}`,
                    JSON.stringify({ content: ie })
                  );
                } catch {}
              N(V, ie);
            }
          })
          .catch(() => {});
      }
    }
    const Dn = (a) => Math.trunc((a / 60 / 60) % 60, 10),
      di = (a) => Math.trunc((a / 60) % 60, 10),
      Gr = (a) => Math.trunc(a % 60, 10);
    function pi(a = 0, d = !1, c = !1) {
      if (!C.number(a)) return pi(void 0, d, c);
      const m = (B) => `0${B}`.slice(-2);
      let _ = Dn(a);
      const E = di(a),
        N = Gr(a);
      return (
        (_ = d || _ > 0 ? `${_}:` : ""),
        `${c && a > 0 ? "-" : ""}${_}${m(E)}:${m(N)}`
      );
    }
    const ce = {
      getIconUrl() {
        const a = new URL(this.config.iconUrl, window.location),
          d = window.location.host
            ? window.location.host
            : window.top.location.host,
          c = a.host !== d || (Le.isIE && !window.svg4everybody);
        return { url: this.config.iconUrl, cors: c };
      },
      findElements() {
        try {
          return (
            (this.elements.controls = he.call(
              this,
              this.config.selectors.controls.wrapper
            )),
            (this.elements.buttons = {
              play: te.call(this, this.config.selectors.buttons.play),
              pause: he.call(this, this.config.selectors.buttons.pause),
              restart: he.call(this, this.config.selectors.buttons.restart),
              rewind: he.call(this, this.config.selectors.buttons.rewind),
              fastForward: he.call(
                this,
                this.config.selectors.buttons.fastForward
              ),
              mute: he.call(this, this.config.selectors.buttons.mute),
              pip: he.call(this, this.config.selectors.buttons.pip),
              airplay: he.call(this, this.config.selectors.buttons.airplay),
              settings: he.call(this, this.config.selectors.buttons.settings),
              captions: he.call(this, this.config.selectors.buttons.captions),
              fullscreen: he.call(
                this,
                this.config.selectors.buttons.fullscreen
              ),
            }),
            (this.elements.progress = he.call(
              this,
              this.config.selectors.progress
            )),
            (this.elements.inputs = {
              seek: he.call(this, this.config.selectors.inputs.seek),
              volume: he.call(this, this.config.selectors.inputs.volume),
            }),
            (this.elements.display = {
              buffer: he.call(this, this.config.selectors.display.buffer),
              currentTime: he.call(
                this,
                this.config.selectors.display.currentTime
              ),
              duration: he.call(this, this.config.selectors.display.duration),
            }),
            C.element(this.elements.progress) &&
              (this.elements.display.seekTooltip =
                this.elements.progress.querySelector(
                  `.${this.config.classNames.tooltip}`
                )),
            !0
          );
        } catch (a) {
          return (
            this.debug.warn(
              "It looks like there is a problem with your custom controls HTML",
              a
            ),
            this.toggleNativeControls(!0),
            !1
          );
        }
      },
      createIcon(a, d) {
        const c = "http://www.w3.org/2000/svg",
          m = ce.getIconUrl.call(this),
          _ = `${m.cors ? "" : m.url}#${this.config.iconPrefix}`,
          E = document.createElementNS(c, "svg");
        ze(E, ue(d, { "aria-hidden": "true", focusable: "false" }));
        const N = document.createElementNS(c, "use"),
          B = `${_}-${a}`;
        return (
          "href" in N &&
            N.setAttributeNS("http://www.w3.org/1999/xlink", "href", B),
          N.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", B),
          E.appendChild(N),
          E
        );
      },
      createLabel(a, d = {}) {
        const c = pt.get(a, this.config);
        return ae(
          "span",
          {
            ...d,
            class: [d.class, this.config.classNames.hidden]
              .filter(Boolean)
              .join(" "),
          },
          c
        );
      },
      createBadge(a) {
        if (C.empty(a)) return null;
        const d = ae("span", { class: this.config.classNames.menu.value });
        return (
          d.appendChild(
            ae("span", { class: this.config.classNames.menu.badge }, a)
          ),
          d
        );
      },
      createButton(a, d) {
        const c = ue({}, d);
        let m = un(a);
        const _ = {
          element: "button",
          toggle: !1,
          label: null,
          icon: null,
          labelPressed: null,
          iconPressed: null,
        };
        switch (
          (["element", "icon", "label"].forEach((N) => {
            Object.keys(c).includes(N) && ((_[N] = c[N]), delete c[N]);
          }),
          _.element !== "button" ||
            Object.keys(c).includes("type") ||
            (c.type = "button"),
          Object.keys(c).includes("class")
            ? c.class
                .split(" ")
                .some((N) => N === this.config.classNames.control) ||
              ue(c, { class: `${c.class} ${this.config.classNames.control}` })
            : (c.class = this.config.classNames.control),
          a)
        ) {
          case "play":
            (_.toggle = !0),
              (_.label = "play"),
              (_.labelPressed = "pause"),
              (_.icon = "play"),
              (_.iconPressed = "pause");
            break;
          case "mute":
            (_.toggle = !0),
              (_.label = "mute"),
              (_.labelPressed = "unmute"),
              (_.icon = "volume"),
              (_.iconPressed = "muted");
            break;
          case "captions":
            (_.toggle = !0),
              (_.label = "enableCaptions"),
              (_.labelPressed = "disableCaptions"),
              (_.icon = "captions-off"),
              (_.iconPressed = "captions-on");
            break;
          case "fullscreen":
            (_.toggle = !0),
              (_.label = "enterFullscreen"),
              (_.labelPressed = "exitFullscreen"),
              (_.icon = "enter-fullscreen"),
              (_.iconPressed = "exit-fullscreen");
            break;
          case "play-large":
            (c.class += ` ${this.config.classNames.control}--overlaid`),
              (m = "play"),
              (_.label = "play"),
              (_.icon = "play");
            break;
          default:
            C.empty(_.label) && (_.label = m), C.empty(_.icon) && (_.icon = a);
        }
        const E = ae(_.element);
        return (
          _.toggle
            ? (E.appendChild(
                ce.createIcon.call(this, _.iconPressed, {
                  class: "icon--pressed",
                })
              ),
              E.appendChild(
                ce.createIcon.call(this, _.icon, { class: "icon--not-pressed" })
              ),
              E.appendChild(
                ce.createLabel.call(this, _.labelPressed, {
                  class: "label--pressed",
                })
              ),
              E.appendChild(
                ce.createLabel.call(this, _.label, {
                  class: "label--not-pressed",
                })
              ))
            : (E.appendChild(ce.createIcon.call(this, _.icon)),
              E.appendChild(ce.createLabel.call(this, _.label))),
          ue(c, ft(this.config.selectors.buttons[m], c)),
          ze(E, c),
          m === "play"
            ? (C.array(this.elements.buttons[m]) ||
                (this.elements.buttons[m] = []),
              this.elements.buttons[m].push(E))
            : (this.elements.buttons[m] = E),
          E
        );
      },
      createRange(a, d) {
        const c = ae(
          "input",
          ue(
            ft(this.config.selectors.inputs[a]),
            {
              type: "range",
              min: 0,
              max: 100,
              step: 0.01,
              value: 0,
              autocomplete: "off",
              role: "slider",
              "aria-label": pt.get(a, this.config),
              "aria-valuemin": 0,
              "aria-valuemax": 100,
              "aria-valuenow": 0,
            },
            d
          )
        );
        return (
          (this.elements.inputs[a] = c),
          ce.updateRangeFill.call(this, c),
          K.setup(c),
          c
        );
      },
      createProgress(a, d) {
        const c = ae(
          "progress",
          ue(
            ft(this.config.selectors.display[a]),
            {
              min: 0,
              max: 100,
              value: 0,
              role: "progressbar",
              "aria-hidden": !0,
            },
            d
          )
        );
        if (a !== "volume") {
          c.appendChild(ae("span", null, "0"));
          const m = { played: "played", buffer: "buffered" }[a],
            _ = m ? pt.get(m, this.config) : "";
          c.innerText = `% ${_.toLowerCase()}`;
        }
        return (this.elements.display[a] = c), c;
      },
      createTime(a, d) {
        const c = ft(this.config.selectors.display[a], d),
          m = ae(
            "div",
            ue(c, {
              class: `${c.class ? c.class : ""} ${
                this.config.classNames.display.time
              } `.trim(),
              "aria-label": pt.get(a, this.config),
              role: "timer",
            }),
            "00:00"
          );
        return (this.elements.display[a] = m), m;
      },
      bindMenuItemShortcuts(a, d) {
        D.call(
          this,
          a,
          "keydown keyup",
          (c) => {
            if (
              ![" ", "ArrowUp", "ArrowDown", "ArrowRight"].includes(c.key) ||
              (c.preventDefault(), c.stopPropagation(), c.type === "keydown")
            )
              return;
            const m = dt(a, '[role="menuitemradio"]');
            if (!m && [" ", "ArrowRight"].includes(c.key))
              ce.showMenuPanel.call(this, d, !0);
            else {
              let _;
              c.key !== " " &&
                (c.key === "ArrowDown" || (m && c.key === "ArrowRight")
                  ? ((_ = a.nextElementSibling),
                    C.element(_) || (_ = a.parentNode.firstElementChild))
                  : ((_ = a.previousElementSibling),
                    C.element(_) || (_ = a.parentNode.lastElementChild)),
                ge.call(this, _, !0));
            }
          },
          !1
        ),
          D.call(this, a, "keyup", (c) => {
            c.key === "Return" && ce.focusFirstMenuItem.call(this, null, !0);
          });
      },
      createMenuItem({
        value: a,
        list: d,
        type: c,
        title: m,
        badge: _ = null,
        checked: E = !1,
      }) {
        const N = ft(this.config.selectors.inputs[c]),
          B = ae(
            "button",
            ue(N, {
              type: "button",
              role: "menuitemradio",
              class: `${this.config.classNames.control} ${
                N.class ? N.class : ""
              }`.trim(),
              "aria-checked": E,
              value: a,
            })
          ),
          V = ae("span");
        (V.innerHTML = m),
          C.element(_) && V.appendChild(_),
          B.appendChild(V),
          Object.defineProperty(B, "checked", {
            enumerable: !0,
            get: () => B.getAttribute("aria-checked") === "true",
            set(ie) {
              ie &&
                Array.from(B.parentNode.children)
                  .filter((Te) => dt(Te, '[role="menuitemradio"]'))
                  .forEach((Te) => Te.setAttribute("aria-checked", "false")),
                B.setAttribute("aria-checked", ie ? "true" : "false");
            },
          }),
          this.listeners.bind(
            B,
            "click keyup",
            (ie) => {
              if (!C.keyboardEvent(ie) || ie.key === " ") {
                switch (
                  (ie.preventDefault(),
                  ie.stopPropagation(),
                  (B.checked = !0),
                  c)
                ) {
                  case "language":
                    this.currentTrack = Number(a);
                    break;
                  case "quality":
                    this.quality = a;
                    break;
                  case "speed":
                    this.speed = parseFloat(a);
                }
                ce.showMenuPanel.call(this, "home", C.keyboardEvent(ie));
              }
            },
            c,
            !1
          ),
          ce.bindMenuItemShortcuts.call(this, B, c),
          d.appendChild(B);
      },
      formatTime(a = 0, d = !1) {
        return C.number(a) ? pi(a, Dn(this.duration) > 0, d) : a;
      },
      updateTimeDisplay(a = null, d = 0, c = !1) {
        C.element(a) && C.number(d) && (a.innerText = ce.formatTime(d, c));
      },
      updateVolume() {
        this.supported.ui &&
          (C.element(this.elements.inputs.volume) &&
            ce.setRange.call(
              this,
              this.elements.inputs.volume,
              this.muted ? 0 : this.volume
            ),
          C.element(this.elements.buttons.mute) &&
            (this.elements.buttons.mute.pressed =
              this.muted || this.volume === 0));
      },
      setRange(a, d = 0) {
        C.element(a) && ((a.value = d), ce.updateRangeFill.call(this, a));
      },
      updateProgress(a) {
        if (!this.supported.ui || !C.event(a)) return;
        let d = 0;
        const c = (E, N) => {
          const B = C.number(N) ? N : 0,
            V = C.element(E) ? E : this.elements.display.buffer;
          if (C.element(V)) {
            V.value = B;
            const ie = V.getElementsByTagName("span")[0];
            C.element(ie) && (ie.childNodes[0].nodeValue = B);
          }
        };
        if (a)
          switch (a.type) {
            case "timeupdate":
            case "seeking":
            case "seeked":
              (m = this.currentTime),
                (_ = this.duration),
                (d =
                  m === 0 || _ === 0 || Number.isNaN(m) || Number.isNaN(_)
                    ? 0
                    : ((m / _) * 100).toFixed(2)),
                a.type === "timeupdate" &&
                  ce.setRange.call(this, this.elements.inputs.seek, d);
              break;
            case "playing":
            case "progress":
              c(this.elements.display.buffer, 100 * this.buffered);
          }
        var m, _;
      },
      updateRangeFill(a) {
        const d = C.event(a) ? a.target : a;
        if (C.element(d) && d.getAttribute("type") === "range") {
          if (dt(d, this.config.selectors.inputs.seek)) {
            d.setAttribute("aria-valuenow", this.currentTime);
            const c = ce.formatTime(this.currentTime),
              m = ce.formatTime(this.duration),
              _ = pt.get("seekLabel", this.config);
            d.setAttribute(
              "aria-valuetext",
              _.replace("{currentTime}", c).replace("{duration}", m)
            );
          } else if (dt(d, this.config.selectors.inputs.volume)) {
            const c = 100 * d.value;
            d.setAttribute("aria-valuenow", c),
              d.setAttribute("aria-valuetext", `${c.toFixed(1)}%`);
          } else d.setAttribute("aria-valuenow", d.value);
          (Le.isWebKit || Le.isIPadOS) &&
            d.style.setProperty("--value", (d.value / d.max) * 100 + "%");
        }
      },
      updateSeekTooltip(a) {
        var d, c;
        if (
          !this.config.tooltips.seek ||
          !C.element(this.elements.inputs.seek) ||
          !C.element(this.elements.display.seekTooltip) ||
          this.duration === 0
        )
          return;
        const m = this.elements.display.seekTooltip,
          _ = `${this.config.classNames.tooltip}--visible`,
          E = (Te) => Ve(m, _, Te);
        if (this.touch) return void E(!1);
        let N = 0;
        const B = this.elements.progress.getBoundingClientRect();
        if (C.event(a)) N = (100 / B.width) * (a.pageX - B.left);
        else {
          if (!vn(m, _)) return;
          N = parseFloat(m.style.left, 10);
        }
        N < 0 ? (N = 0) : N > 100 && (N = 100);
        const V = (this.duration / 100) * N;
        m.innerText = ce.formatTime(V);
        const ie =
          (d = this.config.markers) === null ||
          d === void 0 ||
          (c = d.points) === null ||
          c === void 0
            ? void 0
            : c.find(({ time: Te }) => Te === Math.round(V));
        ie && m.insertAdjacentHTML("afterbegin", `${ie.label}<br>`),
          (m.style.left = `${N}%`),
          C.event(a) &&
            ["mouseenter", "mouseleave"].includes(a.type) &&
            E(a.type === "mouseenter");
      },
      timeUpdate(a) {
        const d =
          !C.element(this.elements.display.duration) && this.config.invertTime;
        ce.updateTimeDisplay.call(
          this,
          this.elements.display.currentTime,
          d ? this.duration - this.currentTime : this.currentTime,
          d
        ),
          (a && a.type === "timeupdate" && this.media.seeking) ||
            ce.updateProgress.call(this, a);
      },
      durationUpdate() {
        if (!this.supported.ui || (!this.config.invertTime && this.currentTime))
          return;
        if (this.duration >= 2 ** 32)
          return (
            Lt(this.elements.display.currentTime, !0),
            void Lt(this.elements.progress, !0)
          );
        C.element(this.elements.inputs.seek) &&
          this.elements.inputs.seek.setAttribute(
            "aria-valuemax",
            this.duration
          );
        const a = C.element(this.elements.display.duration);
        !a &&
          this.config.displayDuration &&
          this.paused &&
          ce.updateTimeDisplay.call(
            this,
            this.elements.display.currentTime,
            this.duration
          ),
          a &&
            ce.updateTimeDisplay.call(
              this,
              this.elements.display.duration,
              this.duration
            ),
          this.config.markers.enabled && ce.setMarkers.call(this),
          ce.updateSeekTooltip.call(this);
      },
      toggleMenuButton(a, d) {
        Lt(this.elements.settings.buttons[a], !d);
      },
      updateSetting(a, d, c) {
        const m = this.elements.settings.panels[a];
        let _ = null,
          E = d;
        if (a === "captions") _ = this.currentTrack;
        else {
          if (
            ((_ = C.empty(c) ? this[a] : c),
            C.empty(_) && (_ = this.config[a].default),
            !C.empty(this.options[a]) && !this.options[a].includes(_))
          )
            return void this.debug.warn(`Unsupported value of '${_}' for ${a}`);
          if (!this.config[a].options.includes(_))
            return void this.debug.warn(`Disabled value of '${_}' for ${a}`);
        }
        if (
          (C.element(E) || (E = m && m.querySelector('[role="menu"]')),
          !C.element(E))
        )
          return;
        this.elements.settings.buttons[a].querySelector(
          `.${this.config.classNames.menu.value}`
        ).innerHTML = ce.getLabel.call(this, a, _);
        const N = E && E.querySelector(`[value="${_}"]`);
        C.element(N) && (N.checked = !0);
      },
      getLabel(a, d) {
        switch (a) {
          case "speed":
            return d === 1 ? pt.get("normal", this.config) : `${d}&times;`;
          case "quality":
            if (C.number(d)) {
              const c = pt.get(`qualityLabel.${d}`, this.config);
              return c.length ? c : `${d}p`;
            }
            return jt(d);
          case "captions":
            return nt.getLabel.call(this);
          default:
            return null;
        }
      },
      setQualityMenu(a) {
        if (!C.element(this.elements.settings.panels.quality)) return;
        const d = "quality",
          c =
            this.elements.settings.panels.quality.querySelector(
              '[role="menu"]'
            );
        C.array(a) &&
          (this.options.quality = se(a).filter((E) =>
            this.config.quality.options.includes(E)
          ));
        const m =
          !C.empty(this.options.quality) && this.options.quality.length > 1;
        if (
          (ce.toggleMenuButton.call(this, d, m),
          Ut(c),
          ce.checkMenu.call(this),
          !m)
        )
          return;
        const _ = (E) => {
          const N = pt.get(`qualityBadge.${E}`, this.config);
          return N.length ? ce.createBadge.call(this, N) : null;
        };
        this.options.quality
          .sort((E, N) => {
            const B = this.config.quality.options;
            return B.indexOf(E) > B.indexOf(N) ? 1 : -1;
          })
          .forEach((E) => {
            ce.createMenuItem.call(this, {
              value: E,
              list: c,
              type: d,
              title: ce.getLabel.call(this, "quality", E),
              badge: _(E),
            });
          }),
          ce.updateSetting.call(this, d, c);
      },
      setCaptionsMenu() {
        if (!C.element(this.elements.settings.panels.captions)) return;
        const a = "captions",
          d =
            this.elements.settings.panels.captions.querySelector(
              '[role="menu"]'
            ),
          c = nt.getTracks.call(this),
          m = !!c.length;
        if (
          (ce.toggleMenuButton.call(this, a, m),
          Ut(d),
          ce.checkMenu.call(this),
          !m)
        )
          return;
        const _ = c.map((E, N) => ({
          value: N,
          checked: this.captions.toggled && this.currentTrack === N,
          title: nt.getLabel.call(this, E),
          badge:
            E.language && ce.createBadge.call(this, E.language.toUpperCase()),
          list: d,
          type: "language",
        }));
        _.unshift({
          value: -1,
          checked: !this.captions.toggled,
          title: pt.get("disabled", this.config),
          list: d,
          type: "language",
        }),
          _.forEach(ce.createMenuItem.bind(this)),
          ce.updateSetting.call(this, a, d);
      },
      setSpeedMenu() {
        if (!C.element(this.elements.settings.panels.speed)) return;
        const a = "speed",
          d =
            this.elements.settings.panels.speed.querySelector('[role="menu"]');
        this.options.speed = this.options.speed.filter(
          (m) => m >= this.minimumSpeed && m <= this.maximumSpeed
        );
        const c = !C.empty(this.options.speed) && this.options.speed.length > 1;
        ce.toggleMenuButton.call(this, a, c),
          Ut(d),
          ce.checkMenu.call(this),
          c &&
            (this.options.speed.forEach((m) => {
              ce.createMenuItem.call(this, {
                value: m,
                list: d,
                type: a,
                title: ce.getLabel.call(this, "speed", m),
              });
            }),
            ce.updateSetting.call(this, a, d));
      },
      checkMenu() {
        const { buttons: a } = this.elements.settings,
          d = !C.empty(a) && Object.values(a).some((c) => !c.hidden);
        Lt(this.elements.settings.menu, !d);
      },
      focusFirstMenuItem(a, d = !1) {
        if (this.elements.settings.popup.hidden) return;
        let c = a;
        C.element(c) ||
          (c = Object.values(this.elements.settings.panels).find(
            (_) => !_.hidden
          ));
        const m = c.querySelector('[role^="menuitem"]');
        ge.call(this, m, d);
      },
      toggleMenu(a) {
        const { popup: d } = this.elements.settings,
          c = this.elements.buttons.settings;
        if (!C.element(d) || !C.element(c)) return;
        const { hidden: m } = d;
        let _ = m;
        if (C.boolean(a)) _ = a;
        else if (C.keyboardEvent(a) && a.key === "Escape") _ = !1;
        else if (C.event(a)) {
          const E = C.function(a.composedPath) ? a.composedPath()[0] : a.target,
            N = d.contains(E);
          if (N || (!N && a.target !== c && _)) return;
        }
        c.setAttribute("aria-expanded", _),
          Lt(d, !_),
          Ve(this.elements.container, this.config.classNames.menu.open, _),
          _ && C.keyboardEvent(a)
            ? ce.focusFirstMenuItem.call(this, null, !0)
            : _ || m || ge.call(this, c, C.keyboardEvent(a));
      },
      getMenuSize(a) {
        const d = a.cloneNode(!0);
        (d.style.position = "absolute"),
          (d.style.opacity = 0),
          d.removeAttribute("hidden"),
          a.parentNode.appendChild(d);
        const c = d.scrollWidth,
          m = d.scrollHeight;
        return ht(d), { width: c, height: m };
      },
      showMenuPanel(a = "", d = !1) {
        const c = this.elements.container.querySelector(
          `#plyr-settings-${this.id}-${a}`
        );
        if (!C.element(c)) return;
        const m = c.parentNode,
          _ = Array.from(m.children).find((E) => !E.hidden);
        if (Oe.transitions && !Oe.reducedMotion) {
          (m.style.width = `${_.scrollWidth}px`),
            (m.style.height = `${_.scrollHeight}px`);
          const E = ce.getMenuSize.call(this, c),
            N = (B) => {
              B.target === m &&
                ["width", "height"].includes(B.propertyName) &&
                ((m.style.width = ""),
                (m.style.height = ""),
                G.call(this, m, Ue, N));
            };
          D.call(this, m, Ue, N),
            (m.style.width = `${E.width}px`),
            (m.style.height = `${E.height}px`);
        }
        Lt(_, !0), Lt(c, !1), ce.focusFirstMenuItem.call(this, c, d);
      },
      setDownloadUrl() {
        const a = this.elements.buttons.download;
        C.element(a) && a.setAttribute("href", this.download);
      },
      create(a) {
        const {
          bindMenuItemShortcuts: d,
          createButton: c,
          createProgress: m,
          createRange: _,
          createTime: E,
          setQualityMenu: N,
          setSpeedMenu: B,
          showMenuPanel: V,
        } = ce;
        (this.elements.controls = null),
          C.array(this.config.controls) &&
            this.config.controls.includes("play-large") &&
            this.elements.container.appendChild(c.call(this, "play-large"));
        const ie = ae("div", ft(this.config.selectors.controls.wrapper));
        this.elements.controls = ie;
        const Te = { class: "plyr__controls__item" };
        return (
          se(C.array(this.config.controls) ? this.config.controls : []).forEach(
            (Ne) => {
              if (
                (Ne === "restart" &&
                  ie.appendChild(c.call(this, "restart", Te)),
                Ne === "rewind" && ie.appendChild(c.call(this, "rewind", Te)),
                Ne === "play" && ie.appendChild(c.call(this, "play", Te)),
                Ne === "fast-forward" &&
                  ie.appendChild(c.call(this, "fast-forward", Te)),
                Ne === "progress")
              ) {
                const pe = ae("div", {
                    class: `${Te.class} plyr__progress__container`,
                  }),
                  je = ae("div", ft(this.config.selectors.progress));
                if (
                  (je.appendChild(
                    _.call(this, "seek", { id: `plyr-seek-${a.id}` })
                  ),
                  je.appendChild(m.call(this, "buffer")),
                  this.config.tooltips.seek)
                ) {
                  const Ge = ae(
                    "span",
                    { class: this.config.classNames.tooltip },
                    "00:00"
                  );
                  je.appendChild(Ge), (this.elements.display.seekTooltip = Ge);
                }
                (this.elements.progress = je),
                  pe.appendChild(this.elements.progress),
                  ie.appendChild(pe);
              }
              if (
                (Ne === "current-time" &&
                  ie.appendChild(E.call(this, "currentTime", Te)),
                Ne === "duration" &&
                  ie.appendChild(E.call(this, "duration", Te)),
                Ne === "mute" || Ne === "volume")
              ) {
                let { volume: pe } = this.elements;
                if (
                  ((C.element(pe) && ie.contains(pe)) ||
                    ((pe = ae(
                      "div",
                      ue({}, Te, { class: `${Te.class} plyr__volume`.trim() })
                    )),
                    (this.elements.volume = pe),
                    ie.appendChild(pe)),
                  Ne === "mute" && pe.appendChild(c.call(this, "mute")),
                  Ne === "volume" && !Le.isIos && !Le.isIPadOS)
                ) {
                  const je = { max: 1, step: 0.05, value: this.config.volume };
                  pe.appendChild(
                    _.call(
                      this,
                      "volume",
                      ue(je, { id: `plyr-volume-${a.id}` })
                    )
                  );
                }
              }
              if (
                (Ne === "captions" &&
                  ie.appendChild(c.call(this, "captions", Te)),
                Ne === "settings" && !C.empty(this.config.settings))
              ) {
                const pe = ae(
                  "div",
                  ue({}, Te, {
                    class: `${Te.class} plyr__menu`.trim(),
                    hidden: "",
                  })
                );
                pe.appendChild(
                  c.call(this, "settings", {
                    "aria-haspopup": !0,
                    "aria-controls": `plyr-settings-${a.id}`,
                    "aria-expanded": !1,
                  })
                );
                const je = ae("div", {
                    class: "plyr__menu__container",
                    id: `plyr-settings-${a.id}`,
                    hidden: "",
                  }),
                  Ge = ae("div"),
                  et = ae("div", { id: `plyr-settings-${a.id}-home` }),
                  wt = ae("div", { role: "menu" });
                et.appendChild(wt),
                  Ge.appendChild(et),
                  (this.elements.settings.panels.home = et),
                  this.config.settings.forEach((He) => {
                    const yt = ae(
                      "button",
                      ue(ft(this.config.selectors.buttons.settings), {
                        type: "button",
                        class: `${this.config.classNames.control} ${this.config.classNames.control}--forward`,
                        role: "menuitem",
                        "aria-haspopup": !0,
                        hidden: "",
                      })
                    );
                    d.call(this, yt, He),
                      D.call(this, yt, "click", () => {
                        V.call(this, He, !1);
                      });
                    const _e = ae("span", null, pt.get(He, this.config)),
                      Ke = ae("span", {
                        class: this.config.classNames.menu.value,
                      });
                    (Ke.innerHTML = a[He]),
                      _e.appendChild(Ke),
                      yt.appendChild(_e),
                      wt.appendChild(yt);
                    const kt = ae("div", {
                        id: `plyr-settings-${a.id}-${He}`,
                        hidden: "",
                      }),
                      St = ae("button", {
                        type: "button",
                        class: `${this.config.classNames.control} ${this.config.classNames.control}--back`,
                      });
                    St.appendChild(
                      ae("span", { "aria-hidden": !0 }, pt.get(He, this.config))
                    ),
                      St.appendChild(
                        ae(
                          "span",
                          { class: this.config.classNames.hidden },
                          pt.get("menuBack", this.config)
                        )
                      ),
                      D.call(
                        this,
                        kt,
                        "keydown",
                        (Nt) => {
                          Nt.key === "ArrowLeft" &&
                            (Nt.preventDefault(),
                            Nt.stopPropagation(),
                            V.call(this, "home", !0));
                        },
                        !1
                      ),
                      D.call(this, St, "click", () => {
                        V.call(this, "home", !1);
                      }),
                      kt.appendChild(St),
                      kt.appendChild(ae("div", { role: "menu" })),
                      Ge.appendChild(kt),
                      (this.elements.settings.buttons[He] = yt),
                      (this.elements.settings.panels[He] = kt);
                  }),
                  je.appendChild(Ge),
                  pe.appendChild(je),
                  ie.appendChild(pe),
                  (this.elements.settings.popup = je),
                  (this.elements.settings.menu = pe);
              }
              if (
                (Ne === "pip" &&
                  Oe.pip &&
                  ie.appendChild(c.call(this, "pip", Te)),
                Ne === "airplay" &&
                  Oe.airplay &&
                  ie.appendChild(c.call(this, "airplay", Te)),
                Ne === "download")
              ) {
                const pe = ue({}, Te, {
                  element: "a",
                  href: this.download,
                  target: "_blank",
                });
                this.isHTML5 && (pe.download = "");
                const { download: je } = this.config.urls;
                !C.url(je) &&
                  this.isEmbed &&
                  ue(pe, {
                    icon: `logo-${this.provider}`,
                    label: this.provider,
                  }),
                  ie.appendChild(c.call(this, "download", pe));
              }
              Ne === "fullscreen" &&
                ie.appendChild(c.call(this, "fullscreen", Te));
            }
          ),
          this.isHTML5 && N.call(this, Tt.getQualityOptions.call(this)),
          B.call(this),
          ie
        );
      },
      inject() {
        if (this.config.loadSprite) {
          const _ = ce.getIconUrl.call(this);
          _.cors && Jr(_.url, "sprite-plyr");
        }
        this.id = Math.floor(1e4 * Math.random());
        let a = null;
        this.elements.controls = null;
        const d = {
          id: this.id,
          seektime: this.config.seekTime,
          title: this.config.title,
        };
        let c = !0;
        C.function(this.config.controls) &&
          (this.config.controls = this.config.controls.call(this, d)),
          this.config.controls || (this.config.controls = []),
          C.element(this.config.controls) || C.string(this.config.controls)
            ? (a = this.config.controls)
            : ((a = ce.create.call(this, {
                id: this.id,
                seektime: this.config.seekTime,
                speed: this.speed,
                quality: this.quality,
                captions: nt.getLabel.call(this),
              })),
              (c = !1));
        let m;
        if (
          (c &&
            C.string(this.config.controls) &&
            (a = ((_) => {
              let E = _;
              return (
                Object.entries(d).forEach(([N, B]) => {
                  E = Jt(E, `{${N}}`, B);
                }),
                E
              );
            })(a)),
          C.string(this.config.selectors.controls.container) &&
            (m = document.querySelector(
              this.config.selectors.controls.container
            )),
          C.element(m) || (m = this.elements.container),
          m[C.element(a) ? "insertAdjacentElement" : "insertAdjacentHTML"](
            "afterbegin",
            a
          ),
          C.element(this.elements.controls) || ce.findElements.call(this),
          !C.empty(this.elements.buttons))
        ) {
          const _ = (E) => {
            const N = this.config.classNames.controlPressed;
            E.setAttribute("aria-pressed", "false"),
              Object.defineProperty(E, "pressed", {
                configurable: !0,
                enumerable: !0,
                get: () => vn(E, N),
                set(B = !1) {
                  Ve(E, N, B),
                    E.setAttribute("aria-pressed", B ? "true" : "false");
                },
              });
          };
          Object.values(this.elements.buttons)
            .filter(Boolean)
            .forEach((E) => {
              C.array(E) || C.nodeList(E)
                ? Array.from(E).filter(Boolean).forEach(_)
                : _(E);
            });
        }
        if ((Le.isEdge && We(m), this.config.tooltips.controls)) {
          const { classNames: _, selectors: E } = this.config,
            N = `${E.controls.wrapper} ${E.labels} .${_.hidden}`,
            B = te.call(this, N);
          Array.from(B).forEach((V) => {
            Ve(V, this.config.classNames.hidden, !1),
              Ve(V, this.config.classNames.tooltip, !0);
          });
        }
      },
      setMediaMetadata() {
        try {
          "mediaSession" in navigator &&
            (navigator.mediaSession.metadata = new window.MediaMetadata({
              title: this.config.mediaMetadata.title,
              artist: this.config.mediaMetadata.artist,
              album: this.config.mediaMetadata.album,
              artwork: this.config.mediaMetadata.artwork,
            }));
        } catch {}
      },
      setMarkers() {
        var a, d;
        if (!this.duration || this.elements.markers) return;
        const c =
          (a = this.config.markers) === null ||
          a === void 0 ||
          (d = a.points) === null ||
          d === void 0
            ? void 0
            : d.filter(({ time: V }) => V > 0 && V < this.duration);
        if (c == null || !c.length) return;
        const m = document.createDocumentFragment(),
          _ = document.createDocumentFragment();
        let E = null;
        const N = `${this.config.classNames.tooltip}--visible`,
          B = (V) => Ve(E, N, V);
        c.forEach((V) => {
          const ie = ae("span", { class: this.config.classNames.marker }, ""),
            Te = (V.time / this.duration) * 100 + "%";
          E &&
            (ie.addEventListener("mouseenter", () => {
              V.label || ((E.style.left = Te), (E.innerHTML = V.label), B(!0));
            }),
            ie.addEventListener("mouseleave", () => {
              B(!1);
            })),
            ie.addEventListener("click", () => {
              this.currentTime = V.time;
            }),
            (ie.style.left = Te),
            _.appendChild(ie);
        }),
          m.appendChild(_),
          this.config.tooltips.seek ||
            ((E = ae("span", { class: this.config.classNames.tooltip }, "")),
            m.appendChild(E)),
          (this.elements.markers = { points: _, tip: E }),
          this.elements.progress.appendChild(m);
      },
    };
    function Ft(a, d = !0) {
      let c = a;
      if (d) {
        const m = document.createElement("a");
        (m.href = c), (c = m.href);
      }
      try {
        return new URL(c);
      } catch {
        return null;
      }
    }
    function Oi(a) {
      const d = new URLSearchParams();
      return (
        C.object(a) &&
          Object.entries(a).forEach(([c, m]) => {
            d.set(c, m);
          }),
        d
      );
    }
    const nt = {
        setup() {
          if (!this.supported.ui) return;
          if (
            !this.isVideo ||
            this.isYouTube ||
            (this.isHTML5 && !Oe.textTracks)
          )
            return void (
              C.array(this.config.controls) &&
              this.config.controls.includes("settings") &&
              this.config.settings.includes("captions") &&
              ce.setCaptionsMenu.call(this)
            );
          var a, d;
          if (
            (C.element(this.elements.captions) ||
              ((this.elements.captions = ae(
                "div",
                ft(this.config.selectors.captions)
              )),
              this.elements.captions.setAttribute("dir", "auto"),
              (a = this.elements.captions),
              (d = this.elements.wrapper),
              C.element(a) &&
                C.element(d) &&
                d.parentNode.insertBefore(a, d.nextSibling)),
            Le.isIE && window.URL)
          ) {
            const E = this.media.querySelectorAll("track");
            Array.from(E).forEach((N) => {
              const B = N.getAttribute("src"),
                V = Ft(B);
              V !== null &&
                V.hostname !== window.location.href.hostname &&
                ["http:", "https:"].includes(V.protocol) &&
                Kn(B, "blob")
                  .then((ie) => {
                    N.setAttribute("src", window.URL.createObjectURL(ie));
                  })
                  .catch(() => {
                    ht(N);
                  });
            });
          }
          const c = se(
            (
              navigator.languages || [
                navigator.language || navigator.userLanguage || "en",
              ]
            ).map((E) => E.split("-")[0])
          );
          let m = (
            this.storage.get("language") ||
            this.config.captions.language ||
            "auto"
          ).toLowerCase();
          m === "auto" && ([m] = c);
          let _ = this.storage.get("captions");
          if (
            (C.boolean(_) || ({ active: _ } = this.config.captions),
            Object.assign(this.captions, {
              toggled: !1,
              active: _,
              language: m,
              languages: c,
            }),
            this.isHTML5)
          ) {
            const E = this.config.captions.update
              ? "addtrack removetrack"
              : "removetrack";
            D.call(this, this.media.textTracks, E, nt.update.bind(this));
          }
          setTimeout(nt.update.bind(this), 0);
        },
        update() {
          const a = nt.getTracks.call(this, !0),
            {
              active: d,
              language: c,
              meta: m,
              currentTrackNode: _,
            } = this.captions,
            E = !!a.find((N) => N.language === c);
          this.isHTML5 &&
            this.isVideo &&
            a
              .filter((N) => !m.get(N))
              .forEach((N) => {
                this.debug.log("Track added", N),
                  m.set(N, { default: N.mode === "showing" }),
                  N.mode === "showing" && (N.mode = "hidden"),
                  D.call(this, N, "cuechange", () => nt.updateCues.call(this));
              }),
            ((E && this.language !== c) || !a.includes(_)) &&
              (nt.setLanguage.call(this, c), nt.toggle.call(this, d && E)),
            this.elements &&
              Ve(
                this.elements.container,
                this.config.classNames.captions.enabled,
                !C.empty(a)
              ),
            C.array(this.config.controls) &&
              this.config.controls.includes("settings") &&
              this.config.settings.includes("captions") &&
              ce.setCaptionsMenu.call(this);
        },
        toggle(a, d = !0) {
          if (!this.supported.ui) return;
          const { toggled: c } = this.captions,
            m = this.config.classNames.captions.active,
            _ = C.nullOrUndefined(a) ? !c : a;
          if (_ !== c) {
            if (
              (d ||
                ((this.captions.active = _), this.storage.set({ captions: _ })),
              !this.language && _ && !d)
            ) {
              const E = nt.getTracks.call(this),
                N = nt.findTrack.call(
                  this,
                  [this.captions.language, ...this.captions.languages],
                  !0
                );
              return (
                (this.captions.language = N.language),
                void nt.set.call(this, E.indexOf(N))
              );
            }
            this.elements.buttons.captions &&
              (this.elements.buttons.captions.pressed = _),
              Ve(this.elements.container, m, _),
              (this.captions.toggled = _),
              ce.updateSetting.call(this, "captions"),
              z.call(
                this,
                this.media,
                _ ? "captionsenabled" : "captionsdisabled"
              );
          }
          setTimeout(() => {
            _ &&
              this.captions.toggled &&
              (this.captions.currentTrackNode.mode = "hidden");
          });
        },
        set(a, d = !0) {
          const c = nt.getTracks.call(this);
          if (a !== -1)
            if (C.number(a))
              if (a in c) {
                if (this.captions.currentTrack !== a) {
                  this.captions.currentTrack = a;
                  const m = c[a],
                    { language: _ } = m || {};
                  (this.captions.currentTrackNode = m),
                    ce.updateSetting.call(this, "captions"),
                    d ||
                      ((this.captions.language = _),
                      this.storage.set({ language: _ })),
                    this.isVimeo && this.embed.enableTextTrack(_),
                    z.call(this, this.media, "languagechange");
                }
                nt.toggle.call(this, !0, d),
                  this.isHTML5 && this.isVideo && nt.updateCues.call(this);
              } else this.debug.warn("Track not found", a);
            else this.debug.warn("Invalid caption argument", a);
          else nt.toggle.call(this, !1, d);
        },
        setLanguage(a, d = !0) {
          if (!C.string(a))
            return void this.debug.warn("Invalid language argument", a);
          const c = a.toLowerCase();
          this.captions.language = c;
          const m = nt.getTracks.call(this),
            _ = nt.findTrack.call(this, [c]);
          nt.set.call(this, m.indexOf(_), d);
        },
        getTracks(a = !1) {
          return Array.from((this.media || {}).textTracks || [])
            .filter((d) => !this.isHTML5 || a || this.captions.meta.has(d))
            .filter((d) => ["captions", "subtitles"].includes(d.kind));
        },
        findTrack(a, d = !1) {
          const c = nt.getTracks.call(this),
            m = (N) => Number((this.captions.meta.get(N) || {}).default),
            _ = Array.from(c).sort((N, B) => m(B) - m(N));
          let E;
          return (
            a.every((N) => ((E = _.find((B) => B.language === N)), !E)),
            E || (d ? _[0] : void 0)
          );
        },
        getCurrentTrack() {
          return nt.getTracks.call(this)[this.currentTrack];
        },
        getLabel(a) {
          let d = a;
          return (
            !C.track(d) &&
              Oe.textTracks &&
              this.captions.toggled &&
              (d = nt.getCurrentTrack.call(this)),
            C.track(d)
              ? C.empty(d.label)
                ? C.empty(d.language)
                  ? pt.get("enabled", this.config)
                  : a.language.toUpperCase()
                : d.label
              : pt.get("disabled", this.config)
          );
        },
        updateCues(a) {
          if (!this.supported.ui) return;
          if (!C.element(this.elements.captions))
            return void this.debug.warn("No captions element to render to");
          if (!C.nullOrUndefined(a) && !Array.isArray(a))
            return void this.debug.warn("updateCues: Invalid input", a);
          let d = a;
          if (!d) {
            const m = nt.getCurrentTrack.call(this);
            d = Array.from((m || {}).activeCues || [])
              .map((_) => _.getCueAsHTML())
              .map(Et);
          }
          const c = d.map((m) => m.trim()).join(`
`);
          if (c !== this.elements.captions.innerHTML) {
            Ut(this.elements.captions);
            const m = ae("span", ft(this.config.selectors.caption));
            (m.innerHTML = c),
              this.elements.captions.appendChild(m),
              z.call(this, this.media, "cuechange");
          }
        },
      },
      hr = {
        enabled: !0,
        title: "",
        debug: !1,
        autoplay: !1,
        autopause: !0,
        playsinline: !0,
        seekTime: 10,
        volume: 1,
        muted: !1,
        duration: null,
        displayDuration: !0,
        invertTime: !0,
        toggleInvert: !0,
        ratio: null,
        clickToPlay: !0,
        hideControls: !0,
        resetOnEnd: !1,
        disableContextMenu: !0,
        loadSprite: !0,
        iconPrefix: "plyr",
        iconUrl: "https://cdn.plyr.io/3.7.8/plyr.svg",
        blankVideo: "https://cdn.plyr.io/static/blank.mp4",
        quality: {
          default: 576,
          options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
          forced: !1,
          onChange: null,
        },
        loop: { active: !1 },
        speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4] },
        keyboard: { focused: !0, global: !1 },
        tooltips: { controls: !1, seek: !0 },
        captions: { active: !1, language: "auto", update: !1 },
        fullscreen: { enabled: !0, fallback: !0, iosNative: !1 },
        storage: { enabled: !0, key: "plyr" },
        controls: [
          "play-large",
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "captions",
          "settings",
          "pip",
          "airplay",
          "fullscreen",
        ],
        settings: ["captions", "quality", "speed"],
        i18n: {
          restart: "Restart",
          rewind: "Rewind {seektime}s",
          play: "Play",
          pause: "Pause",
          fastForward: "Forward {seektime}s",
          seek: "Seek",
          seekLabel: "{currentTime} of {duration}",
          played: "Played",
          buffered: "Buffered",
          currentTime: "Current time",
          duration: "Duration",
          volume: "Volume",
          mute: "Mute",
          unmute: "Unmute",
          enableCaptions: "Enable captions",
          disableCaptions: "Disable captions",
          download: "Download",
          enterFullscreen: "Enter fullscreen",
          exitFullscreen: "Exit fullscreen",
          frameTitle: "Player for {title}",
          captions: "Captions",
          settings: "Settings",
          pip: "PIP",
          menuBack: "Go back to previous menu",
          speed: "Speed",
          normal: "Normal",
          quality: "Quality",
          loop: "Loop",
          start: "Start",
          end: "End",
          all: "All",
          reset: "Reset",
          disabled: "Disabled",
          enabled: "Enabled",
          advertisement: "Ad",
          qualityBadge: {
            2160: "4K",
            1440: "HD",
            1080: "HD",
            720: "HD",
            576: "SD",
            480: "SD",
          },
        },
        urls: {
          download: null,
          vimeo: {
            sdk: "https://player.vimeo.com/api/player.js",
            iframe: "https://player.vimeo.com/video/{0}?{1}",
            api: "https://vimeo.com/api/oembed.json?url={0}",
          },
          youtube: {
            sdk: "https://www.youtube.com/iframe_api",
            api: "https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}",
          },
          googleIMA: {
            sdk: "https://imasdk.googleapis.com/js/sdkloader/ima3.js",
          },
        },
        listeners: {
          seek: null,
          play: null,
          pause: null,
          restart: null,
          rewind: null,
          fastForward: null,
          mute: null,
          volume: null,
          captions: null,
          download: null,
          fullscreen: null,
          pip: null,
          airplay: null,
          speed: null,
          quality: null,
          loop: null,
          language: null,
        },
        events: [
          "ended",
          "progress",
          "stalled",
          "playing",
          "waiting",
          "canplay",
          "canplaythrough",
          "loadstart",
          "loadeddata",
          "loadedmetadata",
          "timeupdate",
          "volumechange",
          "play",
          "pause",
          "error",
          "seeking",
          "seeked",
          "emptied",
          "ratechange",
          "cuechange",
          "download",
          "enterfullscreen",
          "exitfullscreen",
          "captionsenabled",
          "captionsdisabled",
          "languagechange",
          "controlshidden",
          "controlsshown",
          "ready",
          "statechange",
          "qualitychange",
          "adsloaded",
          "adscontentpause",
          "adscontentresume",
          "adstarted",
          "adsmidpoint",
          "adscomplete",
          "adsallcomplete",
          "adsimpression",
          "adsclick",
        ],
        selectors: {
          editable: "input, textarea, select, [contenteditable]",
          container: ".plyr",
          controls: { container: null, wrapper: ".plyr__controls" },
          labels: "[data-plyr]",
          buttons: {
            play: '[data-plyr="play"]',
            pause: '[data-plyr="pause"]',
            restart: '[data-plyr="restart"]',
            rewind: '[data-plyr="rewind"]',
            fastForward: '[data-plyr="fast-forward"]',
            mute: '[data-plyr="mute"]',
            captions: '[data-plyr="captions"]',
            download: '[data-plyr="download"]',
            fullscreen: '[data-plyr="fullscreen"]',
            pip: '[data-plyr="pip"]',
            airplay: '[data-plyr="airplay"]',
            settings: '[data-plyr="settings"]',
            loop: '[data-plyr="loop"]',
          },
          inputs: {
            seek: '[data-plyr="seek"]',
            volume: '[data-plyr="volume"]',
            speed: '[data-plyr="speed"]',
            language: '[data-plyr="language"]',
            quality: '[data-plyr="quality"]',
          },
          display: {
            currentTime: ".plyr__time--current",
            duration: ".plyr__time--duration",
            buffer: ".plyr__progress__buffer",
            loop: ".plyr__progress__loop",
            volume: ".plyr__volume--display",
          },
          progress: ".plyr__progress",
          captions: ".plyr__captions",
          caption: ".plyr__caption",
        },
        classNames: {
          type: "plyr--{0}",
          provider: "plyr--{0}",
          video: "plyr__video-wrapper",
          embed: "plyr__video-embed",
          videoFixedRatio: "plyr__video-wrapper--fixed-ratio",
          embedContainer: "plyr__video-embed__container",
          poster: "plyr__poster",
          posterEnabled: "plyr__poster-enabled",
          ads: "plyr__ads",
          control: "plyr__control",
          controlPressed: "plyr__control--pressed",
          playing: "plyr--playing",
          paused: "plyr--paused",
          stopped: "plyr--stopped",
          loading: "plyr--loading",
          hover: "plyr--hover",
          tooltip: "plyr__tooltip",
          cues: "plyr__cues",
          marker: "plyr__progress__marker",
          hidden: "plyr__sr-only",
          hideControls: "plyr--hide-controls",
          isTouch: "plyr--is-touch",
          uiSupported: "plyr--full-ui",
          noTransition: "plyr--no-transition",
          display: { time: "plyr__time" },
          menu: {
            value: "plyr__menu__value",
            badge: "plyr__badge",
            open: "plyr--menu-open",
          },
          captions: {
            enabled: "plyr--captions-enabled",
            active: "plyr--captions-active",
          },
          fullscreen: {
            enabled: "plyr--fullscreen-enabled",
            fallback: "plyr--fullscreen-fallback",
          },
          pip: { supported: "plyr--pip-supported", active: "plyr--pip-active" },
          airplay: {
            supported: "plyr--airplay-supported",
            active: "plyr--airplay-active",
          },
          previewThumbnails: {
            thumbContainer: "plyr__preview-thumb",
            thumbContainerShown: "plyr__preview-thumb--is-shown",
            imageContainer: "plyr__preview-thumb__image-container",
            timeContainer: "plyr__preview-thumb__time-container",
            scrubbingContainer: "plyr__preview-scrubbing",
            scrubbingContainerShown: "plyr__preview-scrubbing--is-shown",
          },
        },
        attributes: {
          embed: {
            provider: "data-plyr-provider",
            id: "data-plyr-embed-id",
            hash: "data-plyr-embed-hash",
          },
        },
        ads: { enabled: !1, publisherId: "", tagUrl: "" },
        previewThumbnails: { enabled: !1, src: "" },
        vimeo: {
          byline: !1,
          portrait: !1,
          title: !1,
          speed: !0,
          transparent: !1,
          customControls: !0,
          referrerPolicy: null,
          premium: !1,
        },
        youtube: {
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          customControls: !0,
          noCookie: !1,
        },
        mediaMetadata: { title: "", artist: "", album: "", artwork: [] },
        markers: { enabled: !1, points: [] },
      },
      dr = "picture-in-picture",
      Qn = "inline",
      Yt = { html5: "html5", youtube: "youtube", vimeo: "vimeo" },
      pr = "audio",
      gi = "video",
      gr = () => {};
    class no {
      constructor(d = !1) {
        (this.enabled = window.console && d),
          this.enabled && this.log("Debugging enabled");
      }
      get log() {
        return this.enabled
          ? Function.prototype.bind.call(console.log, console)
          : gr;
      }
      get warn() {
        return this.enabled
          ? Function.prototype.bind.call(console.warn, console)
          : gr;
      }
      get error() {
        return this.enabled
          ? Function.prototype.bind.call(console.error, console)
          : gr;
      }
    }
    class rn {
      constructor(d) {
        e(this, "onChange", () => {
          if (!this.supported) return;
          const c = this.player.elements.buttons.fullscreen;
          C.element(c) && (c.pressed = this.active);
          const m =
            this.target === this.player.media
              ? this.target
              : this.player.elements.container;
          z.call(
            this.player,
            m,
            this.active ? "enterfullscreen" : "exitfullscreen",
            !0
          );
        }),
          e(this, "toggleFallback", (c = !1) => {
            if (
              (c
                ? (this.scrollPosition = {
                    x: window.scrollX ?? 0,
                    y: window.scrollY ?? 0,
                  })
                : window.scrollTo(this.scrollPosition.x, this.scrollPosition.y),
              (document.body.style.overflow = c ? "hidden" : ""),
              Ve(
                this.target,
                this.player.config.classNames.fullscreen.fallback,
                c
              ),
              Le.isIos)
            ) {
              let m = document.head.querySelector('meta[name="viewport"]');
              const _ = "viewport-fit=cover";
              m ||
                ((m = document.createElement("meta")),
                m.setAttribute("name", "viewport"));
              const E = C.string(m.content) && m.content.includes(_);
              c
                ? ((this.cleanupViewport = !E), E || (m.content += `,${_}`))
                : this.cleanupViewport &&
                  (m.content = m.content
                    .split(",")
                    .filter((N) => N.trim() !== _)
                    .join(","));
            }
            this.onChange();
          }),
          e(this, "trapFocus", (c) => {
            if (Le.isIos || Le.isIPadOS || !this.active || c.key !== "Tab")
              return;
            const m = document.activeElement,
              _ = te.call(
                this.player,
                "a[href], button:not(:disabled), input:not(:disabled), [tabindex]"
              ),
              [E] = _,
              N = _[_.length - 1];
            m !== N || c.shiftKey
              ? m === E && c.shiftKey && (N.focus(), c.preventDefault())
              : (E.focus(), c.preventDefault());
          }),
          e(this, "update", () => {
            if (this.supported) {
              let c;
              (c = this.forceFallback
                ? "Fallback (forced)"
                : rn.nativeSupported
                ? "Native"
                : "Fallback"),
                this.player.debug.log(`${c} fullscreen enabled`);
            } else
              this.player.debug.log(
                "Fullscreen not supported and fallback disabled"
              );
            Ve(
              this.player.elements.container,
              this.player.config.classNames.fullscreen.enabled,
              this.supported
            );
          }),
          e(this, "enter", () => {
            this.supported &&
              (Le.isIos && this.player.config.fullscreen.iosNative
                ? this.player.isVimeo
                  ? this.player.embed.requestFullscreen()
                  : this.target.webkitEnterFullscreen()
                : !rn.nativeSupported || this.forceFallback
                ? this.toggleFallback(!0)
                : this.prefix
                ? C.empty(this.prefix) ||
                  this.target[`${this.prefix}Request${this.property}`]()
                : this.target.requestFullscreen({ navigationUI: "hide" }));
          }),
          e(this, "exit", () => {
            if (this.supported)
              if (Le.isIos && this.player.config.fullscreen.iosNative)
                this.player.isVimeo
                  ? this.player.embed.exitFullscreen()
                  : this.target.webkitEnterFullscreen(),
                  le(this.player.play());
              else if (!rn.nativeSupported || this.forceFallback)
                this.toggleFallback(!1);
              else if (this.prefix) {
                if (!C.empty(this.prefix)) {
                  const c = this.prefix === "moz" ? "Cancel" : "Exit";
                  document[`${this.prefix}${c}${this.property}`]();
                }
              } else
                (document.cancelFullScreen || document.exitFullscreen).call(
                  document
                );
          }),
          e(this, "toggle", () => {
            this.active ? this.exit() : this.enter();
          }),
          (this.player = d),
          (this.prefix = rn.prefix),
          (this.property = rn.property),
          (this.scrollPosition = { x: 0, y: 0 }),
          (this.forceFallback = d.config.fullscreen.fallback === "force"),
          (this.player.elements.fullscreen =
            d.config.fullscreen.container &&
            (function (c, m) {
              const { prototype: _ } = Element;
              return (
                _.closest ||
                function () {
                  let E = this;
                  do {
                    if (dt.matches(E, m)) return E;
                    E = E.parentElement || E.parentNode;
                  } while (E !== null && E.nodeType === 1);
                  return null;
                }
              ).call(c, m);
            })(this.player.elements.container, d.config.fullscreen.container)),
          D.call(
            this.player,
            document,
            this.prefix === "ms"
              ? "MSFullscreenChange"
              : `${this.prefix}fullscreenchange`,
            () => {
              this.onChange();
            }
          ),
          D.call(
            this.player,
            this.player.elements.container,
            "dblclick",
            (c) => {
              (C.element(this.player.elements.controls) &&
                this.player.elements.controls.contains(c.target)) ||
                this.player.listeners.proxy(c, this.toggle, "fullscreen");
            }
          ),
          D.call(this, this.player.elements.container, "keydown", (c) =>
            this.trapFocus(c)
          ),
          this.update();
      }
      static get nativeSupported() {
        return !!(
          document.fullscreenEnabled ||
          document.webkitFullscreenEnabled ||
          document.mozFullScreenEnabled ||
          document.msFullscreenEnabled
        );
      }
      get useNative() {
        return rn.nativeSupported && !this.forceFallback;
      }
      static get prefix() {
        if (C.function(document.exitFullscreen)) return "";
        let d = "";
        return (
          ["webkit", "moz", "ms"].some(
            (c) =>
              !(
                !C.function(document[`${c}ExitFullscreen`]) &&
                !C.function(document[`${c}CancelFullScreen`])
              ) && ((d = c), !0)
          ),
          d
        );
      }
      static get property() {
        return this.prefix === "moz" ? "FullScreen" : "Fullscreen";
      }
      get supported() {
        return [
          this.player.config.fullscreen.enabled,
          this.player.isVideo,
          rn.nativeSupported || this.player.config.fullscreen.fallback,
          !this.player.isYouTube ||
            rn.nativeSupported ||
            !Le.isIos ||
            (this.player.config.playsinline &&
              !this.player.config.fullscreen.iosNative),
        ].every(Boolean);
      }
      get active() {
        if (!this.supported) return !1;
        if (!rn.nativeSupported || this.forceFallback)
          return vn(
            this.target,
            this.player.config.classNames.fullscreen.fallback
          );
        const d = this.prefix
          ? this.target.getRootNode()[`${this.prefix}${this.property}Element`]
          : this.target.getRootNode().fullscreenElement;
        return d && d.shadowRoot
          ? d === this.target.getRootNode().host
          : d === this.target;
      }
      get target() {
        return Le.isIos && this.player.config.fullscreen.iosNative
          ? this.player.media
          : this.player.elements.fullscreen ?? this.player.elements.container;
      }
    }
    function mi(a, d = 1) {
      return new Promise((c, m) => {
        const _ = new Image(),
          E = () => {
            delete _.onload, delete _.onerror, (_.naturalWidth >= d ? c : m)(_);
          };
        Object.assign(_, { onload: E, onerror: E, src: a });
      });
    }
    const lt = {
      addStyleHook() {
        Ve(
          this.elements.container,
          this.config.selectors.container.replace(".", ""),
          !0
        ),
          Ve(
            this.elements.container,
            this.config.classNames.uiSupported,
            this.supported.ui
          );
      },
      toggleNativeControls(a = !1) {
        a && this.isHTML5
          ? this.media.setAttribute("controls", "")
          : this.media.removeAttribute("controls");
      },
      build() {
        if ((this.listeners.media(), !this.supported.ui))
          return (
            this.debug.warn(
              `Basic support only for ${this.provider} ${this.type}`
            ),
            void lt.toggleNativeControls.call(this, !0)
          );
        C.element(this.elements.controls) ||
          (ce.inject.call(this), this.listeners.controls()),
          lt.toggleNativeControls.call(this),
          this.isHTML5 && nt.setup.call(this),
          (this.volume = null),
          (this.muted = null),
          (this.loop = null),
          (this.quality = null),
          (this.speed = null),
          ce.updateVolume.call(this),
          ce.timeUpdate.call(this),
          ce.durationUpdate.call(this),
          lt.checkPlaying.call(this),
          Ve(
            this.elements.container,
            this.config.classNames.pip.supported,
            Oe.pip && this.isHTML5 && this.isVideo
          ),
          Ve(
            this.elements.container,
            this.config.classNames.airplay.supported,
            Oe.airplay && this.isHTML5
          ),
          Ve(
            this.elements.container,
            this.config.classNames.isTouch,
            this.touch
          ),
          (this.ready = !0),
          setTimeout(() => {
            z.call(this, this.media, "ready");
          }, 0),
          lt.setTitle.call(this),
          this.poster &&
            lt.setPoster.call(this, this.poster, !1).catch(() => {}),
          this.config.duration && ce.durationUpdate.call(this),
          this.config.mediaMetadata && ce.setMediaMetadata.call(this);
      },
      setTitle() {
        let a = pt.get("play", this.config);
        if (
          (C.string(this.config.title) &&
            !C.empty(this.config.title) &&
            (a += `, ${this.config.title}`),
          Array.from(this.elements.buttons.play || []).forEach((d) => {
            d.setAttribute("aria-label", a);
          }),
          this.isEmbed)
        ) {
          const d = he.call(this, "iframe");
          if (!C.element(d)) return;
          const c = C.empty(this.config.title) ? "video" : this.config.title,
            m = pt.get("frameTitle", this.config);
          d.setAttribute("title", m.replace("{title}", c));
        }
      },
      togglePoster(a) {
        Ve(this.elements.container, this.config.classNames.posterEnabled, a);
      },
      setPoster(a, d = !0) {
        return d && this.poster
          ? Promise.reject(new Error("Poster already set"))
          : (this.media.setAttribute("data-poster", a),
            this.elements.poster.removeAttribute("hidden"),
            fe
              .call(this)
              .then(() => mi(a))
              .catch((c) => {
                throw (a === this.poster && lt.togglePoster.call(this, !1), c);
              })
              .then(() => {
                if (a !== this.poster)
                  throw new Error(
                    "setPoster cancelled by later call to setPoster"
                  );
              })
              .then(
                () => (
                  Object.assign(this.elements.poster.style, {
                    backgroundImage: `url('${a}')`,
                    backgroundSize: "",
                  }),
                  lt.togglePoster.call(this, !0),
                  a
                )
              ));
      },
      checkPlaying(a) {
        Ve(
          this.elements.container,
          this.config.classNames.playing,
          this.playing
        ),
          Ve(
            this.elements.container,
            this.config.classNames.paused,
            this.paused
          ),
          Ve(
            this.elements.container,
            this.config.classNames.stopped,
            this.stopped
          ),
          Array.from(this.elements.buttons.play || []).forEach((d) => {
            Object.assign(d, { pressed: this.playing }),
              d.setAttribute(
                "aria-label",
                pt.get(this.playing ? "pause" : "play", this.config)
              );
          }),
          (C.event(a) && a.type === "timeupdate") ||
            lt.toggleControls.call(this);
      },
      checkLoading(a) {
        (this.loading = ["stalled", "waiting"].includes(a.type)),
          clearTimeout(this.timers.loading),
          (this.timers.loading = setTimeout(
            () => {
              Ve(
                this.elements.container,
                this.config.classNames.loading,
                this.loading
              ),
                lt.toggleControls.call(this);
            },
            this.loading ? 250 : 0
          ));
      },
      toggleControls(a) {
        const { controls: d } = this.elements;
        if (d && this.config.hideControls) {
          const c = this.touch && this.lastSeekTime + 2e3 > Date.now();
          this.toggleControls(
            !!(a || this.loading || this.paused || d.pressed || d.hover || c)
          );
        }
      },
      migrateStyles() {
        Object.values({ ...this.media.style })
          .filter((a) => !C.empty(a) && C.string(a) && a.startsWith("--plyr"))
          .forEach((a) => {
            this.elements.container.style.setProperty(
              a,
              this.media.style.getPropertyValue(a)
            ),
              this.media.style.removeProperty(a);
          }),
          C.empty(this.media.style) && this.media.removeAttribute("style");
      },
    };
    class io {
      constructor(d) {
        e(this, "firstTouch", () => {
          const { player: c } = this,
            { elements: m } = c;
          (c.touch = !0), Ve(m.container, c.config.classNames.isTouch, !0);
        }),
          e(this, "global", (c = !0) => {
            const { player: m } = this;
            m.config.keyboard.global &&
              M.call(m, window, "keydown keyup", this.handleKey, c, !1),
              M.call(m, document.body, "click", this.toggleMenu, c),
              ne.call(m, document.body, "touchstart", this.firstTouch);
          }),
          e(this, "container", () => {
            const { player: c } = this,
              { config: m, elements: _, timers: E } = c;
            !m.keyboard.global &&
              m.keyboard.focused &&
              D.call(c, _.container, "keydown keyup", this.handleKey, !1),
              D.call(
                c,
                _.container,
                "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen",
                (V) => {
                  const { controls: ie } = _;
                  ie &&
                    V.type === "enterfullscreen" &&
                    ((ie.pressed = !1), (ie.hover = !1));
                  let Te = 0;
                  ["touchstart", "touchmove", "mousemove"].includes(V.type) &&
                    (lt.toggleControls.call(c, !0), (Te = c.touch ? 3e3 : 2e3)),
                    clearTimeout(E.controls),
                    (E.controls = setTimeout(
                      () => lt.toggleControls.call(c, !1),
                      Te
                    ));
                }
              );
            const N = () => {
                if (!c.isVimeo || c.config.vimeo.premium) return;
                const V = _.wrapper,
                  { active: ie } = c.fullscreen,
                  [Te, Ne] = ot.call(c),
                  pe = Ae(`aspect-ratio: ${Te} / ${Ne}`);
                if (!ie)
                  return void (pe
                    ? ((V.style.width = null), (V.style.height = null))
                    : ((V.style.maxWidth = null), (V.style.margin = null)));
                const [je, Ge] = [
                    Math.max(
                      document.documentElement.clientWidth || 0,
                      window.innerWidth || 0
                    ),
                    Math.max(
                      document.documentElement.clientHeight || 0,
                      window.innerHeight || 0
                    ),
                  ],
                  et = je / Ge > Te / Ne;
                pe
                  ? ((V.style.width = et ? "auto" : "100%"),
                    (V.style.height = et ? "100%" : "auto"))
                  : ((V.style.maxWidth = et ? (Ge / Ne) * Te + "px" : null),
                    (V.style.margin = et ? "0 auto" : null));
              },
              B = () => {
                clearTimeout(E.resized), (E.resized = setTimeout(N, 50));
              };
            D.call(c, _.container, "enterfullscreen exitfullscreen", (V) => {
              const { target: ie } = c.fullscreen;
              ie === _.container &&
                ((!c.isEmbed && C.empty(c.config.ratio)) ||
                  (N(),
                  (V.type === "enterfullscreen" ? D : G).call(
                    c,
                    window,
                    "resize",
                    B
                  )));
            });
          }),
          e(this, "media", () => {
            const { player: c } = this,
              { elements: m } = c;
            if (
              (D.call(c, c.media, "timeupdate seeking seeked", (E) =>
                ce.timeUpdate.call(c, E)
              ),
              D.call(
                c,
                c.media,
                "durationchange loadeddata loadedmetadata",
                (E) => ce.durationUpdate.call(c, E)
              ),
              D.call(c, c.media, "ended", () => {
                c.isHTML5 &&
                  c.isVideo &&
                  c.config.resetOnEnd &&
                  (c.restart(), c.pause());
              }),
              D.call(c, c.media, "progress playing seeking seeked", (E) =>
                ce.updateProgress.call(c, E)
              ),
              D.call(c, c.media, "volumechange", (E) =>
                ce.updateVolume.call(c, E)
              ),
              D.call(
                c,
                c.media,
                "playing play pause ended emptied timeupdate",
                (E) => lt.checkPlaying.call(c, E)
              ),
              D.call(c, c.media, "waiting canplay seeked playing", (E) =>
                lt.checkLoading.call(c, E)
              ),
              c.supported.ui && c.config.clickToPlay && !c.isAudio)
            ) {
              const E = he.call(c, `.${c.config.classNames.video}`);
              if (!C.element(E)) return;
              D.call(c, m.container, "click", (N) => {
                ([m.container, E].includes(N.target) || E.contains(N.target)) &&
                  ((c.touch && c.config.hideControls) ||
                    (c.ended
                      ? (this.proxy(N, c.restart, "restart"),
                        this.proxy(
                          N,
                          () => {
                            le(c.play());
                          },
                          "play"
                        ))
                      : this.proxy(
                          N,
                          () => {
                            le(c.togglePlay());
                          },
                          "play"
                        )));
              });
            }
            c.supported.ui &&
              c.config.disableContextMenu &&
              D.call(
                c,
                m.wrapper,
                "contextmenu",
                (E) => {
                  E.preventDefault();
                },
                !1
              ),
              D.call(c, c.media, "volumechange", () => {
                c.storage.set({ volume: c.volume, muted: c.muted });
              }),
              D.call(c, c.media, "ratechange", () => {
                ce.updateSetting.call(c, "speed"),
                  c.storage.set({ speed: c.speed });
              }),
              D.call(c, c.media, "qualitychange", (E) => {
                ce.updateSetting.call(c, "quality", null, E.detail.quality);
              }),
              D.call(c, c.media, "ready qualitychange", () => {
                ce.setDownloadUrl.call(c);
              });
            const _ = c.config.events.concat(["keyup", "keydown"]).join(" ");
            D.call(c, c.media, _, (E) => {
              let { detail: N = {} } = E;
              E.type === "error" && (N = c.media.error),
                z.call(c, m.container, E.type, !0, N);
            });
          }),
          e(this, "proxy", (c, m, _) => {
            const { player: E } = this,
              N = E.config.listeners[_];
            let B = !0;
            C.function(N) && (B = N.call(E, c)),
              B !== !1 && C.function(m) && m.call(E, c);
          }),
          e(this, "bind", (c, m, _, E, N = !0) => {
            const { player: B } = this,
              V = B.config.listeners[E],
              ie = C.function(V);
            D.call(B, c, m, (Te) => this.proxy(Te, _, E), N && !ie);
          }),
          e(this, "controls", () => {
            const { player: c } = this,
              { elements: m } = c,
              _ = Le.isIE ? "change" : "input";
            if (
              (m.buttons.play &&
                Array.from(m.buttons.play).forEach((E) => {
                  this.bind(
                    E,
                    "click",
                    () => {
                      le(c.togglePlay());
                    },
                    "play"
                  );
                }),
              this.bind(m.buttons.restart, "click", c.restart, "restart"),
              this.bind(
                m.buttons.rewind,
                "click",
                () => {
                  (c.lastSeekTime = Date.now()), c.rewind();
                },
                "rewind"
              ),
              this.bind(
                m.buttons.fastForward,
                "click",
                () => {
                  (c.lastSeekTime = Date.now()), c.forward();
                },
                "fastForward"
              ),
              this.bind(
                m.buttons.mute,
                "click",
                () => {
                  c.muted = !c.muted;
                },
                "mute"
              ),
              this.bind(m.buttons.captions, "click", () => c.toggleCaptions()),
              this.bind(
                m.buttons.download,
                "click",
                () => {
                  z.call(c, c.media, "download");
                },
                "download"
              ),
              this.bind(
                m.buttons.fullscreen,
                "click",
                () => {
                  c.fullscreen.toggle();
                },
                "fullscreen"
              ),
              this.bind(
                m.buttons.pip,
                "click",
                () => {
                  c.pip = "toggle";
                },
                "pip"
              ),
              this.bind(m.buttons.airplay, "click", c.airplay, "airplay"),
              this.bind(
                m.buttons.settings,
                "click",
                (E) => {
                  E.stopPropagation(),
                    E.preventDefault(),
                    ce.toggleMenu.call(c, E);
                },
                null,
                !1
              ),
              this.bind(
                m.buttons.settings,
                "keyup",
                (E) => {
                  [" ", "Enter"].includes(E.key) &&
                    (E.key !== "Enter"
                      ? (E.preventDefault(),
                        E.stopPropagation(),
                        ce.toggleMenu.call(c, E))
                      : ce.focusFirstMenuItem.call(c, null, !0));
                },
                null,
                !1
              ),
              this.bind(m.settings.menu, "keydown", (E) => {
                E.key === "Escape" && ce.toggleMenu.call(c, E);
              }),
              this.bind(m.inputs.seek, "mousedown mousemove", (E) => {
                const N = m.progress.getBoundingClientRect(),
                  B = (100 / N.width) * (E.pageX - N.left);
                E.currentTarget.setAttribute("seek-value", B);
              }),
              this.bind(
                m.inputs.seek,
                "mousedown mouseup keydown keyup touchstart touchend",
                (E) => {
                  const N = E.currentTarget,
                    B = "play-on-seeked";
                  if (
                    C.keyboardEvent(E) &&
                    !["ArrowLeft", "ArrowRight"].includes(E.key)
                  )
                    return;
                  c.lastSeekTime = Date.now();
                  const V = N.hasAttribute(B),
                    ie = ["mouseup", "touchend", "keyup"].includes(E.type);
                  V && ie
                    ? (N.removeAttribute(B), le(c.play()))
                    : !ie && c.playing && (N.setAttribute(B, ""), c.pause());
                }
              ),
              Le.isIos)
            ) {
              const E = te.call(c, 'input[type="range"]');
              Array.from(E).forEach((N) =>
                this.bind(N, _, (B) => We(B.target))
              );
            }
            this.bind(
              m.inputs.seek,
              _,
              (E) => {
                const N = E.currentTarget;
                let B = N.getAttribute("seek-value");
                C.empty(B) && (B = N.value),
                  N.removeAttribute("seek-value"),
                  (c.currentTime = (B / N.max) * c.duration);
              },
              "seek"
            ),
              this.bind(m.progress, "mouseenter mouseleave mousemove", (E) =>
                ce.updateSeekTooltip.call(c, E)
              ),
              this.bind(m.progress, "mousemove touchmove", (E) => {
                const { previewThumbnails: N } = c;
                N && N.loaded && N.startMove(E);
              }),
              this.bind(m.progress, "mouseleave touchend click", () => {
                const { previewThumbnails: E } = c;
                E && E.loaded && E.endMove(!1, !0);
              }),
              this.bind(m.progress, "mousedown touchstart", (E) => {
                const { previewThumbnails: N } = c;
                N && N.loaded && N.startScrubbing(E);
              }),
              this.bind(m.progress, "mouseup touchend", (E) => {
                const { previewThumbnails: N } = c;
                N && N.loaded && N.endScrubbing(E);
              }),
              Le.isWebKit &&
                Array.from(te.call(c, 'input[type="range"]')).forEach((E) => {
                  this.bind(E, "input", (N) =>
                    ce.updateRangeFill.call(c, N.target)
                  );
                }),
              c.config.toggleInvert &&
                !C.element(m.display.duration) &&
                this.bind(m.display.currentTime, "click", () => {
                  c.currentTime !== 0 &&
                    ((c.config.invertTime = !c.config.invertTime),
                    ce.timeUpdate.call(c));
                }),
              this.bind(
                m.inputs.volume,
                _,
                (E) => {
                  c.volume = E.target.value;
                },
                "volume"
              ),
              this.bind(m.controls, "mouseenter mouseleave", (E) => {
                m.controls.hover = !c.touch && E.type === "mouseenter";
              }),
              m.fullscreen &&
                Array.from(m.fullscreen.children)
                  .filter((E) => !E.contains(m.container))
                  .forEach((E) => {
                    this.bind(E, "mouseenter mouseleave", (N) => {
                      m.controls &&
                        (m.controls.hover =
                          !c.touch && N.type === "mouseenter");
                    });
                  }),
              this.bind(
                m.controls,
                "mousedown mouseup touchstart touchend touchcancel",
                (E) => {
                  m.controls.pressed = ["mousedown", "touchstart"].includes(
                    E.type
                  );
                }
              ),
              this.bind(m.controls, "focusin", () => {
                const { config: E, timers: N } = c;
                Ve(m.controls, E.classNames.noTransition, !0),
                  lt.toggleControls.call(c, !0),
                  setTimeout(() => {
                    Ve(m.controls, E.classNames.noTransition, !1);
                  }, 0);
                const B = this.touch ? 3e3 : 4e3;
                clearTimeout(N.controls),
                  (N.controls = setTimeout(
                    () => lt.toggleControls.call(c, !1),
                    B
                  ));
              }),
              this.bind(
                m.inputs.volume,
                "wheel",
                (E) => {
                  const N = E.webkitDirectionInvertedFromDevice,
                    [B, V] = [E.deltaX, -E.deltaY].map((Ne) => (N ? -Ne : Ne)),
                    ie = Math.sign(Math.abs(B) > Math.abs(V) ? B : V);
                  c.increaseVolume(ie / 50);
                  const { volume: Te } = c.media;
                  ((ie === 1 && Te < 1) || (ie === -1 && Te > 0)) &&
                    E.preventDefault();
                },
                "volume",
                !1
              );
          }),
          (this.player = d),
          (this.lastKey = null),
          (this.focusTimer = null),
          (this.lastKeyDown = null),
          (this.handleKey = this.handleKey.bind(this)),
          (this.toggleMenu = this.toggleMenu.bind(this)),
          (this.firstTouch = this.firstTouch.bind(this));
      }
      handleKey(d) {
        const { player: c } = this,
          { elements: m } = c,
          {
            key: _,
            type: E,
            altKey: N,
            ctrlKey: B,
            metaKey: V,
            shiftKey: ie,
          } = d,
          Te = E === "keydown",
          Ne = Te && _ === this.lastKey;
        if (!(N || B || V || ie) && _) {
          if (Te) {
            const je = document.activeElement;
            if (C.element(je)) {
              const { editable: Ge } = c.config.selectors,
                { seek: et } = m.inputs;
              if (
                (je !== et && dt(je, Ge)) ||
                (d.key === " " && dt(je, 'button, [role^="menuitem"]'))
              )
                return;
            }
            switch (
              ([
                " ",
                "ArrowLeft",
                "ArrowUp",
                "ArrowRight",
                "ArrowDown",
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "c",
                "f",
                "k",
                "l",
                "m",
              ].includes(_) && (d.preventDefault(), d.stopPropagation()),
              _)
            ) {
              case "0":
              case "1":
              case "2":
              case "3":
              case "4":
              case "5":
              case "6":
              case "7":
              case "8":
              case "9":
                Ne ||
                  ((pe = parseInt(_, 10)),
                  (c.currentTime = (c.duration / 10) * pe));
                break;
              case " ":
              case "k":
                Ne || le(c.togglePlay());
                break;
              case "ArrowUp":
                c.increaseVolume(0.1);
                break;
              case "ArrowDown":
                c.decreaseVolume(0.1);
                break;
              case "m":
                Ne || (c.muted = !c.muted);
                break;
              case "ArrowRight":
                c.forward();
                break;
              case "ArrowLeft":
                c.rewind();
                break;
              case "f":
                c.fullscreen.toggle();
                break;
              case "c":
                Ne || c.toggleCaptions();
                break;
              case "l":
                c.loop = !c.loop;
            }
            _ === "Escape" &&
              !c.fullscreen.usingNative &&
              c.fullscreen.active &&
              c.fullscreen.toggle(),
              (this.lastKey = _);
          } else this.lastKey = null;
          var pe;
        }
      }
      toggleMenu(d) {
        ce.toggleMenu.call(this.player, d);
      }
    }
    var Xr = (function (a, d) {
      return a((d = { exports: {} }), d.exports), d.exports;
    })(function (a, d) {
      a.exports = (function () {
        var c = function () {},
          m = {},
          _ = {},
          E = {};
        function N(pe, je) {
          pe = pe.push ? pe : [pe];
          var Ge,
            et,
            wt,
            He = [],
            yt = pe.length,
            _e = yt;
          for (
            Ge = function (Ke, kt) {
              kt.length && He.push(Ke), --_e || je(He);
            };
            yt--;

          )
            (et = pe[yt]),
              (wt = _[et]) ? Ge(et, wt) : (E[et] = E[et] || []).push(Ge);
        }
        function B(pe, je) {
          if (pe) {
            var Ge = E[pe];
            if (((_[pe] = je), Ge))
              for (; Ge.length; ) Ge[0](pe, je), Ge.splice(0, 1);
          }
        }
        function V(pe, je) {
          pe.call && (pe = { success: pe }),
            je.length ? (pe.error || c)(je) : (pe.success || c)(pe);
        }
        function ie(pe, je, Ge, et) {
          var wt,
            He,
            yt = document,
            _e = Ge.async,
            Ke = (Ge.numRetries || 0) + 1,
            kt = Ge.before || c,
            St = pe.replace(/[\?|#].*$/, ""),
            Nt = pe.replace(/^(css|img)!/, "");
          (et = et || 0),
            /(^css!|\.css$)/.test(St)
              ? (((He = yt.createElement("link")).rel = "stylesheet"),
                (He.href = Nt),
                (wt = "hideFocus" in He) &&
                  He.relList &&
                  ((wt = 0), (He.rel = "preload"), (He.as = "style")))
              : /(^img!|\.(png|gif|jpg|svg|webp)$)/.test(St)
              ? ((He = yt.createElement("img")).src = Nt)
              : (((He = yt.createElement("script")).src = pe),
                (He.async = _e === void 0 || _e)),
            (He.onload =
              He.onerror =
              He.onbeforeload =
                function (sn) {
                  var Di = sn.type[0];
                  if (wt)
                    try {
                      He.sheet.cssText.length || (Di = "e");
                    } catch (bi) {
                      bi.code != 18 && (Di = "e");
                    }
                  if (Di == "e") {
                    if ((et += 1) < Ke) return ie(pe, je, Ge, et);
                  } else if (He.rel == "preload" && He.as == "style")
                    return (He.rel = "stylesheet");
                  je(pe, Di, sn.defaultPrevented);
                }),
            kt(pe, He) !== !1 && yt.head.appendChild(He);
        }
        function Te(pe, je, Ge) {
          var et,
            wt,
            He = (pe = pe.push ? pe : [pe]).length,
            yt = He,
            _e = [];
          for (
            et = function (Ke, kt, St) {
              if ((kt == "e" && _e.push(Ke), kt == "b")) {
                if (!St) return;
                _e.push(Ke);
              }
              --He || je(_e);
            },
              wt = 0;
            wt < yt;
            wt++
          )
            ie(pe[wt], et, Ge);
        }
        function Ne(pe, je, Ge) {
          var et, wt;
          if ((je && je.trim && (et = je), (wt = (et ? Ge : je) || {}), et)) {
            if (et in m) throw "LoadJS";
            m[et] = !0;
          }
          function He(yt, _e) {
            Te(
              pe,
              function (Ke) {
                V(wt, Ke), yt && V({ success: yt, error: _e }, Ke), B(et, Ke);
              },
              wt
            );
          }
          if (wt.returnPromise) return new Promise(He);
          He();
        }
        return (
          (Ne.ready = function (pe, je) {
            return (
              N(pe, function (Ge) {
                V(je, Ge);
              }),
              Ne
            );
          }),
          (Ne.done = function (pe) {
            B(pe, []);
          }),
          (Ne.reset = function () {
            (m = {}), (_ = {}), (E = {});
          }),
          (Ne.isDefined = function (pe) {
            return pe in m;
          }),
          Ne
        );
      })();
    });
    function mr(a) {
      return new Promise((d, c) => {
        Xr(a, { success: d, error: c });
      });
    }
    function fn(a) {
      a && !this.embed.hasPlayed && (this.embed.hasPlayed = !0),
        this.media.paused === a &&
          ((this.media.paused = !a),
          z.call(this, this.media, a ? "play" : "pause"));
    }
    const Mi = {
      setup() {
        const a = this;
        Ve(a.elements.wrapper, a.config.classNames.embed, !0),
          (a.options.speed = a.config.speed.options),
          Je.call(a),
          C.object(window.Vimeo)
            ? Mi.ready.call(a)
            : mr(a.config.urls.vimeo.sdk)
                .then(() => {
                  Mi.ready.call(a);
                })
                .catch((d) => {
                  a.debug.warn("Vimeo SDK (player.js) failed to load", d);
                });
      },
      ready() {
        const a = this,
          d = a.config.vimeo,
          { premium: c, referrerPolicy: m, ..._ } = d;
        let E = a.media.getAttribute("src"),
          N = "";
        C.empty(E)
          ? ((E = a.media.getAttribute(a.config.attributes.embed.id)),
            (N = a.media.getAttribute(a.config.attributes.embed.hash)))
          : (N = (function (_e) {
              const Ke = _e.match(
                /^.*(vimeo.com\/|video\/)(\d+)(\?.*&*h=|\/)+([\d,a-f]+)/
              );
              return Ke && Ke.length === 5 ? Ke[4] : null;
            })(E));
        const B = N ? { h: N } : {};
        c && Object.assign(_, { controls: !1, sidedock: !1 });
        const V = Oi({
            loop: a.config.loop.active,
            autoplay: a.autoplay,
            muted: a.muted,
            gesture: "media",
            playsinline: a.config.playsinline,
            ...B,
            ..._,
          }),
          ie =
            ((Te = E),
            C.empty(Te)
              ? null
              : C.number(Number(Te))
              ? Te
              : Te.match(/^.*(vimeo.com\/|video\/)(\d+).*/)
              ? RegExp.$2
              : Te);
        var Te;
        const Ne = ae("iframe"),
          pe = nn(a.config.urls.vimeo.iframe, ie, V);
        if (
          (Ne.setAttribute("src", pe),
          Ne.setAttribute("allowfullscreen", ""),
          Ne.setAttribute(
            "allow",
            [
              "autoplay",
              "fullscreen",
              "picture-in-picture",
              "encrypted-media",
              "accelerometer",
              "gyroscope",
            ].join("; ")
          ),
          C.empty(m) || Ne.setAttribute("referrerPolicy", m),
          c || !d.customControls)
        )
          Ne.setAttribute("data-poster", a.poster), (a.media = Mt(Ne, a.media));
        else {
          const _e = ae("div", {
            class: a.config.classNames.embedContainer,
            "data-poster": a.poster,
          });
          _e.appendChild(Ne), (a.media = Mt(_e, a.media));
        }
        d.customControls ||
          Kn(nn(a.config.urls.vimeo.api, pe)).then((_e) => {
            !C.empty(_e) &&
              _e.thumbnail_url &&
              lt.setPoster.call(a, _e.thumbnail_url).catch(() => {});
          }),
          (a.embed = new window.Vimeo.Player(Ne, {
            autopause: a.config.autopause,
            muted: a.muted,
          })),
          (a.media.paused = !0),
          (a.media.currentTime = 0),
          a.supported.ui && a.embed.disableTextTrack(),
          (a.media.play = () => (fn.call(a, !0), a.embed.play())),
          (a.media.pause = () => (fn.call(a, !1), a.embed.pause())),
          (a.media.stop = () => {
            a.pause(), (a.currentTime = 0);
          });
        let { currentTime: je } = a.media;
        Object.defineProperty(a.media, "currentTime", {
          get: () => je,
          set(_e) {
            const { embed: Ke, media: kt, paused: St, volume: Nt } = a,
              sn = St && !Ke.hasPlayed;
            (kt.seeking = !0),
              z.call(a, kt, "seeking"),
              Promise.resolve(sn && Ke.setVolume(0))
                .then(() => Ke.setCurrentTime(_e))
                .then(() => sn && Ke.pause())
                .then(() => sn && Ke.setVolume(Nt))
                .catch(() => {});
          },
        });
        let Ge = a.config.speed.selected;
        Object.defineProperty(a.media, "playbackRate", {
          get: () => Ge,
          set(_e) {
            a.embed
              .setPlaybackRate(_e)
              .then(() => {
                (Ge = _e), z.call(a, a.media, "ratechange");
              })
              .catch(() => {
                a.options.speed = [1];
              });
          },
        });
        let { volume: et } = a.config;
        Object.defineProperty(a.media, "volume", {
          get: () => et,
          set(_e) {
            a.embed.setVolume(_e).then(() => {
              (et = _e), z.call(a, a.media, "volumechange");
            });
          },
        });
        let { muted: wt } = a.config;
        Object.defineProperty(a.media, "muted", {
          get: () => wt,
          set(_e) {
            const Ke = !!C.boolean(_e) && _e;
            a.embed.setMuted(!!Ke || a.config.muted).then(() => {
              (wt = Ke), z.call(a, a.media, "volumechange");
            });
          },
        });
        let He,
          { loop: yt } = a.config;
        Object.defineProperty(a.media, "loop", {
          get: () => yt,
          set(_e) {
            const Ke = C.boolean(_e) ? _e : a.config.loop.active;
            a.embed.setLoop(Ke).then(() => {
              yt = Ke;
            });
          },
        }),
          a.embed
            .getVideoUrl()
            .then((_e) => {
              (He = _e), ce.setDownloadUrl.call(a);
            })
            .catch((_e) => {
              this.debug.warn(_e);
            }),
          Object.defineProperty(a.media, "currentSrc", { get: () => He }),
          Object.defineProperty(a.media, "ended", {
            get: () => a.currentTime === a.duration,
          }),
          Promise.all([a.embed.getVideoWidth(), a.embed.getVideoHeight()]).then(
            (_e) => {
              const [Ke, kt] = _e;
              (a.embed.ratio = mt(Ke, kt)), Je.call(this);
            }
          ),
          a.embed.setAutopause(a.config.autopause).then((_e) => {
            a.config.autopause = _e;
          }),
          a.embed.getVideoTitle().then((_e) => {
            (a.config.title = _e), lt.setTitle.call(this);
          }),
          a.embed.getCurrentTime().then((_e) => {
            (je = _e), z.call(a, a.media, "timeupdate");
          }),
          a.embed.getDuration().then((_e) => {
            (a.media.duration = _e), z.call(a, a.media, "durationchange");
          }),
          a.embed.getTextTracks().then((_e) => {
            (a.media.textTracks = _e), nt.setup.call(a);
          }),
          a.embed.on("cuechange", ({ cues: _e = [] }) => {
            const Ke = _e.map((kt) =>
              (function (St) {
                const Nt = document.createDocumentFragment(),
                  sn = document.createElement("div");
                return (
                  Nt.appendChild(sn),
                  (sn.innerHTML = St),
                  Nt.firstChild.innerText
                );
              })(kt.text)
            );
            nt.updateCues.call(a, Ke);
          }),
          a.embed.on("loaded", () => {
            a.embed.getPaused().then((_e) => {
              fn.call(a, !_e), _e || z.call(a, a.media, "playing");
            }),
              C.element(a.embed.element) &&
                a.supported.ui &&
                a.embed.element.setAttribute("tabindex", -1);
          }),
          a.embed.on("bufferstart", () => {
            z.call(a, a.media, "waiting");
          }),
          a.embed.on("bufferend", () => {
            z.call(a, a.media, "playing");
          }),
          a.embed.on("play", () => {
            fn.call(a, !0), z.call(a, a.media, "playing");
          }),
          a.embed.on("pause", () => {
            fn.call(a, !1);
          }),
          a.embed.on("timeupdate", (_e) => {
            (a.media.seeking = !1),
              (je = _e.seconds),
              z.call(a, a.media, "timeupdate");
          }),
          a.embed.on("progress", (_e) => {
            (a.media.buffered = _e.percent),
              z.call(a, a.media, "progress"),
              parseInt(_e.percent, 10) === 1 &&
                z.call(a, a.media, "canplaythrough"),
              a.embed.getDuration().then((Ke) => {
                Ke !== a.media.duration &&
                  ((a.media.duration = Ke),
                  z.call(a, a.media, "durationchange"));
              });
          }),
          a.embed.on("seeked", () => {
            (a.media.seeking = !1), z.call(a, a.media, "seeked");
          }),
          a.embed.on("ended", () => {
            (a.media.paused = !0), z.call(a, a.media, "ended");
          }),
          a.embed.on("error", (_e) => {
            (a.media.error = _e), z.call(a, a.media, "error");
          }),
          d.customControls && setTimeout(() => lt.build.call(a), 0);
      },
    };
    function Bn(a) {
      a && !this.embed.hasPlayed && (this.embed.hasPlayed = !0),
        this.media.paused === a &&
          ((this.media.paused = !a),
          z.call(this, this.media, a ? "play" : "pause"));
    }
    function yr(a) {
      return a.noCookie
        ? "https://www.youtube-nocookie.com"
        : window.location.protocol === "http:"
        ? "http://www.youtube.com"
        : void 0;
    }
    const Fn = {
        setup() {
          if (
            (Ve(this.elements.wrapper, this.config.classNames.embed, !0),
            C.object(window.YT) && C.function(window.YT.Player))
          )
            Fn.ready.call(this);
          else {
            const a = window.onYouTubeIframeAPIReady;
            (window.onYouTubeIframeAPIReady = () => {
              C.function(a) && a(), Fn.ready.call(this);
            }),
              mr(this.config.urls.youtube.sdk).catch((d) => {
                this.debug.warn("YouTube API failed to load", d);
              });
          }
        },
        getTitle(a) {
          Kn(nn(this.config.urls.youtube.api, a))
            .then((d) => {
              if (C.object(d)) {
                const { title: c, height: m, width: _ } = d;
                (this.config.title = c),
                  lt.setTitle.call(this),
                  (this.embed.ratio = mt(_, m));
              }
              Je.call(this);
            })
            .catch(() => {
              Je.call(this);
            });
        },
        ready() {
          const a = this,
            d = a.config.youtube,
            c = a.media && a.media.getAttribute("id");
          if (!C.empty(c) && c.startsWith("youtube-")) return;
          let m = a.media.getAttribute("src");
          C.empty(m) &&
            (m = a.media.getAttribute(this.config.attributes.embed.id));
          const _ =
            ((E = m),
            C.empty(E)
              ? null
              : E.match(
                  /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
                )
              ? RegExp.$2
              : E);
          var E;
          const N = ae("div", {
            id: `${a.provider}-${Math.floor(1e4 * Math.random())}`,
            "data-poster": d.customControls ? a.poster : void 0,
          });
          if (((a.media = Mt(N, a.media)), d.customControls)) {
            const B = (V) => `https://i.ytimg.com/vi/${_}/${V}default.jpg`;
            mi(B("maxres"), 121)
              .catch(() => mi(B("sd"), 121))
              .catch(() => mi(B("hq")))
              .then((V) => lt.setPoster.call(a, V.src))
              .then((V) => {
                V.includes("maxres") ||
                  (a.elements.poster.style.backgroundSize = "cover");
              })
              .catch(() => {});
          }
          a.embed = new window.YT.Player(a.media, {
            videoId: _,
            host: yr(d),
            playerVars: ue(
              {},
              {
                autoplay: a.config.autoplay ? 1 : 0,
                hl: a.config.hl,
                controls: a.supported.ui && d.customControls ? 0 : 1,
                disablekb: 1,
                playsinline:
                  a.config.playsinline && !a.config.fullscreen.iosNative
                    ? 1
                    : 0,
                cc_load_policy: a.captions.active ? 1 : 0,
                cc_lang_pref: a.config.captions.language,
                widget_referrer: window ? window.location.href : null,
              },
              d
            ),
            events: {
              onError(B) {
                if (!a.media.error) {
                  const V = B.data,
                    ie =
                      {
                        2: "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.",
                        5: "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.",
                        100: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.",
                        101: "The owner of the requested video does not allow it to be played in embedded players.",
                        150: "The owner of the requested video does not allow it to be played in embedded players.",
                      }[V] || "An unknown error occurred";
                  (a.media.error = { code: V, message: ie }),
                    z.call(a, a.media, "error");
                }
              },
              onPlaybackRateChange(B) {
                const V = B.target;
                (a.media.playbackRate = V.getPlaybackRate()),
                  z.call(a, a.media, "ratechange");
              },
              onReady(B) {
                if (C.function(a.media.play)) return;
                const V = B.target;
                Fn.getTitle.call(a, _),
                  (a.media.play = () => {
                    Bn.call(a, !0), V.playVideo();
                  }),
                  (a.media.pause = () => {
                    Bn.call(a, !1), V.pauseVideo();
                  }),
                  (a.media.stop = () => {
                    V.stopVideo();
                  }),
                  (a.media.duration = V.getDuration()),
                  (a.media.paused = !0),
                  (a.media.currentTime = 0),
                  Object.defineProperty(a.media, "currentTime", {
                    get: () => Number(V.getCurrentTime()),
                    set(pe) {
                      a.paused && !a.embed.hasPlayed && a.embed.mute(),
                        (a.media.seeking = !0),
                        z.call(a, a.media, "seeking"),
                        V.seekTo(pe);
                    },
                  }),
                  Object.defineProperty(a.media, "playbackRate", {
                    get: () => V.getPlaybackRate(),
                    set(pe) {
                      V.setPlaybackRate(pe);
                    },
                  });
                let { volume: ie } = a.config;
                Object.defineProperty(a.media, "volume", {
                  get: () => ie,
                  set(pe) {
                    (ie = pe),
                      V.setVolume(100 * ie),
                      z.call(a, a.media, "volumechange");
                  },
                });
                let { muted: Te } = a.config;
                Object.defineProperty(a.media, "muted", {
                  get: () => Te,
                  set(pe) {
                    const je = C.boolean(pe) ? pe : Te;
                    (Te = je),
                      V[je ? "mute" : "unMute"](),
                      V.setVolume(100 * ie),
                      z.call(a, a.media, "volumechange");
                  },
                }),
                  Object.defineProperty(a.media, "currentSrc", {
                    get: () => V.getVideoUrl(),
                  }),
                  Object.defineProperty(a.media, "ended", {
                    get: () => a.currentTime === a.duration,
                  });
                const Ne = V.getAvailablePlaybackRates();
                (a.options.speed = Ne.filter((pe) =>
                  a.config.speed.options.includes(pe)
                )),
                  a.supported.ui &&
                    d.customControls &&
                    a.media.setAttribute("tabindex", -1),
                  z.call(a, a.media, "timeupdate"),
                  z.call(a, a.media, "durationchange"),
                  clearInterval(a.timers.buffering),
                  (a.timers.buffering = setInterval(() => {
                    (a.media.buffered = V.getVideoLoadedFraction()),
                      (a.media.lastBuffered === null ||
                        a.media.lastBuffered < a.media.buffered) &&
                        z.call(a, a.media, "progress"),
                      (a.media.lastBuffered = a.media.buffered),
                      a.media.buffered === 1 &&
                        (clearInterval(a.timers.buffering),
                        z.call(a, a.media, "canplaythrough"));
                  }, 200)),
                  d.customControls && setTimeout(() => lt.build.call(a), 50);
              },
              onStateChange(B) {
                const V = B.target;
                switch (
                  (clearInterval(a.timers.playing),
                  a.media.seeking &&
                    [1, 2].includes(B.data) &&
                    ((a.media.seeking = !1), z.call(a, a.media, "seeked")),
                  B.data)
                ) {
                  case -1:
                    z.call(a, a.media, "timeupdate"),
                      (a.media.buffered = V.getVideoLoadedFraction()),
                      z.call(a, a.media, "progress");
                    break;
                  case 0:
                    Bn.call(a, !1),
                      a.media.loop
                        ? (V.stopVideo(), V.playVideo())
                        : z.call(a, a.media, "ended");
                    break;
                  case 1:
                    d.customControls &&
                    !a.config.autoplay &&
                    a.media.paused &&
                    !a.embed.hasPlayed
                      ? a.media.pause()
                      : (Bn.call(a, !0),
                        z.call(a, a.media, "playing"),
                        (a.timers.playing = setInterval(() => {
                          z.call(a, a.media, "timeupdate");
                        }, 50)),
                        a.media.duration !== V.getDuration() &&
                          ((a.media.duration = V.getDuration()),
                          z.call(a, a.media, "durationchange")));
                    break;
                  case 2:
                    a.muted || a.embed.unMute(), Bn.call(a, !1);
                    break;
                  case 3:
                    z.call(a, a.media, "waiting");
                }
                z.call(a, a.elements.container, "statechange", !1, {
                  code: B.data,
                });
              },
            },
          });
        },
      },
      br = {
        setup() {
          this.media
            ? (Ve(
                this.elements.container,
                this.config.classNames.type.replace("{0}", this.type),
                !0
              ),
              Ve(
                this.elements.container,
                this.config.classNames.provider.replace("{0}", this.provider),
                !0
              ),
              this.isEmbed &&
                Ve(
                  this.elements.container,
                  this.config.classNames.type.replace("{0}", "video"),
                  !0
                ),
              this.isVideo &&
                ((this.elements.wrapper = ae("div", {
                  class: this.config.classNames.video,
                })),
                vt(this.media, this.elements.wrapper),
                (this.elements.poster = ae("div", {
                  class: this.config.classNames.poster,
                })),
                this.elements.wrapper.appendChild(this.elements.poster)),
              this.isHTML5
                ? Tt.setup.call(this)
                : this.isYouTube
                ? Fn.setup.call(this)
                : this.isVimeo && Mi.setup.call(this))
            : this.debug.warn("No media element found!");
        },
      };
    class ro {
      constructor(d) {
        e(this, "load", () => {
          this.enabled &&
            (C.object(window.google) && C.object(window.google.ima)
              ? this.ready()
              : mr(this.player.config.urls.googleIMA.sdk)
                  .then(() => {
                    this.ready();
                  })
                  .catch(() => {
                    this.trigger(
                      "error",
                      new Error("Google IMA SDK failed to load")
                    );
                  }));
        }),
          e(this, "ready", () => {
            var c;
            this.enabled ||
              ((c = this).manager && c.manager.destroy(),
              c.elements.displayContainer &&
                c.elements.displayContainer.destroy(),
              c.elements.container.remove()),
              this.startSafetyTimer(12e3, "ready()"),
              this.managerPromise.then(() => {
                this.clearSafetyTimer("onAdsManagerLoaded()");
              }),
              this.listeners(),
              this.setupIMA();
          }),
          e(this, "setupIMA", () => {
            (this.elements.container = ae("div", {
              class: this.player.config.classNames.ads,
            })),
              this.player.elements.container.appendChild(
                this.elements.container
              ),
              google.ima.settings.setVpaidMode(
                google.ima.ImaSdkSettings.VpaidMode.ENABLED
              ),
              google.ima.settings.setLocale(this.player.config.ads.language),
              google.ima.settings.setDisableCustomPlaybackForIOS10Plus(
                this.player.config.playsinline
              ),
              (this.elements.displayContainer =
                new google.ima.AdDisplayContainer(
                  this.elements.container,
                  this.player.media
                )),
              (this.loader = new google.ima.AdsLoader(
                this.elements.displayContainer
              )),
              this.loader.addEventListener(
                google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
                (c) => this.onAdsManagerLoaded(c),
                !1
              ),
              this.loader.addEventListener(
                google.ima.AdErrorEvent.Type.AD_ERROR,
                (c) => this.onAdError(c),
                !1
              ),
              this.requestAds();
          }),
          e(this, "requestAds", () => {
            const { container: c } = this.player.elements;
            try {
              const m = new google.ima.AdsRequest();
              (m.adTagUrl = this.tagUrl),
                (m.linearAdSlotWidth = c.offsetWidth),
                (m.linearAdSlotHeight = c.offsetHeight),
                (m.nonLinearAdSlotWidth = c.offsetWidth),
                (m.nonLinearAdSlotHeight = c.offsetHeight),
                (m.forceNonLinearFullSlot = !1),
                m.setAdWillPlayMuted(!this.player.muted),
                this.loader.requestAds(m);
            } catch (m) {
              this.onAdError(m);
            }
          }),
          e(this, "pollCountdown", (c = !1) => {
            if (!c)
              return (
                clearInterval(this.countdownTimer),
                void this.elements.container.removeAttribute("data-badge-text")
              );
            this.countdownTimer = setInterval(() => {
              const m = pi(Math.max(this.manager.getRemainingTime(), 0)),
                _ = `${pt.get("advertisement", this.player.config)} - ${m}`;
              this.elements.container.setAttribute("data-badge-text", _);
            }, 100);
          }),
          e(this, "onAdsManagerLoaded", (c) => {
            if (!this.enabled) return;
            const m = new google.ima.AdsRenderingSettings();
            (m.restoreCustomPlaybackStateOnAdBreakComplete = !0),
              (m.enablePreloading = !0),
              (this.manager = c.getAdsManager(this.player, m)),
              (this.cuePoints = this.manager.getCuePoints()),
              this.manager.addEventListener(
                google.ima.AdErrorEvent.Type.AD_ERROR,
                (_) => this.onAdError(_)
              ),
              Object.keys(google.ima.AdEvent.Type).forEach((_) => {
                this.manager.addEventListener(google.ima.AdEvent.Type[_], (E) =>
                  this.onAdEvent(E)
                );
              }),
              this.trigger("loaded");
          }),
          e(this, "addCuePoints", () => {
            C.empty(this.cuePoints) ||
              this.cuePoints.forEach((c) => {
                if (c !== 0 && c !== -1 && c < this.player.duration) {
                  const m = this.player.elements.progress;
                  if (C.element(m)) {
                    const _ = (100 / this.player.duration) * c,
                      E = ae("span", {
                        class: this.player.config.classNames.cues,
                      });
                    (E.style.left = `${_.toString()}%`), m.appendChild(E);
                  }
                }
              });
          }),
          e(this, "onAdEvent", (c) => {
            const { container: m } = this.player.elements,
              _ = c.getAd(),
              E = c.getAdData();
            switch (
              (((N) => {
                z.call(
                  this.player,
                  this.player.media,
                  `ads${N.replace(/_/g, "").toLowerCase()}`
                );
              })(c.type),
              c.type)
            ) {
              case google.ima.AdEvent.Type.LOADED:
                this.trigger("loaded"),
                  this.pollCountdown(!0),
                  _.isLinear() ||
                    ((_.width = m.offsetWidth), (_.height = m.offsetHeight));
                break;
              case google.ima.AdEvent.Type.STARTED:
                this.manager.setVolume(this.player.volume);
                break;
              case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                this.player.ended
                  ? this.loadAds()
                  : this.loader.contentComplete();
                break;
              case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
                this.pauseContent();
                break;
              case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
                this.pollCountdown(), this.resumeContent();
                break;
              case google.ima.AdEvent.Type.LOG:
                E.adError &&
                  this.player.debug.warn(
                    `Non-fatal ad error: ${E.adError.getMessage()}`
                  );
            }
          }),
          e(this, "onAdError", (c) => {
            this.cancel(), this.player.debug.warn("Ads error", c);
          }),
          e(this, "listeners", () => {
            const { container: c } = this.player.elements;
            let m;
            this.player.on("canplay", () => {
              this.addCuePoints();
            }),
              this.player.on("ended", () => {
                this.loader.contentComplete();
              }),
              this.player.on("timeupdate", () => {
                m = this.player.currentTime;
              }),
              this.player.on("seeked", () => {
                const _ = this.player.currentTime;
                C.empty(this.cuePoints) ||
                  this.cuePoints.forEach((E, N) => {
                    m < E &&
                      E < _ &&
                      (this.manager.discardAdBreak(),
                      this.cuePoints.splice(N, 1));
                  });
              }),
              window.addEventListener("resize", () => {
                this.manager &&
                  this.manager.resize(
                    c.offsetWidth,
                    c.offsetHeight,
                    google.ima.ViewMode.NORMAL
                  );
              });
          }),
          e(this, "play", () => {
            const { container: c } = this.player.elements;
            this.managerPromise || this.resumeContent(),
              this.managerPromise
                .then(() => {
                  this.manager.setVolume(this.player.volume),
                    this.elements.displayContainer.initialize();
                  try {
                    this.initialized ||
                      (this.manager.init(
                        c.offsetWidth,
                        c.offsetHeight,
                        google.ima.ViewMode.NORMAL
                      ),
                      this.manager.start()),
                      (this.initialized = !0);
                  } catch (m) {
                    this.onAdError(m);
                  }
                })
                .catch(() => {});
          }),
          e(this, "resumeContent", () => {
            (this.elements.container.style.zIndex = ""),
              (this.playing = !1),
              le(this.player.media.play());
          }),
          e(this, "pauseContent", () => {
            (this.elements.container.style.zIndex = 3),
              (this.playing = !0),
              this.player.media.pause();
          }),
          e(this, "cancel", () => {
            this.initialized && this.resumeContent(),
              this.trigger("error"),
              this.loadAds();
          }),
          e(this, "loadAds", () => {
            this.managerPromise
              .then(() => {
                this.manager && this.manager.destroy(),
                  (this.managerPromise = new Promise((c) => {
                    this.on("loaded", c), this.player.debug.log(this.manager);
                  })),
                  (this.initialized = !1),
                  this.requestAds();
              })
              .catch(() => {});
          }),
          e(this, "trigger", (c, ...m) => {
            const _ = this.events[c];
            C.array(_) &&
              _.forEach((E) => {
                C.function(E) && E.apply(this, m);
              });
          }),
          e(
            this,
            "on",
            (c, m) => (
              C.array(this.events[c]) || (this.events[c] = []),
              this.events[c].push(m),
              this
            )
          ),
          e(this, "startSafetyTimer", (c, m) => {
            this.player.debug.log(`Safety timer invoked from: ${m}`),
              (this.safetyTimer = setTimeout(() => {
                this.cancel(), this.clearSafetyTimer("startSafetyTimer()");
              }, c));
          }),
          e(this, "clearSafetyTimer", (c) => {
            C.nullOrUndefined(this.safetyTimer) ||
              (this.player.debug.log(`Safety timer cleared from: ${c}`),
              clearTimeout(this.safetyTimer),
              (this.safetyTimer = null));
          }),
          (this.player = d),
          (this.config = d.config.ads),
          (this.playing = !1),
          (this.initialized = !1),
          (this.elements = { container: null, displayContainer: null }),
          (this.manager = null),
          (this.loader = null),
          (this.cuePoints = null),
          (this.events = {}),
          (this.safetyTimer = null),
          (this.countdownTimer = null),
          (this.managerPromise = new Promise((c, m) => {
            this.on("loaded", c), this.on("error", m);
          })),
          this.load();
      }
      get enabled() {
        const { config: d } = this;
        return (
          this.player.isHTML5 &&
          this.player.isVideo &&
          d.enabled &&
          (!C.empty(d.publisherId) || C.url(d.tagUrl))
        );
      }
      get tagUrl() {
        const { config: d } = this;
        return C.url(d.tagUrl)
          ? d.tagUrl
          : `https://go.aniview.com/api/adserver6/vast/?${Oi({
              AV_PUBLISHERID: "58c25bb0073ef448b1087ad6",
              AV_CHANNELID: "5a0458dc28a06145e4519d21",
              AV_URL: window.location.hostname,
              cb: Date.now(),
              AV_WIDTH: 640,
              AV_HEIGHT: 480,
              AV_CDIM2: d.publisherId,
            })}`;
      }
    }
    function Jn(a = 0, d = 0, c = 255) {
      return Math.min(Math.max(a, d), c);
    }
    const Zr = (a) => {
        const d = [];
        return (
          a.split(/\r\n\r\n|\n\n|\r\r/).forEach((c) => {
            const m = {};
            c.split(/\r\n|\n|\r/).forEach((_) => {
              if (C.number(m.startTime)) {
                if (!C.empty(_.trim()) && C.empty(m.text)) {
                  const E = _.trim().split("#xywh=");
                  ([m.text] = E),
                    E[1] && ([m.x, m.y, m.w, m.h] = E[1].split(","));
                }
              } else {
                const E = _.match(
                  /([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/
                );
                E &&
                  ((m.startTime =
                    60 * Number(E[1] || 0) * 60 +
                    60 * Number(E[2]) +
                    Number(E[3]) +
                    +`0.${E[4]}`),
                  (m.endTime =
                    60 * Number(E[6] || 0) * 60 +
                    60 * Number(E[7]) +
                    Number(E[8]) +
                    +`0.${E[9]}`));
              }
            }),
              m.text && d.push(m);
          }),
          d
        );
      },
      vr = (a, d) => {
        const c = {};
        return (
          a > d.width / d.height
            ? ((c.width = d.width), (c.height = (1 / a) * d.width))
            : ((c.height = d.height), (c.width = a * d.height)),
          c
        );
      };
    class Li {
      constructor(d) {
        e(this, "load", () => {
          this.player.elements.display.seekTooltip &&
            (this.player.elements.display.seekTooltip.hidden = this.enabled),
            this.enabled &&
              this.getThumbnails().then(() => {
                this.enabled &&
                  (this.render(),
                  this.determineContainerAutoSizing(),
                  this.listeners(),
                  (this.loaded = !0));
              });
        }),
          e(
            this,
            "getThumbnails",
            () =>
              new Promise((c) => {
                const { src: m } = this.player.config.previewThumbnails;
                if (C.empty(m))
                  throw new Error(
                    "Missing previewThumbnails.src config attribute"
                  );
                const _ = () => {
                  this.thumbnails.sort((E, N) => E.height - N.height),
                    this.player.debug.log(
                      "Preview thumbnails",
                      this.thumbnails
                    ),
                    c();
                };
                if (C.function(m))
                  m((E) => {
                    (this.thumbnails = E), _();
                  });
                else {
                  const E = (C.string(m) ? [m] : m).map((N) =>
                    this.getThumbnail(N)
                  );
                  Promise.all(E).then(_);
                }
              })
          ),
          e(
            this,
            "getThumbnail",
            (c) =>
              new Promise((m) => {
                Kn(c).then((_) => {
                  const E = { frames: Zr(_), height: null, urlPrefix: "" };
                  E.frames[0].text.startsWith("/") ||
                    E.frames[0].text.startsWith("http://") ||
                    E.frames[0].text.startsWith("https://") ||
                    (E.urlPrefix = c.substring(0, c.lastIndexOf("/") + 1));
                  const N = new Image();
                  (N.onload = () => {
                    (E.height = N.naturalHeight),
                      (E.width = N.naturalWidth),
                      this.thumbnails.push(E),
                      m();
                  }),
                    (N.src = E.urlPrefix + E.frames[0].text);
                });
              })
          ),
          e(this, "startMove", (c) => {
            if (
              this.loaded &&
              C.event(c) &&
              ["touchmove", "mousemove"].includes(c.type) &&
              this.player.media.duration
            ) {
              if (c.type === "touchmove")
                this.seekTime =
                  this.player.media.duration *
                  (this.player.elements.inputs.seek.value / 100);
              else {
                var m, _;
                const E = this.player.elements.progress.getBoundingClientRect(),
                  N = (100 / E.width) * (c.pageX - E.left);
                (this.seekTime = this.player.media.duration * (N / 100)),
                  this.seekTime < 0 && (this.seekTime = 0),
                  this.seekTime > this.player.media.duration - 1 &&
                    (this.seekTime = this.player.media.duration - 1),
                  (this.mousePosX = c.pageX),
                  (this.elements.thumb.time.innerText = pi(this.seekTime));
                const B =
                  (m = this.player.config.markers) === null ||
                  m === void 0 ||
                  (_ = m.points) === null ||
                  _ === void 0
                    ? void 0
                    : _.find(({ time: V }) => V === Math.round(this.seekTime));
                B &&
                  this.elements.thumb.time.insertAdjacentHTML(
                    "afterbegin",
                    `${B.label}<br>`
                  );
              }
              this.showImageAtCurrentTime();
            }
          }),
          e(this, "endMove", () => {
            this.toggleThumbContainer(!1, !0);
          }),
          e(this, "startScrubbing", (c) => {
            (C.nullOrUndefined(c.button) ||
              c.button === !1 ||
              c.button === 0) &&
              ((this.mouseDown = !0),
              this.player.media.duration &&
                (this.toggleScrubbingContainer(!0),
                this.toggleThumbContainer(!1, !0),
                this.showImageAtCurrentTime()));
          }),
          e(this, "endScrubbing", () => {
            (this.mouseDown = !1),
              Math.ceil(this.lastTime) ===
              Math.ceil(this.player.media.currentTime)
                ? this.toggleScrubbingContainer(!1)
                : ne.call(this.player, this.player.media, "timeupdate", () => {
                    this.mouseDown || this.toggleScrubbingContainer(!1);
                  });
          }),
          e(this, "listeners", () => {
            this.player.on("play", () => {
              this.toggleThumbContainer(!1, !0);
            }),
              this.player.on("seeked", () => {
                this.toggleThumbContainer(!1);
              }),
              this.player.on("timeupdate", () => {
                this.lastTime = this.player.media.currentTime;
              });
          }),
          e(this, "render", () => {
            (this.elements.thumb.container = ae("div", {
              class:
                this.player.config.classNames.previewThumbnails.thumbContainer,
            })),
              (this.elements.thumb.imageContainer = ae("div", {
                class:
                  this.player.config.classNames.previewThumbnails
                    .imageContainer,
              })),
              this.elements.thumb.container.appendChild(
                this.elements.thumb.imageContainer
              );
            const c = ae("div", {
              class:
                this.player.config.classNames.previewThumbnails.timeContainer,
            });
            (this.elements.thumb.time = ae("span", {}, "00:00")),
              c.appendChild(this.elements.thumb.time),
              this.elements.thumb.imageContainer.appendChild(c),
              C.element(this.player.elements.progress) &&
                this.player.elements.progress.appendChild(
                  this.elements.thumb.container
                ),
              (this.elements.scrubbing.container = ae("div", {
                class:
                  this.player.config.classNames.previewThumbnails
                    .scrubbingContainer,
              })),
              this.player.elements.wrapper.appendChild(
                this.elements.scrubbing.container
              );
          }),
          e(this, "destroy", () => {
            this.elements.thumb.container &&
              this.elements.thumb.container.remove(),
              this.elements.scrubbing.container &&
                this.elements.scrubbing.container.remove();
          }),
          e(this, "showImageAtCurrentTime", () => {
            this.mouseDown
              ? this.setScrubbingContainerSize()
              : this.setThumbContainerSizeAndPos();
            const c = this.thumbnails[0].frames.findIndex(
                (E) =>
                  this.seekTime >= E.startTime && this.seekTime <= E.endTime
              ),
              m = c >= 0;
            let _ = 0;
            this.mouseDown || this.toggleThumbContainer(m),
              m &&
                (this.thumbnails.forEach((E, N) => {
                  this.loadedImages.includes(E.frames[c].text) && (_ = N);
                }),
                c !== this.showingThumb &&
                  ((this.showingThumb = c), this.loadImage(_)));
          }),
          e(this, "loadImage", (c = 0) => {
            const m = this.showingThumb,
              _ = this.thumbnails[c],
              { urlPrefix: E } = _,
              N = _.frames[m],
              B = _.frames[m].text,
              V = E + B;
            if (
              this.currentImageElement &&
              this.currentImageElement.dataset.filename === B
            )
              this.showImage(this.currentImageElement, N, c, m, B, !1),
                (this.currentImageElement.dataset.index = m),
                this.removeOldImages(this.currentImageElement);
            else {
              this.loadingImage &&
                this.usingSprites &&
                (this.loadingImage.onload = null);
              const ie = new Image();
              (ie.src = V),
                (ie.dataset.index = m),
                (ie.dataset.filename = B),
                (this.showingThumbFilename = B),
                this.player.debug.log(`Loading image: ${V}`),
                (ie.onload = () => this.showImage(ie, N, c, m, B, !0)),
                (this.loadingImage = ie),
                this.removeOldImages(ie);
            }
          }),
          e(this, "showImage", (c, m, _, E, N, B = !0) => {
            this.player.debug.log(
              `Showing thumb: ${N}. num: ${E}. qual: ${_}. newimg: ${B}`
            ),
              this.setImageSizeAndOffset(c, m),
              B &&
                (this.currentImageContainer.appendChild(c),
                (this.currentImageElement = c),
                this.loadedImages.includes(N) || this.loadedImages.push(N)),
              this.preloadNearby(E, !0)
                .then(this.preloadNearby(E, !1))
                .then(this.getHigherQuality(_, c, m, N));
          }),
          e(this, "removeOldImages", (c) => {
            Array.from(this.currentImageContainer.children).forEach((m) => {
              if (m.tagName.toLowerCase() !== "img") return;
              const _ = this.usingSprites ? 500 : 1e3;
              if (m.dataset.index !== c.dataset.index && !m.dataset.deleting) {
                m.dataset.deleting = !0;
                const { currentImageContainer: E } = this;
                setTimeout(() => {
                  E.removeChild(m),
                    this.player.debug.log(
                      `Removing thumb: ${m.dataset.filename}`
                    );
                }, _);
              }
            });
          }),
          e(
            this,
            "preloadNearby",
            (c, m = !0) =>
              new Promise((_) => {
                setTimeout(() => {
                  const E = this.thumbnails[0].frames[c].text;
                  if (this.showingThumbFilename === E) {
                    let N;
                    N = m
                      ? this.thumbnails[0].frames.slice(c)
                      : this.thumbnails[0].frames.slice(0, c).reverse();
                    let B = !1;
                    N.forEach((V) => {
                      const ie = V.text;
                      if (ie !== E && !this.loadedImages.includes(ie)) {
                        (B = !0),
                          this.player.debug.log(
                            `Preloading thumb filename: ${ie}`
                          );
                        const { urlPrefix: Te } = this.thumbnails[0],
                          Ne = Te + ie,
                          pe = new Image();
                        (pe.src = Ne),
                          (pe.onload = () => {
                            this.player.debug.log(
                              `Preloaded thumb filename: ${ie}`
                            ),
                              this.loadedImages.includes(ie) ||
                                this.loadedImages.push(ie),
                              _();
                          });
                      }
                    }),
                      B || _();
                  }
                }, 300);
              })
          ),
          e(this, "getHigherQuality", (c, m, _, E) => {
            if (c < this.thumbnails.length - 1) {
              let N = m.naturalHeight;
              this.usingSprites && (N = _.h),
                N < this.thumbContainerHeight &&
                  setTimeout(() => {
                    this.showingThumbFilename === E &&
                      (this.player.debug.log(
                        `Showing higher quality thumb for: ${E}`
                      ),
                      this.loadImage(c + 1));
                  }, 300);
            }
          }),
          e(this, "toggleThumbContainer", (c = !1, m = !1) => {
            const _ =
              this.player.config.classNames.previewThumbnails
                .thumbContainerShown;
            this.elements.thumb.container.classList.toggle(_, c),
              !c &&
                m &&
                ((this.showingThumb = null),
                (this.showingThumbFilename = null));
          }),
          e(this, "toggleScrubbingContainer", (c = !1) => {
            const m =
              this.player.config.classNames.previewThumbnails
                .scrubbingContainerShown;
            this.elements.scrubbing.container.classList.toggle(m, c),
              c ||
                ((this.showingThumb = null),
                (this.showingThumbFilename = null));
          }),
          e(this, "determineContainerAutoSizing", () => {
            (this.elements.thumb.imageContainer.clientHeight > 20 ||
              this.elements.thumb.imageContainer.clientWidth > 20) &&
              (this.sizeSpecifiedInCSS = !0);
          }),
          e(this, "setThumbContainerSizeAndPos", () => {
            const { imageContainer: c } = this.elements.thumb;
            if (this.sizeSpecifiedInCSS) {
              if (c.clientHeight > 20 && c.clientWidth < 20) {
                const m = Math.floor(c.clientHeight * this.thumbAspectRatio);
                c.style.width = `${m}px`;
              } else if (c.clientHeight < 20 && c.clientWidth > 20) {
                const m = Math.floor(c.clientWidth / this.thumbAspectRatio);
                c.style.height = `${m}px`;
              }
            } else {
              const m = Math.floor(
                this.thumbContainerHeight * this.thumbAspectRatio
              );
              (c.style.height = `${this.thumbContainerHeight}px`),
                (c.style.width = `${m}px`);
            }
            this.setThumbContainerPos();
          }),
          e(this, "setThumbContainerPos", () => {
            const c = this.player.elements.progress.getBoundingClientRect(),
              m = this.player.elements.container.getBoundingClientRect(),
              { container: _ } = this.elements.thumb,
              E = m.left - c.left + 10,
              N = m.right - c.left - _.clientWidth - 10,
              B = this.mousePosX - c.left - _.clientWidth / 2,
              V = Jn(B, E, N);
            (_.style.left = `${V}px`),
              _.style.setProperty("--preview-arrow-offset", B - V + "px");
          }),
          e(this, "setScrubbingContainerSize", () => {
            const { width: c, height: m } = vr(this.thumbAspectRatio, {
              width: this.player.media.clientWidth,
              height: this.player.media.clientHeight,
            });
            (this.elements.scrubbing.container.style.width = `${c}px`),
              (this.elements.scrubbing.container.style.height = `${m}px`);
          }),
          e(this, "setImageSizeAndOffset", (c, m) => {
            if (!this.usingSprites) return;
            const _ = this.thumbContainerHeight / m.h;
            (c.style.height = c.naturalHeight * _ + "px"),
              (c.style.width = c.naturalWidth * _ + "px"),
              (c.style.left = `-${m.x * _}px`),
              (c.style.top = `-${m.y * _}px`);
          }),
          (this.player = d),
          (this.thumbnails = []),
          (this.loaded = !1),
          (this.lastMouseMoveTime = Date.now()),
          (this.mouseDown = !1),
          (this.loadedImages = []),
          (this.elements = { thumb: {}, scrubbing: {} }),
          this.load();
      }
      get enabled() {
        return (
          this.player.isHTML5 &&
          this.player.isVideo &&
          this.player.config.previewThumbnails.enabled
        );
      }
      get currentImageContainer() {
        return this.mouseDown
          ? this.elements.scrubbing.container
          : this.elements.thumb.imageContainer;
      }
      get usingSprites() {
        return Object.keys(this.thumbnails[0].frames[0]).includes("w");
      }
      get thumbAspectRatio() {
        return this.usingSprites
          ? this.thumbnails[0].frames[0].w / this.thumbnails[0].frames[0].h
          : this.thumbnails[0].width / this.thumbnails[0].height;
      }
      get thumbContainerHeight() {
        if (this.mouseDown) {
          const { height: d } = vr(this.thumbAspectRatio, {
            width: this.player.media.clientWidth,
            height: this.player.media.clientHeight,
          });
          return d;
        }
        return this.sizeSpecifiedInCSS
          ? this.elements.thumb.imageContainer.clientHeight
          : Math.floor(
              this.player.media.clientWidth / this.thumbAspectRatio / 4
            );
      }
      get currentImageElement() {
        return this.mouseDown
          ? this.currentScrubbingImageElement
          : this.currentThumbnailImageElement;
      }
      set currentImageElement(d) {
        this.mouseDown
          ? (this.currentScrubbingImageElement = d)
          : (this.currentThumbnailImageElement = d);
      }
    }
    const ji = {
      insertElements(a, d) {
        C.string(d)
          ? Qe(a, this.media, { src: d })
          : C.array(d) &&
            d.forEach((c) => {
              Qe(a, this.media, c);
            });
      },
      change(a) {
        Ee(a, "sources.length")
          ? (Tt.cancelRequests.call(this),
            this.destroy.call(
              this,
              () => {
                (this.options.quality = []),
                  ht(this.media),
                  (this.media = null),
                  C.element(this.elements.container) &&
                    this.elements.container.removeAttribute("class");
                const { sources: d, type: c } = a,
                  [{ provider: m = Yt.html5, src: _ }] = d,
                  E = m === "html5" ? c : "div",
                  N = m === "html5" ? {} : { src: _ };
                Object.assign(this, {
                  provider: m,
                  type: c,
                  supported: Oe.check(c, m, this.config.playsinline),
                  media: ae(E, N),
                }),
                  this.elements.container.appendChild(this.media),
                  C.boolean(a.autoplay) && (this.config.autoplay = a.autoplay),
                  this.isHTML5 &&
                    (this.config.crossorigin &&
                      this.media.setAttribute("crossorigin", ""),
                    this.config.autoplay &&
                      this.media.setAttribute("autoplay", ""),
                    C.empty(a.poster) || (this.poster = a.poster),
                    this.config.loop.active &&
                      this.media.setAttribute("loop", ""),
                    this.config.muted && this.media.setAttribute("muted", ""),
                    this.config.playsinline &&
                      this.media.setAttribute("playsinline", "")),
                  lt.addStyleHook.call(this),
                  this.isHTML5 && ji.insertElements.call(this, "source", d),
                  (this.config.title = a.title),
                  br.setup.call(this),
                  this.isHTML5 &&
                    Object.keys(a).includes("tracks") &&
                    ji.insertElements.call(this, "track", a.tracks),
                  (this.isHTML5 || (this.isEmbed && !this.supported.ui)) &&
                    lt.build.call(this),
                  this.isHTML5 && this.media.load(),
                  C.empty(a.previewThumbnails) ||
                    (Object.assign(
                      this.config.previewThumbnails,
                      a.previewThumbnails
                    ),
                    this.previewThumbnails &&
                      this.previewThumbnails.loaded &&
                      (this.previewThumbnails.destroy(),
                      (this.previewThumbnails = null)),
                    this.config.previewThumbnails.enabled &&
                      (this.previewThumbnails = new Li(this))),
                  this.fullscreen.update();
              },
              !0
            ))
          : this.debug.warn("Invalid source format");
      },
    };
    class yi {
      constructor(d, c) {
        if (
          (e(this, "play", () =>
            C.function(this.media.play)
              ? (this.ads &&
                  this.ads.enabled &&
                  this.ads.managerPromise
                    .then(() => this.ads.play())
                    .catch(() => le(this.media.play())),
                this.media.play())
              : null
          ),
          e(this, "pause", () =>
            this.playing && C.function(this.media.pause)
              ? this.media.pause()
              : null
          ),
          e(this, "togglePlay", (B) =>
            (C.boolean(B) ? B : !this.playing) ? this.play() : this.pause()
          ),
          e(this, "stop", () => {
            this.isHTML5
              ? (this.pause(), this.restart())
              : C.function(this.media.stop) && this.media.stop();
          }),
          e(this, "restart", () => {
            this.currentTime = 0;
          }),
          e(this, "rewind", (B) => {
            this.currentTime -= C.number(B) ? B : this.config.seekTime;
          }),
          e(this, "forward", (B) => {
            this.currentTime += C.number(B) ? B : this.config.seekTime;
          }),
          e(this, "increaseVolume", (B) => {
            const V = this.media.muted ? 0 : this.volume;
            this.volume = V + (C.number(B) ? B : 0);
          }),
          e(this, "decreaseVolume", (B) => {
            this.increaseVolume(-B);
          }),
          e(this, "airplay", () => {
            Oe.airplay && this.media.webkitShowPlaybackTargetPicker();
          }),
          e(this, "toggleControls", (B) => {
            if (this.supported.ui && !this.isAudio) {
              const V = vn(
                  this.elements.container,
                  this.config.classNames.hideControls
                ),
                ie = B === void 0 ? void 0 : !B,
                Te = Ve(
                  this.elements.container,
                  this.config.classNames.hideControls,
                  ie
                );
              if (
                (Te &&
                  C.array(this.config.controls) &&
                  this.config.controls.includes("settings") &&
                  !C.empty(this.config.settings) &&
                  ce.toggleMenu.call(this, !1),
                Te !== V)
              ) {
                const Ne = Te ? "controlshidden" : "controlsshown";
                z.call(this, this.media, Ne);
              }
              return !Te;
            }
            return !1;
          }),
          e(this, "on", (B, V) => {
            D.call(this, this.elements.container, B, V);
          }),
          e(this, "once", (B, V) => {
            ne.call(this, this.elements.container, B, V);
          }),
          e(this, "off", (B, V) => {
            G(this.elements.container, B, V);
          }),
          e(this, "destroy", (B, V = !1) => {
            if (!this.ready) return;
            const ie = () => {
              (document.body.style.overflow = ""),
                (this.embed = null),
                V
                  ? (Object.keys(this.elements).length &&
                      (ht(this.elements.buttons.play),
                      ht(this.elements.captions),
                      ht(this.elements.controls),
                      ht(this.elements.wrapper),
                      (this.elements.buttons.play = null),
                      (this.elements.captions = null),
                      (this.elements.controls = null),
                      (this.elements.wrapper = null)),
                    C.function(B) && B())
                  : (be.call(this),
                    Tt.cancelRequests.call(this),
                    Mt(this.elements.original, this.elements.container),
                    z.call(this, this.elements.original, "destroyed", !0),
                    C.function(B) && B.call(this.elements.original),
                    (this.ready = !1),
                    setTimeout(() => {
                      (this.elements = null), (this.media = null);
                    }, 200));
            };
            this.stop(),
              clearTimeout(this.timers.loading),
              clearTimeout(this.timers.controls),
              clearTimeout(this.timers.resized),
              this.isHTML5
                ? (lt.toggleNativeControls.call(this, !0), ie())
                : this.isYouTube
                ? (clearInterval(this.timers.buffering),
                  clearInterval(this.timers.playing),
                  this.embed !== null &&
                    C.function(this.embed.destroy) &&
                    this.embed.destroy(),
                  ie())
                : this.isVimeo &&
                  (this.embed !== null && this.embed.unload().then(ie),
                  setTimeout(ie, 200));
          }),
          e(this, "supports", (B) => Oe.mime.call(this, B)),
          (this.timers = {}),
          (this.ready = !1),
          (this.loading = !1),
          (this.failed = !1),
          (this.touch = Oe.touch),
          (this.media = d),
          C.string(this.media) &&
            (this.media = document.querySelectorAll(this.media)),
          ((window.jQuery && this.media instanceof jQuery) ||
            C.nodeList(this.media) ||
            C.array(this.media)) &&
            (this.media = this.media[0]),
          (this.config = ue(
            {},
            hr,
            yi.defaults,
            c || {},
            (() => {
              try {
                return JSON.parse(this.media.getAttribute("data-plyr-config"));
              } catch {
                return {};
              }
            })()
          )),
          (this.elements = {
            container: null,
            fullscreen: null,
            captions: null,
            buttons: {},
            display: {},
            progress: {},
            inputs: {},
            settings: { popup: null, menu: null, panels: {}, buttons: {} },
          }),
          (this.captions = {
            active: null,
            currentTrack: -1,
            meta: new WeakMap(),
          }),
          (this.fullscreen = { active: !1 }),
          (this.options = { speed: [], quality: [] }),
          (this.debug = new no(this.config.debug)),
          this.debug.log("Config", this.config),
          this.debug.log("Support", Oe),
          C.nullOrUndefined(this.media) || !C.element(this.media))
        )
          return void this.debug.error(
            "Setup failed: no suitable element passed"
          );
        if (this.media.plyr)
          return void this.debug.warn("Target already setup");
        if (!this.config.enabled)
          return void this.debug.error("Setup failed: disabled by config");
        if (!Oe.check().api)
          return void this.debug.error("Setup failed: no support");
        const m = this.media.cloneNode(!0);
        (m.autoplay = !1), (this.elements.original = m);
        const _ = this.media.tagName.toLowerCase();
        let E = null,
          N = null;
        switch (_) {
          case "div":
            if (((E = this.media.querySelector("iframe")), C.element(E))) {
              if (
                ((N = Ft(E.getAttribute("src"))),
                (this.provider = (function (B) {
                  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(
                    B
                  )
                    ? Yt.youtube
                    : /^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(
                        B
                      )
                    ? Yt.vimeo
                    : null;
                })(N.toString())),
                (this.elements.container = this.media),
                (this.media = E),
                (this.elements.container.className = ""),
                N.search.length)
              ) {
                const B = ["1", "true"];
                B.includes(N.searchParams.get("autoplay")) &&
                  (this.config.autoplay = !0),
                  B.includes(N.searchParams.get("loop")) &&
                    (this.config.loop.active = !0),
                  this.isYouTube
                    ? ((this.config.playsinline = B.includes(
                        N.searchParams.get("playsinline")
                      )),
                      (this.config.youtube.hl = N.searchParams.get("hl")))
                    : (this.config.playsinline = !0);
              }
            } else (this.provider = this.media.getAttribute(this.config.attributes.embed.provider)), this.media.removeAttribute(this.config.attributes.embed.provider);
            if (
              C.empty(this.provider) ||
              !Object.values(Yt).includes(this.provider)
            )
              return void this.debug.error("Setup failed: Invalid provider");
            this.type = gi;
            break;
          case "video":
          case "audio":
            (this.type = _),
              (this.provider = Yt.html5),
              this.media.hasAttribute("crossorigin") &&
                (this.config.crossorigin = !0),
              this.media.hasAttribute("autoplay") &&
                (this.config.autoplay = !0),
              (this.media.hasAttribute("playsinline") ||
                this.media.hasAttribute("webkit-playsinline")) &&
                (this.config.playsinline = !0),
              this.media.hasAttribute("muted") && (this.config.muted = !0),
              this.media.hasAttribute("loop") && (this.config.loop.active = !0);
            break;
          default:
            return void this.debug.error("Setup failed: unsupported type");
        }
        (this.supported = Oe.check(this.type, this.provider)),
          this.supported.api
            ? ((this.eventListeners = []),
              (this.listeners = new io(this)),
              (this.storage = new Yn(this)),
              (this.media.plyr = this),
              C.element(this.elements.container) ||
                ((this.elements.container = ae("div")),
                vt(this.media, this.elements.container)),
              lt.migrateStyles.call(this),
              lt.addStyleHook.call(this),
              br.setup.call(this),
              this.config.debug &&
                D.call(
                  this,
                  this.elements.container,
                  this.config.events.join(" "),
                  (B) => {
                    this.debug.log(`event: ${B.type}`);
                  }
                ),
              (this.fullscreen = new rn(this)),
              (this.isHTML5 || (this.isEmbed && !this.supported.ui)) &&
                lt.build.call(this),
              this.listeners.container(),
              this.listeners.global(),
              this.config.ads.enabled && (this.ads = new ro(this)),
              this.isHTML5 &&
                this.config.autoplay &&
                this.once("canplay", () => le(this.play())),
              (this.lastSeekTime = 0),
              this.config.previewThumbnails.enabled &&
                (this.previewThumbnails = new Li(this)))
            : this.debug.error("Setup failed: no support");
      }
      get isHTML5() {
        return this.provider === Yt.html5;
      }
      get isEmbed() {
        return this.isYouTube || this.isVimeo;
      }
      get isYouTube() {
        return this.provider === Yt.youtube;
      }
      get isVimeo() {
        return this.provider === Yt.vimeo;
      }
      get isVideo() {
        return this.type === gi;
      }
      get isAudio() {
        return this.type === pr;
      }
      get playing() {
        return !!(this.ready && !this.paused && !this.ended);
      }
      get paused() {
        return !!this.media.paused;
      }
      get stopped() {
        return !!(this.paused && this.currentTime === 0);
      }
      get ended() {
        return !!this.media.ended;
      }
      set currentTime(d) {
        if (!this.duration) return;
        const c = C.number(d) && d > 0;
        (this.media.currentTime = c ? Math.min(d, this.duration) : 0),
          this.debug.log(`Seeking to ${this.currentTime} seconds`);
      }
      get currentTime() {
        return Number(this.media.currentTime);
      }
      get buffered() {
        const { buffered: d } = this.media;
        return C.number(d)
          ? d
          : d && d.length && this.duration > 0
          ? d.end(0) / this.duration
          : 0;
      }
      get seeking() {
        return !!this.media.seeking;
      }
      get duration() {
        const d = parseFloat(this.config.duration),
          c = (this.media || {}).duration,
          m = C.number(c) && c !== 1 / 0 ? c : 0;
        return d || m;
      }
      set volume(d) {
        let c = d;
        C.string(c) && (c = Number(c)),
          C.number(c) || (c = this.storage.get("volume")),
          C.number(c) || ({ volume: c } = this.config),
          c > 1 && (c = 1),
          c < 0 && (c = 0),
          (this.config.volume = c),
          (this.media.volume = c),
          !C.empty(d) && this.muted && c > 0 && (this.muted = !1);
      }
      get volume() {
        return Number(this.media.volume);
      }
      set muted(d) {
        let c = d;
        C.boolean(c) || (c = this.storage.get("muted")),
          C.boolean(c) || (c = this.config.muted),
          (this.config.muted = c),
          (this.media.muted = c);
      }
      get muted() {
        return !!this.media.muted;
      }
      get hasAudio() {
        return (
          !this.isHTML5 ||
          !!this.isAudio ||
          !!this.media.mozHasAudio ||
          !!this.media.webkitAudioDecodedByteCount ||
          !!(this.media.audioTracks && this.media.audioTracks.length)
        );
      }
      set speed(d) {
        let c = null;
        C.number(d) && (c = d),
          C.number(c) || (c = this.storage.get("speed")),
          C.number(c) || (c = this.config.speed.selected);
        const { minimumSpeed: m, maximumSpeed: _ } = this;
        (c = Jn(c, m, _)),
          (this.config.speed.selected = c),
          setTimeout(() => {
            this.media && (this.media.playbackRate = c);
          }, 0);
      }
      get speed() {
        return Number(this.media.playbackRate);
      }
      get minimumSpeed() {
        return this.isYouTube
          ? Math.min(...this.options.speed)
          : this.isVimeo
          ? 0.5
          : 0.0625;
      }
      get maximumSpeed() {
        return this.isYouTube
          ? Math.max(...this.options.speed)
          : this.isVimeo
          ? 2
          : 16;
      }
      set quality(d) {
        const c = this.config.quality,
          m = this.options.quality;
        if (!m.length) return;
        let _ = [
            !C.empty(d) && Number(d),
            this.storage.get("quality"),
            c.selected,
            c.default,
          ].find(C.number),
          E = !0;
        if (!m.includes(_)) {
          const N = ke(m, _);
          this.debug.warn(
            `Unsupported quality option: ${_}, using ${N} instead`
          ),
            (_ = N),
            (E = !1);
        }
        (c.selected = _),
          (this.media.quality = _),
          E && this.storage.set({ quality: _ });
      }
      get quality() {
        return this.media.quality;
      }
      set loop(d) {
        const c = C.boolean(d) ? d : this.config.loop.active;
        (this.config.loop.active = c), (this.media.loop = c);
      }
      get loop() {
        return !!this.media.loop;
      }
      set source(d) {
        ji.change.call(this, d);
      }
      get source() {
        return this.media.currentSrc;
      }
      get download() {
        const { download: d } = this.config.urls;
        return C.url(d) ? d : this.source;
      }
      set download(d) {
        C.url(d) &&
          ((this.config.urls.download = d), ce.setDownloadUrl.call(this));
      }
      set poster(d) {
        this.isVideo
          ? lt.setPoster.call(this, d, !1).catch(() => {})
          : this.debug.warn("Poster can only be set for video");
      }
      get poster() {
        return this.isVideo
          ? this.media.getAttribute("poster") ||
              this.media.getAttribute("data-poster")
          : null;
      }
      get ratio() {
        if (!this.isVideo) return null;
        const d = Ie(ot.call(this));
        return C.array(d) ? d.join(":") : d;
      }
      set ratio(d) {
        this.isVideo
          ? C.string(d) && re(d)
            ? ((this.config.ratio = Ie(d)), Je.call(this))
            : this.debug.error(`Invalid aspect ratio specified (${d})`)
          : this.debug.warn("Aspect ratio can only be set for video");
      }
      set autoplay(d) {
        this.config.autoplay = C.boolean(d) ? d : this.config.autoplay;
      }
      get autoplay() {
        return !!this.config.autoplay;
      }
      toggleCaptions(d) {
        nt.toggle.call(this, d, !1);
      }
      set currentTrack(d) {
        nt.set.call(this, d, !1), nt.setup.call(this);
      }
      get currentTrack() {
        const { toggled: d, currentTrack: c } = this.captions;
        return d ? c : -1;
      }
      set language(d) {
        nt.setLanguage.call(this, d, !1);
      }
      get language() {
        return (nt.getCurrentTrack.call(this) || {}).language;
      }
      set pip(d) {
        if (!Oe.pip) return;
        const c = C.boolean(d) ? d : !this.pip;
        C.function(this.media.webkitSetPresentationMode) &&
          this.media.webkitSetPresentationMode(c ? dr : Qn),
          C.function(this.media.requestPictureInPicture) &&
            (!this.pip && c
              ? this.media.requestPictureInPicture()
              : this.pip && !c && document.exitPictureInPicture());
      }
      get pip() {
        return Oe.pip
          ? C.empty(this.media.webkitPresentationMode)
            ? this.media === document.pictureInPictureElement
            : this.media.webkitPresentationMode === dr
          : null;
      }
      setPreviewThumbnails(d) {
        this.previewThumbnails &&
          this.previewThumbnails.loaded &&
          (this.previewThumbnails.destroy(), (this.previewThumbnails = null)),
          Object.assign(this.config.previewThumbnails, d),
          this.config.previewThumbnails.enabled &&
            (this.previewThumbnails = new Li(this));
      }
      static supported(d, c) {
        return Oe.check(d, c);
      }
      static loadSprite(d, c) {
        return Jr(d, c);
      }
      static setup(d, c = {}) {
        let m = null;
        return (
          C.string(d)
            ? (m = Array.from(document.querySelectorAll(d)))
            : C.nodeList(d)
            ? (m = Array.from(d))
            : C.array(d) && (m = d.filter(C.element)),
          C.empty(m) ? null : m.map((_) => new yi(_, c))
        );
      }
    }
    var Hi;
    return (yi.defaults = ((Hi = hr), JSON.parse(JSON.stringify(Hi)))), yi;
  });
var Ja = { exports: {} },
  Df = function (t, n) {
    return function () {
      for (var o = new Array(arguments.length), l = 0; l < o.length; l++)
        o[l] = arguments[l];
      return t.apply(n, o);
    };
  },
  jb = Df,
  Ga = Object.prototype.toString,
  Xa = (function (e) {
    return function (t) {
      var n = Ga.call(t);
      return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
    };
  })(Object.create(null));
function Ni(e) {
  return (
    (e = e.toLowerCase()),
    function (n) {
      return Xa(n) === e;
    }
  );
}
function Za(e) {
  return Array.isArray(e);
}
function Hs(e) {
  return typeof e > "u";
}
function Hb(e) {
  return (
    e !== null &&
    !Hs(e) &&
    e.constructor !== null &&
    !Hs(e.constructor) &&
    typeof e.constructor.isBuffer == "function" &&
    e.constructor.isBuffer(e)
  );
}
var Bf = Ni("ArrayBuffer");
function Db(e) {
  var t;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && Bf(e.buffer)),
    t
  );
}
function Bb(e) {
  return typeof e == "string";
}
function Fb(e) {
  return typeof e == "number";
}
function Ff(e) {
  return e !== null && typeof e == "object";
}
function vs(e) {
  if (Xa(e) !== "object") return !1;
  var t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype;
}
var $b = Ni("Date"),
  qb = Ni("File"),
  Ub = Ni("Blob"),
  Wb = Ni("FileList");
function el(e) {
  return Ga.call(e) === "[object Function]";
}
function zb(e) {
  return Ff(e) && el(e.pipe);
}
function Vb(e) {
  var t = "[object FormData]";
  return (
    e &&
    ((typeof FormData == "function" && e instanceof FormData) ||
      Ga.call(e) === t ||
      (el(e.toString) && e.toString() === t))
  );
}
var Yb = Ni("URLSearchParams");
function Kb(e) {
  return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
}
function Qb() {
  return typeof navigator < "u" &&
    (navigator.product === "ReactNative" ||
      navigator.product === "NativeScript" ||
      navigator.product === "NS")
    ? !1
    : typeof window < "u" && typeof document < "u";
}
function tl(e, t) {
  if (!(e === null || typeof e > "u"))
    if ((typeof e != "object" && (e = [e]), Za(e)))
      for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e);
    else
      for (var o in e)
        Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e);
}
function ba() {
  var e = {};
  function t(o, l) {
    vs(e[l]) && vs(o)
      ? (e[l] = ba(e[l], o))
      : vs(o)
      ? (e[l] = ba({}, o))
      : Za(o)
      ? (e[l] = o.slice())
      : (e[l] = o);
  }
  for (var n = 0, r = arguments.length; n < r; n++) tl(arguments[n], t);
  return e;
}
function Jb(e, t, n) {
  return (
    tl(t, function (o, l) {
      n && typeof o == "function" ? (e[l] = jb(o, n)) : (e[l] = o);
    }),
    e
  );
}
function Gb(e) {
  return e.charCodeAt(0) === 65279 && (e = e.slice(1)), e;
}
function Xb(e, t, n, r) {
  (e.prototype = Object.create(t.prototype, r)),
    (e.prototype.constructor = e),
    n && Object.assign(e.prototype, n);
}
function Zb(e, t, n) {
  var r,
    o,
    l,
    p = {};
  t = t || {};
  do {
    for (r = Object.getOwnPropertyNames(e), o = r.length; o-- > 0; )
      (l = r[o]), p[l] || ((t[l] = e[l]), (p[l] = !0));
    e = Object.getPrototypeOf(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}
function ev(e, t, n) {
  (e = String(e)),
    (n === void 0 || n > e.length) && (n = e.length),
    (n -= t.length);
  var r = e.indexOf(t, n);
  return r !== -1 && r === n;
}
function tv(e) {
  if (!e) return null;
  var t = e.length;
  if (Hs(t)) return null;
  for (var n = new Array(t); t-- > 0; ) n[t] = e[t];
  return n;
}
var nv = (function (e) {
    return function (t) {
      return e && t instanceof e;
    };
  })(typeof Uint8Array < "u" && Object.getPrototypeOf(Uint8Array)),
  qt = {
    isArray: Za,
    isArrayBuffer: Bf,
    isBuffer: Hb,
    isFormData: Vb,
    isArrayBufferView: Db,
    isString: Bb,
    isNumber: Fb,
    isObject: Ff,
    isPlainObject: vs,
    isUndefined: Hs,
    isDate: $b,
    isFile: qb,
    isBlob: Ub,
    isFunction: el,
    isStream: zb,
    isURLSearchParams: Yb,
    isStandardBrowserEnv: Qb,
    forEach: tl,
    merge: ba,
    extend: Jb,
    trim: Kb,
    stripBOM: Gb,
    inherits: Xb,
    toFlatObject: Zb,
    kindOf: Xa,
    kindOfTest: Ni,
    endsWith: ev,
    toArray: tv,
    isTypedArray: nv,
    isFileList: Wb,
  },
  qi = qt;
function Ic(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
var $f = function (t, n, r) {
    if (!n) return t;
    var o;
    if (r) o = r(n);
    else if (qi.isURLSearchParams(n)) o = n.toString();
    else {
      var l = [];
      qi.forEach(n, function (y, T) {
        y === null ||
          typeof y > "u" ||
          (qi.isArray(y) ? (T = T + "[]") : (y = [y]),
          qi.forEach(y, function (A) {
            qi.isDate(A)
              ? (A = A.toISOString())
              : qi.isObject(A) && (A = JSON.stringify(A)),
              l.push(Ic(T) + "=" + Ic(A));
          }));
      }),
        (o = l.join("&"));
    }
    if (o) {
      var p = t.indexOf("#");
      p !== -1 && (t = t.slice(0, p)),
        (t += (t.indexOf("?") === -1 ? "?" : "&") + o);
    }
    return t;
  },
  iv = qt;
function Xs() {
  this.handlers = [];
}
Xs.prototype.use = function (t, n, r) {
  return (
    this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null,
    }),
    this.handlers.length - 1
  );
};
Xs.prototype.eject = function (t) {
  this.handlers[t] && (this.handlers[t] = null);
};
Xs.prototype.forEach = function (t) {
  iv.forEach(this.handlers, function (r) {
    r !== null && t(r);
  });
};
var rv = Xs,
  sv = qt,
  ov = function (t, n) {
    sv.forEach(t, function (o, l) {
      l !== n &&
        l.toUpperCase() === n.toUpperCase() &&
        ((t[n] = o), delete t[l]);
    });
  },
  qf = qt;
function sr(e, t, n, r, o) {
  Error.call(this),
    (this.message = e),
    (this.name = "AxiosError"),
    t && (this.code = t),
    n && (this.config = n),
    r && (this.request = r),
    o && (this.response = o);
}
qf.inherits(sr, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: this.config,
      code: this.code,
      status:
        this.response && this.response.status ? this.response.status : null,
    };
  },
});
var Uf = sr.prototype,
  Wf = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
].forEach(function (e) {
  Wf[e] = { value: e };
});
Object.defineProperties(sr, Wf);
Object.defineProperty(Uf, "isAxiosError", { value: !0 });
sr.from = function (e, t, n, r, o, l) {
  var p = Object.create(Uf);
  return (
    qf.toFlatObject(e, p, function (y) {
      return y !== Error.prototype;
    }),
    sr.call(p, e.message, t, n, r, o),
    (p.name = e.name),
    l && Object.assign(p, l),
    p
  );
};
var fr = sr,
  zf = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  xn = qt;
function av(e, t) {
  t = t || new FormData();
  var n = [];
  function r(l) {
    return l === null
      ? ""
      : xn.isDate(l)
      ? l.toISOString()
      : xn.isArrayBuffer(l) || xn.isTypedArray(l)
      ? typeof Blob == "function"
        ? new Blob([l])
        : Buffer.from(l)
      : l;
  }
  function o(l, p) {
    if (xn.isPlainObject(l) || xn.isArray(l)) {
      if (n.indexOf(l) !== -1)
        throw Error("Circular reference detected in " + p);
      n.push(l),
        xn.forEach(l, function (y, T) {
          if (!xn.isUndefined(y)) {
            var w = p ? p + "." + T : T,
              A;
            if (y && !p && typeof y == "object") {
              if (xn.endsWith(T, "{}")) y = JSON.stringify(y);
              else if (xn.endsWith(T, "[]") && (A = xn.toArray(y))) {
                A.forEach(function (P) {
                  !xn.isUndefined(P) && t.append(w, r(P));
                });
                return;
              }
            }
            o(y, w);
          }
        }),
        n.pop();
    } else t.append(p, r(l));
  }
  return o(e), t;
}
var Vf = av,
  No,
  Nc;
function lv() {
  if (Nc) return No;
  Nc = 1;
  var e = fr;
  return (
    (No = function (n, r, o) {
      var l = o.config.validateStatus;
      !o.status || !l || l(o.status)
        ? n(o)
        : r(
            new e(
              "Request failed with status code " + o.status,
              [e.ERR_BAD_REQUEST, e.ERR_BAD_RESPONSE][
                Math.floor(o.status / 100) - 4
              ],
              o.config,
              o.request,
              o
            )
          );
    }),
    No
  );
}
var Oo, Oc;
function cv() {
  if (Oc) return Oo;
  Oc = 1;
  var e = qt;
  return (
    (Oo = e.isStandardBrowserEnv()
      ? (function () {
          return {
            write: function (r, o, l, p, g, y) {
              var T = [];
              T.push(r + "=" + encodeURIComponent(o)),
                e.isNumber(l) && T.push("expires=" + new Date(l).toGMTString()),
                e.isString(p) && T.push("path=" + p),
                e.isString(g) && T.push("domain=" + g),
                y === !0 && T.push("secure"),
                (document.cookie = T.join("; "));
            },
            read: function (r) {
              var o = document.cookie.match(
                new RegExp("(^|;\\s*)(" + r + ")=([^;]*)")
              );
              return o ? decodeURIComponent(o[3]) : null;
            },
            remove: function (r) {
              this.write(r, "", Date.now() - 864e5);
            },
          };
        })()
      : (function () {
          return {
            write: function () {},
            read: function () {
              return null;
            },
            remove: function () {},
          };
        })()),
    Oo
  );
}
var uv = function (t) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
  },
  fv = function (t, n) {
    return n ? t.replace(/\/+$/, "") + "/" + n.replace(/^\/+/, "") : t;
  },
  hv = uv,
  dv = fv,
  Yf = function (t, n) {
    return t && !hv(n) ? dv(t, n) : n;
  },
  Mo,
  Mc;
function pv() {
  if (Mc) return Mo;
  Mc = 1;
  var e = qt,
    t = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent",
    ];
  return (
    (Mo = function (r) {
      var o = {},
        l,
        p,
        g;
      return (
        r &&
          e.forEach(
            r.split(`
`),
            function (T) {
              if (
                ((g = T.indexOf(":")),
                (l = e.trim(T.substr(0, g)).toLowerCase()),
                (p = e.trim(T.substr(g + 1))),
                l)
              ) {
                if (o[l] && t.indexOf(l) >= 0) return;
                l === "set-cookie"
                  ? (o[l] = (o[l] ? o[l] : []).concat([p]))
                  : (o[l] = o[l] ? o[l] + ", " + p : p);
              }
            }
          ),
        o
      );
    }),
    Mo
  );
}
var Lo, Lc;
function gv() {
  if (Lc) return Lo;
  Lc = 1;
  var e = qt;
  return (
    (Lo = e.isStandardBrowserEnv()
      ? (function () {
          var n = /(msie|trident)/i.test(navigator.userAgent),
            r = document.createElement("a"),
            o;
          function l(p) {
            var g = p;
            return (
              n && (r.setAttribute("href", g), (g = r.href)),
              r.setAttribute("href", g),
              {
                href: r.href,
                protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
                host: r.host,
                search: r.search ? r.search.replace(/^\?/, "") : "",
                hash: r.hash ? r.hash.replace(/^#/, "") : "",
                hostname: r.hostname,
                port: r.port,
                pathname:
                  r.pathname.charAt(0) === "/" ? r.pathname : "/" + r.pathname,
              }
            );
          }
          return (
            (o = l(window.location.href)),
            function (g) {
              var y = e.isString(g) ? l(g) : g;
              return y.protocol === o.protocol && y.host === o.host;
            }
          );
        })()
      : (function () {
          return function () {
            return !0;
          };
        })()),
    Lo
  );
}
var jo, jc;
function Zs() {
  if (jc) return jo;
  jc = 1;
  var e = fr,
    t = qt;
  function n(r) {
    e.call(this, r ?? "canceled", e.ERR_CANCELED),
      (this.name = "CanceledError");
  }
  return t.inherits(n, e, { __CANCEL__: !0 }), (jo = n), jo;
}
var Ho, Hc;
function mv() {
  return (
    Hc ||
      ((Hc = 1),
      (Ho = function (t) {
        var n = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
        return (n && n[1]) || "";
      })),
    Ho
  );
}
var Do, Dc;
function Bc() {
  if (Dc) return Do;
  Dc = 1;
  var e = qt,
    t = lv(),
    n = cv(),
    r = $f,
    o = Yf,
    l = pv(),
    p = gv(),
    g = zf,
    y = fr,
    T = Zs(),
    w = mv();
  return (
    (Do = function (P) {
      return new Promise(function ($, K) {
        var de = P.data,
          L = P.headers,
          U = P.responseType,
          ye;
        function J() {
          P.cancelToken && P.cancelToken.unsubscribe(ye),
            P.signal && P.signal.removeEventListener("abort", ye);
        }
        e.isFormData(de) &&
          e.isStandardBrowserEnv() &&
          delete L["Content-Type"];
        var X = new XMLHttpRequest();
        if (P.auth) {
          var Se = P.auth.username || "",
            f = P.auth.password
              ? unescape(encodeURIComponent(P.auth.password))
              : "";
          L.Authorization = "Basic " + btoa(Se + ":" + f);
        }
        var ve = o(P.baseURL, P.url);
        X.open(P.method.toUpperCase(), r(ve, P.params, P.paramsSerializer), !0),
          (X.timeout = P.timeout);
        function C() {
          if (X) {
            var Le =
                "getAllResponseHeaders" in X
                  ? l(X.getAllResponseHeaders())
                  : null,
              Ee =
                !U || U === "text" || U === "json"
                  ? X.responseText
                  : X.response,
              ue = {
                data: Ee,
                status: X.status,
                statusText: X.statusText,
                headers: Le,
                config: P,
                request: X,
              };
            t(
              function (ze) {
                $(ze), J();
              },
              function (ze) {
                K(ze), J();
              },
              ue
            ),
              (X = null);
          }
        }
        if (
          ("onloadend" in X
            ? (X.onloadend = C)
            : (X.onreadystatechange = function () {
                !X ||
                  X.readyState !== 4 ||
                  (X.status === 0 &&
                    !(X.responseURL && X.responseURL.indexOf("file:") === 0)) ||
                  setTimeout(C);
              }),
          (X.onabort = function () {
            X &&
              (K(new y("Request aborted", y.ECONNABORTED, P, X)), (X = null));
          }),
          (X.onerror = function () {
            K(new y("Network Error", y.ERR_NETWORK, P, X, X)), (X = null);
          }),
          (X.ontimeout = function () {
            var Ee = P.timeout
                ? "timeout of " + P.timeout + "ms exceeded"
                : "timeout exceeded",
              ue = P.transitional || g;
            P.timeoutErrorMessage && (Ee = P.timeoutErrorMessage),
              K(
                new y(
                  Ee,
                  ue.clarifyTimeoutError ? y.ETIMEDOUT : y.ECONNABORTED,
                  P,
                  X
                )
              ),
              (X = null);
          }),
          e.isStandardBrowserEnv())
        ) {
          var Ue =
            (P.withCredentials || p(ve)) && P.xsrfCookieName
              ? n.read(P.xsrfCookieName)
              : void 0;
          Ue && (L[P.xsrfHeaderName] = Ue);
        }
        "setRequestHeader" in X &&
          e.forEach(L, function (Ee, ue) {
            typeof de > "u" && ue.toLowerCase() === "content-type"
              ? delete L[ue]
              : X.setRequestHeader(ue, Ee);
          }),
          e.isUndefined(P.withCredentials) ||
            (X.withCredentials = !!P.withCredentials),
          U && U !== "json" && (X.responseType = P.responseType),
          typeof P.onDownloadProgress == "function" &&
            X.addEventListener("progress", P.onDownloadProgress),
          typeof P.onUploadProgress == "function" &&
            X.upload &&
            X.upload.addEventListener("progress", P.onUploadProgress),
          (P.cancelToken || P.signal) &&
            ((ye = function (Le) {
              X &&
                (K(!Le || (Le && Le.type) ? new T() : Le),
                X.abort(),
                (X = null));
            }),
            P.cancelToken && P.cancelToken.subscribe(ye),
            P.signal &&
              (P.signal.aborted
                ? ye()
                : P.signal.addEventListener("abort", ye))),
          de || (de = null);
        var We = w(ve);
        if (We && ["http", "https", "file"].indexOf(We) === -1) {
          K(new y("Unsupported protocol " + We + ":", y.ERR_BAD_REQUEST, P));
          return;
        }
        X.send(de);
      });
    }),
    Do
  );
}
var Bo, Fc;
function yv() {
  return Fc || ((Fc = 1), (Bo = null)), Bo;
}
var Ht = qt,
  $c = ov,
  qc = fr,
  bv = zf,
  vv = Vf,
  wv = { "Content-Type": "application/x-www-form-urlencoded" };
function Uc(e, t) {
  !Ht.isUndefined(e) &&
    Ht.isUndefined(e["Content-Type"]) &&
    (e["Content-Type"] = t);
}
function xv() {
  var e;
  return (
    (typeof XMLHttpRequest < "u" ||
      (typeof process < "u" &&
        Object.prototype.toString.call(process) === "[object process]")) &&
      (e = Bc()),
    e
  );
}
function Tv(e, t, n) {
  if (Ht.isString(e))
    try {
      return (t || JSON.parse)(e), Ht.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError") throw r;
    }
  return (n || JSON.stringify)(e);
}
var eo = {
  transitional: bv,
  adapter: xv(),
  transformRequest: [
    function (t, n) {
      if (
        ($c(n, "Accept"),
        $c(n, "Content-Type"),
        Ht.isFormData(t) ||
          Ht.isArrayBuffer(t) ||
          Ht.isBuffer(t) ||
          Ht.isStream(t) ||
          Ht.isFile(t) ||
          Ht.isBlob(t))
      )
        return t;
      if (Ht.isArrayBufferView(t)) return t.buffer;
      if (Ht.isURLSearchParams(t))
        return (
          Uc(n, "application/x-www-form-urlencoded;charset=utf-8"), t.toString()
        );
      var r = Ht.isObject(t),
        o = n && n["Content-Type"],
        l;
      if ((l = Ht.isFileList(t)) || (r && o === "multipart/form-data")) {
        var p = this.env && this.env.FormData;
        return vv(l ? { "files[]": t } : t, p && new p());
      } else if (r || o === "application/json")
        return Uc(n, "application/json"), Tv(t);
      return t;
    },
  ],
  transformResponse: [
    function (t) {
      var n = this.transitional || eo.transitional,
        r = n && n.silentJSONParsing,
        o = n && n.forcedJSONParsing,
        l = !r && this.responseType === "json";
      if (l || (o && Ht.isString(t) && t.length))
        try {
          return JSON.parse(t);
        } catch (p) {
          if (l)
            throw p.name === "SyntaxError"
              ? qc.from(p, qc.ERR_BAD_RESPONSE, this, null, this.response)
              : p;
        }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: yv() },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: { common: { Accept: "application/json, text/plain, */*" } },
};
Ht.forEach(["delete", "get", "head"], function (t) {
  eo.headers[t] = {};
});
Ht.forEach(["post", "put", "patch"], function (t) {
  eo.headers[t] = Ht.merge(wv);
});
var nl = eo,
  _v = qt,
  Ev = nl,
  Cv = function (t, n, r) {
    var o = this || Ev;
    return (
      _v.forEach(r, function (p) {
        t = p.call(o, t, n);
      }),
      t
    );
  },
  Fo,
  Wc;
function Kf() {
  return (
    Wc ||
      ((Wc = 1),
      (Fo = function (t) {
        return !!(t && t.__CANCEL__);
      })),
    Fo
  );
}
var zc = qt,
  $o = Cv,
  Av = Kf(),
  kv = nl,
  Sv = Zs();
function qo(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new Sv();
}
var Pv = function (t) {
    qo(t),
      (t.headers = t.headers || {}),
      (t.data = $o.call(t, t.data, t.headers, t.transformRequest)),
      (t.headers = zc.merge(
        t.headers.common || {},
        t.headers[t.method] || {},
        t.headers
      )),
      zc.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        function (o) {
          delete t.headers[o];
        }
      );
    var n = t.adapter || kv.adapter;
    return n(t).then(
      function (o) {
        return (
          qo(t),
          (o.data = $o.call(t, o.data, o.headers, t.transformResponse)),
          o
        );
      },
      function (o) {
        return (
          Av(o) ||
            (qo(t),
            o &&
              o.response &&
              (o.response.data = $o.call(
                t,
                o.response.data,
                o.response.headers,
                t.transformResponse
              ))),
          Promise.reject(o)
        );
      }
    );
  },
  on = qt,
  Qf = function (t, n) {
    n = n || {};
    var r = {};
    function o(w, A) {
      return on.isPlainObject(w) && on.isPlainObject(A)
        ? on.merge(w, A)
        : on.isPlainObject(A)
        ? on.merge({}, A)
        : on.isArray(A)
        ? A.slice()
        : A;
    }
    function l(w) {
      if (on.isUndefined(n[w])) {
        if (!on.isUndefined(t[w])) return o(void 0, t[w]);
      } else return o(t[w], n[w]);
    }
    function p(w) {
      if (!on.isUndefined(n[w])) return o(void 0, n[w]);
    }
    function g(w) {
      if (on.isUndefined(n[w])) {
        if (!on.isUndefined(t[w])) return o(void 0, t[w]);
      } else return o(void 0, n[w]);
    }
    function y(w) {
      if (w in n) return o(t[w], n[w]);
      if (w in t) return o(void 0, t[w]);
    }
    var T = {
      url: p,
      method: p,
      data: p,
      baseURL: g,
      transformRequest: g,
      transformResponse: g,
      paramsSerializer: g,
      timeout: g,
      timeoutMessage: g,
      withCredentials: g,
      adapter: g,
      responseType: g,
      xsrfCookieName: g,
      xsrfHeaderName: g,
      onUploadProgress: g,
      onDownloadProgress: g,
      decompress: g,
      maxContentLength: g,
      maxBodyLength: g,
      beforeRedirect: g,
      transport: g,
      httpAgent: g,
      httpsAgent: g,
      cancelToken: g,
      socketPath: g,
      responseEncoding: g,
      validateStatus: y,
    };
    return (
      on.forEach(Object.keys(t).concat(Object.keys(n)), function (A) {
        var P = T[A] || l,
          H = P(A);
        (on.isUndefined(H) && P !== y) || (r[A] = H);
      }),
      r
    );
  },
  Uo,
  Vc;
function Jf() {
  return Vc || ((Vc = 1), (Uo = { version: "0.27.2" })), Uo;
}
var Rv = Jf().version,
  si = fr,
  il = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  function (e, t) {
    il[e] = function (r) {
      return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  }
);
var Yc = {};
il.transitional = function (t, n, r) {
  function o(l, p) {
    return (
      "[Axios v" +
      Rv +
      "] Transitional option '" +
      l +
      "'" +
      p +
      (r ? ". " + r : "")
    );
  }
  return function (l, p, g) {
    if (t === !1)
      throw new si(
        o(p, " has been removed" + (n ? " in " + n : "")),
        si.ERR_DEPRECATED
      );
    return (
      n &&
        !Yc[p] &&
        ((Yc[p] = !0),
        console.warn(
          o(
            p,
            " has been deprecated since v" +
              n +
              " and will be removed in the near future"
          )
        )),
      t ? t(l, p, g) : !0
    );
  };
};
function Iv(e, t, n) {
  if (typeof e != "object")
    throw new si("options must be an object", si.ERR_BAD_OPTION_VALUE);
  for (var r = Object.keys(e), o = r.length; o-- > 0; ) {
    var l = r[o],
      p = t[l];
    if (p) {
      var g = e[l],
        y = g === void 0 || p(g, l, e);
      if (y !== !0)
        throw new si("option " + l + " must be " + y, si.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0) throw new si("Unknown option " + l, si.ERR_BAD_OPTION);
  }
}
var Nv = { assertOptions: Iv, validators: il },
  Gf = qt,
  Ov = $f,
  Kc = rv,
  Qc = Pv,
  to = Qf,
  Mv = Yf,
  Xf = Nv,
  Ui = Xf.validators;
function or(e) {
  (this.defaults = e),
    (this.interceptors = { request: new Kc(), response: new Kc() });
}
or.prototype.request = function (t, n) {
  typeof t == "string" ? ((n = n || {}), (n.url = t)) : (n = t || {}),
    (n = to(this.defaults, n)),
    n.method
      ? (n.method = n.method.toLowerCase())
      : this.defaults.method
      ? (n.method = this.defaults.method.toLowerCase())
      : (n.method = "get");
  var r = n.transitional;
  r !== void 0 &&
    Xf.assertOptions(
      r,
      {
        silentJSONParsing: Ui.transitional(Ui.boolean),
        forcedJSONParsing: Ui.transitional(Ui.boolean),
        clarifyTimeoutError: Ui.transitional(Ui.boolean),
      },
      !1
    );
  var o = [],
    l = !0;
  this.interceptors.request.forEach(function (H) {
    (typeof H.runWhen == "function" && H.runWhen(n) === !1) ||
      ((l = l && H.synchronous), o.unshift(H.fulfilled, H.rejected));
  });
  var p = [];
  this.interceptors.response.forEach(function (H) {
    p.push(H.fulfilled, H.rejected);
  });
  var g;
  if (!l) {
    var y = [Qc, void 0];
    for (
      Array.prototype.unshift.apply(y, o),
        y = y.concat(p),
        g = Promise.resolve(n);
      y.length;

    )
      g = g.then(y.shift(), y.shift());
    return g;
  }
  for (var T = n; o.length; ) {
    var w = o.shift(),
      A = o.shift();
    try {
      T = w(T);
    } catch (P) {
      A(P);
      break;
    }
  }
  try {
    g = Qc(T);
  } catch (P) {
    return Promise.reject(P);
  }
  for (; p.length; ) g = g.then(p.shift(), p.shift());
  return g;
};
or.prototype.getUri = function (t) {
  t = to(this.defaults, t);
  var n = Mv(t.baseURL, t.url);
  return Ov(n, t.params, t.paramsSerializer);
};
Gf.forEach(["delete", "get", "head", "options"], function (t) {
  or.prototype[t] = function (n, r) {
    return this.request(
      to(r || {}, { method: t, url: n, data: (r || {}).data })
    );
  };
});
Gf.forEach(["post", "put", "patch"], function (t) {
  function n(r) {
    return function (l, p, g) {
      return this.request(
        to(g || {}, {
          method: t,
          headers: r ? { "Content-Type": "multipart/form-data" } : {},
          url: l,
          data: p,
        })
      );
    };
  }
  (or.prototype[t] = n()), (or.prototype[t + "Form"] = n(!0));
});
var Lv = or,
  Wo,
  Jc;
function jv() {
  if (Jc) return Wo;
  Jc = 1;
  var e = Zs();
  function t(n) {
    if (typeof n != "function")
      throw new TypeError("executor must be a function.");
    var r;
    this.promise = new Promise(function (p) {
      r = p;
    });
    var o = this;
    this.promise.then(function (l) {
      if (o._listeners) {
        var p,
          g = o._listeners.length;
        for (p = 0; p < g; p++) o._listeners[p](l);
        o._listeners = null;
      }
    }),
      (this.promise.then = function (l) {
        var p,
          g = new Promise(function (y) {
            o.subscribe(y), (p = y);
          }).then(l);
        return (
          (g.cancel = function () {
            o.unsubscribe(p);
          }),
          g
        );
      }),
      n(function (p) {
        o.reason || ((o.reason = new e(p)), r(o.reason));
      });
  }
  return (
    (t.prototype.throwIfRequested = function () {
      if (this.reason) throw this.reason;
    }),
    (t.prototype.subscribe = function (r) {
      if (this.reason) {
        r(this.reason);
        return;
      }
      this._listeners ? this._listeners.push(r) : (this._listeners = [r]);
    }),
    (t.prototype.unsubscribe = function (r) {
      if (this._listeners) {
        var o = this._listeners.indexOf(r);
        o !== -1 && this._listeners.splice(o, 1);
      }
    }),
    (t.source = function () {
      var r,
        o = new t(function (p) {
          r = p;
        });
      return { token: o, cancel: r };
    }),
    (Wo = t),
    Wo
  );
}
var zo, Gc;
function Hv() {
  return (
    Gc ||
      ((Gc = 1),
      (zo = function (t) {
        return function (r) {
          return t.apply(null, r);
        };
      })),
    zo
  );
}
var Vo, Xc;
function Dv() {
  if (Xc) return Vo;
  Xc = 1;
  var e = qt;
  return (
    (Vo = function (n) {
      return e.isObject(n) && n.isAxiosError === !0;
    }),
    Vo
  );
}
var Zc = qt,
  Bv = Df,
  ws = Lv,
  Fv = Qf,
  $v = nl;
function Zf(e) {
  var t = new ws(e),
    n = Bv(ws.prototype.request, t);
  return (
    Zc.extend(n, ws.prototype, t),
    Zc.extend(n, t),
    (n.create = function (o) {
      return Zf(Fv(e, o));
    }),
    n
  );
}
var tn = Zf($v);
tn.Axios = ws;
tn.CanceledError = Zs();
tn.CancelToken = jv();
tn.isCancel = Kf();
tn.VERSION = Jf().version;
tn.toFormData = Vf;
tn.AxiosError = fr;
tn.Cancel = tn.CanceledError;
tn.all = function (t) {
  return Promise.all(t);
};
tn.spread = Hv();
tn.isAxiosError = Dv();
Ja.exports = tn;
Ja.exports.default = tn;
var qv = Ja.exports,
  Uv = qv;
const Wv = Mb(Uv),
  eu = (e, t) =>
    Wv.get(e, { ...t }).catch((n) => {
      if (
        n &&
        n.response &&
        (Number(n.response.status) === 401 || Number(n.response.status) === 403)
      )
        localStorage.removeItem("user"), (window.location.href = "/login");
      else return n;
    });
class zv {
  constructor() {
    vo(this, "getAllCategory", async (t) => {
      let n = {
          headers: {
            "X-Authorization":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTUyMDExMzQsImRhdGEiOnsiX2lkIjoiNjMyMTJkMDIwNzIxNmZjOTdhZWYyZGQyIiwia2V5IjoiOWE1M2VjNmFmOTNhY2ZmY2M2NzY2YzUyYzk1MzQ3YzAiLCJzaWduYXR1cmUiOiJkZjI0OWJmOGFkZDI4YTljMmFjN2FkZTJhOGQ5ZTk3MCIsInNlc3Npb24iOiI2MzI5ODNlZTdmNDM0NjE0MTkyMmQzOGUifSwiaWF0IjoxNjYzNjY1MTM0fQ.6EQIem9T7epllpKEC6qQEV-Ya0Kwj5cOjhcg2vzSx0U",
          },
        },
        o = `https://education-api-dev.iceo.tech/api/post/list-category?${new URLSearchParams(
          t
        ).toString()}`;
      return await eu(o, n);
    });
    vo(this, "getCategoryBySlug", async (t) => {
      if (!t) return null;
      let n = {
          headers: {
            "X-Authorization":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTUyMDExMzQsImRhdGEiOnsiX2lkIjoiNjMyMTJkMDIwNzIxNmZjOTdhZWYyZGQyIiwia2V5IjoiOWE1M2VjNmFmOTNhY2ZmY2M2NzY2YzUyYzk1MzQ3YzAiLCJzaWduYXR1cmUiOiJkZjI0OWJmOGFkZDI4YTljMmFjN2FkZTJhOGQ5ZTk3MCIsInNlc3Npb24iOiI2MzI5ODNlZTdmNDM0NjE0MTkyMmQzOGUifSwiaWF0IjoxNjYzNjY1MTM0fQ.6EQIem9T7epllpKEC6qQEV-Ya0Kwj5cOjhcg2vzSx0U",
          },
        },
        r = `https://devapi2.lgbt.appuni.io/api/category/detail-category/${t}`;
      return await eu(r, n);
    });
  }
}
const Vv = new zv(),
  eh = "" + new URL("logo.80ab4cb5.png", import.meta.url).href,
  tu = "" + new URL("5.1e381505.png", import.meta.url).href,
  Yv = "" + new URL("2.d1b6dc18.png", import.meta.url).href,
  Kv = "" + new URL("12.7283f609.png", import.meta.url).href,
  Qv = "" + new URL("8.bbd66b6f.png", import.meta.url).href,
  Jv = "" + new URL("7.1b5cfdfa.png", import.meta.url).href,
  Gv = "" + new URL("15.1a873dfa.png", import.meta.url).href,
  Xv = "" + new URL("14.654e651f.png", import.meta.url).href,
  Zv = "" + new URL("9.800ba284.png", import.meta.url).href,
  e0 = "" + new URL("13.1b1f97cd.png", import.meta.url).href,
  th = "" + new URL("10.57a70ab6.png", import.meta.url).href,
  t0 = "" + new URL("20.e6d045ac.png", import.meta.url).href,
  n0 = "" + new URL("4.73689d1c.png", import.meta.url).href,
  i0 = "" + new URL("3.02a7b930.png", import.meta.url).href,
  r0 = "" + new URL("1.c2dfebf1.png", import.meta.url).href,
  s0 =
    "" +
    new URL("maauxgiao diện theo yêu càu (2).97b6809f.png", import.meta.url)
      .href,
  o0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEg2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDIzLTEwLTIzPC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPmI2NTczYjgzLTg2Y2YtNDZmZS1hYzY4LTVmZWU4ZmVjY2VmMTwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5pY29uIHdlYiAgLSBhZmlsaWF0ZTwvcmRmOmxpPgogICA8L3JkZjpBbHQ+CiAgPC9kYzp0aXRsZT4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6cGRmPSdodHRwOi8vbnMuYWRvYmUuY29tL3BkZi8xLjMvJz4KICA8cGRmOkF1dGhvcj5OZ3V54buFbiBUaOG7iyBOZ+G7jWMgWeG6v248L3BkZjpBdXRob3I+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnhtcD0naHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyc+CiAgPHhtcDpDcmVhdG9yVG9vbD5DYW52YTwveG1wOkNyZWF0b3JUb29sPgogPC9yZGY6RGVzY3JpcHRpb24+CjwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9J3InPz77jSwNAAAK70lEQVR4nO3dTYtkVxnA8Zr0kFEhwaULRdwlIS78AmJETDQiJmTlTkPUjUu3KuhKFCXqd9BNMDPT985EBL9BJAtB8iKIGxeRBIkk8+q5U+dO3+6ZNv3y9FN17v394OFUOi/dqXvm36equ7pXKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGCpLpfpyvST1ZiWZ7qfmYnJBT5XZqdc3J1xNablme7nV8oev7rhP2sEOOyzkjFzmHE/j8EabtOwckHPdev1kTK/Khf0F50x85ifl/38Yll/sLtaPdCtPDxsXr8+Mg/r18vcLhf0dm/MTKbu53+UOd+vnLCa1+195nmqXtxrZb3WG9P4lH38fr+O1qtlzjthzUC5oA/06/UrNVi36mz8s6Mxp5ybdX1NsGaiFywz3xGsuekFy8x3BGtuJs9hHRqsrv71sBqzbTPZowc/0QrW3PSTE9ZhF/7AprhhzBbNze6QT7S9YM1Pd58TVnfvhZ9Gy5itmrpnPSRcgu4IwerqhS/rv8p8t8y3yjxvzAbnhd3V6ptl/e34CbVzwpq//mgPCcdg/W14eUPZKKvOmC2Ysi+/3O3FSbDmrjveCeuNy6vVx66uX84zbIAdYzY0F/r1vn1uskcFa+76I3xbQ7cXrNcvlY1SxoVno8p+HF9S9kzvhLUcgkWLBGuhBIsWCdZCCRYtEqyFEixaJFgLJVi0SLAWSrBokWAtlGDRIsFaKMGiRYK1UIJFiwRroQSLFgnWQgkWLRKshRIsWiRYCyVYtEiwFkqwaJFgLZRg0SLBWijBokWCtVCCRYsEa6EEixYJ1kIJFi0SrIUSLFokWAslWLRIsBJdXt25o4dflTXE4txZzvg+DrtY3fF+zZdgsRUEK8GVMhfLDH/ghzu7q+tZTjdZ73ex+uP9ItXXL9Zg7QbfN3AcgpVgCNYfVutolTvxU+XOe7ysj5Z57Izm0fI+PlvWT4wX68qBj+mYJ6zhF6leGH/zM2yKYCWYnnTK7ZdqIP5b5toZzXv1ffyyvt+dUwbrzkPCyysXns0SrATTh4Dl9qVpDM5obtQI/XoMVn/gY+o9JKRBgpXgwAnr5RqT6/1eJKLnWn0fLx7nhPX/guVJd7aBYCU4EKyL/V6wzuqE9aHB6n1bAw0SrASCBTEEK4FgQQzBSnCUYI1Penf7b5/0OawPBIs5EqwERz1hTcIx3r7dnWDG8JX1N4LFnAhWghOcsN4rt98p67snmfLvvl0j9DPBYk4EK8EJgvXcn9avA/x4edtDJ5ny7z5c1guHXSzBokWCleAEwXpy+GevrnJeSyhYtEKwEpwgWE+PD+VOEaxzgsXcCFaCEwTrq/Wff+AMPybBojmClUCwIIZgJRAsiCFYCQQLYghWAsGCGIKVQLAghmAlECyIIVgJBAtiCFYCwYIYgpVAsCCGYCUQLIghWAkEC2IIVgLBghiClUCwIIZgJRAsiCFYCQQLYpT9t1P/bDxT9+3NTrBiCRbEOHjC6pyw4gkWxJicsJ51wjojggUxBCuBYEEMwUogWBBDsBIIFsQQrASCBTEEK4FgQQzBSiBYEEOwEggWxBCsBIIFMQQrgWBBDMFKIFgQQ7ASCBbEEKwEggUxBCuBYEEMwUogWBBDsBIIFsQQrASCBTEEK4FgQQzBSiBYEEOwEggWxBCsBIIFMQQrgWBBDMFKIFgQQ7ASCBbEEKwEggUxBCuBYEEMwUogWBBDsBIIFsQQrASCBTEEK4FgQQzBSiBYEEOwEggWxBCsBIIFMQQrgWBBDMFKIFgQQ7ASCBbEEKwEggUxBCuBYEEMwUogWBBDsBIIFsQQrASCBTEEK4FgQQzBSiBYEEOwEggWxBCsBIIFMQQrgWBBDMFKIFgQQ7ASCBbEEKwEggUxBCuBYEEMwUogWBBDsBIIFsQQrASCBTEEK4FgQQzBSiBYEEOwEggWxBCsBIIFMQQrgWBBDMFKIFgQQ7ASCBbEEKwEggUxBCuBYEEMwUogWBBDsBIIFsQQrASCBTEEK4FgQQzBSiBYEEOwEggWxBCsBIIFMQQrgWBBDMFKIFgQQ7ASCBbEEKwEggUxBCuBYEEMwUogWBBDsBIIFsQQrASCBTEEK4FgQQzBSiBYEEOwEggWxBCsBIIFMQQrgWBBDMFKIFgQQ7ASCBbEEKwEggUxBCuBYEEMwUogWBBDsBIIFsQQrASCBTEEK4FgQQzBSiBYEEOwEggWxBCsBIIFMQQrgWBBDMFKIFgQQ7ASCBbEEKwEggUxBCuBYEEMwUogWBBDsBIIFsQQrASCBTEEK4FgQQzBSiBYEEOwEggWxBCsBDVUY7gu1gi0Gqxz4/+LMdkjWAnqHX33hNW1fcI6N/6/GLOBEayzNtxZk88QTZ6wXiobZXe1P77GZM+f925/oxOsszHcWVfqdG0F61Zd3yvzSrl9paxXemM2NGX/XS3r5bK+Ou5bwQpW7ri7nyH6hh4STj6u8fbtg3/fmOyZ7MNbh+xJwTqNGqoWHxKOJ6zh47pRbt8YV2M2MXX/Xe/WDwXvu297wTqdcsftO2HVO3Prg2VMoyNYp1HuOMEyJm8E6zTKHSdYxuSNYJ1GC89h1eepjJnDDM91DXv6tbK/z49/9jiiGqqt+irh8N+u7+Opfu/jGWbjT6wac8q51q/39F+6esLqz+oP0hyNd1i/2qoT1k79mL5W36cxc5s3eyes4yt33DZ+4+j4msBPlvfzQpnnjZnJfLvMd8o8+8eyz6+uBOtY6slqqx4S9qt9pz5jZjmvlBGsYxruuC18SDjO8GLmHWPmOIJ1AgdPWP0WnLAA7kuwgGYIFtAMwQKaIVi0qNs/w/cznR/X6UzedvfHZ9MwwaJFwx7crVP37j3fNtCv9n8VXLBmQLBo0bhnd9ffIvD9sj9/UtYflvVH0+nW64/LfGb8VpkNf+ichmDRoskJ60K5/Xbdp/f8dITJ256swbJvWyZYtGjyEO/BMn+tYXq/X7+4+M6Ut31Q1+EnJHzBvp0BwaJFk+eqHizzet2nN/v9J6xbde8Ot59wwpoBwaJFwx68XObS+iHhocGqM/y9J+oet29bJli0aHj+avjluRcFa1kEixY5YS2UYNGiyXNYQ7DeEKyFECxaNPkq4YUyb9SvEgrW3AkWLXLCWijBokUHnsN6U7AWQrBo0fhVQsFaGMGiRU5YCyVYtOjAk+5vedJ9IQSLFg17cPLi57ecsBZCsGjR5DmsjwjWgtSLeJxf8/V0Ddb4UxyNSZ/hE+bvV3eC9dFy+++9YC1DuYD7Tljdh5+wvjSNnDGbmmEf/nS9OmEtxXARj/mr6r9Xbn+6rI+X9TFjNjVlDz5S1s+V+acn3RfiKA8J+/0/V+h6V38wmjGbmm69ftCtb49RGveoYM1VuYBHeUh496TVHXibMVsyB2M1vk2w5uSoJ6zJhb/V7Z24jNn4TE5W4ypYc1Uu4Id+W4MxjY5gzU25gIJl5jqCNTflAgqWmesI1tyUCzgN1sv1Ql/vz+j5BmMS52a/960OT/QrwWpet392p18FNKbl6SdrmS8K1gx0q30nrN/Vz0j/Ln/9rjEtT9nH7/Tr9T9lPi9YMzBcxG51N1jD67IeLutDxsxhur3bO33d7zRuuIg1WMbMfpiBbnXPw0Njmp777WcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmLH/AQ78Pb9AXSaMAAAAAElFTkSuQmCC",
  a0 = "" + new URL("quà tặng.8afabe8d.png", import.meta.url).href,
  l0 = "" + new URL("flow.ab1de525.png", import.meta.url).href,
  c0 = "" + new URL("giao diện mẫu.d0da5a63.png", import.meta.url).href,
  u0 =
    "" +
    new URL("maauxgiao diện theo yêu càu.49e1a5b9.png", import.meta.url).href,
  f0 = "" + new URL("livetream.9158c900.png", import.meta.url).href,
  h0 = "" + new URL("mentor.342cfe2c.png", import.meta.url).href;
const d0 = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, o] of t) n[r] = o;
    return n;
  },
  p0 = {
    name: "App",
    components: {},
    data() {
      return {
        totalCategory: [],
        isActive: !1,
        isActiveFeature: !1,
        isActiveExtend: !1,
        isActiveBlog: !1,
      };
    },
    created() {
      this.handleGetTotalCategory();
    },
    methods: {
      handleToggle() {
        this.isActive = !this.isActive;
      },
      handleToggleFeature() {
        this.isActiveFeature = !this.isActiveFeature;
      },
      handleToggleExtend() {
        this.isActiveExtend = !this.isActiveExtend;
      },
      handleToggleBlog() {
        this.isActiveBlog = !this.isActiveBlog;
      },
      popupMobileMenu: function (e) {
        this.isActive = !this.isActive;
      },
      handleGetTotalCategory() {
        Vv.getAllCategory("")
          .then((e) => {
            e && e.data && (this.totalCategory = e.data);
          })
          .catch((e) => {});
      },
    },
  },
  g0 = { id: "app" },
  m0 = k(
    "meta",
    { "http-equiv": "Content-Type", content: "text/html; charset=UTF-8" },
    null,
    -1
  ),
  y0 = k(
    "link",
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;800;900&display=swap",
    },
    null,
    -1
  ),
  b0 = k(
    "meta",
    { "http-equiv": "x-ua-compatible", content: "ie=edge" },
    null,
    -1
  ),
  v0 = k("title", null, "Gamifa - Nền tảng cho nhà đào tạo Vĩ đại", -1),
  w0 = k("meta", { name: "robots", content: "index, follow" }, null, -1),
  x0 = k(
    "meta",
    {
      name: "description",
      content: "Gamifa - Nền tảng cho nhà đào tạo Vĩ đại",
    },
    null,
    -1
  ),
  T0 = k(
    "meta",
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, shrink-to-fit=no",
    },
    null,
    -1
  ),
  _0 = k(
    "meta",
    {
      name: "description",
      content: "Gamifa - Nền tảng cho nhà đào tạo Vĩ đại",
    },
    null,
    -1
  ),
  E0 = k(
    "meta",
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, shrink-to-fit=no",
    },
    null,
    -1
  ),
  C0 = k(
    "meta",
    {
      name: "twitter:title",
      content: "Gamifa - Nền tảng cho nhà đào tạo Vĩ đại",
    },
    null,
    -1
  ),
  A0 = k(
    "meta",
    {
      name: "twitter:description",
      content: "Gamifa - Nền tảng cho nhà đào tạo Vĩ đại",
    },
    null,
    -1
  ),
  k0 = k(
    "meta",
    {
      name: "twitter:image",
      content:
        "https://media.whiteg.app/lgbtapp.s3.ap-southeast-1.amazonaws.com/2023/09/06_1693993417307/64d46894b0f0033242fd7a80-1693993417306-thumb%20sahre.jpg",
    },
    null,
    -1
  ),
  S0 = k(
    "meta",
    { name: "twitter:card", content: "summary_large_image" },
    null,
    -1
  ),
  P0 = k(
    "meta",
    {
      property: "og:title",
      content: "Gamifa - Nền tảng cho nhà đào tạo Vĩ đại",
    },
    null,
    -1
  ),
  R0 = k(
    "meta",
    {
      property: "og:image",
      content:
        "https://media.whiteg.app/lgbtapp.s3.ap-southeast-1.amazonaws.com/2023/09/06_1693993417307/64d46894b0f0033242fd7a80-1693993417306-thumb%20sahre.jpg",
    },
    null,
    -1
  ),
  I0 = k(
    "link",
    {
      rel: "shortcut icon",
      type: "image/x-icon",
      href: "./assets/media/favicon.png",
    },
    null,
    -1
  ),
  N0 = { class: "rbt-header rbt-header-10" },
  O0 = k(
    "div",
    { class: "rbt-sticky-placeholder", style: { height: "80px" } },
    null,
    -1
  ),
  M0 = {
    class:
      "rbt-header-wrapper header-space-betwween header-transparent header-sticky rbt-sticky",
  },
  L0 = { class: "container-fluid" },
  j0 = { class: "mainbar-row rbt-navigation-start align-items-center" },
  H0 = k(
    "div",
    { class: "header-left rbt-header-content" },
    [
      k("div", { class: "header-info" }, [
        k(
          "div",
          { class: "logo", style: { display: "block", background: "none" } },
          [
            k("a", { href: "/" }, [
              k("img", {
                src: eh,
                alt: "Gamifa Logo",
                style: { width: "120px" },
              }),
            ]),
          ]
        ),
      ]),
    ],
    -1
  ),
  D0 = { class: "rbt-main-navigation d-none d-xl-block" },
  B0 = { class: "mainmenu-nav" },
  F0 = { class: "mainmenu" },
  $0 = k(
    "li",
    { class: "has-dropdown has-menu-child-item" },
    [
      k("a", { href: "#" }, [
        bn("Tính năng "),
        k("i", { class: "feather-chevron-down" }, [
          k(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              height: "1em",
              viewBox: "0 0 512 512",
            },
            [
              k("path", {
                d: "M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z",
              }),
            ]
          ),
        ]),
      ]),
      k(
        "ul",
        {
          class: "submenu",
          style: {
            display: "grid",
            "grid-template-columns": "repeat(4, auto)",
            width: "65vw",
          },
        },
        [
          k("li", { class: "has-dropdown" }, [
            k(
              "a",
              {
                href: "https://gamifa.vn/feature/bang-xep-hang.html",
                style: { display: "flex" },
              },
              [
                k("img", {
                  src: tu,
                  alt: "Icon Images",
                  style: { "max-height": "30px", "max-width": "30px" },
                }),
                k(
                  "div",
                  { style: { "margin-left": "5px", "padding-left": "5px" } },
                  [
                    k(
                      "h3",
                      {
                        style: {
                          "font-size": "15px",
                          "font-weight": "500",
                          "margin-bottom": "5px",
                        },
                      },
                      " Bảng xếp hạng "
                    ),
                    k(
                      "p",
                      {
                        style: {
                          "font-size": "14px",
                          "font-weight": "500",
                          color: "var(--color-body)",
                        },
                      },
                      " Chìa khóa tạo động lực cho học viên "
                    ),
                  ]
                ),
              ]
            ),
          ]),
          k("li", { class: "has-dropdown" }, [
            k(
              "a",
              {
                href: "https://gamifa.vn/feature/trao-thuong.html",
                style: { display: "flex" },
              },
              [
                k("img", {
                  src: Yv,
                  alt: "Icon Images",
                  style: { "max-height": "30px", "max-width": "30px" },
                }),
                k(
                  "div",
                  { style: { "margin-left": "5px", "padding-left": "5px" } },
                  [
                    k(
                      "h3",
                      {
                        style: {
                          "font-size": "15px",
                          "font-weight": "500",
                          "margin-bottom": "5px",
                        },
                      },
                      " Trao thưởng "
                    ),
                    k(
                      "p",
                      {
                        style: {
                          "font-size": "14px",
                          "font-weight": "500",
                          color: "var(--color-body)",
                        },
                      },
                      " Tự tạo cơ chế khuyến khích cho người dùng "
                    ),
                  ]
                ),
              ]
            ),
          ]),
          k("li", { class: "has-dropdown" }, [
            k(
              "a",
              {
                href: "https://gamifa.vn/feature/phan-quyen-quan-tri.html",
                style: { display: "flex" },
              },
              [
                k("img", {
                  src: Kv,
                  alt: "Icon Images",
                  style: { "max-height": "30px", "max-width": "30px" },
                }),
                k(
                  "div",
                  { style: { "margin-left": "5px", "padding-left": "5px" } },
                  [
                    k(
                      "h3",
                      {
                        style: {
                          "font-size": "15px",
                          "font-weight": "500",
                          "margin-bottom": "5px",
                        },
                      },
                      " Phân quyền quản trị "
                    ),
                    k(
                      "p",
                      {
                        style: {
                          "font-size": "14px",
                          "font-weight": "500",
                          color: "var(--color-body)",
                        },
                      },
                      " Tự quyết định quyền quản trị cộng đồng "
                    ),
                  ]
                ),
              ]
            ),
          ]),
          k("li", { class: "has-dropdown" }, [
            k(
              "a",
              {
                href: "https://gamifa.vn/feature/tao-su-kien.html",
                style: { display: "flex" },
              },
              [
                k("img", {
                  src: Qv,
                  alt: "Icon Images",
                  style: { "max-height": "30px", "max-width": "30px" },
                }),
                k(
                  "div",
                  { style: { "margin-left": "5px", "padding-left": "5px" } },
                  [
                    k(
                      "h3",
                      {
                        style: {
                          "font-size": "15px",
                          "font-weight": "500",
                          "margin-bottom": "5px",
                        },
                      },
                      " Tạo sự kiện "
                    ),
                    k(
                      "p",
                      {
                        style: {
                          "font-size": "14px",
                          "font-weight": "500",
                          color: "var(--color-body)",
                        },
                      },
                      " Tổ chức, quản lý lịch trình tiện lợi, linh hoạt "
                    ),
                  ]
                ),
              ]
            ),
          ]),
          k("li", { class: "has-dropdown" }, [
            k(
              "a",
              {
                href: "https://gamifa.vn/feature/mang-xa-hoi.html",
                style: { display: "flex" },
              },
              [
                k("img", {
                  src: Jv,
                  alt: "Icon Images",
                  style: { "max-height": "30px", "max-width": "30px" },
                }),
                k(
                  "div",
                  { style: { "margin-left": "5px", "padding-left": "5px" } },
                  [
                    k(
                      "h3",
                      {
                        style: {
                          "font-size": "15px",
                          "font-weight": "500",
                          "margin-bottom": "5px",
                        },
                      },
                      " Mạng xã hội của bạn "
                    ),
                    k(
                      "p",
                      {
                        style: {
                          "font-size": "14px",
                          "font-weight": "500",
                          color: "var(--color-body)",
                        },
                      },
                      " Mạng xã hội riêng kết nối với tệp người dùng của riêng bạn "
                    ),
                  ]
                ),
              ]
            ),
          ]),
          k("li", { class: "has-dropdown" }, [
            k(
              "a",
              {
                href: "https://gamifa.vn/feature/mo-rong-thanh-vien.html",
                style: { display: "flex" },
              },
              [
                k("img", {
                  src: Gv,
                  alt: "Icon Images",
                  style: { "max-height": "30px", "max-width": "30px" },
                }),
                k(
                  "div",
                  { style: { "margin-left": "5px", "padding-left": "5px" } },
                  [
                    k(
                      "h3",
                      {
                        style: {
                          "font-size": "15px",
                          "font-weight": "500",
                          "margin-bottom": "5px",
                        },
                      },
                      " Mở rộng thành viên "
                    ),
                    k(
                      "p",
                      {
                        style: {
                          "font-size": "14px",
                          "font-weight": "500",
                          color: "var(--color-body)",
                        },
                      },
                      " Gia tăng số lượng thành viên nhanh chóng "
                    ),
                  ]
                ),
              ]
            ),
          ]),
          k("li", { class: "has-dropdown" }, [
            k(
              "a",
              {
                href: "https://gamifa.vn/feature/noi-dung-noi-bat.html",
                style: { display: "flex" },
              },
              [
                k("img", {
                  src: Xv,
                  alt: "Icon Images",
                  style: { "max-height": "30px", "max-width": "30px" },
                }),
                k(
                  "div",
                  { style: { "margin-left": "5px", "padding-left": "5px" } },
                  [
                    k(
                      "h3",
                      {
                        style: {
                          "font-size": "15px",
                          "font-weight": "500",
                          "margin-bottom": "5px",
                        },
                      },
                      " Nội dung nổi bật "
                    ),
                    k(
                      "p",
                      {
                        style: {
                          "font-size": "14px",
                          "font-weight": "500",
                          color: "var(--color-body)",
                        },
                      },
                      " Ghim bài viết bạn muốn hiển thị lên đầu trang cá nhân "
                    ),
                  ]
                ),
              ]
            ),
          ]),
          k("li", { class: "has-dropdown" }, [
            k(
              "a",
              {
                href: "https://gamifa.vn/feature/thiet-lap-thong-bao.html",
                style: { display: "flex" },
              },
              [
                k("img", {
                  src: Zv,
                  alt: "Icon Images",
                  style: { "max-height": "30px", "max-width": "30px" },
                }),
                k(
                  "div",
                  { style: { "margin-left": "5px", "padding-left": "5px" } },
                  [
                    k(
                      "h3",
                      {
                        style: {
                          "font-size": "15px",
                          "font-weight": "500",
                          "margin-bottom": "5px",
                        },
                      },
                      " Thiết lập thông báo "
                    ),
                    k(
                      "p",
                      {
                        style: {
                          "font-size": "14px",
                          "font-weight": "500",
                          color: "var(--color-body)",
                        },
                      },
                      " Người dùng không bỏ lỡ tin tức nào từ nhà đào tạo "
                    ),
                  ]
                ),
              ]
            ),
          ]),
          k("li", { class: "has-dropdown" }, [
            k(
              "a",
              {
                href: "https://gamifa.vn/feature/thiet-lap-khoa-hoc.html",
                style: { display: "flex" },
              },
              [
                k("img", {
                  src: e0,
                  alt: "Icon Images",
                  style: { "max-height": "30px", "max-width": "30px" },
                }),
                k(
                  "div",
                  { style: { "margin-left": "5px", "padding-left": "5px" } },
                  [
                    k(
                      "h3",
                      {
                        style: {
                          "font-size": "15px",
                          "font-weight": "500",
                          "margin-bottom": "5px",
                        },
                      },
                      " Thiết lập khóa học "
                    ),
                    k(
                      "p",
                      {
                        style: {
                          "font-size": "14px",
                          "font-weight": "500",
                          color: "var(--color-body)",
                        },
                      },
                      " Cá nhân hóa việc đào tạo, nâng cao hiệu suất công việc "
                    ),
                  ]
                ),
              ]
            ),
          ]),
          k("li", { class: "has-dropdown" }, [
            k("a", { href: "#", style: { display: "flex" } }, [
              k("img", {
                src: th,
                alt: "Icon Images",
                style: { "max-height": "30px", "max-width": "30px" },
              }),
              k(
                "div",
                { style: { "margin-left": "5px", "padding-left": "5px" } },
                [
                  k(
                    "h3",
                    {
                      style: {
                        "font-size": "15px",
                        "font-weight": "500",
                        "margin-bottom": "5px",
                      },
                    },
                    " Tiện lợi với ứng dụng di động "
                  ),
                  k(
                    "p",
                    {
                      style: {
                        "font-size": "14px",
                        "font-weight": "500",
                        color: "var(--color-body)",
                      },
                    },
                    " Truy cập đơn giản, tương tác mọi lúc mọi nơi "
                  ),
                ]
              ),
            ]),
          ]),
          k("li", { class: "has-dropdown" }, [
            k(
              "a",
              {
                href: "https://gamifa.vn/feature/vung-quang-cao.html",
                style: { display: "flex" },
              },
              [
                k("img", {
                  src: t0,
                  alt: "Icon Images",
                  style: { "max-height": "30px", "max-width": "30px" },
                }),
                k(
                  "div",
                  { style: { "margin-left": "5px", "padding-left": "5px" } },
                  [
                    k(
                      "h3",
                      {
                        style: {
                          "font-size": "15px",
                          "font-weight": "500",
                          "margin-bottom": "5px",
                        },
                      },
                      " Vùng quảng cáo "
                    ),
                    k(
                      "p",
                      {
                        style: {
                          "font-size": "14px",
                          "font-weight": "500",
                          color: "var(--color-body)",
                        },
                      },
                      " Thiết lập vị trí quảng cáo phù hợp giúp đột phá doanh số "
                    ),
                  ]
                ),
              ]
            ),
          ]),
          k("li", { class: "has-dropdown" }, [
            k(
              "a",
              {
                href: "https://gamifa.vn/feature/nguoi-dung-tich-cuc.html",
                style: { display: "flex" },
              },
              [
                k("img", {
                  src: n0,
                  alt: "Icon Images",
                  style: { "max-height": "30px", "max-width": "30px" },
                }),
                k(
                  "div",
                  { style: { "margin-left": "5px", "padding-left": "5px" } },
                  [
                    k(
                      "h3",
                      {
                        style: {
                          "font-size": "15px",
                          "font-weight": "500",
                          "margin-bottom": "5px",
                        },
                      },
                      " Nhận diện người dùng tích cực "
                    ),
                    k(
                      "p",
                      {
                        style: {
                          "font-size": "14px",
                          "font-weight": "500",
                          color: "var(--color-body)",
                        },
                      },
                      " Dễ dàng xác định người dùng có tương tác mạnh mẽ "
                    ),
                  ]
                ),
              ]
            ),
          ]),
          k("li", { class: "has-dropdown" }, [
            k("a", { href: "#", style: { display: "flex" } }, [
              k("img", {
                src: i0,
                alt: "Icon Images",
                style: { "max-height": "30px", "max-width": "30px" },
              }),
              k(
                "div",
                { style: { "margin-left": "5px", "padding-left": "5px" } },
                [
                  k(
                    "h3",
                    {
                      style: {
                        "font-size": "15px",
                        "font-weight": "500",
                        "margin-bottom": "5px",
                      },
                    },
                    " Fan cuồng nội dung của bạn "
                  ),
                  k(
                    "p",
                    {
                      style: {
                        "font-size": "14px",
                        "font-weight": "500",
                        color: "var(--color-body)",
                      },
                    },
                    " Thoải mái tương tác chặt chẽ với fan cuồng hiệu quả hơn "
                  ),
                ]
              ),
            ]),
          ]),
          k("li", { class: "has-dropdown" }, [
            k(
              "a",
              {
                href: "https://gamifa.vn/feature/nguoi-dung-da-tang.html",
                style: { display: "flex" },
              },
              [
                k("img", {
                  src: tu,
                  alt: "Icon Images",
                  style: { "max-height": "30px", "max-width": "30px" },
                }),
                k(
                  "div",
                  { style: { "margin-left": "5px", "padding-left": "5px" } },
                  [
                    k(
                      "h3",
                      {
                        style: {
                          "font-size": "15px",
                          "font-weight": "500",
                          "margin-bottom": "5px",
                        },
                      },
                      " Người dùng đa tầng "
                    ),
                    k(
                      "p",
                      {
                        style: {
                          "font-size": "14px",
                          "font-weight": "500",
                          color: "var(--color-body)",
                        },
                      },
                      " Kết nối với nhiều người dùng mới, xây dựng cộng đồng lớn mạnh "
                    ),
                  ]
                ),
              ]
            ),
          ]),
          k("li", { class: "has-dropdown" }, [
            k(
              "a",
              {
                href: "https://gamifa.vn/feature/dieu-kien-khoa-hoc.html",
                style: { display: "flex" },
              },
              [
                k("img", {
                  src: r0,
                  alt: "Icon Images",
                  style: { "max-height": "30px", "max-width": "30px" },
                }),
                k(
                  "div",
                  { style: { "margin-left": "5px", "padding-left": "5px" } },
                  [
                    k(
                      "h3",
                      {
                        style: {
                          "font-size": "15px",
                          "font-weight": "500",
                          "margin-bottom": "5px",
                        },
                      },
                      " Tạo điều kiện khóa học "
                    ),
                    k(
                      "p",
                      {
                        style: {
                          "font-size": "14px",
                          "font-weight": "500",
                          color: "var(--color-body)",
                        },
                      },
                      " Toàn quyền quyết định nội dung và điều kiện khóa học "
                    ),
                  ]
                ),
              ]
            ),
          ]),
        ]
      ),
    ],
    -1
  ),
  q0 = k(
    "li",
    { class: "has-dropdown has-menu-child-item" },
    [
      k("a", { href: "#" }, [
        bn("Mở rộng "),
        k("i", { class: "feather-chevron-down" }, [
          k(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              height: "1em",
              viewBox: "0 0 512 512",
            },
            [
              k("path", {
                d: "M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z",
              }),
            ]
          ),
        ]),
      ]),
      k("ul", { class: "submenu" }, [
        k("li", { class: "has-dropdown" }, [
          k("a", { href: "#", style: { display: "flex" } }, [
            k("img", {
              src: s0,
              alt: "Icon Images",
              style: { "max-height": "30px", "max-width": "30px" },
            }),
            k(
              "div",
              {
                style: {
                  "margin-left": "5px",
                  "padding-left": "5px",
                  display: "flex",
                  "align-items": "center",
                },
              },
              [
                k(
                  "h3",
                  {
                    style: {
                      "font-size": "15px",
                      "font-weight": "500",
                      "margin-bottom": "5px",
                    },
                  },
                  " Challenge "
                ),
              ]
            ),
          ]),
        ]),
        k("li", { class: "has-dropdown" }, [
          k(
            "a",
            {
              href: "https://gamifa.vn/feature/affiliate-2-tang.html",
              style: { display: "flex" },
            },
            [
              k("img", {
                src: o0,
                alt: "Icon Images",
                style: { "max-height": "30px", "max-width": "30px" },
              }),
              k(
                "div",
                {
                  style: {
                    "margin-left": "5px",
                    "padding-left": "5px",
                    display: "flex",
                    "align-items": "center",
                  },
                },
                [
                  k(
                    "h3",
                    {
                      style: {
                        "font-size": "15px",
                        "font-weight": "500",
                        "margin-bottom": "5px",
                      },
                    },
                    " Affiliate 2 tầng "
                  ),
                ]
              ),
            ]
          ),
        ]),
        k("li", { class: "has-dropdown" }, [
          k(
            "a",
            {
              href: "https://gamifa.vn/feature/qua-tang.html",
              style: { display: "flex" },
            },
            [
              k("img", {
                src: a0,
                alt: "Icon Images",
                style: { "max-height": "30px", "max-width": "30px" },
              }),
              k(
                "div",
                {
                  style: {
                    "margin-left": "5px",
                    "padding-left": "5px",
                    display: "flex",
                    "align-items": "center",
                  },
                },
                [
                  k(
                    "h3",
                    {
                      style: {
                        "font-size": "15px",
                        "font-weight": "500",
                        "margin-bottom": "5px",
                      },
                    },
                    " Quà tặng "
                  ),
                ]
              ),
            ]
          ),
        ]),
        k("li", { class: "has-dropdown" }, [
          k(
            "a",
            {
              href: "https://gamifa.vn/feature/ung-dung-di-dong.html",
              style: { display: "flex" },
            },
            [
              k("img", {
                src: th,
                alt: "Icon Images",
                style: { "max-height": "30px", "max-width": "30px" },
              }),
              k(
                "div",
                {
                  style: {
                    "margin-left": "5px",
                    "padding-left": "5px",
                    display: "flex",
                    "align-items": "center",
                  },
                },
                [
                  k(
                    "h3",
                    {
                      style: {
                        "font-size": "15px",
                        "font-weight": "500",
                        "margin-bottom": "5px",
                      },
                    },
                    " Moblie App riêng "
                  ),
                ]
              ),
            ]
          ),
        ]),
        k("li", { class: "has-dropdown" }, [
          k("a", { href: "#", style: { display: "flex" } }, [
            k("img", {
              src: l0,
              alt: "Icon Images",
              style: { "max-height": "30px", "max-width": "30px" },
            }),
            k(
              "div",
              {
                style: {
                  "margin-left": "5px",
                  "padding-left": "5px",
                  display: "flex",
                  "align-items": "center",
                },
              },
              [
                k(
                  "h3",
                  {
                    style: {
                      "font-size": "15px",
                      "font-weight": "500",
                      "margin-bottom": "5px",
                    },
                  },
                  " Flow "
                ),
              ]
            ),
          ]),
        ]),
        k("li", { class: "has-dropdown" }, [
          k("a", { href: "#", style: { display: "flex" } }, [
            k("img", {
              src: c0,
              alt: "Icon Images",
              style: { "max-height": "30px", "max-width": "30px" },
            }),
            k(
              "div",
              {
                style: {
                  "margin-left": "5px",
                  "padding-left": "5px",
                  display: "flex",
                  "align-items": "center",
                },
              },
              [
                k(
                  "h3",
                  {
                    style: {
                      "font-size": "15px",
                      "font-weight": "500",
                      "margin-bottom": "5px",
                    },
                  },
                  " Chọn giao diện mẫu "
                ),
              ]
            ),
          ]),
        ]),
        k("li", { class: "has-dropdown" }, [
          k(
            "a",
            {
              href: "https://gamifa.vn/feature/giao-dien-rieng.html",
              style: { display: "flex" },
            },
            [
              k("img", {
                src: u0,
                alt: "Icon Images",
                style: { "max-height": "30px", "max-width": "30px" },
              }),
              k(
                "div",
                {
                  style: {
                    "margin-left": "5px",
                    "padding-left": "5px",
                    display: "flex",
                    "align-items": "center",
                  },
                },
                [
                  k(
                    "h3",
                    {
                      style: {
                        "font-size": "15px",
                        "font-weight": "500",
                        "margin-bottom": "5px",
                      },
                    },
                    " Giao diện riêng theo yêu cầu "
                  ),
                ]
              ),
            ]
          ),
        ]),
        k("li", { class: "has-dropdown" }, [
          k(
            "a",
            {
              href: "https://gamifa.vn/feature/LIVESTREAM.html",
              style: { display: "flex" },
            },
            [
              k("img", {
                src: f0,
                alt: "Icon Images",
                style: { "max-height": "30px", "max-width": "30px" },
              }),
              k(
                "div",
                {
                  style: {
                    "margin-left": "5px",
                    "padding-left": "5px",
                    display: "flex",
                    "align-items": "center",
                  },
                },
                [
                  k(
                    "h3",
                    {
                      style: {
                        "font-size": "15px",
                        "font-weight": "500",
                        "margin-bottom": "5px",
                      },
                    },
                    " Livestream "
                  ),
                ]
              ),
            ]
          ),
        ]),
        k("li", { class: "has-dropdown" }, [
          k(
            "a",
            {
              href: "https://gamifa.vn/feature/mentor.html",
              style: { display: "flex" },
            },
            [
              k("img", {
                src: h0,
                alt: "Icon Images",
                style: { "max-height": "30px", "max-width": "30px" },
              }),
              k(
                "div",
                {
                  style: {
                    "margin-left": "5px",
                    "padding-left": "5px",
                    display: "flex",
                    "align-items": "center",
                  },
                },
                [
                  k(
                    "h3",
                    {
                      style: {
                        "font-size": "15px",
                        "font-weight": "500",
                        "margin-bottom": "5px",
                      },
                    },
                    " Mentor "
                  ),
                ]
              ),
            ]
          ),
        ]),
      ]),
    ],
    -1
  ),
  U0 = { class: "has-dropdown has-menu-child-item" },
  W0 = k(
    "a",
    { href: "/post" },
    [
      bn("Tài nguyên "),
      k("i", { class: "feather-chevron-down" }, [
        k(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            height: "1em",
            viewBox: "0 0 512 512",
          },
          [
            k("path", {
              d: "M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z",
            }),
          ]
        ),
      ]),
    ],
    -1
  ),
  z0 = {
    class: "submenu",
    style: {
      display: "grid",
      "grid-template-columns": "repeat(2, auto)",
      width: "570px",
    },
  },
  V0 = ["value"],
  Y0 = ["href"],
  K0 = k(
    "li",
    { class: "has-dropdown has-menu-child-item" },
    [k("a", { href: "https://gamifa.vn/feature/pricing.html" }, "Bảng giá ")],
    -1
  ),
  Q0 = k(
    "li",
    { class: "has-dropdown has-menu-child-item" },
    [k("a", { href: "https://docs.gamifa.com" }, "Liên hệ ")],
    -1
  ),
  J0 = { class: "header-right" },
  G0 = k(
    "div",
    { class: "rbt-btn-wrapper d-none d-xl-block" },
    [
      k(
        "a",
        {
          class:
            "rbt-btn rbt-marquee-btn marquee-auto btn-border-gradient radius-round btn-sm hover-transform-none",
          href: "/v/login",
        },
        [
          k(
            "span",
            {
              "data-text": "Trải nghiệm ngay",
              style: { "line-height": "inherit !important" },
            },
            "Trải nghiệm ngay"
          ),
        ]
      ),
    ],
    -1
  ),
  X0 = { class: "mobile-menu-bar d-block d-xl-none" },
  Z0 = { class: "hamberger" },
  ew = k(
    "i",
    { class: "feather-menu" },
    [
      k(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          height: "1em",
          viewBox: "0 0 448 512",
        },
        [
          k("path", {
            d: "M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z",
          }),
        ]
      ),
    ],
    -1
  ),
  tw = [ew],
  nw = { class: "inner-wrapper" },
  iw = { class: "inner-top" },
  rw = { class: "content" },
  sw = k(
    "div",
    { class: "logo", style: { display: "block", background: "none" } },
    [
      k("a", { href: "/" }, [
        k("img", { src: eh, alt: "Education Logo Images" }),
      ]),
    ],
    -1
  ),
  ow = { class: "rbt-btn-close" },
  aw = k(
    "i",
    { class: "feather-x" },
    [
      k(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          height: "1em",
          viewBox: "0 0 384 512",
        },
        [
          k("path", {
            d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z",
          }),
        ]
      ),
    ],
    -1
  ),
  lw = [aw],
  cw = k(
    "p",
    { class: "description" },
    " Gamifa - Nền tảng cho nhà đào tạo Vĩ đại. ",
    -1
  ),
  uw = { class: "mainmenu-nav" },
  fw = { class: "mainmenu" },
  hw = k(
    "a",
    { href: "#" },
    [
      bn("Tính năng "),
      k("i", { class: "feather-chevron-down" }, [
        k(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            height: "1em",
            viewBox: "0 0 448 512",
          },
          [
            k("path", {
              d: "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z",
            }),
          ]
        ),
      ]),
    ],
    -1
  ),
  dw = k(
    "li",
    { class: "" },
    [
      k(
        "a",
        { href: "https://gamifa.vn/feature/bang-xep-hang.html" },
        "Bảng xếp hạng"
      ),
    ],
    -1
  ),
  pw = k(
    "li",
    { class: "" },
    [
      k(
        "a",
        { href: "https://gamifa.vn/feature/trao-thuong.html" },
        "Trao thưởng"
      ),
    ],
    -1
  ),
  gw = k(
    "li",
    { class: "" },
    [
      k(
        "a",
        { href: "https://gamifa.vn/feature/phan-quyen-quan-tri.html" },
        "Phân quyền quản trị "
      ),
    ],
    -1
  ),
  mw = k(
    "li",
    { class: "" },
    [
      k(
        "a",
        { href: "https://gamifa.vn/feature/tao-su-kien.html" },
        "Tạo sự kiện"
      ),
    ],
    -1
  ),
  yw = k(
    "li",
    { class: "" },
    [
      k(
        "a",
        { href: "https://gamifa.vn/feature/mang-xa-hoi.html" },
        "Mạng xã hội của bạn"
      ),
    ],
    -1
  ),
  bw = k(
    "li",
    { class: "" },
    [
      k(
        "a",
        { href: "https://gamifa.vn/feature/mo-rong-thanh-vien.html" },
        "Mở rộng thành viên"
      ),
    ],
    -1
  ),
  vw = k(
    "li",
    { class: "" },
    [
      k(
        "a",
        { href: "https://gamifa.vn/feature/noi-dung-noi-bat.html" },
        "Nội dung nổi bật"
      ),
    ],
    -1
  ),
  ww = k(
    "li",
    { class: "" },
    [
      k(
        "a",
        { href: "https://gamifa.vn/feature/thiet-lap-thong-bao.html" },
        "Thiết lập thông báo"
      ),
    ],
    -1
  ),
  xw = k(
    "li",
    { class: "" },
    [
      k(
        "a",
        { href: "https://gamifa.vn/feature/thiet-lap-khoa-hoc.html" },
        "Thiết lập khóa học"
      ),
    ],
    -1
  ),
  Tw = k(
    "li",
    { class: "" },
    [k("a", { href: "#" }, "Tiện lợi với ứng dụng di dộng")],
    -1
  ),
  _w = k(
    "li",
    { class: "" },
    [
      k(
        "a",
        { href: "https://gamifa.vn/feature/vung-quang-cao.html" },
        "Vùng quảng cáo"
      ),
    ],
    -1
  ),
  Ew = k(
    "li",
    { class: "" },
    [
      k(
        "a",
        { href: "https://gamifa.vn/feature/nguoi-dung-tich-cuc.html" },
        "Nhận diện người dùng tích cực"
      ),
    ],
    -1
  ),
  Cw = k(
    "li",
    { class: "" },
    [k("a", { href: "#" }, "Fan cuồng nội dung của bạn")],
    -1
  ),
  Aw = k(
    "li",
    { class: "" },
    [
      k(
        "a",
        { href: "https://gamifa.vn/feature/nguoi-dung-da-tang.html" },
        "Người dùng đa tầng"
      ),
    ],
    -1
  ),
  kw = k(
    "li",
    { class: "" },
    [
      k(
        "a",
        { href: "https://gamifa.vn/feature/dieu-kien-khoa-hoc.html" },
        "Tạo điều kiện khóa học"
      ),
    ],
    -1
  ),
  Sw = [dw, pw, gw, mw, yw, bw, vw, ww, xw, Tw, _w, Ew, Cw, Aw, kw],
  Pw = k(
    "a",
    { href: "#" },
    [
      bn("Mở rộng "),
      k("i", { class: "feather-chevron-down" }, [
        k(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            height: "1em",
            viewBox: "0 0 448 512",
          },
          [
            k("path", {
              d: "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z",
            }),
          ]
        ),
      ]),
    ],
    -1
  ),
  Rw = k("li", { class: "" }, [k("a", { href: "#" }, "Challenge")], -1),
  Iw = k(
    "li",
    { class: "" },
    [
      k(
        "a",
        { href: "https://gamifa.vn/feature/affiliate-2-tang.html" },
        "Affiliate 2 tầng"
      ),
    ],
    -1
  ),
  Nw = k(
    "li",
    { class: "" },
    [k("a", { href: "https://gamifa.vn/feature/qua-tang.html" }, "Quà tặng")],
    -1
  ),
  Ow = k(
    "li",
    { class: "" },
    [
      k(
        "a",
        { href: "https://gamifa.vn/feature/ung-dung-di-dong.html" },
        "Moblie App riêng"
      ),
    ],
    -1
  ),
  Mw = k("li", { class: "" }, [k("a", { href: "#" }, "Flow")], -1),
  Lw = k(
    "li",
    { class: "" },
    [k("a", { href: "#" }, "Chọn giao diện mẫu")],
    -1
  ),
  jw = k(
    "li",
    { class: "" },
    [
      k(
        "a",
        { href: "https://gamifa.vn/feature/giao-dien-rieng.html" },
        "Giao diện riêng theo yêu cầu"
      ),
    ],
    -1
  ),
  Hw = k(
    "li",
    { class: "" },
    [
      k(
        "a",
        { href: "https://gamifa.vn/feature/LIVESTREAM.html" },
        "Livestream"
      ),
    ],
    -1
  ),
  Dw = k(
    "li",
    { class: "" },
    [k("a", { href: "https://gamifa.vn/feature/mentor.html" }, "Mentor")],
    -1
  ),
  Bw = [Rw, Iw, Nw, Ow, Mw, Lw, jw, Hw, Dw],
  Fw = k(
    "a",
    { href: "#" },
    [
      bn("Tài nguyên "),
      k("i", { class: "feather-chevron-down" }, [
        k(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            height: "1em",
            viewBox: "0 0 448 512",
          },
          [
            k("path", {
              d: "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z",
            }),
          ]
        ),
      ]),
    ],
    -1
  ),
  $w = ["value"],
  qw = ["href"],
  Uw = k(
    "li",
    { class: "" },
    [k("a", { href: "https://gamifa.vn/feature/pricing.html" }, "Bảng giá ")],
    -1
  ),
  Ww = k(
    "li",
    { class: "has-dropdown has-menu-child-item" },
    [k("a", { href: "https://docs.gamifa.com" }, "Liên hệ ")],
    -1
  ),
  zw = k(
    "ul",
    { class: "navbar-top-left rbt-information-list justify-content-start" },
    [
      k("li", null, [
        k("a", { href: "mailto:info@iceo.tech" }, [
          k("i", { class: "feather-mail" }, [
            k(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                height: "1em",
                viewBox: "0 0 512 512",
              },
              [
                k("path", {
                  d: "M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z",
                }),
              ]
            ),
          ]),
          bn("info@iceo.tech"),
        ]),
      ]),
      k("li", null, [
        k("a", { href: "" }, [
          k("i", { class: "feather-phone" }, [
            k(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                height: "1em",
                viewBox: "0 0 512 512",
              },
              [
                k("path", {
                  d: "M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z",
                }),
              ]
            ),
          ]),
          bn(" 0387684547"),
        ]),
      ]),
    ],
    -1
  ),
  Vw = k(
    "a",
    { href: "/v/login" },
    [
      k(
        "button",
        {
          class: "w-100 btn btn-primary",
          style: { height: "40px", "font-size": "18px" },
        },
        " THAM GIA NGAY "
      ),
    ],
    -1
  ),
  Yw = k(
    "footer",
    null,
    [
      k(
        "div",
        {
          class: "copyright-area copyright-style-1 ptb--20",
          style: {
            width: "100%",
            height: "100%",
            float: "left",
            "background-color": "#192335 !important",
          },
        },
        [
          k("div", { class: "container" }, [
            k("div", { class: "row align-items-center" }, [
              k("div", { class: "col-12" }, [
                k(
                  "p",
                  { class: "rbt-link-hover text-center color-white-off" },
                  [
                    bn(" Gamifa "),
                    k(
                      "a",
                      {
                        href: "https://gamifa.com/v/login",
                        class: "color-white",
                      },
                      " Platform"
                    ),
                    bn(" © Phát triển bởi ICEO trực thuộc TakiGroup. "),
                  ]
                ),
              ]),
              k("div", { class: "col-12 text-center" }, [
                k(
                  "a",
                  { class: "text-white mx-1", href: "https://docs.gamifa.com" },
                  "Về chúng tôi • "
                ),
                k(
                  "a",
                  {
                    class: "text-white mx-1",
                    href: "https://docs.gamifa.com/bang-gia",
                  },
                  "Bảng giá • "
                ),
                k(
                  "a",
                  { class: "text-white mx-1", href: "https://docs.gamifa.com" },
                  "Chính sách •"
                ),
                k(
                  "a",
                  {
                    class: "text-white mx-1",
                    href: "https://docs.gamifa.com/chinh-sach-doi-tra",
                  },
                  "Chính sách đổi trả •"
                ),
                k(
                  "a",
                  {
                    class: "text-white mx-1",
                    href: "https://docs.gamifa.com/chinh-sach-hoan-tien",
                  },
                  "Chính sách hoàn tiền •"
                ),
                k(
                  "a",
                  {
                    class: "text-white mx-1",
                    href: "https://docs.gamifa.com/chinh-sach-van-chuyen",
                  },
                  "Chính sách Vận chuyển"
                ),
              ]),
            ]),
          ]),
        ]
      ),
    ],
    -1
  );
function Kw(e, t, n, r, o, l) {
  const p = ep("router-view"),
    g = Nb;
  return (
    ln(),
    oi(g, null, {
      default: Na(() => [
        k("div", g0, [
          m0,
          y0,
          b0,
          v0,
          w0,
          x0,
          T0,
          _0,
          E0,
          C0,
          A0,
          k0,
          S0,
          P0,
          R0,
          I0,
          k("body", null, [
            k("header", N0, [
              O0,
              k("div", M0, [
                k("div", L0, [
                  k("div", j0, [
                    H0,
                    k("div", D0, [
                      k("nav", B0, [
                        k("ul", F0, [
                          $0,
                          q0,
                          k("li", U0, [
                            W0,
                            k("ul", z0, [
                              (ln(!0),
                              kr(
                                an,
                                null,
                                Rl(
                                  o.totalCategory,
                                  (y, T) => (
                                    ln(),
                                    kr(
                                      "li",
                                      {
                                        class: "has-dropdown",
                                        key: "birthday_" + T,
                                        value: y._id,
                                      },
                                      [
                                        k(
                                          "a",
                                          {
                                            href:
                                              "/post?post_category=" + y._id,
                                          },
                                          yl(y.category_title),
                                          9,
                                          Y0
                                        ),
                                      ],
                                      8,
                                      V0
                                    )
                                  )
                                ),
                                128
                              )),
                            ]),
                          ]),
                          K0,
                          Q0,
                        ]),
                      ]),
                    ]),
                    k("div", J0, [
                      G0,
                      k("div", X0, [
                        k("div", Z0, [
                          k(
                            "button",
                            {
                              class: "hamberger-button rbt-round-btn",
                              onClick:
                                t[0] ||
                                (t[0] = (...y) =>
                                  l.popupMobileMenu && l.popupMobileMenu(...y)),
                            },
                            tw
                          ),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            k(
              "div",
              {
                class: Vr(
                  o.isActive
                    ? "popup-mobile-menu  active"
                    : "popup-mobile-menu "
                ),
              },
              [
                k("div", nw, [
                  k("div", iw, [
                    k("div", rw, [
                      sw,
                      k("div", ow, [
                        k(
                          "button",
                          {
                            class: "close-button rbt-round-btn",
                            onClick:
                              t[1] ||
                              (t[1] = (...y) =>
                                l.popupMobileMenu && l.popupMobileMenu(...y)),
                          },
                          lw
                        ),
                      ]),
                    ]),
                    cw,
                    k("nav", uw, [
                      k("ul", fw, [
                        k(
                          "li",
                          {
                            class: "has-dropdown has-menu-child-item",
                            onClick:
                              t[2] ||
                              (t[2] = (...y) =>
                                l.handleToggleFeature &&
                                l.handleToggleFeature(...y)),
                          },
                          [
                            hw,
                            k(
                              "ul",
                              {
                                class: "submenu",
                                style: Ai(
                                  o.isActiveFeature
                                    ? "    display: block"
                                    : "    display: none"
                                ),
                              },
                              Sw,
                              4
                            ),
                          ]
                        ),
                        k(
                          "li",
                          {
                            class: "has-dropdown has-menu-child-item",
                            onClick:
                              t[3] ||
                              (t[3] = (...y) =>
                                l.handleToggleExtend &&
                                l.handleToggleExtend(...y)),
                          },
                          [
                            Pw,
                            k(
                              "ul",
                              {
                                class: "submenu",
                                style: Ai(
                                  o.isActiveExtend
                                    ? "    display: block"
                                    : "    display: none"
                                ),
                              },
                              Bw,
                              4
                            ),
                          ]
                        ),
                        k(
                          "li",
                          {
                            class: "has-dropdown has-menu-child-item",
                            onClick:
                              t[4] ||
                              (t[4] = (...y) =>
                                l.handleToggleBlog && l.handleToggleBlog(...y)),
                          },
                          [
                            Fw,
                            k(
                              "ul",
                              {
                                class: "submenu",
                                style: Ai(
                                  o.isActiveBlog
                                    ? "    display: block"
                                    : "    display: none"
                                ),
                              },
                              [
                                (ln(!0),
                                kr(
                                  an,
                                  null,
                                  Rl(
                                    o.totalCategory,
                                    (y, T) => (
                                      ln(),
                                      kr(
                                        "li",
                                        {
                                          class: "has-dropdown",
                                          key: "birthday_" + T,
                                          value: y._id,
                                        },
                                        [
                                          k(
                                            "a",
                                            {
                                              href:
                                                "/post?post_category=" + y._id,
                                            },
                                            yl(y.category_title),
                                            9,
                                            qw
                                          ),
                                        ],
                                        8,
                                        $w
                                      )
                                    )
                                  ),
                                  128
                                )),
                              ],
                              4
                            ),
                          ]
                        ),
                        Uw,
                        Ww,
                      ]),
                    ]),
                    zw,
                  ]),
                  Vw,
                ]),
              ],
              2
            ),
            Pt(p),
          ]),
        ]),
        Yw,
      ]),
      _: 1,
    })
  );
}
const Qw = d0(p0, [["render", Kw]]),
  Jw = {
    __name: "nuxt-error-page",
    props: { error: Object },
    setup(e) {
      const n = e.error;
      (n.stack || "")
        .split(
          `
`
        )
        .splice(1)
        .map((A) => ({
          text: A.replace("webpack:/", "").replace(".vue", ".js").trim(),
          internal:
            (A.includes("node_modules") && !A.includes(".cache")) ||
            A.includes("internal") ||
            A.includes("new Promise"),
        }))
        .map(
          (A) =>
            `<span class="stack${A.internal ? " internal" : ""}">${
              A.text
            }</span>`
        ).join(`
`);
      const r = Number(n.statusCode || 500),
        o = r === 404,
        l = n.statusMessage ?? (o ? "Page Not Found" : "Internal Server Error"),
        p = n.message || n.toString(),
        g = void 0,
        w = o
          ? Sl(() =>
              Ms(
                () => import("./error-404.7e5a35ca.js"),
                [
                  "./error-404.7e5a35ca.js",
                  "./vue.f36acd1f.7592cce5.js",
                  "./error-404.7fc72018.css",
                ],
                import.meta.url
              ).then((A) => A.default || A)
            )
          : Sl(() =>
              Ms(
                () => import("./error-500.45607bc4.js"),
                [
                  "./error-500.45607bc4.js",
                  "./vue.f36acd1f.7592cce5.js",
                  "./error-500.c5df6088.css",
                ],
                import.meta.url
              ).then((A) => A.default || A)
            );
      return (A, P) => (
        ln(),
        oi(
          _t(w),
          Bh(
            Zu({
              statusCode: _t(r),
              statusMessage: _t(l),
              description: _t(p),
              stack: _t(g),
            })
          ),
          null,
          16
        )
      );
    },
  },
  Gw = Jw,
  Xw = {
    __name: "nuxt-root",
    setup(e) {
      const t = () => null,
        n = It(),
        r = n.deferHydration(),
        o = !1;
      Ir(_f, Ef()), n.hooks.callHookWith((g) => g.map((y) => y()), "vue:setup");
      const l = Js();
      Hu((g, y, T) => {
        if (
          (n.hooks
            .callHook("vue:error", g, y, T)
            .catch((w) => console.error("[nuxt] Error in `vue:error` hook", w)),
          sy(g) && (g.fatal || g.unhandled))
        )
          return n.runWithContext(() => Vi(g)), !1;
      });
      const p = !1;
      return (g, y) => (
        ln(),
        oi(
          Hd,
          { onResolve: _t(r) },
          {
            default: Na(() => [
              _t(l)
                ? (ln(),
                  oi(_t(Gw), { key: 0, error: _t(l) }, null, 8, ["error"]))
                : _t(p)
                ? (ln(),
                  oi(_t(t), { key: 1, context: _t(p) }, null, 8, ["context"]))
                : _t(o)
                ? (ln(), oi(tp(_t(o)), { key: 2 }))
                : (ln(), oi(_t(Qw), { key: 3 })),
            ]),
            _: 1,
          },
          8,
          ["onResolve"]
        )
      );
    },
  },
  nu = Xw;
globalThis.$fetch || (globalThis.$fetch = zg.create({ baseURL: Yg() }));
let iu;
{
  let e;
  (iu = async function () {
    var l, p;
    if (e) return e;
    const r = !!(
        ((l = window.__NUXT__) != null && l.serverRendered) ||
        ((p = document.getElementById("__NUXT_DATA__")) == null
          ? void 0
          : p.dataset.ssr) === "true"
      )
        ? eg(nu)
        : Zp(nu),
      o = om({ vueApp: r });
    try {
      await lm(o, Ib);
    } catch (g) {
      await o.callHook("app:error", g),
        (o.payload.error = o.payload.error || g);
    }
    try {
      await o.hooks.callHook("app:created", r),
        await o.hooks.callHook("app:beforeMount", r),
        r.mount(cy),
        await o.hooks.callHook("app:mounted", r),
        await Yr();
    } catch (g) {
      await o.callHook("app:error", g),
        (o.payload.error = o.payload.error || g);
    }
    return r;
  }),
    (e = iu().catch((t) => {
      console.error("Error while mounting app:", t);
    }));
}
export {
  t1 as A,
  r1 as B,
  n1 as C,
  gs as D,
  zd as E,
  Wd as F,
  ca as G,
  Cp as H,
  a1 as I,
  an as J,
  Rl as K,
  i1 as L,
  eu as M,
  d0 as _,
  oy as a,
  cc as b,
  En as c,
  Vs as d,
  Jd as e,
  o1 as f,
  nf as g,
  Kr as h,
  ep as i,
  mg as j,
  af as k,
  It as l,
  ln as m,
  s1 as n,
  Lu as o,
  Qs as p,
  kr as q,
  ci as r,
  k as s,
  yl as t,
  Ii as u,
  Pt as v,
  oa as w,
  Na as x,
  bn as y,
  e1 as z,
};
