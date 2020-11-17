/*!
 * ueditor
 * version: 1.4.3
 * build: Wed Nov 22 2017 21:24:55 GMT+0800 (中国标准时间)
 */
var $jscomp = {
	scope: {},
	findInternal: function(A, H, D) {
		A instanceof String && (A = String(A));
		for (var p = A.length, F = 0; F < p; F++) {
			var t = A[F];
			if (H.call(D, t, F, A)) return {
				i: F,
				v: t
			}
		}
		return {
			i: -1,
			v: void 0
		}
	}
};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(A, H, D) {
	if (D.get || D.set) throw new TypeError("ES3 does not support getters and setters.");
	A != Array.prototype && A != Object.prototype && (A[H] = D.value)
};
$jscomp.getGlobal = function(A) {
	return "undefined" != typeof window && window === A ? A : "undefined" != typeof global ? global : A
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(A, H, D, p) {
	if (H) {
		D = $jscomp.global;
		A = A.split(".");
		for (p = 0; p < A.length - 1; p++) {
			var F = A[p];
			F in D || (D[F] = {});
			D = D[F]
		}
		A = A[A.length - 1];
		p = D[A];
		H = H(p);
		H != p && null != H && $jscomp.defineProperty(D, A, {
			configurable: !0,
			writable: !0,
			value: H
		})
	}
};
$jscomp.polyfill("Array.prototype.find", function(A) {
	return A ? A : function(A, D) {
		return $jscomp.findInternal(this, A, D).v
	}
}, "es6-impl", "es3");
$jscomp.checkStringArgs = function(A, H, D) {
	if (null == A) throw new TypeError("The 'this' value for String.prototype." + D + " must not be null or undefined");
	if (H instanceof RegExp) throw new TypeError("First argument to String.prototype." + D + " must not be a regular expression");
	return A + ""
};
$jscomp.polyfill("String.prototype.repeat", function(A) {
	return A ? A : function(A) {
		var D = $jscomp.checkStringArgs(this, null, "repeat");
		if (0 > A || 1342177279 < A) throw new RangeError("Invalid count value");
		A |= 0;
		for (var p = ""; A;) if (A & 1 && (p += D), A >>>= 1) D += D;
		return p
	}
}, "es6-impl", "es3");
(function() {
	function A(c, a, e) {
		var b;
		a = a.toLowerCase();
		return (b = c.__allListeners || e && (c.__allListeners = {})) && (b[a] || e && (b[a] = []))
	}
	function H(c, a, e, b, f, h) {
		b = b && c[a];
		var d;
		for (!b && (b = c[e]); !b && (d = (d || c).parentNode);) {
			if ("BODY" == d.tagName || h && !h(d)) return null;
			b = d[e]
		}
		return b && f && !f(b) ? H(b, a, e, !1, f) : b
	}
	function D(c) {
		var a = 0,
			e = !1;
		c.children().each(function() {
			jQuery(this).data("width") && "fix" != jQuery(this).data("width") ? (this.style.width = jQuery(this).data("width"), e = !0) : "" == this.style.width || 0 < this.style.width.search("%") || "fix" == jQuery(this).data("width") || 0 < this.style.width.search("em") ? e = !0 : a += parseInt(this.style.width.replace("px", ""))
		});
		0 == e && 360 < a && c.children().each(function() {
			this.style.width = 100 * parseInt(this.style.width.replace("px", "")) / a + "%"
		})
	}
	UEDITOR_CONFIG = window.UEDITOR_CONFIG || {};
	var p = window.baidu || {};
	window.baidu = p;
	window.UE = p.editor = {
		plugins: {},
		commands: {},
		instants: {},
		I18N: {},
		_customizeUI: {},
		version: "1.5.0"
	};
	var F = UE.dom = {},
		t = UE.browser = function() {
			var c = navigator.userAgent.toLowerCase(),
				a = window.opera,
				e = {
					ie: /(msie\s|trident.*rv:)([\w.]+)/i.test(c),
					opera: !! a && a.version,
					webkit: -1 < c.indexOf(" applewebkit/"),
					mac: -1 < c.indexOf("macintosh"),
					quirks: "BackCompat" == document.compatMode
				};
			e.gecko = "Gecko" == navigator.product && !e.webkit && !e.opera && !e.ie;
			var b = 0;
			if (e.ie) {
				var b = c.match(/(?:msie\s([\w.]+))/),
					f = c.match(/(?:trident.*rv:([\w.]+))/),
					b = b && f && b[1] && f[1] ? Math.max(1 * b[1], 1 * f[1]) : b && b[1] ? 1 * b[1] : f && f[1] ? 1 * f[1] : 0;
				e.ie11Compat = 11 == document.documentMode;
				e.ie9Compat = 9 == document.documentMode;
				e.ie8 = !! document.documentMode;
				e.ie8Compat = 8 == document.documentMode;
				e.ie7Compat = 7 == b && !document.documentMode || 7 == document.documentMode;
				e.ie6Compat = 7 > b || e.quirks;
				e.ie9above = 8 < b;
				e.ie9below = 9 > b;
				e.ie11above = 10 < b;
				e.ie11below = 11 > b
			}
			e.gecko && (f = c.match(/rv:([\d\.]+)/)) && (f = f[1].split("."), b = 1E4 * f[0] + 100 * (f[1] || 0) + 1 * (f[2] || 0));
			/chrome\/(\d+\.\d)/i.test(c) && (e.chrome = +RegExp.$1);
			/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(c) && !/chrome/i.test(c) && (e.safari = +(RegExp.$1 || RegExp.$2));
			e.opera && (b = parseFloat(a.version()));
			e.webkit && (b = parseFloat(c.match(/ applewebkit\/(\d+)/)[1]));
			e.version = b;
			e.isCompatible = !e.mobile && (e.ie && 6 <= b || e.gecko && 10801 <= b || e.opera && 9.5 <= b || e.air && 1 <= b || e.webkit && 522 <= b || !1);
			return e
		}(),
		M = t.ie,
		ja = t.opera,
		q = UE.utils = {
			each: function(c, a, e) {
				if (null != c) if (c.length === +c.length) for (var b = 0, f = c.length; b < f; b++) {
					if (!1 === a.call(e, c[b], b, c)) return !1
				} else for (b in c) if (c.hasOwnProperty(b) && !1 === a.call(e, c[b], b, c)) return !1
			},
			makeInstance: function(c) {
				var a = new Function;
				a.prototype = c;
				c = new a;
				a.prototype = null;
				return c
			},
			extend: function(c, a, e) {
				if (a) for (var b in a) e && c.hasOwnProperty(b) || (c[b] = a[b]);
				return c
			},
			extend2: function(c) {
				for (var a = arguments, e = 1; e < a.length; e++) {
					var b = a[e],
						f;
					for (f in b) c.hasOwnProperty(f) || (c[f] = b[f])
				}
				return c
			},
			inherits: function(c, a) {
				var e = c.prototype,
					b = q.makeInstance(a.prototype);
				q.extend(b, e, !0);
				c.prototype = b;
				return b.constructor = c
			},
			bind: function(c, a) {
				return function() {
					return c.apply(a, arguments)
				}
			},
			defer: function(c, a, e) {
				var b;
				return function() {
					e && clearTimeout(b);
					b = setTimeout(c, a)
				}
			},
			indexOf: function(c, a, e) {
				var b = -1;
				e = this.isNumber(e) ? e : 0;
				this.each(c, function(f, h) {
					if (h >= e && f === a) return b = h, !1
				});
				return b
			},
			removeItem: function(c, a) {
				for (var e = 0, b = c.length; e < b; e++) c[e] === a && (c.splice(e, 1), e--)
			},
			trim: function(c) {
				return c.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, "")
			},
			listToMap: function(c) {
				if (!c) return {};
				c = q.isArray(c) ? c : c.split(",");
				for (var a = 0, e, b = {}; e = c[a++];) b[e.toUpperCase()] = b[e] = 1;
				return b
			},
			unhtml: function(c, a) {
				return c ? c.replace(a || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g, function(a, b) {
					return b ? a : {
						"<": "&lt;",
						"&": "&amp;",
						'"': "&quot;",
						">": "&gt;",
						"'": "&#39;"
					}[a]
				}) : ""
			},
			html: function(c) {
				return c ? c.replace(/&((g|l|quo)t|amp|#39|nbsp);/g, function(a) {
					return {
						"&lt;": "<",
						"&amp;": "&",
						"&quot;": '"',
						"&gt;": ">",
						"&#39;": "'",
						"&nbsp;": " "
					}[a]
				}) : ""
			},
			cssStyleToDomStyle: function() {
				var c = document.createElement("div").style,
					a = {
						"float": void 0 != c.cssFloat ? "cssFloat" : void 0 != c.styleFloat ? "styleFloat" : "float"
					};
				return function(e) {
					return a[e] || (a[e] = e.toLowerCase().replace(/-./g, function(a) {
						return a.charAt(1).toUpperCase()
					}))
				}
			}(),
			loadFile: function() {
				function c(e, b) {
					try {
						for (var f = 0, h; h = a[f++];) if (h.doc === e && h.url == (b.src || b.href)) return h
					} catch (d) {
						return null
					}
				}
				var a = [];
				return function(e, b, f) {
					var h = c(e, b);
					if (h) h.ready ? f && f() : h.funs.push(f);
					else if (a.push({
						doc: e,
						url: b.src || b.href,
						funs: [f]
					}), !e.body) {
						f = [];
						for (var d in b)"tag" != d && f.push(d + '="' + b[d] + '"');
						e.write("<" + b.tag + " " + f.join(" ") + " ></" + b.tag + ">")
					} else if (!b.id || !e.getElementById(b.id)) {
						var l = e.createElement(b.tag);
						delete b.tag;
						for (d in b) l.setAttribute(d, b[d]);
						l.onload = l.onreadystatechange = function() {
							if (!this.readyState || /loaded|complete/.test(this.readyState)) {
								h = c(e, b);
								if (0 < h.funs.length) {
									h.ready = 1;
									for (var k; k = h.funs.pop();) k()
								}
								l.onload = l.onreadystatechange = null
							}
						};
						l.onerror = function() {
							throw Error("The load " + (b.href || b.src) + " fails,check the url settings of file ueditor.config.js ");
						};
						e.getElementsByTagName("head")[0].appendChild(l)
					}
				}
			}(),
			isEmptyObject: function(c) {
				if (null == c) return !0;
				if (this.isArray(c) || this.isString(c)) return 0 === c.length;
				for (var a in c) if (c.hasOwnProperty(a)) return !1;
				return !0
			},
			fixColor: function(c, a) {
				if (/color/i.test(c) && /rgba?/.test(a)) {
					var e = a.split(",");
					if (3 < e.length) return "";
					a = "#";
					for (var b = 0, f; f = e[b++];) f = parseInt(f.replace(/[^\d]/gi, ""), 10).toString(16), a += 1 == f.length ? "0" + f : f;
					a = a.toUpperCase()
				}
				return a
			},
			optCss: function(c) {
				function a(a, b) {
					if (!a) return "";
					var d = a.top,
						f = a.bottom,
						k = a.left,
						h = a.right,
						e = "";
					if (d && k && f && h) e += ";" + b + ":" + (d == f && f == k && k == h ? d : d == f && k == h ? d + " " + k : k == h ? d + " " + k + " " + f : d + " " + h + " " + f + " " + k) + ";";
					else for (var c in a) e += ";" + b + "-" + c + ":" + a[c] + ";";
					return e
				}
				var e, b;
				c = c.replace(/(padding|margin|border)\-([^:]+):([^;]+);?/gi, function(a, h, d, l) {
					if (1 == l.split(" ").length) switch (h) {
					case "padding":
						return !e && (e = {}), e[d] = l, "";
					case "margin":
						return !b && (b = {}), b[d] = l, "";
					case "border":
						return "initial" == l ? "" : a
					}
					return a
				});
				c += a(e, "padding") + a(b, "margin");
				return c.replace(/^[ \n\r\t;]*|[ \n\r\t]*$/, "").replace(/;([ \n\r\t]+)|\1;/g, ";").replace(/(&((l|g)t|quot|#39))?;{2,}/g, function(a, b) {
					return b ? b + ";;" : ";"
				})
			},
			clone: function(c, a) {
				var e;
				a = a || {};
				for (var b in c) c.hasOwnProperty(b) && (e = c[b], "object" == typeof e ? (a[b] = q.isArray(e) ? [] : {}, q.clone(c[b], a[b])) : a[b] = e);
				return a
			},
			transUnitToPx: function(c) {
				if (!/(pt|cm)/.test(c)) return c;
				var a;
				c.replace(/([\d.]+)(\w+)/, function(e, b, f) {
					c = b;
					a = f
				});
				switch (a) {
				case "cm":
					c = 25 * parseFloat(c);
					break;
				case "pt":
					c = Math.round(96 * parseFloat(c) / 72)
				}
				return c + (c ? "px" : "")
			},
			domReady: function() {
				function c(e) {
					for (e.isReady = !0; e = a.pop(); e());
				}
				var a = [];
				return function(e, b) {
					b = b || window;
					var f = b.document;
					e && a.push(e);
					"complete" === f.readyState ? c(f) : (f.isReady && c(f), t.ie && 11 != t.version ? (function() {
						if (!f.isReady) {
							try {
								f.documentElement.doScroll("left")
							} catch (h) {
								setTimeout(arguments.callee, 0);
								return
							}
							c(f)
						}
					}(), b.attachEvent("onload", function() {
						c(f)
					})) : (f.addEventListener("DOMContentLoaded", function() {
						f.removeEventListener("DOMContentLoaded", arguments.callee, !1);
						c(f)
					}, !1), b.addEventListener("load", function() {
						c(f)
					}, !1)))
				}
			}(),
			cssRule: t.ie && 11 != t.version ?
			function(c, a, e) {
				var b, f;
				if (void 0 === a || a && a.nodeType && 9 == a.nodeType) {
					if (e = a && a.nodeType && 9 == a.nodeType ? a : e || document, b = e.indexList || (e.indexList = {}), f = b[c], void 0 !== f) return e.styleSheets[f].cssText
				} else {
					e = e || document;
					b = e.indexList || (e.indexList = {});
					f = b[c];
					if ("" === a) return void 0 !== f ? (e.styleSheets[f].cssText = "", delete b[c], !0) : !1;
					void 0 !== f ? sheetStyle = e.styleSheets[f] : (sheetStyle = e.createStyleSheet("", f = e.styleSheets.length), b[c] = f);
					sheetStyle.cssText = a
				}
			} : function(c, a, e) {
				var b;
				if (void 0 === a || a && a.nodeType && 9 == a.nodeType) return e = a && a.nodeType && 9 == a.nodeType ? a : e || document, (b = e.getElementById(c)) ? b.innerHTML : void 0;
				e = e || document;
				b = e.getElementById(c);
				if ("" === a) return b ? (b.parentNode.removeChild(b), !0) : !1;
				b ? b.innerHTML = a : (b = e.createElement("style"), b.id = c, b.innerHTML = a, e.getElementsByTagName("head")[0].appendChild(b))
			},
			sort: function(c, a) {
				a = a ||
				function(a, k) {
					return a.localeCompare(k)
				};
				for (var e = 0, b = c.length; e < b; e++) for (var f = e, h = c.length; f < h; f++) if (0 < a(c[e], c[f])) {
					var d = c[e];
					c[e] = c[f];
					c[f] = d
				}
				return c
			},
			serializeParam: function(c) {
				var a = [],
					e;
				for (e in c) if ("method" != e && "timeout" != e && "async" != e) if ("function" != (typeof c[e]).toLowerCase() && "object" != (typeof c[e]).toLowerCase()) a.push(encodeURIComponent(e) + "=" + encodeURIComponent(c[e]));
				else if (q.isArray(c[e])) for (var b = 0; b < c[e].length; b++) a.push(encodeURIComponent(e) + "[]=" + encodeURIComponent(c[e][b]));
				return a.join("&")
			},
			formatUrl: function(c) {
				c = c.replace(/&&/g, "&");
				c = c.replace(/\?&/g, "?");
				c = c.replace(/&$/g, "");
				c = c.replace(/&#/g, "#");
				return c = c.replace(/&+/g, "&")
			},
			isCrossDomainUrl: function(c) {
				var a = document.createElement("a");
				a.href = c;
				t.ie && (a.href = a.href);
				return !(a.protocol == location.protocol && a.hostname == location.hostname && (a.port == location.port || "80" == a.port && "" == location.port || "" == a.port && "80" == location.port))
			},
			clearEmptyAttrs: function(c) {
				for (var a in c)"" === c[a] && delete c[a];
				return c
			},
			str2json: function(c) {
				return q.isString(c) ? window.JSON ? JSON.parse(c) : (new Function("return " + q.trim(c || "")))() : null
			},
			json2str: function() {
				if (window.JSON) return JSON.stringify;
				var c = function(a) {
						return 10 > a ? "0" + a : a
					},
					a = function(a) {
						/["\\-]/.test(a) && (a = a.replace(/["\\-]/g, function(a) {
							var b = e[a];
							if (b) return b;
							b = a.charCodeAt();
							return "\\u00" + Math.floor(b / 16).toString(16) + (b % 16).toString(16)
						}));
						return '"' + a + '"'
					},
					e = {
						"\b": "\\b",
						"\t": "\\t",
						"\n": "\\n",
						"\f": "\\f",
						"\r": "\\r",
						'"': '\\"',
						"\\": "\\\\"
					};
				return function(b) {
					switch (typeof b) {
					case "undefined":
						return "undefined";
					case "number":
						return isFinite(b) ? String(b) : "null";
					case "string":
						return a(b);
					case "boolean":
						return String(b);
					default:
						if (null === b) return "null";
						if (q.isArray(b)) {
							var f = ["["],
								h = b.length,
								d, l, k;
							for (l = 0; l < h; l++) switch (k = b[l], typeof k) {
							case "undefined":
							case "function":
							case "unknown":
								break;
							default:
								d && f.push(","), f.push(q.json2str(k)), d = 1
							}
							f.push("]");
							return f.join("")
						}
						if (q.isDate(b)) return '"' + b.getFullYear() + "-" + c(b.getMonth() + 1) + "-" + c(b.getDate()) + "T" + c(b.getHours()) + ":" + c(b.getMinutes()) + ":" + c(b.getSeconds()) + '"';
						d = ["{"];
						l = q.json2str;
						for (h in b) if (Object.prototype.hasOwnProperty.call(b, h)) switch (k = b[h], typeof k) {
						case "undefined":
						case "unknown":
						case "function":
							break;
						default:
							f && d.push(","), f = 1, d.push(l(h) + ":" + l(k))
						}
						d.push("}");
						return d.join("")
					}
				}
			}()
		};
	q.each("String Function Array Number RegExp Object Date".split(" "), function(c) {
		UE.utils["is" + c] = function(a) {
			return Object.prototype.toString.apply(a) == "[object " + c + "]"
		}
	});
	var Z = UE.EventBase = function() {};
	Z.prototype = {
		addListener: function(c, a) {
			c = q.trim(c).split(/\s+/);
			for (var e = 0, b; b = c[e++];) A(this, b, !0).push(a)
		},
		on: function(c, a) {
			return this.addListener(c, a)
		},
		off: function(c, a) {
			return this.removeListener(c, a)
		},
		trigger: function() {
			return this.fireEvent.apply(this, arguments)
		},
		removeListener: function(c, a) {
			c = q.trim(c).split(/\s+/);
			for (var e = 0, b; b = c[e++];) q.removeItem(A(this, b) || [], a)
		},
		fireEvent: function() {
			for (var c = arguments[0], c = q.trim(c).split(" "), a = 0, e; e = c[a++];) {
				var b = A(this, e),
					f, h, d;
				if (b) for (d = b.length; d--;) if (b[d]) {
					h = b[d].apply(this, arguments);
					if (!0 === h) return h;
					void 0 !== h && (f = h)
				}
				if (h = this["on" + e.toLowerCase()]) f = h.apply(this, arguments)
			}
			return f
		}
	};
	var y = F.dtd = function() {
			function c(a) {
				for (var k in a) a[k.toUpperCase()] = a[k];
				return a
			}
			var a = q.extend2,
				e = c({
					isindex: 1,
					fieldset: 1
				}),
				b = c({
					input: 1,
					button: 1,
					select: 1,
					textarea: 1,
					label: 1
				}),
				f = a(c({
					a: 1
				}), b),
				h = a({
					iframe: 1
				}, f),
				d = c({
					hr: 1,
					ul: 1,
					menu: 1,
					div: 1,
					blockquote: 1,
					noscript: 1,
					table: 1,
					center: 1,
					address: 1,
					dir: 1,
					pre: 1,
					h5: 1,
					dl: 1,
					h4: 1,
					noframes: 1,
					h6: 1,
					ol: 1,
					h1: 1,
					h3: 1,
					h2: 1
				}),
				l = c({
					ins: 1,
					del: 1,
					script: 1,
					style: 1
				}),
				k = a(c({
					mark: 1,
					b: 1,
					acronym: 1,
					bdo: 1,
					"var": 1,
					"#": 1,
					abbr: 1,
					code: 1,
					br: 1,
					i: 1,
					cite: 1,
					kbd: 1,
					u: 1,
					strike: 1,
					s: 1,
					tt: 1,
					strong: 1,
					q: 1,
					samp: 1,
					em: 1,
					dfn: 1,
					span: 1
				}), l),
				n = a(c({
					sub: 1,
					img: 1,
					embed: 1,
					object: 1,
					sup: 1,
					basefont: 1,
					map: 1,
					applet: 1,
					font: 1,
					big: 1,
					small: 1
				}), k),
				m = a(c({
					p: 1
				}), n),
				b = a(c({
					iframe: 1
				}), n, b),
				n = c({
					img: 1,
					embed: 1,
					noscript: 1,
					br: 1,
					kbd: 1,
					center: 1,
					button: 1,
					basefont: 1,
					h5: 1,
					h4: 1,
					samp: 1,
					h6: 1,
					ol: 1,
					h1: 1,
					h3: 1,
					h2: 1,
					form: 1,
					font: 1,
					"#": 1,
					select: 1,
					menu: 1,
					ins: 1,
					abbr: 1,
					label: 1,
					code: 1,
					table: 1,
					script: 1,
					cite: 1,
					input: 1,
					iframe: 1,
					strong: 1,
					textarea: 1,
					noframes: 1,
					big: 1,
					small: 1,
					span: 1,
					hr: 1,
					sub: 1,
					bdo: 1,
					"var": 1,
					div: 1,
					object: 1,
					sup: 1,
					strike: 1,
					dir: 1,
					map: 1,
					dl: 1,
					applet: 1,
					del: 1,
					isindex: 1,
					fieldset: 1,
					ul: 1,
					b: 1,
					acronym: 1,
					a: 1,
					blockquote: 1,
					i: 1,
					u: 1,
					s: 1,
					tt: 1,
					address: 1,
					q: 1,
					pre: 1,
					p: 1,
					em: 1,
					dfn: 1
				}),
				g = a(c({
					a: 0
				}), b),
				u = c({
					tr: 1
				}),
				v = c({
					"#": 1
				}),
				w = a(c({
					param: 1
				}), n),
				x = a(c({
					form: 1
				}), e, h, d, m),
				E = c({
					li: 1,
					ol: 1,
					ul: 1
				}),
				J = c({
					style: 1,
					script: 1
				}),
				R = c({
					base: 1,
					link: 1,
					meta: 1,
					title: 1
				}),
				J = a(R, J),
				O = c({
					head: 1,
					body: 1
				}),
				ka = c({
					html: 1
				}),
				p = c({
					address: 1,
					blockquote: 1,
					center: 1,
					dir: 1,
					div: 1,
					dl: 1,
					fieldset: 1,
					form: 1,
					h1: 1,
					h2: 1,
					h3: 1,
					h4: 1,
					h5: 1,
					h6: 1,
					hr: 1,
					isindex: 1,
					menu: 1,
					noframes: 1,
					ol: 1,
					p: 1,
					pre: 1,
					table: 1,
					ul: 1
				}),
				t = c({
					area: 1,
					base: 1,
					basefont: 1,
					br: 1,
					col: 1,
					command: 1,
					dialog: 1,
					hr: 1,
					img: 1,
					input: 1,
					isindex: 1,
					keygen: 1,
					link: 1,
					meta: 1,
					param: 1,
					source: 1,
					track: 1,
					wbr: 1
				});
			return c({
				$nonBodyContent: a(ka, O, R),
				$block: p,
				$inline: g,
				$inlineWithA: a(c({
					a: 1
				}), g),
				$body: a(c({
					script: 1,
					style: 1
				}), p),
				$cdata: c({
					script: 1,
					style: 1
				}),
				$empty: t,
				$nonChild: c({
					iframe: 1,
					textarea: 1,
					embed: 1
				}),
				$listItem: c({
					dd: 1,
					dt: 1,
					li: 1
				}),
				$list: c({
					ul: 1,
					ol: 1,
					dl: 1
				}),
				$isNotEmpty: c({
					table: 1,
					ul: 1,
					ol: 1,
					dl: 1,
					iframe: 1,
					area: 1,
					base: 1,
					col: 1,
					hr: 1,
					img: 1,
					embed: 1,
					input: 1,
					link: 1,
					meta: 1,
					param: 1,
					h1: 1,
					h2: 1,
					h3: 1,
					h4: 1,
					h5: 1,
					h6: 1
				}),
				$removeEmpty: c({
					a: 1,
					abbr: 1,
					acronym: 1,
					address: 1,
					b: 1,
					bdo: 1,
					big: 1,
					cite: 1,
					code: 1,
					del: 1,
					dfn: 1,
					em: 1,
					font: 1,
					i: 1,
					ins: 1,
					label: 1,
					kbd: 1,
					q: 1,
					s: 1,
					samp: 1,
					small: 1,
					span: 1,
					strike: 1,
					strong: 1,
					sub: 1,
					sup: 1,
					tt: 1,
					u: 1,
					"var": 1
				}),
				$removeEmptyBlock: c({
					p: 1,
					div: 1
				}),
				$tableContent: c({
					caption: 1,
					col: 1,
					colgroup: 1,
					tbody: 1,
					td: 1,
					tfoot: 1,
					th: 1,
					thead: 1,
					tr: 1,
					table: 1
				}),
				$notTransContent: c({
					pre: 1,
					script: 1,
					style: 1,
					textarea: 1
				}),
				html: O,
				head: J,
				style: v,
				script: v,
				body: x,
				base: {},
				link: {},
				meta: {},
				title: v,
				col: {},
				tr: c({
					td: 1,
					th: 1
				}),
				img: {},
				embed: {},
				colgroup: c({
					thead: 1,
					col: 1,
					tbody: 1,
					tr: 1,
					tfoot: 1
				}),
				noscript: x,
				td: x,
				br: {},
				th: x,
				center: x,
				kbd: g,
				button: a(m, d),
				basefont: {},
				h5: g,
				h4: g,
				samp: g,
				h6: g,
				ol: E,
				h1: g,
				h3: g,
				option: v,
				h2: g,
				form: a(e, h, d, m),
				select: c({
					optgroup: 1,
					option: 1
				}),
				font: g,
				ins: g,
				menu: E,
				abbr: g,
				label: g,
				table: c({
					thead: 1,
					col: 1,
					tbody: 1,
					tr: 1,
					colgroup: 1,
					caption: 1,
					tfoot: 1
				}),
				code: g,
				tfoot: u,
				cite: g,
				li: x,
				input: {},
				iframe: x,
				strong: g,
				textarea: v,
				noframes: x,
				big: g,
				small: g,
				span: c({
					"#": 1,
					br: 1,
					b: 1,
					strong: 1,
					u: 1,
					i: 1,
					em: 1,
					sub: 1,
					sup: 1,
					strike: 1,
					span: 1
				}),
				hr: g,
				dt: g,
				sub: g,
				optgroup: c({
					option: 1
				}),
				param: {},
				bdo: g,
				"var": g,
				div: x,
				object: w,
				sup: g,
				dd: x,
				strike: g,
				area: {},
				dir: E,
				map: a(c({
					area: 1,
					form: 1,
					p: 1
				}), e, l, d),
				applet: w,
				dl: c({
					dt: 1,
					dd: 1
				}),
				del: g,
				isindex: {},
				fieldset: a(c({
					legend: 1
				}), n),
				thead: u,
				ul: E,
				acronym: g,
				b: g,
				a: a(c({
					a: 1
				}), b),
				blockquote: a(c({
					td: 1,
					tr: 1,
					tbody: 1,
					li: 1
				}), x),
				caption: g,
				i: g,
				u: g,
				tbody: u,
				s: g,
				address: a(h, m),
				tt: g,
				legend: g,
				q: g,
				pre: a(k, f),
				p: a(c({
					a: 1
				}), g),
				em: g,
				dfn: g,
				mark: g
			})
		}(),
		ea = M && 9 > t.version ? {
			tabindex: "tabIndex",
			readonly: "readOnly",
			"for": "htmlFor",
			"class": "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder"
		} : {
			tabindex: "tabIndex",
			readonly: "readOnly"
		},
		ma = q.listToMap("-webkit-box -moz-box block list-item table table-row-group table-header-group table-footer-group table-row table-column-group table-column table-cell table-caption".split(" ")),
		g = F.domUtils = {
			NODE_ELEMENT: 1,
			NODE_DOCUMENT: 9,
			NODE_TEXT: 3,
			NODE_COMMENT: 8,
			NODE_DOCUMENT_FRAGMENT: 11,
			POSITION_IDENTICAL: 0,
			POSITION_DISCONNECTED: 1,
			POSITION_FOLLOWING: 2,
			POSITION_PRECEDING: 4,
			POSITION_IS_CONTAINED: 8,
			POSITION_CONTAINS: 16,
			fillChar: M && "6" == t.version ? "﻿" : "​",
			keys: {
				8: 1,
				46: 1,
				16: 1,
				17: 1,
				18: 1,
				37: 1,
				38: 1,
				39: 1,
				40: 1,
				13: 1
			},
			getPosition: function(c, a) {
				if (c === a) return 0;
				var e, b = [c],
					f = [a];
				for (e = c; e = e.parentNode;) {
					if (e === a) return 10;
					b.push(e)
				}
				for (e = a; e = e.parentNode;) {
					if (e === c) return 20;
					f.push(e)
				}
				b.reverse();
				f.reverse();
				if (b[0] !== f[0]) return 1;
				for (e = -1; e++, b[e] === f[e];);
				c = b[e];
				for (a = f[e]; c = c.nextSibling;) if (c === a) return 4;
				return 2
			},
			getNodeIndex: function(c, a) {
				for (var e = c, b = 0; e = e.previousSibling;) a && 3 == e.nodeType ? e.nodeType != e.nextSibling.nodeType && b++ : b++;
				return b
			},
			inDoc: function(c, a) {
				return 10 == g.getPosition(c, a)
			},
			findParent: function(c, a, e) {
				if (c && !g.isBody(c)) for (c = e ? c : c.parentNode; c;) {
					if (!a || a(c) || g.isBody(c)) return a && !a(c) && g.isBody(c) ? null : c;
					c = c.parentNode
				}
				return null
			},
			findParentByTagName: function(c, a, e, b) {
				a = q.listToMap(q.isArray(a) ? a : [a]);
				return g.findParent(c, function(f) {
					return a[f.tagName] && !(b && b(f))
				}, e)
			},
			findParents: function(c, a, e, b) {
				for (a = a && (e && e(c) || !e) ? [c] : []; c = g.findParent(c, e);) a.push(c);
				return b ? a : a.reverse()
			},
			insertAfter: function(c, a) {
				return c.nextSibling ? c.parentNode.insertBefore(a, c.nextSibling) : c.parentNode.appendChild(a)
			},
			remove: function(c, a) {
				var e = c.parentNode,
					b;
				if (e) {
					if (a && c.hasChildNodes()) for (; b = c.firstChild;) e.insertBefore(b, c);
					e.removeChild(c)
				}
				return c
			},
			getNextDomNode: function(c, a, e, b) {
				return H(c, "firstChild", "nextSibling", a, e, b)
			},
			getPreDomNode: function(c, a, e, b) {
				return H(c, "lastChild", "previousSibling", a, e, b)
			},
			isBookmarkNode: function(c) {
				return 1 == c.nodeType && c.id && /^_baidu_bookmark_/i.test(c.id)
			},
			getWindow: function(c) {
				c = c.ownerDocument || c;
				return c.defaultView || c.parentWindow
			},
			getCommonAncestor: function(c, a) {
				if (c === a) return c;
				for (var e = [c], b = [a], f = c, h = -1; f = f.parentNode;) {
					if (f === a) return f;
					e.push(f)
				}
				for (f = a; f = f.parentNode;) {
					if (f === c) return f;
					b.push(f)
				}
				e.reverse();
				for (b.reverse(); h++, e[h] === b[h];);
				return 0 == h ? null : e[h - 1]
			},
			clearEmptySibling: function(c, a, e) {
				function b(a, b) {
					for (var d; a && !g.isBookmarkNode(a) && (g.isEmptyInlineElement(a) || !(new RegExp("[^\t\n\r" + g.fillChar + "]")).test(a.nodeValue));) d = a[b], g.remove(a), a = d
				}!a && b(c.nextSibling, "nextSibling");
				!e && b(c.previousSibling, "previousSibling")
			},
			split: function(c, a) {
				var e = c.ownerDocument;
				if (t.ie && a == c.nodeValue.length) {
					var b = e.createTextNode("");
					return g.insertAfter(c, b)
				}
				b = c.splitText(a);
				t.ie8 && (e = e.createTextNode(""), g.insertAfter(b, e), g.remove(e));
				return b
			},
			isWhitespace: function(c) {
				return !(new RegExp("[^ \t\n\r" + g.fillChar + "]")).test(c.nodeValue)
			},
			getXY: function(c) {
				for (var a = 0, e = 0; c.offsetParent;) e += c.offsetTop, a += c.offsetLeft, c = c.offsetParent;
				return {
					x: a,
					y: e
				}
			},
			on: function(c, a, e) {
				var b = q.isArray(a) ? a : q.trim(a).split(/\s+/),
					f = b.length;
				if (f) for (; f--;) if (a = b[f], c.addEventListener) c.addEventListener(a, e, !1);
				else {
					e._d || (e._d = {
						els: []
					});
					var h = a + e.toString(),
						d = q.indexOf(e._d.els, c);
					e._d[h] && -1 != d || (-1 == d && e._d.els.push(c), e._d[h] || (e._d[h] = function(a) {
						return e.call(a.srcElement, a || window.event)
					}), c.attachEvent("on" + a, e._d[h]))
				}
				c = null
			},
			un: function(c, a, e) {
				var b = q.isArray(a) ? a : q.trim(a).split(/\s+/),
					f = b.length;
				if (f) for (; f--;) if (a = b[f], c.removeEventListener) c.removeEventListener(a, e, !1);
				else {
					var h = a + e.toString();
					try {
						c.detachEvent("on" + a, e._d ? e._d[h] : e)
					} catch (d) {}
					e._d && e._d[h] && (a = q.indexOf(e._d.els, c), -1 != a && e._d.els.splice(a, 1), 0 == e._d.els.length && delete e._d[h])
				}
			},
			isSameElement: function(c, a) {
				if (c.tagName != a.tagName) return !1;
				var e = c.attributes,
					b = a.attributes;
				if (!M && e.length != b.length) return !1;
				for (var f, h, d = 0, l = 0, k = 0; f = e[k++];) {
					if ("style" == f.nodeName) if (f.specified && d++, g.isSameStyle(c, a)) continue;
					else return !1;
					if (M) if (f.specified) d++, h = b.getNamedItem(f.nodeName);
					else continue;
					else h = a.attributes[f.nodeName];
					if (!h.specified || f.nodeValue != h.nodeValue) return !1
				}
				if (M) {
					for (k = 0; h = b[k++];) h.specified && l++;
					if (d != l) return !1
				}
				return !0
			},
			isSameStyle: function(c, a) {
				var e = c.style.cssText.replace(/( ?; ?)/g, ";").replace(/( ?: ?)/g, ":"),
					b = a.style.cssText.replace(/( ?; ?)/g, ";").replace(/( ?: ?)/g, ":");
				if (t.opera) {
					e = c.style;
					b = a.style;
					if (e.length != b.length) return !1;
					for (var f in e) if (!/^(\d+|csstext)$/i.test(f) && e[f] != b[f]) return !1;
					return !0
				}
				if (!e || !b) return e == b;
				e = e.split(";");
				b = b.split(";");
				if (e.length != b.length) return !1;
				f = 0;
				for (var h; h = e[f++];) if (-1 == q.indexOf(b, h)) return !1;
				return !0
			},
			isBlockElm: function(c) {
				return 1 == c.nodeType && (y.$block[c.tagName] || ma[g.getComputedStyle(c, "display")]) && !y.$nonChild[c.tagName]
			},
			isBody: function(c) {
				return c && 1 == c.nodeType && "body" == c.tagName.toLowerCase()
			},
			breakParent: function(c, a) {
				var e, b = c,
					f = c,
					h, d;
				do {
					b = b.parentNode;
					h ? (e = b.cloneNode(!1), e.appendChild(h), h = e, e = b.cloneNode(!1), e.appendChild(d), d = e) : (h = b.cloneNode(!1), d = h.cloneNode(!1));
					for (; e = f.previousSibling;) h.insertBefore(e, h.firstChild);
					for (; e = f.nextSibling;) d.appendChild(e);
					f = b
				} while (a !== b);
				e = a.parentNode;
				e.insertBefore(h, a);
				e.insertBefore(d, a);
				e.insertBefore(c, d);
				g.remove(a);
				return c
			},
			isEmptyInlineElement: function(c) {
				if (1 != c.nodeType || !y.$removeEmpty[c.tagName]) return 0;
				for (c = c.firstChild; c;) {
					if (g.isBookmarkNode(c) || 1 == c.nodeType && !g.isEmptyInlineElement(c) || 3 == c.nodeType && !g.isWhitespace(c)) return 0;
					c = c.nextSibling
				}
				return 1
			},
			trimWhiteTextNode: function(c) {
				function a(a) {
					for (var b;
					(b = c[a]) && 3 == b.nodeType && g.isWhitespace(b);) c.removeChild(b)
				}
				a("firstChild");
				a("lastChild")
			},
			mergeChild: function(c, a, e) {
				a = g.getElementsByTagName(c, c.tagName.toLowerCase());
				for (var b = 0, f; f = a[b++];) if (f.parentNode && !g.isBookmarkNode(f)) if ("span" == f.tagName.toLowerCase()) {
					if (c === f.parentNode && (g.trimWhiteTextNode(c), 1 == c.childNodes.length)) {
						c.style.cssText = f.style.cssText + ";" + c.style.cssText;
						g.remove(f, !0);
						continue
					}
					f.style.cssText = c.style.cssText + ";" + f.style.cssText;
					if (e) {
						var h = e.style;
						if (h) for (var h = h.split(";"), d = 0, l; l = h[d++];) f.style[q.cssStyleToDomStyle(l.split(":")[0])] = l.split(":")[1]
					}
					g.isSameStyle(f, c) && g.remove(f, !0)
				} else g.isSameElement(c, f) && g.remove(f, !0)
			},
			getElementsByTagName: function(c, a, e) {
				if (e && q.isString(e)) {
					var b = e;
					e = function(a) {
						return g.hasClass(a, b)
					}
				}
				a = q.trim(a).replace(/[ ]{2,}/g, " ").split(" ");
				for (var f = [], h = 0, d; d = a[h++];) {
					d = c.getElementsByTagName(d);
					for (var l = 0, k; k = d[l++];) e && !e(k) || f.push(k)
				}
				return f
			},
			mergeToParent: function(c) {
				for (var a = c.parentNode; a && y.$removeEmpty[a.tagName];) {
					if (a.tagName == c.tagName || "A" == a.tagName) {
						g.trimWhiteTextNode(a);
						if ("SPAN" == a.tagName && !g.isSameStyle(a, c) || "A" == a.tagName && "SPAN" == c.tagName) if (1 < a.childNodes.length || a !== c.parentNode) {
							c.style.cssText = a.style.cssText + ";" + c.style.cssText;
							a = a.parentNode;
							continue
						} else a.style.cssText += ";" + c.style.cssText, "A" == a.tagName && (a.style.textDecoration = "underline");
						if ("A" != a.tagName) {
							a === c.parentNode && g.remove(c, !0);
							break
						}
					}
					a = a.parentNode
				}
			},
			mergeSibling: function(c, a, e) {
				function b(a, b, d) {
					var f;
					if ((f = d[a]) && !g.isBookmarkNode(f) && 1 == f.nodeType && g.isSameElement(d, f)) {
						for (; f.firstChild;)"firstChild" == b ? d.insertBefore(f.lastChild, d.firstChild) : d.appendChild(f.firstChild);
						g.remove(f)
					}
				}!a && b("previousSibling", "firstChild", c);
				!e && b("nextSibling", "lastChild", c)
			},
			unSelectable: M && t.ie9below || t.opera ?
			function(c) {
				c.onselectstart = function() {
					return !1
				};
				c.onclick = c.onkeyup = c.onkeydown = function() {
					return !1
				};
				c.unselectable = "on";
				c.setAttribute("unselectable", "on");
				for (var a = 0, e; e = c.all[a++];) switch (e.tagName.toLowerCase()) {
				case "iframe":
				case "textarea":
				case "input":
				case "select":
					break;
				default:
					e.unselectable = "on", c.setAttribute("unselectable", "on")
				}
			} : function(c) {
				c.style.MozUserSelect = c.style.webkitUserSelect = c.style.msUserSelect = c.style.KhtmlUserSelect = "none"
			},
			removeAttributes: function(c, a) {
				a = q.isArray(a) ? a : q.trim(a).replace(/[ ]{2,}/g, " ").split(" ");
				for (var e = 0, b; b = a[e++];) {
					b = ea[b] || b;
					switch (b) {
					case "className":
						c[b] = "";
						break;
					case "style":
						c.style.cssText = "";
						var f = c.getAttributeNode("style");
						!t.ie && f && c.removeAttributeNode(f)
					}
					c.removeAttribute(b)
				}
			},
			createElement: function(c, a, e) {
				return g.setAttributes(c.createElement(a), e)
			},
			setAttributes: function(c, a) {
				for (var e in a) if (a.hasOwnProperty(e)) {
					var b = a[e];
					switch (e) {
					case "class":
						c.className = b;
						break;
					case "style":
						c.style.cssText = c.style.cssText + ";" + b;
						break;
					case "innerHTML":
						c[e] = b;
						break;
					case "value":
						c.value = b;
						break;
					default:
						c.setAttribute(ea[e] || e, b)
					}
				}
				return c
			},
			getComputedStyle: function(c, a) {
				if (-1 < "width height top left".indexOf(a)) return c["offset" + a.replace(/^\w/, function(a) {
					return a.toUpperCase()
				})] + "px";
				3 == c.nodeType && (c = c.parentNode);
				if (t.ie && 9 > t.version && "font-size" == a && !c.style.fontSize && !y.$empty[c.tagName] && !y.$nonChild[c.tagName]) {
					var e = c.ownerDocument.createElement("span");
					e.style.cssText = "padding:0;border:0;font-family:simsun;";
					e.innerHTML = ".";
					c.appendChild(e);
					var b = e.offsetHeight;
					c.removeChild(e);
					e = null;
					return b + "px"
				}
				try {
					e = g.getStyle(c, a) || (window.getComputedStyle ? g.getWindow(c).getComputedStyle(c, "").getPropertyValue(a) : (c.currentStyle || c.style)[q.cssStyleToDomStyle(a)])
				} catch (f) {
					return ""
				}
				return q.transUnitToPx(q.fixColor(a, e))
			},
			removeClasses: function(c, a) {
				a = q.isArray(a) ? a : q.trim(a).replace(/[ ]{2,}/g, " ").split(" ");
				for (var e = 0, b, f = c.className; b = a[e++];) f = f.replace(new RegExp("\\b" + b + "\\b"), "");
				(f = q.trim(f).replace(/[ ]{2,}/g, " ")) ? c.className = f : g.removeAttributes(c, ["class"])
			},
			addClass: function(c, a) {
				if (c) {
					a = q.trim(a).replace(/[ ]{2,}/g, " ").split(" ");
					for (var e = 0, b, f = c.className; b = a[e++];)(new RegExp("\\b" + b + "\\b")).test(f) || (f += " " + b);
					c.className = q.trim(f)
				}
			},
			hasClass: function(c, a) {
				if (q.isRegExp(a)) return a.test(c.className);
				a = q.trim(a).replace(/[ ]{2,}/g, " ").split(" ");
				for (var e = 0, b, f = c.className; b = a[e++];) if (!(new RegExp("\\b" + b + "\\b", "i")).test(f)) return !1;
				return e - 1 == a.length
			},
			preventDefault: function(c) {
				c.preventDefault ? c.preventDefault() : c.returnValue = !1
			},
			removeStyle: function(c, a) {
				t.ie ? ("color" == a && (a = "(^|;)" + a), c.style.cssText = c.style.cssText.replace(new RegExp(a + "[^:]*:[^;]+;?", "ig"), "")) : c.style.removeProperty ? c.style.removeProperty(a) : c.style.removeAttribute(q.cssStyleToDomStyle(a));
				c.style.cssText || g.removeAttributes(c, ["style"])
			},
			getStyle: function(c, a) {
				var e = c.style[q.cssStyleToDomStyle(a)];
				return q.fixColor(a, e)
			},
			setStyle: function(c, a, e) {
				c.style[q.cssStyleToDomStyle(a)] = e;
				q.trim(c.style.cssText) || this.removeAttributes(c, "style")
			},
			setStyles: function(c, a) {
				for (var e in a) a.hasOwnProperty(e) && g.setStyle(c, e, a[e])
			},
			removeDirtyAttr: function(c) {
				for (var a = 0, e, b = c.getElementsByTagName("*"); e = b[a++];) e.removeAttribute("_moz_dirty");
				c.removeAttribute("_moz_dirty")
			},
			getChildCount: function(c, a) {
				var e = 0,
					b = c.firstChild;
				for (a = a ||
				function() {
					return 1
				}; b;) a(b) && e++, b = b.nextSibling;
				return e
			},
			isEmptyNode: function(c) {
				return !c.firstChild || 0 == g.getChildCount(c, function(a) {
					return !g.isBr(a) && !g.isBookmarkNode(a) && !g.isWhitespace(a)
				})
			},
			clearSelectedArr: function(c) {
				for (var a; a = c.pop();) g.removeAttributes(a, ["class"])
			},
			scrollToView: function(c, a, e) {
				var b = function() {
						var b = a.document,
							h = "CSS1Compat" == b.compatMode;
						return {
							width: (h ? b.documentElement.clientWidth : b.body.clientWidth) || 0,
							height: (h ? b.documentElement.clientHeight : b.body.clientHeight) || 0
						}
					}().height;
				e = -1 * b + e + (c.offsetHeight || 0);
				c = g.getXY(c);
				e += c.y;
				c = function(a) {
					if ("pageXOffset" in a) return {
						x: a.pageXOffset || 0,
						y: a.pageYOffset || 0
					};
					a = a.document;
					return {
						x: a.documentElement.scrollLeft || a.body.scrollLeft || 0,
						y: a.documentElement.scrollTop || a.body.scrollTop || 0
					}
				}(a).y;
				(e > c || e < c - b) && a.scrollTo(0, e + (0 > e ? -20 : 20))
			},
			isBr: function(c) {
				return 1 == c.nodeType && "BR" == c.tagName
			},
			isFillChar: function(c, a) {
				if (3 != c.nodeType) return !1;
				var e = c.nodeValue;
				return a ? (new RegExp("^" + g.fillChar)).test(e) : !e.replace(new RegExp(g.fillChar, "g"), "").length
			},
			isStartInblock: function(c) {
				c = c.cloneRange();
				var a = 0,
					e = c.startContainer,
					b;
				if (1 == e.nodeType && e.childNodes[c.startOffset]) for (var e = e.childNodes[c.startOffset], f = e.previousSibling; f && g.isFillChar(f);) e = f, f = f.previousSibling;
				this.isFillChar(e, !0) && 1 == c.startOffset && (c.setStartBefore(e), e = c.startContainer);
				for (; e && g.isFillChar(e);) b = e, e = e.previousSibling;
				b && (c.setStartBefore(b), e = c.startContainer);
				for (1 == e.nodeType && g.isEmptyNode(e) && 1 == c.startOffset && c.setStart(e, 0).collapse(!0); !c.startOffset;) {
					e = c.startContainer;
					if (g.isBlockElm(e) || g.isBody(e)) {
						a = 1;
						break
					}
					var f = c.startContainer.previousSibling,
						h;
					if (f) {
						for (; f && g.isFillChar(f);) h = f, f = f.previousSibling;
						h ? c.setStartBefore(h) : c.setStartBefore(c.startContainer)
					} else c.setStartBefore(c.startContainer)
				}
				return a && !g.isBody(c.startContainer) ? 1 : 0
			},
			isEmptyBlock: function(c, a) {
				if (1 != c.nodeType) return 0;
				a = a || new RegExp("[  \t\r\n" + g.fillChar + "]", "g");
				if (0 < c[t.ie ? "innerText" : "textContent"].replace(a, "").length) return 0;
				for (var e in y.$isNotEmpty) if (c.getElementsByTagName(e).length) return 0;
				return 1
			},
			setViewportOffset: function(c, a) {
				var e = parseInt(c.style.left) | 0,
					b = parseInt(c.style.top) | 0,
					f = c.getBoundingClientRect(),
					h = a.left - f.left,
					f = a.top - f.top;
				h && (c.style.left = e + h + "px");
				f && (c.style.top = b + f + "px")
			},
			fillNode: function(c, a) {
				var e = t.ie ? c.createTextNode(g.fillChar) : c.createElement("br");
				a.innerHTML = "";
				a.appendChild(e)
			},
			moveChild: function(c, a, e) {
				for (; c.firstChild;) e && a.firstChild ? a.insertBefore(c.lastChild, a.firstChild) : a.appendChild(c.firstChild)
			},
			hasNoAttributes: function(c) {
				return t.ie ? /^<\w+\s*?>/.test(c.outerHTML) : 0 == c.attributes.length
			},
			isCustomeNode: function(c) {
				return 1 == c.nodeType && c.getAttribute("_ue_custom_node_")
			},
			isTagNode: function(c, a) {
				return 1 == c.nodeType && (new RegExp("\\b" + c.tagName + "\\b", "i")).test(a)
			},
			filterNodeList: function(c, a, e) {
				var b = [];
				if (!q.isFunction(a)) {
					var f = a;
					a = function(a) {
						return -1 != q.indexOf(q.isArray(f) ? f : f.split(" "), a.tagName.toLowerCase())
					}
				}
				q.each(c, function(f) {
					a(f) && b.push(f)
				});
				return 0 == b.length ? null : 1 != b.length && e ? b : b[0]
			},
			isInNodeEndBoundary: function(c, a) {
				var e = c.startContainer;
				if (3 == e.nodeType && c.startOffset != e.nodeValue.length || 1 == e.nodeType && c.startOffset != e.childNodes.length) return 0;
				for (; e !== a;) {
					if (e.nextSibling) return 0;
					e = e.parentNode
				}
				return 1
			},
			isBoundaryNode: function(c, a) {
				for (var e; !g.isBody(c);) if (e = c, c = c.parentNode, e !== c[a]) return !1;
				return !0
			},
			fillHtml: t.ie11below ? "&nbsp;" : "<br/>"
		},
		Q = new RegExp(g.fillChar, "g");
	(function() {
		function c(a) {
			return !a.collapsed && 1 == a.startContainer.nodeType && a.startContainer === a.endContainer && 1 == a.endOffset - a.startOffset
		}
		function a(a, k, b, d) {
			1 == k.nodeType && (y.$empty[k.tagName] || y.$nonChild[k.tagName]) && (b = g.getNodeIndex(k) + (a ? 0 : 1), k = k.parentNode);
			a ? (d.startContainer = k, d.startOffset = b, d.endContainer || d.collapse(!0)) : (d.endContainer = k, d.endOffset = b, d.startContainer || d.collapse(!1));
			d.collapsed = d.startContainer && d.endContainer && d.startContainer === d.endContainer && d.startOffset == d.endOffset;
			return d
		}
		function e(a, k) {
			var d = a.startContainer,
				b = a.endContainer,
				f = a.startOffset,
				l = a.endOffset,
				h = a.document,
				e = h.createDocumentFragment(),
				m, c;
			1 == d.nodeType && (d = d.childNodes[f] || (m = d.appendChild(h.createTextNode(""))));
			1 == b.nodeType && (b = b.childNodes[l] || (c = b.appendChild(h.createTextNode(""))));
			if (d === b && 3 == d.nodeType) return e.appendChild(h.createTextNode(d.substringData(f, l - f))), k && (d.deleteData(f, l - f), a.collapse(!0)), e;
			for (var n, q, p = e, t = g.findParents(d, !0), N = g.findParents(b, !0), I = 0; t[I] == N[I];) I++;
			for (var y = I, C; C = t[y]; y++) {
				n = C.nextSibling;
				C == d ? m || (3 == a.startContainer.nodeType ? (p.appendChild(h.createTextNode(d.nodeValue.slice(f))), k && d.deleteData(f, d.nodeValue.length - f)) : p.appendChild(k ? d : d.cloneNode(!0))) : (q = C.cloneNode(!1), p.appendChild(q));
				for (; n && n !== b && n !== N[y];) C = n.nextSibling, p.appendChild(k ? n : n.cloneNode(!0)), n = C;
				p = q
			}
			p = e;
			t[I] || (p.appendChild(t[I - 1].cloneNode(!1)), p = p.firstChild);
			for (y = I; f = N[y]; y++) {
				n = f.previousSibling;
				f == b ? c || 3 != a.endContainer.nodeType || (p.appendChild(h.createTextNode(b.substringData(0, l))), k && b.deleteData(0, l)) : (q = f.cloneNode(!1), p.appendChild(q));
				if (y != I || !t[I]) for (; n && n !== d;) f = n.previousSibling, p.insertBefore(k ? n : n.cloneNode(!0), p.firstChild), n = f;
				p = q
			}
			k && a.setStartBefore(N[I] ? t[I] ? N[I] : t[I - 1] : N[I - 1]).collapse(!0);
			m && g.remove(m);
			c && g.remove(c);
			return e
		}
		function b(a, k) {
			try {
				if (l && g.inDoc(l, a)) if (l.nodeValue.replace(Q, "").length) l.nodeValue = l.nodeValue.replace(Q, "");
				else {
					var d = l.parentNode;
					for (g.remove(l); d && g.isEmptyInlineElement(d) && (t.safari ? !(g.getPosition(d, k) & g.POSITION_CONTAINS) : !d.contains(k));) l = d.parentNode, g.remove(d), d = l
				}
			} catch (u) {}
		}
		function f(a, k) {
			var d;
			for (a = a[k]; a && g.isFillChar(a);) d = a[k], g.remove(a), a = d
		}
		var h = 0,
			d = g.fillChar,
			l, k = F.Range = function(a) {
				this.startContainer = this.startOffset = this.endContainer = this.endOffset = null;
				this.document = a;
				this.collapsed = !0
			};
		k.prototype = {
			cloneContents: function() {
				return this.collapsed ? null : e(this, 0)
			},
			deleteContents: function() {
				var a;
				this.collapsed || e(this, 1);
				t.webkit && (a = this.startContainer, 3 != a.nodeType || a.nodeValue.length || (this.setStartBefore(a).collapse(!0), g.remove(a)));
				return this
			},
			extractContents: function() {
				return this.collapsed ? null : e(this, 2)
			},
			setStart: function(k, d) {
				return a(!0, k, d, this)
			},
			setEnd: function(k, d) {
				return a(!1, k, d, this)
			},
			setStartAfter: function(a) {
				return this.setStart(a.parentNode, g.getNodeIndex(a) + 1)
			},
			setStartBefore: function(a) {
				return this.setStart(a.parentNode, g.getNodeIndex(a))
			},
			setEndAfter: function(a) {
				return this.setEnd(a.parentNode, g.getNodeIndex(a) + 1)
			},
			setEndBefore: function(a) {
				return this.setEnd(a.parentNode, g.getNodeIndex(a))
			},
			setStartAtFirst: function(a) {
				return this.setStart(a, 0)
			},
			setStartAtLast: function(a) {
				return this.setStart(a, 3 == a.nodeType ? a.nodeValue.length : a.childNodes.length)
			},
			setEndAtFirst: function(a) {
				return this.setEnd(a, 0)
			},
			setEndAtLast: function(a) {
				return this.setEnd(a, 3 == a.nodeType ? a.nodeValue.length : a.childNodes.length)
			},
			selectNode: function(a) {
				return this.setStartBefore(a).setEndAfter(a)
			},
			selectNodeContents: function(a) {
				return this.setStart(a, 0).setEndAtLast(a)
			},
			cloneRange: function() {
				return (new k(this.document)).setStart(this.startContainer, this.startOffset).setEnd(this.endContainer, this.endOffset)
			},
			collapse: function(a) {
				a ? (this.endContainer = this.startContainer, this.endOffset = this.startOffset) : (this.startContainer = this.endContainer, this.startOffset = this.endOffset);
				this.collapsed = !0;
				return this
			},
			shrinkBoundary: function(a) {
				function k(a) {
					return 1 == a.nodeType && !g.isBookmarkNode(a) && !y.$empty[a.tagName] && !y.$nonChild[a.tagName]
				}
				for (var d, b = this.collapsed; 1 == this.startContainer.nodeType && (d = this.startContainer.childNodes[this.startOffset]) && k(d);) this.setStart(d, 0);
				if (b) return this.collapse(!0);
				if (!a) for (; 1 == this.endContainer.nodeType && 0 < this.endOffset && (d = this.endContainer.childNodes[this.endOffset - 1]) && k(d);) this.setEnd(d, d.childNodes.length);
				return this
			},
			getCommonAncestor: function(a, k) {
				var d = this.startContainer,
					b = this.endContainer;
				return d === b ? a && c(this) && (d = d.childNodes[this.startOffset], 1 == d.nodeType) ? d : k && 3 == d.nodeType ? d.parentNode : d : g.getCommonAncestor(d, b)
			},
			trimBoundary: function(a) {
				this.txtToElmBoundary();
				var k = this.startContainer,
					d = this.startOffset,
					b = this.collapsed,
					f = this.endContainer;
				if (3 == k.nodeType) {
					if (0 == d) this.setStartBefore(k);
					else if (d >= k.nodeValue.length) this.setStartAfter(k);
					else {
						var l = g.split(k, d);
						k === f ? this.setEnd(l, this.endOffset - d) : k.parentNode === f && (this.endOffset += 1);
						this.setStartBefore(l)
					}
					if (b) return this.collapse(!0)
				}
				a || (d = this.endOffset, f = this.endContainer, 3 == f.nodeType && (0 == d ? this.setEndBefore(f) : (d < f.nodeValue.length && g.split(f, d), this.setEndAfter(f))));
				return this
			},
			txtToElmBoundary: function(a) {
				function d(a, d) {
					var k = a[d + "Container"],
						b = a[d + "Offset"];
					if (3 == k.nodeType) if (!b) a["set" + d.replace(/(\w)/, function(a) {
						return a.toUpperCase()
					}) + "Before"](k);
					else if (b >= k.nodeValue.length) a["set" + d.replace(/(\w)/, function(a) {
						return a.toUpperCase()
					}) + "After"](k)
				}
				if (a || !this.collapsed) d(this, "start"), d(this, "end");
				return this
			},
			insertNode: function(a) {
				var d = a,
					k = 1;
				11 == a.nodeType && (d = a.firstChild, k = a.childNodes.length);
				this.trimBoundary(!0);
				var b = this.startContainer,
					f = b.childNodes[this.startOffset];
				f ? b.insertBefore(a, f) : b.appendChild(a);
				d.parentNode === this.endContainer && (this.endOffset += k);
				return this.setStartBefore(d)
			},
			setCursor: function(a, d) {
				return this.collapse(!a).select(d)
			},
			createBookmark: function(a, d) {
				var k, b = this.document.createElement("span");
				b.style.cssText = "display:none;line-height:0px;";
				b.appendChild(this.document.createTextNode("‍"));
				b.id = "_baidu_bookmark_start_" + (d ? "" : h++);
				this.collapsed || (k = b.cloneNode(!0), k.id = "_baidu_bookmark_end_" + (d ? "" : h++));
				this.insertNode(b);
				k && this.collapse().insertNode(k).setEndBefore(k);
				this.setStartAfter(b);
				return {
					start: a ? b.id : b,
					end: k ? a ? k.id : k : null,
					id: a
				}
			},
			moveToBookmark: function(a) {
				var d = a.id ? this.document.getElementById(a.start) : a.start;
				a = a.end && a.id ? this.document.getElementById(a.end) : a.end;
				this.setStartBefore(d);
				g.remove(d);
				a ? (this.setEndBefore(a), g.remove(a)) : this.collapse(!0);
				return this
			},
			enlarge: function(a, d) {
				var k = g.isBody,
					b, f, l = this.document.createTextNode("");
				if (a) {
					f = this.startContainer;
					1 == f.nodeType ? f.childNodes[this.startOffset] ? b = f = f.childNodes[this.startOffset] : (f.appendChild(l), b = f = l) : b = f;
					for (;;) {
						if (g.isBlockElm(f)) {
							for (f = b;
							(b = f.previousSibling) && !g.isBlockElm(b);) f = b;
							this.setStartBefore(f);
							break
						}
						b = f;
						f = f.parentNode
					}
					f = this.endContainer;
					1 == f.nodeType ? ((b = f.childNodes[this.endOffset]) ? f.insertBefore(l, b) : f.appendChild(l), b = f = l) : b = f;
					for (;;) {
						if (g.isBlockElm(f)) {
							for (f = b;
							(b = f.nextSibling) && !g.isBlockElm(b);) f = b;
							this.setEndAfter(f);
							break
						}
						b = f;
						f = f.parentNode
					}
					l.parentNode === this.endContainer && this.endOffset--;
					g.remove(l)
				}
				if (!this.collapsed) {
					for (; !(0 != this.startOffset || d && d(this.startContainer) || k(this.startContainer));) this.setStartBefore(this.startContainer);
					for (; !(this.endOffset != (1 == this.endContainer.nodeType ? this.endContainer.childNodes.length : this.endContainer.nodeValue.length) || d && d(this.endContainer) || k(this.endContainer));) this.setEndAfter(this.endContainer)
				}
				return this
			},
			enlargeToBlockElm: function(a) {
				for (; !g.isBlockElm(this.startContainer);) this.setStartBefore(this.startContainer);
				if (!a) for (; !g.isBlockElm(this.endContainer);) this.setEndAfter(this.endContainer);
				return this
			},
			adjustmentBoundary: function() {
				if (!this.collapsed) {
					for (; !g.isBody(this.startContainer) && this.startOffset == this.startContainer[3 == this.startContainer.nodeType ? "nodeValue" : "childNodes"].length && this.startContainer[3 == this.startContainer.nodeType ? "nodeValue" : "childNodes"].length;) this.setStartAfter(this.startContainer);
					for (; !g.isBody(this.endContainer) && !this.endOffset && this.endContainer[3 == this.endContainer.nodeType ? "nodeValue" : "childNodes"].length;) this.setEndBefore(this.endContainer)
				}
				return this
			},
			applyInlineStyle: function(a, d, k) {
				if (this.collapsed) return this;
				this.trimBoundary().enlarge(!1, function(a) {
					return 1 == a.nodeType && g.isBlockElm(a)
				}).adjustmentBoundary();
				for (var b = this.createBookmark(), f = b.end, l = function(a) {
						return 1 == a.nodeType ? "br" != a.tagName.toLowerCase() : !g.isWhitespace(a)
					}, h = g.getNextDomNode(b.start, !1, l), e, c, m = this.cloneRange(); h && g.getPosition(h, f) & g.POSITION_PRECEDING;) if (3 == h.nodeType || y[a][h.tagName]) {
					m.setStartBefore(h);
					for (e = h; e && (3 == e.nodeType || y[a][e.tagName]) && e !== f;) c = e, e = g.getNextDomNode(e, 1 == e.nodeType, null, function(d) {
						return y[a][d.tagName]
					});
					var h = m.setEndAfter(c).extractContents(),
						n;
					if (k && 0 < k.length) {
						var r;
						r = n = k[0].cloneNode(!1);
						for (var p = 1, t; t = k[p++];) n.appendChild(t.cloneNode(!1)), n = n.firstChild
					} else n = m.document.createElement(a);
					d && g.setAttributes(n, d);
					n.appendChild(h);
					"SPAN" == n.tagName && d && d.style && q.each(n.getElementsByTagName("span"), function(a) {
						a.style.cssText = a.style.cssText + ";" + d.style
					});
					m.insertNode(k ? r : n);
					var N;
					"span" == a && d.style && /text\-decoration/.test(d.style) && (N = g.findParentByTagName(n, "a", !0)) ? (g.setAttributes(N, d), g.remove(n, !0), n = N) : (g.mergeSibling(n), g.clearEmptySibling(n));
					g.mergeChild(n, d);
					h = g.getNextDomNode(n, !1, l);
					g.mergeToParent(n);
					if (e === f) break
				} else h = g.getNextDomNode(h, !0, l);
				return this.moveToBookmark(b)
			},
			removeInlineStyle: function(a) {
				if (this.collapsed) return this;
				a = q.isArray(a) ? a : [a];
				this.shrinkBoundary().adjustmentBoundary();
				for (var d = this.startContainer, k = this.endContainer;;) {
					if (1 == d.nodeType) {
						if (-1 < q.indexOf(a, d.tagName.toLowerCase())) break;
						if ("body" == d.tagName.toLowerCase()) {
							d = null;
							break
						}
					}
					d = d.parentNode
				}
				for (;;) {
					if (1 == k.nodeType) {
						if (-1 < q.indexOf(a, k.tagName.toLowerCase())) break;
						if ("body" == k.tagName.toLowerCase()) {
							k = null;
							break
						}
					}
					k = k.parentNode
				}
				var b = this.createBookmark(),
					f, l;
				d && (l = this.cloneRange().setEndBefore(b.start).setStartBefore(d), f = l.extractContents(), l.insertNode(f), g.clearEmptySibling(d, !0), d.parentNode.insertBefore(b.start, d));
				k && (l = this.cloneRange().setStartAfter(b.end).setEndAfter(k), f = l.extractContents(), l.insertNode(f), g.clearEmptySibling(k, !1, !0), k.parentNode.insertBefore(b.end, k.nextSibling));
				for (d = g.getNextDomNode(b.start, !1, function(a) {
					return 1 == a.nodeType
				}); d && d !== b.end;) k = g.getNextDomNode(d, !0, function(a) {
					return 1 == a.nodeType
				}), -1 < q.indexOf(a, d.tagName.toLowerCase()) && g.remove(d, !0), d = k;
				return this.moveToBookmark(b)
			},
			getClosedNode: function() {
				var a;
				if (!this.collapsed) {
					var d = this.cloneRange().adjustmentBoundary().shrinkBoundary();
					c(d) && (d = d.startContainer.childNodes[d.startOffset]) && 1 == d.nodeType && (y.$empty[d.tagName] || y.$nonChild[d.tagName]) && (a = d)
				}
				return a
			},
			select: t.ie ?
			function(a, k) {
				var h;
				this.collapsed || this.shrinkBoundary();
				var e = this.getClosedNode();
				if (e && !k) {
					try {
						h = this.document.body.createControlRange(), h.addElement(e), h.select()
					} catch (E) {}
					return this
				}
				var e = this.createBookmark(),
					c = e.start;
				h = this.document.body.createTextRange();
				h.moveToElementText(c);
				h.moveStart("character", 1);
				if (!this.collapsed) {
					var m = this.document.body.createTextRange(),
						c = e.end;
					m.moveToElementText(c);
					h.setEndPoint("EndToEnd", m)
				} else if (!a && 3 != this.startContainer.nodeType) {
					var m = this.document.createTextNode(d),
						n = this.document.createElement("span");
					n.appendChild(this.document.createTextNode(d));
					c.parentNode.insertBefore(n, c);
					c.parentNode.insertBefore(m, c);
					b(this.document, m);
					l = m;
					f(n, "previousSibling");
					f(c, "nextSibling");
					h.moveStart("character", -1);
					h.collapse(!0)
				}
				this.moveToBookmark(e);
				n && g.remove(n);
				try {
					h.select()
				} catch (E) {}
				return this
			} : function(a) {
				function k(a) {
					function d(d, k, b) {
						3 == d.nodeType && d.nodeValue.length < k && (a[b + "Offset"] = d.nodeValue.length)
					}
					d(a.startContainer, a.startOffset, "start");
					d(a.endContainer, a.endOffset, "end")
				}
				var h = g.getWindow(this.document),
					e = h.getSelection();
				t.gecko ? this.document.body.focus() : h.focus();
				if (e) {
					e.removeAllRanges();
					this.collapsed && !a && (a = h = this.startContainer, 1 == h.nodeType && (a = h.childNodes[this.startOffset]), 3 == h.nodeType && this.startOffset || (a ? a.previousSibling && 3 == a.previousSibling.nodeType : h.lastChild && 3 == h.lastChild.nodeType) || (a = this.document.createTextNode(d), this.insertNode(a), b(this.document, a), f(a, "previousSibling"), f(a, "nextSibling"), l = a, this.setStart(a, t.webkit ? 1 : 0).collapse(!0)));
					h = this.document.createRange();
					if (this.collapsed && t.opera && 1 == this.startContainer.nodeType) if (a = this.startContainer.childNodes[this.startOffset]) {
						for (; a && g.isBlockElm(a);) if (1 == a.nodeType && a.childNodes[0]) a = a.childNodes[0];
						else break;
						a && this.setStartBefore(a).collapse(!0)
					} else(a = this.startContainer.lastChild) && g.isBr(a) && this.setStartBefore(a).collapse(!0);
					k(this);
					h.setStart(this.startContainer, this.startOffset);
					h.setEnd(this.endContainer, this.endOffset);
					e.addRange(h)
				}
				return this
			},
			scrollToView: function(a, d) {
				a = a ? window : g.getWindow(this.document);
				var k = this.document.createElement("span");
				k.innerHTML = "&nbsp;";
				this.cloneRange().insertNode(k);
				g.scrollToView(k, a, d);
				g.remove(k);
				return this
			},
			inFillChar: function() {
				var a = this.startContainer;
				return this.collapsed && 3 == a.nodeType && a.nodeValue.replace(new RegExp("^" + g.fillChar), "").length + 1 == a.nodeValue.length ? !0 : !1
			},
			createAddress: function(a, d) {
				function k(a) {
					for (var k = a ? f.startContainer : f.endContainer, b = g.findParents(k, !0, function(a) {
						return !g.isBody(a)
					}), l = [], h = 0, e; e = b[h++];) l.push(g.getNodeIndex(e, d));
					b = 0;
					if (d) if (3 == k.nodeType) {
						for (k = k.previousSibling; k && 3 == k.nodeType;) b += k.nodeValue.replace(Q, "").length, k = k.previousSibling;
						b += a ? f.startOffset : f.endOffset
					} else if (k = k.childNodes[a ? f.startOffset : f.endOffset]) b = g.getNodeIndex(k, d);
					else for (k = a ? f.startContainer : f.endContainer, a = k.firstChild; a;) if (g.isFillChar(a)) a = a.nextSibling;
					else if (b++, 3 == a.nodeType) for (; a && 3 == a.nodeType;) a = a.nextSibling;
					else a = a.nextSibling;
					else b = a ? g.isFillChar(k) ? 0 : f.startOffset : f.endOffset;
					0 > b && (b = 0);
					l.push(b);
					return l
				}
				var b = {},
					f = this;
				b.startAddress = k(!0);
				a || (b.endAddress = f.collapsed ? [].concat(b.startAddress) : k());
				return b
			},
			moveToAddress: function(a, d) {
				function k(a, d) {
					for (var k = b.document.body, f, l, h = 0, e, c = a.length; h < c; h++) if (e = a[h], f = k, k = k.childNodes[e], !k) {
						l = e;
						break
					}
					d ? k ? b.setStartBefore(k) : b.setStart(f, l) : k ? b.setEndBefore(k) : b.setEnd(f, l)
				}
				var b = this;
				k(a.startAddress, !0);
				!d && a.endAddress && k(a.endAddress);
				return b
			},
			equals: function(a) {
				for (var d in this) if (this.hasOwnProperty(d) && this[d] !== a[d]) return !1;
				return !0
			},
			traversal: function(a, d) {
				if (this.collapsed) return this;
				for (var k = this.createBookmark(), b = k.end, f = g.getNextDomNode(k.start, !1, d); f && f !== b && g.getPosition(f, b) & g.POSITION_PRECEDING;) {
					var l = g.getNextDomNode(f, !1, d);
					a(f);
					f = l
				}
				return this.moveToBookmark(k)
			}
		}
	})();
	(function() {
		function c(a, f) {
			var b = g.getNodeIndex;
			a = a.duplicate();
			a.collapse(f);
			var d = a.parentElement();
			if (!d.hasChildNodes()) return {
				container: d,
				offset: 0
			};
			for (var l = d.children, k, e = a.duplicate(), c = 0, r = l.length - 1, u = -1; c <= r;) {
				u = Math.floor((c + r) / 2);
				k = l[u];
				e.moveToElementText(k);
				var v = e.compareEndPoints("StartToStart", a);
				if (0 < v) r = u - 1;
				else if (0 > v) c = u + 1;
				else return {
					container: d,
					offset: b(k)
				}
			}
			if (-1 == u) {
				e.moveToElementText(d);
				e.setEndPoint("StartToStart", a);
				e = e.text.replace(/(\r\n|\r)/g, "\n").length;
				l = d.childNodes;
				if (!e) return k = l[l.length - 1], {
					container: k,
					offset: k.nodeValue.length
				};
				for (b = l.length; 0 < e;) e -= l[--b].nodeValue.length;
				return {
					container: l[b],
					offset: -e
				}
			}
			e.collapse(0 < v);
			e.setEndPoint(0 < v ? "StartToStart" : "EndToStart", a);
			e = e.text.replace(/(\r\n|\r)/g, "\n").length;
			if (!e) return y.$empty[k.tagName] || y.$nonChild[k.tagName] ? {
				container: d,
				offset: b(k) + (0 < v ? 0 : 1)
			} : {
				container: k,
				offset: 0 < v ? 0 : k.childNodes.length
			};
			for (; 0 < e;) try {
				l = k, k = k[0 < v ? "previousSibling" : "nextSibling"], e -= k.nodeValue.length
			} catch (w) {
				return {
					container: d,
					offset: b(l)
				}
			}
			return {
				container: k,
				offset: 0 < v ? -e : k.nodeValue.length + e
			}
		}
		function a(a, f) {
			if (a.item) f.selectNode(a.item(0));
			else {
				var b = c(a, !0);
				f.setStart(b.container, b.offset);
				0 != a.compareEndPoints("StartToEnd", a) && (b = c(a, !1), f.setEnd(b.container, b.offset))
			}
			return f
		}
		function e(a) {
			var b;
			try {
				b = a.getNative().createRange()
			} catch (d) {
				return null
			}
			var h = b.item ? b.item(0) : b.parentElement();
			return (h.ownerDocument || h) === a.document ? b : null
		}(F.Selection = function(a) {
			var b = this;
			b.document = a;
			t.ie9below && (a = g.getWindow(a).frameElement, g.on(a, "beforedeactivate", function() {
				b._bakIERange = b.getIERange()
			}), g.on(a, "activate", function() {
				try {
					!e(b) && b._bakIERange && b._bakIERange.select()
				} catch (h) {}
				b._bakIERange = null
			}));
			a = a = null
		}).prototype = {
			rangeInBody: function(a, f) {
				var b = t.ie9below || f ? a.item ? a.item() : a.parentElement() : a.startContainer;
				return b === this.document.body || g.inDoc(b, this.document)
			},
			getNative: function() {
				var a = this.document;
				try {
					return a ? t.ie9below ? a.selection : g.getWindow(a).getSelection() : null
				} catch (f) {
					return null
				}
			},
			getIERange: function() {
				var a = e(this);
				return !a && this._bakIERange ? this._bakIERange : a
			},
			cache: function() {
				this.clear();
				this._cachedRange = this.getRange();
				this._cachedStartElement = this.getStart();
				this._cachedStartElementPath = this.getStartElementPath()
			},
			getStartElementPath: function() {
				if (this._cachedStartElementPath) return this._cachedStartElementPath;
				var a = this.getStart();
				return a ? g.findParents(a, !0, null, !0) : []
			},
			clear: function() {
				this._cachedStartElementPath = this._cachedRange = this._cachedStartElement = null
			},
			isFocus: function() {
				try {
					if (t.ie9below) {
						var a = e(this);
						return !(!a || !this.rangeInBody(a))
					}
					return !!this.getNative().rangeCount
				} catch (f) {
					return !1
				}
			},
			getRange: function() {
				function b(a) {
					for (var d = f.document.body.firstChild, k = a.collapsed; d && d.firstChild;) a.setStart(d, 0), d = d.firstChild;
					a.startContainer || a.setStart(f.document.body, 0);
					k && a.collapse(!0)
				}
				var f = this;
				if (null != f._cachedRange) return this._cachedRange;
				var h = new p.editor.dom.Range(f.document);
				if (t.ie9below) {
					var d = f.getIERange();
					if (d) try {
						a(d, h)
					} catch (k) {
						b(h)
					} else b(h)
				} else {
					var l = f.getNative();
					if (l && l.rangeCount) d = l.getRangeAt(0), l = l.getRangeAt(l.rangeCount - 1), h.setStart(d.startContainer, d.startOffset).setEnd(l.endContainer, l.endOffset), h.collapsed && g.isBody(h.startContainer) && !h.startOffset && b(h);
					else {
						if (this._bakRange && g.inDoc(this._bakRange.startContainer, this.document)) return this._bakRange;
						b(h)
					}
				}
				return this._bakRange = h
			},
			getStart: function() {
				if (this._cachedStartElement) return this._cachedStartElement;
				var a = t.ie9below ? this.getIERange() : this.getRange(),
					f, h;
				if (t.ie9below) {
					if (!a) return this.document.body.firstChild;
					if (a.item) return a.item(0);
					f = a.duplicate();
					0 < f.text.length && f.moveStart("character", 1);
					f.collapse(1);
					f = f.parentElement();
					for (h = a = a.parentElement(); a = a.parentNode;) if (a == f) {
						f = h;
						break
					}
				} else if (a.shrinkBoundary(), f = a.startContainer, 1 == f.nodeType && f.hasChildNodes() && (f = f.childNodes[Math.min(f.childNodes.length - 1, a.startOffset)]), 3 == f.nodeType) return f.parentNode;
				return f
			},
			getText: function() {
				var a;
				return this.isFocus() && (a = this.getNative()) ? (a = t.ie9below ? a.createRange() : a.getRangeAt(0), t.ie9below ? a.text : a.toString()) : ""
			},
			clearRange: function() {
				this.getNative()[t.ie9below ? "empty" : "removeAllRanges"]()
			}
		}
	})();
	(function() {
		function c(a, b) {
			var d;
			if (b.textarea) if (q.isString(b.textarea)) for (var f = 0, l, h = g.getElementsByTagName(a, "textarea"); l = h[f++];) {
				if (l.id == "ueditor_textarea_" + b.options.textarea) {
					d = l;
					break
				}
			} else d = b.textarea;
			d || (a.appendChild(d = g.createElement(document, "textarea", {
				name: b.options.textarea,
				id: "ueditor_textarea_" + b.options.textarea,
				style: "display:none"
			})), b.textarea = d);
			!d.getAttribute("name") && d.setAttribute("name", b.options.textarea);
			d.value = b.hasContents() ? b.options.allHtmlEnabled ? b.getAllHtml() : b.getContent(null, null, !0) : ""
		}
		function a(a) {
			for (var d in a) return d
		}
		function e(a) {
			a.langIsReady = !0;
			a.fireEvent("langReady")
		}
		var b = 0,
			f, h = UE.Editor = function(d) {
				var f = this;
				f.uid = b++;
				Z.call(f);
				f.commands = {};
				f.options = q.extend(q.clone(d || {}), UEDITOR_CONFIG, !0);
				f.shortcutkeys = {};
				f.inputRules = [];
				f.outputRules = [];
				f.current_active_135item = null;
				f.is_paid_user = !1;
				f.setOpt(h.defaultOptions(f));
				f.loadServerConfig();
				q.isEmptyObject(UE.I18N) ? q.loadFile(document, {
					src: f.options.langPath + f.options.lang + "/" + f.options.lang + ".js",
					tag: "script",
					type: "text/javascript",
					defer: "defer"
				}, function() {
					UE.plugin.load(f);
					e(f)
				}) : (f.options.lang = a(UE.I18N), UE.plugin.load(f), e(f));
				UE.instants["ueditorInstant" + f.uid] = f
			};
		h.prototype = {
			registerCommand: function(a, b) {
				this.commands[a] = b
			},
			ready: function(a) {
				a && (this.isReady ? a.apply(this) : this.addListener("ready", a))
			},
			currentActive135Item: function() {
				return this.current_active_135item
			},
			setOpt: function(a, b) {
				var d = {};
				q.isString(a) ? d[a] = b : d = a;
				q.extend(this.options, d, !0)
			},
			getOpt: function(a) {
				return this.options[a]
			},
			destroy: function() {
				this.fireEvent("destroy");
				var a = this.container.parentNode,
					b = this.textarea;
				b ? b.style.display = "" : (b = document.createElement("textarea"), a.parentNode.insertBefore(b, a));
				b.style.width = this.iframe.offsetWidth + "px";
				b.style.height = this.iframe.offsetHeight + "px";
				b.value = this.getContent();
				b.id = this.key;
				a.innerHTML = "";
				g.remove(a);
				var a = this.key,
					k;
				for (k in this) this.hasOwnProperty(k) && delete this[k];
				UE.delEditor(a)
			},
			render: function(a) {
				var d = this.options;
				q.isString(a) && (a = document.getElementById(a));
				if (a) {
					d.minFrameWidth = d.initialFrameWidth ? d.initialFrameWidth : d.initialFrameWidth = a.offsetWidth;
					d.initialFrameHeight ? d.minFrameHeight = d.initialFrameHeight : d.initialFrameHeight = d.minFrameHeight = a.offsetHeight;
					a.style.width = /%$/.test(d.initialFrameWidth) ? "100%" : d.initialFrameWidth - parseInt(g.getComputedStyle(a, "padding-left")) - parseInt(g.getComputedStyle(a, "padding-right")) + "px";
					a.style.height = /%$/.test(d.initialFrameHeight) ? "100%" : d.initialFrameHeight - parseInt(g.getComputedStyle(a, "padding-top")) - parseInt(g.getComputedStyle(a, "padding-bottom")) + "px";
					a.style.zIndex = d.zIndex;
					var k = (M && 9 > t.version ? "" : "<!DOCTYPE html>") + "<html lang='en'><head><style type='text/css'>.view{padding:0;word-wrap:break-word;cursor:text;}\nbody{margin:8px;font-family:sans-serif;font-size:16px;}p{margin:5px 0;}</style>" + (d.iframeCssUrl ? "<link rel='stylesheet' type='text/css' href='" + q.unhtml(d.iframeCssUrl) + "'/>" : "") + (d.initialStyle ? "<style>" + d.initialStyle + "</style>" : "") + "</head><body class='view' ></body><script type='text/javascript' " + (M ? "defer='defer'" : "") + " id='_initialScript'>setTimeout(function(){editor = window.parent.UE.instants['ueditorInstant" + this.uid + "'];editor._setup(document);},0);var _tmpScript = document.getElementById('_initialScript');_tmpScript.parentNode.removeChild(_tmpScript);</script>" + (d.iframeJsUrl ? "<script type='text/javascript' src='" + q.unhtml(d.iframeJsUrl) + "'></script>" : "") + "</html>";
					a.appendChild(g.createElement(document, "iframe", {
						id: "ueditor_" + this.uid,
						width: "100%",
						height: "100%",
						frameborder: "0",
						src: "javascript:void(function(){document.open();" + (d.customDomain && document.domain != location.hostname ? 'document.domain="' + document.domain + '";' : "") + 'document.write("' + k + '");document.close();}())'
					}));
					a.style.overflow = "hidden";
					setTimeout(function() {
						/%$/.test(d.initialFrameWidth) && (d.minFrameWidth = d.initialFrameWidth = a.offsetWidth);
						/%$/.test(d.initialFrameHeight) && (d.minFrameHeight = d.initialFrameHeight = a.offsetHeight, a.style.height = d.initialFrameHeight + "px")
					})
				}
			},
			_setup: function(a) {
				var d = this,
					k = d.options;
				M ? (a.body.disabled = !0, a.body.contentEditable = !0, a.body.disabled = !1) : a.body.contentEditable = !0;
				a.body.spellcheck = !1;
				d.document = a;
				d.window = a.defaultView || a.parentWindow;
				d.iframe = d.window.frameElement;
				d.body = a.body;
				d.selection = new F.Selection(a);
				var b;
				t.gecko && (b = this.selection.getNative()) && b.removeAllRanges();
				this._initEvents();
				for (var f = this.iframe.parentNode; !g.isBody(f); f = f.parentNode) if ("FORM" == f.tagName) {
					d.form = f;
					if (d.options.autoSyncData) g.on(d.window, "blur", function() {
						c(f, d)
					});
					else g.on(f, "submit", function() {
						c(this, d)
					});
					break
				}
				if (k.initialContent) if (k.autoClearinitialContent) {
					var h = d.execCommand;
					d.execCommand = function() {
						d.fireEvent("firstBeforeExecCommand");
						return h.apply(d, arguments)
					};
					this._setDefaultContent(k.initialContent)
				} else this.setContent(k.initialContent, !1, !0);
				g.isEmptyNode(d.body) && (d.body.innerHTML = "<p>" + (t.ie ? "" : "<br/>") + "</p>");
				k.focus && setTimeout(function() {
					d.focus(d.options.focusInEnd);
					!d.options.autoClearinitialContent && d._selectionChange()
				}, 0);
				d.container || (d.container = this.iframe.parentNode);
				k.fullscreen && d.ui && d.ui.setFullScreen(!0);
				try {
					d.document.execCommand("2D-position", !1, !1)
				} catch (u) {}
				try {
					d.document.execCommand("enableInlineTableEditing", !1, !1)
				} catch (u) {}
				try {
					d.document.execCommand("enableObjectResizing", !1, !1)
				} catch (u) {}
				d._bindshortcutKeys();
				d.isReady = 1;
				d.fireEvent("ready");
				k.onready && k.onready.call(d);
				if (!t.ie9below) g.on(d.window, ["blur", "focus"], function(a) {
					if ("blur" == a.type) {
						d._bakRange = d.selection.getRange();
						try {
							d._bakNativeRange = d.selection.getNative().getRangeAt(0), d.selection.getNative().removeAllRanges()
						} catch (v) {
							d._bakNativeRange = null
						}
					} else try {
						d._bakRange && d._bakRange.select()
					} catch (v) {}
				});
				t.gecko && 10902 >= t.version && (d.body.contentEditable = !1, setTimeout(function() {
					d.body.contentEditable = !0
				}, 100), setInterval(function() {
					d.body.style.height = d.iframe.offsetHeight - 20 + "px"
				}, 100));
				!k.isShow && d.setHide();
				k.readonly && d.setDisabled()
			},
			sync: function(a) {
				(a = a ? document.getElementById(a) : g.findParent(this.iframe.parentNode, function(a) {
					return "FORM" == a.tagName
				}, !0)) && c(a, this)
			},
			setHeight: function(a, b) {
				a !== parseInt(this.iframe.parentNode.style.height) && (this.iframe.parentNode.style.height = a + "px");
				!b && (this.options.minFrameHeight = this.options.initialFrameHeight = a);
				this.body.style.height = a + "px";
				!b && this.trigger("setHeight")
			},
			addshortcutkey: function(a, b) {
				var d = {};
				b ? d[a] = b : d = a;
				q.extend(this.shortcutkeys, d)
			},
			_bindshortcutKeys: function() {
				var a = this,
					b = this.shortcutkeys;
				a.addListener("keydown", function(d, f) {
					var k = f.keyCode || f.which,
						h;
					for (h in b) for (var e = b[h].split(","), l = 0, c; c = e[l++];) {
						c = c.split(":");
						var n = c[0];
						c = c[1];
						if (/^(ctrl)(\+shift)?\+(\d+)$/.test(n.toLowerCase()) || /^(\d+)$/.test(n)) if ("ctrl" == RegExp.$1 && (f.ctrlKey || f.metaKey) && ("" != RegExp.$2 ? f[RegExp.$2.slice(1) + "Key"] : 1) && k == RegExp.$3 || k == RegExp.$1) - 1 != a.queryCommandState(h, c) && a.execCommand(h, c), g.preventDefault(f)
					}
				})
			},
			getContent: function(a, b, k, f, h) {
				a && q.isFunction(a) && (b = a, a = "");
				if (b ? !b() : !this.hasContents()) return "";
				this.fireEvent("beforegetcontent");
				b = UE.htmlparser(this.body.innerHTML, f);
				this.filterOutputRule(b);
				this.fireEvent("aftergetcontent", a, b);
				return b.toHtml(h)
			},
			getAllHtml: function() {
				var a = [];
				this.fireEvent("getAllHtml", a);
				if (t.ie && 8 < t.version) {
					var b = "";
					q.each(this.document.styleSheets, function(a) {
						b += a.href ? '<link rel="stylesheet" type="text/css" href="' + a.href + '" />' : "<style>" + a.cssText + "</style>"
					});
					q.each(this.document.getElementsByTagName("script"), function(a) {
						b += a.outerHTML
					})
				}
				return "<html><head>" + (this.options.charset ? '<meta http-equiv="Content-Type" content="text/html; charset=' + this.options.charset + '"/>' : "") + (b || this.document.getElementsByTagName("head")[0].innerHTML) + a.join("\n") + "</head><body " + (M && 9 > t.version ? 'class="view"' : "") + ">" + this.getContent(null, null, !0) + "</body></html>"
			},
			getPlainTxt: function() {
				var a = new RegExp(g.fillChar, "g"),
					b = this.body.innerHTML.replace(/[\n\r]/g, ""),
					b = b.replace(/<(p|div)[^>]*>(<br\/?>|&nbsp;)<\/\1>/gi, "\n").replace(/<br\/?>/gi, "\n").replace(/<[^>/]+>/g, "").replace(/(\n)?<\/([^>]+)>/g, function(a, d, b) {
						return y.$block[b] ? "\n" : d ? d : ""
					});
				return b.replace(a, "").replace(/ /g, " ").replace(/&nbsp;/g, " ")
			},
			getContentTxt: function() {
				return this.body[t.ie ? "innerText" : "textContent"].replace(new RegExp(g.fillChar, "g"), "").replace(/ /g, " ")
			},
			setContent: function(a, b, k) {
				this.fireEvent("beforesetcontent", a);
				a = UE.htmlparser(a);
				this.filterInputRule(a);
				a = a.toHtml();
				this.body.innerHTML = (b ? this.body.innerHTML : "") + a;
				if ("p" == this.options.enterTag) if (b = this.body.firstChild, !b || 1 == b.nodeType && (y.$cdata[b.tagName] || "DIV" == b.tagName && b.getAttribute("cdata_tag") || g.isCustomeNode(b)) && b === this.body.lastChild) this.body.innerHTML = "<p>" + (t.ie ? "&nbsp;" : "<br/>") + "</p>" + this.body.innerHTML;
				else for (var d = this.document.createElement("p"); b;) {
					for (; b && (3 == b.nodeType || 1 == b.nodeType && y.p[b.tagName] && !y.$cdata[b.tagName]);) a = b.nextSibling, d.appendChild(b), b = a;
					if (d.firstChild) if (b) b.parentNode.insertBefore(d, b), d = this.document.createElement("p");
					else {
						this.body.appendChild(d);
						break
					}
					b = b.nextSibling
				}
				this.fireEvent("aftersetcontent");
				this.fireEvent("contentchange");
				!k && this._selectionChange();
				this._bakRange = this._bakIERange = this._bakNativeRange = null;
				var f;
				t.gecko && (f = this.selection.getNative()) && f.removeAllRanges();
				this.options.autoSyncData && this.form && c(this.form, this)
			},
			focus: function(a) {
				try {
					var d = this.selection.getRange();
					if (a) {
						var b = this.body.lastChild;
						b && 1 == b.nodeType && !y.$empty[b.tagName] && (g.isEmptyBlock(b) ? d.setStartAtFirst(b) : d.setStartAtLast(b), d.collapse(!0));
						d.setCursor(!0)
					} else!d.collapsed && g.isBody(d.startContainer) && 0 == d.startOffset && (b = this.body.firstChild) && 1 == b.nodeType && !y.$empty[b.tagName] && d.setStartAtFirst(b).collapse(!0), d.select(!0);
					this.fireEvent("focus selectionchange")
				} catch (n) {}
			},
			isFocus: function() {
				return this.selection.isFocus()
			},
			blur: function() {
				var a = this.selection.getNative();
				if (a.empty && t.ie) {
					var b = document.body.createTextRange();
					b.moveToElementText(document.body);
					b.collapse(!0);
					b.select();
					a.empty()
				} else a.removeAllRanges()
			},
			_initEvents: function() {
				var a = this,
					b = a.document,
					k = a.window;
				a._proxyDomEvent = q.bind(a._proxyDomEvent, a);
				g.on(b, "click contextmenu mousedown keydown keyup keypress mouseup mouseover mouseout selectstart".split(" "), a._proxyDomEvent);
				g.on(k, ["focus", "blur"], a._proxyDomEvent);
				g.on(a.body, "drop", function(d) {
					t.gecko && d.stopPropagation && d.stopPropagation();
					a.fireEvent("contentchange")
				});
				g.on(b, ["mouseup", "keydown"], function(d) {
					"keydown" == d.type && (d.ctrlKey || d.metaKey || d.shiftKey || d.altKey) || 2 != d.button && a._selectionChange(250, d)
				})
			},
			_proxyDomEvent: function(a) {
				return !1 === this.fireEvent("before" + a.type.replace(/^on/, "").toLowerCase()) || !1 === this.fireEvent(a.type.replace(/^on/, ""), a) ? !1 : this.fireEvent("after" + a.type.replace(/^on/, "").toLowerCase())
			},
			_selectionChange: function(a, b) {
				var d = this,
					h = !1,
					e, l;
				t.ie && 9 > t.version && b && "mouseup" == b.type && !this.selection.getRange().collapsed && (h = !0, e = b.clientX, l = b.clientY);
				clearTimeout(f);
				f = setTimeout(function() {
					if (d.selection && d.selection.getNative()) {
						var a;
						if (h && "None" == d.selection.getNative().type) {
							a = d.document.body.createTextRange();
							try {
								a.moveToPoint(e, l)
							} catch (w) {
								a = null
							}
						}
						var k;
						a && (k = d.selection.getIERange, d.selection.getIERange = function() {
							return a
						});
						d.selection.cache();
						k && (d.selection.getIERange = k);
						d.selection._cachedRange && d.selection._cachedStartElement && (d.fireEvent("beforeselectionchange"), d.fireEvent("selectionchange", !! b), d.fireEvent("afterselectionchange"), d.selection.clear())
					}
				}, a || 50)
			},
			_callCmdFn: function(a, b) {
				var d = b[0].toLowerCase(),
					f;
				f = (d = this.commands[d] || UE.commands[d]) && d[a];
				if (!(d && f || "queryCommandState" != a)) return 0;
				if (f) return f.apply(this, b)
			},
			execCommand: function(a) {
				a = a.toLowerCase();
				var d, b = this.commands[a] || UE.commands[a];
				if (!b || !b.execCommand) return null;
				b.notNeedUndo || this.__hasEnterExecCommand ? (d = this._callCmdFn("execCommand", arguments), this.__hasEnterExecCommand || b.ignoreContentChange || this._ignoreContentChange || this.fireEvent("contentchange")) : (this.__hasEnterExecCommand = !0, -1 != this.queryCommandState.apply(this, arguments) && (this.fireEvent("saveScene"), this.fireEvent.apply(this, ["beforeexeccommand", a].concat(arguments)), d = this._callCmdFn("execCommand", arguments), this.fireEvent.apply(this, ["afterexeccommand", a].concat(arguments)), this.fireEvent("saveScene")), this.__hasEnterExecCommand = !1);
				this.__hasEnterExecCommand || b.ignoreContentChange || this._ignoreContentChange || this._selectionChange();
				return d
			},
			queryCommandState: function(a) {
				return this._callCmdFn("queryCommandState", arguments)
			},
			queryCommandValue: function(a) {
				return this._callCmdFn("queryCommandValue", arguments)
			},
			hasContents: function(a) {
				if (a) for (var d = 0, b; b = a[d++];) if (0 < this.document.getElementsByTagName(b).length) return !0;
				if (!g.isEmptyBlock(this.body)) return !0;
				if ("<p><br></p>" == this.body.innerHTML || '<section data-role="paragraph" class="_135editor"><p><br/></p></section>' == this.body.innerHTML || "<p><br/></p>" == this.body.innerHTML) return !1;
				a = ["div"];
				for (d = 0; b = a[d++];) {
					b = g.getElementsByTagName(this.document, b);
					for (var f = 0, h; h = b[f++];) if (g.isCustomeNode(h)) return !0
				}
				return !1
			},
			reset: function() {
				this.fireEvent("reset")
			},
			setEnabled: function() {
				var a;
				if ("false" == this.body.contentEditable) {
					this.body.contentEditable = !0;
					a = this.selection.getRange();
					try {
						a.moveToBookmark(this.lastBk), delete this.lastBk
					} catch (l) {
						a.setStartAtFirst(this.body).collapse(!0)
					}
					a.select(!0);
					this.bkqueryCommandState && (this.queryCommandState = this.bkqueryCommandState, delete this.bkqueryCommandState);
					this.bkqueryCommandValue && (this.queryCommandValue = this.bkqueryCommandValue, delete this.bkqueryCommandValue);
					this.fireEvent("selectionchange")
				}
			},
			enable: function() {
				return this.setEnabled()
			},
			setDisabled: function(a) {
				var b = this;
				a = a ? q.isArray(a) ? a : [a] : [];
				"true" == b.body.contentEditable && (b.lastBk || (b.lastBk = b.selection.getRange().createBookmark(!0)), b.body.contentEditable = !1, b.bkqueryCommandState = b.queryCommandState, b.bkqueryCommandValue = b.queryCommandValue, b.queryCommandState = function(d) {
					return -1 != q.indexOf(a, d) ? b.bkqueryCommandState.apply(b, arguments) : -1
				}, b.queryCommandValue = function(d) {
					return -1 != q.indexOf(a, d) ? b.bkqueryCommandValue.apply(b, arguments) : null
				}, b.fireEvent("selectionchange"))
			},
			disable: function(a) {
				return this.setDisabled(a)
			},
			_setDefaultContent: function() {
				function a() {
					var b = this;
					b.document.getElementById("initContent") && (b.body.innerHTML = '<section class="135editor"><p>' + (M ? "" : "<br/>") + "</p></section>", b.removeListener("firstBeforeExecCommand focus", a), setTimeout(function() {
						b.focus();
						b._selectionChange()
					}, 0))
				}
				return function(b) {
					this.body.innerHTML = '<p id="initContent">' + b + "</p>";
					this.addListener("firstBeforeExecCommand focus", a)
				}
			}(),
			setShow: function() {
				var a = this.selection.getRange();
				if ("none" == this.container.style.display) {
					try {
						a.moveToBookmark(this.lastBk), delete this.lastBk
					} catch (l) {
						a.setStartAtFirst(this.body).collapse(!0)
					}
					setTimeout(function() {
						a.select(!0)
					}, 100);
					this.container.style.display = ""
				}
			},
			show: function() {
				return this.setShow()
			},
			setHide: function() {
				this.lastBk || (this.lastBk = this.selection.getRange().createBookmark(!0));
				this.container.style.display = "none"
			},
			hide: function() {
				return this.setHide()
			},
			getLang: function(a) {
				var b = UE.I18N[this.options.lang];
				if (!b) throw Error("not import language file");
				a = (a || "").split(".");
				for (var d = 0, f;
				(f = a[d++]) && (b = b[f], b););
				return b
			},
			getContentLength: function(a, b) {
				var d = this.getContent(!1, !1, !0).length;
				if (a) {
					b = (b || []).concat(["hr", "img", "iframe"]);
					for (var d = this.getContentTxt().replace(/[\t\r\n]+/g, "").length, f = 0, h; h = b[f++];) d += this.document.getElementsByTagName(h).length
				}
				return d
			},
			getTagLength: function(a) {
				var b = 0;
				a = this.document.getElementsByTagName(a);
				for (var d = 0; d < a.length; d++) g.hasClass(a[d], "assistant") || b++;
				return b
			},
			addInputRule: function(a) {
				this.inputRules.push(a)
			},
			filterInputRule: function(a) {
				for (var b = 0, d; d = this.inputRules[b++];) d.call(this, a)
			},
			addOutputRule: function(a) {
				this.outputRules.push(a)
			},
			filterOutputRule: function(a) {
				for (var b = 0, d; d = this.outputRules[b++];) d.call(this, a)
			},
			getActionUrl: function(a) {
				a = this.getOpt(a) || a;
				var b = this.getOpt("imageUrl"),
					d = this.getOpt("serverUrl");
				!d && b && (d = b.replace(/^(.*[\/]).+([\.].+)$/, "$1controller$2"));
				return d ? (d = d + (-1 == d.indexOf("?") ? "?" : "&") + "action=" + (a || ""), q.formatUrl(d)) : ""
			}
		};
		q.inherits(h, Z)
	})();
	UE.Editor.defaultOptions = function(c) {
		c = c.options.UEDITOR_HOME_URL;
		return {
			isShow: !0,
			initialContent: "",
			initialStyle: "",
			autoClearinitialContent: !1,
			iframeCssUrl: c + "themes/iframe.css",
			textarea: "editorValue",
			focus: !1,
			focusInEnd: !0,
			autoClearEmptyNode: !0,
			fullscreen: !1,
			readonly: !1,
			zIndex: 999,
			imagePopup: !0,
			enterTag: "p",
			customDomain: !1,
			lang: "zh-cn",
			langPath: c + "lang/",
			theme: "default",
			themePath: c + "themes/",
			allHtmlEnabled: !1,
			scaleEnabled: !1,
			tableNativeEditInFF: !1,
			autoSyncData: !0,
			fileNameFormat: "{time}{rand:6}"
		}
	};
	(function() {
		UE.Editor.prototype.loadServerConfig = function() {
			function c(a) {
				console && console.error(a)
			}
			var a = this;
			setTimeout(function() {
				try {
					a.options.imageUrl && a.setOpt("serverUrl", a.options.imageUrl.replace(/^(.*[\/]).+([\.].+)$/, "$1controller$2"));
					var e = a.getOpt("configUrl") ? a.getOpt("configUrl") : a.getActionUrl("config"),
						b = q.isCrossDomainUrl(e);
					a._serverConfigLoaded = !1;
					e && UE.ajax.request(e, {
						method: "GET",
						dataType: b ? "jsonp" : "",
						onsuccess: function(f) {
							try {
								var h = b ? f : eval("(" + f.responseText + ")");
								q.extend(a.options, h);
								a.fireEvent("serverConfigLoaded");
								a._serverConfigLoaded = !0
							} catch (d) {
								c(a.getLang("loadconfigFormatError"))
							}
						},
						onerror: function() {
							c(a.getLang("loadconfigHttpError"))
						}
					})
				} catch (f) {
					c(a.getLang("loadconfigError"))
				}
			})
		};
		UE.Editor.prototype.isServerConfigLoaded = function() {
			return this._serverConfigLoaded || !1
		};
		UE.Editor.prototype.afterConfigReady = function(c) {
			if (c && q.isFunction(c)) {
				var a = this,
					e = function() {
						c.apply(a, arguments);
						a.removeListener("serverConfigLoaded", e)
					};
				a.isServerConfigLoaded() ? c.call(a, "serverConfigLoaded") : a.addListener("serverConfigLoaded", e)
			}
		}
	})();
	UE.ajax = function() {
		function c(a) {
			var b = [],
				f;
			for (f in a) if ("method" != f && "timeout" != f && "async" != f && "dataType" != f && "callback" != f && void 0 != a[f] && null != a[f]) if ("function" != (typeof a[f]).toLowerCase() && "object" != (typeof a[f]).toLowerCase()) b.push(encodeURIComponent(f) + "=" + encodeURIComponent(a[f]));
			else if (q.isArray(a[f])) for (var k = 0; k < a[f].length; k++) b.push(encodeURIComponent(f) + "[]=" + encodeURIComponent(a[f][k]));
			return b.join("&")
		}
		function a(a, b) {
			var d = f(),
				k = !1,
				h = {
					method: "POST",
					timeout: 5E3,
					async: !0,
					data: {},
					onsuccess: function() {},
					onerror: function() {}
				};
			"object" === typeof a && (b = a, a = b.url);
			if (d && a) {
				var e = b ? q.extend(h, b) : h,
					h = c(e);
				q.isEmptyObject(e.data) || (h += (h ? "&" : "") + c(e.data));
				var g = setTimeout(function() {
					4 != d.readyState && (k = !0, d.abort(), clearTimeout(g))
				}, e.timeout),
					u = e.method.toUpperCase(),
					v = a + (-1 == a.indexOf("?") ? "?" : "&") + ("POST" == u ? "" : h + "&noCache=" + +new Date);
				d.open(u, v, e.async);
				d.onreadystatechange = function() {
					if (4 == d.readyState) if (k || 200 != d.status) e.onerror(d);
					else e.onsuccess(d)
				};
				"POST" == u ? (d.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), d.send(h)) : d.send(null)
			}
		}
		function e(a, b) {
			function d(a) {
				return function() {
					try {
						if (a) h.onerror && h.onerror();
						else try {
							clearTimeout(x), f.apply(window, arguments)
						} catch (O) {}
					} catch (O) {
						h.onerror && h.onerror.call(window, O)
					} finally {
						h.oncomplete && h.oncomplete.apply(window, arguments);
						e.parentNode && e.parentNode.removeChild(e);
						window[v] = null;
						try {
							delete window[v]
						} catch (O) {}
					}
				}
			}
			var f = b.onsuccess ||
			function() {}, e = document.createElement("SCRIPT"), h = b || {}, g = h.charset, u = h.jsonp || "callback", v, w = h.timeOut || 0, x, E = new RegExp("(\\?|&)" + u + "=([^&]*)"), J;
			if (q.isFunction(f)) v = "bd__editor__" + Math.floor(2147483648 * Math.random()).toString(36), window[v] = d(0);
			else if (q.isString(f)) v = f;
			else if (J = E.exec(a)) v = J[2];
			a = a.replace(E, "$1" + u + "=" + v);
			0 > a.search(E) && (a += (0 > a.indexOf("?") ? "?" : "&") + u + "=" + v);
			u = c(b);
			q.isEmptyObject(b.data) || (u += (u ? "&" : "") + c(b.data));
			u && (a = a.replace(/\?/, "?" + u + "&"));
			e.onerror = d(1);
			w && (x = setTimeout(d(1), w));
			(function(a, b, d) {
				a.setAttribute("type", "text/javascript");
				a.setAttribute("defer", "defer");
				d && a.setAttribute("charset", d);
				a.setAttribute("src", b);
				document.getElementsByTagName("head")[0].appendChild(a)
			})(e, a, g)
		}
		var b = "XMLHttpRequest()";
		try {
			new ActiveXObject("Msxml2.XMLHTTP"), b = "ActiveXObject('Msxml2.XMLHTTP')"
		} catch (h) {
			try {
				new ActiveXObject("Microsoft.XMLHTTP"), b = "ActiveXObject('Microsoft.XMLHTTP')"
			} catch (d) {}
		}
		var f = new Function("return new " + b);
		return {
			request: function(b, d) {
				d && "jsonp" == d.dataType ? e(b, d) : a(b, d)
			},
			getJSONP: function(a, b, f) {
				e(a, {
					data: b,
					oncomplete: f
				})
			}
		}
	}();
	UE.filterWord = function() {
		function c(a) {
			return a = a.replace(/[\d.]+\w+/g, function(a) {
				return q.transUnitToPx(a)
			})
		}
		function a(a) {
			return a.replace(/[\t\r\n]+/g, " ").replace(/<!--[\s\S]*?-->/ig, "").replace(/<v:shape [^>]*>[\s\S]*?.<\/v:shape>/gi, function(a) {
				if (t.opera) return "";
				try {
					if (/Bitmap/i.test(a)) return "";
					var b = a.match(/width:([ \d.]*p[tx])/i)[1],
						h = a.match(/height:([ \d.]*p[tx])/i)[1],
						d = a.match(/src=\s*"([^"]*)"/i)[1];
					return '<img width="' + c(b) + '" height="' + c(h) + '" src="' + d + '" />'
				} catch (l) {
					return ""
				}
			}).replace(/<\/?div[^>]*>/g, "").replace(/v:\w+=(["']?)[^'"]+\1/g, "").replace(/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|xml|meta|link|style|\w+:\w+)(?=[\s\/>]))[^>]*>/gi, "").replace(/<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi, "<p><strong>$1</strong></p>").replace(/\s+(class|lang|align)\s*=\s*(['"]?)([\w-]+)\2/ig, function(a, f, h, d) {
				return "class" == f && "MsoListParagraph" == d ? a : ""
			}).replace(/<(font|span)[^>]*>(\s*)<\/\1>/gi, function(a, f, h) {
				return h.replace(/[\t\r\n ]+/g, " ")
			}).replace(/(<[a-z][^>]*)\sstyle=(["'])([^\2]*?)\2/gi, function(a, f, h, d) {
				a = [];
				d = d.replace(/^\s+|\s+$/, "").replace(/&#39;/g, "'").replace(/&quot;/gi, "'").replace(/[\d.]+(cm|pt)/g, function(a) {
					return q.transUnitToPx(a)
				}).split(/;\s*/g);
				h = 0;
				for (var b; b = d[h]; h++) {
					var k, e = b.split(":");
					if (2 == e.length && (b = e[0].toLowerCase(), k = e[1].toLowerCase(), !(/^(background)\w*/.test(b) && 0 == k.replace(/(initial|\s)/g, "").length || /^(margin)\w*/.test(b) && /^0\w+$/.test(k)))) {
						switch (b) {
						case "mso-padding-alt":
						case "mso-padding-top-alt":
						case "mso-padding-right-alt":
						case "mso-padding-bottom-alt":
						case "mso-padding-left-alt":
						case "mso-margin-alt":
						case "mso-margin-top-alt":
						case "mso-margin-right-alt":
						case "mso-margin-bottom-alt":
						case "mso-margin-left-alt":
						case "mso-height":
						case "mso-width":
						case "mso-vertical-align-alt":
							/<table/.test(f) || (a[h] = b.replace(/^mso-|-alt$/g, "") + ":" + c(k));
							continue;
						case "horiz-align":
							a[h] = "text-align:" + k;
							continue;
						case "vert-align":
							a[h] = "vertical-align:" + k;
							continue;
						case "font-color":
						case "mso-foreground":
							a[h] = "color:" + k;
							continue;
						case "mso-background":
						case "mso-highlight":
							a[h] = "background:" + k;
							continue;
						case "mso-default-height":
							a[h] = "min-height:" + c(k);
							continue;
						case "mso-default-width":
							a[h] = "min-width:" + c(k);
							continue;
						case "mso-padding-between-alt":
							a[h] = "border-collapse:separate;border-spacing:" + c(k);
							continue;
						case "text-line-through":
							if ("single" == k || "double" == k) a[h] = "text-decoration:line-through";
							continue;
						case "mso-zero-height":
							"yes" == k && (a[h] = "display:none");
							continue;
						case "margin":
							if (!/[1-9]/.test(k)) continue
						}
						/^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?:decor|trans)|top-bar|version|vnd|word-break)/.test(b) || /text\-indent|padding|margin/.test(b) && /\-[\d.]+/.test(k) || (a[h] = b + ":" + e[1])
					}
				}
				return f + (a.length ? ' style="' + a.join(";").replace(/;{2,}/g, ";") + '"' : "")
			})
		}
		return function(e) {
			return /(class="?Mso|style="[^"]*\bmso\-|w:WordDocument|<(v|o):|lang=)/ig.test(e) ? a(e) : e
		}
	}();
	(function() {
		function c(a, b, d) {
			a.push("\n");
			return b + (d ? 1 : -1)
		}
		function a(a, b) {
			for (var d = 0; d < b; d++) a.push("    ")
		}
		function e(d, f, k, h) {
			switch (d.type) {
			case "root":
				for (var l = 0, m; m = d.children[l++];) k && "element" == m.type && !y.$inlineWithA[m.tagName] && 1 < l && (c(f, h, !0), a(f, h)), e(m, f, k, h);
				break;
			case "text":
				"pre" == d.parentNode.tagName ? f.push(d.data) : f.push(g[d.parentNode.tagName] ? q.html(d.data) : d.data.replace(/[ ]{2}/g, " &nbsp;"));
				break;
			case "element":
				b(d, f, k, h);
				break;
			case "comment":
				f.push("<!--" + d.data + "-->")
			}
			return f
		}
		function b(b, d, f, h) {
			var l = "";
			if (b.attrs) {
				var l = [],
					m = b.attrs,
					g;
				for (g in m) l.push(g + (void 0 !== m[g] ? '="' + (k[g] ? q.html(m[g]).replace(/["]/g, function(a) {
					return "&quot;"
				}) : q.unhtml(m[g])) + '"' : ""));
				l = l.join(" ")
			}
			d.push("<" + b.tagName + (l ? " " + l : "") + (y.$empty[b.tagName] ? "/" : "") + ">");
			f && !y.$inlineWithA[b.tagName] && "pre" != b.tagName && b.children && b.children.length && (h = c(d, h, !0), a(d, h));
			if (b.children && b.children.length) for (l = 0; m = b.children[l++];) f && "element" == m.type && !y.$inlineWithA[m.tagName] && 1 < l && (c(d, h), a(d, h)), e(m, d, f, h);
			y.$empty[b.tagName] || (f && !y.$inlineWithA[b.tagName] && "pre" != b.tagName && b.children && b.children.length && (h = c(d, h), a(d, h)), d.push("</" + b.tagName + ">"))
		}
		function f(a, b) {
			var d;
			if ("element" == a.type && a.getAttr("id") == b) return a;
			if (a.children && a.children.length) for (var k = 0; d = a.children[k++];) if (d = f(d, b)) return d
		}
		function h(a, b, d) {
			"element" == a.type && a.tagName == b && d.push(a);
			if (a.children && a.children.length) for (var f = 0, k; k = a.children[f++];) h(k, b, d)
		}
		function d(a, b) {
			if (a.children && a.children.length) for (var f = 0, k; k = a.children[f];) d(k, b), k.parentNode && (k.children && k.children.length && b(k), k.parentNode && f++);
			else b(a)
		}
		var l = UE.uNode = function(a) {
				this.type = a.type;
				this.data = a.data;
				this.tagName = a.tagName;
				this.parentNode = a.parentNode;
				this.attrs = a.attrs || {};
				this.children = a.children
			},
			k = {
				href: 1,
				src: 1,
				_src: 1,
				_href: 1,
				cdata_data: 1
			},
			g = {
				style: 1,
				script: 1
			};
		l.createElement = function(a) {
			return /[<>]/.test(a) ? UE.htmlparser(a).children[0] : new l({
				type: "element",
				children: [],
				tagName: a
			})
		};
		l.createText = function(a, b) {
			return new UE.uNode({
				type: "text",
				data: b ? a : q.unhtml(a || "")
			})
		};
		l.prototype = {
			toHtml: function(a) {
				var b = [];
				e(this, b, a, 0);
				return b.join("")
			},
			innerHTML: function(a) {
				if ("element" != this.type || y.$empty[this.tagName]) return this;
				if (q.isString(a)) {
					if (this.children) for (var b = 0, d; d = this.children[b++];) d.parentNode = null;
					this.children = [];
					a = UE.htmlparser(a);
					for (b = 0; d = a.children[b++];) this.children.push(d), d.parentNode = this;
					return this
				}
				a = new UE.uNode({
					type: "root",
					children: this.children
				});
				return a.toHtml()
			},
			innerText: function(a, b) {
				if ("element" != this.type || y.$empty[this.tagName]) return this;
				if (a) {
					if (this.children) for (var d = 0, f; f = this.children[d++];) f.parentNode = null;
					this.children = [];
					this.appendChild(l.createText(a, b));
					return this
				}
				return this.toHtml().replace(/<[^>]+>/g, "")
			},
			getData: function() {
				return "element" == this.type ? "" : this.data
			},
			firstChild: function() {
				return this.children ? this.children[0] : null
			},
			lastChild: function() {
				return this.children ? this.children[this.children.length - 1] : null
			},
			previousSibling: function() {
				for (var a = this.parentNode, b = 0, d; d = a.children[b]; b++) if (d === this) return 0 == b ? null : a.children[b - 1]
			},
			nextSibling: function() {
				for (var a = this.parentNode, b = 0, d; d = a.children[b++];) if (d === this) return a.children[b]
			},
			replaceChild: function(a, b) {
				if (this.children) {
					a.parentNode && a.parentNode.removeChild(a);
					for (var d = 0, f; f = this.children[d]; d++) if (f === b) return this.children.splice(d, 1, a), b.parentNode = null, a.parentNode = this, a
				}
			},
			appendChild: function(a) {
				if ("root" == this.type || "element" == this.type && !y.$empty[this.tagName]) {
					this.children || (this.children = []);
					a.parentNode && a.parentNode.removeChild(a);
					for (var b = 0, d; d = this.children[b]; b++) if (d === a) {
						this.children.splice(b, 1);
						break
					}
					this.children.push(a);
					a.parentNode = this;
					return a
				}
			},
			insertBefore: function(a, b) {
				if (this.children) {
					a.parentNode && a.parentNode.removeChild(a);
					for (var d = 0, f; f = this.children[d]; d++) if (f === b) return this.children.splice(d, 0, a), a.parentNode = this, a
				}
			},
			insertAfter: function(a, b) {
				if (this.children) {
					a.parentNode && a.parentNode.removeChild(a);
					for (var d = 0, f; f = this.children[d]; d++) if (f === b) return this.children.splice(d + 1, 0, a), a.parentNode = this, a
				}
			},
			removeChild: function(a, b) {
				if (this.children) for (var d = 0, f; f = this.children[d]; d++) if (f === a) {
					this.children.splice(d, 1);
					f.parentNode = null;
					if (b && f.children && f.children.length) for (var k = 0, h; h = f.children[k]; k++) this.children.splice(d + k, 0, h), h.parentNode = this;
					return f
				}
			},
			getAttr: function(a) {
				return this.attrs && this.attrs[a.toLowerCase()]
			},
			setAttr: function(a, b) {
				if (a) if (this.attrs || (this.attrs = {}), q.isObject(a)) for (var d in a) a[d] ? this.attrs[d.toLowerCase()] = a[d] : delete this.attrs[d];
				else b ? this.attrs[a.toLowerCase()] = b : delete this.attrs[a];
				else delete this.attrs
			},
			getIndex: function() {
				for (var a = this.parentNode, b = 0, d; d = a.children[b]; b++) if (d === this) return b;
				return -1
			},
			getNodeById: function(a) {
				var b;
				if (this.children && this.children.length) for (var d = 0; b = this.children[d++];) if (b = f(b, a)) return b
			},
			getNodesByTagName: function(a) {
				a = q.trim(a).replace(/[ ]{2,}/g, " ").split(" ");
				var b = [],
					d = this;
				q.each(a, function(a) {
					if (d.children && d.children.length) for (var f = 0, k; k = d.children[f++];) h(k, a, b)
				});
				return b
			},
			getStyle: function(a) {
				var b = this.getAttr("style");
				return b ? (a = b.match(new RegExp("(^|;)\\s*" + a + ":([^;]+)", "i"))) && a[0] ? a[2] : "" : ""
			},
			setStyle: function(a, b) {
				function d(a, b) {
					f = f.replace(new RegExp("(^|;)\\s*" + a + ":([^;]+;?)", "gi"), "$1");
					b && (f = a + ":" + q.unhtml(b) + ";" + f)
				}
				var f = this.getAttr("style");
				f || (f = "");
				if (q.isObject(a)) for (var k in a) d(k, a[k]);
				else d(a, b);
				this.setAttr("style", q.trim(f))
			},
			traversal: function(a) {
				this.children && this.children.length && d(this, a);
				return this
			}
		}
	})();
	UE.htmlparser = function(c, a) {
		function e(a, b) {
			if (m[a.tagName]) {
				var d = k.createElement(m[a.tagName]);
				a.appendChild(d);
				d.appendChild(k.createText(b))
			} else a.appendChild(k.createText(b))
		}
		function b(a, d, f) {
			var e;
			if (e = n[d]) {
				for (var c = a, g;
				"root" != c.type;) {
					if (q.isArray(e) ? -1 != q.indexOf(e, c.tagName) : e == c.tagName) {
						a = c;
						g = !0;
						break
					}
					c = c.parentNode
				}
				g || (a = b(a, q.isArray(e) ? e[0] : e))
			}
			e = new k({
				parentNode: a,
				type: "element",
				tagName: d.toLowerCase(),
				children: y.$empty[d] ? null : []
			});
			if (f) {
				for (c = {}; g = h.exec(f);) c[g[1].toLowerCase()] = l[g[1].toLowerCase()] ? g[2] || g[3] || g[4] : q.unhtml(g[2] || g[3] || g[4]);
				e.attrs = c
			}
			a.children.push(e);
			return y.$empty[d] ? a : e
		}
		var f = /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)-->)|(?:([^\s\/<>]+)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'<>])*)\/?>))/g,
			h = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
			d = {
				b: 1,
				code: 1,
				i: 1,
				u: 1,
				strike: 1,
				s: 1,
				tt: 1,
				strong: 1,
				q: 1,
				samp: 1,
				em: 1,
				span: 1,
				sub: 1,
				img: 1,
				sup: 1,
				font: 1,
				big: 1,
				small: 1,
				iframe: 1,
				a: 1,
				br: 1,
				pre: 1
			};
		c = c.replace(new RegExp(g.fillChar, "g"), "");
		a || (c = c.replace(new RegExp("[\\r\\t\\n" + (a ? "" : " ") + "]*</?(\\w+)\\s*(?:[^>]*)>[\\r\\t\\n" + (a ? "" : " ") + "]*", "g"), function(b, f) {
			return f && d[f.toLowerCase()] ? b.replace(/(^[\n\r]+)|([\n\r]+$)/g, "") : b.replace(new RegExp("^[\\r\\n" + (a ? "" : " ") + "]+"), "").replace(new RegExp("[\\r\\n" + (a ? "" : " ") + "]+$"), "")
		}));
		for (var l = {
			href: 1,
			src: 1
		}, k = UE.uNode, n = {
			td: "tr",
			tr: ["tbody", "thead", "tfoot"],
			tbody: "table",
			th: "tr",
			thead: "table",
			tfoot: "table",
			caption: "table",
			li: ["ul", "ol"],
			dt: "dl",
			dd: "dl",
			option: "select"
		}, m = {
			ol: "li",
			ul: "li"
		}, r, u = 0, v = 0, w = new k({
			type: "root",
			children: []
		}), x = w; r = f.exec(c);) {
			u = r.index;
			try {
				if (u > v && e(x, c.slice(v, u)), r[3]) y.$cdata[x.tagName] ? e(x, r[0]) : x = b(x, r[3].toLowerCase(), r[4]);
				else if (r[1]) {
					if ("root" != x.type) if (y.$cdata[x.tagName] && !y.$cdata[r[1]]) e(x, r[0]);
					else {
						for (u = x;
						"element" == x.type && x.tagName != r[1].toLowerCase();) if (x = x.parentNode, "root" == x.type) throw x = u, "break";
						x = x.parentNode
					}
				} else r[2] && x.children.push(new k({
					type: "comment",
					data: r[2],
					parentNode: x
				}))
			} catch (E) {}
			v = f.lastIndex
		}
		v < c.length && e(x, c.slice(v));
		return w
	};
	UE.filterNode = function() {
		function c(a, e) {
			switch (a.type) {
			case "element":
				var b;
				if (b = e[a.tagName]) if ("-" === b) a.parentNode.removeChild(a);
				else if (q.isFunction(b)) {
					var f = a.parentNode,
						h = a.getIndex();
					b(a);
					if (a.parentNode) {
						if (a.children) for (b = 0; h = a.children[b];) c(h, e), h.parentNode && b++
					} else for (b = h; h = f.children[b];) c(h, e), h.parentNode && b++
				} else {
					if ((b = b.$) && a.attrs) {
						var h = {},
							d;
						for (f in b) {
							d = a.getAttr(f);
							if ("style" == f && q.isArray(b[f])) {
								var l = [];
								q.each(b[f], function(b) {
									var d;
									(d = a.getStyle(b)) && l.push(b + ":" + d)
								});
								d = l.join(";")
							}
							d && (h[f] = d)
						}
						a.attrs = h
					}
					if (a.children) for (b = 0; h = a.children[b];) c(h, e), h.parentNode && b++
				} else if (y.$cdata[a.tagName]) a.parentNode.removeChild(a);
				else for (f = a.parentNode, h = a.getIndex(), a.parentNode.removeChild(a, !0), b = h; h = f.children[b];) c(h, e), h.parentNode && b++;
				break;
			case "comment":
				a.parentNode.removeChild(a)
			}
		}
		return function(a, e) {
			if (q.isEmptyObject(e)) return a;
			var b;
			(b = e["-"]) && q.each(b.split(" "), function(a) {
				e[a] = "-"
			});
			b = 0;
			for (var f; f = a.children[b];) c(f, e), f.parentNode && b++;
			return a
		}
	}();
	UE.plugin = function() {
		var c = {};
		return {
			register: function(a, e, b, f) {
				b && q.isFunction(b) && (f = b, b = null);
				c[a] = {
					optionName: b || a,
					execFn: e,
					afterDisabled: f
				}
			},
			load: function(a) {
				q.each(c, function(e) {
					var b = e.execFn.call(a);
					!1 !== a.options[e.optionName] ? b && q.each(b, function(b, h) {
						switch (h.toLowerCase()) {
						case "shortcutkey":
							a.addshortcutkey(b);
							break;
						case "bindevents":
							q.each(b, function(b, f) {
								a.addListener(f, b)
							});
							break;
						case "bindmultievents":
							q.each(q.isArray(b) ? b : [b], function(b) {
								var d = q.trim(b.type).split(/\s+/);
								q.each(d, function(d) {
									a.addListener(d, b.handler)
								})
							});
							break;
						case "commands":
							q.each(b, function(b, f) {
								a.commands[f] = b
							});
							break;
						case "outputrule":
							a.addOutputRule(b);
							break;
						case "inputrule":
							a.addInputRule(b);
							break;
						case "defaultoptions":
							a.setOpt(b)
						}
					}) : e.afterDisabled && e.afterDisabled.call(a)
				});
				q.each(UE.plugins, function(e) {
					e.call(a)
				})
			},
			run: function(a, e) {
				var b = c[a];
				b && b.exeFn.call(e)
			}
		}
	}();
	var ba = UE.keymap = {
		Backspace: 8,
		Tab: 9,
		Enter: 13,
		Shift: 16,
		Control: 17,
		Alt: 18,
		CapsLock: 20,
		Esc: 27,
		Spacebar: 32,
		PageUp: 33,
		PageDown: 34,
		End: 35,
		Home: 36,
		Left: 37,
		Up: 38,
		Right: 39,
		Down: 40,
		Insert: 45,
		Del: 46,
		NumLock: 144,
		Cmd: 91,
		"=": 187,
		"-": 189,
		b: 66,
		i: 73,
		z: 90,
		y: 89,
		v: 86,
		x: 88,
		s: 83,
		n: 78
	},
		S = UE.LocalStorage = function() {
			function c() {
				var a = document.createElement("div");
				a.style.display = "none";
				if (!a.addBehavior) return null;
				a.addBehavior("#default#userdata");
				return {
					getItem: function(b) {
						var f = null;
						try {
							document.body.appendChild(a), a.load(e), f = a.getAttribute(b), document.body.removeChild(a)
						} catch (d) {}
						return f
					},
					setItem: function(b, h) {
						document.body.appendChild(a);
						a.setAttribute(b, h);
						a.save(e);
						document.body.removeChild(a)
					},
					removeItem: function(b) {
						document.body.appendChild(a);
						a.removeAttribute(b);
						a.save(e);
						document.body.removeChild(a)
					}
				}
			}
			var a = window.localStorage || c() || null,
				e = "localStorage";
			return {
				saveLocalData: function(b, f) {
					return a && f ? (a.setItem(b, f), !0) : !1
				},
				getLocalData: function(b) {
					return a ? a.getItem(b) : null
				},
				removeItem: function(b) {
					a && a.removeItem(b)
				}
			}
		}();
	(function() {
		UE.Editor.prototype.setPreferences = function(c, a) {
			var e = {};
			q.isString(c) ? e[c] = a : e = c;
			var b = S.getLocalData("ueditor_preference");
			b && (b = q.str2json(b)) ? q.extend(b, e) : b = e;
			b && S.saveLocalData("ueditor_preference", q.json2str(b))
		};
		UE.Editor.prototype.getPreferences = function(c) {
			var a = S.getLocalData("ueditor_preference");
			return a && (a = q.str2json(a)) ? c ? a[c] : a : null
		};
		UE.Editor.prototype.removePreferences = function(c) {
			var a = S.getLocalData("ueditor_preference");
			a && (a = q.str2json(a)) && (a[c] = void 0, delete a[c]);
			a && S.saveLocalData("ueditor_preference", q.json2str(a))
		}
	})();
	q.extend(UE.Editor.prototype, {
		setValue: function(c, a) {
			var e;
			if (a.textarea) if (q.isString(a.textarea)) for (var b = 0, f, h = g.getElementsByTagName(c, "textarea"); f = h[b++];) {
				if (f.id == "ueditor_textarea_" + a.options.textarea) {
					e = f;
					break
				}
			} else e = a.textarea;
			jQuery(a.selection.document).find("p").each(function() {
				"&nbsp;" == jQuery.trim(jQuery(this).html()) && jQuery(this).html("<br/>");
				"" != jQuery.trim(jQuery(this).text()) || 0 < jQuery(this).find("img").size() || (0 < jQuery(this).find("br").size() ? jQuery(this).html("<br/>") : "both" != this.style.clear && jQuery(this).remove())
			});
			e || (c.appendChild(e = g.createElement(document, "textarea", {
				name: a.options.textarea,
				id: "ueditor_textarea_" + a.options.textarea,
				style: "display:none"
			})), a.textarea = e);
			!e.getAttribute("name") && e.setAttribute("name", a.options.textarea);
			b = a.hasContents() ? a.options.allHtmlEnabled ? a.getAllHtml() : a.getContent(null, null, !0) : "";
			"" != b && (e.value = b)
		},
		parseWxHtml: function(c) {
			var a = this;
			c = jQuery("<div>" + c + " </div>");
			jQuery(c).find("*").each(function() {
				if ("undefined" != typeof this.tagName) {
					jQuery(this).css("font-family", "");
					if ("SECTION" == this.tagName.toUpperCase()) {
						var e = jQuery(this).attr("style");
						if (e && 0 <= e.indexOf("border-image")) if ((e = e.replace("&amp;", "&")) && 0 <= e.indexOf("http://remote.wx135.com/oss/view?d=")) {
							var e = e.replace("&free=1", ""),
								b = null,
								f = null,
								h = /['|"]\s*(http:\/\/remote\.wx135\.com\/oss\/view\?d=([^;\\)]+?))['|"]/i;
							(h = e.match(h)) && h[0] ? (b = h[1], f = decodeURIComponent(h[2])) : (h = /\(\s*(http:\/\/remote\.wx135\.com\/oss\/view\?d=([^;\\)]+?))\)/i, (h = e.match(h)) && h[0] && (b = h[1], f = decodeURIComponent(h[2])));
							a.getOpt("hd_image") && (f = f.replace(/\?wx_fmt=/g, "."));
							b && f && 0 <= f.indexOf("mmbiz.qlogo.cn") && jQuery(this).attr("style", e.replace(b, f))
						} else e && 0 <= e.indexOf(".135editor.com/cache/remote/") && (f = b = null, h = /['|"]\s*(http:\/\/\w+\.135editor\.com\/cache\/remote\/([^;\\)]+?))['|"]/i, (h = e.match(h)) && h[0] ? (b = h[1], f = "function" == typeof window.strip_imgthumb_opr ? base64_decode(window.strip_imgthumb_opr(h[2])) : base64_decode(h[2])) : (h = /\(\s*(http:\/\/\w+\.135editor\.com\/cache\/remote\/([^;\\)]+?))\)/i, (h = e.match(h)) && h[0] && (b = h[1], f = "function" == typeof window.strip_imgthumb_opr ? base64_decode(window.strip_imgthumb_opr(h[2])) : base64_decode(h[2]))), b && f && (0 <= f.indexOf("mmbiz.qlogo.cn") || 0 <= f.indexOf("mmbiz.qpic.cn")) && (f = f.replace("http://mmbiz.qpic.cn", "https://mmbiz.qpic.cn"), f = f.replace("https://mmbiz.qlogo.cn", "https://mmbiz.qpic.cn"), a.getOpt("hd_image") && (f = f.replace(/\?wx_fmt=/g, ".")), jQuery(this).attr("style", e.replace(b, f))))
					}
					this.style.transform && a.setElementTransform(this, this.style.transform)
				}
			});
			c = jQuery.trim(c.html());
			return "" == c ? "" : c
		},
		getWxContent: function(c, a, e, b, f) {
			c = this.getContent(c, a, e, b, f);
			return this.parseWxHtml(c)
		},
		parseInsertPasteSetHtml: function(c) {
			var a = this;
			"function" == typeof strip_stack_span && (c = strip_stack_span(c));
			c = jQuery("<div>" + c + "</div>");
			do c.find(".article135:first,[data-role=outer]:first").each(function() {
				jQuery(this).css("background-color") || jQuery(this).css("background-image") ? jQuery(this).removeAttr("class").removeAttr("data-use") : jQuery(this).replaceWith(jQuery(this).html())
			});
			while (0 < c.find(".article135,[data-role=outer]").size());
			c.find("[donone]").removeAttr("label").removeAttr("id").removeAttr("donone").attr("class", "_135editor");
			c.find(".shifubrush").removeAttr("class");
			c.find("[powered-by]").removeAttr("powered-by").attr("class", "_135editor");
			c.find("blockquote.tn-Powered-by-XIUMI").attr("class", "_135editor");
			c.find(".135editor").removeClass("135editor").addClass("_135editor");
			c.find("section.tn-Powered-by-XIUMI").each(function() {
				var a = jQuery(this),
					b = !1;
				a.find("section:not(.tn-Powered-by-XIUMI)").each(function() {
					"both" == jQuery(this).css("clear") && "0px" == jQuery(this).css("width") && "0px" == jQuery(this).css("height") && (b = !0)
				});
				b && a.attr("class", "_135editor")
			});
			c.find(".tn-Powered-by-XIUMI").removeAttr("class");
			c.find("section.Powered-by-XIUMI,blockquote.Powered-by-XIUMI").each(function() {
				jQuery(this).attr("class", "_135editor")
			});
			this.isPaidUser();
			if (a.getOpt("open_editor")) return c.html();
			D(c);
			c.find("*").each(function() {
				if ("IMG" == this.tagName.toUpperCase()) {
					var e;
					e = this.src && "" != this.src ? this.src : jQuery(this).attr("data-src");
					jQuery(this).removeAttr("data-src");
					if ("undefined" == typeof e || "" == e) {
						jQuery(this).remove();
						return
					}
					e = e.replace("&amp;", "&");
					e = e.replace("http://mmbiz.qpic.cn", "https://mmbiz.qpic.cn");
					e = e.replace("https://mmbiz.qlogo.cn", "https://mmbiz.qpic.cn");
					e = e.replace(/&wxfrom=\d+/g, "");
					e = e.replace(/wxfrom=\d+/g, "");
					e = e.replace(/&wx_lazy=\d+/g, "");
					e = e.replace(/wx_lazy=\d+/g, "");
					e = e.replace(/&tp=[a-z]+/g, "");
					e = e.replace(/tp=[a-z]+/g, "");
					e = e.replace(/&fr=[0-9a-z]+/g, "");
					e = e.replace(/fr=[0-9a-z]+/g, "");
					e = e.replace(/&rd=[0-9a-zA-Z]+/g, "");
					e = e.replace(/rd=[0-9a-zA-Z]+/g, "");
					e = e.replace(/\?&/g, "?");
					e = e.replace(/\?$/g, "");
					if (0 <= e.indexOf("mmbiz.qlogo.cn") || 0 <= e.indexOf("mmbiz.qpic.cn") || 0 <= e.indexOf("mmsns.qpic.cn")) e = "http://image2.135editor.com/cache/remote/" + base64_encode(e);
					jQuery(this).attr("src", e);
					jQuery(this).attr("_src", e)
				} else if ("SECTION" == this.tagName.toUpperCase() && (e = jQuery(this).attr("style")) && (e = e.replace("&amp;", "&")) && (0 <= e.indexOf("mmbiz.qpic.cn") || 0 <= e.indexOf("https://mmbiz.qlogo.cn") || 0 <= e.indexOf("mmsns.qpic.cn"))) {
					var b = null,
						f = /['|"|\(]\s*(https?:\/\/mmbiz\.qpic\.cn\/([^;\\)]+?))['|"|\)]/i;
					(f = e.match(f)) && f[0] ? b = f[1] : (f = /['|"|\(]\s*(https:\/\/mmbiz\.qlogo\.cn\/([^;\\)]+?))['|"|\)]/i, (f = e.match(f)) && f[0] ? b = f[1] : (f = /['|"|\(]\s*(https?:\/\/mmsns\.qpic\.cn\/([^;\\)]+?))['|"|\)]/i, (f = e.match(f)) && f[0] && (b = f[1])));
					b && (b = b.replace(/&wxfrom=\d+/g, ""), b = b.replace(/wxfrom=\d+/g, ""), b = b.replace(/&wx_lazy=\d+/g, ""), b = b.replace(/wx_lazy=\d+/g, ""), b = b.replace(/&tp=[a-z]+/g, ""), b = b.replace(/tp=[a-z]+/g, ""), b = b.replace(/&fr=[0-9a-z]+/g, ""), b = b.replace(/fr=[0-9a-z]+/g, ""), b = b.replace(/&rd=[0-9a-zA-Z]+/g, ""), b = b.replace(/rd=[0-9a-zA-Z]+/g, ""), b = b.replace("http://mmbiz.qpic.cn", "https://mmbiz.qpic.cn"), b = b.replace("https://mmbiz.qlogo.cn", "https://mmbiz.qpic.cn"), jQuery(this).attr("style", e.replace(f[1], "http://image2.135editor.com/cache/remote/" + base64_encode(b))))
				}
				this.style.transform && a.setElementTransform(this, this.style.transform);
				D(jQuery(this))
			});
			return c.html()
		},
		isPaidUser: function() {
			return this.is_paid_user
		},
		setPaidUser: function(c) {
			this.is_paid_user = c
		},
		setElementTransform: function(c, a) {
			if ("none" != a) {
				var e = jQuery(c).attr("style"),
					e = e.replace(/\s*\-[a-z]+\-transform\s*:[A-Za-z0-9_%,.\-\(\)\s]*;/gim, ""),
					e = e.replace(/[;]?\s*transform\s*:[A-Za-z0-9_%,.\-\(\)\s]*;/gim, ";"),
					e = (e + ";" + ("transform: " + a + ";-webkit-transform: " + a + ";-moz-transform: " + a + ";-o-transform: " + a + ";")).replace(";;", ";");
				jQuery(c).attr("style", e)
			}
		}
	}, !1);
	var V = null,
		ga = null;
	UE.plugins.defaultfilter = function() {
		var c = this;
		c.setOpt({
			allowDivTransToP: !0,
			disabledTableInTable: !0,
			rgb2Hex: !0
		});
		c.addInputRule(function(a) {
			function e(a) {
				for (; a && "element" == a.type;) {
					if ("td" == a.tagName) return !0;
					a = a.parentNode
				}
				return !1
			}
			var b = this.options.allowDivTransToP,
				f;
			a.traversal(function(a) {
				if ("element" == a.type) if (y.$cdata[a.tagName] || !c.options.autoClearEmptyNode || !y.$inline[a.tagName] || y.$empty[a.tagName] || a.attrs && !q.isEmptyObject(a.attrs)) switch (a.tagName) {
				case "style":
				case "script":
					a.setAttr({
						cdata_tag: a.tagName,
						cdata_data: a.innerHTML() || "",
						_ue_custom_node_: "true"
					});
					a.tagName = "div";
					a.innerHTML("");
					break;
				case "a":
					(f = a.getAttr("href")) && a.setAttr("_href", f);
					break;
				case "img":
					if ((f = a.getAttr("src")) && /^data:/.test(f)) {
						a.parentNode.removeChild(a);
						break
					}
					a.setAttr("_src", a.getAttr("src"));
					break;
				case "span":
					t.webkit && (f = a.getStyle("white-space")) && /nowrap|normal/.test(f) && (a.setStyle("white-space", ""), c.options.autoClearEmptyNode && q.isEmptyObject(a.attrs) && a.parentNode.removeChild(a, !0));
					(f = a.getAttr("id")) && /^_baidu_bookmark_/i.test(f) && a.parentNode.removeChild(a);
					break;
				case "p":
					if (f = a.getAttr("align")) a.setAttr("align"), a.setStyle("text-align", f);
					q.each(a.children, function(b) {
						if ("element" == b.type && "p" == b.tagName) {
							var d = b.nextSibling();
							for (a.parentNode.insertAfter(b, a); d;) {
								var f = d.nextSibling();
								a.parentNode.insertAfter(d, b);
								b = d;
								d = f
							}
							return !1
						}
					});
					a.firstChild() || a.innerHTML(t.ie ? "&nbsp;" : "<br/>");
					break;
				case "div":
					if (a.getAttr("cdata_tag")) break;
					if ((f = a.getAttr("class")) && /^line number\d+/.test(f)) break;
					if (!b) break;
					for (var d, h = UE.uNode.createElement("p"); d = a.firstChild();)"text" != d.type && UE.dom.dtd.$block[d.tagName] ? h.firstChild() ? (a.parentNode.insertBefore(h, a), h = UE.uNode.createElement("p")) : a.parentNode.insertBefore(d, a) : h.appendChild(d);
					h.firstChild() && a.parentNode.insertBefore(h, a);
					a.parentNode.removeChild(a);
					break;
				case "dl":
					a.tagName = "ul";
					break;
				case "dt":
				case "dd":
					a.tagName = "li";
					break;
				case "li":
					(d = a.getAttr("class")) && /list\-/.test(d) || a.setAttr();
					d = a.getNodesByTagName("ol ul");
					UE.utils.each(d, function(b) {
						a.parentNode.insertAfter(b, a)
					});
					break;
				case "td":
				case "th":
				case "caption":
					a.children && a.children.length || a.appendChild(t.ie11below ? UE.uNode.createText(" ") : UE.uNode.createElement("br"));
					break;
				case "table":
					c.options.disabledTableInTable && e(a) && (a.parentNode.insertBefore(UE.uNode.createText(a.innerText()), a), a.parentNode.removeChild(a))
				} else a.firstChild() ? "span" != a.tagName || a.attrs && !q.isEmptyObject(a.attrs) || a.parentNode.removeChild(a, !0) : a.parentNode.removeChild(a)
			})
		});
		c.addOutputRule(function(a) {
			var e;
			a.traversal(function(a) {
				if ("element" == a.type) if (!c.options.autoClearEmptyNode || !y.$inline[a.tagName] || y.$empty[a.tagName] || a.attrs && !q.isEmptyObject(a.attrs)) switch (a.tagName) {
				case "div":
					if (e = a.getAttr("cdata_tag")) a.tagName = e, a.appendChild(UE.uNode.createText(a.getAttr("cdata_data"))), a.setAttr({
						cdata_tag: "",
						cdata_data: "",
						_ue_custom_node_: ""
					});
					break;
				case "a":
					(e = a.getAttr("_href")) && a.setAttr({
						href: q.html(e),
						_href: ""
					});
					break;
				case "span":
					(e = a.getAttr("id")) && /^_baidu_bookmark_/i.test(e) && a.parentNode.removeChild(a);
					if (c.getOpt("rgb2Hex")) {
						var b = a.getAttr("style");
						b && a.setAttr("style", b.replace(/rgba?\(([\d,\s]+)\)/g, function(a, b) {
							var d = b.split(",");
							if (3 < d.length) return "";
							b = "#";
							for (var f = 0, e; e = d[f++];) e = parseInt(e.replace(/[^\d]/gi, ""), 10).toString(16), b += 1 == e.length ? "0" + e : e;
							return b.toUpperCase()
						}))
					}
					break;
				case "img":
					(e = a.getAttr("_src")) && a.setAttr({
						src: a.getAttr("_src"),
						_src: ""
					})
				} else a.firstChild() ? "span" != a.tagName || a.attrs && !q.isEmptyObject(a.attrs) || a.parentNode.removeChild(a, !0) : a.parentNode.removeChild(a)
			})
		})
	};
	UE.commands.inserthtml = {
		execCommand: function(c, a, e) {
			var b = this,
				f;
			if (a && !0 !== b.fireEvent("beforeinserthtml", a)) {
				f = b.selection.getRange();
				c = f.document.createElement("div");
				c.style.display = "inline";
				e || (e = UE.htmlparser(a), b.options.filterRules && UE.filterNode(e, b.options.filterRules), b.filterInputRule(e), a = e.toHtml());
				c.innerHTML = q.trim(a);
				if (!f.collapsed && (e = f.startContainer, g.isFillChar(e) && f.setStartBefore(e), e = f.endContainer, g.isFillChar(e) && f.setEndAfter(e), f.txtToElmBoundary(), f.endContainer && 1 == f.endContainer.nodeType && (e = f.endContainer.childNodes[f.endOffset]) && g.isBr(e) && f.setEndAfter(e), 0 == f.startOffset && (e = f.startContainer, g.isBoundaryNode(e, "firstChild") && (e = f.endContainer, f.endOffset == (3 == e.nodeType ? e.nodeValue.length : e.childNodes.length) && g.isBoundaryNode(e, "lastChild") && (b.body.innerHTML = "<p>" + (t.ie ? "" : "<br/>") + "</p>", f.setStart(b.body.firstChild, 0).collapse(!0)))), !f.collapsed && f.deleteContents(), 1 == f.startContainer.nodeType)) {
					var h = f.startContainer.childNodes[f.startOffset],
						d;
					if (h && g.isBlockElm(h) && (d = h.previousSibling) && g.isBlockElm(d)) {
						for (f.setEnd(d, d.childNodes.length).collapse(); h.firstChild;) d.appendChild(h.firstChild);
						g.remove(h)
					}
				}
				var l, k;
				e = 0;
				var n;
				f.inFillChar() && (h = f.startContainer, g.isFillChar(h) ? (f.setStartBefore(h).collapse(!0), g.remove(h)) : g.isFillChar(h, !0) && (h.nodeValue = h.nodeValue.replace(Q, ""), f.startOffset--, f.collapsed && f.collapse(!0)));
				var m = g.findParentByTagName(f.startContainer, "li", !0);
				if (m) {
					for (var r; h = c.firstChild;) {
						for (; h && (3 == h.nodeType || !g.isBlockElm(h) || "HR" == h.tagName);) l = h.nextSibling, f.insertNode(h).collapse(), r = h, h = l;
						if (h) if (/^(ol|ul)$/i.test(h.tagName)) {
							for (; h.firstChild;) r = h.firstChild, g.insertAfter(m, h.firstChild), m = m.nextSibling;
							g.remove(h)
						} else l = h.nextSibling, d = b.document.createElement("li"), g.insertAfter(m, d), d.appendChild(h), r = h, h = l, m = d
					}
					m = g.findParentByTagName(f.startContainer, "li", !0);
					g.isEmptyBlock(m) && g.remove(m);
					r && f.setStartAfter(r).collapse(!0).select(!0)
				} else {
					r = 0;
					(h = g.findParentByTagName(f.startContainer, "section", !0)) && g.hasClass(h, "_135editor") && "paragraph" == h.getAttribute("data-role") && g.isEmptyBlock(h) && 0 < jQuery(c).find("._135editor").size() && (r = b.document.createElement("p"), h.parentNode.insertBefore(r, h), g.fillNode(b.document, r), f.setStart(r, 0).setCursor(), r = 1);
					for (; h = c.firstChild;) {
						f.insertNode(h);
						n = h.nextSibling;
						if (!e && h.nodeType == g.NODE_ELEMENT && g.isBlockElm(h) && (l = g.findParent(h, function(a) {
							return g.isBlockElm(a)
						})) && "body" != l.tagName.toLowerCase() && y[l.tagName] && (!y[l.tagName][h.nodeName] || h.parentNode !== l)) {
							if (y[l.tagName][h.nodeName]) for (k = h.parentNode; k !== l;) d = k, k = k.parentNode;
							else d = l;
							g.breakParent(h, d || k);
							d = h.previousSibling;
							g.trimWhiteTextNode(d);
							d.childNodes.length || g.remove(d);
							e = 1
						}
						l = h.nextSibling;
						if (!c.firstChild && l && g.isBlockElm(l)) {
							f.setStart(l, 0).collapse(!0);
							break
						}
						f.setEndAfter(h).collapse()
					}
					h = f.startContainer;
					n && g.isBr(n) && g.remove(n);
					if (g.isBlockElm(h) && g.isEmptyNode(h)) if (r) {
						if (n = h.nextSibling) f.setStart(n, 0).collapse(!0).shrinkBoundary(), g.remove(h)
					} else try {
						h.innerHTML = t.ie ? g.fillChar : "<br/>"
					} catch (u) {
						f.setStartBefore(h), g.remove(h)
					}
					try {
						f.select(!0)
					} catch (u) {}
				}
				setTimeout(function() {
					f = b.selection.getRange();
					f.scrollToView(b.autoHeightEnabled, b.autoHeightEnabled ? g.getXY(b.iframe).y : 0);
					b.fireEvent("afterinserthtml", a)
				}, 200)
			}
		}
	};
	UE.plugins.autotypeset = function() {
		function c(a, b) {
			if (!a || 3 == a.nodeType) return 0;
			if (g.isBr(a)) return 1;
			if (a && a.parentNode && l[a.tagName.toLowerCase()]) return k && k.contains(a) || a.getAttribute("pagebreak") ? 0 : b ? !g.isEmptyBlock(a) : g.isEmptyBlock(a, new RegExp("[\\s" + g.fillChar + "]", "g"))
		}
		function a(a) {
			a.style.cssText || (g.removeAttributes(a, ["style"]), "span" == a.tagName.toLowerCase() && g.hasNoAttributes(a) && g.remove(a, !0))
		}
		function e(b, e) {
			var l;
			if (e) {
				if (!f.pasteFilter) return;
				l = this.document.createElement("div");
				l.innerHTML = e.html
			} else l = this.document.body;
			for (var m = g.getElementsByTagName(l, "*"), n = 0, w; w = m[n++];) if (!0 !== this.fireEvent("excludeNodeinautotype", w)) {
				f.clearFontSize && w.style.fontSize && (g.removeStyle(w, "font-size"), a(w));
				f.clearFontFamily && w.style.fontFamily && (g.removeStyle(w, "font-family"), a(w));
				if (c(w)) {
					if (f.mergeEmptyline) for (var x = w.nextSibling, E, J = g.isBr(w); c(x);) {
						E = x;
						x = E.nextSibling;
						if (J && (!x || x && !g.isBr(x))) break;
						g.remove(E)
					}
					if (f.removeEmptyline && g.inDoc(w, l) && !d[w.parentNode.tagName.toLowerCase()]) {
						if (g.isBr(w) && (x = w.nextSibling) && !g.isBr(x)) continue;
						g.remove(w);
						continue
					}
				}
				c(w, !0) && "SPAN" != w.tagName && (f.indent && (w.style.textIndent = f.indentValue), f.textAlign && (w.style.textAlign = f.textAlign));
				if (f.removeClass && w.className && !h[w.className.toLowerCase()]) {
					if (k && k.contains(w)) continue;
					g.removeAttributes(w, ["class"])
				}
				if (f.imageBlockLine && "img" == w.tagName.toLowerCase() && !w.getAttribute("emotion")) if (e) switch (J = w, f.imageBlockLine) {
				case "left":
				case "right":
				case "none":
					for (var x = J.parentNode, R; y.$inline[x.tagName] || "A" == x.tagName;) x = x.parentNode;
					E = x;
					if ("P" == E.tagName && "center" == g.getStyle(E, "text-align") && !g.isBody(E) && 1 == g.getChildCount(E, function(a) {
						return !g.isBr(a) && !g.isWhitespace(a)
					})) if (R = E.previousSibling, x = E.nextSibling, R && x && 1 == R.nodeType && 1 == x.nodeType && R.tagName == x.tagName && g.isBlockElm(R)) {
						for (R.appendChild(E.firstChild); x.firstChild;) R.appendChild(x.firstChild);
						g.remove(E);
						g.remove(x)
					} else g.setStyle(E, "text-align", "");
					g.setStyle(J, "float", f.imageBlockLine);
					break;
				case "center":
					if ("center" != this.queryCommandValue("imagefloat")) {
						x = J.parentNode;
						g.setStyle(J, "float", "none");
						for (E = J; x && 1 == g.getChildCount(x, function(a) {
							return !g.isBr(a) && !g.isWhitespace(a)
						}) && (y.$inline[x.tagName] || "A" == x.tagName);) E = x, x = x.parentNode;
						x = this.document.createElement("p");
						g.setAttributes(x, {
							style: "text-align:center"
						});
						E.parentNode.insertBefore(x, E);
						x.appendChild(E);
						g.setStyle(E, "float", "")
					}
				} else this.selection.getRange().selectNode(w).select(), this.execCommand("imagefloat", f.imageBlockLine);
				f.removeEmptyNode && f.removeTagNames[w.tagName.toLowerCase()] && g.hasNoAttributes(w) && g.isEmptyBlock(w) && g.remove(w)
			}
			f.tobdc && (m = UE.htmlparser(l.innerHTML), m.traversal(function(a) {
				if ("text" == a.type) {
					for (var b = a.data, b = q.html(b), d = "", f = 0; f < b.length; f++) d = 32 == b.charCodeAt(f) ? d + String.fromCharCode(12288) : 127 > b.charCodeAt(f) ? d + String.fromCharCode(b.charCodeAt(f) + 65248) : d + b.charAt(f);
					a.data = d
				}
			}), l.innerHTML = m.toHtml());
			f.bdc2sb && (m = UE.htmlparser(l.innerHTML), m.traversal(function(a) {
				if ("text" == a.type) {
					for (var b = a.data, d = "", f = 0; f < b.length; f++) var k = b.charCodeAt(f),
						d = 65281 <= k && 65373 >= k ? d + String.fromCharCode(b.charCodeAt(f) - 65248) : 12288 == k ? d + String.fromCharCode(b.charCodeAt(f) - 12288 + 32) : d + b.charAt(f);
					a.data = d
				}
			}), l.innerHTML = m.toHtml());
			e && (e.html = l.innerHTML)
		}
		this.setOpt({
			autotypeset: {
				mergeEmptyline: !0,
				removeClass: !1,
				removeEmptyline: !1,
				textAlign: "left",
				imageBlockLine: "center",
				pasteFilter: !1,
				clearFontSize: !1,
				clearFontFamily: !1,
				removeEmptyNode: !1,
				removeTagNames: q.extend({
					div: 1
				}, y.$removeEmpty),
				indent: !1,
				indentValue: "2em",
				bdc2sb: !1,
				tobdc: !1
			}
		});
		var b = this,
			f = b.options.autotypeset,
			h = {
				selectTdClass: 1,
				pagebreak: 1,
				anchorclass: 1
			},
			d = {
				li: 1
			},
			l = {
				div: 1,
				p: 1,
				blockquote: 1,
				center: 1,
				h1: 1,
				h2: 1,
				h3: 1,
				h4: 1,
				h5: 1,
				h6: 1,
				span: 1
			},
			k;
		f && (function() {
			var a = b.getPreferences("autotypeset");
			q.extend(b.options.autotypeset, a)
		}(), f.pasteFilter = !1, f.removeEmptyNode = !1, f.pasteFilter && b.addListener("beforepaste", e), b.commands.autotypeset = {
			execCommand: function() {
				b.removeListener("beforepaste", e);
				f.pasteFilter && b.addListener("beforepaste", e);
				e.call(b)
			}
		})
	};
	UE.plugin.register("autosubmit", function() {
		return {
			shortcutkey: {
				autosubmit: "ctrl+13"
			},
			commands: {
				autosubmit: {
					execCommand: function() {
						var c = g.findParentByTagName(this.iframe, "form", !1);
						c && !1 !== this.fireEvent("beforesubmit") && (this.sync(), c.submit())
					}
				}
			}
		}
	});
	UE.plugin.register("background", function() {
		function c(a) {
			var b = {};
			a = a.split(";");
			q.each(a, function(a) {
				var d = a.indexOf(":"),
					f = q.trim(a.substr(0, d)).toLowerCase();
				f && (b[f] = q.trim(a.substr(d + 1) || ""))
			});
			return b
		}
		function a(a) {
			if (a) {
				var b = [],
					d;
				for (d in a) a.hasOwnProperty(d) && b.push(d + ":" + a[d] + "; ");
				q.cssRule("editor_background", b.length ? "body{" + b.join("") + "}" : "", e.document)
			} else q.cssRule("editor_background", "", e.document)
		}
		var e = this,
			b, f = /body[\s]*\{(.+)\}/i,
			h = e.hasContents;
		e.hasContents = function() {
			return e.queryCommandValue("background") ? !0 : h.apply(e, arguments)
		};
		return {
			bindEvents: {
				getAllHtml: function(a, b) {
					var d = this.body,
						f = g.getComputedStyle(d, "background-image"),
						h;
					h = 0 < f.indexOf(e.options.imagePath) ? f.substring(f.indexOf(e.options.imagePath), f.length - 1).replace(/"|\(|\)/ig, "") : "none" != f ? f.replace(/url\("?|"?\)/ig, "") : "";
					var f = '<style type="text/css">body{',
						d = {
							"background-color": g.getComputedStyle(d, "background-color") || "#ffffff",
							"background-image": h ? "url(" + h + ")" : "",
							"background-repeat": g.getComputedStyle(d, "background-repeat") || "",
							"background-position": t.ie ? g.getComputedStyle(d, "background-position-x") + " " + g.getComputedStyle(d, "background-position-y") : g.getComputedStyle(d, "background-position"),
							height: g.getComputedStyle(d, "height")
						},
						c;
					for (c in d) d.hasOwnProperty(c) && (f += c + ":" + d[c] + "; ");
					b.push(f + "}</style> ")
				},
				aftersetcontent: function() {
					0 == b && a()
				}
			},
			inputRule: function(d) {
				b = !1;
				q.each(d.getNodesByTagName("p"), function(d) {
					var f = d.getAttr("data-background");
					f && (b = !0, a(c(f)), d.parentNode.removeChild(d))
				})
			},
			outputRule: function(a) {
				var b = (q.cssRule("editor_background", this.document) || "").replace(/[\n\r]+/g, "").match(f);
				b && a.appendChild(UE.uNode.createElement('<p style="display:none;" data-background="' + q.trim(b[1].replace(/"/g, "").replace(/[\s]+/g, " ")) + '"><br/></p>'))
			},
			commands: {
				background: {
					execCommand: function(b, f) {
						a(f)
					},
					queryCommandValue: function() {
						var a = (q.cssRule("editor_background", this.document) || "").replace(/[\n\r]+/g, "").match(f);
						return a ? c(a[1]) : null
					},
					notNeedUndo: !0
				}
			}
		}
	});
	UE.commands.imagefloat = {
		execCommand: function(c, a) {
			var e = this.selection.getRange();
			if (!e.collapsed) {
				var b = e.getClosedNode();
				if (b && "IMG" == b.tagName) switch (a) {
				case "left":
				case "right":
				case "none":
					for (var f = b.parentNode, h, d; y.$inline[f.tagName] || "A" == f.tagName;) f = f.parentNode;
					h = f;
					if ("P" == h.tagName && "center" == g.getStyle(h, "text-align")) {
						if (!g.isBody(h) && 1 == g.getChildCount(h, function(a) {
							return !g.isBr(a) && !g.isWhitespace(a)
						})) if (f = h.previousSibling, d = h.nextSibling, f && d && 1 == f.nodeType && 1 == d.nodeType && f.tagName == d.tagName && g.isBlockElm(f)) {
							for (f.appendChild(h.firstChild); d.firstChild;) f.appendChild(d.firstChild);
							g.remove(h);
							g.remove(d)
						} else g.setStyle(h, "text-align", "");
						e.selectNode(b).select()
					}
					g.setStyle(b, "float", "none" == a ? "" : a);
					"none" == a && g.removeAttributes(b, "align");
					break;
				case "center":
					if ("center" != this.queryCommandValue("imagefloat")) {
						f = b.parentNode;
						g.setStyle(b, "float", "");
						g.removeAttributes(b, "align");
						for (h = b; f && 1 == g.getChildCount(f, function(a) {
							return !g.isBr(a) && !g.isWhitespace(a)
						}) && (y.$inline[f.tagName] || "A" == f.tagName);) h = f, f = f.parentNode;
						e.setStartBefore(h).setCursor(!1);
						f = this.document.createElement("div");
						f.appendChild(h);
						g.setStyle(h, "float", "");
						this.execCommand("insertHtml", '<p id="_img_parent_tmp" style="text-align:center">' + f.innerHTML + "</p>");
						h = this.document.getElementById("_img_parent_tmp");
						h.removeAttribute("id");
						h = h.firstChild;
						e.selectNode(h).select();
						(d = h.parentNode.nextSibling) && g.isEmptyNode(d) && g.remove(d)
					}
				}
			}
		},
		queryCommandValue: function() {
			var c = this.selection.getRange(),
				a;
			return c.collapsed ? "none" : (c = c.getClosedNode()) && 1 == c.nodeType && "IMG" == c.tagName ? (a = g.getComputedStyle(c, "float") || c.getAttribute("align"), "none" == a && (a = "center" == g.getComputedStyle(c.parentNode, "text-align") ? "center" : a), {
				left: 1,
				right: 1,
				center: 1
			}[a] ? a : "none") : "none"
		},
		queryCommandState: function() {
			var c = this.selection.getRange();
			return c.collapsed ? -1 : (c = c.getClosedNode()) && 1 == c.nodeType && "IMG" == c.tagName ? 0 : -1
		}
	};
	UE.commands.insertimage = {
		execCommand: function(c, a) {
			a = q.isArray(a) ? a : [a];
			if (a.length) {
				var e = this.selection.getRange(),
					b = e.getClosedNode();
				if (!0 !== this.fireEvent("beforeinsertimage", a)) {
					if (!b || !/img/i.test(b.tagName) || "edui-faked-video" == b.className && -1 == b.className.indexOf("edui-upload-video") || b.getAttribute("word_img")) {
						var e = [],
							f;
						f = a[0];
						if (1 == a.length) b = '<img src="' + f.src + '" ' + (f._src ? ' _src="' + f._src + '" ' : "") + (f.width ? 'width="' + f.width + '" ' : "") + (f.height ? ' height="' + f.height + '" ' : "") + (f.aid ? ' aid="' + f.aid + '" ' : "") + (f.id ? ' id="' + f.id + '" ' : "") + ("left" == f.floatStyle || "right" == f.floatStyle ? ' style="float:' + f.floatStyle + ';"' : "") + (f.title && "" != f.title ? ' title="' + f.title + '"' : "") + (f.border && "0" != f.border ? ' border="' + f.border + '"' : "") + (f.alt && "" != f.alt ? ' alt="' + f.alt + '"' : "") + (f.hspace && "0" != f.hspace ? ' hspace = "' + f.hspace + '"' : "") + (f.vspace && "0" != f.vspace ? ' vspace = "' + f.vspace + '"' : "") + "/>", "center" == f.floatStyle && (b = '<p style="text-align: center">' + b + "</p>"), e.push(b);
						else for (var h = 0; f = a[h++];) b = "<p " + ("center" == f.floatStyle ? 'style="text-align: center" ' : "") + '><img src="' + f.src + '" ' + (f.width ? 'width="' + f.width + '" ' : "") + (f._src ? ' _src="' + f._src + '" ' : "") + (f.height ? ' height="' + f.height + '" ' : "") + (f.aid ? ' aid="' + f.aid + '" ' : "") + (f.id ? ' id="' + f.id + '" ' : "") + ' style="' + (f.floatStyle && "center" != f.floatStyle ? "float:" + f.floatStyle + ";" : "") + (f.border || "") + '" ' + (f.title ? ' title="' + f.title + '"' : "") + " /></p>", e.push(b);
						this.execCommand("insertHtml", e.join(""))
					} else f = a.shift(), h = f.floatStyle, delete f.floatStyle, g.setAttributes(b, f), this.execCommand("imagefloat", h), 0 < a.length && (e.setStartAfter(b).setCursor(!1, !0), this.execCommand("insertimage", a));
					this.fireEvent("afterinsertimage", a)
				}
			}
		}
	};
	UE.plugins.justify = function() {
		var c = g.isBlockElm,
			a = {
				left: 1,
				right: 1,
				center: 1,
				justify: 1
			},
			e = function(a, f) {
				var b = a.createBookmark(),
					d = function(a) {
						return 1 == a.nodeType ? "br" != a.tagName.toLowerCase() && !g.isBookmarkNode(a) : !g.isWhitespace(a)
					};
				a.enlarge(!0);
				for (var e = a.createBookmark(), k = g.getNextDomNode(e.start, !1, d), n = a.cloneRange(), m; k && !(g.getPosition(k, e.end) & g.POSITION_FOLLOWING);) if (3 != k.nodeType && c(k)) k = g.getNextDomNode(k, !0, d);
				else {
					for (n.setStartBefore(k); k && k !== e.end && !c(k);) m = k, k = g.getNextDomNode(k, !1, null, function(a) {
						return !c(a)
					});
					n.setEndAfter(m);
					k = n.getCommonAncestor();
					if (!g.isBody(k) && c(k)) g.setStyles(k, q.isString(f) ? {
						"text-align": f
					} : f);
					else {
						k = a.document.createElement("p");
						g.setStyles(k, q.isString(f) ? {
							"text-align": f
						} : f);
						var r = n.extractContents();
						k.appendChild(r);
						n.insertNode(k)
					}
					k = g.getNextDomNode(k, !1, d)
				}
				return a.moveToBookmark(e).moveToBookmark(b)
			};
		UE.commands.justify = {
			execCommand: function(a, f) {
				var b = this.selection.getRange(),
					d;
				b.collapsed && (d = this.document.createTextNode("p"), b.insertNode(d));
				e(b, f);
				d && (b.setStartBefore(d).collapse(!0), g.remove(d));
				b.select();
				return !0
			},
			queryCommandValue: function() {
				var b = this.selection.getStart(),
					b = g.getComputedStyle(b, "text-align");
				return a[b] ? b : "left"
			},
			queryCommandState: function() {
				var a = this.selection.getStart();
				return a && g.findParentByTagName(a, ["td", "th", "caption"], !0) ? -1 : 0
			}
		}
	};
	UE.plugins.font = function() {
		function c(a) {
			for (var b; b = a.parentNode;) if ("SPAN" == b.tagName && 1 == g.getChildCount(b, function(a) {
				return !g.isBookmarkNode(a) && !g.isBr(a)
			})) b.style.cssText += a.style.cssText, g.remove(a, !0), a = b;
			else break
		}
		function a(a, b, d) {
			if (h[b] && (a.adjustmentBoundary(), !a.collapsed && 1 == a.startContainer.nodeType)) {
				var f = a.startContainer.childNodes[a.startOffset];
				if (f && g.isTagNode(f, "span")) {
					var k = a.createBookmark();
					q.each(g.getElementsByTagName(f, "span"), function(a) {
						!a.parentNode || g.isBookmarkNode(a) || "backcolor" == b && g.getComputedStyle(a, "background-color").toLowerCase() === d || (g.removeStyle(a, h[b]), 0 == a.style.cssText.replace(/^\s+$/, "").length && g.remove(a, !0))
					});
					a.moveToBookmark(k)
				}
			}
		}
		function e(b, d, f) {
			var k = b.collapsed,
				e = b.createBookmark();
			if (k) for (k = e.start.parentNode; y.$inline[k.tagName];) k = k.parentNode;
			else k = g.getCommonAncestor(e.start, e.end);
			q.each(g.getElementsByTagName(k, "span"), function(a) {
				if (a.parentNode && !g.isBookmarkNode(a)) if (/\s*border\s*:\s*none;?\s*/i.test(a.style.cssText)) / ^ \s * border\s * : \s * none; ? \s * $ / .test(a.style.cssText) ? g.remove(a, !0) : g.removeStyle(a, "border");
				else {
					/border/i.test(a.style.cssText) && "SPAN" == a.parentNode.tagName && /border/i.test(a.parentNode.style.cssText) && (a.style.cssText = a.style.cssText.replace(/border[^:]*:[^;]+;?/gi, ""));
					if ("fontborder" != d || "none" != f) for (var b = a.nextSibling; b && 1 == b.nodeType && "SPAN" == b.tagName;) {
						if (g.isBookmarkNode(b) && "fontborder" == d) a.appendChild(b);
						else if (b.style.cssText == a.style.cssText && (g.moveChild(b, a), g.remove(b)), a.nextSibling === b) break;
						b = a.nextSibling
					}
					c(a);
					t.ie && 8 < t.version && (b = g.findParent(a, function(a) {
						return "SPAN" == a.tagName && /background-color/.test(a.style.cssText)
					})) && !/background-color/.test(a.style.cssText) && (a.style.backgroundColor = b.style.backgroundColor)
				}
			});
			b.moveToBookmark(e);
			a(b, d, f)
		}
		var b = {
			forecolor: "color",
			shadowcolor: "text-shadow",
			backcolor: "background-color",
			fontsize: "font-size",
			fontfamily: "font-family",
			underline: "text-decoration",
			strikethrough: "text-decoration",
			fontborder: "border"
		},
			f = {
				underline: 1,
				strikethrough: 1,
				fontborder: 1
			},
			h = {
				forecolor: "color",
				shadowcolor: "text-shadow",
				backcolor: "background-color",
				fontsize: "font-size",
				fontfamily: "font-family"
			};
		this.setOpt({
			fontfamily: [{
				name: "songti",
				val: "宋体,SimSun"
			}, {
				name: "yahei",
				val: "微软雅黑,Microsoft YaHei"
			}, {
				name: "kaiti",
				val: "楷体,楷体_GB2312, SimKai"
			}, {
				name: "heiti",
				val: "黑体, SimHei"
			}, {
				name: "lishu",
				val: "隶书, SimLi"
			}, {
				name: "andaleMono",
				val: "andale mono"
			}, {
				name: "arial",
				val: "arial, helvetica,sans-serif"
			}, {
				name: "arialBlack",
				val: "arial black,avant garde"
			}, {
				name: "comicSansMs",
				val: "comic sans ms"
			}, {
				name: "impact",
				val: "impact,chicago"
			}, {
				name: "timesNewRoman",
				val: "times new roman"
			}],
			fontsize: [10, 11, 12, 14, 16, 18, 20, 24, 36]
		});
		this.addInputRule(function(a) {
			q.each(a.getNodesByTagName("u s del font strike"), function(a) {
				if ("font" == a.tagName) {
					var b = [],
						d;
					for (d in a.attrs) switch (d) {
					case "size":
						b.push("font-size:" + ({
							1: "10",
							2: "12",
							3: "16",
							4: "18",
							5: "24",
							6: "32",
							7: "48"
						}[a.attrs[d]] || a.attrs[d]) + "px");
						break;
					case "color":
						b.push("color:" + a.attrs[d]);
						break;
					case "face":
						b.push("font-family:" + a.attrs[d]);
						break;
					case "style":
						b.push(a.attrs[d])
					}
					a.attrs = {
						style: b.join(";")
					}
				} else b = "u" == a.tagName ? "underline" : "line-through", a.attrs = {
					style: (a.getAttr("style") || "") + "text-decoration:" + b + ";"
				};
				a.tagName = "span"
			})
		});
		for (var d in b)(function(a, b) {
			UE.commands[a] = {
				execCommand: function(d, k) {
					k = k || (this.queryCommandState(d) ? "none" : "underline" == d ? "underline" : "fontborder" == d ? "1px solid #000" : "line-through");
					var h = this.selection.getRange(),
						c;
					if ("default" == k) h.collapsed && (c = this.document.createTextNode("font"), h.insertNode(c).select()), this.execCommand("removeFormat", "span,a", b), c && (h.setStartBefore(c).collapse(!0), g.remove(c)), e(h, d, k), h.select();
					else if (h.collapsed) {
						var l = g.findParentByTagName(h.startContainer, "span", !0);
						c = this.document.createTextNode("font");
						if (!l || l.children.length || l[t.ie ? "innerText" : "textContent"].replace(Q, "").length) {
							h.insertNode(c);
							h.selectNode(c).select();
							l = h.document.createElement("span");
							if (f[a]) {
								if (g.findParentByTagName(c, "a", !0)) {
									h.setStartBefore(c).setCursor();
									g.remove(c);
									return
								}
								this.execCommand("removeFormat", "span,a", b)
							}
							l.style.cssText = b + ":" + k;
							c.parentNode.insertBefore(l, c);
							if (!t.ie || t.ie && 9 == t.version) for (var m = l.parentNode; !g.isBlockElm(m);)"SPAN" == m.tagName && (l.style.cssText = m.style.cssText + ";" + l.style.cssText), m = m.parentNode;
							ja ? setTimeout(function() {
								h.setStart(l, 0).collapse(!0);
								e(h, d, k);
								h.select()
							}) : (h.setStart(l, 0).collapse(!0), e(h, d, k), h.select())
						} else h.insertNode(c), f[a] && (h.selectNode(c).select(), this.execCommand("removeFormat", "span,a", b, null), l = g.findParentByTagName(c, "span", !0), h.setStartBefore(c)), l && (l.style.cssText += ";" + b + ":" + k), h.collapse(!0).select();
						g.remove(c)
					} else f[a] && this.queryCommandValue(a) && this.execCommand("removeFormat", "span,a", b), h = this.selection.getRange(), h.applyInlineStyle("span", {
						style: b + ":" + k
					}), e(h, d, k), h.select();
					return !0
				},
				queryCommandValue: function(a) {
					var d = this.selection.getStart();
					if ("underline" == a || "strikethrough" == a) {
						for (var f = d; f && !g.isBlockElm(f) && !g.isBody(f);) {
							if (1 == f.nodeType && (a = g.getComputedStyle(f, b), "none" != a)) return a;
							f = f.parentNode
						}
						return "none"
					}
					if ("fontborder" == a) {
						for (a = d; a && y.$inline[a.tagName];) {
							if ((f = g.getComputedStyle(a, "border")) && /1px/.test(f) && /solid/.test(f)) return f;
							a = a.parentNode
						}
						return ""
					}
					return "FontSize" == a ? (f = g.getComputedStyle(d, b), (a = /^([\d\.]+)(\w+)$/.exec(f)) ? Math.floor(a[1]) + a[2] : f) : g.getComputedStyle(d, b)
				},
				queryCommandState: function(a) {
					if (!f[a]) return 0;
					var b = this.queryCommandValue(a);
					return "fontborder" == a ? /1px/.test(b) && /solid/.test(b) : "underline" == a ? /underline/.test(b) : /line\-through/.test(b)
				}
			}
		})(d, b[d])
	};
	UE.plugins.link = function() {
		function c(a) {
			var e = a.startContainer,
				b = a.endContainer;
			(e = g.findParentByTagName(e, "a", !0)) && a.setStartBefore(e);
			(b = g.findParentByTagName(b, "a", !0)) && a.setEndAfter(b)
		}
		UE.commands.unlink = {
			execCommand: function() {
				var a = this.selection.getRange(),
					e;
				if (!a.collapsed || g.findParentByTagName(a.startContainer, "a", !0)) e = a.createBookmark(), c(a), a.removeInlineStyle("a").moveToBookmark(e).select()
			},
			queryCommandState: function() {
				return !this.highlight && this.queryCommandValue("link") ? 0 : -1
			}
		};
		UE.commands.link = {
			execCommand: function(a, e) {
				var b;
				e._href && (e._href = q.unhtml(e._href, /[<">]/g));
				e.href && (e.href = q.unhtml(e.href, /[<">]/g));
				e.textValue && (e.textValue = q.unhtml(e.textValue, /[<">]/g));
				var f = b = this.selection.getRange(),
					h = f.cloneRange(),
					d = this.queryCommandValue("link");
				c(f = f.adjustmentBoundary());
				var l = f.startContainer;
				1 == l.nodeType && d && (l = l.childNodes[f.startOffset]) && 1 == l.nodeType && "A" == l.tagName && /^(?:https?|ftp|file)\s*:\s*\/\//.test(l[t.ie ? "innerText" : "textContent"]) && (l[t.ie ? "innerText" : "textContent"] = q.html(e.textValue || e.href));
				if (!h.collapsed || d) f.removeInlineStyle("a"), h = f.cloneRange();
				if (h.collapsed) {
					var d = f.document.createElement("a"),
						k;
					e.textValue ? (k = q.html(e.textValue), delete e.textValue) : k = q.html(e.href);
					g.setAttributes(d, e);
					(l = g.findParentByTagName(h.startContainer, "a", !0)) && g.isInNodeEndBoundary(h, l) && f.setStartAfter(l).collapse(!0);
					d[t.ie ? "innerText" : "textContent"] = k;
					f.insertNode(d).selectNode(d)
				} else f.applyInlineStyle("a", e);
				b.collapse().select(!0)
			},
			queryCommandValue: function() {
				var a = this.selection.getRange(),
					e;
				if (a.collapsed) {
					if (e = a.startContainer, (e = 1 == e.nodeType ? e : e.parentNode) && (e = g.findParentByTagName(e, "a", !0)) && !g.isInNodeEndBoundary(a, e)) return e
				} else {
					a.shrinkBoundary();
					var b = 3 != a.startContainer.nodeType && a.startContainer.childNodes[a.startOffset] ? a.startContainer.childNodes[a.startOffset] : a.startContainer,
						f = 3 == a.endContainer.nodeType || 0 == a.endOffset ? a.endContainer : a.endContainer.childNodes[a.endOffset - 1],
						a = a.getCommonAncestor();
					e = g.findParentByTagName(a, "a", !0);
					if (!e && 1 == a.nodeType) for (var a = a.getElementsByTagName("a"), h, d, c = 0, k; k = a[c++];) if (h = g.getPosition(k, b), d = g.getPosition(k, f), (h & g.POSITION_FOLLOWING || h & g.POSITION_CONTAINS) && (d & g.POSITION_PRECEDING || d & g.POSITION_CONTAINS)) {
						e = k;
						break
					}
					return e
				}
			},
			queryCommandState: function() {
				var a = this.selection.getRange().getClosedNode();
				return !a || "edui-faked-video" != a.className && -1 == a.className.indexOf("edui-upload-video") ? 0 : -1
			}
		}
	};
	UE.plugins.removeformat = function() {
		this.setOpt({
			removeFormatTags: "b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var",
			removeFormatAttributes: "class,style,lang,width,height,align,hspace,valign"
		});
		this.commands.removeformat = {
			execCommand: function(c, a, e, b, f) {
				function h(a) {
					if (3 == a.nodeType || "span" != a.tagName.toLowerCase()) return 0;
					if (t.ie) {
						var b = a.attributes;
						if (b.length) {
							a = 0;
							for (var d = b.length; a < d; a++) if (b[a].specified) return 0;
							return 1
						}
					}
					return !a.attributes.length
				}
				var d = new RegExp("^(?:" + (a || this.options.removeFormatTags).replace(/,/g, "|") + ")$", "i"),
					l = e ? [] : (b || this.options.removeFormatAttributes).split(",");
				c = new F.Range(this.document);
				var k, n, m = function(a) {
						return 1 == a.nodeType
					};
				c = this.selection.getRange();
				(function(a) {
					var b = a.createBookmark();
					a.collapsed && a.enlarge(!0);
					if (!f) {
						var c = g.findParentByTagName(a.startContainer, "a", !0);
						c && a.setStartBefore(c);
						(c = g.findParentByTagName(a.endContainer, "a", !0)) && a.setEndAfter(c)
					}
					k = a.createBookmark();
					for (c = k.start;
					(n = c.parentNode) && !g.isBlockElm(n);) g.breakParent(c, n), g.clearEmptySibling(c);
					if (k.end) {
						for (c = k.end;
						(n = c.parentNode) && !g.isBlockElm(n);) g.breakParent(c, n), g.clearEmptySibling(c);
						for (var c = g.getNextDomNode(k.start, !1, m), r; c && c != k.end;) r = g.getNextDomNode(c, !0, m), y.$empty[c.tagName.toLowerCase()] || g.isBookmarkNode(c) || (d.test(c.tagName) ? e ? (g.removeStyle(c, e), h(c) && "text-decoration" != e && g.remove(c, !0)) : g.remove(c, !0) : y.$tableContent[c.tagName] || y.$list[c.tagName] || (g.removeAttributes(c, l), h(c) && g.remove(c, !0))), c = r
					}
					c = k.start.parentNode;
					!g.isBlockElm(c) || y.$tableContent[c.tagName] || y.$list[c.tagName] || g.removeAttributes(c, l);
					c = k.end.parentNode;
					k.end && g.isBlockElm(c) && !y.$tableContent[c.tagName] && !y.$list[c.tagName] && g.removeAttributes(c, l);
					a.moveToBookmark(k).moveToBookmark(b);
					c = a.startContainer;
					for (r = a.collapsed; 1 == c.nodeType && g.isEmptyNode(c) && y.$removeEmpty[c.tagName];) b = c.parentNode, a.setStartBefore(c), a.startContainer === a.endContainer && a.endOffset--, g.remove(c), c = b;
					if (!r) for (c = a.endContainer; 1 == c.nodeType && g.isEmptyNode(c) && y.$removeEmpty[c.tagName];) b = c.parentNode, a.setEndBefore(c), g.remove(c), c = b
				})(c);
				c.select()
			}
		}
	};
	UE.plugins.blockquote = function() {
		this.commands.blockquote = {
			execCommand: function(c, a) {
				var e = this.selection.getRange(),
					b = g.filterNodeList(this.selection.getStartElementPath(), "blockquote"),
					f = y.blockquote,
					h = e.createBookmark();
				if (b) {
					var f = e.startContainer,
						f = g.isBlockElm(f) ? f : g.findParent(f, function(a) {
							return g.isBlockElm(a)
						}),
						d = e.endContainer,
						d = g.isBlockElm(d) ? d : g.findParent(d, function(a) {
							return g.isBlockElm(a)
						}),
						f = g.findParentByTagName(f, "li", !0) || f,
						d = g.findParentByTagName(d, "li", !0) || d;
					"LI" == f.tagName || "TD" == f.tagName || f === b || g.isBody(f) ? g.remove(b, !0) : g.breakParent(f, b);
					f !== d && (b = g.findParentByTagName(d, "blockquote")) && ("LI" == d.tagName || "TD" == d.tagName || g.isBody(d) ? b.parentNode && g.remove(b, !0) : g.breakParent(d, b));
					for (var l = g.getElementsByTagName(this.document, "blockquote"), b = 0, k; k = l[b++];) k.childNodes.length ? g.getPosition(k, f) & g.POSITION_FOLLOWING && g.getPosition(k, d) & g.POSITION_PRECEDING && g.remove(k, !0) : g.remove(k)
				} else {
					b = e.cloneRange();
					l = d = 1 == b.startContainer.nodeType ? b.startContainer : b.startContainer.parentNode;
					for (k = 1;;) {
						if (g.isBody(d)) {
							l !== d ? e.collapsed ? (b.selectNode(l), k = 0) : b.setStartBefore(l) : b.setStart(d, 0);
							break
						}
						if (!f[d.tagName]) {
							e.collapsed ? b.selectNode(l) : b.setStartBefore(l);
							break
						}
						l = d;
						d = d.parentNode
					}
					if (k) for (l = d = d = 1 == b.endContainer.nodeType ? b.endContainer : b.endContainer.parentNode;;) {
						if (g.isBody(d)) {
							l !== d ? b.setEndAfter(l) : b.setEnd(d, d.childNodes.length);
							break
						}
						if (!f[d.tagName]) {
							b.setEndAfter(l);
							break
						}
						l = d;
						d = d.parentNode
					}
					d = e.document.createElement("blockquote");
					g.setAttributes(d, a);
					d.appendChild(b.extractContents());
					b.insertNode(d);
					f = g.getElementsByTagName(d, "blockquote");
					for (b = 0; d = f[b++];) d.parentNode && g.remove(d, !0)
				}
				e.moveToBookmark(h).select()
			},
			queryCommandState: function() {
				return g.filterNodeList(this.selection.getStartElementPath(), "blockquote") ? 1 : 0
			}
		}
	};
	UE.commands.touppercase = UE.commands.tolowercase = {
		execCommand: function(c) {
			var a = this.selection.getRange();
			if (a.collapsed) return a;
			for (var e = a.createBookmark(), b = e.end, f = function(a) {
					return !g.isBr(a) && !g.isWhitespace(a)
				}, h = g.getNextDomNode(e.start, !1, f); h && g.getPosition(h, b) & g.POSITION_PRECEDING && (3 == h.nodeType && (h.nodeValue = h.nodeValue["touppercase" == c ? "toUpperCase" : "toLowerCase"]()), h = g.getNextDomNode(h, !0, f), h !== b););
			a.moveToBookmark(e).select()
		}
	};
	UE.commands.indent = {
		execCommand: function() {
			var c = this.queryCommandState("indent") ? "0em" : this.options.indentValue || "2em";
			this.execCommand("Paragraph", "p", {
				style: "text-indent:" + c
			})
		},
		queryCommandState: function() {
			var c = g.filterNodeList(this.selection.getStartElementPath(), "p h1 h2 h3 h4 h5 h6");
			return c && c.style.textIndent && parseInt(c.style.textIndent) ? 1 : 0
		}
	};
	UE.commands.print = {
		execCommand: function() {
			this.window.print()
		},
		notNeedUndo: 1
	};
	UE.commands.preview = {
		execCommand: function() {
			var c = window.open("", "_blank", "").document;
			c.open();
			c.write('<!DOCTYPE html><html><head><meta charset="utf-8"/><script src="' + this.options.UEDITOR_HOME_URL + "ueditor.parse.js\"></script><script>setTimeout(function(){uParse('div',{rootPath: '" + this.options.UEDITOR_HOME_URL + "'})},300)</script></head><body><div>" + this.getContent(null, null, !0) + "</div></body></html>");
			c.close()
		},
		notNeedUndo: 1
	};
	UE.plugins.selectall = function() {
		this.commands.selectall = {
			execCommand: function() {
				var c = this.body,
					a = this.selection.getRange();
				a.selectNodeContents(c);
				g.isEmptyBlock(c) && (t.opera && c.firstChild && 1 == c.firstChild.nodeType && a.setStartAtFirst(c.firstChild), a.collapse(!0));
				a.select(!0)
			},
			notNeedUndo: 1
		};
		this.addshortcutkey({
			selectAll: "ctrl+65"
		})
	};
	UE.plugins.paragraph = function() {
		var c = g.isBlockElm,
			a = ["TD", "LI", "PRE"],
			e = function(b, f, e, d) {
				var h = b.createBookmark(),
					k = function(a) {
						return 1 == a.nodeType ? "br" != a.tagName.toLowerCase() && !g.isBookmarkNode(a) : !g.isWhitespace(a)
					},
					n;
				b.enlarge(!0);
				var m = b.createBookmark();
				n = g.getNextDomNode(m.start, !1, k);
				for (var r = b.cloneRange(), u; n && !(g.getPosition(n, m.end) & g.POSITION_FOLLOWING);) if (3 != n.nodeType && c(n)) n = g.getNextDomNode(n, !0, k);
				else {
					for (r.setStartBefore(n); n && n !== m.end && !c(n);) u = n, n = g.getNextDomNode(n, !1, null, function(a) {
						return !c(a)
					});
					r.setEndAfter(u);
					n = b.document.createElement(f);
					e && (g.setAttributes(n, e), d && "customstyle" == d && e.style && (n.style.cssText = e.style));
					n.appendChild(r.extractContents());
					g.isEmptyNode(n) && g.fillChar(b.document, n);
					r.insertNode(n);
					var v = n.parentNode;
					c(v) && !g.isBody(n.parentNode) && -1 == q.indexOf(a, v.tagName) && (d && "customstyle" == d || (v.getAttribute("dir") && n.setAttribute("dir", v.getAttribute("dir")), v.style.cssText && (n.style.cssText = v.style.cssText + ";" + n.style.cssText), v.style.textAlign && !n.style.textAlign && (n.style.textAlign = v.style.textAlign), v.style.textIndent && !n.style.textIndent && (n.style.textIndent = v.style.textIndent), v.style.padding && !n.style.padding && (n.style.padding = v.style.padding)), e && /h\d/i.test(v.tagName) && !/h\d/i.test(n.tagName) ? (g.setAttributes(v, e), d && "customstyle" == d && e.style && (v.style.cssText = e.style), g.remove(n.parentNode, !0), n = v) : g.remove(n.parentNode, !0));
					n = -1 != q.indexOf(a, v.tagName) ? v : n;
					n = g.getNextDomNode(n, !1, k)
				}
				return b.moveToBookmark(m).moveToBookmark(h)
			};
		this.setOpt("paragraph", {
			p: "",
			h1: "",
			h2: "",
			h3: "",
			h4: "",
			h5: "",
			h6: ""
		});
		this.commands.paragraph = {
			execCommand: function(a, f, h, d) {
				a = this.selection.getRange();
				if (a.collapsed) {
					var b = this.document.createTextNode("p");
					a.insertNode(b);
					if (t.ie) {
						var k = b.previousSibling;
						k && g.isWhitespace(k) && g.remove(k);
						(k = b.nextSibling) && g.isWhitespace(k) && g.remove(k)
					}
				}
				a = e(a, f, h, d);
				b && (a.setStartBefore(b).collapse(!0), pN = b.parentNode, g.remove(b), g.isBlockElm(pN) && g.isEmptyNode(pN) && g.fillNode(this.document, pN));
				t.gecko && a.collapsed && 1 == a.startContainer.nodeType && (h = a.startContainer.childNodes[a.startOffset]) && 1 == h.nodeType && h.tagName.toLowerCase() == f && a.setStart(h, 0).collapse(!0);
				a.select();
				return !0
			},
			queryCommandValue: function() {
				var a = g.filterNodeList(this.selection.getStartElementPath(), "p h1 h2 h3 h4 h5 h6");
				return a ? a.tagName.toLowerCase() : ""
			}
		}
	};
	(function() {
		var c = g.isBlockElm,
			a = function(a) {
				return g.filterNodeList(a.selection.getStartElementPath(), function(a) {
					return a && 1 == a.nodeType && a.getAttribute("dir")
				})
			},
			e = function(b, f, e) {
				var d = function(a) {
						return 1 == a.nodeType ? !g.isBookmarkNode(a) : !g.isWhitespace(a)
					};
				if ((f = a(f)) && b.collapsed) return f.setAttribute("dir", e), b;
				f = b.createBookmark();
				b.enlarge(!0);
				for (var h = b.createBookmark(), k = g.getNextDomNode(h.start, !1, d), n = b.cloneRange(), m; k && !(g.getPosition(k, h.end) & g.POSITION_FOLLOWING);) if (3 != k.nodeType && c(k)) k = g.getNextDomNode(k, !0, d);
				else {
					for (n.setStartBefore(k); k && k !== h.end && !c(k);) m = k, k = g.getNextDomNode(k, !1, null, function(a) {
						return !c(a)
					});
					n.setEndAfter(m);
					k = n.getCommonAncestor();
					if (!g.isBody(k) && c(k)) k.setAttribute("dir", e);
					else {
						k = b.document.createElement("p");
						k.setAttribute("dir", e);
						var r = n.extractContents();
						k.appendChild(r);
						n.insertNode(k)
					}
					k = g.getNextDomNode(k, !1, d)
				}
				return b.moveToBookmark(h).moveToBookmark(f)
			};
		UE.commands.directionality = {
			execCommand: function(a, f) {
				var b = this.selection.getRange();
				if (b.collapsed) {
					var d = this.document.createTextNode("d");
					b.insertNode(d)
				}
				e(b, this, f);
				d && (b.setStartBefore(d).collapse(!0), g.remove(d));
				b.select();
				return !0
			},
			queryCommandValue: function() {
				var b = a(this);
				return b ? b.getAttribute("dir") : "ltr"
			}
		}
	})();
	UE.plugins.horizontal = function() {
		this.commands.horizontal = {
			execCommand: function(c) {
				if (-1 !== this.queryCommandState(c)) {
					this.execCommand("insertHtml", "<hr>");
					c = this.selection.getRange();
					var a = c.startContainer;
					if (1 == a.nodeType && !a.childNodes[c.startOffset]) {
						var e;
						(e = a.childNodes[c.startOffset - 1]) && 1 == e.nodeType && "HR" == e.tagName && ("p" == this.options.enterTag ? (e = this.document.createElement("p"), c.insertNode(e), c.setStart(e, 0).setCursor()) : (e = this.document.createElement("br"), c.insertNode(e), c.setStartBefore(e).setCursor()))
					}
					return !0
				}
			},
			queryCommandState: function() {
				return g.filterNodeList(this.selection.getStartElementPath(), "table") ? -1 : 0
			}
		};
		this.addListener("delkeydown", function(c, a) {
			var e = this.selection.getRange();
			e.txtToElmBoundary(!0);
			if (g.isStartInblock(e)) {
				var b = e.startContainer.previousSibling;
				if (b && g.isTagNode(b, "hr")) return g.remove(b), e.select(), g.preventDefault(a), !0
			}
		})
	};
	UE.plugins.rowspacing = function() {
		this.setOpt({
			rowspacingtop: ["5", "10", "15", "20", "25"],
			rowspacingbottom: ["5", "10", "15", "20", "25"]
		});
		this.commands.rowspacing = {
			execCommand: function(c, a, e) {
				this.execCommand("paragraph", "p", {
					style: "margin-" + e + ":" + a + "px"
				});
				return !0
			},
			queryCommandValue: function(c, a) {
				var e = g.filterNodeList(this.selection.getStartElementPath(), function(a) {
					return g.isBlockElm(a)
				});
				return e ? (e = g.getComputedStyle(e, "margin-" + a).replace(/[^\d]/g, "")) ? e : 0 : 0
			}
		}
	};
	UE.plugins.lineheight = function() {
		this.setOpt({
			lineheight: "1 1.5 1.75 2 3 4 5".split(" ")
		});
		this.commands.lineheight = {
			execCommand: function(c, a) {
				this.execCommand("paragraph", "p", {
					style: "line-height:" + ("1" == a ? "normal" : a + "em")
				});
				return !0
			},
			queryCommandValue: function() {
				var c = g.filterNodeList(this.selection.getStartElementPath(), function(a) {
					return g.isBlockElm(a)
				});
				if (c) {
					var a = g.getComputedStyle(c, "line-height");
					if (0 < a.indexOf("px")) {
						c = g.getComputedStyle(c, "font-size");
						if (0 < c.indexOf("px")) return c == a ? 1 : a = Math.round(100 * parseInt(a) / parseInt(c)) / 100;
						if (0 < c.indexOf("em")) return a = Math.round(100 * parseInt(a) / (16 * parseInt(c))) / 100
					}
					return "normal" == a ? 1 : a.replace(/[^\d.]*/ig, "")
				}
			}
		}
	};
	UE.plugins.letterspacing = function() {
		this.setOpt({
			letterspacing: "0 1.5 1.75 2 3 4 5".split(" ")
		});
		this.commands.letterspacing = {
			execCommand: function(c, a) {
				this.execCommand("paragraph", "p", {
					style: "letter-spacing:" + a + "px"
				});
				return !0
			},
			queryCommandValue: function() {
				var c = g.filterNodeList(this.selection.getStartElementPath(), function(a) {
					return g.isBlockElm(a)
				});
				if (c) return g.getComputedStyle(c, "letter-spacing").replace(/[^\d.]*/ig, "")
			}
		}
	};
	UE.plugins.outpadding = function() {
		var c = this;
		c.setOpt({
			outpadding: "0 5 10 15 20 25 30 35 40 45 50".split(" ")
		});
		c.commands.outpadding = {
			execCommand: function(a, e) {
				var b = "",
					f = c.getContent(),
					f = jQuery("<div>" + f + " </div>");
				if (0 < f.find(".article135").size()) {
					var h = f.find(".article135:first").eq(0).style,
						d;
					for (d in h)"padding" != d && (b += d + ":" + backgroundObj[d] + ";");
					f.find(".article135").each(function() {
						jQuery(this).replaceWith(jQuery(this).html())
					})
				}
				d = jQuery.trim(f.html());
				"" == d && (d = "<p><br/></p>");
				f = '<section class="article135" style="' + (b + ("padding:0 " + e + "px;")) + '">' + d + "</section>";
				c.undoManger.save();
				c.setContent(f);
				c.undoManger.save();
				return !0
			},
			queryCommandValue: function() {
				return 0 < jQuery(c.document).find(".article135").size() ? jQuery(c.document).find(".article135:first").css("padding-left").replace(/[^\d.]*/ig, "") : 0
			}
		}
	};
	UE.commands.cleardoc = {
		execCommand: function(c) {
			var a = this;
			c = a.options.enterTag;
			var e = a.selection.getRange();
			"br" == c ? (a.body.innerHTML = "<br/>", e.setStart(a.body, 0).setCursor()) : (a.body.innerHTML = '<section data-role="paragraph" class="_135editor"><p><br/></p></section>', e.setStart(a.body.firstChild.firstChild, 0).setCursor(!1, !0));
			setTimeout(function() {
				a.fireEvent("clearDoc")
			}, 0)
		}
	};
	UE.plugins.wordcount = function() {
		var c = this;
		c.setOpt("wordCount", !0);
		c.addListener("contentchange", function() {
			c.fireEvent("wordcount")
		});
		var a;
		c.addListener("ready", function() {
			var e = this;
			g.on(e.body, "keyup", function(b) {
				(b.keyCode || b.which) in {
					16: 1,
					18: 1,
					20: 1,
					37: 1,
					38: 1,
					39: 1,
					40: 1
				} || (clearTimeout(a), a = setTimeout(function() {
					e.fireEvent("wordcount")
				}, 200))
			})
		})
	};
	UE.plugins.pagebreak = function() {
		function c(a) {
			if (g.isEmptyBlock(a)) {
				for (var b = a.firstChild, d; b && 1 == b.nodeType && g.isEmptyBlock(b);) d = b, b = b.firstChild;
				!d && (d = a);
				g.fillNode(e.document, d)
			}
		}

		function a(a) {
			return a && 1 == a.nodeType && "HR" == a.tagName && "pagebreak" == a.className
		}
		var e = this,
			b = ["td"];
		e.setOpt("pageBreakTag", "_ueditor_page_break_tag_");
		e.ready(function() {
			q.cssRule("pagebreak", ".pagebreak{display:block;clear:both !important;cursor:default !important;width: 100% !important;margin:0;}", e.document)
		});
		e.addInputRule(function(a) {
			a.traversal(function(a) {
				if ("text" == a.type && a.data == e.options.pageBreakTag) {
					var b = UE.uNode.createElement('<hr class="pagebreak" noshade="noshade" size="5" style="-webkit-user-select: none;">');
					a.parentNode.insertBefore(b, a);
					a.parentNode.removeChild(a)
				}
			})
		});
		e.addOutputRule(function(a) {
			q.each(a.getNodesByTagName("hr"), function(a) {
				if ("pagebreak" == a.getAttr("class")) {
					var b = UE.uNode.createText(e.options.pageBreakTag);
					a.parentNode.insertBefore(b, a);
					a.parentNode.removeChild(a)
				}
			})
		});
		e.commands.pagebreak = {
			execCommand: function() {
				var f = e.selection.getRange(),
					h = e.document.createElement("hr");
				g.setAttributes(h, {
					"class": "pagebreak",
					noshade: "noshade",
					size: "5"
				});
				g.unSelectable(h);
				var d = g.findParentByTagName(f.startContainer, b, !0);
				if (d) switch (d.tagName) {
				case "TD":
					d = d.parentNode, d.previousSibling ? (d.parentNode.insertBefore(h, d), f = g.findParents(h)) : (f = g.findParentByTagName(d, "table"), f.parentNode.insertBefore(h, f), f = g.findParents(h, !0)), d = f[1], h !== d && g.breakParent(h, d), e.fireEvent("afteradjusttable", e.document)
				} else {
					if (!f.collapsed) for (f.deleteContents(), d = f.startContainer; !g.isBody(d) && g.isBlockElm(d) && g.isEmptyNode(d);) f.setStartBefore(d).collapse(!0), g.remove(d), d = f.startContainer;
					f.insertNode(h);
					for (d = h.parentNode; !g.isBody(d);) g.breakParent(h, d), (d = h.nextSibling) && g.isEmptyBlock(d) && g.remove(d), d = h.parentNode;
					var d = h.nextSibling,
						l = h.previousSibling;
					a(l) ? g.remove(l) : l && c(l);
					d ? (a(d) ? g.remove(d) : c(d), f.setEndAfter(h).collapse(!1)) : (d = e.document.createElement("p"), h.parentNode.appendChild(d), g.fillNode(e.document, d), f.setStart(d, 0).collapse(!0));
					f.select(!0)
				}
			}
		}
	};
	UE.plugin.register("wordimage", function() {
		var c = this,
			a = [];
		return {
			commands: {
				wordimage: {
					execCommand: function() {
						for (var a = g.getElementsByTagName(c.body, "img"), b = [], f = 0, h; h = a[f++];)(h = h.getAttribute("word_img")) && b.push(h);
						return b
					},
					queryCommandState: function() {
						a = g.getElementsByTagName(c.body, "img");
						for (var e = 0, b; b = a[e++];) if (b.getAttribute("word_img")) return 1;
						return -1
					},
					notNeedUndo: !0
				}
			},
			inputRule: function(a) {
				q.each(a.getNodesByTagName("img"), function(a) {
					var b = a.attrs,
						e = 128 > parseInt(b.width) || 43 > parseInt(b.height),
						d = c.options,
						l = d.UEDITOR_HOME_URL + "themes/default/images/spacer.gif";
					b.src && /^(?:(file:\/+))/.test(b.src) && a.setAttr({
						width: b.width,
						height: b.height,
						alt: b.alt,
						word_img: b.src,
						src: l,
						style: "background:url(" + (e ? d.themePath + d.theme + "/images/word.gif" : d.langPath + d.lang + "/images/localimage.png") + ") no-repeat center center;border:1px solid #ddd"
					})
				})
			}
		}
	});
	UE.plugins.dragdrop = function() {
		var c = this;
		c.ready(function() {
			g.on(this.body, "dragend", function() {
				var a = c.selection.getRange(),
					e = a.getClosedNode() || c.selection.getStart();
				if (e && "IMG" == e.tagName) {
					for (var b = e.previousSibling, f;
					(f = e.nextSibling) && 1 == f.nodeType && "SPAN" == f.tagName && !f.firstChild;) g.remove(f);
					(!b || 1 != b.nodeType || g.isEmptyBlock(b)) && b || f && (!f || g.isEmptyBlock(f)) || (b && "P" == b.tagName && !g.isEmptyBlock(b) ? (b.appendChild(e), g.moveChild(f, b), g.remove(f)) : f && "P" == f.tagName && !g.isEmptyBlock(f) && f.insertBefore(e, f.firstChild), b && "P" == b.tagName && g.isEmptyBlock(b) && g.remove(b), f && "P" == f.tagName && g.isEmptyBlock(f) && g.remove(f), a.selectNode(e).select(), c.fireEvent("saveScene"))
				}
			})
		});
		c.addListener("keyup", function(a, e) {
			if (13 == (e.keyCode || e.which)) {
				var b = c.selection.getRange(),
					f;
				(f = g.findParentByTagName(b.startContainer, "p", !0)) && "center" == g.getComputedStyle(f, "text-align") && g.removeStyle(f, "text-align")
			}
		})
	};
	UE.plugins.undo = function() {
		function c(a, b) {
			if (a.length != b.length) return 0;
			for (var d = 0, f = a.length; d < f; d++) if (a[d] != b[d]) return 0;
			return 1
		}
		var a, e = this,
			b = e.options.maxUndoCount || 20,
			f = e.options.maxInputCount || 20,
			h = new RegExp(g.fillChar + "|</hr>", "gi"),
			d = {
				ol: 1,
				ul: 1,
				table: 1,
				tbody: 1,
				tr: 1,
				body: 1
			},
			l = e.options.autoClearEmptyNode;
		e.undoManger = new function() {
			this.list = [];
			this.index = 0;
			this.hasRedo = this.hasUndo = !1;
			this.undo = function() {
				if (this.hasUndo) if (this.list[this.index - 1] || 1 != this.list.length) {
					for (; this.list[this.index].content == this.list[this.index - 1].content;) if (this.index--, 0 == this.index) return this.restore(0);
					this.restore(--this.index)
				} else this.reset()
			};
			this.redo = function() {
				if (this.hasRedo) {
					for (; this.list[this.index].content == this.list[this.index + 1].content;) if (this.index++, this.index == this.list.length - 1) return this.restore(this.index);
					this.restore(++this.index)
				}
			};
			this.restore = function() {
				var a = this.editor,
					b = this.list[this.index],
					f = UE.htmlparser(b.content.replace(h, ""));
				a.options.autoClearEmptyNode = !1;
				a.filterInputRule(f);
				a.options.autoClearEmptyNode = l;
				a.document.body.innerHTML = f.toHtml();
				a.fireEvent("afterscencerestore");
				t.ie && q.each(g.getElementsByTagName(a.document, "td th caption p"), function(b) {
					g.isEmptyNode(b) && g.fillNode(a.document, b)
				});
				try {
					var k = (new F.Range(a.document)).moveToAddress(b.address);
					k.select(d[k.startContainer.nodeName.toLowerCase()])
				} catch (E) {}
				this.update();
				this.clearKey();
				a.fireEvent("reset", !0)
			};
			this.getScene = function() {
				var a = this.editor,
					b = a.selection.getRange().createAddress(!1, !0);
				a.fireEvent("beforegetscene");
				var d = UE.htmlparser(a.body.innerHTML);
				a.options.autoClearEmptyNode = !1;
				a.filterOutputRule(d);
				a.options.autoClearEmptyNode = l;
				d = d.toHtml();
				a.fireEvent("aftergetscene");
				return {
					address: b,
					content: d
				}
			};
			this.save = function(d, f) {
				clearTimeout(a);
				var k = this.getScene(f),
					h = this.list[this.index];
				h && h.content != k.content && e.trigger("contentchange");
				var l;
				if (l = h && h.content == k.content) d ? h = 1 : (h = h.address, l = k.address, h = h.collapsed != l.collapsed ? 0 : c(h.startAddress, l.startAddress) && c(h.endAddress, l.endAddress) ? 1 : 0), l = h;
				l || (this.list = this.list.slice(0, this.index + 1), this.list.push(k), this.list.length > b && this.list.shift(), this.index = this.list.length - 1, this.clearKey(), this.update())
			};
			this.update = function() {
				this.hasRedo = !! this.list[this.index + 1];
				this.hasUndo = !! this.list[this.index - 1]
			};
			this.reset = function() {
				this.list = [];
				this.index = 0;
				this.hasRedo = this.hasUndo = !1;
				this.clearKey()
			};
			this.clearKey = function() {
				n = 0
			}
		};
		e.undoManger.editor = e;
		e.addListener("saveScene", function() {
			var a = Array.prototype.splice.call(arguments, 1);
			this.undoManger.save.apply(this.undoManger, a)
		});
		e.addListener("reset", function(a, b) {
			b || this.undoManger.reset()
		});
		e.commands.redo = e.commands.undo = {
			execCommand: function(a) {
				this.undoManger[a]()
			},
			queryCommandState: function(a) {
				return this.undoManger["has" + ("undo" == a.toLowerCase() ? "Undo" : "Redo")] ? 0 : -1
			},
			notNeedUndo: 1
		};
		var k = {
			16: 1,
			17: 1,
			18: 1,
			37: 1,
			38: 1,
			39: 1,
			40: 1
		},
			n = 0,
			m = !1;
		e.addListener("ready", function() {
			g.on(this.body, "compositionstart", function() {
				m = !0
			});
			g.on(this.body, "compositionend", function() {
				m = !1
			})
		});
		e.addshortcutkey({
			Undo: "ctrl+90",
			Redo: "ctrl+89"
		});
		var r = !0;
		e.addListener("keydown", function(b, d) {
			var e = this;
			if (!(k[d.keyCode || d.which] || d.ctrlKey || d.metaKey || d.shiftKey || d.altKey)) {
				var h = function(a) {
						a.undoManger.save(!1, !0);
						a.fireEvent("selectionchange")
					};
				m || (e.selection.getRange().collapsed ? (0 == e.undoManger.list.length && e.undoManger.save(!0), clearTimeout(a), a = setTimeout(function() {
					if (m) var a = setInterval(function() {
						m || (h(e), clearInterval(a))
					}, 300);
					else h(e)
				}, 200), n++, n >= f && h(e)) : (e.undoManger.save(!1, !0), r = !1))
			}
		});
		e.addListener("keyup", function(a, b) {
			k[b.keyCode || b.which] || b.ctrlKey || b.metaKey || b.shiftKey || b.altKey || m || r || (this.undoManger.save(!1, !0), r = !0)
		});
		e.stopCmdUndo = function() {
			e.__hasEnterExecCommand = !0
		};
		e.startCmdUndo = function() {
			e.__hasEnterExecCommand = !1
		}
	};
	UE.plugin.register("copy", function() {
		function c() {
			ZeroClipboard.config({
				debug: !1,
				swfPath: a.options.UEDITOR_HOME_URL + "third-party/zeroclipboard/ZeroClipboard.swf"
			});
			var e = a.zeroclipboard = new ZeroClipboard;
			e.on("copy", function(b) {
				b = b.client;
				var f = a.selection.getRange(),
					e = document.createElement("div");
				e.appendChild(f.cloneContents());
				b.setText(e.innerText || e.textContent);
				b.setHtml(e.innerHTML);
				console.log(e.innerHTML);
				f.select()
			});
			e.on("mouseover mouseout", function(a) {
				var b = a.target;
				b && ("mouseover" == a.type ? g.addClass(b, "edui-state-hover") : "mouseout" == a.type && g.removeClasses(b, "edui-state-hover"))
			});
			e.on("wrongflash noflash", function() {
				ZeroClipboard.destroy()
			});
			a.fireEvent("zeroclipboardready", e)
		}
		var a = this;
		return {
			bindEvents: {
				ready: function() {
					t.ie || (window.ZeroClipboard ? c() : q.loadFile(document, {
						src: a.options.UEDITOR_HOME_URL + "third-party/zeroclipboard/ZeroClipboard.js",
						tag: "script",
						type: "text/javascript",
						defer: "defer"
					}, function() {
						c()
					}))
				}
			},
			commands: {
				copy: {
					execCommand: function(e) {
						a.document.execCommand("copy") || alert(a.getLang("copymsg"))
					}
				}
			}
		}
	});
	UE.plugins.paste = function() {
		function c(a) {
			var b = this.document;
			if (!b.getElementById("baidu_pastebin")) {
				var d = this.selection.getRange(),
					f = d.createBookmark(),
					e = b.createElement("div");
				e.id = "baidu_pastebin";
				t.webkit && e.appendChild(b.createTextNode(g.fillChar + g.fillChar));
				b.body.appendChild(e);
				f.start.style.display = "";
				e.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;left:-1000px;white-space:nowrap;top:" + g.getXY(f.start).y + "px";
				d.selectNodeContents(e).select(!0);
				setTimeout(function() {
					if (t.webkit) for (var k = 0, h = b.querySelectorAll("#baidu_pastebin"), c; c = h[k++];) if (g.isEmptyNode(c)) g.remove(c);
					else {
						e = c;
						break
					}
					try {
						e.parentNode.removeChild(e)
					} catch (x) {}
					d.moveToBookmark(f).select(!0);
					a(e)
				}, 0)
			}
		}
		function a(a) {
			return a.replace(/<(\/?)([\w\-]+)([^>]*)>/gi, function(a, b, d, f) {
				d = d.toLowerCase();
				if ({
					img: 1
				}[d]) return a;
				f = f.replace(/([\w\-]*?)\s*=\s*(("([^"]*)")|('([^']*)')|([^\s>]+))/gi, function(a, b, d) {
					return {
						src: 1,
						href: 1,
						name: 1
					}[b.toLowerCase()] ? b + "=" + d + " " : ""
				});
				return {
					span: 1,
					div: 1
				}[d] ? "" : "<" + b + d + " " + q.trim(f) + ">"
			})
		}
		function e(e) {
			var k;
			if (e.firstChild) {
				var c = g.getElementsByTagName(e, "span");
				k = 0;
				for (var l; l = c[k++];)"_baidu_cut_start" != l.id && "_baidu_cut_end" != l.id || g.remove(l);
				if (t.webkit) {
					l = e.querySelectorAll("div br");
					for (k = 0; c = l[k++];) c = c.parentNode, "DIV" == c.tagName && 1 == c.childNodes.length && (c.innerHTML = "<p><br/></p>", g.remove(c));
					c = e.querySelectorAll("#baidu_pastebin");
					for (k = 0; l = c[k++];) {
						var r = b.document.createElement("p");
						for (l.parentNode.insertBefore(r, l); l.firstChild;) r.appendChild(l.firstChild);
						g.remove(l)
					}
					l = e.querySelectorAll("meta");
					for (k = 0; c = l[k++];) g.remove(c);
					l = e.querySelectorAll("br");
					for (k = 0; c = l[k++];) / ^ apple - /i.test(c.className)&&g.remove(c)}if(t.gecko)for(l=e.querySelectorAll("[_moz_dirty]"),
k=0;c=l[k++];)c.removeAttribute("_moz_dirty");if(!t.ie)for(l=e.querySelectorAll("span.Apple-style-span"),k=0;c=l[k++];)g.remove(c,!0);k=e.innerHTML;k=UE.filterWord(k);e=UE.htmlparser(k);b.options.filterRules&&UE.filterNode(e,b.options.filterRules);b.filterInputRule(e);t.webkit&&((k=e.lastChild())&&"element"==k.type&&"br"==k.tagName&&e.removeChild(k),q.each(b.body.querySelectorAll("div"),function(a){g.isEmptyBlock(a)&&g.remove(a,!0)}));k={html:e.toHtml()};b.fireEvent("beforepaste",k,e);k.html&&(e=
UE.htmlparser(k.html,!0),1===b.queryCommandState("pasteplain")?b.execCommand("insertHtml",UE.filterNode(e,b.options.filterTxtRules).toHtml(),!0):(UE.filterNode(e,b.options.filterTxtRules),f=e.toHtml(),h=k.html,d=b.selection.getRange().createAddress(!0),b.execCommand("insertHtml",!0===b.getOpt("retainOnlyLabelPasted")?a(h):h,!0)),b.fireEvent("afterpaste",k))}}var b=this;b.setOpt({retainOnlyLabelPasted:!1});var f,h,d;b.addListener("pasteTransfer",function(e,k){if(d&&f&&h&&f!=h){var c=b.selection.getRange();
c.moveToAddress(d,!0);if(!c.collapsed){for(;!g.isBody(c.startContainer);){var l=c.startContainer;if(1==l.nodeType){l=l.childNodes[c.startOffset];if(!l){c.setStartBefore(c.startContainer);continue}(l=l.previousSibling)&&3==l.nodeType&&(new RegExp("^[\n\r\t "+g.fillChar+"]*$")).test(l.nodeValue)&&c.setStartBefore(l)}if(0==c.startOffset)c.setStartBefore(c.startContainer);else break}for(;!g.isBody(c.endContainer);){l=c.endContainer;if(1==l.nodeType){l=l.childNodes[c.endOffset];if(!l){c.setEndAfter(c.endContainer);
continue}(l=l.nextSibling)&&3==l.nodeType&&(new RegExp("^[\n\r\t"+g.fillChar+"]*$")).test(l.nodeValue)&&c.setEndAfter(l)}if(c.endOffset==c.endContainer[3==c.endContainer.nodeType?"nodeValue":"childNodes"].length)c.setEndAfter(c.endContainer);else break}}c.deleteContents();c.select(!0);b.__hasEnterExecCommand=!0;c=h;2===k?c=a(c):k&&(c=f);b.execCommand("inserthtml",c,!0);b.__hasEnterExecCommand=!1;for(c=b.selection.getRange();!g.isBody(c.startContainer)&&!c.startOffset&&c.startContainer[3==c.startContainer.nodeType?
"nodeValue":"childNodes"].length;)c.setStartBefore(c.startContainer);c=c.createAddress(!0);d.endAddress=c.startAddress}});b.addListener("ready",function(){g.on(b.body,"cut",function(){!b.selection.getRange().collapsed&&b.undoManger&&b.undoManger.save()});g.on(b.body,t.ie||t.opera?"keydown":"paste",function(a){(!t.ie&&!t.opera||(a.ctrlKey||a.metaKey)&&"86"==a.keyCode)&&c.call(b,function(a){e(a)})})});b.commands.paste={execCommand:function(a){t.ie?(c.call(b,function(a){e(a)}),b.document.execCommand("paste")):
alert(b.getLang("pastemsg"))}}};UE.plugins.pasteplain=function(){this.setOpt({pasteplain:!1,filterTxtRules:function(){function a(a){a.tagName="p";a.setStyle()}function e(a){a.parentNode.removeChild(a,!0)}return{"-":"script style object iframe embed input select",p:{$:{}},br:{$:{}},div:function(a){for(var b,e=UE.uNode.createElement("p");b=a.firstChild();)"text"!=b.type&&UE.dom.dtd.$block[b.tagName]?e.firstChild()?(a.parentNode.insertBefore(e,a),e=UE.uNode.createElement("p")):a.parentNode.insertBefore(b,
a):e.appendChild(b);e.firstChild()&&a.parentNode.insertBefore(e,a);a.parentNode.removeChild(a)},ol:e,ul:e,dl:e,dt:e,dd:e,li:e,caption:a,th:a,tr:a,h1:a,h2:a,h3:a,h4:a,h5:a,h6:a,td:function(a){a.innerText()&&a.parentNode.insertAfter(UE.uNode.createText(" &nbsp; &nbsp;"),a);a.parentNode.removeChild(a,a.innerText())}}}()});var c=this.options.pasteplain;this.commands.pasteplain={queryCommandState:function(){return c?1:0},execCommand:function(){c=!c|0},notNeedUndo:1}};UE.plugins.list=function(){function c(a){var b=
[],d;for(d in a)b.push(d);return b}function a(a){var b=a.className;return g.hasClass(a,/custom_ / ) ? b.match(/custom_(\w+)/)[1] : g.getStyle(a, "list-style-type")
			}
			function e(d, k) {
				q.each(g.getElementsByTagName(d, "ol ul"), function(e) {
					if (g.inDoc(e, d)) {
						var c = e.parentNode;
						if (c.tagName == e.tagName) {
							var h = a(e) || ("OL" == e.tagName ? "decimal" : "disc"),
								l = a(c) || ("OL" == c.tagName ? "decimal" : "disc");
							h == l && (h = q.indexOf(m[e.tagName], h), h = h + 1 == m[e.tagName].length ? 0 : h + 1, f(e, m[e.tagName][h]))
						}
						var r = 0,
							h = 2;
						g.hasClass(e, /custom_/) ? /[ou]l/i.test(c.tagName) && g.hasClass(c, /custom_/) || (h = 1) : /[ou]l/i.test(c.tagName) && g.hasClass(c, /custom_/) && (h = 3);
						(c = g.getStyle(e, "list-style-type")) && (e.style.cssText = "list-style-type:" + c);
						e.className = q.trim(e.className.replace(/list-paddingleft-\w+/, "")) + " list-paddingleft-" + h;
						q.each(g.getElementsByTagName(e, "li"), function(b) {
							b.style.cssText && (b.style.cssText = "");
							if (!b.firstChild) g.remove(b);
							else if (b.parentNode === e) {
								r++;
								if (g.hasClass(e, /custom_/)) {
									var d = 1,
										f = a(e);
									if ("OL" == e.tagName) {
										if (f) switch (f) {
										case "cn":
										case "cn1":
										case "cn2":
											10 < r && (0 == r % 10 || 10 < r && 20 > r) ? d = 2 : 20 < r && (d = 3);
											break;
										case "num2":
											9 < r && (d = 2)
										}
										b.className = "list-" + n[f] + r + " list-" + f + "-paddingleft-" + d
									} else b.className = "list-" + n[f] + " list-" + f + "-paddingleft"
								} else b.className = b.className.replace(/list-[\w\-]+/gi, "");
								d = b.getAttribute("class");
								null === d || d.replace(/\s/g, "") || g.removeAttributes(b, "class")
							}
						});
						!k && b(e, e.tagName.toLowerCase(), a(e) || g.getStyle(e, "list-style-type"), !0)
					}
				})
			}
			function b(b, d, f, k) {
				var c = b.nextSibling;
				c && 1 == c.nodeType && c.tagName.toLowerCase() == d && (a(c) || g.getStyle(c, "list-style-type") || ("ol" == d ? "decimal" : "disc")) == f && (g.moveChild(c, b), 0 == c.childNodes.length && g.remove(c));
				c && g.isFillChar(c) && g.remove(c);
				(c = b.previousSibling) && 1 == c.nodeType && c.tagName.toLowerCase() == d && (a(c) || g.getStyle(c, "list-style-type") || ("ol" == d ? "decimal" : "disc")) == f && g.moveChild(b, c);
				c && g.isFillChar(c) && g.remove(c);
				!k && g.isEmptyBlock(b) && g.remove(b);
				a(b) && e(b.ownerDocument, !0)
			}
			function f(a, b) {
				n[b] && (a.className = "custom_" + b);
				try {
					g.setStyle(a, "list-style-type", b)
				} catch (x) {}
			}
			function h(a) {
				var b = a.previousSibling;
				b && g.isEmptyBlock(b) && g.remove(b);
				(b = a.nextSibling) && g.isEmptyBlock(b) && g.remove(b)
			}
			function d(a) {
				for (; a && !g.isBody(a);) {
					if ("TABLE" == a.nodeName) return null;
					if ("LI" == a.nodeName) return a;
					a = a.parentNode
				}
			}
			var l = this,
				k = {
					TD: 1,
					PRE: 1,
					BLOCKQUOTE: 1
				},
				n = {
					cn: "cn-1-",
					cn1: "cn-2-",
					cn2: "cn-3-",
					num: "num-1-",
					num1: "num-2-",
					num2: "num-3-",
					dash: "dash",
					dot: "dot"
				};
			l.setOpt({
				autoTransWordToList: !1,
				insertorderedlist: {
					num: "",
					num1: "",
					num2: "",
					cn: "",
					cn1: "",
					cn2: "",
					decimal: "",
					"lower-alpha": "",
					"lower-roman": "",
					"upper-alpha": "",
					"upper-roman": ""
				},
				insertunorderedlist: {
					circle: "",
					disc: "",
					square: "",
					dash: "",
					dot: ""
				},
				listDefaultPaddingLeft: "30",
				listiconpath: "http://bs.baidu.com/listicon/",
				maxListLevel: -1,
				disablePInList: !1
			});
			var m = {
				OL: c(l.options.insertorderedlist),
				UL: c(l.options.insertunorderedlist)
			},
				r = l.options.listiconpath,
				u;
			for (u in n) l.options.insertorderedlist.hasOwnProperty(u) || l.options.insertunorderedlist.hasOwnProperty(u) || delete n[u];
			l.ready(function() {
				var a = [],
					b;
				for (b in n) {
					if ("dash" == b || "dot" == b) a.push("li.list-" + n[b] + "{background-image:url(" + r + n[b] + ".gif)}"), a.push("ul.custom_" + b + "{list-style:none;}ul.custom_" + b + " li{background-position:0 3px;background-repeat:no-repeat}");
					else {
						for (var d = 0; 99 > d; d++) a.push("li.list-" + n[b] + d + "{background-image:url(" + r + "list-" + n[b] + d + ".gif)}");
						a.push("ol.custom_" + b + "{list-style:none;}ol.custom_" + b + " li{background-position:0 3px;background-repeat:no-repeat}")
					}
					switch (b) {
					case "cn":
						a.push("li.list-" + b + "-paddingleft-1{padding-left:25px}");
						a.push("li.list-" + b + "-paddingleft-2{padding-left:40px}");
						a.push("li.list-" + b + "-paddingleft-3{padding-left:55px}");
						break;
					case "cn1":
						a.push("li.list-" + b + "-paddingleft-1{padding-left:30px}");
						a.push("li.list-" + b + "-paddingleft-2{padding-left:40px}");
						a.push("li.list-" + b + "-paddingleft-3{padding-left:55px}");
						break;
					case "cn2":
						a.push("li.list-" + b + "-paddingleft-1{padding-left:40px}");
						a.push("li.list-" + b + "-paddingleft-2{padding-left:55px}");
						a.push("li.list-" + b + "-paddingleft-3{padding-left:68px}");
						break;
					case "num":
					case "num1":
						a.push("li.list-" + b + "-paddingleft-1{padding-left:25px}");
						break;
					case "num2":
						a.push("li.list-" + b + "-paddingleft-1{padding-left:35px}");
						a.push("li.list-" + b + "-paddingleft-2{padding-left:40px}");
						break;
					case "dash":
						a.push("li.list-" + b + "-paddingleft{padding-left:35px}");
						break;
					case "dot":
						a.push("li.list-" + b + "-paddingleft{padding-left:20px}")
					}
				}
				a.push(".list-paddingleft-1{padding-left:0}");
				a.push(".list-paddingleft-2{padding-left:" + l.options.listDefaultPaddingLeft + "px}");
				a.push(".list-paddingleft-3{padding-left:" + 2 * l.options.listDefaultPaddingLeft + "px}");
				q.cssRule("list", "ol,ul{margin:0;pading:0;" + (t.ie ? "" : "width:95%") + "}" + a.join("\n"), l.document)
			});
			l.ready(function() {
				g.on(l.body, "cut", function() {
					setTimeout(function() {
						var a = l.selection.getRange(),
							b;
						if (!a.collapsed && (b = g.findParentByTagName(a.startContainer, "li", !0)) && !b.nextSibling && g.isEmptyBlock(b)) {
							b = b.parentNode;
							var d;
							(d = b.previousSibling) ? (g.remove(b), a.setStartAtLast(d).collapse(!0)) : (d = b.nextSibling) ? (g.remove(b), a.setStartAtFirst(d).collapse(!0)) : (d = l.document.createElement("p"), g.fillNode(l.document, d), b.parentNode.insertBefore(d, b), g.remove(b), a.setStart(d, 0).collapse(!0));
							a.select(!0)
						}
					})
				})
			});
			l.addListener("beforepaste", function(b, d) {
				var f = this.selection.getRange(),
					e = UE.htmlparser(d.html, !0);
				if (f = g.findParentByTagName(f.startContainer, "li", !0)) {
					var k = f.parentNode;
					q.each(e.getNodesByTagName("OL" == k.tagName ? "ul" : "ol"), function(d) {
						d.tagName = k.tagName;
						d.setAttr();
						if (d.parentNode === e) b = a(k) || ("OL" == k.tagName ? "decimal" : "disc");
						else {
							var f = d.parentNode.getAttr("class");
							(b = f && /custom_/.test(f) ? f.match(/custom_(\w+)/)[1] : d.parentNode.getStyle("list-style-type")) || (b = "OL" == k.tagName ? "decimal" : "disc")
						}
						f = q.indexOf(m[k.tagName], b);
						d.parentNode !== e && (f = f + 1 == m[k.tagName].length ? 0 : f + 1);
						f = m[k.tagName][f];
						n[f] ? d.setAttr("class", "custom_" + f) : d.setStyle("list-style-type", f)
					})
				}
				d.html = e.toHtml()
			});
			!0 === l.getOpt("disablePInList") && l.addOutputRule(function(a) {
				q.each(a.getNodesByTagName("li"), function(a) {
					var b = [],
						d = 0;
					q.each(a.children, function(f) {
						if ("p" == f.tagName) {
							for (var e; e = f.children.pop();) b.splice(d, 0, e), e.parentNode = a, lastNode = e;
							e = b[b.length - 1];
							e && "element" == e.type && "br" == e.tagName || (f = UE.uNode.createElement("br"), f.parentNode = a, b.push(f));
							d = b.length
						}
					});
					b.length && (a.children = b)
				})
			});
			l.addInputRule(function(a) {
				q.each(a.getNodesByTagName("li"), function(a) {
					for (var b = UE.uNode.createElement("p"), d = 0, f; f = a.children[d];)"text" == f.type || y.p[f.tagName] ? b.appendChild(f) : b.firstChild() ? (a.insertBefore(b, f), b = UE.uNode.createElement("p"), d += 2) : d++;
					(b.firstChild() && !b.parentNode || !a.firstChild()) && a.appendChild(b);
					b.firstChild() || b.innerHTML(t.ie ? "&nbsp;" : "<br/>");
					a = a.firstChild();
					(b = a.lastChild()) && "text" == b.type && /^\s*$/.test(b.data) && a.removeChild(b)
				});
				if (l.options.autoTransWordToList) {
					var b = function(a, b) {
							var e = b.firstChild();
							if (e && "element" == e.type && "span" == e.tagName && /Wingdings|Symbol/.test(e.getStyle("font-family"))) {
								for (var k in f) if (f[k] == e.data) return k;
								return "disc"
							}
							for (k in d) if (d[k].test(a)) return k
						},
						d = {
							num1: /^\d+\)/,
							decimal: /^\d+\./,
							"lower-alpha": /^[a-z]+\)/,
							"upper-alpha": /^[A-Z]+\./,
							cn: /^[一二三四六五七八九]+[、]/,
							cn2: /^\([一二三四六五七八九]+\)/
						},
						f = {
							square: "n"
						};
					q.each(a.getNodesByTagName("p"), function(a) {
						if ("MsoListParagraph" == a.getAttr("class")) {
							a.setStyle("margin", "");
							a.setStyle("margin-left", "");
							a.setAttr("class", "");
							var f, e, k = a;
							if ("li" != a.parentNode.tagName && (e = b(a.innerText(), a))) {
								var c = UE.uNode.createElement(l.options.insertorderedlist.hasOwnProperty(e) ? "ol" : "ul");
								for (n[e] ? c.setAttr("class", "custom_" + e) : c.setStyle("list-style-type", e); a && "li" != a.parentNode.tagName && b(a.innerText(), a);) {
									(f = a.nextSibling()) || a.parentNode.insertBefore(c, a);
									var h = c,
										g = e;
									if ("ol" == h.tagName) if (t.ie) {
										var m = a.firstChild();
										"element" == m.type && "span" == m.tagName && d[g].test(m.innerText()) && a.removeChild(m)
									} else a.innerHTML(a.innerHTML().replace(d[g], ""));
									else a.removeChild(a.firstChild());
									g = UE.uNode.createElement("li");
									g.appendChild(a);
									h.appendChild(g);
									a = f
								}!c.parentNode && a && a.parentNode && a.parentNode.insertBefore(c, a)
							}(f = k.firstChild()) && "element" == f.type && "span" == f.tagName && /^\s*(&nbsp;)+\s*$/.test(f.innerText()) && f.parentNode.removeChild(f)
						}
					})
				}
			});
			l.addListener("contentchange", function() {
				e(l.document)
			});
			l.addListener("keydown", function(a, b) {
				function d() {
					b.preventDefault ? b.preventDefault() : b.returnValue = !1;
					l.fireEvent("contentchange");
					l.undoManger && l.undoManger.save()
				}
				function f(a, b) {
					for (; a && !g.isBody(a) && !b(a);) {
						if (1 == a.nodeType && /[ou]l/i.test(a.tagName)) return a;
						a = a.parentNode
					}
					return null
				}
				var e = b.keyCode || b.which;
				if (13 == e && !b.shiftKey) {
					var k = l.selection.getRange(),
						c = g.findParent(k.startContainer, function(a) {
							return g.isBlockElm(a)
						}, !0),
						m = g.findParentByTagName(k.startContainer, "li", !0);
					c && "PRE" != c.tagName && !m && (m = c.innerHTML.replace(new RegExp(g.fillChar, "g"), ""), /^\s*1\s*\.[^\d]/.test(m) && (c.innerHTML = m.replace(/^\s*1\s*\./, ""), k.setStartAtLast(c).collapse(!0).select(), l.__hasEnterExecCommand = !0, l.execCommand("insertorderedlist"), l.__hasEnterExecCommand = !1));
					k = l.selection.getRange();
					c = f(k.startContainer, function(a) {
						return "TABLE" == a.tagName
					});
					m = k.collapsed ? c : f(k.endContainer, function(a) {
						return "TABLE" == a.tagName
					});
					if (c && m && c === m) {
						if (!k.collapsed) if (c = g.findParentByTagName(k.startContainer, "li", !0), m = g.findParentByTagName(k.endContainer, "li", !0), c && m && c === m) {
							if (k.deleteContents(), (m = g.findParentByTagName(k.startContainer, "li", !0)) && g.isEmptyBlock(m)) {
								u = m.previousSibling;
								next = m.nextSibling;
								c = l.document.createElement("p");
								g.fillNode(l.document, c);
								r = m.parentNode;
								u && next ? (k.setStart(next, 0).collapse(!0).select(!0), g.remove(m)) : ((u || next) && u ? m.parentNode.parentNode.insertBefore(c, r.nextSibling) : r.parentNode.insertBefore(c, r), g.remove(m), r.firstChild || g.remove(r), k.setStart(c, 0).setCursor());
								d();
								return
							}
						} else {
							var c = k.cloneRange(),
								n = c.collapse(!1).createBookmark();
							k.deleteContents();
							c.moveToBookmark(n);
							m = g.findParentByTagName(c.startContainer, "li", !0);
							h(m);
							c.select();
							d();
							return
						}
						if (m = g.findParentByTagName(k.startContainer, "li", !0)) {
							if (g.isEmptyBlock(m)) {
								var n = k.createBookmark(),
									r = m.parentNode;
								m !== r.lastChild ? (g.breakParent(m, r), h(m)) : (r.parentNode.insertBefore(m, r.nextSibling), g.isEmptyNode(r) && g.remove(r));
								if (!y.$list[m.parentNode.tagName]) if (g.isBlockElm(m.firstChild)) g.remove(m, !0);
								else {
									c = l.document.createElement("p");
									for (m.parentNode.insertBefore(c, m); m.firstChild;) c.appendChild(m.firstChild);
									g.remove(m)
								}
								k.moveToBookmark(n).select()
							} else {
								c = m.firstChild;
								if (!c || !g.isBlockElm(c)) {
									c = l.document.createElement("p");
									for (!m.firstChild && g.fillNode(l.document, c); m.firstChild;) c.appendChild(m.firstChild);
									m.appendChild(c)
								}
								n = l.document.createElement("span");
								k.insertNode(n);
								g.breakParent(n, m);
								u = n.nextSibling;
								c = u.firstChild;
								c || (c = l.document.createElement("p"), g.fillNode(l.document, c), u.appendChild(c));
								g.isEmptyNode(c) && (c.innerHTML = "", g.fillNode(l.document, c));
								k.setStart(c, 0).collapse(!0).shrinkBoundary().select();
								g.remove(n);
								var u = u.previousSibling;
								u && g.isEmptyBlock(u) && (u.innerHTML = "<p></p>", g.fillNode(l.document, u.firstChild))
							}
							d()
						}
					}
				}
				if (8 == e && (k = l.selection.getRange(), k.collapsed && g.isStartInblock(k) && (c = k.cloneRange().trimBoundary(), (m = g.findParentByTagName(k.startContainer, "li", !0)) && g.isStartInblock(c)))) if ((c = g.findParentByTagName(k.startContainer, "p", !0)) && c !== m.firstChild) r = g.findParentByTagName(c, ["ol", "ul"]), g.breakParent(c, r), h(c), l.fireEvent("contentchange"), k.setStart(c, 0).setCursor(!1, !0), l.fireEvent("saveScene"), g.preventDefault(b);
				else if (m && (u = m.previousSibling)) {
					if (46 != e || !m.childNodes.length) {
						y.$list[u.tagName] && (u = u.lastChild);
						l.undoManger && l.undoManger.save();
						c = m.firstChild;
						if (g.isBlockElm(c)) if (g.isEmptyNode(c)) for (u.appendChild(c), k.setStart(c, 0).setCursor(!1, !0); m.firstChild;) u.appendChild(m.firstChild);
						else n = l.document.createElement("span"), k.insertNode(n), g.isEmptyBlock(u) && (u.innerHTML = ""), g.moveChild(m, u), k.setStartBefore(n).collapse(!0).select(!0), g.remove(n);
						else if (g.isEmptyNode(m)) c = l.document.createElement("p"), u.appendChild(c), k.setStart(c, 0).setCursor();
						else for (k.setEnd(u, u.childNodes.length).collapse().select(!0); m.firstChild;) u.appendChild(m.firstChild);
						g.remove(m);
						l.fireEvent("contentchange");
						l.fireEvent("saveScene");
						g.preventDefault(b)
					}
				} else if (m && !m.previousSibling) {
					r = m.parentNode;
					n = k.createBookmark();
					if (g.isTagNode(r.parentNode, "ol ul")) r.parentNode.insertBefore(m, r);
					else {
						for (; m.firstChild;) r.parentNode.insertBefore(m.firstChild, r);
						g.remove(m)
					}
					g.isEmptyNode(r) && g.remove(r);
					k.moveToBookmark(n).setCursor(!1, !0);
					l.fireEvent("contentchange");
					l.fireEvent("saveScene");
					g.preventDefault(b)
				}
			});
			l.addListener("keyup", function(d, f) {
				if (8 == (f.keyCode || f.which)) {
					var k = l.selection.getRange(),
						e;
					(e = g.findParentByTagName(k.startContainer, ["ol", "ul"], !0)) && b(e, e.tagName.toLowerCase(), a(e) || g.getComputedStyle(e, "list-style-type"), !0)
				}
			});
			l.addListener("tabkeydown", function() {
				function d(a) {
					if (-1 != l.options.maxListLevel) {
						a = a.parentNode;
						for (var b = 0;
						/[ou]l/i.test(a.tagName);) b++, a = a.parentNode;
						if (b >= l.options.maxListLevel) return !0
					}
				}
				var k = l.selection.getRange(),
					e = g.findParentByTagName(k.startContainer, "li", !0);
				if (e) {
					var c;
					if (k.collapsed) {
						if (d(e)) return !0;
						var h = e.parentNode,
							n = l.document.createElement(h.tagName),
							r = q.indexOf(m[n.tagName], a(h) || g.getComputedStyle(h, "list-style-type")),
							r = r + 1 == m[n.tagName].length ? 0 : r + 1,
							r = m[n.tagName][r];
						f(n, r);
						if (g.isStartInblock(k)) return l.fireEvent("saveScene"), c = k.createBookmark(), h.insertBefore(n, e), n.appendChild(e), b(n, n.tagName.toLowerCase(), r), l.fireEvent("contentchange"), k.moveToBookmark(c).select(!0), !0
					} else {
						l.fireEvent("saveScene");
						c = k.createBookmark();
						for (var h = 0, u, n = g.findParents(e), p; p = n[h++];) if (g.isTagNode(p, "ol ul")) {
							u = p;
							break
						}
						p = e;
						if (c.end) for (; p && !(g.getPosition(p, c.end) & g.POSITION_FOLLOWING);) if (d(p)) p = g.getNextDomNode(p, !1, null, function(a) {
							return a !== u
						});
						else {
							h = p.parentNode;
							n = l.document.createElement(h.tagName);
							r = q.indexOf(m[n.tagName], a(h) || g.getComputedStyle(h, "list-style-type"));
							r = m[n.tagName][r + 1 == m[n.tagName].length ? 0 : r + 1];
							f(n, r);
							for (h.insertBefore(n, p); p && !(g.getPosition(p, c.end) & g.POSITION_FOLLOWING);) {
								e = p.nextSibling;
								n.appendChild(p);
								if (!e || g.isTagNode(e, "ol ul")) {
									if (e) for (;
									(e = e.firstChild) && "LI" != e.tagName;);
									else e = g.getNextDomNode(p, !1, null, function(a) {
										return a !== u
									});
									break
								}
								p = e
							}
							b(n, n.tagName.toLowerCase(), r);
							p = e
						}
						l.fireEvent("contentchange");
						k.moveToBookmark(c).select();
						return !0
					}
				}
			});
			l.commands.insertorderedlist = l.commands.insertunorderedlist = {
				execCommand: function(e, c) {
					c || (c = "insertorderedlist" == e.toLowerCase() ? "decimal" : "disc");
					var h = this.selection.getRange(),
						l = function(a) {
							return 1 == a.nodeType ? "br" != a.tagName.toLowerCase() : !g.isWhitespace(a)
						},
						m = "insertorderedlist" == e.toLowerCase() ? "ol" : "ul",
						n = this.document.createDocumentFragment();
					h.adjustmentBoundary().shrinkBoundary();
					var r = h.createBookmark(!0),
						u = d(this.document.getElementById(r.start)),
						v = 0,
						w = d(this.document.getElementById(r.end)),
						q = 0,
						p, t, C, B;
					if (u || w) {
						u && (p = u.parentNode);
						r.end || (w = u);
						w && (t = w.parentNode);
						if (p === t) {
							for (; u !== w;) {
								B = u;
								u = u.nextSibling;
								if (!g.isBlockElm(B.firstChild)) {
									for (l = this.document.createElement("p"); B.firstChild;) l.appendChild(B.firstChild);
									B.appendChild(l)
								}
								n.appendChild(B)
							}
							B = this.document.createElement("span");
							p.insertBefore(B, w);
							if (!g.isBlockElm(w.firstChild)) {
								for (l = this.document.createElement("p"); w.firstChild;) l.appendChild(w.firstChild);
								w.appendChild(l)
							}
							n.appendChild(w);
							g.breakParent(B, p);
							g.isEmptyNode(B.previousSibling) && g.remove(B.previousSibling);
							g.isEmptyNode(B.nextSibling) && g.remove(B.nextSibling);
							l = a(p) || g.getComputedStyle(p, "list-style-type") || ("insertorderedlist" == e.toLowerCase() ? "decimal" : "disc");
							if (p.tagName.toLowerCase() == m && l == c) {
								w = 0;
								for (w = this.document.createDocumentFragment(); l = n.firstChild;) if (g.isTagNode(l, "ol ul")) w.appendChild(l);
								else for (; l.firstChild;) w.appendChild(l.firstChild), g.remove(l);
								B.parentNode.insertBefore(w, B)
							} else C = this.document.createElement(m), f(C, c), C.appendChild(n), B.parentNode.insertBefore(C, B);
							g.remove(B);
							C && b(C, m, c);
							h.moveToBookmark(r).select();
							return
						}
						if (u) {
							for (; u;) {
								B = u.nextSibling;
								if (g.isTagNode(u, "ol ul")) n.appendChild(u);
								else {
									C = this.document.createDocumentFragment();
									for (var A = 0; u.firstChild;) g.isBlockElm(u.firstChild) && (A = 1), C.appendChild(u.firstChild);
									A ? n.appendChild(C) : (A = this.document.createElement("p"), A.appendChild(C), n.appendChild(A));
									g.remove(u)
								}
								u = B
							}
							p.parentNode.insertBefore(n, p.nextSibling);
							g.isEmptyNode(p) ? (h.setStartBefore(p), g.remove(p)) : h.setStartAfter(p);
							v = 1
						}
						if (w && g.inDoc(t, this.document)) {
							for (u = t.firstChild; u && u !== w;) {
								B = u.nextSibling;
								if (g.isTagNode(u, "ol ul")) n.appendChild(u);
								else {
									C = this.document.createDocumentFragment();
									for (A = 0; u.firstChild;) g.isBlockElm(u.firstChild) && (A = 1), C.appendChild(u.firstChild);
									A ? n.appendChild(C) : (A = this.document.createElement("p"), A.appendChild(C), n.appendChild(A));
									g.remove(u)
								}
								u = B
							}
							B = g.createElement(this.document, "div", {
								tmpDiv: 1
							});
							g.moveChild(w, B);
							n.appendChild(B);
							g.remove(w);
							t.parentNode.insertBefore(n, t);
							h.setEndBefore(t);
							g.isEmptyNode(t) && g.remove(t);
							q = 1
						}
					}
					v || h.setStartBefore(this.document.getElementById(r.start));
					r.end && !q && h.setEndAfter(this.document.getElementById(r.end));
					h.enlarge(!0, function(a) {
						return k[a.tagName]
					});
					n = this.document.createDocumentFragment();
					w = h.createBookmark();
					p = g.getNextDomNode(w.start, !1, l);
					C = h.cloneRange();
					for (v = g.isBlockElm; p && p !== w.end && g.getPosition(p, w.end) & g.POSITION_PRECEDING;) if (3 == p.nodeType || y.li[p.tagName]) if (1 == p.nodeType && y.$list[p.tagName]) {
						for (; p.firstChild;) n.appendChild(p.firstChild);
						u = g.getNextDomNode(p, !1, l);
						g.remove(p);
						p = u
					} else {
						u = p;
						for (C.setStartBefore(p); p && p !== w.end && (!v(p) || g.isBookmarkNode(p));) u = p, p = g.getNextDomNode(p, !1, null, function(a) {
							return !k[a.tagName]
						});
						p && v(p) && (B = g.getNextDomNode(u, !1, l)) && g.isBookmarkNode(B) && (p = g.getNextDomNode(B, !1, l), u = B);
						C.setEndAfter(u);
						p = g.getNextDomNode(u, !1, l);
						B = h.document.createElement("li");
						B.appendChild(C.extractContents());
						if (g.isEmptyNode(B)) {
							for (u = h.document.createElement("p"); B.firstChild;) u.appendChild(B.firstChild);
							B.appendChild(u)
						}
						n.appendChild(B)
					} else p = g.getNextDomNode(p, !0, l);
					h.moveToBookmark(w).collapse(!0);
					C = this.document.createElement(m);
					f(C, c);
					C.appendChild(n);
					h.insertNode(C);
					b(C, m, c);
					w = 0;
					for (m = g.getElementsByTagName(C, "div"); l = m[w++];) l.getAttribute("tmpDiv") && g.remove(l, !0);
					h.moveToBookmark(r).select()
				},
				queryCommandState: function(a) {
					a = "insertorderedlist" == a.toLowerCase() ? "ol" : "ul";
					for (var b = this.selection.getStartElementPath(), d = 0, f;
					(f = b[d++]) && "TABLE" != f.nodeName;) if (a == f.nodeName.toLowerCase()) return 1;
					return 0
				},
				queryCommandValue: function(b) {
					b = "insertorderedlist" == b.toLowerCase() ? "ol" : "ul";
					for (var d = this.selection.getStartElementPath(), f, e = 0, k; k = d[e++];) {
						if ("TABLE" == k.nodeName) {
							f = null;
							break
						}
						if (b == k.nodeName.toLowerCase()) {
							f = k;
							break
						}
					}
					return f ? a(f) || g.getComputedStyle(f, "list-style-type") : null
				}
			}
		};
		(function() {
			var c = {
				textarea: function(a, e) {
					var b = e.ownerDocument.createElement("textarea");
					b.style.cssText = "position:absolute;resize:none;width:100%;height:100%;border:0;padding:0;margin:0;overflow-y:auto;";
					t.ie && 8 > t.version && (b.style.width = e.offsetWidth + "px", b.style.height = e.offsetHeight + "px", e.onresize = function() {
						b.style.width = e.offsetWidth + "px";
						b.style.height = e.offsetHeight + "px"
					});
					e.appendChild(b);
					return {
						setContent: function(a) {
							b.value = a
						},
						getContent: function() {
							return b.value
						},
						select: function() {
							var a;
							t.ie ? (a = b.createTextRange(), a.collapse(!0), a.select()) : (b.setSelectionRange(0, 0), b.focus())
						},
						dispose: function() {
							e.removeChild(b);
							e = b = e.onresize = null
						}
					}
				},
				codemirror: function(a, e) {
					var b = window.CodeMirror(e, {
						mode: "text/html",
						tabMode: "indent",
						lineNumbers: !0,
						lineWrapping: !0
					}),
						f = b.getWrapperElement();
					f.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;font-family:consolas,"Courier new",monospace;font-size:13px;';
					b.getScrollerElement().style.cssText = "position:absolute;left:0;top:0;width:100%;height:100%;";
					b.refresh();
					return {
						getCodeMirror: function() {
							return b
						},
						setContent: function(a) {
							b.setValue(a)
						},
						getContent: function() {
							return b.getValue()
						},
						select: function() {
							b.focus()
						},
						dispose: function() {
							e.removeChild(f);
							b = f = null
						}
					}
				}
			};
			UE.plugins.source = function() {
				var a = this,
					e = this.options,
					b = !1,
					f, h;
				e.sourceEditor = t.ie ? "textarea" : e.sourceEditor || "codemirror";
				a.setOpt({
					sourceEditorFirst: !1
				});
				var d, l, k;
				a.commands.source = {
					execCommand: function() {
						if (b = !b) {
							k = a.selection.getRange().createAddress(!1, !0);
							a.undoManger && a.undoManger.save(!0);
							t.gecko && (a.body.contentEditable = !1);
							d = a.iframe.style.cssText;
							a.iframe.style.cssText += "position:absolute;left:-32768px;top:-32768px;";
							a.fireEvent("beforegetcontent");
							var m = UE.htmlparser(a.body.innerHTML);
							a.filterOutputRule(m);
							m.traversal(function(a) {
								if ("element" == a.type) switch (a.tagName) {
								case "td":
								case "th":
								case "caption":
									a.children && 1 == a.children.length && "br" == a.firstChild().tagName && a.removeChild(a.firstChild());
									break;
								case "pre":
									a.innerText(a.innerText().replace(/&nbsp;/g, " "))
								}
							});
							a.fireEvent("aftergetcontent");
							m = m.toHtml(!0);
							f = c["codemirror" == e.sourceEditor && window.CodeMirror ? "codemirror" : "textarea"](a, a.iframe.parentNode);
							f.setContent(m);
							h = a.setContent;
							a.setContent = function(b) {
								b = UE.htmlparser(b);
								a.filterInputRule(b);
								b = b.toHtml();
								f.setContent(b)
							};
							setTimeout(function() {
								f.select();
								a.addListener("fullscreenchanged", function() {
									try {
										f.getCodeMirror().refresh()
									} catch (u) {}
								})
							});
							l = a.getContent;
							a.getContent = function() {
								return f.getContent() || '<section data-role="paragraph" class="_135editor"><p>' + (t.ie ? "" : "<br/>") + "</p></section>"
							}
						} else if (a.iframe.style.cssText = d, m = f.getContent() || '<section data-role="paragraph" class="_135editor"><p>' + (t.ie ? "" : "<br/>") + "</p></section>", m = m.replace(RegExp("[\\r\\t\\n ]*</?(\\w+)\\s*(?:[^>]*)>", "g"), function(a, b) {
							return b && !y.$inlineWithA[b.toLowerCase()] ? a.replace(/(^[\n\r\t ]*)|([\n\r\t ]*$)/g, "") : a.replace(/(^[\n\r\t]*)|([\n\r\t]*$)/g, "")
						}), a.setContent = h, a.setContent(m), f.dispose(), f = null, a.getContent = l, m = a.body.firstChild.firstChild, m || (a.body.innerHTML = '<section data-role="paragraph" class="_135editor"><p>' + (t.ie ? "" : "<br/>") + "</p></section>", m = a.body.firstChild.firstChild), a.undoManger && a.undoManger.save(!0), t.gecko) {
							var n = document.createElement("input");
							n.style.cssText = "position:absolute;left:0;top:-32768px";
							document.body.appendChild(n);
							a.body.contentEditable = !1;
							setTimeout(function() {
								g.setViewportOffset(n, {
									left: -32768,
									top: 0
								});
								n.focus();
								setTimeout(function() {
									a.body.contentEditable = !0;
									a.selection.getRange().moveToAddress(k).select(!0);
									g.remove(n)
								})
							})
						} else try {
							a.selection.getRange().moveToAddress(k).select(!0)
						} catch (u) {}
						this.fireEvent("sourcemodechanged", b)
					},
					queryCommandState: function() {
						return b | 0
					},
					notNeedUndo: 1
				};
				var n = a.queryCommandState;
				a.queryCommandState = function(a) {
					a = a.toLowerCase();
					return b ? a in {
						source: 1,
						fullscreen: 1
					} ? 1 : -1 : n.apply(this, arguments)
				};
				"codemirror" == e.sourceEditor && a.addListener("ready", function() {
					q.loadFile(document, {
						src: e.codeMirrorJsUrl || e.UEDITOR_HOME_URL + "third-party/codemirror/codemirror.js",
						tag: "script",
						type: "text/javascript",
						defer: "defer"
					}, function() {
						e.sourceEditorFirst && setTimeout(function() {
							a.execCommand("source")
						}, 0)
					});
					q.loadFile(document, {
						tag: "link",
						rel: "stylesheet",
						type: "text/css",
						href: e.codeMirrorCssUrl || e.UEDITOR_HOME_URL + "third-party/codemirror/codemirror.css"
					})
				})
			}
		})();
		UE.plugins.enterkey = function() {
			var c, a = this,
				e = a.options.enterTag;
			a.addListener("keyup", function(b, f) {
				if (13 == (f.keyCode || f.which)) {
					var e = a.selection.getRange(),
						d = e.startContainer,
						l;
					if (t.ie) a.fireEvent("saveScene", !0, !0);
					else {
						if (/h\d/i.test(c)) {
							if (t.gecko) g.findParentByTagName(d, "h1 h2 h3 h4 h5 h6 blockquote caption table".split(" "), !0) || (a.document.execCommand("formatBlock", !1, "<p>"), l = 1);
							else if (1 == d.nodeType) {
								var d = a.document.createTextNode(""),
									k;
								e.insertNode(d);
								if (k = g.findParentByTagName(d, "div", !0)) {
									for (l = a.document.createElement("p"); k.firstChild;) l.appendChild(k.firstChild);
									k.parentNode.insertBefore(l, k);
									g.remove(k);
									e.setStartBefore(d).setCursor();
									l = 1
								}
								g.remove(d)
							}
							a.undoManger && l && a.undoManger.save()
						}
						t.opera && e.select()
					}
				}
			});
			a.addListener("keydown", function(b, f) {
				if (13 == (f.keyCode || f.which)) if (a.fireEvent("beforeenterkeydown")) g.preventDefault(f);
				else {
					a.fireEvent("saveScene", !0, !0);
					c = "";
					var h = a.selection.getRange();
					if (!h.collapsed) {
						var d = h.startContainer,
							l = h.endContainer,
							d = g.findParentByTagName(d, "td", !0),
							l = g.findParentByTagName(l, "td", !0);
						if (d && l && d !== l || !d && l || d && !l) {
							f.preventDefault ? f.preventDefault() : f.returnValue = !1;
							return
						}
					}
					if ("p" == e) t.ie || ((d = g.findParentByTagName(h.startContainer, "ol ul p h1 h2 h3 h4 h5 h6 blockquote caption".split(" "), !0)) || t.opera ? (c = d.tagName, "p" == d.tagName.toLowerCase() && t.gecko && g.removeDirtyAttr(d)) : (a.document.execCommand("formatBlock", !1, "<p>"), t.gecko && (h = a.selection.getRange(), (d = g.findParentByTagName(h.startContainer, "p", !0)) && g.removeDirtyAttr(d))));
					else if (f.preventDefault ? f.preventDefault() : f.returnValue = !1, h.collapsed) l = h.document.createElement("br"), h.insertNode(l), l.parentNode.lastChild === l ? (l.parentNode.insertBefore(l.cloneNode(!0), l), h.setStartBefore(l)) : h.setStartAfter(l), h.setCursor();
					else if (h.deleteContents(), d = h.startContainer, 1 == d.nodeType && (d = d.childNodes[h.startOffset])) {
						for (; 1 == d.nodeType;) {
							if (y.$empty[d.tagName]) return h.setStartBefore(d).setCursor(), a.undoManger && a.undoManger.save(), !1;
							if (!d.firstChild) return l = h.document.createElement("br"), d.appendChild(l), h.setStart(d, 0).setCursor(), a.undoManger && a.undoManger.save(), !1;
							d = d.firstChild
						}
						d === h.startContainer.childNodes[h.startOffset] ? (l = h.document.createElement("br"), h.insertNode(l).setCursor()) : h.setStart(d, 0).setCursor()
					} else l = h.document.createElement("br"), h.insertNode(l).setStartAfter(l).setCursor()
				}
			})
		};
		UE.plugins.keystrokes = function() {
			var c = this,
				a = !0;
			c.addListener("keydown", function(e, b) {
				var f = b.keyCode || b.which,
					h = c.selection.getRange();
				if (!(h.collapsed || b.ctrlKey || b.shiftKey || b.altKey || b.metaKey) && (65 <= f && 90 >= f || 48 <= f && 57 >= f || 96 <= f && 111 >= f || {
					13: 1,
					8: 1,
					46: 1
				}[f])) {
					var d = h.startContainer;
					g.isFillChar(d) && h.setStartBefore(d);
					d = h.endContainer;
					g.isFillChar(d) && h.setEndAfter(d);
					h.txtToElmBoundary();
					h.endContainer && 1 == h.endContainer.nodeType && (d = h.endContainer.childNodes[h.endOffset]) && g.isBr(d) && h.setEndAfter(d);
					if (0 == h.startOffset && (d = h.startContainer, g.isBoundaryNode(d, "firstChild") && (d = h.endContainer, h.endOffset == (3 == d.nodeType ? d.nodeValue.length : d.childNodes.length) && g.isBoundaryNode(d, "lastChild")))) {
						c.fireEvent("saveScene");
						c.body.innerHTML = "<p>" + (t.ie ? "" : "<br/>") + "</p>";
						h.setStart(c.body.firstChild, 0).setCursor(!1, !0);
						c._selectionChange();
						return
					}
				}
				if (f == ba.Backspace) {
					h = c.selection.getRange();
					a = h.collapsed;
					if (c.fireEvent("delkeydown", b)) return;
					var l, k;
					h.collapsed && h.inFillChar() && (l = h.startContainer, g.isFillChar(l) ? (h.setStartBefore(l).shrinkBoundary(!0).collapse(!0), g.remove(l)) : (l.nodeValue = l.nodeValue.replace(new RegExp("^" + g.fillChar), ""), h.startOffset--, h.collapse(!0).select(!0)));
					if (l = h.getClosedNode()) {
						c.fireEvent("saveScene");
						h.setStartBefore(l);
						g.remove(l);
						h.setCursor();
						c.fireEvent("saveScene");
						g.preventDefault(b);
						return
					}
					if (!t.ie && (l = g.findParentByTagName(h.startContainer, "table", !0), k = g.findParentByTagName(h.endContainer, "table", !0), l && !k || !l && k || l !== k)) {
						b.preventDefault();
						return
					}
				}
				if (f == ba.Tab) {
					var n = {
						ol: 1,
						ul: 1,
						table: 1
					};
					if (c.fireEvent("tabkeydown", b)) {
						g.preventDefault(b);
						return
					}
					h = c.selection.getRange();
					c.fireEvent("saveScene");
					var d = 0,
						m = "";
					l = c.options.tabSize || 4;
					for (k = c.options.tabNode || "&nbsp;"; d < l; d++) m += k;
					d = c.document.createElement("span");
					d.innerHTML = m + g.fillChar;
					if (h.collapsed) h.insertNode(d.cloneNode(!0).firstChild).setCursor(!0);
					else if (m = function(a) {
						return g.isBlockElm(a) && !n[a.tagName.toLowerCase()]
					}, l = g.findParent(h.startContainer, m, !0), k = g.findParent(h.endContainer, m, !0), l && k && l === k) h.deleteContents(), h.insertNode(d.cloneNode(!0).firstChild).setCursor(!0);
					else {
						l = h.createBookmark();
						h.enlarge(!0);
						k = h.createBookmark();
						for (var r = g.getNextDomNode(k.start, !1, m); r && !(g.getPosition(r, k.end) & g.POSITION_FOLLOWING);) r.insertBefore(d.cloneNode(!0).firstChild, r.firstChild), r = g.getNextDomNode(r, !1, m);
						h.moveToBookmark(k).moveToBookmark(l).select()
					}
					g.preventDefault(b)
				}
				if (t.gecko && 46 == f && (h = c.selection.getRange(), h.collapsed && (l = h.startContainer, g.isEmptyBlock(l)))) {
					for (f = l.parentNode; 1 == g.getChildCount(f) && !g.isBody(f);) l = f, f = f.parentNode;
					l === f.lastChild && b.preventDefault();
					return
				}
				t.chrome && c.on("keydown", function(a, b) {
					var d = b.keyCode || b.which;
					if ((b.metaKey && b.altKey || b.ctrlKey && b.shiftKey) && 73 == d) return !0
				})
			});
			c.addListener("keyup", function(e, b) {
				var f;
				if ((b.keyCode || b.which) == ba.Backspace && !this.fireEvent("delkeyup")) {
					f = this.selection.getRange();
					if (f.collapsed) {
						var c;
						if ((c = g.findParentByTagName(f.startContainer, "h1 h2 h3 h4 h5 h6".split(" "), !0)) && g.isEmptyBlock(c)) {
							var d = c.previousSibling;
							if (d && "TABLE" != d.nodeName) {
								g.remove(c);
								f.setStartAtLast(d).setCursor(!1, !0);
								return
							}
							if ((d = c.nextSibling) && "TABLE" != d.nodeName) {
								g.remove(c);
								f.setStartAtFirst(d).setCursor(!1, !0);
								return
							}
						}
						g.isBody(f.startContainer) && (c = g.createElement(this.document, "p", {
							innerHTML: t.ie ? g.fillChar : "<br/>"
						}), f.insertNode(c).setStart(c, 0).setCursor(!1, !0))
					}!a && (3 == f.startContainer.nodeType || 1 == f.startContainer.nodeType && g.isEmptyBlock(f.startContainer)) && (t.ie ? (c = f.document.createElement("span"), f.insertNode(c).setStartBefore(c).collapse(!0), f.select(), g.remove(c)) : f.select())
				}
			})
		};
		UE.plugins.fiximgclick = function() {
			function c() {
				this.cover = this.resizer = this.editor = null;
				this.doc = document;
				this.prePos = {
					x: 0,
					y: 0
				};
				this.startPos = {
					x: 0,
					y: 0
				}
			}
			var a = !1;
			(function() {
				var e = [
					[0, 0, -1, -1],
					[0, 0, 0, -1],
					[0, 0, 1, -1],
					[0, 0, -1, 0],
					[0, 0, 1, 0],
					[0, 0, -1, 1],
					[0, 0, 0, 1],
					[0, 0, 1, 1]
				];
				c.prototype = {
					init: function(a) {
						var b = this;
						b.editor = a;
						b.startPos = this.prePos = {
							x: 0,
							y: 0
						};
						b.dragId = -1;
						a = [];
						var e = b.cover = document.createElement("div"),
							d = b.resizer = document.createElement("div");
						e.id = b.editor.ui.id + "_imagescale_cover";
						e.style.cssText = "position:absolute;display:none;z-index:" + b.editor.options.zIndex + ";filter:alpha(opacity=0); opacity:0;background:#CCC;";
						g.on(e, "mousedown click", function() {
							b.hide();
							b.editor.selection.clearRange()
						});
						for (i = 0; 8 > i; i++) a.push('<span class="edui-editor-imagescale-hand' + i + '"></span>');
						d.id = b.editor.ui.id + "_imagescale";
						d.className = "edui-editor-imagescale";
						d.innerHTML = a.join("");
						d.style.cssText += ";display:none;border:1px solid #43B548;z-index:" + b.editor.options.zIndex + ";";
						b.editor.ui.getDom().appendChild(e);
						b.editor.ui.getDom().appendChild(d);
						b.initStyle();
						b.initEvents()
					},
					initStyle: function() {
						q.cssRule("imagescale", ".edui-editor-imagescale{display:none;position:absolute;border:1px solid #43B548;cursor:hand;-webkit-box-sizing: content-box;-moz-box-sizing: content-box;box-sizing: content-box;}.edui-editor-imagescale span{position:absolute;width:6px;height:6px;overflow:hidden;font-size:0px;display:block;background-color:#43B548;}.edui-editor-imagescale .edui-editor-imagescale-hand0{cursor:nw-resize;top:0;margin-top:-4px;left:0;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand1{cursor:n-resize;top:0;margin-top:-4px;left:50%;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand2{cursor:ne-resize;top:0;margin-top:-4px;left:100%;margin-left:-3px;}.edui-editor-imagescale .edui-editor-imagescale-hand3{cursor:w-resize;top:50%;margin-top:-4px;left:0;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand4{cursor:e-resize;top:50%;margin-top:-4px;left:100%;margin-left:-3px;}.edui-editor-imagescale .edui-editor-imagescale-hand5{cursor:sw-resize;top:100%;margin-top:-3px;left:0;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand6{cursor:s-resize;top:100%;margin-top:-3px;left:50%;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand7{cursor:se-resize;top:100%;margin-top:-3px;left:100%;margin-left:-3px;}")
					},
					initEvents: function() {
						this.startPos.x = this.startPos.y = 0;
						this.isDraging = !1
					},
					_eventHandler: function(b) {
						switch (b.type) {
						case "mousedown":
							var f = b.target || b.srcElement; - 1 != f.className.indexOf("edui-editor-imagescale-hand") && -1 == this.dragId && (this.dragId = f.className.slice(-1), this.startPos.x = this.prePos.x = b.clientX, this.startPos.y = this.prePos.y = b.clientY, g.on(this.doc, "mousemove", this.proxy(this._eventHandler, this)));
							break;
						case "mousemove":
							if (-1 != this.dragId) {
								this.updateContainerStyle(this.dragId, {
									x: b.clientX - this.prePos.x,
									y: b.clientY - this.prePos.y
								});
								this.prePos.x = b.clientX;
								this.prePos.y = b.clientY;
								a = !0;
								this.updateTargetElement();
								try {
									(new UE.dom.Selection(this.doc)).getNative().removeAllRanges()
								} catch (h) {}
							}
							break;
						case "mouseup":
							-1 != this.dragId && (this.updateContainerStyle(this.dragId, {
								x: b.clientX - this.prePos.x,
								y: b.clientY - this.prePos.y
							}), this.updateTargetElement(), this.target.parentNode && this.attachTo(this.target), this.dragId = -1), g.un(this.doc, "mousemove", this.proxy(this._eventHandler, this)), a && (a = !1, this.editor.fireEvent("contentchange")), this.dragId = -1
						}
					},
					updateTargetElement: function() {
						g.setStyles(this.target, {
							width: this.resizer.style.width,
							height: this.resizer.style.height
						});
						this.target.width = parseInt(this.resizer.style.width);
						this.target.height = parseInt(this.resizer.style.height);
						this.attachTo(this.target)
					},
					updateContainerStyle: function(a, f) {
						var b = this.resizer,
							d;
						0 != e[a][0] && (d = parseInt(b.style.left) + f.x, b.style.left = this._validScaledProp("left", d) + "px");
						0 != e[a][1] && (d = parseInt(b.style.top) + f.y, b.style.top = this._validScaledProp("top", d) + "px");
						0 != e[a][2] && (d = parseInt(b.style.width) + e[a][2] * f.x, 50 < d && (b.style.width = this._validScaledProp("width", d) + "px", 0 != e[a][3] && (d = parseInt(b.style.height) + e[a][3] * f.y, b.style.height = this._validScaledProp("height", d) + "px")))
					},
					_validScaledProp: function(a, f) {
						var b = this.resizer,
							d = document;
						f = isNaN(f) ? 0 : f;
						switch (a) {
						case "left":
							return 0 > f ? 0 : f + b.clientWidth > d.clientWidth ? d.clientWidth - b.clientWidth : f;
						case "top":
							return 0 > f ? 0 : f + b.clientHeight > d.clientHeight ? d.clientHeight - b.clientHeight : f;
						case "width":
							return 0 >= f ? 1 : f + b.offsetLeft > d.clientWidth ? d.clientWidth - b.offsetLeft : f;
						case "height":
							return 0 >= f ? 1 : f + b.offsetTop > d.clientHeight ? d.clientHeight - b.offsetTop : f
						}
					},
					hideCover: function() {
						this.cover.style.display = "none"
					},
					showCover: function() {
						var a = g.getXY(this.editor.ui.getDom()),
							f = g.getXY(this.editor.iframe);
						g.setStyles(this.cover, {
							width: this.editor.iframe.offsetWidth + "px",
							height: this.editor.iframe.offsetHeight + "px",
							top: f.y - a.y + "px",
							left: f.x - a.x + "px",
							position: "absolute",
							display: ""
						})
					},
					show: function(a) {
						this.resizer.style.display = "block";
						a && this.attachTo(a);
						g.on(this.resizer, "mousedown", this.proxy(this._eventHandler, this));
						g.on(this.doc, "mouseup", this.proxy(this._eventHandler, this));
						this.showCover();
						this.editor.fireEvent("afterscaleshow", this);
						this.editor.fireEvent("saveScene")
					},
					hide: function() {
						this.hideCover();
						this.resizer.style.display = "none";
						g.un(this.resizer, "mousedown", this.proxy(this._eventHandler, this));
						g.un(this.doc, "mouseup", this.proxy(this._eventHandler, this));
						this.editor.fireEvent("afterscalehide", this)
					},
					proxy: function(a, f) {
						return function(b) {
							return a.apply(f || this, arguments)
						}
					},
					attachTo: function(a) {
						a = this.target = a;
						var b = this.resizer,
							e = g.getXY(a),
							d = g.getXY(this.editor.iframe),
							c = g.getXY(b.parentNode);
						g.setStyles(b, {
							width: a.width + "px",
							height: a.height + "px",
							left: d.x + e.x - this.editor.document.body.scrollLeft - c.x - parseInt(b.style.borderLeftWidth) + "px",
							top: d.y + e.y - this.editor.document.body.scrollTop - c.y - parseInt(b.style.borderTopWidth) + "px"
						})
					}
				}
			})();
			return function() {
				var a = this,
					b;
				a.setOpt("imageScaleEnabled", !0);
				!t.ie && a.options.imageScaleEnabled && a.addListener("click", function(f, e) {
					e = e || window.event;
					var d = e.target || e.srcElement,
						h = a.selection.getRange(),
						k = h.getClosedNode();
					if (!1 === h.collapsed && "IMG" == d.tagName && k && "IMG" == k.tagName && "false" != a.body.contentEditable) {
						if (!(-1 != k.className.indexOf("edui-faked-music") || k.getAttribute("anchorname") || g.hasClass(k, "loadingclass") || g.hasClass(k, "loaderrorclass"))) {
							if (!b) {
								b = new c;
								b.init(a);
								a.ui.getDom().appendChild(b.resizer);
								var n = function(d) {
										b.hide();
										b.target && a.selection.getRange().selectNode(b.target).select()
									},
									m = function(a) {
										var b = a.target || a.srcElement;
										!b || void 0 !== b.className && -1 != b.className.indexOf("edui-editor-imagescale") || n(a)
									},
									r;
								a.addListener("afterscaleshow", function(b) {
									a.addListener("beforekeydown", n);
									a.addListener("beforemousedown", m);
									g.on(document, "keydown", n);
									g.on(document, "mousedown", m);
									a.selection.getNative().removeAllRanges()
								});
								a.addListener("afterscalehide", function(d) {
									a.removeListener("beforekeydown", n);
									a.removeListener("beforemousedown", m);
									g.un(document, "keydown", n);
									g.un(document, "mousedown", m);
									d = b.target;
									d.parentNode && a.selection.getRange().selectNode(d).select()
								});
								g.on(b.resizer, "mousedown", function(d) {
									a.selection.getNative().removeAllRanges();
									var f = d.target || d.srcElement;
									f && -1 == f.className.indexOf("edui-editor-imagescale-hand") && (r = setTimeout(function() {
										b.hide();
										b.target && a.selection.getRange().selectNode(f).select()
									}, 200))
								});
								g.on(b.resizer, "mouseup", function(a) {
									(a = a.target || a.srcElement) && -1 == a.className.indexOf("edui-editor-imagescale-hand") && clearTimeout(r)
								})
							}
							b.show(k)
						}
					} else b && "none" != b.resizer.style.display && b.hide()
				});
				t.webkit && a.addListener("click", function(b, e) {
					"IMG" == e.target.tagName && "false" != a.body.contentEditable && (new F.Range(a.document)).selectNode(e.target).select()
				})
			}
		}();
		UE.plugin.register("autolink", function() {
			return t.ie ? {} : {
				bindEvents: {
					reset: function() {},
					keydown: function(c, a) {
						var e = a.keyCode || a.which;
						if (32 == e || 13 == e) {
							for (var e = this.selection.getNative(), b = e.getRangeAt(0).cloneRange(), f, h = b.startContainer; 1 == h.nodeType && 0 < b.startOffset;) {
								h = b.startContainer.childNodes[b.startOffset - 1];
								if (!h) break;
								b.setStart(h, 1 == h.nodeType ? h.childNodes.length : h.nodeValue.length);
								b.collapse(!0);
								h = b.startContainer
							}
							do {
								if (0 == b.startOffset) {
									for (h = b.startContainer.previousSibling; h && 1 == h.nodeType;) h = h.lastChild;
									if (!h || g.isFillChar(h)) break;
									f = h.nodeValue.length
								} else h = b.startContainer, f = b.startOffset;
								b.setStart(h, f - 1);
								f = b.toString().charCodeAt(0)
							} while (160 != f && 32 != f);
							if (b.toString().replace(new RegExp(g.fillChar, "g"), "").match(/(?:https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)/i)) {
								for (; b.toString().length && !/^(?:https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)/i.test(b.toString());) try {
									b.setStart(b.startContainer, b.startOffset + 1)
								} catch (l) {
									for (h = b.startContainer; !(next = h.nextSibling);) {
										if (g.isBody(h)) return;
										h = h.parentNode
									}
									b.setStart(next, 0)
								}
								if (!g.findParentByTagName(b.startContainer, "a", !0)) {
									f = this.document.createElement("a");
									var h = this.document.createTextNode(" "),
										d;
									this.undoManger && this.undoManger.save();
									f.appendChild(b.extractContents());
									f.href = f.innerHTML = f.innerHTML.replace(/<[^>]+>/g, "");
									d = f.getAttribute("href").replace(new RegExp(g.fillChar, "g"), "");
									d = /^(?:https?:\/\/)/ig.test(d) ? d : "http://" + d;
									f.setAttribute("_src", q.html(d));
									f.href = q.html(d);
									b.insertNode(f);
									f.parentNode.insertBefore(h, f.nextSibling);
									b.setStart(h, 0);
									b.collapse(!0);
									e.removeAllRanges();
									e.addRange(b);
									this.undoManger && this.undoManger.save()
								}
							}
						}
					}
				}
			}
		}, function() {
			function c(a) {
				if (3 == a.nodeType) return null;
				if ("A" == a.nodeName) return a;
				for (a = a.lastChild; a;) {
					if ("A" == a.nodeName) return a;
					if (3 == a.nodeType) {
						if (g.isWhitespace(a)) {
							a = a.previousSibling;
							continue
						}
						return null
					}
					a = a.lastChild
				}
			}
			var a = {
				37: 1,
				38: 1,
				39: 1,
				40: 1,
				13: 1,
				32: 1
			};
			t.ie && this.addListener("keyup", function(e, b) {
				var f = b.keyCode;
				if (a[f]) {
					var h = this.selection.getRange(),
						d = h.startContainer;
					if (13 == f) {
						for (; d && !g.isBody(d) && !g.isBlockElm(d);) d = d.parentNode;
						d && !g.isBody(d) && "P" == d.nodeName && (h = d.previousSibling) && 1 == h.nodeType && (h = c(h)) && !h.getAttribute("_href") && g.remove(h, !0)
					} else 32 == f ? 3 == d.nodeType && /^\s$/.test(d.nodeValue) && (d = d.previousSibling) && "A" == d.nodeName && !d.getAttribute("_href") && g.remove(d, !0) : (d = g.findParentByTagName(d, "a", !0)) && !d.getAttribute("_href") && (f = h.createBookmark(), g.remove(d, !0), h.moveToBookmark(f).select(!0))
				}
			})
		});
		UE.plugins.autoheight = function() {
			function c() {
				var a = this;
				clearTimeout(d);
				l || a.queryCommandState && (!a.queryCommandState || 1 == a.queryCommandState("source")) || (d = setTimeout(function() {
					for (var d = a.body.lastChild; d && 1 != d.nodeType;) d = d.previousSibling;
					d && 1 == d.nodeType && (d.style.clear = "both", h = Math.max(g.getXY(d).y + d.offsetHeight + 25, Math.max(f.minFrameHeight, f.initialFrameHeight)), h != b && (h !== parseInt(a.iframe.parentNode.style.height) && (a.iframe.parentNode.style.height = h + "px"), a.body.style.height = h + "px", b = h), g.removeStyle(d, "clear"))
				}, 50))
			}
			var a = this;
			a.autoHeightEnabled = !1 !== a.options.autoHeightEnabled;
			if (a.autoHeightEnabled) {
				var e, b = 0,
					f = a.options,
					h, d, l;
				a.addListener("fullscreenchanged", function(a, b) {
					l = b
				});
				a.addListener("destroy", function() {
					a.removeListener("contentchange afterinserthtml keyup mouseup", c)
				});
				a.enableAutoHeight = function() {
					var a = this;
					if (a.autoHeightEnabled) {
						var b = a.document;
						a.autoHeightEnabled = !0;
						e = b.body.style.overflowY;
						b.body.style.overflowY = "hidden";
						a.addListener("contentchange afterinserthtml keyup mouseup", c);
						setTimeout(function() {
							c.call(a)
						}, t.gecko ? 100 : 0);
						a.fireEvent("autoheightchanged", a.autoHeightEnabled)
					}
				};
				a.disableAutoHeight = function() {
					a.body.style.overflowY = e || "";
					a.removeListener("contentchange", c);
					a.removeListener("keyup", c);
					a.removeListener("mouseup", c);
					a.autoHeightEnabled = !1;
					a.fireEvent("autoheightchanged", a.autoHeightEnabled)
				};
				a.on("setHeight", function() {
					a.disableAutoHeight()
				});
				a.addListener("ready", function() {
					a.enableAutoHeight();
					var b;
					g.on(t.ie ? a.body : a.document, t.webkit ? "dragover" : "drop", function() {
						clearTimeout(b);
						b = setTimeout(function() {
							c.call(a)
						}, 100)
					});
					var d;
					window.onscroll = function() {
						null === d ? d = this.scrollY : 0 == this.scrollY && 0 != d && (a.window.scrollTo(0, 0), d = null)
					}
				})
			}
		};
		UE.plugins.autofloat = function() {
			function c() {
				var a = document.body.style;
				a.backgroundImage = 'url("about:blank")';
				a.backgroundAttachment = "fixed"
			}
			function a() {
				w = !0;
				m.parentNode && m.parentNode.removeChild(m);
				r.style.cssText = n
			}
			function e() {
				var d = v(b.container),
					f = b.options.toolbarTopOffset || 0;
				if (0 > d.top && d.bottom - r.offsetHeight > f) {
					var d = g.getXY(r),
						f = g.getComputedStyle(r, "position"),
						e = g.getComputedStyle(r, "left");
					r.style.width = r.offsetWidth + "px";
					r.style.zIndex = 1 * b.options.zIndex + 1;
					r.parentNode.insertBefore(m, r);
					l || k && t.ie ? ("absolute" != r.style.position && (r.style.position = "absolute"), r.style.top = (document.body.scrollTop || document.documentElement.scrollTop) - u + h + "px") : (t.ie7Compat && w && (w = !1, r.style.left = g.getXY(r).x - document.documentElement.getBoundingClientRect().left + 2 + "px"), "fixed" != r.style.position && (r.style.position = "fixed", r.style.top = h + "px", ("absolute" == f || "relative" == f) && parseFloat(e) && (r.style.left = d.x + "px")))
				} else a()
			}
			var b = this,
				f = b.getLang();
			b.setOpt({
				topOffset: 0
			});
			var h = b.options.topOffset;
			if (!1 !== b.options.autoFloatEnabled) {
				var d = UE.ui.uiUtils,
					l = t.ie && 6 >= t.version,
					k = t.quirks,
					n, m = document.createElement("div"),
					r, u, v, w = !0,
					x = q.defer(function() {
						e()
					}, t.ie ? 200 : 100, !0);
				b.addListener("destroy", function() {
					g.un(window, ["scroll", "resize"], e);
					b.removeListener("keydown", x)
				});
				b.addListener("ready", function() {
					var k;
					UE.ui ? k = 1 : (alert(f.autofloatMsg), k = 0);
					k && b.ui && (v = d.getClientRect, r = b.ui.getDom("toolbarbox"), u = v(r).top, n = r.style.cssText, m.style.height = r.offsetHeight + "px", l && c(), g.on(window, ["scroll", "resize"], e), b.addListener("keydown", x), b.addListener("beforefullscreenchange", function(b, d) {
						d && a()
					}), b.addListener("fullscreenchanged", function(a, b) {
						b || e()
					}), b.addListener("sourcemodechanged", function(a, b) {
						setTimeout(function() {
							e()
						}, 0)
					}), b.addListener("clearDoc", function() {
						setTimeout(function() {
							e()
						}, 0)
					}))
				})
			}
		};
		UE.plugins.video = function() {
			function c(a, f, c, d, l, k, g) {
				var b;
				switch (g) {
				case "image":
					b = "<img " + (d ? 'id="' + d + '"' : "") + ' width="' + f + '" height="' + c + '" _url="' + a + '" class="' + k.replace(/\bvideo-js\b/, "") + '" src="' + e.options.UEDITOR_HOME_URL + 'themes/default/images/spacer.gif" style="background:url(' + e.options.UEDITOR_HOME_URL + "themes/default/images/videologo.gif) no-repeat center center; border:1px solid gray;" + (l ? "float:" + l + ";" : "") + '" />';
					break;
				case "embed":
					b = '<embed type="application/x-shockwave-flash" class="' + k + '" pluginspage="http://www.macromedia.com/go/getflashplayer" src="' + q.html(a) + '" width="' + f + '" height="' + c + '"' + (l ? ' style="float:' + l + '"' : "") + ' wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" >';
					break;
				case "video":
					g = a.substr(a.lastIndexOf(".") + 1), "ogv" == g && (g = "ogg"), b = "<video" + (d ? ' id="' + d + '"' : "") + ' class="' + k + ' video-js" ' + (l ? ' style="float:' + l + '"' : "") + ' controls preload="none" width="' + f + '" height="' + c + '" src="' + a + '" data-setup="{}"><source src="' + a + '" type="video/' + g + '" /></video>'
				}
				return b
			}
			function a(a, f) {
				q.each(a.getNodesByTagName(f ? "img" : "embed video"), function(a) {
					var b = a.getAttr("class");
					if (b && -1 != b.indexOf("edui-faked-video")) {
						var e = c(f ? a.getAttr("_url") : a.getAttr("src"), a.getAttr("width"), a.getAttr("height"), null, a.getStyle("float") || "", b, f ? "embed" : "image");
						a.parentNode.replaceChild(UE.uNode.createElement(e), a)
					}
					b && -1 != b.indexOf("edui-upload-video") && (e = c(f ? a.getAttr("_url") : a.getAttr("src"), a.getAttr("width"), a.getAttr("height"), null, a.getStyle("float") || "", b, f ? "video" : "image"), a.parentNode.replaceChild(UE.uNode.createElement(e), a))
				})
			}
			var e = this;
			e.addOutputRule(function(b) {
				a(b, !0)
			});
			e.addInputRule(function(b) {
				a(b)
			});
			e.commands.insertvideo = {
				execCommand: function(a, f, h) {
					f = q.isArray(f) ? f : [f];
					if (!0 !== e.fireEvent("beforeinsertvideo", f)) {
						var b = [],
							l;
						a = 0;
						for (var k, n = f.length; a < n; a++) k = f[a], l = "upload" == h ? "edui-upload-video video-js vjs-default-skin" : "edui-faked-video", b.push(c(k.url, k.width || 420, k.height || 280, "tmpVedio" + a, null, l, "image"));
						e.execCommand("inserthtml", b.join(""), !0);
						h = this.selection.getRange();
						a = 0;
						for (n = f.length; a < n; a++) b = this.document.getElementById("tmpVedio" + a), g.removeAttributes(b, "id"), h.selectNode(b).select(), e.execCommand("imagefloat", f[a].align);
						e.fireEvent("afterinsertvideo", f)
					}
				},
				queryCommandState: function() {
					var a = e.selection.getRange().getClosedNode();
					return !a || "edui-faked-video" != a.className && -1 == a.className.indexOf("edui-upload-video") ? 0 : 1
				}
			}
		};
		(function() {
			var c = UE.UETable = function(a) {
					this.table = a;
					this.indexTable = [];
					this.selectedTds = [];
					this.cellsRange = {};
					this.update(a)
				};
			c.removeSelectedClass = function(a) {
				q.each(a, function(a) {
					g.removeClasses(a, "selectTdClass")
				})
			};
			c.addSelectedClass = function(a) {
				q.each(a, function(a) {
					g.addClass(a, "selectTdClass")
				})
			};
			c.isEmptyBlock = function(a) {
				var e = new RegExp(g.fillChar, "g");
				if (0 < a[t.ie ? "innerText" : "textContent"].replace(/^\s*$/, "").replace(e, "").length) return 0;
				for (var b in y.$isNotEmpty) if (y.$isNotEmpty.hasOwnProperty(b) && a.getElementsByTagName(b).length) return 0;
				return 1
			};
			c.getWidth = function(a) {
				return a ? parseInt(g.getComputedStyle(a, "width"), 10) : 0
			};
			c.getTableCellAlignState = function(a) {
				!q.isArray(a) && (a = [a]);
				var e = {},
					b = ["align", "valign"],
					f = null,
					c = !0;
				q.each(a, function(a) {
					q.each(b, function(b) {
						f = a.getAttribute(b);
						if (!e[b] && f) e[b] = f;
						else if (!e[b] || f !== e[b]) return c = !1
					});
					return c
				});
				return c ? e : null
			};
			c.getTableItemsByRange = function(a) {
				var e = a.selection.getStart();
				e && e.id && 0 === e.id.indexOf("_baidu_bookmark_start_") && e.nextSibling && (e = e.nextSibling);
				var b = (a = e && g.findParentByTagName(e, ["td", "th"], !0)) && a.parentNode,
					e = e && g.findParentByTagName(e, "caption", !0);
				return {
					cell: a,
					tr: b,
					table: e ? e.parentNode : b && b.parentNode.parentNode,
					caption: e
				}
			};
			c.getUETableBySelected = function(a) {
				return (a = c.getTableItemsByRange(a).table) && a.ueTable && a.ueTable.selectedTds.length ? a.ueTable : null
			};
			c.getDefaultValue = function(a, e) {
				var b = {
					thin: "0px",
					medium: "1px",
					thick: "2px"
				},
					f, c, d;
				if (e) l = e.getElementsByTagName("td")[0], d = g.getComputedStyle(e, "border-left-width"), f = parseInt(b[d] || d, 10), d = g.getComputedStyle(l, "padding-left"), c = parseInt(b[d] || d, 10), d = g.getComputedStyle(l, "border-left-width"), b = parseInt(b[d] || d, 10);
				else {
					e = a.document.createElement("table");
					e.insertRow(0).insertCell(0).innerHTML = "xxx";
					a.body.appendChild(e);
					var l = e.getElementsByTagName("td")[0];
					d = g.getComputedStyle(e, "border-left-width");
					f = parseInt(b[d] || d, 10);
					d = g.getComputedStyle(l, "padding-left");
					c = parseInt(b[d] || d, 10);
					d = g.getComputedStyle(l, "border-left-width");
					b = parseInt(b[d] || d, 10);
					g.remove(e)
				}
				return {
					tableBorder: f,
					tdPadding: c,
					tdBorder: b
				}
			};
			c.getUETable = function(a) {
				var e = a.tagName.toLowerCase();
				a = "td" == e || "th" == e || "caption" == e ? g.findParentByTagName(a, "table", !0) : a;
				a.ueTable || (a.ueTable = new c(a));
				return a.ueTable
			};
			c.cloneCell = function(a, e, b) {
				if (!a || q.isString(a)) return this.table.ownerDocument.createElement(a || "td");
				var f = g.hasClass(a, "selectTdClass");
				f && g.removeClasses(a, "selectTdClass");
				var c = a.cloneNode(!0);
				e && (c.rowSpan = c.colSpan = 1);
				!b && g.removeAttributes(c, "width height");
				!b && g.removeAttributes(c, "style");
				c.style.borderLeftStyle = "";
				c.style.borderTopStyle = "";
				c.style.borderLeftColor = a.style.borderRightColor;
				c.style.borderLeftWidth = a.style.borderRightWidth;
				c.style.borderTopColor = a.style.borderBottomColor;
				c.style.borderTopWidth = a.style.borderBottomWidth;
				f && g.addClass(a, "selectTdClass");
				return c
			};
			c.prototype = {
				getMaxRows: function() {
					for (var a = this.table.rows, e = 1, b = 0, f; f = a[b]; b++) {
						for (var c = 1, d = 0, l; l = f.cells[d++];) c = Math.max(l.rowSpan || 1, c);
						e = Math.max(c + b, e)
					}
					return e
				},
				getMaxCols: function() {
					for (var a = this.table.rows, e = 0, b = {}, f = 0, c; c = a[f]; f++) {
						for (var d = 0, l = 0, k; k = c.cells[l++];) if (d += k.colSpan || 1, k.rowSpan && 1 < k.rowSpan) for (var g = 1; g < k.rowSpan; g++) b["row_" + (f + g)] ? b["row_" + (f + g)]++ : b["row_" + (f + g)] = k.colSpan || 1;
						d += b["row_" + f] || 0;
						e = Math.max(d, e)
					}
					return e
				},
				getCellColIndex: function(a) {},
				getHSideCell: function(a, e) {
					try {
						var b = this.getCellInfo(a),
							f, c, d = this.selectedTds.length,
							l = this.cellsRange;
						if (!e && (d ? !l.beginColIndex : !b.colIndex) || e && (d ? l.endColIndex == this.colsNum - 1 : b.colIndex == this.colsNum - 1)) return null;
						f = d ? l.beginRowIndex : b.rowIndex;
						c = e ? d ? l.endColIndex + 1 : b.colIndex + 1 : d ? l.beginColIndex - 1 : 1 > b.colIndex ? 0 : b.colIndex - 1;
						return this.getCell(this.indexTable[f][c].rowIndex, this.indexTable[f][c].cellIndex)
					} catch (k) {}
				},
				getTabNextCell: function(a, e) {
					var b = this.getCellInfo(a),
						f = e || b.rowIndex,
						b = b.colIndex + 1 + (b.colSpan - 1),
						c;
					try {
						c = this.getCell(this.indexTable[f][b].rowIndex, this.indexTable[f][b].cellIndex)
					} catch (d) {
						try {
							f = 1 * f + 1, b = 0, c = this.getCell(this.indexTable[f][b].rowIndex, this.indexTable[f][b].cellIndex)
						} catch (l) {}
					}
					return c
				},
				getVSideCell: function(a, e, b) {
					try {
						var f = this.getCellInfo(a),
							c, d, l = this.selectedTds.length && !b,
							k = this.cellsRange;
						if (!e && 0 == f.rowIndex || e && (l ? k.endRowIndex == this.rowsNum - 1 : f.rowIndex + f.rowSpan > this.rowsNum - 1)) return null;
						c = e ? l ? k.endRowIndex + 1 : f.rowIndex + f.rowSpan : l ? k.beginRowIndex - 1 : f.rowIndex - 1;
						d = l ? k.beginColIndex : f.colIndex;
						return this.getCell(this.indexTable[c][d].rowIndex, this.indexTable[c][d].cellIndex)
					} catch (n) {}
				},
				getSameEndPosCells: function(a, e) {
					try {
						for (var b = "x" === e.toLowerCase(), f = g.getXY(a)[b ? "x" : "y"] + a["offset" + (b ? "Width" : "Height")], c = this.table.rows, d = null, l = [], k = 0; k < this.rowsNum; k++) for (var d = c[k].cells, n = 0, m; m = d[n++];) {
							var r = g.getXY(m)[b ? "x" : "y"] + m["offset" + (b ? "Width" : "Height")];
							if (r > f && b) break;
							if (a == m || f == r) if (1 == m[b ? "colSpan" : "rowSpan"] && l.push(m), b) break
						}
						return l
					} catch (u) {}
				},
				setCellContent: function(a, e) {
					a.innerHTML = e || (t.ie ? g.fillChar : "<br />")
				},
				cloneCell: c.cloneCell,
				getSameStartPosXCells: function(a) {
					try {
						var e = g.getXY(a).x + a.offsetWidth,
							b = this.table.rows,
							f;
						a = [];
						for (var c = 0; c < this.rowsNum; c++) {
							f = b[c].cells;
							for (var d = 0, l; l = f[d++];) {
								var k = g.getXY(l).x;
								if (k > e) break;
								if (k == e && 1 == l.colSpan) {
									a.push(l);
									break
								}
							}
						}
						return a
					} catch (n) {}
				},
				update: function(a) {
					this.table = a || this.table;
					this.selectedTds = [];
					this.cellsRange = {};
					this.indexTable = [];
					a = this.table.rows;
					for (var e = this.getMaxRows(), b = e - a.length, f = this.getMaxCols(); b--;) this.table.insertRow(a.length);
					this.rowsNum = e;
					this.colsNum = f;
					for (var b = 0, c = a.length; b < c; b++) this.indexTable[b] = Array(f);
					for (var b = 0, d; d = a[b]; b++) {
						var c = 0,
							l;
						for (d = d.cells; l = d[c]; c++) {
							l.rowSpan > e && (l.rowSpan = e);
							var k = c,
								n = l.rowSpan || 1;
							for (l = l.colSpan || 1; this.indexTable[b][k];) k++;
							for (var m = 0; m < n; m++) for (var r = 0; r < l; r++) this.indexTable[b + m][k + r] = {
								rowIndex: b,
								cellIndex: c,
								colIndex: k,
								rowSpan: n,
								colSpan: l
							}
						}
					}
					for (m = 0; m < e; m++) for (r = 0; r < f; r++) void 0 === this.indexTable[m][r] && (d = a[m], l = (l = d.cells[d.cells.length - 1]) ? l.cloneNode(!0) : this.table.ownerDocument.createElement("td"), this.setCellContent(l), 1 !== l.colSpan && (l.colSpan = 1), 1 !== l.rowSpan && (l.rowSpan = 1), d.appendChild(l), this.indexTable[m][r] = {
						rowIndex: m,
						cellIndex: l.cellIndex,
						colIndex: r,
						rowSpan: 1,
						colSpan: 1
					});
					a = g.getElementsByTagName(this.table, "td");
					var u = [];
					q.each(a, function(a) {
						g.hasClass(a, "selectTdClass") && u.push(a)
					});
					u.length && (e = u[u.length - 1], a = this.getCellInfo(u[0]), e = this.getCellInfo(e), this.selectedTds = u, this.cellsRange = {
						beginRowIndex: a.rowIndex,
						beginColIndex: a.colIndex,
						endRowIndex: e.rowIndex + e.rowSpan - 1,
						endColIndex: e.colIndex + e.colSpan - 1
					});
					if (!g.hasClass(this.table.rows[0], "firstRow")) for (g.addClass(this.table.rows[0], "firstRow"), b = 1; b < this.table.rows.length; b++) g.removeClasses(this.table.rows[b], "firstRow")
				},
				getCellInfo: function(a) {
					if (a) {
						var e = a.cellIndex;
						a = a.parentNode.rowIndex;
						for (var b = this.indexTable[a], f = this.colsNum, c = e; c < f; c++) {
							var d = b[c];
							if (d.rowIndex === a && d.cellIndex === e) return d
						}
					}
				},
				getCell: function(a, e) {
					return a < this.rowsNum && this.table.rows[a].cells[e] || null
				},
				deleteCell: function(a, e) {
					e = "number" == typeof e ? e : a.parentNode.rowIndex;
					this.table.rows[e].deleteCell(a.cellIndex)
				},
				getCellsRange: function(a, e) {
					function b(a, d, c, e) {
						var k = a,
							h = d,
							l = c,
							g = e,
							m, n, q;
						if (0 < a) for (n = d; n < e; n++) m = f.indexTable[a][n], q = m.rowIndex, q < a && (k = Math.min(q, k));
						if (e < f.colsNum) for (q = a; q < c; q++) m = f.indexTable[q][e], n = m.colIndex + m.colSpan - 1, n > e && (g = Math.max(n, g));
						if (c < f.rowsNum) for (n = d; n < e; n++) m = f.indexTable[c][n], q = m.rowIndex + m.rowSpan - 1, q > c && (l = Math.max(q, l));
						if (0 < d) for (q = a; q < c; q++) m = f.indexTable[q][d], n = m.colIndex, n < d && (h = Math.min(m.colIndex, h));
						return k != a || h != d || l != c || g != e ? b(k, h, l, g) : {
							beginRowIndex: a,
							beginColIndex: d,
							endRowIndex: c,
							endColIndex: e
						}
					}
					try {
						var f = this,
							c = f.getCellInfo(a);
						if (a === e) return {
							beginRowIndex: c.rowIndex,
							beginColIndex: c.colIndex,
							endRowIndex: c.rowIndex + c.rowSpan - 1,
							endColIndex: c.colIndex + c.colSpan - 1
						};
						var d = f.getCellInfo(e);
						return b(Math.min(c.rowIndex, d.rowIndex), Math.min(c.colIndex, d.colIndex), Math.max(c.rowIndex + c.rowSpan - 1, d.rowIndex + d.rowSpan - 1), Math.max(c.colIndex + c.colSpan - 1, d.colIndex + d.colSpan - 1))
					} catch (l) {}
				},
				getCells: function(a) {
					this.clearSelected();
					for (var c = a.beginColIndex, b = a.endRowIndex, f = a.endColIndex, h, d, l = {}, k = [], g = a.beginRowIndex; g <= b; g++) for (var m = c; m <= f; m++) {
						a = this.indexTable[g][m];
						h = a.rowIndex;
						d = a.colIndex;
						var r = h + "|" + d;
						if (!l[r]) {
							l[r] = 1;
							if (h < g || d < m || h + a.rowSpan - 1 > b || d + a.colSpan - 1 > f) return null;
							k.push(this.getCell(h, a.cellIndex))
						}
					}
					return k
				},
				clearSelected: function() {
					c.removeSelectedClass(this.selectedTds);
					this.selectedTds = [];
					this.cellsRange = {}
				},
				setSelected: function(a) {
					var e = this.getCells(a);
					c.addSelectedClass(e);
					this.selectedTds = e;
					this.cellsRange = a
				},
				isFullRow: function() {
					var a = this.cellsRange;
					return a.endColIndex - a.beginColIndex + 1 == this.colsNum
				},
				isFullCol: function() {
					var a = this.cellsRange,
						c = this.table.getElementsByTagName("th"),
						a = a.endRowIndex - a.beginRowIndex + 1;
					return c.length ? a == this.rowsNum || a == this.rowsNum - 1 : a == this.rowsNum
				},
				getNextCell: function(a, c, b) {
					try {
						var f = this.getCellInfo(a),
							e, d, l = this.selectedTds.length && !b,
							k = this.cellsRange;
						if (!c && 0 == f.rowIndex || c && (l ? k.endRowIndex == this.rowsNum - 1 : f.rowIndex + f.rowSpan > this.rowsNum - 1)) return null;
						e = c ? l ? k.endRowIndex + 1 : f.rowIndex + f.rowSpan : l ? k.beginRowIndex - 1 : f.rowIndex - 1;
						d = l ? k.beginColIndex : f.colIndex;
						return this.getCell(this.indexTable[e][d].rowIndex, this.indexTable[e][d].cellIndex)
					} catch (n) {}
				},
				getPreviewCell: function(a, c) {
					try {
						var b = this.getCellInfo(a),
							f, e, d = this.selectedTds.length,
							l = this.cellsRange;
						if (!c && (d ? !l.beginColIndex : !b.colIndex) || c && (d ? l.endColIndex == this.colsNum - 1 : b.rowIndex > this.colsNum - 1)) return null;
						f = c ? d ? l.beginRowIndex : 1 > b.rowIndex ? 0 : b.rowIndex - 1 : d ? l.beginRowIndex : b.rowIndex;
						e = c ? d ? l.endColIndex + 1 : b.colIndex : d ? l.beginColIndex - 1 : 1 > b.colIndex ? 0 : b.colIndex - 1;
						return this.getCell(this.indexTable[f][e].rowIndex, this.indexTable[f][e].cellIndex)
					} catch (k) {}
				},
				moveContent: function(a, e) {
					if (!c.isEmptyBlock(e)) if (c.isEmptyBlock(a)) a.innerHTML = e.innerHTML;
					else {
						var b = a.lastChild;
						for (3 != b.nodeType && y.$block[b.tagName] || a.appendChild(a.ownerDocument.createElement("br")); b = e.firstChild;) a.appendChild(b)
					}
				},
				mergeRight: function(a) {
					var c = this.getCellInfo(a),
						b = this.indexTable[c.rowIndex][c.colIndex + c.colSpan],
						f = this.getCell(b.rowIndex, b.cellIndex);
					a.colSpan = c.colSpan + b.colSpan;
					a.removeAttribute("width");
					this.moveContent(a, f);
					this.deleteCell(f, b.rowIndex);
					this.update()
				},
				mergeDown: function(a) {
					var c = this.getCellInfo(a),
						b = this.indexTable[c.rowIndex + c.rowSpan][c.colIndex],
						f = this.getCell(b.rowIndex, b.cellIndex);
					a.rowSpan = c.rowSpan + b.rowSpan;
					a.removeAttribute("height");
					this.moveContent(a, f);
					this.deleteCell(f, b.rowIndex);
					this.update()
				},
				mergeRange: function() {
					var a = this.cellsRange,
						c = this.getCell(a.beginRowIndex, this.indexTable[a.beginRowIndex][a.beginColIndex].cellIndex);
					if ("TH" == c.tagName && a.endRowIndex !== a.beginRowIndex) var b = this.indexTable,
						a = this.getCellInfo(c),
						c = this.getCell(1, b[1][a.colIndex].cellIndex),
						a = this.getCellsRange(c, this.getCell(b[this.rowsNum - 1][a.colIndex].rowIndex, b[this.rowsNum - 1][a.colIndex].cellIndex));
					for (var f = this.getCells(a), b = 0, h; h = f[b++];) h !== c && (this.moveContent(c, h), this.deleteCell(h));
					c.rowSpan = a.endRowIndex - a.beginRowIndex + 1;
					1 < c.rowSpan && c.removeAttribute("height");
					c.colSpan = a.endColIndex - a.beginColIndex + 1;
					1 < c.colSpan && c.removeAttribute("width");
					c.rowSpan == this.rowsNum && 1 != c.colSpan && (c.colSpan = 1);
					if (c.colSpan == this.colsNum && 1 != c.rowSpan) {
						f = c.parentNode.rowIndex;
						if (this.table.deleteRow) for (b = f + 1, f += 1, a = c.rowSpan; b < a; b++) this.table.deleteRow(f);
						else for (b = 0, a = c.rowSpan - 1; b < a; b++) h = this.table.rows[f + 1], h.parentNode.removeChild(h);
						c.rowSpan = 1
					}
					this.update()
				},
				insertRow: function(a, c) {
					function b(a, b, d) {
						0 == a ? (a = (d.nextSibling || d.previousSibling).cells[a], "TH" == a.tagName && (a = b.ownerDocument.createElement("th"), a.appendChild(b.firstChild), d.insertBefore(a, b), g.remove(b))) : "TH" == b.tagName && (a = b.ownerDocument.createElement("td"), a.appendChild(b.firstChild), d.insertBefore(a, b), g.remove(b))
					}
					var f = this.colsNum,
						e = this.table.insertRow(a),
						d, l = "string" == typeof c && "TH" == c.toUpperCase();
					if (0 == a || a == this.rowsNum) for (var k = 0; k < f; k++) d = this.cloneCell(c, !0), this.setCellContent(d), d.getAttribute("vAlign") && d.setAttribute("vAlign", d.getAttribute("vAlign")), e.appendChild(d), l || b(k, d, e);
					else for (var n = this.indexTable[a], k = 0; k < f; k++) {
						var m = n[k];
						m.rowIndex < a ? (d = this.getCell(m.rowIndex, m.cellIndex), d.rowSpan = m.rowSpan + 1) : (d = this.cloneCell(c, !0), this.setCellContent(d), e.appendChild(d));
						l || b(k, d, e)
					}
					this.update();
					return e
				},
				deleteRow: function(a) {
					for (var c = this.table.rows[a], b = this.indexTable[a], f = this.colsNum, h = 0, d = 0; d < f;) {
						var l = b[d],
							k = this.getCell(l.rowIndex, l.cellIndex);
						if (1 < k.rowSpan && l.rowIndex == a) {
							l = k.cloneNode(!0);
							l.rowSpan = k.rowSpan - 1;
							l.innerHTML = "";
							k.rowSpan = 1;
							var n = a + 1,
								m = this.table.rows[n],
								n = this.getPreviewMergedCellsNum(n, d) - h;
							n < d ? (n = d - n - 1, g.insertAfter(m.cells[n], l)) : m.cells.length && m.insertBefore(l, m.cells[0]);
							h += 1
						}
						d += k.colSpan || 1
					}
					a = [];
					h = {};
					for (d = 0; d < f; d++) k = b[d].rowIndex, l = b[d].cellIndex, m = k + "_" + l, h[m] || (h[m] = 1, k = this.getCell(k, l), a.push(k));
					var r = [];
					q.each(a, function(a) {
						1 == a.rowSpan ? a.parentNode.removeChild(a) : r.push(a)
					});
					q.each(r, function(a) {
						a.rowSpan--
					});
					c.parentNode.removeChild(c);
					this.update()
				},
				insertCol: function(a, c, b) {
					function f(a, b, d) {
						0 == a ? (a = b.nextSibling || b.previousSibling, "TH" == a.tagName && (a = b.ownerDocument.createElement("th"), a.appendChild(b.firstChild), d.insertBefore(a, b), g.remove(b))) : "TH" == b.tagName && (a = b.ownerDocument.createElement("td"), a.appendChild(b.firstChild), d.insertBefore(a, b), g.remove(b))
					}
					var e = this.rowsNum,
						d = 0,
						l, k, n = parseInt((this.table.offsetWidth - 20 * (this.colsNum + 1) - (this.colsNum + 1)) / (this.colsNum + 1), 10),
						m = "string" == typeof c && "TH" == c.toUpperCase(),
						r;
					if (0 == a || a == this.colsNum) for (; d < e; d++) l = this.table.rows[d], r = l.cells[0 == a ? a : l.cells.length], k = this.cloneCell(c, !0), this.setCellContent(k), k.setAttribute("vAlign", k.getAttribute("vAlign")), r && k.setAttribute("width", r.getAttribute("width")), a ? g.insertAfter(l.cells[l.cells.length - 1], k) : l.insertBefore(k, l.cells[0]), m || f(d, k, l);
					else for (; d < e; d++) r = this.indexTable[d][a], r.colIndex < a ? (k = this.getCell(r.rowIndex, r.cellIndex), k.colSpan = r.colSpan + 1) : (l = this.table.rows[d], r = l.cells[r.cellIndex], k = this.cloneCell(c, !0), this.setCellContent(k), k.setAttribute("vAlign", k.getAttribute("vAlign")), r && k.setAttribute("width", r.getAttribute("width")), r ? l.insertBefore(k, r) : l.appendChild(k)), m || f(d, k, l);
					this.update();
					this.updateWidth(n, b || {
						tdPadding: 10,
						tdBorder: 1
					})
				},
				updateWidth: function(a, e) {
					var b = this.table,
						f = c.getWidth(b) - 2 * e.tdPadding - e.tdBorder + a;
					f < b.ownerDocument.body.offsetWidth ? b.setAttribute("width", f) : (b = g.getElementsByTagName(this.table, "td th"), q.each(b, function(b) {
						b.setAttribute("width", a)
					}))
				},
				deleteCol: function(a) {
					for (var c = this.indexTable, b = this.table.rows, f = this.table.getAttribute("width"), h = 0, d = this.rowsNum, l = {}, k = 0; k < d;) {
						var g = c[k][a],
							m = g.rowIndex + "_" + g.colIndex;
						l[m] || (l[m] = 1, m = this.getCell(g.rowIndex, g.cellIndex), h || (h = m && parseInt(m.offsetWidth / m.colSpan, 10).toFixed(0)), 1 < m.colSpan ? m.colSpan-- : b[k].deleteCell(g.cellIndex), k += g.rowSpan || 1)
					}
					this.table.setAttribute("width", f - h);
					this.update()
				},
				splitToCells: function(a) {
					var c = this;
					a = this.splitToRows(a);
					q.each(a, function(a) {
						c.splitToCols(a)
					})
				},
				splitToRows: function(a) {
					var c = this.getCellInfo(a),
						b = c.rowIndex,
						f = c.colIndex,
						h = [];
					a.rowSpan = 1;
					h.push(a);
					for (var d = b, l = b + c.rowSpan; d < l; d++) if (d != b) {
						var k = this.table.rows[d].insertCell(f - this.getPreviewMergedCellsNum(d, f));
						k.colSpan = c.colSpan;
						this.setCellContent(k);
						k.setAttribute("vAlign", a.getAttribute("vAlign"));
						k.setAttribute("align", a.getAttribute("align"));
						a.style.cssText && (k.style.cssText = a.style.cssText);
						h.push(k)
					}
					this.update();
					return h
				},
				getPreviewMergedCellsNum: function(a, c) {
					for (var b = this.indexTable[a], f = 0, e = 0; e < c;) var d = b[e].colSpan,
						f = f + (d - (b[e].rowIndex == a ? 1 : 0)),
						e = e + d;
					return f
				},
				splitToCols: function(a) {
					var c = (a.offsetWidth / a.colSpan - 22).toFixed(0),
						b = this.getCellInfo(a),
						f = b.rowIndex,
						h = b.colIndex,
						d = [];
					a.colSpan = 1;
					a.setAttribute("width", c);
					d.push(a);
					for (var l = h, k = h + b.colSpan; l < k; l++) if (l != h) {
						var n = this.table.rows[f],
							m = n.insertCell(this.indexTable[f][l].cellIndex + 1);
						m.rowSpan = b.rowSpan;
						this.setCellContent(m);
						m.setAttribute("vAlign", a.getAttribute("vAlign"));
						m.setAttribute("align", a.getAttribute("align"));
						m.setAttribute("width", c);
						a.style.cssText && (m.style.cssText = a.style.cssText);
						if ("TH" == a.tagName) {
							var r = a.ownerDocument.createElement("th");
							r.appendChild(m.firstChild);
							r.setAttribute("vAlign", a.getAttribute("vAlign"));
							r.rowSpan = m.rowSpan;
							n.insertBefore(r, m);
							g.remove(m)
						}
						d.push(m)
					}
					this.update();
					return d
				},
				isLastCell: function(a, c, b) {
					c = c || this.rowsNum;
					b = b || this.colsNum;
					a = this.getCellInfo(a);
					return a.rowIndex + a.rowSpan == c && a.colIndex + a.colSpan == b
				},
				getLastCell: function(a) {
					a = a || this.table.getElementsByTagName("td");
					this.getCellInfo(a[0]);
					var c = this,
						b = a[0],
						f = b.parentNode,
						h = 0,
						d = 0,
						l;
					q.each(a, function(a) {
						a.parentNode == f && (d += a.colSpan || 1);
						h += a.rowSpan * a.colSpan || 1
					});
					l = h / d;
					q.each(a, function(a) {
						if (c.isLastCell(a, l, d)) return b = a, !1
					});
					return b
				},
				selectRow: function(a) {
					var c = this.indexTable[a];
					a = this.getCell(c[0].rowIndex, c[0].cellIndex);
					c = this.getCell(c[this.colsNum - 1].rowIndex, c[this.colsNum - 1].cellIndex);
					a = this.getCellsRange(a, c);
					this.setSelected(a)
				},
				selectTable: function() {
					var a = this.table.getElementsByTagName("td"),
						a = this.getCellsRange(a[0], a[a.length - 1]);
					this.setSelected(a)
				},
				setBackground: function(a, c) {
					if ("string" === typeof c) q.each(a, function(a) {
						a.style.backgroundColor = c
					});
					else if ("object" === typeof c) {
						c = q.extend({
							repeat: !0,
							colorList: ["#ddd", "#fff"]
						}, c);
						for (var b = this.getCellInfo(a[0]).rowIndex, f = 0, e = c.colorList, d = function(a, b, d) {
								return a[b] ? a[b] : d ? a[b % a.length] : ""
							}, l = 0, k; k = a[l++];) {
							var g = this.getCellInfo(k);
							k.style.backgroundColor = d(e, b + f == g.rowIndex ? f : ++f, c.repeat)
						}
					}
				},
				removeBackground: function(a) {
					q.each(a, function(a) {
						a.style.backgroundColor = ""
					})
				}
			}
		})();
		(function() {
			function c(d, f) {
				var c = g.getElementsByTagName(d, "td th");
				q.each(c, function(a) {
					a.removeAttribute("width")
				});
				d.setAttribute("width", a(f, !0, b.getDefaultValue(f, d)));
				var e = [];
				setTimeout(function() {
					q.each(c, function(a) {
						1 == a.colSpan && e.push(a.offsetWidth)
					});
					q.each(c, function(a, b) {
						1 == a.colSpan && a.setAttribute("width", e[b] + "")
					})
				}, 0)
			}
			function a(a, b, f) {
				var d = a.body;
				return d.offsetWidth - (b ? 2 * parseInt(g.getComputedStyle(d, "margin-left"), 10) : 0) - 2 * f.tableBorder - (a.options.offsetWidth || 0)
			}
			function e(a) {
				if (a = f(a).cell) {
					var b = h(a);
					return b.selectedTds.length ? b.selectedTds : [a]
				}
				return []
			}
			var b = UE.UETable,
				f = function(a) {
					return b.getTableItemsByRange(a)
				},
				h = function(a) {
					return b.getUETable(a)
				};
			UE.commands.inserttable = {
				queryCommandState: function() {
					return f(this).table ? -1 : 0
				},
				execCommand: function(a, f) {
					f || (f = q.extend({}, {
						numCols: this.options.defaultCols,
						numRows: this.options.defaultRows,
						tdvalign: this.options.tdvalign
					}));
					var d = this.selection.getRange().startContainer,
						d = g.findParent(d, function(a) {
							return g.isBlockElm(a)
						}, !0) || this.body,
						c = b.getDefaultValue(this, void 0),
						d = Math.floor(d.offsetWidth / f.numCols - 2 * c.tdPadding - c.tdBorder);
					!f.tdvalign && (f.tdvalign = this.options.tdvalign);
					this.execCommand("inserthtml", function(a, b) {
						for (var d = [], f = a.numRows, c = a.numCols, k = 0; k < f; k++) {
							d.push("<tr" + (0 == k ? ' class="firstRow"' : "") + ">");
							for (var e = 0; e < c; e++) d.push('<td width="' + b + '"  vAlign="' + a.tdvalign + '" >' + (t.ie && 11 > t.version ? g.fillChar : "<br/>") + "</td>");
							d.push("</tr>")
						}
						return "<table><tbody>" + d.join("") + "</tbody></table>"
					}(f, d))
				}
			};
			UE.commands.insertparagraphbeforetable = {
				queryCommandState: function() {
					return f(this).cell ? 0 : -1
				},
				execCommand: function() {
					var a = f(this).table;
					if (a) {
						var b = this.document.createElement("p");
						b.innerHTML = t.ie ? "&nbsp;" : "<br />";
						a.parentNode.insertBefore(b, a);
						this.selection.getRange().setStart(b, 0).setCursor()
					}
				}
			};
			UE.commands.deletetable = {
				queryCommandState: function() {
					var a = this.selection.getRange();
					return g.findParentByTagName(a.startContainer, "table", !0) ? 0 : -1
				},
				execCommand: function(a, b) {
					var d = this.selection.getRange();
					if (b = b || g.findParentByTagName(d.startContainer, "table", !0)) {
						var f = b.nextSibling;
						f || (f = g.createElement(this.document, "p", {
							innerHTML: t.ie ? g.fillChar : "<br/>"
						}), b.parentNode.insertBefore(f, b));
						g.remove(b);
						d = this.selection.getRange();
						3 == f.nodeType ? d.setStartBefore(f) : d.setStart(f, 0);
						d.setCursor(!1, !0);
						this.fireEvent("tablehasdeleted")
					}
				}
			};
			UE.commands.cellalign = {
				queryCommandState: function() {
					return e(this).length ? 0 : -1
				},
				execCommand: function(a, b) {
					var d = e(this);
					if (d.length) for (var f = 0, c; c = d[f++];) c.setAttribute("align", b)
				}
			};
			UE.commands.cellvalign = {
				queryCommandState: function() {
					return e(this).length ? 0 : -1
				},
				execCommand: function(a, b) {
					var d = e(this);
					if (d.length) for (var f = 0, c; c = d[f++];) c.setAttribute("vAlign", b)
				}
			};
			UE.commands.insertcaption = {
				queryCommandState: function() {
					var a = f(this).table;
					return a ? 0 == a.getElementsByTagName("caption").length ? 1 : -1 : -1
				},
				execCommand: function() {
					var a = f(this).table;
					if (a) {
						var b = this.document.createElement("caption");
						b.innerHTML = t.ie ? g.fillChar : "<br/>";
						a.insertBefore(b, a.firstChild);
						this.selection.getRange().setStart(b, 0).setCursor()
					}
				}
			};
			UE.commands.deletecaption = {
				queryCommandState: function() {
					var a = this.selection.getRange();
					return (a = g.findParentByTagName(a.startContainer, "table")) ? 0 == a.getElementsByTagName("caption").length ? -1 : 1 : -1
				},
				execCommand: function() {
					var a = this.selection.getRange();
					if (a = g.findParentByTagName(a.startContainer, "table")) g.remove(a.getElementsByTagName("caption")[0]), this.selection.getRange().setStart(a.rows[0].cells[0], 0).setCursor()
				}
			};
			UE.commands.inserttitle = {
				queryCommandState: function() {
					var a = f(this).table;
					return a ? (a = a.rows[0], "th" != a.cells[a.cells.length - 1].tagName.toLowerCase() ? 0 : -1) : -1
				},
				execCommand: function() {
					var a = f(this).table;
					a && h(a).insertRow(0, "th");
					a = a.getElementsByTagName("th")[0];
					this.selection.getRange().setStart(a, 0).setCursor(!1, !0)
				}
			};
			UE.commands.deletetitle = {
				queryCommandState: function() {
					var a = f(this).table;
					return a ? (a = a.rows[0], "th" == a.cells[a.cells.length - 1].tagName.toLowerCase() ? 0 : -1) : -1
				},
				execCommand: function() {
					var a = f(this).table;
					a && g.remove(a.rows[0]);
					a = a.getElementsByTagName("td")[0];
					this.selection.getRange().setStart(a, 0).setCursor(!1, !0)
				}
			};
			UE.commands.inserttitlecol = {
				queryCommandState: function() {
					var a = f(this).table;
					return a ? a.rows[a.rows.length - 1].getElementsByTagName("th").length ? -1 : 0 : -1
				},
				execCommand: function(a) {
					(a = f(this).table) && h(a).insertCol(0, "th");
					c(a, this);
					a = a.getElementsByTagName("th")[0];
					this.selection.getRange().setStart(a, 0).setCursor(!1, !0)
				}
			};
			UE.commands.deletetitlecol = {
				queryCommandState: function() {
					var a = f(this).table;
					return a ? a.rows[a.rows.length - 1].getElementsByTagName("th").length ? 0 : -1 : -1
				},
				execCommand: function() {
					var a = f(this).table;
					if (a) for (var b = 0; b < a.rows.length; b++) g.remove(a.rows[b].children[0]);
					c(a, this);
					a = a.getElementsByTagName("td")[0];
					this.selection.getRange().setStart(a, 0).setCursor(!1, !0)
				}
			};
			UE.commands.mergeright = {
				queryCommandState: function(a) {
					var b = f(this);
					a = b.table;
					b = b.cell;
					if (!a || !b) return -1;
					var d = h(a);
					if (d.selectedTds.length) return -1;
					var c = d.getCellInfo(b),
						e = c.colIndex + c.colSpan;
					if (e >= d.colsNum) return -1;
					d = d.indexTable[c.rowIndex][e];
					return (a = a.rows[d.rowIndex].cells[d.cellIndex]) && b.tagName == a.tagName ? d.rowIndex == c.rowIndex && d.rowSpan == c.rowSpan ? 0 : -1 : -1
				},
				execCommand: function(a) {
					a = this.selection.getRange();
					var b = a.createBookmark(!0),
						d = f(this).cell;
					h(d).mergeRight(d);
					a.moveToBookmark(b).select()
				}
			};
			UE.commands.mergedown = {
				queryCommandState: function(a) {
					var b = f(this);
					a = b.table;
					b = b.cell;
					if (!a || !b) return -1;
					var d = h(a);
					if (d.selectedTds.length) return -1;
					var c = d.getCellInfo(b),
						e = c.rowIndex + c.rowSpan;
					if (e >= d.rowsNum) return -1;
					d = d.indexTable[e][c.colIndex];
					return (a = a.rows[d.rowIndex].cells[d.cellIndex]) && b.tagName == a.tagName ? d.colIndex == c.colIndex && d.colSpan == c.colSpan ? 0 : -1 : -1
				},
				execCommand: function() {
					var a = this.selection.getRange(),
						b = a.createBookmark(!0),
						c = f(this).cell;
					h(c).mergeDown(c);
					a.moveToBookmark(b).select()
				}
			};
			UE.commands.mergecells = {
				queryCommandState: function() {
					return b.getUETableBySelected(this) ? 0 : -1
				},
				execCommand: function() {
					var a = b.getUETableBySelected(this);
					if (a && a.selectedTds.length) {
						var f = a.selectedTds[0];
						a.mergeRange();
						a = this.selection.getRange();
						g.isEmptyBlock(f) ? a.setStart(f, 0).collapse(!0) : a.selectNodeContents(f);
						a.select()
					}
				}
			};
			UE.commands.insertrow = {
				queryCommandState: function() {
					var a = f(this),
						b = a.cell;
					return b && ("TD" == b.tagName || "TH" == b.tagName && a.tr !== a.table.rows[0]) && h(a.table).rowsNum < this.options.maxRowNum ? 0 : -1
				},
				execCommand: function() {
					var a = this.selection.getRange(),
						b = a.createBookmark(!0),
						c = f(this),
						e = c.cell,
						c = c.table,
						g = h(c),
						r = g.getCellInfo(e);
					if (g.selectedTds.length) for (var r = g.cellsRange, u = 0, v = r.endRowIndex - r.beginRowIndex + 1; u < v; u++) g.insertRow(r.beginRowIndex, e);
					else g.insertRow(r.rowIndex, e);
					a.moveToBookmark(b).select();
					"enabled" === c.getAttribute("interlaced") && this.fireEvent("interlacetable", c)
				}
			};
			UE.commands.insertrownext = {
				queryCommandState: function() {
					var a = f(this),
						b = a.cell;
					return b && "TD" == b.tagName && h(a.table).rowsNum < this.options.maxRowNum ? 0 : -1
				},
				execCommand: function() {
					var a = this.selection.getRange(),
						b = a.createBookmark(!0),
						c = f(this),
						e = c.cell,
						c = c.table,
						g = h(c),
						r = g.getCellInfo(e);
					if (g.selectedTds.length) for (var r = g.cellsRange, u = 0, v = r.endRowIndex - r.beginRowIndex + 1; u < v; u++) g.insertRow(r.endRowIndex + 1, e);
					else g.insertRow(r.rowIndex + r.rowSpan, e);
					a.moveToBookmark(b).select();
					"enabled" === c.getAttribute("interlaced") && this.fireEvent("interlacetable", c)
				}
			};
			UE.commands.deleterow = {
				queryCommandState: function() {
					return f(this).cell ? 0 : -1
				},
				execCommand: function() {
					var a = f(this).cell,
						b = h(a),
						c = b.cellsRange,
						e = b.getCellInfo(a),
						m = b.getVSideCell(a),
						r = b.getVSideCell(a, !0),
						a = this.selection.getRange();
					if (q.isEmptyObject(c)) b.deleteRow(e.rowIndex);
					else for (var u = c.beginRowIndex; u < c.endRowIndex + 1; u++) b.deleteRow(c.beginRowIndex);
					u = b.table;
					u.getElementsByTagName("td").length ? 1 == e.rowSpan || e.rowSpan == c.endRowIndex - c.beginRowIndex + 1 ? (r || m) && a.selectNodeContents(r || m).setCursor(!1, !0) : (b = b.getCell(e.rowIndex, b.indexTable[e.rowIndex][e.colIndex].cellIndex)) && a.selectNodeContents(b).setCursor(!1, !0) : (b = u.nextSibling, g.remove(u), b && a.setStart(b, 0).setCursor(!1, !0));
					"enabled" === u.getAttribute("interlaced") && this.fireEvent("interlacetable", u)
				}
			};
			UE.commands.insertcol = {
				queryCommandState: function(a) {
					a = f(this);
					var b = a.cell;
					return b && ("TD" == b.tagName || "TH" == b.tagName && b !== a.tr.cells[0]) && h(a.table).colsNum < this.options.maxColNum ? 0 : -1
				},
				execCommand: function(a) {
					var b = this.selection.getRange(),
						d = b.createBookmark(!0);
					if (-1 != this.queryCommandState(a)) {
						a = f(this).cell;
						var c = h(a),
							e = c.getCellInfo(a);
						if (c.selectedTds.length) for (var e = c.cellsRange, g = 0, u = e.endColIndex - e.beginColIndex + 1; g < u; g++) c.insertCol(e.beginColIndex, a);
						else c.insertCol(e.colIndex, a);
						b.moveToBookmark(d).select(!0)
					}
				}
			};
			UE.commands.insertcolnext = {
				queryCommandState: function() {
					var a = f(this);
					return a.cell && h(a.table).colsNum < this.options.maxColNum ? 0 : -1
				},
				execCommand: function() {
					var a = this.selection.getRange(),
						b = a.createBookmark(!0),
						c = f(this).cell,
						e = h(c),
						g = e.getCellInfo(c);
					if (e.selectedTds.length) for (var g = e.cellsRange, r = 0, u = g.endColIndex - g.beginColIndex + 1; r < u; r++) e.insertCol(g.endColIndex + 1, c);
					else e.insertCol(g.colIndex + g.colSpan, c);
					a.moveToBookmark(b).select()
				}
			};
			UE.commands.deletecol = {
				queryCommandState: function() {
					return f(this).cell ? 0 : -1
				},
				execCommand: function() {
					var a = f(this).cell,
						b = h(a),
						c = b.cellsRange,
						e = b.getCellInfo(a),
						m = b.getHSideCell(a),
						r = b.getHSideCell(a, !0);
					if (q.isEmptyObject(c)) b.deleteCol(e.colIndex);
					else for (e = c.beginColIndex; e < c.endColIndex + 1; e++) b.deleteCol(c.beginColIndex);
					b = b.table;
					c = this.selection.getRange();
					b.getElementsByTagName("td").length ? g.inDoc(a, this.document) ? c.setStart(a, 0).setCursor(!1, !0) : r && g.inDoc(r, this.document) ? c.selectNodeContents(r).setCursor(!1, !0) : m && g.inDoc(m, this.document) && c.selectNodeContents(m).setCursor(!0, !0) : (a = b.nextSibling, g.remove(b), a && c.setStart(a, 0).setCursor(!1, !0))
				}
			};
			UE.commands.splittocells = {
				queryCommandState: function() {
					var a = f(this),
						b = a.cell;
					return !b || 0 < h(a.table).selectedTds.length ? -1 : b && (1 < b.colSpan || 1 < b.rowSpan) ? 0 : -1
				},
				execCommand: function() {
					var a = this.selection.getRange(),
						b = a.createBookmark(!0),
						c = f(this).cell;
					h(c).splitToCells(c);
					a.moveToBookmark(b).select()
				}
			};
			UE.commands.splittorows = {
				queryCommandState: function() {
					var a = f(this),
						b = a.cell;
					return !b || 0 < h(a.table).selectedTds.length ? -1 : b && 1 < b.rowSpan ? 0 : -1
				},
				execCommand: function() {
					var a = this.selection.getRange(),
						b = a.createBookmark(!0),
						c = f(this).cell;
					h(c).splitToRows(c);
					a.moveToBookmark(b).select()
				}
			};
			UE.commands.splittocols = {
				queryCommandState: function() {
					var a = f(this),
						b = a.cell;
					return !b || 0 < h(a.table).selectedTds.length ? -1 : b && 1 < b.colSpan ? 0 : -1
				},
				execCommand: function() {
					var a = this.selection.getRange(),
						b = a.createBookmark(!0),
						c = f(this).cell;
					h(c).splitToCols(c);
					a.moveToBookmark(b).select()
				}
			};
			UE.commands.adaptbytext = UE.commands.adaptbywindow = {
				queryCommandState: function() {
					return f(this).table ? 0 : -1
				},
				execCommand: function(a) {
					var b = f(this).table;
					b && ("adaptbywindow" == a ? c(b, this) : (a = g.getElementsByTagName(b, "td th"), q.each(a, function(a) {
						a.removeAttribute("width")
					}), b.removeAttribute("width")))
				}
			};
			UE.commands.averagedistributecol = {
				queryCommandState: function() {
					var a = b.getUETableBySelected(this);
					return a ? a.isFullRow() || a.isFullCol() ? 0 : -1 : -1
				},
				execCommand: function(a) {
					function d() {
						var a = e.table,
							d = 0,
							c = 0,
							k = b.getDefaultValue(f, a);
						if (e.isFullRow()) d = a.offsetWidth, c = e.colsNum;
						else for (var a = e.cellsRange.endColIndex, h, g = e.cellsRange.beginColIndex; g <= a;) h = e.selectedTds[g], d += h.offsetWidth, g += h.colSpan, c += 1;
						return Math.ceil(d / c) - 2 * k.tdBorder - 2 * k.tdPadding
					}
					function c(a) {
						q.each(g.getElementsByTagName(e.table, "th"), function(a) {
							a.setAttribute("width", "")
						});
						var b = e.isFullRow() ? g.getElementsByTagName(e.table, "td") : e.selectedTds;
						q.each(b, function(b) {
							1 == b.colSpan && b.setAttribute("width", a)
						})
					}
					var f = this,
						e = b.getUETableBySelected(f);
					e && e.selectedTds.length && c(d())
				}
			};
			UE.commands.averagedistributerow = {
				queryCommandState: function() {
					var a = b.getUETableBySelected(this);
					return !a || a.selectedTds && /th/ig.test(a.selectedTds[0].tagName) ? -1 : a.isFullRow() || a.isFullCol() ? 0 : -1
				},
				execCommand: function(a) {
					function d() {
						var a, d = 0;
						a = e.table;
						var c = b.getDefaultValue(f, a),
							k = parseInt(g.getComputedStyle(a.getElementsByTagName("td")[0], "padding-top"));
						if (e.isFullCol()) {
							var d = g.getElementsByTagName(a, "caption"),
								h = g.getElementsByTagName(a, "th"),
								l, m;
							0 < d.length && (l = d[0].offsetHeight);
							0 < h.length && (m = h[0].offsetHeight);
							d = a.offsetHeight - (l || 0) - (m || 0);
							a = 0 == h.length ? e.rowsNum : e.rowsNum - 1
						} else {
							m = e.cellsRange.beginRowIndex;
							h = e.cellsRange.endRowIndex;
							l = 0;
							for (a = g.getElementsByTagName(a, "tr"); m <= h; m++) d += a[m].offsetHeight, l += 1;
							a = l
						}
						return t.ie && 9 > t.version ? Math.ceil(d / a) : Math.ceil(d / a) - 2 * c.tdBorder - 2 * k
					}
					function c(a) {
						var b = e.isFullCol() ? g.getElementsByTagName(e.table, "td") : e.selectedTds;
						q.each(b, function(b) {
							1 == b.rowSpan && b.setAttribute("height", a)
						})
					}
					var f = this,
						e = b.getUETableBySelected(f);
					e && e.selectedTds.length && c(d())
				}
			};
			UE.commands.cellalignment = {
				queryCommandState: function() {
					return f(this).table ? 0 : -1
				},
				execCommand: function(a, c) {
					var d = b.getUETableBySelected(this);
					d ? q.each(d.selectedTds, function(a) {
						g.setAttributes(a, c)
					}) : (d = (d = this.selection.getStart()) && g.findParentByTagName(d, ["td", "th", "caption"], !0), /caption/ig.test(d.tagName) ? (d.style.textAlign = c.align, d.style.verticalAlign = c.vAlign) : g.setAttributes(d, c), this.selection.getRange().setCursor(!0))
				},
				queryCommandValue: function(a) {
					(a = f(this).cell) || (a = e(this)[0]);
					if (a) {
						var b = UE.UETable.getUETable(a).selectedTds;
						!b.length && (b = a);
						return UE.UETable.getTableCellAlignState(b)
					}
					return null
				}
			};
			UE.commands.tablealignment = {
				queryCommandState: function() {
					return t.ie && 8 > t.version ? -1 : f(this).table ? 0 : -1
				},
				execCommand: function(a, b) {
					var d = this.selection.getStart();
					(d = d && g.findParentByTagName(d, ["table"], !0)) && d.setAttribute("align", b)
				}
			};
			UE.commands.edittable = {
				queryCommandState: function() {
					return f(this).table ? 0 : -1
				},
				execCommand: function(a, b) {
					var d = this.selection.getRange();
					if (d = g.findParentByTagName(d.startContainer, "table")) d = g.getElementsByTagName(d, "td").concat(g.getElementsByTagName(d, "th"), g.getElementsByTagName(d, "caption")), q.each(d, function(a) {
						a.style.borderColor = b
					})
				}
			};
			UE.commands.edittd = {
				queryCommandState: function() {
					return f(this).table ? 0 : -1
				},
				execCommand: function(a, c) {
					var d = b.getUETableBySelected(this);
					if (d) q.each(d.selectedTds, function(a) {
						a.style.backgroundColor = c
					});
					else if (d = (d = this.selection.getStart()) && g.findParentByTagName(d, ["td", "th", "caption"], !0)) d.style.backgroundColor = c
				}
			};
			UE.commands.settablebackground = {
				queryCommandState: function() {
					return 1 < e(this).length ? 0 : -1
				},
				execCommand: function(a, b) {
					var d;
					d = e(this);
					h(d[0]).setBackground(d, b)
				}
			};
			UE.commands.cleartablebackground = {
				queryCommandState: function() {
					var a = e(this);
					if (!a.length) return -1;
					for (var b = 0, c; c = a[b++];) if ("" !== c.style.backgroundColor) return 0;
					return -1
				},
				execCommand: function() {
					var a = e(this);
					h(a[0]).removeBackground(a)
				}
			};
			UE.commands.interlacetable = UE.commands.uninterlacetable = {
				queryCommandState: function(a) {
					var b = f(this).table;
					if (!b) return -1;
					b = b.getAttribute("interlaced");
					return "interlacetable" == a ? "enabled" === b ? -1 : 0 : b && "disabled" !== b ? 0 : -1
				},
				execCommand: function(a, b) {
					var d = f(this).table;
					"interlacetable" == a ? (d.setAttribute("interlaced", "enabled"), this.fireEvent("interlacetable", d, b)) : (d.setAttribute("interlaced", "disabled"), this.fireEvent("uninterlacetable", d))
				}
			};
			UE.commands.setbordervisible = {
				queryCommandState: function(a) {
					return f(this).table ? 0 : -1
				},
				execCommand: function() {
					var a = f(this).table;
					q.each(g.getElementsByTagName(a, "td"), function(a) {
						a.style.borderWidth = "1px";
						a.style.borderStyle = "solid"
					})
				}
			}
		})();
		UE.plugins.table = function() {
			function c(b, d) {
				a(b, "width", !0);
				a(b, "height", !0)
			}
			function a(a, b, d) {
				a.style[b] && (d && a.setAttribute(b, parseInt(a.style[b], 10)), a.style[b] = "")
			}
			function e(a) {
				if ("TD" == a.tagName || "TH" == a.tagName) return a;
				var b;
				return (b = g.findParentByTagName(a, "td", !0) || g.findParentByTagName(a, "th", !0)) ? b : null
			}
			function b(a) {
				var b = new RegExp(g.fillChar, "g");
				if (0 < a[t.ie ? "innerText" : "textContent"].replace(/^\s*$/, "").replace(b, "").length) return 0;
				for (var d in y.$isNotEmpty) if (a.getElementsByTagName(d).length) return 0;
				return 1
			}
			function f(a) {
				return a.pageX || a.pageY ? {
					x: a.pageX,
					y: a.pageY
				} : {
					x: a.clientX + z.document.body.scrollLeft - z.document.body.clientLeft,
					y: a.clientY + z.document.body.scrollTop - z.document.body.clientTop
				}
			}
			function h(a) {
				if (!ca()) try {
					var b = e(a.target || a.srcElement),
						c;
					S && (z.body.style.webkitUserSelect = "none", 10 < Math.abs(V.x - a.clientX) || 10 < Math.abs(V.y - a.clientY)) && (p(), S = !1, U = 0, R(a));
					if (X && T) if (U = 0, z.body.style.webkitUserSelect = "none", z.selection.getNative()[t.ie9below ? "empty" : "removeAllRanges"](), c = f(a), n(z, !0, X, c, b), "h" == X) {
						var h = W.style,
							l;
						var b = T,
							r = P(b);
						if (r) {
							var u = r.getSameEndPosCells(b, "x")[0],
								v = r.getSameStartPosXCells(b)[0],
								w = f(a).x,
								x = (u ? g.getXY(u).x : g.getXY(r.table).x) + 20,
								q = v ? g.getXY(v).x + v.offsetWidth - 20 : z.body.offsetWidth + 5 || parseInt(g.getComputedStyle(z.body, "width"), 10),
								x = x + 5,
								q = q - 5;
							l = w < x ? x : w > q ? q : w
						} else l = void 0;
						h.left = l + "px"
					} else {
						if ("v" == X) {
							var E = W.style,
								J;
							a: {
								try {
									var ha = g.getXY(T).y,
										y = f(a).y;
									J = y < ha ? ha : y;
									break a
								} catch (na) {}
								J = void 0
							}
							E.top = J + "px"
						}
					} else if (b) {
						if (!0 !== z.fireEvent("excludetable", b)) {
							c = f(a);
							var C = m(b, c),
								O = g.findParentByTagName(b, "table", !0);
							k(O, b, a, !0) ? !0 !== z.fireEvent("excludetable", O) && (z.body.style.cursor = "url(" + z.options.cursorpath + "h.png),pointer") : k(O, b, a) ? !0 !== z.fireEvent("excludetable", O) && (z.body.style.cursor = "url(" + z.options.cursorpath + "v.png),pointer") : (z.body.style.cursor = "text", /\d/.test(C) && (C = C.replace(/\d/, ""), b = P(b).getPreviewCell(b, "v" == C)), n(z, b ? !! C : !1, b ? C : "", c, b))
						}
					} else d(!1, O, z)
				} catch (na) {}
			}
			function d(a, b, d) {
				a ? l(b, d) : da || setTimeout(function() {
					!da && K && K.parentNode && K.parentNode.removeChild(K)
				}, 2E3)
			}
			function l(a, b) {
				function d(d, c) {
					clearTimeout(e);
					e = setTimeout(function() {
						b.fireEvent("tableClicked", a, c)
					}, 300)
				}
				var c = g.getXY(a),
					f = a.ownerDocument;
				if (K && K.parentNode) return K;
				K = f.createElement("div");
				K.contentEditable = !1;
				K.innerHTML = "";
				K.style.cssText = "width:15px;height:15px;background-image:url(" + b.options.UEDITOR_HOME_URL + "dialogs/table/dragicon.png);position: absolute;cursor:move;top:" + (c.y - 15) + "px;left:" + c.x + "px;";
				g.unSelectable(K);
				K.onmouseover = function(a) {
					da = !0
				};
				K.onmouseout = function(a) {
					da = !1
				};
				g.on(K, "click", function(a, b) {
					d(b, this)
				});
				g.on(K, "dblclick", function(d, c) {
					clearTimeout(e);
					var f = P(a),
						k = a.rows[0].cells[0],
						h = f.getLastCell(),
						h = f.getCellsRange(k, h);
					b.selection.getRange().setStart(k, 0).setCursor(!1, !0);
					f.setSelected(h)
				});
				g.on(K, "dragstart", function(a, b) {
					g.preventDefault(b)
				});
				var e;
				f.body.appendChild(K)
			}
			function k(a, b, d, c) {
				d = f(d);
				b = m(b, d);
				return c ? (c = (c = a.getElementsByTagName("caption")[0]) ? c.offsetHeight : 0, "v1" == b && 8 > d.y - g.getXY(a).y - c) : "h1" == b && 8 > d.x - g.getXY(a).x
			}
			function n(a, b, d, c, f) {
				try {
					a.body.style.cursor = "h" == d ? "col-resize" : "v" == d ? "row-resize" : "text", t.ie && (!d || aa || G.getUETableBySelected(a) ? B(a) : (C(a, a.document), D(d, f))), Z = b
				} catch (pa) {}
			}
			function m(a, b) {
				var d = g.getXY(a);
				return d ? 5 > d.x + a.offsetWidth - b.x ? "h" : 5 > b.x - d.x ? "h1" : 5 > d.y + a.offsetHeight - b.y ? "v" : 5 > b.y - d.y ? "v1" : "" : ""
			}
			function r(a, b) {
				if (!ca()) if (V = {
					x: b.clientX,
					y: b.clientY
				}, 2 == b.button) {
					var d = G.getUETableBySelected(z),
						c = !1;
					if (d) {
						var f = ia(z, b);
						q.each(d.selectedTds, function(a) {
							a === f && (c = !0)
						});
						c ? (f = d.selectedTds[0], setTimeout(function() {
							z.selection.getRange().setStart(f, 0).setCursor(!1, !0)
						}, 0)) : (G.removeSelectedClass(g.getElementsByTagName(z.body, "th td")), d.clearSelected())
					}
				} else v(b)
			}
			function u(a) {
				U = 0;
				a = a || z.window.event;
				var b = e(a.target || a.srcElement);
				if (b) {
					var d;
					if (d = m(b, f(a))) if (B(z), "h1" == d && (d = "h", k(g.findParentByTagName(b, "table"), b, a) ? z.execCommand("adaptbywindow") : (b = P(b).getPreviewCell(b)) && z.selection.getRange().selectNodeContents(b).setCursor(!0, !0)), "h" == d) {
						a = P(b);
						var c = I(b, a.table, !0),
							c = x(c, "left");
						a.width = a.offsetWidth;
						var h = [],
							l = [];
						q.each(c, function(a) {
							h.push(a.offsetWidth)
						});
						q.each(c, function(a) {
							a.removeAttribute("width")
						});
						window.setTimeout(function() {
							var a = !0;
							q.each(c, function(b, d) {
								var c = b.offsetWidth;
								if (c > h[d]) return a = !1;
								l.push(c)
							});
							var b = a ? l : h;
							q.each(c, function(a, d) {
								a.width = b[d] - fa()
							})
						}, 0)
					}
				}
			}
			function v(a) {
				G.removeSelectedClass(g.getElementsByTagName(z.body, "td th"));
				q.each(z.document.getElementsByTagName("table"), function(a) {
					a.ueTable = null
				});
				if (L = ia(z, a)) {
					var b = g.findParentByTagName(L, "table", !0);
					(ut = P(b)) && ut.clearSelected();
					Z ? w(a) : (z.document.body.style.webkitUserSelect = "", aa = !0, z.addListener("mouseover", A))
				}
			}
			function w(a) {
				t.ie && (a = J(a));
				p();
				S = !0;
				Q = setTimeout(function() {
					R(a)
				}, 360)
			}
			function x(a, b) {
				for (var d = [], c, f = 0, e = a.length; f < e; f++)(c = a[f][b]) && d.push(c);
				return d
			}
			function p() {
				Q && clearTimeout(Q);
				Q = null
			}
			function J(a) {
				var b = "pageX pageY clientX clientY srcElement target".split(" "),
					d = {};
				if (a) for (var c = 0, f, e; f = b[c]; c++)(e = a[f]) && (d[f] = e);
				return d
			}
			function R(a) {
				S = !1;
				if (L = a.target || a.srcElement) a = m(L, f(a)), /\d/.test(a) && (a = a.replace(/\d/, ""), L = P(L).getPreviewCell(L, "v" == a)), B(z), C(z, z.document), z.fireEvent("saveScene"), D(a, L), aa = !0, X = a, T = L
			}
			function O(a, b) {
				if (!ca()) {
					p();
					S = !1;
					if (Z && (U = ++U % 3, V = {
						x: b.clientX,
						y: b.clientY
					}, setTimeout(function() {
						0 < U && U--
					}, 360), 2 === U)) {
						U = 0;
						u(b);
						return
					}
					if (2 != b.button) {
						var d = this.selection.getRange(),
							c = g.findParentByTagName(d.startContainer, "table", !0),
							f = g.findParentByTagName(d.endContainer, "table", !0);
						if (c || f) c === f ? (c = g.findParentByTagName(d.startContainer, ["td", "th", "caption"], !0), f = g.findParentByTagName(d.endContainer, ["td", "th", "caption"], !0), c !== f && this.selection.clearRange()) : this.selection.clearRange();
						aa = !1;
						this.document.body.style.webkitUserSelect = "";
						if (X && T && (this.selection.getNative()[t.ie9below ? "empty" : "removeAllRanges"](), U = 0, W = this.document.getElementById("ue_tableDragLine"))) {
							d = g.getXY(T);
							c = g.getXY(W);
							switch (X) {
							case "h":
								la(T, c.x - d.x - $(T).width());
								break;
							case "v":
								N(T, c.y - d.y - T.offsetHeight)
							}
							X = "";
							T = null;
							B(this);
							this.fireEvent("saveScene");
							return
						}
						if (L)(c = (d = P(L)) ? d.selectedTds[0] : null) ? (d = new F.Range(this.document), g.isEmptyBlock(c) ? d.setStart(c, 0).setCursor(!1, !0) : d.selectNodeContents(c).shrinkBoundary().setCursor(!1, !0)) : (d = this.selection.getRange().shrinkBoundary(), d.collapsed || (c = g.findParentByTagName(d.startContainer, ["td", "th"], !0), f = g.findParentByTagName(d.endContainer, ["td", "th"], !0), (c && !f || !c && f || c && f && c !== f) && d.setCursor(!1, !0))), L = null, this.removeListener("mouseover", A);
						else if ((c = g.findParentByTagName(b.target || b.srcElement, "td", !0)) || (c = g.findParentByTagName(b.target || b.srcElement, "th", !0)), c && ("TD" == c.tagName || "TH" == c.tagName)) {
							if (!0 === this.fireEvent("excludetable", c)) return;
							d = new F.Range(this.document);
							d.setStart(c, 0).setCursor(!1, !0)
						}
						this._selectionChange(250, b)
					}
				}
			}
			function A(a, b) {
				if (!ca()) {
					var d = b.target || b.srcElement;
					Y = g.findParentByTagName(d, "td", !0) || g.findParentByTagName(d, "th", !0);
					if (L && Y && ("TD" == L.tagName && "TD" == Y.tagName || "TH" == L.tagName && "TH" == Y.tagName) && g.findParentByTagName(L, "table") == g.findParentByTagName(Y, "table")) if (d = P(Y), L != Y) {
						this.document.body.style.webkitUserSelect = "none";
						this.selection.getNative()[t.ie9below ? "empty" : "removeAllRanges"]();
						var c = d.getCellsRange(L, Y);
						d.setSelected(c)
					} else this.document.body.style.webkitUserSelect = "", d.clearSelected();
					b.preventDefault ? b.preventDefault() : b.returnValue = !1
				}
			}
			function la(a, b) {
				var d = P(a);
				if (d) {
					d = d.table;
					I(a, d);
					$(d).find("tr").each(function(a) {
						0 < a && $(this).find("td,th").removeAttr("width")
					});
					$(d).find("tr:first td,tr:first th").each(function() {
						$(this).attr("width", $(this).width())
					});
					var c = g.getNodeIndex(a);
					if (a.nextSibling) {
						var f = null;
						0 < $(d).find("tr:first").find("td").size() ? f = $(d).find("tr:first td:eq(" + c + ")") : 0 < $(d).find("tr:first").find("th").size() && (f = $(d).find("tr:first th:eq(" + c + ")"));
						f && (f.attr("width", parseInt(f.width()) + b), d = f.next(), d.attr("width", parseInt(d.width()) - b))
					}
				}
			}
			function ca() {
				return "false" === z.body.contentEditable
			}

			function N(a, b) {
				if (!(10 > Math.abs(b))) {
					var d = P(a);
					if (d) for (var d = d.getSameEndPosCells(a, "y"), c = d[0] ? d[0].offsetHeight : 0, f = 0, e; e = d[f++];) {
						var k = b,
							h = c,
							l = parseInt(g.getComputedStyle(e, "line-height"), 10),
							k = h + k;
						e.style.height && (e.style.height = "");
						1 == e.rowSpan ? e.setAttribute("height", k < l ? l : k) : e.removeAttribute && e.removeAttribute("height")
					}
				}
			}
			function I(a, b, d) {
				b || (b = g.findParentByTagName(a, "table"));
				if (!b) return null;
				g.getNodeIndex(a);
				b = b.rows;
				for (var c = 0; a;) 1 === a.nodeType && (c += a.colSpan || 1), a = a.previousSibling;
				a = null;
				var f = [];
				q.each(b, function(a) {
					var b = 0;
					q.each(a.cells, function(a) {
						b += a.colSpan || 1;
						if (b === c) return f.push({
							left: a,
							right: a.nextSibling || null
						}), !1;
						if (b > c) return d && f.push({
							left: a
						}), !1
					})
				});
				return f
			}
			function fa() {
				if (void 0 === G.tabcellSpace) {
					var a = z.document.createElement("table"),
						b = z.document.createElement("tbody"),
						d = z.document.createElement("tr"),
						c = z.document.createElement("td"),
						f = null;
					c.style.cssText = "border: 0;";
					c.width = 1;
					d.appendChild(c);
					d.appendChild(f = c.cloneNode(!1));
					b.appendChild(d);
					a.appendChild(b);
					a.style.cssText = "visibility: hidden;";
					z.body.appendChild(a);
					G.paddingSpace = c.offsetWidth - 1;
					b = a.offsetWidth;
					c.style.cssText = "";
					f.style.cssText = "";
					G.borderWidth = (a.offsetWidth - b) / 3;
					G.tabcellSpace = G.paddingSpace + G.borderWidth;
					z.body.removeChild(a)
				}
				fa = function() {
					return G.tabcellSpace
				};
				return G.tabcellSpace
			}
			function C(a, b) {
				aa || (W = a.document.createElement("div"), g.setAttributes(W, {
					id: "ue_tableDragLine",
					unselectable: "on",
					contenteditable: !1,
					onresizestart: "return false",
					ondragstart: "return false",
					onselectstart: "return false",
					style: "background-color:blue;position:absolute;padding:0;margin:0;background-image:none;border:0px none;opacity:0;filter:alpha(opacity=0)"
				}), a.body.appendChild(W))
			}
			function B(a) {
				if (!aa) for (var b; b = a.document.getElementById("ue_tableDragLine");) g.remove(b)
			}
			function D(a, b) {
				if (b) {
					var d = g.findParentByTagName(b, "table"),
						c = d.getElementsByTagName("caption"),
						f = d.offsetWidth,
						e = d.offsetHeight - (0 < c.length ? c[0].offsetHeight : 0),
						d = g.getXY(d),
						k = g.getXY(b);
					switch (a) {
					case "h":
						c = "height:" + e + "px;top:" + (d.y + (0 < c.length ? c[0].offsetHeight : 0)) + "px;left:" + (k.x + b.offsetWidth);
						W.style.cssText = c + "px;position: absolute;display:block;background-color:blue;width:1px;border:0; color:blue;opacity:.3;filter:alpha(opacity=30)";
						break;
					case "v":
						c = "width:" + f + "px;left:" + d.x + "px;top:" + (k.y + b.offsetHeight), W.style.cssText = c + "px;overflow:hidden;position: absolute;display:block;background-color:blue;height:1px;border:0;color:blue;opacity:.2;filter:alpha(opacity=20)"
					}
				}
			}
			function H(a, b) {
				for (var d = g.getElementsByTagName(a.body, "table"), c, f = 0, e; e = d[f++];) c = g.getElementsByTagName(e, "td"), c[0] && (b ? (c = c[0].style.borderColor.replace(/\s/g, ""), /(#ffffff)|(rgb\(255,255,255\))/ig.test(c) && g.addClass(e, "noBorderTable")) : g.removeClasses(e, "noBorderTable"))
			}
			function M(a, b, d) {
				var c = a.body;
				return c.offsetWidth - (b ? 2 * parseInt(g.getComputedStyle(c, "margin-left"), 10) : 0) - 2 * d.tableBorder - (a.options.offsetWidth || 0)
			}
			function ia(a, b) {
				var d = g.findParentByTagName(b.target || b.srcElement, ["td", "th"], !0),
					c;
				if (!d) return null;
				c = m(d, f(b));
				if (!d) return null;
				if ("h1" === c && d.previousSibling) {
					c = g.getXY(d);
					var e = d.offsetWidth;
					Math.abs(c.x + e - b.clientX) > e / 3 && (d = d.previousSibling)
				} else "v1" === c && d.parentNode.previousSibling && (c = g.getXY(d), e = d.offsetHeight, Math.abs(c.y + e - b.clientY) > e / 3 && (d = d.parentNode.previousSibling.firstChild));
				return d && !0 !== a.fireEvent("excludetable", d) ? d : null
			}
			var z = this,
				Q = null,
				S = !1,
				U = 0,
				V = null,
				G = UE.UETable,
				P = function(a) {
					return G.getUETable(a)
				};
			z.ready(function() {
				var a = this,
					b = a.selection.getText;
				a.selection.getText = function() {
					var d = G.getUETableBySelected(a);
					if (d) {
						var c = "";
						q.each(d.selectedTds, function(a) {
							c += a[t.ie ? "innerText" : "textContent"]
						});
						return c
					}
					return b.call(a.selection)
				}
			});
			var L = null,
				Y = null,
				X = "",
				Z = !1,
				K = null,
				da = !1,
				W = null,
				T = null,
				aa = !1;
			z.setOpt({
				maxColNum: 20,
				maxRowNum: 100,
				defaultCols: 5,
				defaultRows: 5,
				tdvalign: "top",
				cursorpath: z.options.UEDITOR_HOME_URL + "themes/default/images/cursor_",
				tableDragable: !1,
				classList: ["ue-table-interlace-color-single", "ue-table-interlace-color-double"]
			});
			z.getUETable = P;
			var ba = {
				deletetable: 1,
				inserttable: 1,
				cellvalign: 1,
				insertcaption: 1,
				deletecaption: 1,
				inserttitle: 1,
				deletetitle: 1,
				mergeright: 1,
				mergedown: 1,
				mergecells: 1,
				insertrow: 1,
				insertrownext: 1,
				deleterow: 1,
				insertcol: 1,
				insertcolnext: 1,
				deletecol: 1,
				splittocells: 1,
				splittorows: 1,
				splittocols: 1,
				adaptbytext: 1,
				adaptbywindow: 1,
				adaptbycustomer: 1,
				insertparagraph: 1,
				insertparagraphbeforetable: 1,
				averagedistributecol: 1,
				averagedistributerow: 1
			};
			z.ready(function() {
				var a, f, l;
				z.addListener("keydown", function(d, c) {
					var e = c.keyCode || c.which;
					if (8 == e) {
						var k = G.getUETableBySelected(this);
						k && k.selectedTds.length && (k.isFullCol() ? this.execCommand("deletecol") : k.isFullRow() ? this.execCommand("deleterow") : this.fireEvent("delcells"), g.preventDefault(c));
						var h = g.findParentByTagName(this.selection.getStart(), "caption", !0),
							m = this.selection.getRange();
						m.collapsed && h && b(h) && (this.fireEvent("saveScene"), k = h.parentNode, g.remove(h), k && m.setStart(k.rows[0].cells[0], 0).setCursor(!1, !0), this.fireEvent("saveScene"))
					}
					if (46 == e && (k = G.getUETableBySelected(this))) {
						this.fireEvent("saveScene");
						for (h = 0; m = k.selectedTds[h++];) g.fillNode(this.document, m);
						this.fireEvent("saveScene");
						g.preventDefault(c)
					}
					if (13 == e) {
						e = this.selection.getRange();
						if (h = g.findParentByTagName(e.startContainer, "caption", !0)) {
							k = g.findParentByTagName(h, "table");
							e.collapsed ? h && e.setStart(k.rows[0].cells[0], 0).setCursor(!1, !0) : (e.deleteContents(), this.fireEvent("saveScene"));
							g.preventDefault(c);
							return
						}
						e.collapsed && (k = g.findParentByTagName(e.startContainer, "table")) && (m = k.rows[0].cells[0], h = g.findParentByTagName(this.selection.getStart(), ["td", "th"], !0), k = k.previousSibling, m === h && (!k || 1 == k.nodeType && "TABLE" == k.tagName) && g.isStartInblock(e) && (e = g.findParent(this.selection.getStart(), function(a) {
							return g.isBlockElm(a)
						}, !0)) && (/t(h|d)/i.test(e.tagName) || e === h.firstChild) && (this.execCommand("insertparagraphbeforetable"), g.preventDefault(c)))
					}
					if ((c.ctrlKey || c.metaKey) && "67" == c.keyCode && (a = null, k = G.getUETableBySelected(this))) for (e = k.selectedTds, f = k.isFullCol(), l = k.isFullRow(), a = [
						[k.cloneCell(e[0], null, !0)]
					], h = 1; m = e[h]; h++) m.parentNode !== e[h - 1].parentNode ? a.push([k.cloneCell(m, null, !0)]) : a[a.length - 1].push(k.cloneCell(m, null, !0))
				});
				z.addListener("tablehasdeleted", function() {
					n(this, !1, "", null);
					K && g.remove(K)
				});
				z.addListener("beforepaste", function(d, e) {
					var k = this,
						h = k.selection.getRange();
					if (g.findParentByTagName(h.startContainer, "caption", !0)) h = k.document.createElement("div"), h.innerHTML = e.html, e.html = h[t.ie9below ? "innerText" : "textContent"];
					else {
						var m = G.getUETableBySelected(k);
						if (a) {
							k.fireEvent("saveScene");
							var h = k.selection.getRange(),
								n = g.findParentByTagName(h.startContainer, ["td", "th"], !0),
								r, u;
							if (n) {
								m = P(n);
								if (l) {
									var v = m.getCellInfo(n).rowIndex;
									"TH" == n.tagName && v++;
									for (var h = 0, w; w = a[h++];) {
										u = m.insertRow(v++, "td");
										for (var x = 0, p; p = w[x]; x++)(n = u.cells[x]) || (n = u.insertCell(x)), n.innerHTML = p.innerHTML, p.getAttribute("width") && n.setAttribute("width", p.getAttribute("width")), p.getAttribute("vAlign") && n.setAttribute("vAlign", p.getAttribute("vAlign")), p.getAttribute("align") && n.setAttribute("align", p.getAttribute("align")), p.style.cssText && (n.style.cssText = p.style.cssText);
										for (x = 0;
										(p = u.cells[x]) && w[x]; x++) p.innerHTML = w[x].innerHTML, w[x].getAttribute("width") && p.setAttribute("width", w[x].getAttribute("width")), w[x].getAttribute("vAlign") && p.setAttribute("vAlign", w[x].getAttribute("vAlign")), w[x].getAttribute("align") && p.setAttribute("align", w[x].getAttribute("align")), w[x].style.cssText && (p.style.cssText = w[x].style.cssText)
									}
								} else {
									if (f) {
										v = m.getCellInfo(n);
										x = n = 0;
										for (w = a[0]; p = w[x++];) n += p.colSpan || 1;
										k.__hasEnterExecCommand = !0;
										for (h = 0; h < n; h++) k.execCommand("insertcol");
										k.__hasEnterExecCommand = !1;
										n = m.table.rows[0].cells[v.cellIndex];
										"TH" == n.tagName && (n = m.table.rows[1].cells[v.cellIndex])
									}
									for (h = 0; w = a[h++];) {
										r = n;
										for (x = 0; p = w[x++];) n ? (n.innerHTML = p.innerHTML, p.getAttribute("width") && n.setAttribute("width", p.getAttribute("width")), p.getAttribute("vAlign") && n.setAttribute("vAlign", p.getAttribute("vAlign")), p.getAttribute("align") && n.setAttribute("align", p.getAttribute("align")), p.style.cssText && (n.style.cssText = p.style.cssText), u = n, n = n.nextSibling) : (v = p.cloneNode(!0), g.removeAttributes(v, ["class", "rowSpan", "colSpan"]), u.parentNode.appendChild(v));
										n = m.getNextCell(r, !0, !0);
										if (!a[h]) break;
										n || (v = m.getCellInfo(r), m.table.insertRow(m.table.rows.length), m.update(), n = m.getVSideCell(r, !0))
									}
								}
								m.update()
							} else {
								m = k.document.createElement("table");
								for (h = 0; w = a[h++];) {
									u = m.insertRow(m.rows.length);
									for (x = 0; p = w[x++];) v = G.cloneCell(p, null, !0), g.removeAttributes(v, ["class"]), u.appendChild(v);
									2 == x && 1 < v.rowSpan && (v.rowSpan = 1)
								}
								h = G.getDefaultValue(k, void 0);
								h = k.body.offsetWidth - 2 * parseInt(g.getComputedStyle(k.body, "margin-left"), 10) - 2 * h.tableBorder - (k.options.offsetWidth || 0);
								k.execCommand("insertHTML", "<table  " + (f && l ? 'width="' + h + '"' : "") + ">" + m.innerHTML.replace(/>\s*</g, "><").replace(/\bth\b/gi, "td") + "</table>")
							}
							k.fireEvent("contentchange");
							k.fireEvent("saveScene");
							e.html = "";
							return !0
						}
						h = k.document.createElement("div");
						h.innerHTML = e.html;
						w = h.getElementsByTagName("table");
						g.findParentByTagName(k.selection.getStart(), "table") ? (q.each(w, function(a) {
							g.remove(a)
						}), g.findParentByTagName(k.selection.getStart(), "caption", !0) && (h.innerHTML = h[t.ie ? "innerText" : "textContent"])) : q.each(w, function(a) {
							c(a, !0);
							g.removeAttributes(a, ["style", "border"]);
							q.each(g.getElementsByTagName(a, "td"), function(a) {
								b(a) && g.fillNode(k.document, a);
								c(a, !0)
							})
						});
						e.html = h.innerHTML
					}
				});
				z.addListener("afterpaste", function() {
					q.each(g.getElementsByTagName(z.body, "table"), function(a) {
						if (a.offsetWidth > z.body.offsetWidth) {
							var b = G.getDefaultValue(z, a);
							a.style.width = z.body.offsetWidth - 2 * parseInt(g.getComputedStyle(z.body, "margin-left"), 10) - 2 * b.tableBorder - (z.options.offsetWidth || 0) + "px"
						}
					})
				});
				z.addListener("blur", function() {
					a = null
				});
				var m;
				z.addListener("keydown", function() {
					clearTimeout(m);
					m = setTimeout(function() {
						var a = z.selection.getRange();
						if (a = g.findParentByTagName(a.startContainer, ["th", "td"], !0)) {
							var b = a.parentNode.parentNode.parentNode;
							b.offsetWidth > b.getAttribute("width") && (a.style.wordBreak = "break-all")
						}
					}, 100)
				});
				z.addListener("selectionchange", function() {
					n(z, !1, "", null)
				});
				z.addListener("contentchange", function() {
					var a = this;
					B(a);
					if (!G.getUETableBySelected(a)) {
						var b = a.selection.getRange().startContainer,
							b = g.findParentByTagName(b, ["td", "th"], !0);
						q.each(g.getElementsByTagName(a.document, "table"), function(b) {
							!0 !== a.fireEvent("excludetable", b) && (b.ueTable = new G(b), b.onmouseover = function() {
								a.fireEvent("tablemouseover", b)
							}, b.onmousemove = function() {
								a.fireEvent("tablemousemove", b);
								a.options.tableDragable && d(!0, this, a);
								q.defer(function() {
									a.fireEvent("contentchange", 50)
								}, !0)
							}, b.onmouseout = function() {
								a.fireEvent("tablemouseout", b);
								n(a, !1, "", null);
								B(a)
							}, b.onclick = function(b) {
								b = a.window.event || b;
								var d = e(b.target || b.srcElement);
								if (d) {
									var c = P(d),
										f = c.table,
										h = c.getCellInfo(d),
										g = a.selection.getRange();
									k(f, d, b, !0) ? (f = c.getCell(c.indexTable[c.rowsNum - 1][h.colIndex].rowIndex, c.indexTable[c.rowsNum - 1][h.colIndex].cellIndex), b.shiftKey && c.selectedTds.length ? c.selectedTds[0] !== f ? (b = c.getCellsRange(c.selectedTds[0], f), c.setSelected(b)) : g && g.selectNodeContents(f).select() : d !== f ? (b = c.getCellsRange(d, f), c.setSelected(b)) : g && g.selectNodeContents(f).select()) : k(f, d, b) && (f = c.getCell(c.indexTable[h.rowIndex][c.colsNum - 1].rowIndex, c.indexTable[h.rowIndex][c.colsNum - 1].cellIndex), b.shiftKey && c.selectedTds.length ? c.selectedTds[0] !== f ? (b = c.getCellsRange(c.selectedTds[0], f), c.setSelected(b)) : g && g.selectNodeContents(f).select() : d !== f ? (b = c.getCellsRange(d, f), c.setSelected(b)) : g && g.selectNodeContents(f).select())
								}
							})
						});
						H(a, !0)
					}
				});
				g.on(z.document, "mousemove", h);
				g.on(z.document, "mouseout", function(a) {
					"TABLE" == (a.target || a.srcElement).tagName && n(z, !1, "", null)
				});
				z.addListener("interlacetable", function(a, b, d) {
					if (b) {
						a = b.rows;
						b = a.length;
						for (var c = 0; c < b; c++) {
							var f = d || this.options.classList;
							a[c].className = f[c] ? f[c] : f[c % f.length]
						}
					}
				});
				z.addListener("uninterlacetable", function(a, b) {
					if (b) for (var d = b.rows, c = this.options.classList, f = d.length, e = 0; e < f; e++) g.removeClasses(d[e], c)
				});
				z.addListener("mousedown", r);
				z.addListener("mouseup", O);
				g.on(z.body, "dragstart", function(a) {
					O.call(z, "dragstart", a)
				});
				z.addOutputRule(function(a) {
					q.each(a.getNodesByTagName("div"), function(a) {
						"ue_tableDragLine" == a.getAttr("id") && a.parentNode.removeChild(a)
					})
				});
				var u = 0;
				z.addListener("mousedown", function() {
					u = 0
				});
				z.addListener("tabkeydown", function() {
					var a = this.selection.getRange(),
						d = a.getCommonAncestor(!0, !0),
						c = g.findParentByTagName(d, "table");
					if (c) {
						if (g.findParentByTagName(d, "caption", !0))(d = g.getElementsByTagName(c, "th td")) && d.length && a.setStart(d[0], 0).setCursor(!1, !0);
						else {
							var d = g.findParentByTagName(d, ["td", "th"], !0),
								f = P(d);
							u = 1 < d.rowSpan ? u : f.getCellInfo(d).rowIndex;
							(d = f.getTabNextCell(d, u)) ? b(d) ? a.setStart(d, 0).setCursor(!1, !0) : a.selectNodeContents(d).select() : (z.fireEvent("saveScene"), z.__hasEnterExecCommand = !0, this.execCommand("insertrownext"), z.__hasEnterExecCommand = !1, a = this.selection.getRange(), a.setStart(c.rows[c.rows.length - 1].cells[0], 0).setCursor(), z.fireEvent("saveScene"))
						}
						return !0
					}
				});
				t.ie && z.addListener("selectionchange", function() {
					n(this, !1, "", null)
				});
				z.addListener("keydown", function(a, b) {
					var d = b.keyCode || b.which;
					if (8 != d && 46 != d) {
						(d = !b.ctrlKey && !b.metaKey && !b.shiftKey && !b.altKey) && G.removeSelectedClass(g.getElementsByTagName(this.body, "td"));
						var c = G.getUETableBySelected(this);
						c && d && c.clearSelected()
					}
				});
				z.addListener("beforegetcontent", function() {
					H(this, !1);
					t.ie && q.each(this.document.getElementsByTagName("caption"), function(a) {
						g.isEmptyNode(a) && (a.innerHTML = "&nbsp;")
					})
				});
				z.addListener("aftergetcontent", function() {
					H(this, !0)
				});
				z.addListener("getAllHtml", function() {
					G.removeSelectedClass(z.document.getElementsByTagName("td"))
				});
				z.addListener("fullscreenchanged", function(a, b) {
					if (!b) {
						var d = this.body.offsetWidth / document.body.offsetWidth,
							c = g.getElementsByTagName(this.body, "table");
						q.each(c, function(a) {
							if (a.offsetWidth < z.body.offsetWidth) return !1;
							var b = g.getElementsByTagName(a, "td"),
								c = [];
							q.each(b, function(a) {
								c.push(a.offsetWidth)
							});
							for (var f = 0, e; e = b[f]; f++) e.setAttribute("width", Math.floor(c[f] * d));
							a.setAttribute("width", Math.floor(M(z, !0, G.getDefaultValue(z, void 0))))
						})
					}
				});
				var v = z.execCommand;
				z.execCommand = function(a, d) {
					a = a.toLowerCase();
					var c = G.getUETableBySelected(this),
						f = new F.Range(this.document),
						e = this.commands[a] || UE.commands[a],
						k;
					if (e) {
						if (!c || ba[a] || e.notNeedUndo || this.__hasEnterExecCommand) k = v.apply(this, arguments);
						else {
							this.__hasEnterExecCommand = !0;
							this.fireEvent("beforeexeccommand", a);
							for (var c = c.selectedTds, h = e = -2, l, m, n = 0, r; r = c[n]; n++) if (b(r) ? f.setStart(r, 0).setCursor(!1, !0) : f.selectNode(r).select(!0), m = this.queryCommandState(a), l = this.queryCommandValue(a), -1 != m) {
								if (e !== m || h !== l) this._ignoreContentChange = !0, k = v.apply(this, arguments), this._ignoreContentChange = !1;
								e = this.queryCommandState(a);
								h = this.queryCommandValue(a);
								g.isEmptyBlock(r) && g.fillNode(this.document, r)
							}
							f.setStart(c[0], 0).shrinkBoundary(!0).setCursor(!1, !0);
							this.fireEvent("contentchange");
							this.fireEvent("afterexeccommand", a);
							this.__hasEnterExecCommand = !1;
							this._selectionChange()
						}
						return k
					}
				}
			})
		};
		UE.UETable.prototype.sortTable = function(c, a) {
			var e = this.table,
				b = e.rows,
				f = [],
				h = "TH" === b[0].cells[0].tagName,
				d = 0;
			if (this.selectedTds.length) {
				for (var g = this.cellsRange, k = g.endRowIndex + 1, n = g.beginRowIndex; n < k; n++) f[n] = b[n];
				f.splice(0, g.beginRowIndex);
				d = g.endRowIndex + 1 === this.rowsNum ? 0 : g.endRowIndex + 1
			} else for (n = 0, k = b.length; n < k; n++) f[n] = b[n];
			var m = {
				reversecurrent: function(a, b) {
					return 1
				},
				orderbyasc: function(a, b) {
					return (a.innerText || a.textContent).localeCompare(b.innerText || b.textContent)
				},
				reversebyasc: function(a, b) {
					return b.innerHTML.localeCompare(a.innerHTML)
				},
				orderbynum: function(a, b) {
					var d = a[t.ie ? "innerText" : "textContent"].match(/\d+/),
						c = b[t.ie ? "innerText" : "textContent"].match(/\d+/);
					d && (d = +d[0]);
					c && (c = +c[0]);
					return (d || 0) - (c || 0)
				},
				reversebynum: function(a, b) {
					var d = a[t.ie ? "innerText" : "textContent"].match(/\d+/),
						c = b[t.ie ? "innerText" : "textContent"].match(/\d+/);
					d && (d = +d[0]);
					c && (c = +c[0]);
					return (c || 0) - (d || 0)
				}
			};
			e.setAttribute("data-sort-type", a && "string" === typeof a && m[a] ? a : "");
			h && f.splice(0, 1);
			f = q.sort(f, function(b, d) {
				return a && "function" === typeof a ? a.call(this, b.cells[c], d.cells[c]) : a && "number" === typeof a ? 1 : a && "string" === typeof a && m[a] ? m[a].call(this, b.cells[c], d.cells[c]) : m.orderbyasc.call(this, b.cells[c], d.cells[c])
			});
			h = e.ownerDocument.createDocumentFragment();
			n = 0;
			for (k = f.length; n < k; n++) h.appendChild(f[n]);
			e = e.getElementsByTagName("tbody")[0];
			d ? e.insertBefore(h, b[d - g.endRowIndex + g.beginRowIndex - 1]) : e.appendChild(h)
		};
		UE.plugins.tablesort = function() {
			var c = this,
				a = UE.UETable;
			c.ready(function() {
				q.cssRule("tablesort", "table.sortEnabled tr.firstRow th,table.sortEnabled tr.firstRow td{padding-right:20px;background-repeat: no-repeat;background-position: center right;   background-image:url(" + c.options.themePath + c.options.theme + "/images/sortable.png);}", c.document);
				c.addListener("afterexeccommand", function(a, b) {
					"mergeright" != b && "mergedown" != b && "mergecells" != b || this.execCommand("disablesort")
				})
			});
			UE.commands.sorttable = {
				queryCommandState: function() {
					var c = a.getTableItemsByRange(this);
					if (!c.cell) return -1;
					for (var c = c.table.getElementsByTagName("td"), b = 0, f; f = c[b++];) if (1 != f.rowSpan || 1 != f.colSpan) return -1;
					return 0
				},
				execCommand: function(c, b) {
					var f = this.selection.getRange(),
						e = f.createBookmark(!0),
						d = a.getTableItemsByRange(this),
						g = d.cell,
						d = a.getUETable(d.table),
						g = d.getCellInfo(g);
					d.sortTable(g.cellIndex, b);
					f.moveToBookmark(e);
					try {
						f.select()
					} catch (k) {}
				}
			};
			UE.commands.enablesort = UE.commands.disablesort = {
				queryCommandState: function(c) {
					var b = a.getTableItemsByRange(this).table;
					if (b && "enablesort" == c) for (var f = g.getElementsByTagName(b, "th td"), e = 0; e < f.length; e++) if (1 < f[e].getAttribute("colspan") || 1 < f[e].getAttribute("rowspan")) return -1;
					return b ? "enablesort" == c ^ "sortEnabled" != b.getAttribute("data-sort") ? -1 : 0 : -1
				},
				execCommand: function(c) {
					var b = a.getTableItemsByRange(this).table;
					b.setAttribute("data-sort", "enablesort" == c ? "sortEnabled" : "sortDisabled");
					"enablesort" == c ? g.addClass(b, "sortEnabled") : g.removeClasses(b, "sortEnabled")
				}
			}
		};
		UE.plugins.contextmenu = function() {
			var c = this;
			c.setOpt("enableContextMenu", !0);
			if (!1 !== c.getOpt("enableContextMenu")) {
				var a = c.getLang("contextMenu"),
					e, b = c.options.contextMenu || [{
						label: a.selectall,
						cmdName: "selectall"
					}, {
						label: a.cleardoc,
						cmdName: "cleardoc",
						exec: function() {
							confirm(a.confirmclear) && this.execCommand("cleardoc")
						}
					}, "-",
					{
						label: a.unlink,
						cmdName: "unlink"
					}, "-",
					{
						group: a.paragraph,
						icon: "justifyjustify",
						subMenu: [{
							label: a.justifyleft,
							cmdName: "justify",
							value: "left"
						}, {
							label: a.justifyright,
							cmdName: "justify",
							value: "right"
						}, {
							label: a.justifycenter,
							cmdName: "justify",
							value: "center"
						}, {
							label: a.justifyjustify,
							cmdName: "justify",
							value: "justify"
						}]
					}, "-",
					{
						group: a.table,
						icon: "table",
						subMenu: [{
							label: a.inserttable,
							cmdName: "inserttable"
						}, {
							label: a.deletetable,
							cmdName: "deletetable"
						}, "-",
						{
							label: a.deleterow,
							cmdName: "deleterow"
						}, {
							label: a.deletecol,
							cmdName: "deletecol"
						}, {
							label: a.insertcol,
							cmdName: "insertcol"
						}, {
							label: a.insertcolnext,
							cmdName: "insertcolnext"
						}, {
							label: a.insertrow,
							cmdName: "insertrow"
						}, {
							label: a.insertrownext,
							cmdName: "insertrownext"
						}, "-",
						{
							label: a.insertcaption,
							cmdName: "insertcaption"
						}, {
							label: a.deletecaption,
							cmdName: "deletecaption"
						}, {
							label: a.inserttitle,
							cmdName: "inserttitle"
						}, {
							label: a.deletetitle,
							cmdName: "deletetitle"
						}, {
							label: a.inserttitlecol,
							cmdName: "inserttitlecol"
						}, {
							label: a.deletetitlecol,
							cmdName: "deletetitlecol"
						}, "-",
						{
							label: a.mergecells,
							cmdName: "mergecells"
						}, {
							label: a.mergeright,
							cmdName: "mergeright"
						}, {
							label: a.mergedown,
							cmdName: "mergedown"
						}, "-",
						{
							label: a.splittorows,
							cmdName: "splittorows"
						}, {
							label: a.splittocols,
							cmdName: "splittocols"
						}, {
							label: a.splittocells,
							cmdName: "splittocells"
						}, "-",
						{
							label: a.averageDiseRow,
							cmdName: "averagedistributerow"
						}, {
							label: a.averageDisCol,
							cmdName: "averagedistributecol"
						}, "-",
						{
							label: a.edittd,
							cmdName: "edittd",
							exec: function() {
								UE.ui.edittd && new UE.ui.edittd(this);
								this.getDialog("edittd").open()
							}
						}, {
							label: a.edittable,
							cmdName: "edittable",
							exec: function() {
								UE.ui.edittable && new UE.ui.edittable(this);
								this.getDialog("edittable").open()
							}
						}, {
							label: a.setbordervisible,
							cmdName: "setbordervisible"
						}]
					}, {
						group: a.tablesort,
						icon: "tablesort",
						subMenu: [{
							label: a.enablesort,
							cmdName: "enablesort"
						}, {
							label: a.disablesort,
							cmdName: "disablesort"
						}, "-",
						{
							label: a.reversecurrent,
							cmdName: "sorttable",
							value: "reversecurrent"
						}, {
							label: a.orderbyasc,
							cmdName: "sorttable",
							value: "orderbyasc"
						}, {
							label: a.reversebyasc,
							cmdName: "sorttable",
							value: "reversebyasc"
						}, {
							label: a.orderbynum,
							cmdName: "sorttable",
							value: "orderbynum"
						}, {
							label: a.reversebynum,
							cmdName: "sorttable",
							value: "reversebynum"
						}]
					}, {
						group: a.borderbk,
						icon: "borderBack",
						subMenu: [{
							label: a.setcolor,
							cmdName: "interlacetable",
							exec: function() {
								this.execCommand("interlacetable")
							}
						}, {
							label: a.unsetcolor,
							cmdName: "uninterlacetable",
							exec: function() {
								this.execCommand("uninterlacetable")
							}
						}, {
							label: a.setbackground,
							cmdName: "settablebackground",
							exec: function() {
								this.execCommand("settablebackground", {
									repeat: !0,
									colorList: ["#bbb", "#ccc"]
								})
							}
						}, {
							label: a.unsetbackground,
							cmdName: "cleartablebackground",
							exec: function() {
								this.execCommand("cleartablebackground")
							}
						}, {
							label: a.redandblue,
							cmdName: "settablebackground",
							exec: function() {
								this.execCommand("settablebackground", {
									repeat: !0,
									colorList: ["red", "blue"]
								})
							}
						}, {
							label: a.threecolorgradient,
							cmdName: "settablebackground",
							exec: function() {
								this.execCommand("settablebackground", {
									repeat: !0,
									colorList: ["#aaa", "#bbb", "#ccc"]
								})
							}
						}]
					}, {
						group: a.aligntd,
						icon: "aligntd",
						subMenu: [{
							cmdName: "cellalignment",
							value: {
								align: "left",
								vAlign: "top"
							}
						}, {
							cmdName: "cellalignment",
							value: {
								align: "center",
								vAlign: "top"
							}
						}, {
							cmdName: "cellalignment",
							value: {
								align: "right",
								vAlign: "top"
							}
						}, {
							cmdName: "cellalignment",
							value: {
								align: "left",
								vAlign: "middle"
							}
						}, {
							cmdName: "cellalignment",
							value: {
								align: "center",
								vAlign: "middle"
							}
						}, {
							cmdName: "cellalignment",
							value: {
								align: "right",
								vAlign: "middle"
							}
						}, {
							cmdName: "cellalignment",
							value: {
								align: "left",
								vAlign: "bottom"
							}
						}, {
							cmdName: "cellalignment",
							value: {
								align: "center",
								vAlign: "bottom"
							}
						}, {
							cmdName: "cellalignment",
							value: {
								align: "right",
								vAlign: "bottom"
							}
						}]
					}, {
						group: a.aligntable,
						icon: "aligntable",
						subMenu: [{
							cmdName: "tablealignment",
							className: "left",
							label: a.tableleft,
							value: "left"
						}, {
							cmdName: "tablealignment",
							className: "center",
							label: a.tablecenter,
							value: "center"
						}, {
							cmdName: "tablealignment",
							className: "right",
							label: a.tableright,
							value: "right"
						}]
					}];
				if (b.length) {
					var f = UE.ui.uiUtils;
					c.addListener("contextmenu", function(h, d) {
						var l = f.getViewportOffsetByEvent(d);
						c.fireEvent("beforeselectionchange");
						e && e.destroy();
						for (var k = 0, n, m = []; n = b[k]; k++) {
							var r;
							(function(b) {
								if ("-" == b)(r = m[m.length - 1]) && "-" !== r && m.push("-");
								else if (b.hasOwnProperty("group")) {
									for (var d = 0, f, e = []; f = b.subMenu[d]; d++)(function(a) {
										"-" == a ? (r = e[e.length - 1]) && "-" !== r ? e.push("-") : e.splice(e.length - 1) : (c.commands[a.cmdName] || UE.commands[a.cmdName] || a.query) && -1 < (a.query ? a.query() : c.queryCommandState(a.cmdName)) && e.push({
											label: a.label || c.getLang("contextMenu." + a.cmdName + (a.value || "")) || "",
											className: "edui-for-" + a.cmdName + (a.className ? " edui-for-" + a.cmdName + "-" + a.className : ""),
											onclick: a.exec ?
											function() {
												a.exec.call(c)
											} : function() {
												c.execCommand(a.cmdName, a.value)
											}
										})
									})(f);
									e.length && m.push({
										label: function() {
											switch (b.icon) {
											case "table":
												return c.getLang("contextMenu.table");
											case "justifyjustify":
												return c.getLang("contextMenu.paragraph");
											case "aligntd":
												return c.getLang("contextMenu.aligntd");
											case "aligntable":
												return c.getLang("contextMenu.aligntable");
											case "tablesort":
												return a.tablesort;
											case "borderBack":
												return a.borderbk;
											default:
												return ""
											}
										}(),
										className: "edui-for-" + b.icon,
										subMenu: {
											items: e,
											editor: c
										}
									})
								} else(c.commands[b.cmdName] || UE.commands[b.cmdName] || b.query) && -1 < (b.query ? b.query.call(c) : c.queryCommandState(b.cmdName)) && m.push({
									label: b.label || c.getLang("contextMenu." + b.cmdName),
									className: "edui-for-" + (b.icon ? b.icon : b.cmdName + (b.value || "")),
									onclick: b.exec ?
									function() {
										b.exec.call(c)
									} : function() {
										c.execCommand(b.cmdName, b.value)
									}
								})
							})(n)
						}
						"-" == m[m.length - 1] && m.pop();
						e = new UE.ui.Menu({
							items: m,
							className: "edui-contextmenu",
							editor: c
						});
						e.render();
						e.showAt(l);
						c.fireEvent("aftershowcontextmenu", e);
						g.preventDefault(d);
						if (t.ie) {
							var u;
							try {
								u = c.selection.getNative().createRange()
							} catch (v) {
								return
							}
							u.item && (new F.Range(c.document)).selectNode(u.item(0)).select(!0, !0)
						}
					});
					c.addListener("aftershowcontextmenu", function(a, b) {
						if (c.zeroclipboard) {
							var d = b.items,
								f;
							for (f in d)"edui-for-copy" == d[f].className && c.zeroclipboard.clip(d[f].getDom())
						}
					})
				}
			}
		};
		UE.plugins.shortcutmenu = function() {
			var c, a = this.options.shortcutMenu || [];
			a.length && (this.addListener("mouseup", function(e, b) {
				var f = this,
					h = {
						type: e,
						target: b.target || b.srcElement,
						screenX: b.screenX,
						screenY: b.screenY,
						clientX: b.clientX,
						clientY: b.clientY
					};
				setTimeout(function() {
					var d = f.selection.getRange();
					if (!1 === d.collapsed || "contextmenu" == e) d = d.getClosedNode(), d && "IMG" == d.tagName || (c || (c = new p.editor.ui.ShortCutMenu({
						editor: f,
						items: a,
						theme: f.options.theme,
						className: "edui-shortcutmenu"
					}), c.render(), f.fireEvent("afterrendershortcutmenu", c)), p.editor.ui.Popup.postHide(b), c.show(h, !! UE.plugins.contextmenu))
				});
				if ("contextmenu" == e && (g.preventDefault(b), t.ie9below)) {
					var d;
					try {
						d = f.selection.getNative().createRange()
					} catch (l) {
						return
					}
					d.item && (new F.Range(f.document)).selectNode(d.item(0)).select(!0, !0)
				}
			}), this.addListener("keydown", function(a) {
				"keydown" == a && c && !c.isHidden && c.hide()
			}))
		};
		UE.plugins.basestyle = function() {
			var c = {
				bold: ["strong", "b"],
				italic: ["em", "i"],
				subscript: ["sub"],
				superscript: ["sup"]
			},
				a = function(a, b) {
					return g.filterNodeList(a.selection.getStartElementPath(), b)
				},
				e = this;
			e.addshortcutkey({
				Bold: "ctrl+66",
				Italic: "ctrl+73",
				Underline: "ctrl+85"
			});
			e.addInputRule(function(a) {
				q.each(a.getNodesByTagName("b i"), function(a) {
					switch (a.tagName) {
					case "b":
						a.tagName = "strong";
						break;
					case "i":
						a.tagName = "em"
					}
				})
			});
			for (var b in c)(function(b, c) {
				e.commands[b] = {
					execCommand: function(b) {
						var d = e.selection.getRange(),
							f = a(this, c);
						if (d.collapsed) {
							if (f) b = e.document.createTextNode(""), d.insertNode(b).removeInlineStyle(c), d.setStartBefore(b), g.remove(b);
							else {
								f = d.document.createElement(c[0]);
								if ("superscript" == b || "subscript" == b) b = e.document.createTextNode(""), d.insertNode(b).removeInlineStyle(["sub", "sup"]).setStartBefore(b).collapse(!0);
								d.insertNode(f).setStart(f, 0)
							}
							d.collapse(!0)
						} else {
							if ("superscript" == b || "subscript" == b) f && f.tagName.toLowerCase() == b || d.removeInlineStyle(["sub", "sup"]);
							f ? d.removeInlineStyle(c) : d.applyInlineStyle(c[0])
						}
						d.select()
					},
					queryCommandState: function() {
						return a(this, c) ? 1 : 0
					}
				}
			})(b, c[b])
		};
		UE.plugins.elementpath = function() {
			var c, a, e = this;
			e.setOpt("elementPathEnabled", !0);
			e.options.elementPathEnabled && (e.commands.elementpath = {
				execCommand: function(b, f) {
					var h = a[f],
						d = e.selection.getRange();
					c = 1 * f;
					d.selectNode(h).select()
				},
				queryCommandValue: function() {
					var b = [].concat(this.selection.getStartElementPath()).reverse(),
						f = [];
					a = b;
					for (var e = 0, d; d = b[e]; e++) if (3 != d.nodeType) {
						var g = d.tagName.toLowerCase();
						"img" == g && d.getAttribute("anchorname") && (g = "anchor");
						f[e] = g;
						if (c == e) {
							c = -1;
							break
						}
					}
					return f
				}
			})
		};
		UE.plugins.formatmatch = function() {
			function c(h, d) {
				if (t.webkit) var l = "IMG" == d.target.tagName ? d.target : null;
				a.undoManger && a.undoManger.save();
				var k = a.selection.getRange(),
					l = l || k.getClosedNode();
				if (b && l && "IMG" == l.tagName) l.style.cssText += ";float:" + (b.style.cssFloat || b.style.styleFloat || "none") + ";display:" + (b.style.display || "inline"), b = null;
				else if (!b) {
					if (k.collapsed) {
						var n = a.document.createTextNode("match");
						k.insertNode(n).select()
					}
					a.__hasEnterExecCommand = !0;
					k = a.options.removeFormatAttributes;
					a.options.removeFormatAttributes = "";
					a.execCommand("removeformat");
					a.options.removeFormatAttributes = k;
					a.__hasEnterExecCommand = !1;
					k = a.selection.getRange();
					e.length && (l = k, n && l.selectNode(n), l.applyInlineStyle(e[e.length - 1].tagName, null, e));
					n && k.setStartBefore(n).collapse(!0);
					k.select();
					n && g.remove(n)
				}
				a.undoManger && a.undoManger.save();
				a.removeListener("mouseup", c);
				f = 0
			}
			var a = this,
				e = [],
				b, f = 0;
			a.addListener("reset", function() {
				e = [];
				f = 0
			});
			a.commands.formatmatch = {
				execCommand: function(h) {
					if (f) f = 0, e = [], a.removeListener("mouseup", c);
					else {
						h = a.selection.getRange();
						b = h.getClosedNode();
						if (!b || "IMG" != b.tagName) {
							h.collapse(!0).shrinkBoundary();
							e = g.findParents(h.startContainer, !0, function(a) {
								return !g.isBlockElm(a) && 1 == a.nodeType
							});
							h = 0;
							for (var d; d = e[h]; h++) if ("A" == d.tagName) {
								e.splice(h, 1);
								break
							}
						}
						a.addListener("mouseup", c);
						f = 1
					}
				},
				queryCommandState: function() {
					return f
				},
				notNeedUndo: 1
			}
		};
		UE.plugin.register("searchreplace", function() {
			function c(a) {
				return (3 == a.nodeType ? a.nodeValue : a[t.ie ? "innerText" : "textContent"]).replace(g.fillChar, "")
			}
			function a(b, f, e) {
				var d = 0;
				b = b.firstChild;
				for (var k; b;) {
					if (3 == b.nodeType) {
						if (k = c(b).replace(/(^[\t\r\n]+)|([\t\r\n]+$)/, "").length, d += k, d >= f) return {
							node: b,
							index: k - (d - f)
						}
					} else if (!y.$empty[b.tagName] && (k = c(b).replace(/(^[\t\r\n]+)|([\t\r\n]+$)/, "").length, d += k, d >= f && (k = a(b, k - (d - f), e)))) return k;
					b = g.getNextDomNode(b)
				}
			}
			function e(d, e) {
				var k = h || d.selection.getRange(),
					l, m = e.searchStr,
					r = d.document.createElement("span");
				r.innerHTML = "$$ueditor_searchreplace_key$$";
				k.shrinkBoundary(!0);
				if (!k.collapsed) {
					k.select();
					var u = d.selection.getText();
					if ((new RegExp("^" + e.searchStr + "$", e.casesensitive ? "" : "i")).test(u)) {
						if (void 0 != e.replaceStr) return m = e.replaceStr, m = b.document.createTextNode(m), k.deleteContents().insertNode(m), k.select(), !0;
						k.collapse(-1 == e.dir)
					}
				}
				k.insertNode(r);
				k.enlargeToBlockElm(!0);
				l = k.startContainer;
				u = c(l).indexOf("$$ueditor_searchreplace_key$$");
				k.setStartBefore(r);
				g.remove(r);
				a: {
					var r = l,
						v;
					l = e.all || 1 == e.dir ? "getNextDomNode" : "getPreDomNode";
					g.isBody(r) && (r = r.firstChild);
					for (; r;) {
						v = c(r);
						b: {
							var w = v;
							v = u;
							var x = e.searchStr,
								q = new RegExp(x, "g" + (e.casesensitive ? "" : "i"));
							if (-1 == e.dir) {
								if (w = w.substr(0, v), w = w.split("").reverse().join(""), x = x.split("").reverse().join(""), w = q.exec(w)) {
									v = v - w.index - x.length;
									break b
								}
							} else if (w = w.substr(v), w = q.exec(w)) {
								v = w.index + v;
								break b
							}
							v = -1
						}
						if (-1 != v) {
							u = {
								node: r,
								index: v
							};
							break a
						}
						for (r = g[l](r); r && f[r.nodeName.toLowerCase()];) r = g[l](r, !0);
						r && (u = -1 == e.dir ? c(r).length : 0)
					}
					u = void 0
				}
				if (u) return r = a(u.node, u.index, m),
				m = a(u.node, u.index + m.length, m),
				k.setStart(r.node, r.index).setEnd(m.node, m.index),
				void 0 !== e.replaceStr && (m = e.replaceStr, m = b.document.createTextNode(m), k.deleteContents().insertNode(m)),
				k.select(),
				!0;
				k.setCursor()
			}
			var b = this,
				f = {
					table: 1,
					tbody: 1,
					tr: 1,
					ol: 1,
					ul: 1
				},
				h = null;
			return {
				commands: {
					searchreplace: {
						execCommand: function(a, c) {
							q.extend(c, {
								all: !1,
								casesensitive: !1,
								dir: 1
							}, !0);
							var d = 0;
							if (c.all) {
								h = null;
								var f = b.selection.getRange(),
									g = b.body.firstChild;
								g && 1 == g.nodeType ? (f.setStart(g, 0), f.shrinkBoundary(!0)) : 3 == g.nodeType && f.setStartBefore(g);
								f.collapse(!0).select(!0);
								for (void 0 !== c.replaceStr && b.fireEvent("saveScene"); e(this, c);) d++, h = b.selection.getRange(), h.collapse(-1 == c.dir)
							} else void 0 !== c.replaceStr && b.fireEvent("saveScene"), e(this, c) && (d++, h = b.selection.getRange(), h.collapse(-1 == c.dir));
							d && b.fireEvent("saveScene");
							return d
						},
						notNeedUndo: 1
					}
				},
				bindEvents: {
					clearlastSearchResult: function() {
						h = null
					}
				}
			}
		});
		UE.commands.insertparagraph = {
			execCommand: function(c, a) {
				for (var e = this.selection.getRange(), b = e.startContainer, f; b && !g.isBody(b);) f = b, b = b.parentNode;
				if (f) {
					b = this.document.createElement("section");
					b.setAttribute("class", "_135editor");
					b.setAttribute("data-role", "paragraph");
					var h = this.document.createElement("p");
					h.appendChild(this.document.createElement("br"));
					b.appendChild(h);
					a ? f.parentNode.insertBefore(b, f) : f.parentNode.insertBefore(b, f.nextSibling);
					e.setStart(h, 0).setCursor(!1, !0)
				}
			}
		};
		UE.plugin.register("autoupload", function() {
			function c(a, c) {
				var b, f, e, d, l, k, n, m, r = /image\/\w+/i.test(a.type) ? "image" : "file",
					u = "loading_" + (+new Date).toString(36);
				b = c.getOpt(r + "FieldName");
				f = c.getOpt(r + "UrlPrefix");
				e = c.getOpt(r + "MaxSize");
				d = c.getOpt(r + "AllowFiles");
				l = c.getActionUrl(c.getOpt(r + "ActionName"));
				n = function(a) {
					var b = c.document.getElementById(u);
					b && g.remove(b);
					c.fireEvent("showmessage", {
						id: u,
						content: a,
						type: "error",
						timeout: 4E3
					})
				};
				"image" == r ? (k = '<img class="loadingclass" id="' + u + '" src="' + c.options.themePath + c.options.theme + '/images/spacer.gif">', m = function(a) {
					var b = f + a.url,
						d = c.document.getElementById(u);
					d && (g.removeClasses(d, "loadingclass"), d.setAttribute("src", b), d.setAttribute("_src", b), d.setAttribute("alt", a.original || ""), d.removeAttribute("id"), c.trigger("contentchange", d))
				}) : (k = '<p><img class="loadingclass" id="' + u + '" src="' + c.options.themePath + c.options.theme + '/images/spacer.gif"></p>', m = function(a) {
					a = f + a.url;
					var b = c.document.getElementById(u),
						d = c.selection.getRange(),
						e = d.createBookmark();
					d.selectNode(b).select();
					c.execCommand("insertfile", {
						url: a
					});
					d.moveToBookmark(e).select()
				});
				c.execCommand("inserthtml", k);
				c.getOpt(r + "ActionName") ? a.size > e ? n(c.getLang("autoupload.exceedSizeError")) : (e = a.name ? a.name.substr(a.name.lastIndexOf(".")) : "") && "image" != r || d && -1 == (d.join("") + ".").indexOf(e.toLowerCase() + ".") ? n(c.getLang("autoupload.exceedTypeError")) : (d = new XMLHttpRequest, r = new FormData, e = q.serializeParam(c.queryCommandValue("serverparam")) || "", l = q.formatUrl(l + (-1 == l.indexOf("?") ? "?" : "&") + e), r.append(b, a, a.name || "blob." + a.type.substr(6)), r.append("type", "ajax"), d.open("post", l, !0), d.setRequestHeader("X-Requested-With", "XMLHttpRequest"), d.addEventListener("load", function(a) {
					try {
						var b = (new Function("return " + q.trim(a.target.response)))();
						"SUCCESS" == b.state && b.url ? m(b) : n(b.state)
					} catch (x) {
						n(c.getLang("autoupload.loadError"))
					}
				}), d.send(r)) : n(c.getLang("autoupload.errorLoadConfig"))
			}
			return {
				outputRule: function(a) {
					q.each(a.getNodesByTagName("img"), function(a) {
						/\b(loaderrorclass)|(bloaderrorclass)\b/.test(a.getAttr("class")) && a.parentNode.removeChild(a)
					});
					q.each(a.getNodesByTagName("p"), function(a) {
						/\bloadpara\b/.test(a.getAttr("class")) && a.parentNode.removeChild(a)
					})
				},
				bindEvents: {
					defaultOptions: {
						enableDragUpload: !0,
						enablePasteUpload: !0
					},
					ready: function(a) {
						var e = this;
						if (window.FormData && window.FileReader) {
							a = function(a) {
								var b = !1,
									h;
								if (h = "paste" == a.type ? a.clipboardData && a.clipboardData.items && 1 == a.clipboardData.items.length && /^image\//.test(a.clipboardData.items[0].type) ? a.clipboardData.items : null : a.dataTransfer && a.dataTransfer.files ? a.dataTransfer.files : null) {
									for (var d = h.length, g; d--;) g = h[d], g.getAsFile && (g = g.getAsFile()), g && 0 < g.size && (c(g, e), b = !0);
									b && a.preventDefault()
								}
							};
							if (!1 !== e.getOpt("enablePasteUpload")) g.on(e.body, "paste ", a);
							if (!1 !== e.getOpt("enableDragUpload")) g.on(e.body, "drop", a), g.on(e.body, "dragover", function(a) {
								"Files" == a.dataTransfer.types[0] && a.preventDefault()
							});
							else if (t.gecko) g.on(e.body, "drop", function(a) {
								a.dataTransfer && a.dataTransfer.files && a.dataTransfer.files && a.preventDefault()
							});
							q.cssRule("loading", ".loadingclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loading.gif') no-repeat center center transparent;border:1px solid #cccccc;margin-left:1px;height: 22px;width: 22px;}\n.loaderrorclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loaderror.png') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;}", this.document)
						}
					}
				}
			}
		});
		UE.plugin.register("autosave", function() {
			function c(c) {
				var f;
				20 > new Date - e || (c.hasContents() ? (e = new Date, c._saveFlag = null, f = a.body.innerHTML, !1 !== c.fireEvent("beforeautosave", {
					content: f
				}) && (a.setPreferences(b, f), c.fireEvent("afterautosave", {
					content: f
				}))) : b && a.removePreferences(b))
			}
			var a = this,
				e = new Date,
				b = null;
			return {
				defaultOptions: {
					saveInterval: 500,
					enableAutoSave: !0
				},
				bindEvents: {
					ready: function() {
						var c;
						c = a.key ? a.key + "-drafts-data" : (a.container.parentNode.id || "ue-common") + "-drafts-data";
						b = (location.protocol + location.host + location.pathname).replace(/[.:\/]/g, "_") + c
					},
					contentchange: function() {
						a.getOpt("enableAutoSave") && b && (a._saveFlag && window.clearTimeout(a._saveFlag), 0 < a.options.saveInterval ? a._saveFlag = window.setTimeout(function() {
							c(a)
						}, a.options.saveInterval) : c(a))
					}
				},
				commands: {
					clearlocaldata: {
						execCommand: function(c, e) {
							b && a.getPreferences(b) && a.removePreferences(b)
						},
						notNeedUndo: !0,
						ignoreContentChange: !0
					},
					getlocaldata: {
						execCommand: function(c, e) {
							return b ? a.getPreferences(b) || "" : ""
						},
						notNeedUndo: !0,
						ignoreContentChange: !0
					},
					drafts: {
						execCommand: function(c, e) {
							b && (a.body.innerHTML = a.getPreferences(b) || "<p>" + g.fillHtml + "</p>", a.focus(!0))
						},
						queryCommandState: function() {
							return b ? null === a.getPreferences(b) ? -1 : 0 : -1
						},
						notNeedUndo: !0,
						ignoreContentChange: !0
					}
				}
			}
		});
		UE.plugin.register("section", function() {
			function c(a) {
				this.tag = "";
				this.level = -1;
				this.parentSection = this.previousSection = this.nextSection = this.dom = null;
				this.startAddress = [];
				this.endAddress = [];
				this.children = []
			}
			function a(a) {
				var b = new c;
				return q.extend(b, a)
			}
			function e(a, b) {
				for (var c = b, f = 0; f < a.length; f++) {
					if (!c.childNodes) return null;
					c = c.childNodes[a[f]]
				}
				return c
			}
			var b = this;
			return {
				bindMultiEvents: {
					type: "aftersetcontent afterscencerestore",
					handler: function() {
						b.fireEvent("updateSections")
					}
				},
				bindEvents: {
					ready: function() {
						b.fireEvent("updateSections");
						g.on(b.body, "drop paste", function() {
							b.fireEvent("updateSections")
						})
					},
					afterexeccommand: function(a, c) {
						"paragraph" == c && b.fireEvent("updateSections")
					},
					keyup: function(a, b) {
						if (1 != this.selection.getRange().collapsed) this.fireEvent("updateSections");
						else {
							var c = b.keyCode || b.which;
							13 != c && 8 != c && 46 != c || this.fireEvent("updateSections")
						}
					}
				},
				commands: {
					getsections: {
						execCommand: function(b, c) {
							function d(b, c) {
								for (var e, k = null, l, m = b.childNodes, n = 0, r = m.length; n < r; n++) {
									l = m[n];
									a: {
										e = l;
										for (var u = 0; u < f.length; u++) if (f[u](e)) {
											e = u;
											break a
										}
										e = -1
									}
									if (0 <= e) {
										k = h.selection.getRange().selectNode(l).createAddress(!0).startAddress;
										k = a({
											tag: l.tagName,
											title: l.innerText || l.textContent || "",
											level: e,
											dom: l,
											startAddress: q.clone(k, []),
											endAddress: q.clone(k, []),
											children: []
										});
										g.nextSection = k;
										for (l = k.previousSection = g; e <= l.level;) l = l.parentSection;
										k.parentSection = l;
										l.children.push(k);
										k = g = k
									} else 1 === l.nodeType && d(l, c),
									k && k.endAddress[k.endAddress.length - 1]++
								}
							}
							for (var f = c || "h1 h2 h3 h4 h5 h6".split(" "), e = 0; e < f.length; e++)"string" == typeof f[e] ? f[e] = function(a) {
								return function(b) {
									return b.tagName == a.toUpperCase()
								}
							}(f[e]) : "function" != typeof f[e] && (f[e] = function(a) {
								return null
							});
							var h = this,
								g = e = a({
									level: -1,
									title: "root"
								});
							d(h.body, e);
							return e
						},
						notNeedUndo: !0
					},
					movesection: {
						execCommand: function(a, b, c, l) {
							if (b && c && -1 != c.level) {
								c = l ? c.endAddress : c.startAddress;
								a = e(c, this.body);
								var d;
								if (!(d = !c || !a)) {
									d = b.startAddress;
									for (var f = !1, h = !1, r = 0; r < d.length && !(r >= c.length); r++) if (c[r] > d[r]) {
										f = !0;
										break
									} else if (c[r] < d[r]) break;
									for (r = 0; r < b.endAddress.length && !(r >= c.length); r++) if (c[r] < d[r]) {
										h = !0;
										break
									} else if (c[r] > d[r]) break;
									d = f && h
								}
								if (!d) {
									c = e(b.startAddress, this.body);
									b = e(b.endAddress, this.body);
									if (l) for (l = b; l && !(g.getPosition(c, l) & g.POSITION_FOLLOWING);) {
										d = l.previousSibling;
										g.insertAfter(a, l);
										if (l == c) break;
										l = d
									} else for (l = c; l && !(g.getPosition(l, b) & g.POSITION_FOLLOWING);) {
										d = l.nextSibling;
										a.parentNode.insertBefore(l, a);
										if (l == b) break;
										l = d
									}
									this.fireEvent("updateSections")
								}
							}
						}
					},
					deletesection: {
						execCommand: function(a, b, c) {
							function d(a) {
								for (var b = f.body, c = 0; c < a.length; c++) {
									if (!b.childNodes) return null;
									b = b.childNodes[a[c]]
								}
								return b
							}
							var f = this;
							if (b) {
								a = d(b.startAddress);
								b = d(b.endAddress);
								if (c) g.remove(a);
								else for (; a && g.inDoc(b, f.document) && !(g.getPosition(a, b) & g.POSITION_FOLLOWING);) c = a.nextSibling, g.remove(a), a = c;
								f.fireEvent("updateSections")
							}
						}
					},
					selectsection: {
						execCommand: function(a, b) {
							if (!b && !b.dom) return !1;
							var c = this.selection.getRange(),
								f = {
									startAddress: q.clone(b.startAddress, []),
									endAddress: q.clone(b.endAddress, [])
								};
							f.endAddress[f.endAddress.length - 1]++;
							c.moveToAddress(f).select().scrollToView();
							return !0
						},
						notNeedUndo: !0
					},
					scrolltosection: {
						execCommand: function(a, b) {
							if (!b && !b.dom) return !1;
							var c = this.selection.getRange(),
								f = {
									startAddress: b.startAddress,
									endAddress: b.endAddress
								};
							f.endAddress[f.endAddress.length - 1]++;
							c.moveToAddress(f).scrollToView();
							return !0
						},
						notNeedUndo: !0
					}
				}
			}
		});
		UE.plugin.register("simpleupload", function() {
			function c() {
				var c = b.offsetWidth || 20,
					h = b.offsetHeight || 20,
					d = document.createElement("iframe"),
					l = "display:block;width:" + c + "px;height:" + h + "px;overflow:hidden;border:0;margin:0;padding:0;position:absolute;top:0;left:0;filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity: 0;opacity: 0;cursor:pointer;";
				g.on(d, "load", function() {
					var b = (+new Date).toString(36),
						f, m, r;
					m = d.contentDocument || d.contentWindow.document;
					r = m.body;
					f = m.createElement("div");
					var u = '<form id="edui_form_' + b + '" target="edui_iframe_' + b + '" method="POST" enctype="multipart/form-data" action="' + a.getOpt("serverUrl") + '" style="' + l + '">';
					if (a.options.uploadFormData && "object" == typeof a.options.uploadFormData) for (var v in a.options.uploadFormData) u += '<input type="hidden" name="' + v + '" value="' + a.options.uploadFormData[v] + '">';
					u = u + '<input id="edui_input_' + b + '" type="file" accept="image/gif,image/jpg,image/jpeg,image/png"  name="' + a.options.imageFieldName + '" style="' + l + '">';
					f.innerHTML = u + '</form><iframe id="edui_iframe_' + b + '" name="edui_iframe_' + b + '" style="display:none;width:0;height:0;border:0;margin:0;padding:0;position:absolute;"></iframe>';
					f.className = "edui-" + a.options.theme;
					f.id = a.ui.id + "_iframeupload";
					r.style.cssText = l;
					r.style.width = c + "px";
					r.style.height = h + "px";
					r.appendChild(f);
					r.parentNode && (r.parentNode.style.width = c + "px", r.parentNode.style.height = c + "px");
					var w = m.getElementById("edui_form_" + b),
						x = m.getElementById("edui_input_" + b),
						p = m.getElementById("edui_iframe_" + b);
					g.on(x, "change", function() {
						function b() {
							try {
								var f, e, k, h = (p.contentDocument || p.contentWindow.document).body;
								e = q.str2json(h.innerText || h.textContent || "");
								f = a.options.imageUrlPrefix + e.url;
								"SUCCESS" == e.state && e.url ? (k = a.document.getElementById(d), g.removeClasses(k, "loadingclass"), k.setAttribute("src", f), k.setAttribute("_src", f), k.setAttribute("alt", e.original || ""), e.aid && (k.setAttribute("aid", "attachimg_" + e.aid), k.setAttribute("id", "aimg_" + e.aid)), a.options.uploadCallback && "function" == typeof a.options.uploadCallback && a.options.uploadCallback(e), k.removeAttribute("id")) : c && c(e.state)
							} catch (oa) {
								c && c(a.getLang("simpleupload.loadError"))
							}
							w.reset();
							g.un(p, "load", b)
						}
						function c(b) {
							if (d) {
								var c = a.document.getElementById(d);
								c && g.remove(c);
								a.fireEvent("showmessage", {
									id: d,
									content: b,
									type: "error",
									timeout: 4E3
								})
							}
						}
						if (x.value) {
							var d = "loading_" + (+new Date).toString(36),
								f = q.serializeParam(a.queryCommandValue("serverparam")) || "",
								e = a.getActionUrl(a.getOpt("imageActionName")),
								k = a.getOpt("imageAllowFiles");
							a.focus();
							a.execCommand("inserthtml", '<img class="loadingclass" id="' + d + '" src="' + a.options.themePath + a.options.theme + '/images/spacer.gif">');
							if (a.getOpt("imageActionName")) {
								var h = x.value,
									h = h ? h.substr(h.lastIndexOf(".")) : "";
								!h || k && -1 == (k.join("") + ".").indexOf(h.toLowerCase() + ".") ? c(a.getLang("simpleupload.exceedTypeError")) : (k = x.files[0]) && k.size > a.getOpt("imageMaxSize") ? (x.value = "", c(a.getLang("simpleupload.exceedSizeError"))) : (g.on(p, "load", b), w.action = q.formatUrl(e + (-1 == e.indexOf("?") ? "?domain=1&" : "&domain=1&") + f), w.submit())
							} else errorHandler(a.getLang("autoupload.errorLoadConfig"))
						}
					});
					var t;
					a.addListener("selectionchange", function() {
						clearTimeout(t);
						t = setTimeout(function() {
							-1 == a.queryCommandState("simpleupload") ? x.disabled = "disabled" : x.disabled = !1
						}, 400)
					});
					e = !0
				});
				d.style.cssText = l;
				b.appendChild(d)
			}
			var a = this,
				e = !1,
				b;
			return {
				bindEvents: {
					ready: function() {
						q.cssRule("loading", ".loadingclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loading.gif') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;}\n.loaderrorclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loaderror.png') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;}", this.document)
					},
					simpleuploadbtnready: function(f, e) {
						b = e;
						a.afterConfigReady(c)
					}
				},
				outputRule: function(a) {
					q.each(a.getNodesByTagName("img"), function(a) {
						/\b(loaderrorclass)|(bloaderrorclass)\b/.test(a.getAttr("class")) && a.parentNode.removeChild(a)
					})
				},
				commands: {
					simpleupload: {
						queryCommandState: function() {
							return e ? 0 : -1
						}
					}
				}
			}
		});
		UE.plugin.register("serverparam", function() {
			var c = {};
			return {
				commands: {
					serverparam: {
						execCommand: function(a, e, b) {
							void 0 === e || null === e ? c = {} : q.isString(e) ? void 0 === b || null === b ? delete c[e] : c[e] = b : q.isObject(e) ? q.extend(c, e, !1) : q.isFunction(e) && q.extend(c, e(), !1)
						},
						queryCommandValue: function() {
							return c || {}
						}
					}
				}
			}
		});
		UE.plugin.register("uploadword", function() {
			function c() {
				var c = b.offsetWidth || 20,
					k = b.offsetHeight || 20,
					h = document.createElement("iframe"),
					g = "display:block;width:" + c + "px;height:" + k + "px;overflow:hidden;border:0;margin:0;padding:0;position:absolute;top:0;left:0;filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity: 0;opacity: 0;cursor:pointer;";
				d.on(h, "load", function() {
					var b = (+new Date).toString(16),
						l, m, n, x = "//" + a.getOpt("plat_host") + "/uploadfiles/wordToHtml?appkey=" + a.getOpt("appkey");
					m = h.contentDocument || h.contentWindow.document;
					0 < m.domain.indexOf("135editor.com") && (m.domain = "135editor.com");
					n = m.body;
					l = m.createElement("div");
					l.innerHTML = '<form id="edui_form_' + b + '" target="edui_iframe_' + b + '" method="POST" enctype="multipart/form-data" action="' + x + '" style="' + g + '"><input id="edui_input_' + b + '" title="Word文档导入" type="file" accept="text/plain,application/msword,application/vnd.ms-excel,application/vnd.ms-powerpoint,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/rtf" name="textfile" style="' + g + '"></form><iframe id="edui_iframe_' + b + '" name="edui_iframe_' + b + '" style="display:none;width:0;height:0;border:0;margin:0;padding:0;position:absolute;"></iframe>';
					l.className = "edui-" + a.options.theme;
					l.id = a.ui.id + "_iframeupload";
					n.style.cssText = g;
					n.style.width = c + "px";
					n.style.height = k + "px";
					n.appendChild(l);
					n.parentNode && (n.parentNode.style.width = c + "px", n.parentNode.style.height = c + "px");
					var q = m.getElementById("edui_form_" + b),
						p = m.getElementById("edui_input_" + b),
						t = m.getElementById("edui_iframe_" + b),
						b = t.contentDocument || t.contentWindow.document;
					0 < b.domain.indexOf("135editor.com") && (b.domain = "135editor.com");
					d.on(p, "click", function(b) {
						if (sso && !sso.check_userlogin()) return b.stopPropagation(), b.preventDefault(), !1;
						"" != a.getContentTxt() && (showErrorMessage("编辑区域内容不为空，请先保存内容并清空编辑区域后再上传导入文档"), b.stopPropagation(), b.preventDefault())
					});
					d.on(p, "change", function() {
						function b() {
							var k = "",
								k = (t.contentDocument || t.contentWindow.document).body,
								k = k.innerText || k.textContent || "";
							try {
								var h = (new Function("return " + k))();
								if ("SUCCESS" == h.state && h.content) {
									h.content = h.content.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
									if (e) {
										var g = a.document.getElementById(e);
										g && d.remove(g)
									}
									var l = h.content,
										m = $("<div>" + l + "</div>");
									m.find("li,colgroup,a").each(function() {
										"" == $.trim($(this).text()) && $(this).remove()
									});
									m.find("span").removeAttr("lang");
									var n = $(m).html(),
										n = n.replace(/http:\/\/mmbiz.qpic.cn/g, "https://mmbiz.qpic.cn"),
										n = n.replace(/https:\/\/mmbiz.qlogo.cn/g, "https://mmbiz.qpic.cn");
									a.setContent(n);
									l = a.getContent();
									l = strip_stack_span(l);
									a.setContent(l);
									f.extend(a.options.autotypeset, {
										mergeEmptyline: !0,
										removeClass: !1,
										removeEmptyline: !1,
										textAlign: !1,
										imageBlockLine: !1,
										pasteFilter: !1,
										clearFontSize: !1,
										clearFontFamily: !1,
										removeEmptyNode: !1,
										indent: !1,
										indentValue: "2em",
										bdc2sb: !1,
										tobdc: !1
									});
									a.execCommand("autotypeset")
								} else c && c(h.state)
							} catch (qa) {
								c && c(a.getLang("simpleupload.loadError"))
							}
							q.reset();
							d.un(t, "load", b)
						}
						function c(b) {
							if (e) {
								var c = a.document.getElementById(e);
								c && d.remove(c);
								a.fireEvent("showmessage", {
									id: e,
									content: b,
									type: "error",
									timeout: 6E3
								})
							}
						}
						if (p.value) {
							var e = "loading_" + (+new Date).toString(16),
								k = f.serializeParam(a.queryCommandValue("serverparam")) || "",
								h = "//" + a.getOpt("plat_host") + "/uploadfiles/wordToHtml?return=htmlspecialchars&appkey=" + a.getOpt("appkey"),
								g = ".doc .docx .ppt .pptx .xls .xlsx .pdf .rtf .txt".split(" "),
								l = p.files[0];
							l && 5 < Math.round(100 * l.size / 1048576) / 100 ? showErrorMessage("文档大小超过了5M,请选择较小的文档") : (a.focus(), a.execCommand("inserthtml", '<p id="' + e + '"><img class="loadingclass"  src="' + a.options.themePath + a.options.theme + '/images/spacer.gif" title="' + (a.getLang("simpleupload.loading") || "") + '" >文档处理时间较长，请耐心等待...</p>'), a.getOpt("imageActionName") ? (l = (l = p.value) ? l.substr(l.lastIndexOf(".")) : "", !l || g && -1 == (g.join("") + ".").indexOf(l.toLowerCase() + ".") ? c(a.getLang("simpleupload.exceedTypeError")) : (d.on(t, "load", b), q.action = f.formatUrl(h + (-1 == h.indexOf("?") ? "?" : "&") + k), q.submit())) : errorHandler(a.getLang("autoupload.errorLoadConfig")))
						}
					});
					var y;
					a.addListener("selectionchange", function() {
						clearTimeout(y);
						y = setTimeout(function() {
							-1 == a.queryCommandState("uploadword") ? p.disabled = "disabled" : p.disabled = !1
						}, 400)
					});
					e = !0
				});
				h.style.cssText = g;
				b.appendChild(h)
			}
			var a = this,
				e = !1,
				b, f = p.editor.utils,
				h = p.editor.ui,
				d = p.editor.dom.domUtils;
			h.uploadword = function(a) {
				var b = new h.Button({
					className: "edui-for-uploadword",
					title: "文档导入",
					onclick: function() {},
					theme: a.options.theme,
					showText: !1
				});
				h.buttons.uploadword = b;
				a.addListener("ready", function() {
					var c = b.getDom("body").children[0];
					a.fireEvent("uploadwordbtnready", c)
				});
				a.addListener("selectionchange", function(c, d, f) {
					c = a.queryCommandState("uploadword"); - 1 == c ? (b.setDisabled(!0), b.setChecked(!1)) : f || (b.setDisabled(!1), b.setChecked(c))
				});
				return b
			};
			return {
				bindEvents: {
					ready: function() {
						f.cssRule("loading", ".loadingclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loading.gif') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;}\n.loaderrorclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loaderror.png') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;}", this.document)
					},
					uploadwordbtnready: function(d, f) {
						b = f;
						a.afterConfigReady(c)
					}
				},
				outputRule: function(a) {
					f.each(a.getNodesByTagName("img"), function(a) {
						/\b(loaderrorclass)|(bloaderrorclass)\b/.test(a.getAttr("class")) && a.parentNode.removeChild(a)
					})
				},
				commands: {
					uploadword: {
						queryCommandState: function() {
							return e ? 0 : -1
						}
					}
				}
			}
		});
		UE.plugins.catchremoteimage = function() {
			var c = this,
				a = UE.ajax;
			!1 !== c.options.catchRemoteImageEnable && (c.setOpt({
				catchRemoteImageEnable: !1
			}), c.addListener("afterpaste", function() {
				c.fireEvent("catchRemoteImage")
			}), c.addListener("catchRemoteImage", function() {
				function e(b, f) {
					var e = q.serializeParam(c.queryCommandValue("serverparam")) || "",
						e = q.formatUrl(h + (-1 == h.indexOf("?") ? "?" : "&") + e),
						g = q.isCrossDomainUrl(e),
						m = [];
					m.push(b);
					g = {
						method: "POST",
						dataType: g ? "jsonp" : "",
						timeout: 6E4,
						onsuccess: function(a) {
							try {
								var e = void 0 !== a.state ? a : eval("(" + a.responseText + ")")
							} catch (B) {
								return
							}
							var h, g = e.list;
							if (g && 0 < g.length) {
								for (e = 0; e < g.length; e++) if (h = g[e], a = f.getAttribute("style"), (b == h.source || b == h.source.replace("&amp;", "&")) && "SUCCESS" == h.state) {
									e = d + h.url;
									f.setAttribute("style", a.replace(b, e));
									break
								}
								n++;
								c.fireEvent("showmessage", {
									id: "catchimage-msg",
									content: "有" + n + "张远程图片成功保存，共" + k + "张",
									type: "success",
									timeout: 3E3
								})
							}
						},
						onerror: function() {
							c.fireEvent("catchremoteerror")
						}
					};
					g[l] = m;
					a.request(e, g)
				}
				function b(b, d) {
					var f = q.serializeParam(c.queryCommandValue("serverparam")) || "",
						f = q.formatUrl(h + (-1 == h.indexOf("?") ? "?" : "&") + f),
						e = {
							method: "POST",
							dataType: q.isCrossDomainUrl(f) ? "jsonp" : "",
							timeout: 6E4,
							onsuccess: d.success,
							onerror: d.error
						};
					e[l] = b;
					a.request(f, e)
				}
				for (var f = c.getOpt("catcherLocalDomain"), h = c.getActionUrl("catchimage"), d = c.getOpt("catcherUrlPrefix"), l = c.getOpt("catcherFieldName"), k = 0, n = 0, m = function(a, b) {
						if (-1 != a.indexOf(location.host) || /(^\.)|(^\/)/.test(a)) return !0;
						if (b) for (var c = 0, d; d = b[c++];) if (-1 !== a.indexOf(d)) return !0;
						return !1
					}, r = g.getElementsByTagName(c.document, "section"), u = 0, v; v = r[u++];) {
					var w = "",
						x = v.getAttribute("style");
					if (x) {
						var x = x.replace("&amp;", "&"),
							p = /['|"]\s*(http[s]?:\/\/[^;\)]+?)['|"]/i;
						(p = x.match(p)) && p[0] ? w = p[1] : (p = /\(\s*(http[s]?:\/\/[^;\)\s]+?)\)/i, (p = x.match(p)) && p[0] && (w = p[1]));
						"" != w && /^(https?|ftp):/i.test(w) && !m(w, f) && (k++, e(w, v))
					}
				}
				for (var r = [], t = g.getElementsByTagName(c.document, "img"), u = 0; v = t[u++];) v.getAttribute("word_img") || (v.removeAttribute("data-src"), v = v.getAttribute("_src") || v.src || "", "" != v && /^(https?|ftp):/i.test(v) && !m(v, f) && r.push(v));
				k += r.length;
				if (r.length) for (f = {
					success: function(a) {
						try {
							var b = void 0 !== a.state ? a : eval("(" + a.responseText + ")")
						} catch (I) {
							return
						}
						var f, e, h, l = b.list;
						if (l && 0 < l.length) {
							for (a = 0; a < t.length; a++) for (b = t[a], h = b.getAttribute("_src") || b.src || "", f = 0; f < l.length; f++) if (e = l[f], (h == e.source || h.replace("&amp;", "&") == e.source.replace("&amp;", "&")) && "SUCCESS" == e.state) {
								f = d + e.url;
								g.setAttributes(b, {
									src: f,
									_src: f
								});
								break
							}
							n++;
							c.fireEvent("showmessage", {
								id: "catchimage-msg",
								content: "有" + n + "张远程图片成功保存，共" + k + "张",
								type: "success",
								timeout: 3E3
							})
						}
					},
					error: function() {
						c.fireEvent("catchremoteerror")
					}
				}, u = 0; u < r.length; u++) m = [], m.push(r[u]), b(m, f);
				c.getOpt("open_editor") && 0 < k && c.fireEvent("showmessage", {
					id: "catchimage-msg",
					content: "有" + k + "张远程图片需要保存",
					type: "success",
					timeout: 3E3
				})
			}))
		};
		p = p || {};
		p.editor = p.editor || {};
		UE.ui = p.editor.ui = {};
		(function() {
			function c() {
				var a = document.getElementById("edui_fixedlayer");
				h.setViewportOffset(a, {
					left: 0,
					top: 0
				})
			}
			var a = p.editor.browser,
				e = p.editor.dom.domUtils,
				b = window.$EDITORUI = {},
				f = 0,
				h = p.editor.ui.uiUtils = {
					uid: function(a) {
						return a ? a.ID$EDITORUI || (a.ID$EDITORUI = ++f) : ++f
					},
					hook: function(a, b) {
						var c;
						a && a._callbacks ? c = a : (c = function() {
							var b;
							a && (b = a.apply(this, arguments));
							for (var d = c._callbacks, f = d.length; f--;) {
								var e = d[f].apply(this, arguments);
								void 0 === b && (b = e)
							}
							return b
						}, c._callbacks = []);
						c._callbacks.push(b);
						return c
					},
					createElementByHtml: function(a) {
						var b = document.createElement("div");
						b.innerHTML = a;
						b = b.firstChild;
						b.parentNode.removeChild(b);
						return b
					},
					getViewportElement: function() {
						return a.ie && a.quirks ? document.body : document.documentElement
					},
					getClientRect: function(a) {
						var b;
						try {
							b = a.getBoundingClientRect()
						} catch (m) {
							b = {
								left: 0,
								top: 0,
								height: 0,
								width: 0
							}
						}
						for (var c = {
							left: Math.round(b.left),
							top: Math.round(b.top),
							height: Math.round(b.bottom - b.top),
							width: Math.round(b.right - b.left)
						}, d;
						(d = a.ownerDocument) !== document && (a = e.getWindow(d).frameElement);) b = a.getBoundingClientRect(), c.left += b.left, c.top += b.top;
						c.bottom = c.top + c.height;
						c.right = c.left + c.width;
						return c
					},
					getViewportRect: function() {
						var a = h.getViewportElement(),
							b = (window.innerWidth || a.clientWidth) | 0,
							a = (window.innerHeight || a.clientHeight) | 0;
						return {
							left: 0,
							top: 0,
							height: a,
							width: b,
							bottom: a,
							right: b
						}
					},
					setViewportOffset: function(a, b) {
						var c = h.getFixedLayer();
						a.parentNode === c ? (a.style.left = b.left + "px", a.style.top = b.top + "px") : e.setViewportOffset(a, b)
					},
					getEventOffset: function(a) {
						var b = h.getClientRect(a.target || a.srcElement);
						a = h.getViewportOffsetByEvent(a);
						return {
							left: a.left - b.left,
							top: a.top - b.top
						}
					},
					getViewportOffsetByEvent: function(a) {
						var b = a.target || a.srcElement,
							c = e.getWindow(b).frameElement;
						a = {
							left: a.clientX,
							top: a.clientY
						};
						c && b.ownerDocument !== document && (b = h.getClientRect(c), a.left += b.left, a.top += b.top);
						return a
					},
					setGlobal: function(a, c) {
						b[a] = c;
						return '$EDITORUI["' + a + '"]'
					},
					unsetGlobal: function(a) {
						delete b[a]
					},
					copyAttributes: function(b, c) {
						for (var d = c.attributes, f = d.length; f--;) {
							var h = d[f];
							"style" == h.nodeName || "class" == h.nodeName || a.ie && !h.specified || b.setAttribute(h.nodeName, h.nodeValue)
						}
						c.className && e.addClass(b, c.className);
						c.style.cssText && (b.style.cssText += ";" + c.style.cssText)
					},
					removeStyle: function(a, b) {
						if (a.style.removeProperty) a.style.removeProperty(b);
						else if (a.style.removeAttribute) a.style.removeAttribute(b);
						else throw "";
					},
					contains: function(a, b) {
						return a && b && (a === b ? !1 : a.contains ? a.contains(b) : a.compareDocumentPosition(b) & 16)
					},
					startDrag: function(a, b, c) {
						function d(a) {
							b.ondragmove(a.clientX - f, a.clientY - e, a);
							a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
						}
						c = c || document;
						var f = a.clientX,
							e = a.clientY;
						if (c.addEventListener) {
							var k = function(a) {
									c.removeEventListener("mousemove", d, !0);
									c.removeEventListener("mouseup", k, !0);
									window.removeEventListener("mouseup", k, !0);
									b.ondragstop()
								};
							c.addEventListener("mousemove", d, !0);
							c.addEventListener("mouseup", k, !0);
							window.addEventListener("mouseup", k, !0);
							a.preventDefault()
						} else {
							var h = function() {
									g.releaseCapture();
									g.detachEvent("onmousemove", d);
									g.detachEvent("onmouseup", h);
									g.detachEvent("onlosecaptrue", h);
									b.ondragstop()
								},
								g = a.srcElement;
							g.setCapture();
							g.attachEvent("onmousemove", d);
							g.attachEvent("onmouseup", h);
							g.attachEvent("onlosecaptrue", h);
							a.returnValue = !1
						}
						b.ondragstart()
					},
					getFixedLayer: function() {
						var b = document.getElementById("edui_fixedlayer");
						null == b && (b = document.createElement("div"), b.id = "edui_fixedlayer", document.body.appendChild(b), a.ie && 8 >= a.version ? (b.style.position = "absolute", e.on(window, "scroll", c), e.on(window, "resize", p.editor.utils.defer(c, 0, !0)), setTimeout(c)) : b.style.position = "fixed", b.style.left = "0", b.style.top = "0", b.style.width = "0", b.style.height = "0");
						return b
					},
					makeUnselectable: function(b) {
						if (a.opera || a.ie && 9 > a.version) {
							if (b.unselectable = "on", b.hasChildNodes()) for (var c = 0; c < b.childNodes.length; c++) 1 == b.childNodes[c].nodeType && h.makeUnselectable(b.childNodes[c])
						} else void 0 !== b.style.MozUserSelect ? b.style.MozUserSelect = "none" : void 0 !== b.style.WebkitUserSelect ? b.style.WebkitUserSelect = "none" : void 0 !== b.style.KhtmlUserSelect && (b.style.KhtmlUserSelect = "none")
					}
				}
		})();
		(function() {
			var c = p.editor.utils,
				a = p.editor.ui.uiUtils,
				e = p.editor.EventBase,
				b = p.editor.ui.UIBase = function() {};
			b.prototype = {
				className: "",
				uiName: "",
				initOptions: function(b) {
					for (var c in b) this[c] = b[c];
					this.id = this.id || "edui" + a.uid()
				},
				initUIBase: function() {
					this._globalKey = c.unhtml(a.setGlobal(this.id, this))
				},
				render: function(b) {
					for (var c = this.renderHtml(), c = a.createElementByHtml(c), d = g.getElementsByTagName(c, "*"), f = "edui-" + (this.theme || this.editor.options.theme), e = document.getElementById("edui_fixedlayer"), n = 0, m; m = d[n++];) g.addClass(m, f);
					g.addClass(c, f);
					e && (e.className = "", g.addClass(e, f));
					d = this.getDom();
					null != d ? (d.parentNode.replaceChild(c, d), a.copyAttributes(c, d)) : ("string" == typeof b && (b = document.getElementById(b)), b = b || a.getFixedLayer(), g.addClass(b, f), b.appendChild(c));
					this.postRender()
				},
				getDom: function(a) {
					return a ? document.getElementById(this.id + "_" + a) : document.getElementById(this.id)
				},
				postRender: function() {
					this.fireEvent("postrender")
				},
				getHtmlTpl: function() {
					return ""
				},
				formatHtml: function(a) {
					var b = "edui-" + this.uiName;
					return a.replace(/##/g, this.id).replace(/%%-/g, this.uiName ? b + "-" : "").replace(/%%/g, (this.uiName ? b : "") + " " + this.className).replace(/\$\$/g, this._globalKey)
				},
				renderHtml: function() {
					return this.formatHtml(this.getHtmlTpl())
				},
				dispose: function() {
					var b = this.getDom();
					b && p.editor.dom.domUtils.remove(b);
					a.unsetGlobal(this.id)
				}
			};
			c.inherits(b, e)
		})();
		(function() {
			var c = p.editor.utils,
				a = p.editor.ui.UIBase,
				e = p.editor.ui.Separator = function(a) {
					this.initOptions(a);
					this.initSeparator()
				};
			e.prototype = {
				uiName: "separator",
				initSeparator: function() {
					this.initUIBase()
				},
				getHtmlTpl: function() {
					return '<div id="##" class="edui-box %%"></div>'
				}
			};
			c.inherits(e, a)
		})();
		(function() {
			var c = p.editor.utils,
				a = p.editor.dom.domUtils,
				e = p.editor.ui.UIBase,
				b = p.editor.ui.uiUtils,
				f = p.editor.ui.Mask = function(a) {
					this.initOptions(a);
					this.initUIBase()
				};
			f.prototype = {
				getHtmlTpl: function() {
					return '<div id="##" class="edui-mask %%" onclick="return $$._onClick(event, this);" onmousedown="return $$._onMouseDown(event, this);"></div>'
				},
				postRender: function() {
					var b = this;
					a.on(window, "resize", function() {
						setTimeout(function() {
							b.isHidden() || b._fill()
						})
					})
				},
				show: function(a) {
					this._fill();
					this.getDom().style.display = "";
					this.getDom().style.zIndex = a
				},
				hide: function() {
					this.getDom().style.display = "none";
					this.getDom().style.zIndex = ""
				},
				isHidden: function() {
					return "none" == this.getDom().style.display
				},
				_onMouseDown: function() {
					return !1
				},
				_onClick: function(a, b) {
					this.fireEvent("click", a, b)
				},
				_fill: function() {
					var a = this.getDom(),
						c = b.getViewportRect();
					a.style.width = c.width + "px";
					a.style.height = c.height + "px"
				}
			};
			c.inherits(f, e)
		})();
		(function() {
			function c(a, b) {
				for (var c = 0; c < d.length; c++) {
					var f = d[c];
					if (!f.isHidden() && !1 !== f.queryAutoHide(b)) {
						if (a && /scroll/ig.test(a.type) && "edui-wordpastepop" == f.className) return;
						f.hide()
					}
				}
				d.length && f.editor.fireEvent("afterhidepop")
			}
			var a = p.editor.utils,
				e = p.editor.ui.uiUtils,
				b = p.editor.dom.domUtils,
				f = p.editor.ui.UIBase,
				h = p.editor.ui.Popup = function(a) {
					this.initOptions(a);
					this.initPopup()
				},
				d = [];
			h.postHide = c;
			var g = ["edui-anchor-topleft", "edui-anchor-topright", "edui-anchor-bottomleft", "edui-anchor-bottomright"];
			h.prototype = {
				SHADOW_RADIUS: 5,
				content: null,
				_hidden: !1,
				autoRender: !0,
				canSideLeft: !0,
				canSideUp: !0,
				initPopup: function() {
					this.initUIBase();
					d.push(this)
				},
				getHtmlTpl: function() {
					return '<div id="##" class="edui-popup %%"> <div id="##_body" class="edui-popup-body"> <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="about:blank"></iframe> <div class="edui-shadow"></div> <div id="##_content" class="edui-popup-content">' + this.getContentHtmlTpl() + "  </div> </div></div>"
				},
				getContentHtmlTpl: function() {
					return this.content ? "string" == typeof this.content ? this.content : this.content.renderHtml() : ""
				},
				_UIBase_postRender: f.prototype.postRender,
				postRender: function() {
					this.content instanceof f && this.content.postRender();
					if (this.captureWheel && !this.captured) {
						this.captured = !0;
						var a = (document.documentElement.clientHeight || document.body.clientHeight) - 80,
							c = this.getDom().offsetHeight,
							d = e.getClientRect(this.combox.getDom()).top,
							h = this.getDom("content"),
							g = this.getDom("body").getElementsByTagName("iframe"),
							l = this;
						for (g.length && (g = g[0]); d + c > a;) c -= 30;
						h.style.height = c + "px";
						g && (g.style.height = c + "px");
						if (window.XMLHttpRequest) b.on(h, "onmousewheel" in document.body ? "mousewheel" : "DOMMouseScroll", function(a) {
							a.preventDefault ? a.preventDefault() : a.returnValue = !1;
							h.scrollTop = a.wheelDelta ? h.scrollTop - a.wheelDelta / 120 * 60 : h.scrollTop - a.detail / -3 * 60
						});
						else b.on(this.getDom(), "mousewheel", function(a) {
							a.returnValue = !1;
							l.getDom("content").scrollTop -= a.wheelDelta / 120 * 60
						})
					}
					this.fireEvent("postRenderAfter");
					this.hide(!0);
					this._UIBase_postRender()
				},
				_doAutoRender: function() {
					!this.getDom() && this.autoRender && this.render()
				},
				mesureSize: function() {
					var a = this.getDom("content");
					return e.getClientRect(a)
				},
				fitSize: function() {
					if (this.captureWheel && this.sized) return this.__size;
					this.sized = !0;
					var a = this.getDom("body");
					a.style.width = "";
					a.style.height = "";
					var b = this.mesureSize();
					if (this.captureWheel) {
						a.style.width = -(-20 - b.width) + "px";
						var c = parseInt(this.getDom("content").style.height, 10);
						!window.isNaN(c) && (b.height = c)
					} else a.style.width = b.width + "px";
					a.style.height = b.height + "px";
					this.__size = b;
					this.captureWheel && (this.getDom("content").style.overflow = "auto");
					return b
				},
				showAnchor: function(a, b) {
					this.showAnchorRect(e.getClientRect(a), b)
				},
				showAnchorRect: function(a, c, d) {
					this._doAutoRender();
					var f = e.getViewportRect();
					this.getDom().style.visibility = "hidden";
					this._show();
					d = this.fitSize();
					var k;
					c ? (c = this.canSideLeft && a.right + d.width > f.right && a.left > d.width, f = this.canSideUp && a.top + d.height > f.bottom && a.bottom > d.height, k = c ? a.left - d.width : a.right, a = f ? a.bottom - d.height : a.top) : (c = this.canSideLeft && a.right + d.width > f.right && a.left > d.width, f = this.canSideUp && a.top + d.height > f.bottom && a.bottom > d.height, k = c ? a.right - d.width : a.left, a = f ? a.top - d.height : a.bottom);
					d = this.getDom();
					e.setViewportOffset(d, {
						left: k,
						top: a + 5
					});
					b.removeClasses(d, g);
					d.className += " " + g[2 * (f ? 1 : 0) + (c ? 1 : 0)];
					this.editor && (d.style.zIndex = 1 * this.editor.container.style.zIndex + 10, p.editor.ui.uiUtils.getFixedLayer().style.zIndex = d.style.zIndex - 1);
					this.getDom().style.visibility = "visible"
				},
				showAt: function(a) {
					var b = a.left;
					a = a.top;
					this.showAnchorRect({
						left: b,
						top: a,
						right: b,
						bottom: a,
						height: 0,
						width: 0
					}, !1, !0)
				},
				_show: function() {
					this._hidden && (this.getDom().style.display = "", this._hidden = !1, this.fireEvent("show"))
				},
				isHidden: function() {
					return this._hidden
				},
				show: function() {
					this._doAutoRender();
					this._show()
				},
				hide: function(a) {
					!this._hidden && this.getDom() && (this.getDom().style.display = "none", this._hidden = !0, a || this.fireEvent("hide"))
				},
				queryAutoHide: function(a) {
					return !a || !e.contains(this.getDom(), a)
				}
			};
			a.inherits(h, f);
			b.on(document, "mousedown", function(a) {
				c(a, a.target || a.srcElement)
			});
			b.on(window, "scroll", function(a, b) {
				c(a, b)
			})
		})();
		(function() {
			var c = p.editor.utils,
				a = p.editor.ui.UIBase,
				e = p.editor.ui.ColorPicker = function(a) {
					this.initOptions(a);
					this.noColorText = this.noColorText || this.editor.getLang("clearColor");
					this.initUIBase();
					a = this.storekey = "__ue_recentlycolor_" + (a.storekey || "");
					this.recentlyColor = a = (a = this.editor.getPreferences(a)) ? a.split(",").slice(0, b) : ["#000"]
				},
				b = 9;
			e.prototype = {
				getHtmlTpl: function() {
					var a = this.noColorText,
						b = this.editor,
						c = '<div id="##" class="edui-colorpicker %%"><div class="ue_colorpicker_hd">' + b.getLang("recentlyColor") + '</div><div class="ue_colorpicker_bd" onclick="return $$._onRecentClick(event, this);" id="##_recently_color" >',
						e = this.recentlyColor;
					if (e && 0 < e.length) for (var g = 0, m = e.length; m > g; g++) var r = e[g].substr(1),
						c = c + ('<span onclick="return false;" title="#' + r + '" data-color="#' + r + '" class="ue_colorpicker_square" style="background-color:#' + r + '"></span>');
					c = c + "</div>" + ('<div class="edui-colorpicker-topbar edui-clearfix"><div unselectable="on" id="##_preview" class="edui-colorpicker-preview"></div><div unselectable="on" class="edui-colorpicker-nocolor" onclick="$$._onPickNoColor(event, this);">' + a + '</div></div><table  class="edui-box" style="border-collapse: collapse;" onmouseover="$$._onTableOver(event, this);" onmouseout="$$._onTableOut(event, this);" onclick="return $$._onTableClick(event, this);" cellspacing="0" cellpadding="0"><tr style="border-bottom: 1px solid #ddd;font-size: 13px;line-height: 25px;color:#8d8d8d;padding-top: 2px"><td colspan="10">' + b.getLang("themeColor") + '</td> </tr><tr class="edui-colorpicker-tablefirstrow" >');
					for (a = 0; a < f.length; a++) a && 0 === a % 10 && (c += "</tr>" + (60 == a ? '<tr style="border-bottom: 1px solid #ddd;font-size: 13px;line-height: 25px;color:#8d8d8d;"><td colspan="10">' + b.getLang("standardColor") + "</td></tr>" : "") + "<tr" + (60 == a ? ' class="edui-colorpicker-tablefirstrow"' : "") + ">"), c += 70 > a ? '<td style="padding: 0 2px;"><a hidefocus title="' + f[a] + '" onclick="return false;" href="javascript:" unselectable="on" class="edui-box edui-colorpicker-colorcell" data-color="#' + f[a] + '" style="background-color:#' + f[a] + ";border:solid #ccc;" + (10 > a || 60 <= a ? "border-width:1px;" : 10 <= a && 20 > a ? "border-width:1px 1px 0 1px;" : "border-width:0 1px 0 1px;") + '"></a></td>' : "";
					return c = c + "</tr></table></div>" + ('<div class="ue_colorpicker_toolbar"><span class="ue_colorpicker_square" id="##_colorinput_preview" style="background-color:#f00"></span><a href="javascript:void(0);" onclick="return $$._onBtnClick(event, this);" class="btn_ue_colorpicker">' + b.getLang("ok") + '</a><span class="ue_colorpicker_input_box"><span class="ue_colorpicker_input_append">#</span><span class="ue_colorpicker_input_inner"><input id="##_colorinput" value="ff0000" style="width: 60px;border:0 none;" type="text" onkeyup="return $$._onInputKeyup(event, this);" onclick="return $$._onInputClick(event, this);"></span></span></div></div>')
				},
				_onTableClick: function(a) {
					if (a = (a.target || a.srcElement).getAttribute("data-color")) this._saveColor(a), this.fireEvent("pickcolor", a)
				},
				_onRecentClick: function(a) {
					(a = (a.target || a.srcElement).getAttribute("data-color")) && this.fireEvent("pickcolor", a)
				},
				_onInputKeyup: function(a) {
					var b = this.getDom("colorinput_preview"),
						c = this._getColor();
					a = a.keyCode || a.which;
					b.style.backgroundColor = c ? c : "#fff";
					c && 13 == a && (this._saveColor(c), this.fireEvent("pickcolor", c))
				},
				_onInputClick: function(a) {
					a.stopPropagation ? (a.stopPropagation(), a.preventDefault()) : a.cancelBubble = !0
				},
				_saveColor: function(a) {
					for (var c = this.recentlyColor || ["#000"], f = [], e = 0, g = c.length; g > e; ++e) {
						var h = c[e];
						h != a && f.push(h)
					}
					f.unshift(a);
					this.recentlyColor = c = f.slice(0, b);
					this.editor.setPreferences(this.storekey, c.join(","));
					html = "";
					e = 0;
					for (g = c.length; g > e; e++) h = c[e].substr(1), html += '<span onclick="return false;" title="#' + h + '" data-color="#' + h + '" class="ue_colorpicker_square" style="background-color:#' + h + '"></span>';
					this.getDom("recently_color").innerHTML = html
				},
				_getColor: function() {
					var a = this.getDom("colorinput").value || "",
						a = a.toLowerCase(),
						b = a.split(""),
						c = b.length;
					if (3 != c && 6 != c) return !1;
					for (var f = 0; c > f; ++f) {
						var e = b[f];
						if (!("0" <= e && "9" >= e || "a" <= e && "f" >= e)) return !1
					}
					return "#" + a
				},
				_onBtnClick: function(a) {
					var b = this._getColor();
					return b && (this._saveColor(b), this.fireEvent("pickcolor", b)), a.stopPropagation ? (a.stopPropagation(), a.preventDefault()) : a.cancelBubble = !0, !1
				},
				_onTableOver: function(a) {
					if (a = (a.target || a.srcElement).getAttribute("data-color")) this.getDom("preview").style.backgroundColor = a
				},
				_onTableOut: function() {
					this.getDom("preview").style.backgroundColor = ""
				},
				_onPickNoColor: function() {
					this.fireEvent("picknocolor")
				}
			};
			c.inherits(e, a);
			var f = "ffffff 000000 eeece1 1f497d 4f81bd c0504d 9bbb59 8064a2 4bacc6 f79646 f2f2f2 7f7f7f ddd9c3 c6d9f0 dbe5f1 f2dcdb ebf1dd e5e0ec dbeef3 fdeada d8d8d8 595959 c4bd97 8db3e2 b8cce4 e5b9b7 d7e3bc ccc1d9 b7dde8 fbd5b5 bfbfbf 3f3f3f 938953 548dd4 95b3d7 d99694 c3d69b b2a2c7 92cddc fac08f a5a5a5 262626 494429 17365d 366092 953734 76923c 5f497a 31859b e36c09 7f7f7f 0c0c0c 1d1b10 0f243e 244061 632423 4f6128 3f3151 205867 974806 c00000 ff0000 ffc000 ffff00 92d050 00b050 00b0f0 0070c0 002060 7030a0 ".split(" ")
		})();
		(function() {
			var c = p.editor.dom.domUtils,
				a = p.editor.utils,
				e = p.editor.ui.UIBase,
				b = p.editor.ui.RemoteContent = function(a) {
					this.initOptions(a);
					this.initUIBase()
				};
			b.prototype = {
				getHtmlTpl: function() {
					return '<div id="##" class="edui-remotecontent %%">' + ('<div class="ue_remotecontent_toolbar"><span class="ue_remotecontent_input_box"><span class="ue_remotecontent_input_inner"><input id="##_urlinput" placeholder="请输入文章内容页网址链接，包含http(s)://" value="" style="border:0 none;" type="text"></span></span><a href="javascript:void(0);" onclick="return $$._onBtnClick(event, this);" class="btn_ue_remotecontent">' + this.editor.getLang("ok") + '</a><p style="font-size: 12px;margin:5px 0;">从网址导入文章内容，避免复制不全或复制多余部分造成格式排版错乱。目前已支持<strong>微信公众号文章、QQ公众号文章、今日头条、一点资讯、百度百家、新浪看点、凤凰博客、网易号、知乎专栏</strong>，更多地址的支持请联系管理员。</p></div></div>')
				},
				showErrorMsg: function(a) {
					var b = this.editor,
						d = b.document.getElementById("remotecontent-msg");
					d && c.remove(d);
					b.fireEvent("showmessage", {
						id: "remotecontent-msg",
						content: a,
						type: "error",
						timeout: 6E3
					})
				},
				_onBtnClick: function(a) {
					a = this.getDom("urlinput");
					a = a.value || "";
					if ("" == a) alert("url不能为空");
					else {
						var b = this,
							c = this.editor,
							f = "//" + c.options.plat_host + "/downloads/getRemoteContent";
						c.options.appkey && (f += "?appkey=" + c.options.appkey);
						UE.ajax.request(f, {
							method: "POST",
							dataType: "jsonp",
							data: {
								uri: a
							},
							onsuccess: function(a) {
								if (a.error) b.showErrorMsg(a.error);
								else if (c.setContent(a.data.content), c.execCommand("selectall"), c.fireEvent("catchRemoteImage"), b.ongetremotesuccess) b.ongetremotesuccess()
							},
							onerror: function(a) {
								b.showErrorMsg("请求失败，请重试或检查网络")
							}
						})
					}
				}
			};
			a.inherits(b, e)
		})();
		(function() {
			var c = p.editor.utils,
				a = p.editor.ui.uiUtils,
				e = p.editor.ui.UIBase,
				b = p.editor.ui.TablePicker = function(a) {
					this.initOptions(a);
					this.initTablePicker()
				};
			b.prototype = {
				defaultNumRows: 10,
				defaultNumCols: 10,
				maxNumRows: 20,
				maxNumCols: 20,
				numRows: 10,
				numCols: 10,
				lengthOfCellSide: 22,
				initTablePicker: function() {
					this.initUIBase()
				},
				getHtmlTpl: function() {
					return '<div id="##" class="edui-tablepicker %%"><div class="edui-tablepicker-body"><div class="edui-infoarea"><span id="##_label" class="edui-label"></span></div><div class="edui-pickarea" onmousemove="$$._onMouseMove(event, this);" onmouseover="$$._onMouseOver(event, this);" onmouseout="$$._onMouseOut(event, this);" onclick="$$._onClick(event, this);"><div id="##_overlay" class="edui-overlay"></div></div></div></div>'
				},
				_UIBase_render: e.prototype.render,
				render: function(a) {
					this._UIBase_render(a);
					this.getDom("label").innerHTML = "0" + this.editor.getLang("t_row") + " x 0" + this.editor.getLang("t_col")
				},
				_track: function(a, b) {
					var c = this.getDom("overlay").style,
						f = this.lengthOfCellSide;
					c.width = a * f + "px";
					c.height = b * f + "px";
					this.getDom("label").innerHTML = a + this.editor.getLang("t_col") + " x " + b + this.editor.getLang("t_row");
					this.numCols = a;
					this.numRows = b
				},
				_onMouseOver: function(b, c) {
					var d = b.relatedTarget || b.fromElement;
					a.contains(c, d) || c === d || (this.getDom("label").innerHTML = "0" + this.editor.getLang("t_col") + " x 0" + this.editor.getLang("t_row"), this.getDom("overlay").style.visibility = "")
				},
				_onMouseOut: function(b, c) {
					var d = b.relatedTarget || b.toElement;
					a.contains(c, d) || c === d || (this.getDom("label").innerHTML = "0" + this.editor.getLang("t_col") + " x 0" + this.editor.getLang("t_row"), this.getDom("overlay").style.visibility = "hidden")
				},
				_onMouseMove: function(b, c) {
					this.getDom("overlay");
					var d = a.getEventOffset(b),
						f = this.lengthOfCellSide;
					this._track(Math.ceil(d.left / f), Math.ceil(d.top / f))
				},
				_onClick: function() {
					this.fireEvent("picktable", this.numCols, this.numRows)
				}
			};
			c.inherits(b, e)
		})();
		(function() {
			var c = p.editor.dom.domUtils,
				a = p.editor.ui.uiUtils,
				e = 'onmousedown="$$.Stateful_onMouseDown(event, this);" onmouseup="$$.Stateful_onMouseUp(event, this);"' + (p.editor.browser.ie ? ' onmouseenter="$$.Stateful_onMouseEnter(event, this);" onmouseleave="$$.Stateful_onMouseLeave(event, this);"' : ' onmouseover="$$.Stateful_onMouseOver(event, this);" onmouseout="$$.Stateful_onMouseOut(event, this);"');
			p.editor.ui.Stateful = {
				alwalysHoverable: !1,
				target: null,
				Stateful_init: function() {
					this._Stateful_dGetHtmlTpl = this.getHtmlTpl;
					this.getHtmlTpl = this.Stateful_getHtmlTpl
				},
				Stateful_getHtmlTpl: function() {
					return this._Stateful_dGetHtmlTpl().replace(/stateful/g, function() {
						return e
					})
				},
				Stateful_onMouseEnter: function(a, c) {
					this.target = c;
					if (!this.isDisabled() || this.alwalysHoverable) this.addState("hover"), this.fireEvent("over")
				},
				Stateful_onMouseLeave: function(a, c) {
					if (!this.isDisabled() || this.alwalysHoverable) this.removeState("hover"), this.removeState("active"), this.fireEvent("out")
				},
				Stateful_onMouseOver: function(b, c) {
					var f = b.relatedTarget;
					a.contains(c, f) || c === f || this.Stateful_onMouseEnter(b, c)
				},
				Stateful_onMouseOut: function(b, c) {
					var f = b.relatedTarget;
					a.contains(c, f) || c === f || this.Stateful_onMouseLeave(b, c)
				},
				Stateful_onMouseDown: function(a, c) {
					this.isDisabled() || this.addState("active")
				},
				Stateful_onMouseUp: function(a, c) {
					this.isDisabled() || this.removeState("active")
				},
				Stateful_postRender: function() {
					this.disabled && !this.hasState("disabled") && this.addState("disabled")
				},
				hasState: function(a) {
					return c.hasClass(this.getStateDom(), "edui-state-" + a)
				},
				addState: function(a) {
					this.hasState(a) || (this.getStateDom().className += " edui-state-" + a)
				},
				removeState: function(a) {
					this.hasState(a) && c.removeClasses(this.getStateDom(), ["edui-state-" + a])
				},
				getStateDom: function() {
					return this.getDom("state")
				},
				isChecked: function() {
					return this.hasState("checked")
				},
				setChecked: function(a) {
					!this.isDisabled() && a ? this.addState("checked") : this.removeState("checked")
				},
				isDisabled: function() {
					return this.hasState("disabled")
				},
				setDisabled: function(a) {
					a ? (this.removeState("hover"), this.removeState("checked"), this.removeState("active"), this.addState("disabled")) : this.removeState("disabled")
				}
			}
		})();
		(function() {
			var c = p.editor.utils,
				a = p.editor.ui.UIBase,
				e = p.editor.ui.Stateful,
				b = p.editor.ui.Button = function(a) {
					if (a.name) {
						var b = a.name,
							c = a.cssRules;
						a.className || (a.className = "edui-for-" + b);
						a.cssRules = ".edui-" + (a.theme || "default") + " .edui-toolbar .edui-button.edui-for-" + b + " .edui-icon {" + c + "}"
					}
					this.initOptions(a);
					this.initButton()
				};
			b.prototype = {
				uiName: "button",
				label: "",
				title: "",
				showIcon: !0,
				showText: !0,
				cssRules: "",
				initButton: function() {
					this.initUIBase();
					this.Stateful_init();
					this.cssRules && c.cssRule("edui-customize-" + this.name + "-style", this.cssRules)
				},
				getHtmlTpl: function() {
					return '<div id="##" class="edui-box %%"><div id="##_state" stateful><div class="%%-wrap"><div id="##_body" unselectable="on" ' + (this.title ? 'title="' + this.title + '"' : "") + ' class="%%-body" onmousedown="return $$._onMouseDown(event, this);" onclick="return $$._onClick(event, this);">' + (this.showIcon ? '<div class="edui-box edui-icon"></div>' : "") + (this.showText ? '<div class="edui-box edui-label">' + this.label + "</div>" : "") + "</div></div></div></div>"
				},
				postRender: function() {
					this.Stateful_postRender();
					this.setDisabled(this.disabled)
				},
				_onMouseDown: function(a) {
					a = (a = a.target || a.srcElement) && a.tagName && a.tagName.toLowerCase();
					if ("input" == a || "object" == a || "object" == a) return !1
				},
				_onClick: function() {
					this.isDisabled() || this.fireEvent("click")
				},
				setTitle: function(a) {
					this.getDom("label").innerHTML = a
				}
			};
			c.inherits(b, a);
			c.extend(b.prototype, e)
		})();
		(function() {
			var c = p.editor.utils,
				a = p.editor.ui.uiUtils,
				e = p.editor.ui.UIBase,
				b = p.editor.ui.Stateful,
				f = p.editor.ui.SplitButton = function(a) {
					this.initOptions(a);
					this.initSplitButton()
				};
			f.prototype = {
				popup: null,
				uiName: "splitbutton",
				title: "",
				initSplitButton: function() {
					this.initUIBase();
					this.Stateful_init();
					if (null != this.popup) {
						var a = this.popup;
						this.popup = null;
						this.setPopup(a)
					}
				},
				_UIBase_postRender: e.prototype.postRender,
				postRender: function() {
					this.Stateful_postRender();
					this._UIBase_postRender()
				},
				setPopup: function(b) {
					this.popup !== b && (null != this.popup && this.popup.dispose(), b.addListener("show", c.bind(this._onPopupShow, this)), b.addListener("hide", c.bind(this._onPopupHide, this)), b.addListener("postrender", c.bind(function() {
						b.getDom("body").appendChild(a.createElementByHtml('<div id="' + this.popup.id + '_bordereraser" class="edui-bordereraser edui-background" style="width:' + (a.getClientRect(this.getDom()).width + 20) + 'px"></div>'));
						b.getDom().className += " " + this.className
					}, this)), this.popup = b)
				},
				_onPopupShow: function() {
					this.addState("opened")
				},
				_onPopupHide: function() {
					this.removeState("opened")
				},
				getHtmlTpl: function() {
					var a = '<div id="##_button_body" class="edui-box edui-button-body" onclick="$$._onButtonClick(event, this);"><div class="edui-box edui-icon"></div></div>';
					this.useInput && (a = '<div id="##_button_body" class="edui-box edui-button-body"><input id="##_wx_input" class="edui-box edui-wx-input " type="text"  onkeydown="$$._onInputKeydown(event, this);" onclick="$$._onInputClick(event, this);" onblur="$$._onInputBlur(event, this);"></div>');
					return '<div id="##" class="edui-box %%"><div ' + (this.title ? 'data-tooltip="' + this.title + '"' : "") + ' id="##_state" stateful class="js_tooltip"><div class="%%-body">' + a + '<div class="edui-box edui-splitborder"></div><div class="edui-box edui-arrow" onclick="$$._onArrowClick();"></div></div></div></div>'
				},
				showPopup: function() {
					var b = a.getClientRect(this.getDom());
					b.top -= this.popup.SHADOW_RADIUS;
					b.height += this.popup.SHADOW_RADIUS;
					this.popup.showAnchorRect(b)
				},
				_onArrowClick: function(a, b) {
					this.isDisabled() || this.showPopup()
				},
				_onInputClick: function() {
					this.isDisabled() || this.fireEvent("inputclick")
				},
				_onInputBlur: function(a) {
					this.isDisabled() || this.fireEvent("inputblur");
					a.stopPropagation ? (a.stopPropagation(), a.preventDefault()) : a.cancelBubble = !0
				},
				_onInputKeydown: function(a) {
					this.isDisabled() || this.fireEvent("inputkeydown", a)
				},
				_onButtonClick: function() {
					this.isDisabled() || this.fireEvent("buttonclick")
				}
			};
			c.inherits(f, e);
			c.extend(f.prototype, b, !0)
		})();
		(function() {
			var c = p.editor.utils,
				a = p.editor.ui.uiUtils,
				e = p.editor.ui.ColorPicker,
				b = p.editor.ui.Popup,
				f = p.editor.ui.SplitButton,
				g = p.editor.ui.ColorButton = function(a) {
					this.initOptions(a);
					this.initColorButton()
				};
			g.prototype = {
				initColorButton: function() {
					var a = this;
					this.popup = new b({
						content: new e({
							noColorText: a.editor.getLang("clearColor"),
							editor: a.editor,
							onpickcolor: function(b, c) {
								a._onPickColor(c)
							},
							onpicknocolor: function(b, c) {
								a._onPickNoColor(c)
							}
						}),
						editor: a.editor
					});
					this.initSplitButton()
				},
				_SplitButton_postRender: f.prototype.postRender,
				postRender: function() {
					this._SplitButton_postRender();
					this.getDom("button_body").appendChild(a.createElementByHtml('<div id="' + this.id + '_colorlump" class="edui-colorlump"></div>'));
					this.getDom().className += " edui-colorbutton"
				},
				setColor: function(a) {
					this.color = this.getDom("colorlump").style.backgroundColor = a
				},
				_onPickColor: function(a) {
					!1 !== this.fireEvent("pickcolor", a) && (this.setColor(a), this.popup.hide())
				},
				_onPickNoColor: function(a) {
					!1 !== this.fireEvent("picknocolor") && this.popup.hide()
				}
			};
			c.inherits(g, f)
		})();
		(function() {
			var c = p.editor.utils,
				a = p.editor.ui.Popup,
				e = p.editor.ui.TablePicker,
				b = p.editor.ui.SplitButton,
				f = p.editor.ui.TableButton = function(a) {
					this.initOptions(a);
					this.initTableButton()
				};
			f.prototype = {
				initTableButton: function() {
					var b = this;
					this.popup = new a({
						content: new e({
							editor: b.editor,
							onpicktable: function(a, c, f) {
								b._onPickTable(c, f)
							}
						}),
						editor: b.editor
					});
					this.initSplitButton()
				},
				_onPickTable: function(a, b) {
					!1 !== this.fireEvent("picktable", a, b) && this.popup.hide()
				}
			};
			c.inherits(f, b)
		})();
		(function() {
			var c = p.editor.utils,
				a = p.editor.ui.UIBase,
				e = p.editor.ui.AutoTypeSetPicker = function(a) {
					this.initOptions(a);
					this.initAutoTypeSetPicker()
				};
			e.prototype = {
				initAutoTypeSetPicker: function() {
					this.initUIBase()
				},
				getHtmlTpl: function() {
					var a = this.editor,
						c = a.options.autotypeset,
						e = a.getLang("autoTypeSet"),
						d = "textAlignValue" + a.uid,
						g = "imageBlockLineValue" + a.uid,
						k = "symbolConverValue" + a.uid;
					return '<div id="##" class="edui-autotypesetpicker %%"><div class="edui-autotypesetpicker-body"><table ><tr><td nowrap><input type="checkbox" name="mergeEmptyline" ' + (c.mergeEmptyline ? "checked" : "") + ">" + e.mergeLine + '</td><td colspan="2"><input type="checkbox" name="removeEmptyline" ' + (c.removeEmptyline ? "checked" : "") + ">" + e.delLine + '</td></tr><tr><td nowrap><input type="checkbox" name="removeClass" ' + (c.removeClass ? "checked" : "") + ">" + e.removeFormat + '</td><td colspan="2"><input type="checkbox" name="indent" ' + (c.indent ? "checked" : "") + ">" + e.indent + '</td></tr><tr><td nowrap><input type="checkbox" name="clearFontSize" ' + (c.clearFontSize ? "checked" : "") + ">" + e.removeFontsize + '</td><td colspan="2"><input type="checkbox" name="clearFontFamily" ' + (c.clearFontFamily ? "checked" : "") + ">" + e.removeFontFamily + '</td></tr><tr><td nowrap><input type="checkbox" name="textAlign" ' + (c.textAlign ? "checked" : "") + ">" + e.alignment + '</td><td colspan="2" id="' + d + '"><input type="radio" name="' + d + '" value="left" ' + (c.textAlign && "left" == c.textAlign ? "checked" : "") + ">" + a.getLang("justifyleft") + '<input type="radio" name="' + d + '" value="center" ' + (c.textAlign && "center" == c.textAlign ? "checked" : "") + ">" + a.getLang("justifycenter") + '<input type="radio" name="' + d + '" value="right" ' + (c.textAlign && "right" == c.textAlign ? "checked" : "") + ">" + a.getLang("justifyright") + '</td></tr><tr><td nowrap><input type="checkbox" name="imageBlockLine" ' + (c.imageBlockLine ? "checked" : "") + ">" + e.imageFloat + '</td><td nowrap id="' + g + '"><input type="radio" name="' + g + '" value="none" ' + (c.imageBlockLine && "none" == c.imageBlockLine ? "checked" : "") + ">" + a.getLang("default") + '<input type="radio" name="' + g + '" value="left" ' + (c.imageBlockLine && "left" == c.imageBlockLine ? "checked" : "") + ">" + a.getLang("justifyleft") + '<input type="radio" name="' + g + '" value="center" ' + (c.imageBlockLine && "center" == c.imageBlockLine ? "checked" : "") + ">" + a.getLang("justifycenter") + '<input type="radio" name="' + g + '" value="right" ' + (c.imageBlockLine && "right" == c.imageBlockLine ? "checked" : "") + ">" + a.getLang("justifyright") + '</td></tr><tr><td nowrap><input type="checkbox" name="symbolConver" ' + (c.bdc2sb || c.tobdc ? "checked" : "") + ">" + e.symbol + '</td><td id="' + k + '"><input type="radio" name="bdc" value="bdc2sb" ' + (c.bdc2sb ? "checked" : "") + ">" + e.bdc2sb + '<input type="radio" name="bdc" value="tobdc" ' + (c.tobdc ? "checked" : "") + ">" + e.tobdc + '</td><td nowrap align="right"><button >' + e.run + "</button></td></tr></table></div></div>"
				},
				_UIBase_render: a.prototype.render
			};
			c.inherits(e, a)
		})();
		(function() {
			function c(b) {
				for (var c = {}, d = b.getDom(), f = b.editor.uid, e, h = g.getElementsByTagName(d, "input"), u = h.length - 1, v; v = h[u--];) if (e = v.getAttribute("type"), "checkbox" == e) if (e = v.getAttribute("name"), c[e] && delete c[e], v.checked) if (v = document.getElementById(e + "Value" + f)) if (/input/ig.test(v.tagName)) c[e] = v.value;
				else {
					v = v.getElementsByTagName("input");
					for (var w = v.length - 1, p; p = v[w--];) if (p.checked) {
						c[e] = p.value;
						break
					}
				} else c[e] = !0;
				else c[e] = !1;
				else c[v.getAttribute("value")] = v.checked;
				d = g.getElementsByTagName(d, "select");
				for (u = 0; f = d[u++];) h = f.getAttribute("name"), c[h] = c[h] ? f.value : "";
				a.extend(b.editor.options.autotypeset, c);
				b.editor.setPreferences("autotypeset", c)
			}
			var a = p.editor.utils,
				e = p.editor.ui.Popup,
				b = p.editor.ui.AutoTypeSetPicker,
				f = p.editor.ui.SplitButton,
				h = p.editor.ui.AutoTypeSetButton = function(a) {
					this.initOptions(a);
					this.initAutoTypeSetButton()
				};
			h.prototype = {
				initAutoTypeSetButton: function() {
					var a = this;
					this.popup = new e({
						content: new b({
							editor: a.editor
						}),
						editor: a.editor,
						hide: function() {
							!this._hidden && this.getDom() && (c(this), this.getDom().style.display = "none", this._hidden = !0, this.fireEvent("hide"))
						}
					});
					var f = 0;
					this.popup.addListener("postRenderAfter", function() {
						var b = this;
						if (!f) {
							var d = this.getDom();
							d.getElementsByTagName("button")[0].onclick = function() {
								c(b);
								a.editor.execCommand("autotypeset");
								b.hide()
							};
							g.on(d, "click", function(d) {
								d = d.target || d.srcElement;
								var f = a.editor.uid;
								if (d && "INPUT" == d.tagName) {
									if ("imageBlockLine" == d.name || "textAlign" == d.name || "symbolConver" == d.name) for (var e = d.checked, k = document.getElementById(d.name + "Value" + f).getElementsByTagName("input"), g = {
										imageBlockLine: "none",
										textAlign: "left",
										symbolConver: "tobdc"
									}, h = 0; h < k.length; h++) e ? k[h].value == g[d.name] && (k[h].checked = "checked") : k[h].checked = !1;
									(d.name == "imageBlockLineValue" + f || d.name == "textAlignValue" + f || "bdc" == d.name) && (d = d.parentNode.previousSibling.getElementsByTagName("input")) && (d[0].checked = !0);
									c(b)
								}
							});
							f = 1
						}
					});
					this.initSplitButton()
				}
			};
			a.inherits(h, f)
		})();
		(function() {
			var c = p.editor.utils,
				a = p.editor.ui.Popup,
				e = p.editor.ui.Stateful,
				b = p.editor.ui.UIBase,
				f = p.editor.ui.CellAlignPicker = function(a) {
					this.initOptions(a);
					this.initSelected();
					this.initCellAlignPicker()
				};
			f.prototype = {
				initSelected: function() {
					var a = {
						top: 0,
						middle: 1,
						bottom: 2
					},
						b = {
							left: 0,
							center: 1,
							right: 2
						};
					this.selected && (this.selectedIndex = 3 * a[this.selected.valign] + b[this.selected.align])
				},
				initCellAlignPicker: function() {
					this.initUIBase();
					this.Stateful_init()
				},
				getHtmlTpl: function() {
					for (var a = ["left", "center", "right"], b, c, f = [], e = 0; 9 > e; e++) b = this.selectedIndex === e ? ' class="edui-cellalign-selected" ' : "", c = e % 3, 0 === c && f.push("<tr>"), f.push('<td index="' + e + '" ' + b + ' stateful><div class="edui-icon edui-' + a[c] + '"></div></td>'), 2 === c && f.push("</tr>");
					return '<div id="##" class="edui-cellalignpicker %%"><div class="edui-cellalignpicker-body"><table onclick="$$._onClick(event);">' + f.join("") + "</table></div></div>"
				},
				getStateDom: function() {
					return this.target
				},
				_onClick: function(b) {
					var c = b.target || b.srcElement;
					/icon/.test(c.className) && (this.items[c.parentNode.getAttribute("index")].onclick(), a.postHide(b))
				},
				_UIBase_render: b.prototype.render
			};
			c.inherits(f, b);
			c.extend(f.prototype, e, !0)
		})();
		(function() {
			var c = p.editor.utils,
				a = p.editor.ui.Stateful,
				e = p.editor.ui.uiUtils,
				b = p.editor.ui.UIBase,
				f = p.editor.ui.PastePicker = function(a) {
					this.initOptions(a);
					this.initPastePicker()
				};
			f.prototype = {
				initPastePicker: function() {
					this.initUIBase();
					this.Stateful_init()
				},
				getHtmlTpl: function() {
					return '<div class="edui-pasteicon" onclick="$$._onClick(this)"></div><div class="edui-pastecontainer"><div class="edui-title">' + this.editor.getLang("pasteOpt") + '</div><div class="edui-button"><div title="' + this.editor.getLang("pasteSourceFormat") + '" onclick="$$.format(false)" stateful><div class="edui-richtxticon"></div></div><div title="' + this.editor.getLang("tagFormat") + '" onclick="$$.format(2)" stateful><div class="edui-tagicon"></div></div><div title="' + this.editor.getLang("pasteTextFormat") + '" onclick="$$.format(true)" stateful><div class="edui-plaintxticon"></div></div></div></div></div>'
				},
				getStateDom: function() {
					return this.target
				},
				format: function(a) {
					this.editor.ui._isTransfer = !0;
					this.editor.fireEvent("pasteTransfer", a)
				},
				_onClick: function(a) {
					var b = g.getNextDomNode(a),
						c = e.getViewportRect().height,
						f = e.getClientRect(b);
					b.style.top = f.top + f.height > c ? -f.height - a.offsetHeight + "px" : "";
					/hidden/ig.test(g.getComputedStyle(b, "visibility")) ? (b.style.visibility = "visible", g.addClass(a, "edui-state-opened")) : (b.style.visibility = "hidden", g.removeClasses(a, "edui-state-opened"))
				},
				_UIBase_render: b.prototype.render
			};
			c.inherits(f, b);
			c.extend(f.prototype, a, !0)
		})();
		(function() {
			var c = p.editor.utils,
				a = p.editor.ui.uiUtils,
				e = p.editor.ui.UIBase,
				b = p.editor.ui.Toolbar = function(a) {
					this.initOptions(a);
					this.initToolbar()
				};
			b.prototype = {
				items: null,
				initToolbar: function() {
					this.items = this.items || [];
					this.initUIBase()
				},
				add: function(a, b) {
					void 0 === b ? this.items.push(a) : this.items.splice(b, 0, a)
				},
				getHtmlTpl: function() {
					for (var a = [], b = 0; b < this.items.length; b++) a[b] = this.items[b].renderHtml();
					return '<div id="##" class="edui-toolbar %%" onselectstart="return false;" onmousedown="return $$._onMouseDown(event, this);">' + a.join("") + "</div>"
				},
				postRender: function() {
					for (var b = this.getDom(), c = 0; c < this.items.length; c++) this.items[c].postRender();
					a.makeUnselectable(b)
				},
				_onMouseDown: function(a) {
					a = (a = a.target || a.srcElement) && a.tagName && a.tagName.toLowerCase();
					if ("input" == a || "object" == a || "object" == a) return !1
				}
			};
			c.inherits(b, e)
		})();
		(function() {
			var c = p.editor.utils,
				a = p.editor.dom.domUtils,
				e = p.editor.ui.uiUtils,
				b = p.editor.ui.UIBase,
				f = p.editor.ui.Popup,
				g = p.editor.ui.Stateful,
				d = p.editor.ui.CellAlignPicker,
				l = p.editor.ui.Menu = function(a) {
					this.initOptions(a);
					this.initMenu()
				},
				k = {
					renderHtml: function() {
						return '<div class="edui-menuitem edui-menuseparator"><div class="edui-menuseparator-inner"></div></div>'
					},
					postRender: function() {},
					queryAutoHide: function() {
						return !0
					}
				};
			l.prototype = {
				items: null,
				uiName: "menu",
				initMenu: function() {
					this.items = this.items || [];
					this.initPopup();
					this.initItems()
				},
				initItems: function() {
					for (var a = 0; a < this.items.length; a++) {
						var b = this.items[a];
						"-" == b ? this.items[a] = this.getSeparator() : b instanceof n || (b.editor = this.editor, b.theme = this.editor.options.theme, this.items[a] = this.createItem(b))
					}
				},
				getSeparator: function() {
					return k
				},
				createItem: function(a) {
					a.menu = this;
					return new n(a)
				},
				_Popup_getContentHtmlTpl: f.prototype.getContentHtmlTpl,
				getContentHtmlTpl: function() {
					if (0 == this.items.length) return this._Popup_getContentHtmlTpl();
					for (var a = [], b = 0; b < this.items.length; b++) a[b] = this.items[b].renderHtml();
					return '<div class="%%-body">' + a.join("") + "</div>"
				},
				_Popup_postRender: f.prototype.postRender,
				postRender: function() {
					for (var b = this, c = 0; c < this.items.length; c++) {
						var d = this.items[c];
						d.ownerMenu = this;
						d.postRender()
					}
					a.on(this.getDom(), "mouseover", function(a) {
						a = a || event;
						a = a.relatedTarget || a.fromElement;
						var c = b.getDom();
						e.contains(c, a) || c === a || b.fireEvent("over")
					});
					this._Popup_postRender()
				},
				queryAutoHide: function(a) {
					if (a) {
						if (e.contains(this.getDom(), a)) return !1;
						for (var b = 0; b < this.items.length; b++) if (!1 === this.items[b].queryAutoHide(a)) return !1
					}
				},
				clearItems: function() {
					for (var a = 0; a < this.items.length; a++) {
						var b = this.items[a];
						clearTimeout(b._showingTimer);
						clearTimeout(b._closingTimer);
						b.subMenu && b.subMenu.destroy()
					}
					this.items = []
				},
				destroy: function() {
					this.getDom() && a.remove(this.getDom());
					this.clearItems()
				},
				dispose: function() {
					this.destroy()
				}
			};
			c.inherits(l, f);
			var n = p.editor.ui.MenuItem = function(b) {
					this.initOptions(b);
					this.initUIBase();
					this.Stateful_init();
					if (this.subMenu && !(this.subMenu instanceof l)) if (b.className && -1 != b.className.indexOf("aligntd")) {
						var c = this;
						this.subMenu.selected = this.editor.queryCommandValue("cellalignment");
						this.subMenu = new f({
							content: new d(this.subMenu),
							parentMenu: c,
							editor: c.editor,
							destroy: function() {
								this.getDom() && a.remove(this.getDom())
							}
						});
						this.subMenu.addListener("postRenderAfter", function() {
							a.on(this.getDom(), "mouseover", function() {
								c.addState("opened")
							})
						})
					} else this.subMenu = new l(this.subMenu)
				};
			n.prototype = {
				label: "",
				subMenu: null,
				ownerMenu: null,
				uiName: "menuitem",
				alwalysHoverable: !0,
				getHtmlTpl: function() {
					return '<div id="##" class="%%" stateful onclick="$$._onClick(event, this);"><div class="%%-body">' + this.renderLabelHtml() + "</div></div>"
				},
				postRender: function() {
					var a = this;
					this.addListener("over", function() {
						a.ownerMenu.fireEvent("submenuover", a);
						a.subMenu && a.delayShowSubMenu()
					});
					this.subMenu && (this.getDom().className += " edui-hassubmenu", this.subMenu.render(), this.addListener("out", function() {
						a.delayHideSubMenu()
					}), this.subMenu.addListener("over", function() {
						clearTimeout(a._closingTimer);
						a._closingTimer = null;
						a.addState("opened")
					}), this.ownerMenu.addListener("hide", function() {
						a.hideSubMenu()
					}), this.ownerMenu.addListener("submenuover", function(b, c) {
						c !== a && a.delayHideSubMenu()
					}), this.subMenu._bakQueryAutoHide = this.subMenu.queryAutoHide, this.subMenu.queryAutoHide = function(b) {
						return b && e.contains(a.getDom(), b) ? !1 : this._bakQueryAutoHide(b)
					});
					this.getDom().style.tabIndex = "-1";
					e.makeUnselectable(this.getDom());
					this.Stateful_postRender()
				},
				delayShowSubMenu: function() {
					var a = this;
					a.isDisabled() || (a.addState("opened"), clearTimeout(a._showingTimer), clearTimeout(a._closingTimer), a._closingTimer = null, a._showingTimer = setTimeout(function() {
						a.showSubMenu()
					}, 250))
				},
				delayHideSubMenu: function() {
					var a = this;
					a.isDisabled() || (a.removeState("opened"), clearTimeout(a._showingTimer), a._closingTimer || (a._closingTimer = setTimeout(function() {
						a.hasState("opened") || a.hideSubMenu();
						a._closingTimer = null
					}, 400)))
				},
				renderLabelHtml: function() {
					return '<div class="edui-arrow"></div><div class="edui-box edui-icon"></div><div class="edui-box edui-label %%-label">' + (this.label || "") + "</div>"
				},
				getStateDom: function() {
					return this.getDom()
				},
				queryAutoHide: function(a) {
					if (this.subMenu && this.hasState("opened")) return this.subMenu.queryAutoHide(a)
				},
				_onClick: function(a, b) {
					this.hasState("disabled") || !1 !== this.fireEvent("click", a, b) && (this.subMenu ? this.showSubMenu() : f.postHide(a))
				},
				showSubMenu: function() {
					var a = e.getClientRect(this.getDom());
					a.right -= 5;
					a.left += 2;
					a.width -= 7;
					a.top -= 4;
					a.bottom += 4;
					a.height += 8;
					this.subMenu.showAnchorRect(a, !0, !0)
				},
				hideSubMenu: function() {
					this.subMenu.hide()
				}
			};
			c.inherits(n, b);
			c.extend(n.prototype, g, !0)
		})();
		(function() {
			var c = p.editor.utils,
				a = p.editor.ui.uiUtils,
				e = p.editor.ui.Menu,
				b = p.editor.ui.SplitButton,
				f = p.editor.ui.Combox = function(a) {
					this.initOptions(a);
					this.initCombox()
				};
			f.prototype = {
				uiName: "combox",
				onbuttonclick: function() {
					this.showPopup()
				},
				initCombox: function() {
					var a = this;
					this.items = this.items || [];
					for (var b = 0; b < this.items.length; b++) {
						var c = this.items[b];
						c.uiName = "listitem";
						c.index = b;
						"undefined" == typeof c.onclick && (c.onclick = function() {
							a.selectByIndex(this.index)
						})
					}
					this.popup = new e({
						items: this.items,
						uiName: "list",
						editor: this.editor,
						captureWheel: !0,
						combox: this
					});
					this.initSplitButton()
				},
				_SplitButton_postRender: b.prototype.postRender,
				postRender: function() {
					this._SplitButton_postRender();
					this.setLabel(this.label || "");
					this.setValue(this.initValue || "")
				},
				showPopup: function() {
					var b = a.getClientRect(this.getDom());
					b.top += 1;
					--b.bottom;
					b.height -= 2;
					this.popup.showAnchorRect(b)
				},
				getValue: function() {
					return this.value
				},
				setValue: function(a) {
					var b = this.indexByValue(a); - 1 != b ? (this.selectedIndex = b, this.setLabel(this.items[b].label), this.value = this.items[b].value) : (this.selectedIndex = -1, this.setLabel(this.getLabelForUnknowValue(a)), this.value = a)
				},
				setLabel: function(a) {
					this.useInput ? this.getDom("wx_input").value = a : this.getDom("button_body").innerHTML = a;
					this.label = a
				},
				getLabelForUnknowValue: function(a) {
					return a
				},
				indexByValue: function(a) {
					for (var b = 0; b < this.items.length; b++) if (a == this.items[b].value) return b;
					return -1
				},
				getItem: function(a) {
					return this.items[a]
				},
				selectByIndex: function(a) {
					a < this.items.length && !1 !== this.fireEvent("select", a) && (this.selectedIndex = a, this.value = this.items[a].value, this.setLabel(this.items[a].label))
				}
			};
			c.inherits(f, b)
		})();
		(function() {
			var c = p.editor.utils,
				a = p.editor.dom.domUtils,
				e = p.editor.ui.uiUtils,
				b = p.editor.ui.Mask,
				f = p.editor.ui.UIBase,
				g = p.editor.ui.Button,
				d = p.editor.ui.Dialog = function(a) {
					if (a.name) {
						var b = a.name,
							d = a.cssRules;
						a.className || (a.className = "edui-for-" + b);
						d && (a.cssRules = ".edui-default .edui-for-" + b + " .edui-dialog-content  {" + d + "}")
					}
					this.initOptions(c.extend({
						autoReset: !0,
						draggable: !0,
						onok: function() {},
						oncancel: function() {},
						onclose: function(a, b) {
							return b ? this.onok() : this.oncancel()
						},
						holdScroll: !1
					}, a));
					this.initDialog()
				},
				l, k, n;
			d.prototype = {
				draggable: !1,
				uiName: "dialog",
				initDialog: function() {
					var a = this,
						d = this.editor.options.theme;
					this.cssRules && c.cssRule("edui-customize-" + this.name + "-style", this.cssRules);
					this.initUIBase();
					this.modalMask = l || (l = new b({
						className: "edui-dialog-modalmask",
						theme: d,
						onclick: function() {
							n && n.close(!1)
						}
					}));
					this.dragMask = k || (k = new b({
						className: "edui-dialog-dragmask",
						theme: d
					}));
					this.closeButton = new g({
						className: "edui-dialog-closebutton",
						title: a.closeDialog,
						theme: d,
						onclick: function() {
							a.close(!1)
						}
					});
					this.fullscreen && this.initResizeEvent();
					if (this.buttons) for (d = 0; d < this.buttons.length; d++) this.buttons[d] instanceof g || (this.buttons[d] = new g(c.extend(this.buttons[d], {
						editor: this.editor
					}, !0)))
				},
				initResizeEvent: function() {
					var b = this;
					a.on(window, "resize", function() {
						b._hidden || void 0 === b._hidden || (b.__resizeTimer && window.clearTimeout(b.__resizeTimer), b.__resizeTimer = window.setTimeout(function() {
							b.__resizeTimer = null;
							var a = b.getDom(),
								c = b.getDom("content"),
								d = UE.ui.uiUtils.getClientRect(a),
								f = UE.ui.uiUtils.getClientRect(c),
								k = e.getViewportRect();
							c.style.width = k.width - d.width + f.width + "px";
							c.style.height = k.height - d.height + f.height + "px";
							a.style.width = k.width + "px";
							a.style.height = k.height + "px";
							b.fireEvent("resize")
						}, 100))
					})
				},
				fitSize: function() {
					var a = this.getDom("body"),
						b = this.mesureSize();
					a.style.width = b.width + "px";
					a.style.height = b.height + "px";
					return b
				},
				safeSetOffset: function(a) {
					var b = this.getDom(),
						c = e.getViewportRect(),
						d = e.getClientRect(b),
						f = a.left;
					f + d.width > c.right && (f = c.right - d.width);
					a = a.top;
					a + d.height > c.bottom && (a = c.bottom - d.height);
					b.style.left = Math.max(f, 0) + "px";
					b.style.top = Math.max(a, 0) + "px"
				},
				showAtCenter: function() {
					var b = e.getViewportRect();
					if (this.fullscreen) {
						var c = this.getDom(),
							d = this.getDom("content");
						c.style.display = "block";
						var f = UE.ui.uiUtils.getClientRect(c),
							k = UE.ui.uiUtils.getClientRect(d);
						c.style.left = "-100000px";
						d.style.width = b.width - f.width + k.width + "px";
						d.style.height = b.height - f.height + k.height + "px";
						c.style.width = b.width + "px";
						c.style.height = b.height + "px";
						c.style.left = 0;
						this._originalContext = {
							html: {
								overflowX: document.documentElement.style.overflowX,
								overflowY: document.documentElement.style.overflowY
							},
							body: {
								overflowX: document.body.style.overflowX,
								overflowY: document.body.style.overflowY
							}
						};
						document.documentElement.style.overflowX = "hidden";
						document.documentElement.style.overflowY = "hidden";
						document.body.style.overflowX = "hidden";
						document.body.style.overflowY = "hidden"
					} else this.getDom().style.display = "", d = this.fitSize(), f = this.getDom("titlebar").offsetHeight | 0, c = b.width / 2 - d.width / 2, b = b.height / 2 - (d.height - f) / 2 - f, d = this.getDom(), this.safeSetOffset({
						left: Math.max(c | 0, 0),
						top: Math.max(b | 0, 0)
					}), a.hasClass(d, "edui-state-centered") || (d.className += " edui-state-centered");
					this._show()
				},
				getContentHtml: function() {
					var a = "";
					"string" == typeof this.content ? a = this.content : this.iframeUrl && (a = '<span id="' + this.id + '_contmask" class="dialogcontmask"></span><iframe id="' + this.id + '_iframe" class="%%-iframe" height="100%" width="100%" frameborder="0" src="' + this.iframeUrl + '"></iframe>');
					return a
				},
				getHtmlTpl: function() {
					var a = "";
					if (this.buttons) {
						for (var a = [], b = 0; b < this.buttons.length; b++) a[b] = this.buttons[b].renderHtml();
						a = '<div class="%%-foot"><div id="##_buttons" class="%%-buttons">' + a.join("") + "</div></div>"
					}
					return '<div id="##" class="%%"><div ' + (this.fullscreen ? 'class="%%-wrap edui-dialog-fullscreen-flag"' : 'class="%%"') + '><div id="##_body" class="%%-body"><div class="%%-shadow"></div><div id="##_titlebar" class="%%-titlebar"><div class="%%-draghandle" onmousedown="$$._onTitlebarMouseDown(event, this);"><span class="%%-caption">' + (this.title || "") + "</span></div>" + this.closeButton.renderHtml() + '</div><div id="##_content" class="%%-content">' + (this.autoReset ? "" : this.getContentHtml()) + "</div>" + a + "</div></div></div>"
				},
				postRender: function() {
					this.modalMask.getDom() || (this.modalMask.render(), this.modalMask.hide());
					this.dragMask.getDom() || (this.dragMask.render(), this.dragMask.hide());
					var b = this;
					this.addListener("show", function() {
						b.modalMask.show(this.getDom().style.zIndex - 2)
					});
					this.addListener("hide", function() {
						b.modalMask.hide()
					});
					if (this.buttons) for (var c = 0; c < this.buttons.length; c++) this.buttons[c].postRender();
					a.on(window, "resize", function() {
						setTimeout(function() {
							b.isHidden() || b.safeSetOffset(e.getClientRect(b.getDom()))
						})
					});
					this._hide()
				},
				mesureSize: function() {
					var a = this.getDom("body"),
						b = e.getClientRect(this.getDom("content")).width;
					a.style.width = b;
					return e.getClientRect(a)
				},
				_onTitlebarMouseDown: function(b, c) {
					if (this.draggable) {
						var d;
						e.getViewportRect();
						var f = this;
						e.startDrag(b, {
							ondragstart: function() {
								d = e.getClientRect(f.getDom());
								f.getDom("contmask").style.visibility = "visible";
								f.dragMask.show(f.getDom().style.zIndex - 1)
							},
							ondragmove: function(a, b) {
								f.safeSetOffset({
									left: d.left + a,
									top: d.top + b
								})
							},
							ondragstop: function() {
								f.getDom("contmask").style.visibility = "hidden";
								a.removeClasses(f.getDom(), ["edui-state-centered"]);
								f.dragMask.hide()
							}
						})
					}
				},
				reset: function() {
					this.getDom("content").innerHTML = this.getContentHtml();
					this.fireEvent("dialogafterreset")
				},
				_show: function() {
					this._hidden && (this.getDom().style.display = "", this.editor.container.style.zIndex && (this.getDom().style.zIndex = 1 * this.editor.container.style.zIndex + 10), this._hidden = !1, this.fireEvent("show"), p.editor.ui.uiUtils.getFixedLayer().style.zIndex = this.getDom().style.zIndex - 4)
				},
				isHidden: function() {
					return this._hidden
				},
				_hide: function() {
					if (!this._hidden) {
						var a = this.getDom();
						a.style.display = "none";
						a.style.zIndex = "";
						a.style.width = "";
						a.style.height = "";
						this._hidden = !0;
						this.fireEvent("hide")
					}
				},
				open: function() {
					if (this.autoReset) try {
						this.reset()
					} catch (m) {
						this.render(), this.open()
					}
					this.showAtCenter();
					if (this.iframeUrl) try {
						this.getDom("iframe").focus()
					} catch (m) {}
					n = this
				},
				_onCloseButtonClick: function(a, b) {
					this.close(!1)
				},
				close: function(b) {
					if (!1 !== this.fireEvent("close", b)) {
						this.fullscreen && (document.documentElement.style.overflowX = this._originalContext.html.overflowX, document.documentElement.style.overflowY = this._originalContext.html.overflowY, document.body.style.overflowX = this._originalContext.body.overflowX, document.body.style.overflowY = this._originalContext.body.overflowY, delete this._originalContext);
						this._hide();
						b = this.getDom("content");
						var c = this.getDom("iframe");
						b && c && ((c = c.contentDocument || c.contentWindow.document) && (c.body.innerHTML = ""), a.remove(b))
					}
				}
			};
			c.inherits(d, f)
		})();
		(function() {
			var c = p.editor.utils,
				a = p.editor.ui.Menu,
				e = p.editor.ui.SplitButton,
				b = p.editor.ui.MenuButton = function(a) {
					this.initOptions(a);
					this.initMenuButton()
				};
			b.prototype = {
				initMenuButton: function() {
					var b = this;
					this.uiName = "menubutton";
					this.popup = new a({
						items: b.items,
						className: b.className,
						editor: b.editor
					});
					this.popup.addListener("show", function() {
						for (var a = 0; a < this.items.length; a++) this.items[a].removeState("checked"), this.items[a].value == b._value && (this.items[a].addState("checked"), this.value = b._value)
					});
					this.initSplitButton()
				},
				setValue: function(a) {
					this._value = a
				}
			};
			c.inherits(b, e)
		})();
		(function() {
			var c = p.editor.utils,
				a = p.editor.ui.Popup,
				e = p.editor.ui.SplitButton,
				b = p.editor.ui.MultiMenuPop = function(a) {
					this.initOptions(a);
					this.initMultiMenu()
				};
			b.prototype = {
				initMultiMenu: function() {
					var b = this;
					this.popup = new a({
						content: "",
						editor: b.editor,
						iframe_rendered: !1,
						onshow: function() {
							this.iframe_rendered || (this.iframe_rendered = !0, this.getDom("content").innerHTML = '<iframe id="' + b.id + '_iframe" src="' + b.iframeUrl + '" frameborder="0"></iframe>', b.editor.container.style.zIndex && (this.getDom().style.zIndex = 1 * b.editor.container.style.zIndex + 1))
						}
					});
					this.onbuttonclick = function() {
						this.showPopup()
					};
					this.initSplitButton()
				}
			};
			c.inherits(b, e)
		})();
		(function() {
			function c(a) {
				if (!g.findParent(a.target || a.srcElement, function(a) {
					return g.hasClass(a, "edui-shortcutmenu") || g.hasClass(a, "edui-popup")
				}, !0)) {
					a = 0;
					for (var b; b = d[a++];) b.hide()
				}
			}
			var a = p.editor.ui,
				e = a.UIBase,
				b = a.uiUtils,
				f = p.editor.utils,
				g = p.editor.dom.domUtils,
				d = [],
				l = !1,
				k = a.ShortCutMenu = function(a) {
					this.initOptions(a);
					this.initShortCutMenu()
				};
			k.postHide = c;
			k.prototype = {
				isHidden: !0,
				SPACE: 5,
				initShortCutMenu: function() {
					this.items = this.items || [];
					this.initUIBase();
					this.initItems();
					this.initEvent();
					d.push(this)
				},
				initEvent: function() {
					var a = this;
					g.on(a.editor.document, "mousemove", function(b) {
						!1 !== a.isHidden || a.getSubMenuMark() || "contextmenu" == a.eventType || a.getDom()
					});
					a.editor.addListener("afterhidepop", function() {
						a.isHidden || (l = !0)
					})
				},
				initItems: function() {
					if (f.isArray(this.items)) for (var b = 0, c = this.items.length; b < c; b++) {
						var d = this.items[b].toLowerCase();
						a[d] && (this.items[b] = new a[d](this.editor), this.items[b].className += " edui-shortcutsubmenu ")
					}
				},
				setOpacity: function(a, b) {
					t.ie && 9 > t.version ? a.style.filter = "alpha(opacity = " + 100 * parseFloat(b) + ");" : a.style.opacity = b
				},
				getSubMenuMark: function() {
					l = !1;
					for (var a = b.getFixedLayer(), a = g.getElementsByTagName(a, "div", function(a) {
						return g.hasClass(a, "edui-shortcutsubmenu edui-popup")
					}), c = 0, d; d = a[c++];)"none" != d.style.display && (l = !0);
					return l
				},
				show: function(a, c) {
					function d(a) {
						0 > a.left && (a.left = 0);
						0 > a.top && (a.top = 0);
						k.style.cssText = "position:absolute;left:" + a.left + "px;top:" + a.top + "px;"
					}
					function f(a) {
						a.tagName || (a = a.getDom());
						e.left = parseInt(a.style.left);
						e.top = parseInt(a.style.top);
						e.top -= k.offsetHeight + 15;
						d(e)
					}
					var e = {},
						k = this.getDom(),
						h = b.getFixedLayer();
					this.eventType = a.type;
					k.style.cssText = "display:block;left:-9999px";
					if ("contextmenu" == a.type && c) {
						var l = g.getElementsByTagName(h, "div", "edui-contextmenu")[0];
						l ? f(l) : this.editor.addListener("aftershowcontextmenu", function(a, b) {
							f(b)
						})
					} else e = b.getViewportOffsetByEvent(a), e.top -= k.offsetHeight + this.SPACE + 15, e.left += this.SPACE + 15, e.left > window.document.body.offsetWidth - 320 && (e.left = window.document.body.offsetWidth - 330), 100 > e.top && (e.top += k.offsetHeight + 2 * (this.SPACE + 15)), d(e), this.setOpacity(k, .2);
					this.isHidden = !1;
					this.left = a.screenX + k.offsetWidth / 2 - this.SPACE;
					this.top = a.screenY - k.offsetHeight / 2 - this.SPACE;
					this.editor && (k.style.zIndex = 1 * this.editor.container.style.zIndex + 10, h.style.zIndex = k.style.zIndex - 1)
				},
				hide: function() {
					this.getDom() && (this.getDom().style.display = "none");
					this.isHidden = !0
				},
				postRender: function() {
					if (f.isArray(this.items)) for (var a = 0, b; b = this.items[a++];)"function" == typeof b.renderHtml && b.postRender()
				},
				getHtmlTpl: function() {
					var a;
					if (f.isArray(this.items)) {
						a = [];
						for (var b = 0; b < this.items.length; b++) if ("function" == typeof this.items[b].renderHtml) a[b] = this.items[b].renderHtml();
						else if ("|" == this.items[b] || "<br>" == this.items[b]) a[b] = "<br/>";
						a = a.join("")
					} else a = this.items;
					return '<div id="##" class="%% edui-toolbar" data-src="shortcutmenu" onmousedown="return false;" onselectstart="return false;" >' + a + "</div>"
				}
			};
			f.inherits(k, e);
			g.on(document, "mousedown", function(a) {
				c(a)
			});
			g.on(window, "scroll", function(a) {
				c(a)
			})
		})();
		(function() {
			var c = p.editor.utils,
				a = p.editor.ui.UIBase,
				e = p.editor.ui.Breakline = function(a) {
					this.initOptions(a);
					this.initSeparator()
				};
			e.prototype = {
				uiName: "Breakline",
				initSeparator: function() {
					this.initUIBase()
				},
				getHtmlTpl: function() {
					return "<br/>"
				}
			};
			c.inherits(e, a)
		})();
		(function() {
			var c = p.editor.utils,
				a = p.editor.dom.domUtils,
				e = p.editor.ui.UIBase,
				b = p.editor.ui.Message = function(a) {
					this.initOptions(a);
					this.initMessage()
				};
			b.prototype = {
				initMessage: function() {
					this.initUIBase()
				},
				getHtmlTpl: function() {
					return '<div id="##" class="edui-message %%"> <div id="##_closer" class="edui-message-closer">×</div> <div id="##_body" class="edui-message-body edui-message-type-info"> <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="about:blank"></iframe> <div class="edui-shadow"></div> <div id="##_content" class="edui-message-content">  </div> </div></div>'
				},
				reset: function(a) {
					var b = this;
					a.keepshow || (clearTimeout(this.timer), b.timer = setTimeout(function() {
						b.hide()
					}, a.timeout || 4E3));
					void 0 !== a.content && b.setContent(a.content);
					void 0 !== a.type && b.setType(a.type);
					b.show()
				},
				postRender: function() {
					var b = this,
						c = this.getDom("closer");
					c && a.on(c, "click", function() {
						b.hide()
					})
				},
				setContent: function(a) {
					this.getDom("content").innerHTML = a
				},
				setType: function(a) {
					a = a || "info";
					var b = this.getDom("body");
					b.className = b.className.replace(/edui-message-type-[\w-]+/, "edui-message-type-" + a)
				},
				getContent: function() {
					return this.getDom("content").innerHTML
				},
				getType: function() {
					var a = this.getDom("body").match(/edui-message-type-([\w-]+)/);
					return a ? a[1] : ""
				},
				show: function() {
					this.getDom().style.display = "block"
				},
				hide: function() {
					var a = this.getDom();
					a && (a.style.display = "none", a.parentNode && a.parentNode.removeChild(a))
				}
			};
			c.inherits(b, e)
		})();
		(function() {
			var c = p.editor.utils,
				a = p.editor.ui.uiUtils,
				e = p.editor.ui.RemoteContent,
				b = p.editor.ui.Popup,
				f = p.editor.ui.SplitButton,
				g = p.editor.ui.RemoteButton = function(a) {
					this.initOptions(a);
					this.initRemoteButton()
				};
			g.prototype = {
				initRemoteButton: function() {
					var a = this;
					this.popup = new b({
						content: new e({
							editor: a.editor,
							ongetremotesuccess: function(b) {
								a.popup.hide()
							}
						}),
						editor: a.editor
					});
					this.initSplitButton()
				},
				_SplitButton_postRender: f.prototype.postRender,
				postRender: function() {
					this._SplitButton_postRender();
					this.getDom("button_body").appendChild(a.createElementByHtml('<div id="' + this.id + '_colorlump" class="edui-colorlump"></div>'));
					this.getDom().className += " edui-remotebutton"
				}
			};
			c.inherits(g, f)
		})();
		UE.plugins.editor135 = function() {
			var c = this,
				a = this,
				e = p.editor.ui,
				b = p.editor.dom.domUtils,
				f = "shadowcolor";
			e[f] = function(a) {
				return function(b) {
					var c = new e.ColorButton({
						className: "edui-for-" + a,
						color: "default",
						title: "文字阴影色",
						editor: b,
						onpickcolor: function(c, d) {
							b.execCommand(a, d + " 2px 2px 10px")
						},
						onpicknocolor: function() {
							b.execCommand(a, "default");
							this.setColor("transparent");
							this.color = "default"
						},
						onbuttonclick: function() {
							b.execCommand(a, this.color + " 2px 2px 10px")
						}
					});
					e.buttons[a] = c;
					b.addListener("selectionchange", function() {
						c.setDisabled(-1 == b.queryCommandState(a))
					});
					return c
				}
			}(f);
			a.addListener("sourcemodechanged", function(b, c) {
				if (!c) {
					jQuery(a.document).find("#body-css").remove();
					var d = "";
					jQuery("[cdata_tag=style]", a.document).each(function() {
						d += jQuery(this).attr("cdata_data") + ";"
					});
					jQuery('<style id="body-css">').text(d).appendTo(jQuery("head", a.document))
				}
			});
			setTimeout(function() {
				a.fireEvent("sourcemodechanged", !1)
			}, 3E3);
			f = "remotecontent";
			e[f] = function(a) {
				return function(b) {
					var c = new e.RemoteButton({
						className: "edui-for-" + a,
						color: "default",
						title: "导入文章内容",
						editor: b,
						onbuttonclick: function() {
							this.showPopup()
						}
					});
					e.buttons[a] = c;
					b.addListener("selectionchange", function() {
						c.setDisabled(-1 == b.queryCommandState(a))
					});
					return c
				}
			}(f);
			f = "more";
			e[f] = function(a) {
				return function(d) {
					d.registerCommand(a, {
						execCommand: function() {
							var a = d.container;
							jQuery(a).hasClass("show-edui-more") ? (jQuery(a).removeClass("show-edui-more"), c.setPreferences("showmore", !1)) : (jQuery(a).addClass("show-edui-more"), c.setPreferences("showmore", !0));
							a = d.ui.getDom("toolbarbox");
							b.hasClass(a, "show-edui-more") ? b.removeClasses(a, "show-edui-more") : b.addClass(a, "show-edui-more")
						}
					});
					return new UE.ui.Button({
						name: a,
						title: "更多",
						onclick: function() {
							d.execCommand(a)
						}
					})
				}
			}(f);
			var g = new UE.ui.Dialog({
				iframeUrl: a.options.UEDITOR_HOME_URL + "dialogs/135editor/135BgDialog.html",
				editor: c,
				name: "135BgDialog",
				title: "背景图设置",
				cssRules: "width:600px;height:300px;",
				buttons: [{
					className: "edui-okbutton",
					label: "确定",
					onclick: function() {
						g.close(!0)
					}
				}, {
					className: "edui-cancelbutton",
					label: "取消",
					onclick: function() {
						g.close(!1)
					}
				}]
			}),
				d = new UE.ui.Dialog({
					iframeUrl: a.options.UEDITOR_HOME_URL + "dialogs/135editor/135BdBgDialog.html",
					editor: c,
					name: "135BdBgDialog",
					title: "边框底纹设置",
					cssRules: "width:800px;height:400px;",
					buttons: [{
						className: "edui-okbutton",
						label: "确定",
						onclick: function() {
							d.close(!0)
						}
					}, {
						className: "edui-cancelbutton",
						label: "取消",
						onclick: function() {
							d.close(!1)
						}
					}]
				}),
				l = new UE.ui.Dialog({
					iframeUrl: a.options.UEDITOR_HOME_URL + "dialogs/135editor/135Paragraph.html",
					editor: c,
					name: "135Paragraph",
					title: "段落设置",
					cssRules: "width:420px;height:240px;",
					buttons: []
				});
			"undefined" == typeof window.showSuccessMessage && (window.showSuccessMessage = function(a) {
				var d = c.document.getElementById("editor135_msg");
				d && b.remove(d);
				c.fireEvent("showmessage", {
					content: a,
					timeout: 3E3
				})
			});
			var k = new p.editor.ui.Popup({
				content: "",
				editor: c,
				_remove: function() {
					jQuery(k.anchorEl).remove();
					k.hide()
				},
				_copy: function() {
					k.hide()
				},
				_convertImage: function() {
					window.ajaxAction && window.ajaxAction("//" + a.options.plat_host + "/html_images/save", {
						html: jQuery(k.anchorEl).prop("outerHTML")
					}, null, function(a) {
						0 == a.ret || a.success ? (jQuery(k.anchorEl).replaceWith(a.html), window.showSuccessMessage(a.msg)) : window.showErrorMessage(a.msg)
					});
					k.hide()
				},
				_saveTemplate: function() {
					window.ajaxAction && window.ajaxAction("//" + a.options.plat_host + "/user_styles/saveTemplate", {
						content: jQuery(k.anchorEl).prop("outerHTML")
					}, null, function(a) {
						0 == a.ret ? window.showSuccessMessage(a.msg) : window.showErrorMessage(a.msg)
					});
					k.hide()
				},
				_clean: function() {
					window.ajaxAction && window.ajaxAction("//" + a.options.plat_host + "/html_parsers/clean", {
						html: jQuery(k.anchorEl).prop("outerHTML")
					}, null, function(a) {
						a.success || 0 == a.ret ? (jQuery(k.anchorEl).replaceWith(a.html), window.showSuccessMessage(a.msg)) : window.showErrorMessage(a.msg)
					});
					k.hide()
				},
				select: function() {
					var a = c.selection.getRange();
					a.selectNode(k.anchorEl);
					a.select()
				},
				_blank: function() {
					var a = c.selection.getRange(),
						b = jQuery('<section data-role="paragraph" class="_135editor"><p><br/></p></section>');
					b.insertAfter(k.anchorEl);
					b = b.find("p").get(0);
					a.setStart(b, 0).setCursor(!1, !0);
					k.hide()
				},
				_preblank: function() {
					var a = c.selection.getRange(),
						b = jQuery('<section data-role="paragraph" class="_135editor"><p><br/></p></section>');
					b.insertBefore(k.anchorEl);
					b = b.find("p").get(0);
					a.setStart(b, 0).setCursor(!1, !0);
					k.hide()
				},
				_usecolor: function() {
					var a = "id",
						b = jQuery(k.anchorEl).data("id");
					"undefined" == typeof b && (a = "role", b = jQuery(k.anchorEl).data("role"));
					var d = c.selection.document,
						f = jQuery(k.anchorEl).attr("data-color"),
						e = jQuery("._135editor[data-" + a + "=" + b + "]", d).size() - 1;
					f && jQuery("._135editor[data-" + a + "=" + b + "]", d).each(function() {
						this != jQuery(k.anchorEl).get(0) && f != jQuery(this).attr("data-color") && (parseObject(jQuery(this), f, "#FFF"), jQuery(this).attr("data-color", f), jQuery(this).attr("data-custom", f))
					});
					var g = [];
					if (0 < jQuery(k.anchorEl).find(".layout").size()) {
						var h = jQuery(k.anchorEl).find(".layout:first").parent();
						2 >= h.find("> .layout").size() && jQuery(k.anchorEl).find(".layout:first").parents("._135editor:first").get(0) == jQuery(k.anchorEl).get(0) && (g = h.find("> .layout"))
					}
					0 < g.length ? jQuery("._135editor[data-" + a + "=" + b + "]", d).each(function() {
						if (this != jQuery(k.anchorEl).get(0)) {
							var a = jQuery(this).find(".layout:first").parent(),
								b = a.find("> .layout").size();
							2 != b && 1 != b || jQuery(this).find(".layout:first").parents("._135editor:first").get(0) != jQuery(this).get(0) || a.find("> .layout").each(function(a) {
								this.style.width = g.get(a).style.width;
								jQuery(this).attr("data-width", g.get(a).style.width)
							})
						}
					}) : jQuery(k.anchorEl).get(0).style.width && jQuery("._135editor[data-" + a + "=" + b + "]", d).each(function() {
						this != jQuery(k.anchorEl).get(0) && (this.style.width = jQuery(k.anchorEl).get(0).style.width, this.style.margin = "0 auto", jQuery(this).attr("data-width", jQuery(k.anchorEl).get(0).style.width))
					});
					0 < e ? (c.undoManger.save(), window.showSuccessMessage("为您同步变换了" + e + "个样式的颜色，节省时间" + 10 * e + "秒")) : window.showErrorMessage("未找到使用相同样式的内容")
				},
				_autonum: function() {
					var a = jQuery(k.anchorEl).data("id"),
						b = c.selection.document;
					if (a) {
						var d = 0;
						jQuery("._135editor[data-id=" + a + "]", b).each(function(a) {
							jQuery(this).find(".autonum:first").html(a + 1);
							d++
						});
						window.showSuccessMessage("为您自动编号了" + d + "个样式，节省时间" + 10 * d + "秒");
						c.undoManger.save()
					}
				},
				_135bg: function() {
					g.render();
					g.open();
					g.anchorEl = k.anchorEl
				},
				_135bdbg: function() {
					d.render();
					d.open();
					d.anchorEl = k.anchorEl
				},
				_135para: function() {
					l.render();
					l.open();
					l.anchorEl = k.anchorEl
				},
				_135music: function() {
					c.ui._dialogs.musicDialog && c.ui._dialogs.musicDialog.open();
					c.ui._dialogs.musicDialog.anchorEl = k.anchorEl
				},
				_135video: function() {
					c.ui._dialogs.insertvideoDialog && c.ui._dialogs.insertvideoDialog.open();
					c.ui._dialogs.insertvideoDialog.anchorEl = k.anchorEl
				},
				_135item: null,
				className: "edui-bubble"
			}),
				n = null;
			c.addListener("beforesetcontent", function(a, b, d) {
				b.html = c.parseInsertPasteSetHtml(b.html)
			});
			c.addListener("beforepaste", function(a, b, d) {
				b.html = c.parseInsertPasteSetHtml(b.html)
			});
			c.addListener("beforegetcontent", function(a) {
				jQuery(c.document).find(".135editor").removeClass("135editor").addClass("_135editor");
				jQuery(c.document).find("._135editor").each(function() {
					jQuery(c.current_active_135item).find(".tool-border").remove();
					jQuery(c.current_active_135item).removeClass("active-135item")
				})
			});
			c.addListener("contentchange", function() {
				"" == c.getContent() ? (n = c.selection.document, $(n).find("body").addClass("guide")) : $(n).find("body").removeClass("guide")
			});
			c.addListener("ready", function(a) {
				n = c.selection.document;
				a = c.getPreferences("editor135");
				(null == a || a && (null == a.showmore || 1 == a.showmore)) && c.execCommand("more");
				(a = b.findParent(c.iframe.parentNode, function(a) {
					return "FORM" == a.tagName
				}, !0)) && jQuery(a).submit(function() {
					c.sync()
				});
				var d = 0;
				jQuery(n).on({
					touchstart: function(a) {
						d = a;
						timeOutEvent = setTimeout(function() {}, 500)
					},
					touchmove: function() {
						clearTimeout(timeOutEvent);
						timeOutEvent = 0
					},
					touchend: function(a) {
						clearTimeout(timeOutEvent);
						0 != timeOutEvent && c.fireEvent("click", d);
						return !1
					}
				});
				jQuery(n).on("copy", function(a) {
					if (a.originalEvent) {
						var b = a.originalEvent.clipboardData,
							d = c.parseWxHtml(getSelectionHtml());
						console.log(d);
						b.setData("text/html", d);
						b.setData("text/plain", d);
						window.showSuccessMessage("已成功复制到剪切板");
						return a.preventDefault()
					}
					if (window.clipboardData) return b = window.clipboardData, d = c.parseWxHtml(getSelectionHtml()), b.setData("text/html", d), b.setData("text/plain", d), window.showSuccessMessage("已成功复制到剪切板"), a.preventDefault()
				});
				jQuery(n).keydown(function(a) {
					window.current_editor = c;
					27 == a.keyCode ? (c.current_active_135item && (jQuery(c.current_active_135item).find(".tool-border").remove(), c.current_active_135item.removeClass("active-135item"), c.current_active_135item = null), clean_135helper(), k.hide()) : (a.ctrlKey || a.metaKey) && 65 == a.keyCode ? (window.replace_full_color = !0, clean_135helper(), "function" == typeof showColorPlan && showColorPlan(), 0 < jQuery("#replace-color-all").size() && jQuery("#replace-color-all").prop("checked", !0), clearInterval(ga), ga = setTimeout(function() {
						window.replace_full_color = !1;
						0 < jQuery("#replace-color-all").size() && jQuery("#replace-color-all").prop("checked", !1);
						window.showSuccessMessage("全文换色模式已关闭")
					}, 3E4)) : (a.ctrlKey || a.metaKey) && 67 == a.keyCode && clean_135helper()
				});
				jQuery(n).on("dblclick", "img", function() {
					jQuery(this).attr("word_img") ? c.ui._dialogs.wordimageDialog && c.ui._dialogs.wordimageDialog.open() : c.ui._dialogs.insertimageDialog && c.ui._dialogs.insertimageDialog.open()
				});
				jQuery(n).on("dblclick", "area", function() {
					c.ui._dialogs.insertimageDialog && c.ui._dialogs.insertimageDialog.open()
				})
			});
			c.addListener("keyup", function(a, b) {
				p.editor.ui.Popup.postHide(b)
			});


			c.addListener("click", function(a, b) {

				b = b || window.event;
				var d = b.target || b.srcElement;
				window.current_editor = c;
				console.log(c);
				console.log( d.tagName)
				console.log(b)
				jQuery(document).trigger("mousedown.colorPicker");
				jQuery(document).trigger("click");
				if ("AREA" == d.tagName) {
					var f = jQuery(d).parent("map").attr("id"),
						e = jQuery("img[usemap='#" + f + "']", n).get(0),
						f = c.selection.getRange();
					f.selectNode(e);
					f.select()
				} else {
					f = c.selection.getRange();
					e = f.getClosedNode();
					"IMG" == d.tagName ? window.current_edit_img = d : "touchstart" != b.type && (e = f.startContainer, 3 == e.nodeType && (e = e.parentNode), d = e);
					if (!1 === f.collapsed && (e = f.getClosedNode(), !e || "IMG" != e.tagName)) return;
					if (jQuery(d).hasClass("_135editor") || 0 < jQuery(d).parents("._135editor").size()) {
						jQuery(d).hasClass("_135editor") || (d = jQuery(d).parents("._135editor:first").get(0));
						clean_135helper();
						e = jQuery(d).clone();
						e.find(".tool-border").remove();
						e = null;
						c.current_active_135item && (jQuery(c.current_active_135item).find(".tool-border").remove(), c.current_active_135item.removeClass("active-135item"));
						c.current_active_135item = jQuery(d);
						c.current_active_135item.addClass("active");
						0 == c.current_active_135item.find(".tool-border").size() && c.current_active_135item.prepend('<section class="tool-border" style="z-index:100;"><section style="position: absolute; border-top:1px dashed red; width: 100%; top: -2px; "></section><section style="position: absolute; border-top:1px dashed red; width: 100%; bottom: -2px; "></section><section style="position: absolute; border-top:1px dashed red; width: 5px; top: -2px; left: -5px; "></section><section style="position: absolute; border-top:1px dashed red; width: 5px; top: -2px; right: -5px; "></section><section style="position: absolute; border-top:1px dashed red; width: 5px; bottom: -2px; left: -5px; "></section><section style="position: absolute; border-top:1px dashed red; width: 5px; bottom: -2px; right: -5px; "></section><section style="position: absolute; border-left:1px dashed red; height: 100%; left: -5px; "></section><section style="position: absolute; border-right:1px dashed red;height: 100%; right: -5px; "></section><section style="position: absolute; border-left:1px dashed red; height: 5px; bottom: -2px; left: -5px; "></section><section style="position: absolute; border-left:1px dashed red; height: 5px; top: -2px; left: -5px; "></section><section style="position: absolute; border-left:1px dashed red; height: 5px; bottom: -2px; right: -5px; "></section><section style="position: absolute; border-left:1px dashed red; height: 5px; top: -2px; right: -5px; "></section></section>');
						e = jQuery(c.container).offset().top + b.clientY + jQuery(c.container).find(".edui-editor-toolbarbox").height();
						"function" == typeof showColorPlan && showColorPlan(e);
						k.render();
						var g = k.formatHtml('<nobr class="otf-poptools"><span class="copy" title="复制样式代码" stateful>复制</span><span class="cut" title="复制样式后，删除对应内容" stateful>剪切</span><span class="select" title="选中后，可以将样式秒刷更换为别的样式" onclick="$$.select()" stateful>选中</span><span onclick="$$._remove()" title="删除本样式" stateful>删除</span><span class="_135autonum hidden" title="将所有出现的与本样式相同的样式序号从小到大编号" onclick="$$._autonum()" stateful>自动编号</span><span class="_135bg hidden" onclick="$$._135bg()" title="设置背景图片" stateful>背景图</span><span class="_135video hidden" onclick="$$._135video()" title="更换视频地址" stateful>视频</span><span class="_135music hidden" onclick="$$._135music()" title="编辑音乐地址" stateful>音乐</span><span class="_135bdbg hidden" onclick="$$._135bdbg()" title="设置边框类型" stateful>边框</span><span class="_135para" onclick="$$._135para()" title="设置段落字体、缩进、行高、段落间距等。" stateful>段落</span><span class="_135colors" onclick="$$._usecolor()" title="将换色与宽度调整应用到其它相同样式" stateful>传递</span><br/><span class="_135clean hidden" onclick="$$._clean()" title="清除样式" stateful>清除样式</span><span class="_135convertImage"  onclick="$$._convertImage()" title="转为图片" stateful>转为图片</span><span class="_135saveTemplate"  onclick="$$._saveTemplate()" title="保存为个人样式" stateful>保存</span><span onclick="$$._blank()" title="样式之后插入空行" stateful>后空行</span><span onclick="$$._preblank()" title="样式之前插入空行" stateful>前空行</span><div class="_135layout slider" style="height:16px;margin-bottom:5px;"><span style="float:right;z-index: 5;color: #333;line-height: 16px;font-size: 10px;" title="调整左右分栏宽度比例">调整宽度比例</span></div><div><input type="text" style="width:30px;float:right;border:0 none;height:16px;line-height:14px;color:#333;font-size:12px;text-align: right;padding:0 2px;" name="rotatez" placeholder="输入"><div class="_135rotate slider" style="height:16px;margin-bottom:5px;margin-right:35px;"><span style="float:right;z-index: 5;color: #333;line-height: 16px;font-size: 10px;">旋转角度（-180~180）</span></div></div><div><input type="text" style="width:30px;float:right;border:0 none;height:16px;line-height:14px;color:#333;font-size:12px;text-align: right;padding:0 2px;" name="opacity" placeholder="输入"><div class="_135opacity slider" style="height:16px;margin-bottom:5px;margin-right:35px;"><span style="float:right;z-index: 5;color: #333;line-height: 16px;font-size: 10px;">透明度（0~1）</span></div></div></nobr>'),
							h = k.getDom("content");
						h.innerHTML = g;
						jQuery(h).find("._135clean").removeClass("hidden");
						"function" == typeof jQuery.fn.tooltip && jQuery(h).find("span").tooltip();
						c.options.open_editor && (jQuery(h).find("._135convertImage").addClass("hidden"), jQuery(h).find("._135saveTemplate").addClass("hidden"));
						jQuery(d).find(".135bg").size() && jQuery(h).find("._135bg").removeClass("hidden");
						jQuery(d).find(".autonum").size() && jQuery(h).find("._135autonum").removeClass("hidden");
						jQuery(d).find("audio").size() && jQuery(h).find("._135music").removeClass("hidden");
						jQuery(d).find(".video_iframe").size() && jQuery(h).find("._135video").removeClass("hidden");
						var l = !1;
						jQuery(d).find("*").each(function() {
							if (this.style.background || this.style.border || this.style.borderBottom || this.style.borderTop || this.style.borderLeft || this.style.borderRight) l = !0
						});
						l && UE.browser.webkit && jQuery(h).find("._135bdbg").removeClass("hidden");
						k.anchorEl = d;
						k.showAnchor(k.anchorEl);
						(g = d.style.transform) && -1 < g.toLowerCase().indexOf("rotatez(") ? (g = parseInt(g.toLowerCase().replace("rotatez", "").replace("(", "").replace(")", "")), 180 < g ? g -= 360 : -180 > g && (g += 360)) : g = 0;
						g = 100 * (g + 180) / 360;
						jQuery(h).find("._135rotate").attr("data-param-init-value", g).on("inited", function(a, b) {
							var c = parseInt(360 * b / 100 - 180);
							jQuery(this).find(".complete").html(c);
							jQuery(h).find("input[name=rotatez]").val(c)
						}).slider({
							initAll: !1,
							initValue: g
						}).on("change", function(a, b) {
							var f = parseInt(360 * b / 100 - 180);
							jQuery(this).find(".complete").html(f);
							c.setElementTransform(d, "rotatez(" + f + "deg)");
							jQuery(h).find("input[name=rotatez]").val(f)
						});
						jQuery(h).find("input[name=rotatez]").on("keyup", function() {
							if ("" == this.value || "NaN" == parseInt(this.value)) this.value = 0;
							var a = parseInt(this.value) % 180;
							a != parseInt(this.value) && (this.value = a);
							jQuery(h).find("._135rotate").find(".complete").html(this.value);
							a = parseInt(this.value) + 180;
							a = parseInt(100 * a / 360);
							jQuery(h).find("._135rotate").data("slider").val(a);
							c.setElementTransform(d, "rotatez(" + this.value + "deg)")
						});
						g = 100 * jQuery(d).css("opacity");
						jQuery(h).find("._135opacity").attr("data-param-init-value", g).on("inited", function(a, b) {
							var c = b / 100;
							jQuery(h).find("input[name=opacity]").val(c)
						}).slider({
							initAll: !1,
							initValue: g
						}).on("change", function(a, b) {
							var c = b / 100;
							jQuery(d).css("opacity", c);
							jQuery(h).find("input[name=opacity]").val(c)
						});
						jQuery(h).find("input[name=opacity]").on("keyup", function() {
							if ("" == this.value || "NaN" == parseInt(this.value)) this.value = 0;
							jQuery(d).css("opacity", this.value);
							jQuery(h).find("._135opacity").find(".complete").html(this.value);
							var a = 100 * this.value;
							jQuery(h).find("._135opacity").data("slider").val(a)
						});
						var m = jQuery(d).find(".layout:first").parent(),
							r = m.find("> .layout").size();
						if (0 == r) {
							var g = jQuery(d).get(0).style.width,
								p = !0;
							0 <= g.indexOf("%") ? g = g.replace("%", "") : 0 <= g.indexOf("px") ? (p = !1, g = g.replace("px", ""), g = parseInt(100 * g / jQuery(d).width())) : g = 100;
							jQuery(h).find("._135layout").attr("data-param-init-value", g).removeClass("hidden").on("inited", function(a, b) {
								jQuery(this).find(".complete").html(b + "%")
							}).slider({
								initAll: !1,
								initValue: g
							}).on("change", function(a, b) {
								if (p) jQuery(this).find(".complete").html(b + "%"), jQuery(d).css("margin", "0 auto").css("width", b + "%").attr("data-width", b + "%");
								else {
									var c = parseInt(jQuery(d).width() * b / 100);
									jQuery(this).find(".complete").html(c + "px");
									jQuery(d).css("margin", "0 auto").css("width", c + "px")
								}
							})
						}
						2 != r && 1 != r || jQuery(d).find(".layout:first").parents("._135editor:first").get(0) != jQuery(d).get(0) || (g = jQuery(d).find(".layout").get(0).style.width, p = !0, 0 <= g.indexOf("%") ? g = g.replace("%", "") : 0 <= g.indexOf("px") ? (p = !1, g = g.replace("px", ""), g = parseInt(100 * g / jQuery(d).width())) : g = 100, jQuery(h).find("._135layout").attr("data-param-init-value", g).removeClass("hidden").on("inited", function(a, b) {
							jQuery(this).find(".complete").html(b + "%")
						}).slider({
							initAll: !1,
							initValue: g
						}).on("change", function(a, b) {
							if (p) jQuery(this).find(".complete").html(b + "%"), m.find("> .layout").eq(0).css("width", b + "%").attr("data-width", b + "%"), 2 == r && m.find("> .layout").eq(1).css("width", 100 - b + "%").attr("data-width", 100 - b + "%");
							else {
								var c = parseInt(jQuery(d).width() * b / 100);
								jQuery(this).find(".complete").html(c + "px");
								m.find("> .layout").eq(0).css("width", c + "px")
							}
						}));
						var g = parseInt(k.getDom().style.top.replace("px", "")),
							q = jQuery(h).height() + 16;
						if (g + q > jQuery(window).height()) f = jQuery(k.anchorEl).height(), 135 < g - f - q ? k.getDom().style.top = g - f - q + "px" : 135 < e - q - 135 ? k.getDom().style.top = e - q - 135 + "px" : k.getDom().style.top = e + q + 135 + "px";
						else if (q = b.target || b.srcElement, e = f.getClosedNode(), "IMG" == q.tagName || e && "IMG" == e.tagName) k.getDom().style.top = g + 60 + "px";
						c.current_active_135item.attr("data-color") && (f = c.current_active_135item.attr("data-color"), jQuery("#custom-color-text").val(f).css("background-color", f));
						if (ZeroClipboard) {
							var t = new ZeroClipboard(jQuery(k.getDom("content")).find(".copy"));
							t.on("ready", function(a) {
								t.on("copy", function(a) {
									jQuery(k.anchorEl).find(".tool-border").remove();
									jQuery(k.anchorEl).removeClass("active-135item");
									a.clipboardData.setData("text/html", jQuery(k.anchorEl).prop("outerHTML"));
									k.hide();
									window.showSuccessMessage("样式已成功复制到剪切板")
								})
							});
							var y = new ZeroClipboard(jQuery(k.getDom("content")).find(".cut"));
							y.on("ready", function(a) {
								y.on("copy", function(a) {
									jQuery(k.anchorEl).find(".tool-border").remove();
									jQuery(k.anchorEl).removeClass("active-135item");
									a.clipboardData.setData("text/html", jQuery(k.anchorEl).prop("outerHTML"));
									k.hide();
									jQuery(k.anchorEl).remove();
									window.showSuccessMessage("样式已成功剪切到剪切板")
								})
							})
						} else jQuery(k.getDom("content")).find(".copy").remove(), jQuery(k.getDom("content")).find(".cut").remove()
					} else clean_135helper(), c.current_active_135item && (jQuery(c.current_active_135item).find(".tool-border").remove(), c.current_active_135item.removeClass("active-135item"), c.current_active_135item = null)
				}
			})
		};
		(function() {
			var c = p.editor.utils,
				a = p.editor.ui,
				e = a.Dialog;
			a.buttons = {};
			a.Dialog = function(a) {
				var b = new e(a);
				b.addListener("hide", function() {
					if (b.editor) {
						var a = b.editor;
						try {
							if (t.gecko) {
								var c = a.window.scrollY,
									d = a.window.scrollX;
								a.body.focus();
								a.window.scrollTo(d, c)
							} else a.focus()
						} catch (v) {}
					}
				});
				return b
			};
			for (var b = {
				anchor: "~/dialogs/anchor/anchor.html",
				insertimage: "~/dialogs/image/image.html",
				imgstyle: "~/dialogs/135editor/imgstyle.html",
				link: "~/dialogs/link/link.html",
				spechars: "~/dialogs/spechars/spechars.html",
				searchreplace: "~/dialogs/searchreplace/searchreplace.html",
				map: "~/dialogs/map/map.html",
				gmap: "~/dialogs/gmap/gmap.html",
				insertvideo: "~/dialogs/video/video.html",
				help: "~/dialogs/help/help.html",
				preview: "~/dialogs/preview/preview.html",
				emotion: "~/dialogs/emotion/emotion.html",
				wordimage: "~/dialogs/wordimage/wordimage.html",
				attachment: "~/dialogs/attachment/attachment.html",
				insertframe: "~/dialogs/insertframe/insertframe.html",
				edittip: "~/dialogs/table/edittip.html",
				edittable: "~/dialogs/table/edittable.html",
				edittd: "~/dialogs/table/edittd.html",
				webapp: "~/dialogs/webapp/webapp.html",
				snapscreen: "~/dialogs/snapscreen/snapscreen.html",
				scrawl: "~/dialogs/scrawl/scrawl.html",
				music: "~/dialogs/music/music.html",
				template: "~/dialogs/template/template.html",
				background: "~/dialogs/background/background.html",
				charts: "~/dialogs/charts/charts.html"
			}, f = "undo redo formatmatch bold italic underline fontborder touppercase tolowercase strikethrough subscript superscript source indent outdent blockquote pasteplain pagebreak selectall print horizontal removeformat time date unlink insertparagraph insertparagraphbeforetable insertrow insertcol mergeright mergedown deleterow deletecol splittorows splittocols splittocells mergecells deletetable drafts".split(" "), g = 0, d; d = f[g++];) d = d.toLowerCase(), a[d] = function(b) {
				return function(c) {
					var d = new a.Button({
						className: "edui-for-" + b,
						title: c.options.labelMap[b] || c.getLang("labelMap." + b) || "",
						onclick: function() {
							c.execCommand(b)
						},
						theme: c.options.theme,
						showText: !1
					});
					a.buttons[b] = d;
					c.addListener("selectionchange", function(a, f, e) {
						a = c.queryCommandState(b); - 1 == a ? (d.setDisabled(!0), d.setChecked(!1)) : e || (d.setDisabled(!1), d.setChecked(a))
					});
					return d
				}
			}(d);
			a.cleardoc = function(b) {
				var c = new a.Button({
					className: "edui-for-cleardoc",
					title: b.options.labelMap.cleardoc || b.getLang("labelMap.cleardoc") || "",
					theme: b.options.theme,
					onclick: function() {
						confirm(b.getLang("confirmClear")) && b.execCommand("cleardoc")
					}
				});
				a.buttons.cleardoc = c;
				b.addListener("selectionchange", function() {
					c.setDisabled(-1 == b.queryCommandState("cleardoc"))
				});
				return c
			};
			var f = {
				justify: ["left", "right", "center", "justify"],
				imagefloat: ["none", "left", "center", "right"],
				directionality: ["ltr", "rtl"]
			},
				l;
			for (l in f)(function(b, c) {
				for (var d = 0, f; f = c[d++];)(function(c) {
					a[b.replace("float", "") + c] = function(d) {
						var f = new a.Button({
							className: "edui-for-" + b.replace("float", "") + c,
							title: d.options.labelMap[b.replace("float", "") + c] || d.getLang("labelMap." + b.replace("float", "") + c) || "",
							theme: d.options.theme,
							onclick: function() {
								d.execCommand(b, c)
							}
						});
						a.buttons[b] = f;
						d.addListener("selectionchange", function(a, e, k) {
							f.setDisabled(-1 == d.queryCommandState(b));
							f.setChecked(d.queryCommandValue(b) == c && !k)
						});
						return f
					}
				})(f)
			})(l, f[l]);
			for (g = 0; d = ["backcolor", "forecolor"][g++];) a[d] = function(b) {
				return function(c) {
					var d = new a.ColorButton({
						className: "edui-for-" + b,
						color: "default",
						title: c.options.labelMap[b] || c.getLang("labelMap." + b) || "",
						editor: c,
						onpickcolor: function(a, d) {
							c.execCommand(b, d)
						},
						onpicknocolor: function() {
							c.execCommand(b, "default");
							this.setColor("transparent");
							this.color = "default"
						},
						onbuttonclick: function() {
							c.execCommand(b, this.color)
						}
					});
					a.buttons[b] = d;
					c.addListener("selectionchange", function() {
						d.setDisabled(-1 == c.queryCommandState(b))
					});
					return d
				}
			}(d);
			f = {
				noOk: ["searchreplace", "help", "imgstyle", "webapp", "preview"],
				ok: "attachment anchor link insertimage map gmap insertframe wordimage insertvideo insertframe edittip edittable edittd scrawl template music background charts".split(" ")
			};
			for (l in f)(function(d, f) {
				for (var e = 0, g; g = f[e++];) t.opera && "searchreplace" === g ||
				function(f) {
					a[f] = function(e, g, k) {
						g = g || (e.options.iframeUrlMap || {})[f] || b[f];
						k = e.options.labelMap[f] || e.getLang("labelMap." + f) || "";
						var h;
						g && (h = new a.Dialog(c.extend({
							iframeUrl: e.ui.mapUrl(g),
							editor: e,
							className: "edui-for-" + f,
							title: k,
							holdScroll: "insertimage" === f,
							fullscreen: /charts/.test(f),
							closeDialog: e.getLang("closeDialog")
						}, "ok" == d ? {
							buttons: [{
								className: "edui-okbutton",
								label: e.getLang("ok"),
								editor: e,
								onclick: function() {
									h.close(!0)
								}
							}, {
								className: "edui-cancelbutton",
								label: e.getLang("cancel"),
								editor: e,
								onclick: function() {
									h.close(!1)
								}
							}]
						} : {})), e.ui._dialogs[f + "Dialog"] = h);
						var l = new a.Button({
							className: "edui-for-" + f,
							title: k,
							onclick: function() {
								if (h) switch (f) {
								case "wordimage":
									var a = e.execCommand("wordimage");
									a && a.length && (h.render(), h.open());
									break;
								case "scrawl":
									-1 != e.queryCommandState("scrawl") && (h.render(), h.open());
									break;
								default:
									h.render(), h.open()
								}
							},
							theme: e.options.theme,
							disabled: "scrawl" == f && -1 == e.queryCommandState("scrawl") || "charts" == f
						});
						a.buttons[f] = l;
						e.addListener("selectionchange", function() {
							if (!(f in {
								edittable: 1
							})) {
								var a = e.queryCommandState(f);
								l.getDom() && (l.setDisabled(-1 == a), l.setChecked(a))
							}
						});
						return l
					}
				}(g.toLowerCase())
			})(l, f[l]);
			a.snapscreen = function(c, d, f) {
				f = c.options.labelMap.snapscreen || c.getLang("labelMap.snapscreen") || "";
				var e = new a.Button({
					className: "edui-for-snapscreen",
					title: f,
					onclick: function() {
						c.execCommand("snapscreen")
					},
					theme: c.options.theme
				});
				a.buttons.snapscreen = e;
				if (d = d || (c.options.iframeUrlMap || {}).snapscreen || b.snapscreen) {
					var g = new a.Dialog({
						iframeUrl: c.ui.mapUrl(d),
						editor: c,
						className: "edui-for-snapscreen",
						title: f,
						buttons: [{
							className: "edui-okbutton",
							label: c.getLang("ok"),
							editor: c,
							onclick: function() {
								g.close(!0)
							}
						}, {
							className: "edui-cancelbutton",
							label: c.getLang("cancel"),
							editor: c,
							onclick: function() {
								g.close(!1)
							}
						}]
					});
					g.render();
					c.ui._dialogs.snapscreenDialog = g
				}
				c.addListener("selectionchange", function() {
					e.setDisabled(-1 == c.queryCommandState("snapscreen"))
				});
				return e
			};
			a.insertcode = function(b, d, f) {
				d = b.options.insertcode || [];
				f = b.options.labelMap.insertcode || b.getLang("labelMap.insertcode") || "";
				var e = [];
				c.each(d, function(a, c) {
					e.push({
						label: a,
						value: c,
						theme: b.options.theme,
						renderLabelHtml: function() {
							return '<div class="edui-label %%-label" >' + (this.label || "") + "</div>"
						}
					})
				});
				var g = new a.Combox({
					editor: b,
					items: e,
					onselect: function(a, c) {
						b.execCommand("insertcode", this.items[c].value)
					},
					onbuttonclick: function() {
						this.showPopup()
					},
					title: f,
					initValue: f,
					className: "edui-for-insertcode",
					indexByValue: function(a) {
						if (a) for (var b = 0, c; c = this.items[b]; b++) if (-1 != c.value.indexOf(a)) return b;
						return -1
					}
				});
				a.buttons.insertcode = g;
				b.addListener("selectionchange", function(a, c, d) {
					d || (-1 == b.queryCommandState("insertcode") ? g.setDisabled(!0) : (g.setDisabled(!1), (a = b.queryCommandValue("insertcode")) ? (a && (a = a.replace(/['"]/g, "").split(",")[0]), g.setValue(a)) : g.setValue(f)))
				});
				return g
			};
			a.fontfamily = function(b, d, f) {
				d = b.options.fontfamily || [];
				f = b.options.labelMap.fontfamily || b.getLang("labelMap.fontfamily") || "";
				if (d.length) {
					for (var e = 0, g, k = []; g = d[e]; e++) {
						var h = b.getLang("fontfamily")[g.name] || "";
						(function(a, d) {
							k.push({
								label: a,
								value: d,
								theme: b.options.theme,
								renderLabelHtml: function() {
									return '<div class="edui-label %%-label" style="font-family:' + c.unhtml(this.value) + '">' + (this.label || "") + "</div>"
								}
							})
						})(g.label || h, g.val)
					}
					b.options.open_editor || k.push({
						value: "more-fonts",
						onclick: function() {},
						theme: b.options.theme,
						renderLabelHtml: function() {
							return '<div class="edui-label"><a href="http://www.135editor.com/user_settings/setting?type=fonts" target="_blank">选择更多字体</a></div>'
						}
					});
					var l = new a.Combox({
						editor: b,
						items: k,
						onselect: function(a, c) {
							b.execCommand("FontFamily", this.items[c].value)
						},
						onbuttonclick: function() {
							this.showPopup()
						},
						title: f,
						initValue: f,
						className: "edui-for-fontfamily",
						indexByValue: function(a) {
							if (a) for (var b = 0, c; c = this.items[b]; b++) if (-1 != c.value.indexOf(a)) return b;
							return -1
						}
					});
					a.buttons.fontfamily = l;
					b.addListener("selectionchange", function(a, c, d) {
						d || (-1 == b.queryCommandState("FontFamily") ? l.setDisabled(!0) : (l.setDisabled(!1), (a = b.queryCommandValue("FontFamily")) && (a = a.replace(/['"]/g, "").split(",")[0]), l.setValue(a)))
					});
					return l
				}
			};
			a.fontsize = function(b, c, d) {
				d = b.options.labelMap.fontsize || b.getLang("labelMap.fontsize") || "";
				c = c || b.options.fontsize || [];
				if (c.length) {
					for (var f = [], e = 0; e < c.length; e++) {
						var g = c[e] + "px";
						f.push({
							label: g,
							value: g,
							theme: b.options.theme,
							renderLabelHtml: function() {
								return '<div class="edui-label %%-label" style="line-height:1;font-size:' + this.value + '">' + (this.label || "") + "</div>"
							}
						})
					}
					var k = new a.Combox({
						editor: b,
						items: f,
						title: d,
						useInput: t.ie && 9 > t.version ? !1 : !0,
						initValue: d,
						onselect: function(a, c) {
							b.execCommand("FontSize", this.items[c].value)
						},
						onbuttonclick: function() {
							this.showPopup()
						},
						oninputclick: function() {
							var a = this;
							setTimeout(function() {
								var b = a.getDom("wx_input"),
									c = (parseInt(this.value), b.value);
								parseInt(c);
								t.ie ? (b.value = "", b.focus()) : (b.focus(), b.select())
							}, 100)
						},
						oninputblur: function() {
							var a = this.getDom("wx_input"),
								c = a.value,
								d = parseInt(c),
								f = parseInt(this.value);
							return "" == c ? (a.value = f + "px", !1) : (10 > d && (d = 10), 72 < d && (d = 72), f == d ? !1 : void b.execCommand("FontSize", d + "px"))
						},
						oninputkeydown: function(a, b) {
							var c = b.keyCode || b.which,
								d = this.getDom("wx_input");
							13 == c && (d.blur(), b.stopPropagation ? (b.stopPropagation(), b.preventDefault()) : b.cancelBubble = !0)
						},
						className: "edui-for-fontsize"
					});
					a.buttons.fontsize = k;
					b.addListener("selectionchange", function(a, c, d) {
						d || (-1 == b.queryCommandState("FontSize") ? k.setDisabled(!0) : (k.setDisabled(!1), k.setValue(b.queryCommandValue("FontSize"))))
					});
					return k
				}
			};
			a.paragraph = function(b, d, f) {
				f = b.options.labelMap.paragraph || b.getLang("labelMap.paragraph") || "";
				d = b.options.paragraph || [];
				if (!c.isEmptyObject(d)) {
					var e = [],
						g;
					for (g in d) e.push({
						value: g,
						label: d[g] || b.getLang("paragraph")[g],
						theme: b.options.theme,
						renderLabelHtml: function() {
							return '<div class="edui-label %%-label"><span class="edui-for-' + this.value + '">' + (this.label || "") + "</span></div>"
						}
					});
					var k = new a.Combox({
						editor: b,
						items: e,
						title: f,
						initValue: f,
						className: "edui-for-paragraph",
						onselect: function(a, c) {
							b.execCommand("Paragraph", this.items[c].value)
						},
						onbuttonclick: function() {
							this.showPopup()
						}
					});
					a.buttons.paragraph = k;
					b.addListener("selectionchange", function(a, c, d) {
						d || (-1 == b.queryCommandState("Paragraph") ? k.setDisabled(!0) : (k.setDisabled(!1), a = b.queryCommandValue("Paragraph"), -1 != k.indexByValue(a) ? k.setValue(a) : k.setValue(k.initValue)))
					});
					return k
				}
			};
			a.customstyle = function(b) {
				var c = b.options.customstyle || [],
					d = b.options.labelMap.customstyle || b.getLang("labelMap.customstyle") || "";
				if (c.length) {
					for (var f = b.getLang("customstyle"), e = 0, g = [], k; k = c[e++];)(function(a) {
						var c = {};
						c.label = a.label ? a.label : f[a.name];
						c.style = a.style;
						c.className = a.className;
						c.tag = a.tag;
						g.push({
							label: c.label,
							value: c,
							theme: b.options.theme,
							renderLabelHtml: function() {
								return '<div class="edui-label %%-label"><' + c.tag + " " + (c.className ? ' class="' + c.className + '"' : "") + (c.style ? ' style="' + c.style + '"' : "") + ">" + c.label + "</" + c.tag + "></div>"
							}
						})
					})(k);
					var h = new a.Combox({
						editor: b,
						items: g,
						title: d,
						initValue: d,
						className: "edui-for-customstyle",
						onselect: function(a, c) {
							b.execCommand("customstyle", this.items[c].value)
						},
						onbuttonclick: function() {
							this.showPopup()
						},
						indexByValue: function(a) {
							for (var b = 0, c; c = this.items[b++];) if (c.label == a) return b - 1;
							return -1
						}
					});
					a.buttons.customstyle = h;
					b.addListener("selectionchange", function(a, c, d) {
						d || (-1 == b.queryCommandState("customstyle") ? h.setDisabled(!0) : (h.setDisabled(!1), a = b.queryCommandValue("customstyle"), -1 != h.indexByValue(a) ? h.setValue(a) : h.setValue(h.initValue)))
					});
					return h
				}
			};
			a.inserttable = function(b, c, d) {
				d = b.options.labelMap.inserttable || b.getLang("labelMap.inserttable") || "";
				var f = new a.TableButton({
					editor: b,
					title: d,
					className: "edui-for-inserttable",
					onpicktable: function(a, c, d) {
						b.execCommand("InsertTable", {
							numRows: d,
							numCols: c,
							border: 1
						})
					},
					onbuttonclick: function() {
						this.showPopup()
					}
				});
				a.buttons.inserttable = f;
				b.addListener("selectionchange", function() {
					f.setDisabled(-1 == b.queryCommandState("inserttable"))
				});
				return f
			};
			a.lineheight = function(b) {
				var c = b.options.lineheight || [];
				if (c.length) {
					for (var d = 0, f, e = []; f = c[d++];) e.push({
						label: f,
						value: f,
						theme: b.options.theme,
						onclick: function() {
							b.execCommand("lineheight", this.value)
						}
					});
					var g = new a.MenuButton({
						editor: b,
						className: "edui-for-lineheight",
						title: b.options.labelMap.lineheight || b.getLang("labelMap.lineheight") || "",
						items: e,
						onbuttonclick: function() {
							var a = b.queryCommandValue("LineHeight") || this.value;
							b.execCommand("LineHeight", a)
						}
					});
					a.buttons.lineheight = g;
					b.addListener("selectionchange", function() {
						var a = b.queryCommandState("LineHeight");
						if (-1 == a) g.setDisabled(!0);
						else {
							g.setDisabled(!1);
							var c = b.queryCommandValue("LineHeight");
							c && g.setValue((c + "").replace(/cm/, ""));
							g.setChecked(a)
						}
					});
					return g
				}
			};
			a.letterspacing = function(b) {
				var c = b.options.letterspacing || [];
				if (c.length) {
					for (var d = 0, f, e = []; d < c.length; d++) f = "" + c[d], e.push({
						label: f,
						value: f,
						theme: b.options.theme,
						onclick: function() {
							b.execCommand("letterspacing", this.value)
						}
					});
					var g = new a.MenuButton({
						editor: b,
						className: "edui-for-letterspacing",
						title: b.options.labelMap.letterspacing || b.getLang("labelMap.letterspacing") || "",
						items: e,
						onbuttonclick: function() {
							var a = b.queryCommandValue("LetterSpacing") || this.value;
							b.execCommand("LetterSpacing", a)
						}
					});
					a.buttons.letterspacing = g;
					b.addListener("selectionchange", function() {
						var a = b.queryCommandState("LetterSpacing");
						if (-1 == a) g.setDisabled(!0);
						else {
							g.setDisabled(!1);
							var c = b.queryCommandValue("LetterSpacing");
							c && g.setValue((c + "").replace(/cm/, ""));
							g.setChecked(a)
						}
					});
					return g
				}
			};
			a.outpadding = function(b) {
				var c = b.options.outpadding || [];
				if (c.length) {
					for (var d = 0, f, e = []; d < c.length; d++) f = "" + c[d], e.push({
						label: f,
						value: f,
						theme: b.options.theme,
						onclick: function() {
							b.execCommand("outpadding", this.value)
						}
					});
					var g = new a.MenuButton({
						editor: b,
						className: "edui-for-outpadding",
						title: b.options.labelMap.outpadding || b.getLang("labelMap.outpadding") || "",
						items: e,
						onbuttonclick: function() {
							var a = b.queryCommandValue("outpadding") || this.value;
							b.execCommand("outpadding", a)
						}
					});
					a.buttons.outpadding = g;
					b.addListener("selectionchange", function() {
						var a = b.queryCommandState("outpadding");
						if (-1 == a) g.setDisabled(!0);
						else {
							g.setDisabled(!1);
							var c = b.queryCommandValue("outpadding");
							c && g.setValue((c + "").replace(/cm/, ""));
							g.setChecked(a)
						}
					});
					return g
				}
			};
			l = ["top", "bottom"];
			for (f = 0; g = l[f++];)(function(b) {
				a["rowspacing" + b] = function(c) {
					var d = c.options["rowspacing" + b] || [];
					if (!d.length) return null;
					for (var f = 0, e, g = []; e = d[f++];) g.push({
						label: e,
						value: e,
						theme: c.options.theme,
						onclick: function() {
							c.execCommand("rowspacing", this.value, b)
						}
					});
					var k = new a.MenuButton({
						editor: c,
						className: "edui-for-rowspacing" + b,
						title: c.options.labelMap["rowspacing" + b] || c.getLang("labelMap.rowspacing" + b) || "",
						items: g,
						onbuttonclick: function() {
							var a = c.queryCommandValue("rowspacing", b) || this.value;
							c.execCommand("rowspacing", a, b)
						}
					});
					a.buttons[b] = k;
					c.addListener("selectionchange", function() {
						var a = c.queryCommandState("rowspacing", b);
						if (-1 == a) k.setDisabled(!0);
						else {
							k.setDisabled(!1);
							var d = c.queryCommandValue("rowspacing", b);
							d && k.setValue((d + "").replace(/%/, ""));
							k.setChecked(a)
						}
					});
					return k
				}
			})(g);
			l = ["insertorderedlist", "insertunorderedlist"];
			for (f = 0; g = l[f++];)(function(b) {
				a[b] = function(c) {
					var d = c.options[b],
						f = function() {
							c.execCommand(b, this.value)
						},
						e = [],
						g;
					for (g in d) e.push({
						label: d[g] || c.getLang()[b][g] || "",
						value: g,
						theme: c.options.theme,
						onclick: f
					});
					var k = new a.MenuButton({
						editor: c,
						className: "edui-for-" + b,
						title: c.getLang("labelMap." + b) || "",
						items: e,
						onbuttonclick: function() {
							var a = c.queryCommandValue(b) || this.value;
							c.execCommand(b, a)
						}
					});
					a.buttons[b] = k;
					c.addListener("selectionchange", function() {
						var a = c.queryCommandState(b);
						if (-1 == a) k.setDisabled(!0);
						else {
							k.setDisabled(!1);
							var d = c.queryCommandValue(b);
							k.setValue(d);
							k.setChecked(a)
						}
					});
					return k
				}
			})(g);
			a.fullscreen = function(b, c) {
				c = b.options.labelMap.fullscreen || b.getLang("labelMap.fullscreen") || "";
				var d = new a.Button({
					className: "edui-for-fullscreen",
					title: c,
					theme: b.options.theme,
					onclick: function() {
						b.ui && b.ui.setFullScreen(!b.ui.isFullScreen());
						this.setChecked(b.ui.isFullScreen())
					}
				});
				a.buttons.fullscreen = d;
				b.addListener("selectionchange", function() {
					var a = b.queryCommandState("fullscreen");
					d.setDisabled(-1 == a);
					d.setChecked(b.ui.isFullScreen())
				});
				return d
			};
			a.emotion = function(c, d) {
				var f = new a.MultiMenuPop({
					title: c.options.labelMap.emotion || c.getLang("labelMap.emotion") || "",
					editor: c,
					className: "edui-for-emotion",
					iframeUrl: c.ui.mapUrl(d || (c.options.iframeUrlMap || {}).emotion || b.emotion)
				});
				a.buttons.emotion = f;
				c.addListener("selectionchange", function() {
					f.setDisabled(-1 == c.queryCommandState("emotion"))
				});
				return f
			};
			a.spechars = function(c, d) {
				var f = new a.MultiMenuPop({
					title: c.options.labelMap.spechars || c.getLang("labelMap.spechars") || "",
					editor: c,
					className: "edui-for-spechars",
					iframeUrl: c.ui.mapUrl(d || (c.options.iframeUrlMap || {}).spechars || b.spechars)
				});
				a.buttons.spechars = f;
				c.addListener("selectionchange", function() {
					f.setDisabled(-1 == c.queryCommandState("spechars"))
				});
				return f
			};
			a.autotypeset = function(b) {
				var c = new a.AutoTypeSetButton({
					editor: b,
					title: b.options.labelMap.autotypeset || b.getLang("labelMap.autotypeset") || "",
					className: "edui-for-autotypeset",
					onbuttonclick: function() {
						b.execCommand("autotypeset")
					}
				});
				a.buttons.autotypeset = c;
				b.addListener("selectionchange", function() {
					c.setDisabled(-1 == b.queryCommandState("autotypeset"))
				});
				return c
			};
			a.simpleupload = function(b) {
				var c = new a.Button({
					className: "edui-for-simpleupload",
					title: b.options.labelMap.simpleupload || b.getLang("labelMap.simpleupload") || "",
					onclick: function() {},
					theme: b.options.theme,
					showText: !1
				});
				a.buttons.simpleupload = c;
				b.addListener("ready", function() {
					var a = c.getDom("body").children[0];
					b.fireEvent("simpleuploadbtnready", a)
				});
				b.addListener("selectionchange", function(a, d, f) {
					a = b.queryCommandState("simpleupload"); - 1 == a ? (c.setDisabled(!0), c.setChecked(!1)) : f || (c.setDisabled(!1), c.setChecked(a))
				});
				return c
			}
		})();
		(function() {
			function c(a) {
				this.initOptions(a);
				this.initEditorUI()
			}
			var a = p.editor.utils,
				e = p.editor.ui.uiUtils,
				b = p.editor.ui.UIBase,
				f = p.editor.dom.domUtils,
				g = [];
			c.prototype = {
				uiName: "editor",
				initEditorUI: function() {
					function a(a, b) {
						a.setOpt({
							wordCount: !0,
							maximumWords: 1E4,
							wordCountMsg: a.options.wordCountMsg || a.getLang("wordCountMsg"),
							wordOverFlowMsg: a.options.wordOverFlowMsg || a.getLang("wordOverFlowMsg")
						});
						var c = a.options,
							d = c.maximumWords,
							f = c.wordCountMsg,
							e = c.wordOverFlowMsg,
							g = b.getDom("wordcount");
						if (c.wordCount) if (c = a.getContentLength(!0), c > d) g.innerHTML = e, a.fireEvent("wordcountoverflow");
						else {
							var e = a.getTagLength("img"),
								h = Math.ceil(c / 180 + e / 12);
							g.innerHTML = f.replace("{#images}", e).replace("{#minute}", h).replace("{#leave}", d - c).replace("{#count}", c)
						}
					}
					this.editor.ui = this;
					this._dialogs = {};
					this.initUIBase();
					this._initToolbars();
					var b = this.editor,
						c = this;
					b.addListener("ready", function() {
						b.getDialog = function(a) {
							return b.ui._dialogs[a + "Dialog"]
						};
						f.on(b.window, "scroll", function(a) {
							p.editor.ui.Popup.postHide(a)
						});
						b.ui._actualFrameWidth = b.options.initialFrameWidth;
						UE.browser.ie && 6 === UE.browser.version && b.container.ownerDocument.execCommand("BackgroundImageCache", !1, !0);
						b.options.elementPathEnabled && (b.ui.getDom("elementpath").innerHTML = '<div class="edui-editor-breadcrumb">' + b.getLang("elementPathTip") + ":</div>");
						b.options.wordCount && (f.on(b.document, "click", function() {
							a(b, c);
							f.un(b.document, "click", arguments.callee)
						}), b.ui.getDom("wordcount").innerHTML = b.getLang("wordCountTip"));
						b.ui._scale();
						b.options.scaleEnabled ? (b.autoHeightEnabled && b.disableAutoHeight(), c.enableScale()) : c.disableScale();
						b.options.elementPathEnabled || b.options.wordCount || b.options.scaleEnabled || (b.ui.getDom("elementpath").style.display = "none", b.ui.getDom("wordcount").style.display = "none", b.ui.getDom("scale").style.display = "none");
						b.selection.isFocus() && b.fireEvent("selectionchange", !1, !0)
					});
					b.addListener("mousedown", function(a, b) {
						p.editor.ui.Popup.postHide(b, b.target || b.srcElement);
						p.editor.ui.ShortCutMenu.postHide(b)
					});
					b.addListener("delcells", function() {
						UE.ui.edittip && new UE.ui.edittip(b);
						b.getDialog("edittip").open()
					});
					var d, e = !1,
						g;
					b.addListener("afterpaste", function() {
						b.queryCommandState("pasteplain") || (p.editor.ui.PastePicker && (d = new p.editor.ui.Popup({
							content: new p.editor.ui.PastePicker({
								editor: b
							}),
							editor: b,
							className: "edui-wordpastepop"
						}), d.render()), e = !0)
					});
					b.addListener("afterinserthtml", function() {
						clearTimeout(g);
						g = setTimeout(function() {
							if (d && (e || b.ui._isTransfer)) {
								if (d.isHidden()) {
									var a = f.createElement(b.document, "span", {
										style: "line-height:0px;",
										innerHTML: "﻿"
									});
									b.selection.getRange().insertNode(a);
									var c = H(a, "firstChild", "previousSibling");
									c && d.showAnchor(3 == c.nodeType ? c.parentNode : c);
									f.remove(a)
								} else d.show();
								delete b.ui._isTransfer;
								e = !1
							}
						}, 200)
					});
					b.addListener("contextmenu", function(a, b) {
						p.editor.ui.Popup.postHide(b)
					});
					b.addListener("keydown", function(a, b) {
						d && d.dispose(b);
						var c = b.keyCode || b.which;
						if (b.altKey && 90 == c) UE.ui.buttons.fullscreen.onclick()
					});
					b.addListener("wordcount", function(b) {
						a(this, c)
					});
					b.addListener("selectionchange", function() {
						if (b.options.elementPathEnabled) c[(-1 == b.queryCommandState("elementpath") ? "dis" : "en") + "ableElementPath"]();
						if (b.options.scaleEnabled) c[(-1 == b.queryCommandState("scale") ? "dis" : "en") + "ableScale"]()
					});
					var h = new p.editor.ui.Popup({
						editor: b,
						content: "",
						className: "edui-bubble",
						_onEditButtonClick: function() {
							this.hide();
							b.ui._dialogs.linkDialog.open()
						},
						_onImgEditButtonClick: function(a) {
							this.hide();
							b.ui._dialogs[a] && b.ui._dialogs[a].open()
						},
						_onImgSquareClick: function(a) {
							this.hide();
							b.undoManger.save(!0);
							"IMG" == this.anchorEl.tagName && (a = $(this.anchorEl).parent(), "square" != a.attr("data-role") ? "circle" == a.attr("data-role") || "bgmirror" == a.attr("data-role") ? a.replaceWith('<section data-role="square" style="overflow: hidden;margin: 0 auto;width:100%;padding-bottom:100%;height:0px;background-image:url(' + this.anchorEl.src + ');background-position:50% 50%;background-size: cover;"><img src="' + this.anchorEl.src + '" style="opacity:0;width:100%;"></section>') : $(this.anchorEl).replaceWith('<section data-role="square" style="overflow: hidden;margin: 0 auto;width:100%;padding-bottom:100%;height:0px;background-image:url(' + this.anchorEl.src + ');background-position:50% 50%;background-size: cover;"><img src="' + this.anchorEl.src + '" style="opacity:0;width:100%;"></section>') : ($(this.anchorEl).css({
								opacity: "1"
							}), a.replaceWith($(this.anchorEl))));
							b.undoManger.save(!0)
						},
						_onImgRadiusClick: function(a) {
							this.hide();
							b.undoManger.save(!0);
							"IMG" == this.anchorEl.tagName && (a = $(this.anchorEl).parent(), "circle" != a.attr("data-role") ? "square" == a.attr("data-role") || "bgmirror" == a.attr("data-role") ? a.replaceWith('<section data-role="circle" style="border-radius: 100%;overflow: hidden;margin: 0 auto;width:100%;padding-bottom:100%;height:0px;background-image:url(' + this.anchorEl.src + ');background-position:50% 50%;background-size: cover;"><img src="' + this.anchorEl.src + '" style="opacity:0;width:100%;"></section>') : $(this.anchorEl).replaceWith('<section data-role="circle" style="border-radius: 100%;overflow: hidden;margin: 0 auto;width:100%;padding-bottom:100%;height:0px;background-image:url(' + this.anchorEl.src + ');background-position:50% 50%;background-size: cover;"><img src="' + this.anchorEl.src + '" style="opacity:0;width:100%;"></section>') : ($(this.anchorEl).css({
								opacity: "1"
							}), a.replaceWith($(this.anchorEl))));
							b.undoManger.save(!0)
						},
						_onImgDeleteClick: function(a) {
							this.hide();
							b.undoManger.save(!0);
							f.remove(this.anchorEl);
							b.undoManger.save(!0)
						},
						_onImgCropButtonClick: function(a) {
							this.hide();
							V = this.anchorEl;
							"toImage" == V.getAttribute("data-type") ? (a = V.getAttribute("data-id"), window.ajaxAction && window.ajaxAction("//" + b.options.plat_host + "/html_images/getHtml/" + a, null, null, function(a) {
								a.success && $(V).replaceWith(a.data.content)
							})) : "function" == typeof window.top.edit_image ? window.top.edit_image(a) : b.fireEvent("showmessage", {
								content: "Javascript function edit_image not defined.",
								timeout: 3E3
							})
						},
						_onImgSetFloat: function(a) {
							this.hide();
							b.execCommand("imagefloat", a)
						},
						_setIframeAlign: function(a) {
							var b = h.anchorEl,
								c = b.cloneNode(!0);
							switch (a) {
							case -2:
								c.setAttribute("align", "");
								break;
							case -1:
								c.setAttribute("align", "left");
								break;
							case 1:
								c.setAttribute("align", "right")
							}
							b.parentNode.insertBefore(c, b);
							f.remove(b);
							h.anchorEl = c;
							h.showAnchor(h.anchorEl)
						},
						_updateIframe: function() {
							var a = b._iframe = h.anchorEl;
							f.hasClass(a, "ueditor_baidumap") ? (b.selection.getRange().selectNode(a).select(), b.ui._dialogs.mapDialog.open()) : b.ui._dialogs.insertframeDialog.open();
							h.hide()
						},
						_onRemoveButtonClick: function(a) {
							b.execCommand(a);
							this.hide()
						},
						queryAutoHide: function(a) {
							return a && a.ownerDocument == b.document && ("img" == a.tagName.toLowerCase() || f.findParentByTagName(a, "a", !0)) ? a !== h.anchorEl : p.editor.ui.Popup.prototype.queryAutoHide.call(this, a)
						}
					});
					h.render();
					b.options.imagePopup && (b.addListener("mouseover", function(a, c) {
						c = c || window.event;
						var d = c.target || c.srcElement;
						if (b.ui._dialogs.insertframeDialog && /iframe/ig.test(d.tagName)) {
							var f = h.formatHtml("<nobr>" + b.getLang("property") + ': <span onclick=$$._setIframeAlign(-2) class="edui-clickable">' + b.getLang("default") + '</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(-1) class="edui-clickable">' + b.getLang("justifyleft") + '</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(1) class="edui-clickable">' + b.getLang("justifyright") + '</span>&nbsp;&nbsp; <span onclick="$$._updateIframe( this);" class="edui-clickable">' + b.getLang("modify") + "</span></nobr>");
							f ? (h.getDom("content").innerHTML = f, h.anchorEl = d, h.showAnchor(h.anchorEl)) : h.hide()
						}
					}), b.addListener("selectionchange", function(a, c) {
						if (c) {
							var d = "",
								e, g = b.selection.getRange(),
								k = g.getClosedNode();
							e = b.ui._dialogs;
							if (!1 === g.collapsed && k && "IMG" == k.tagName) {
								g = "insertimageDialog";
								if (-1 != k.className.indexOf("edui-faked-video") || -1 != k.className.indexOf("edui-upload-video")) g = "insertvideoDialog"; - 1 != k.className.indexOf("edui-faked-webapp") && (g = "webappDialog"); - 1 != k.src.indexOf("http://api.map.baidu.com") && (g = "mapDialog"); - 1 != k.className.indexOf("edui-faked-music") && (g = "musicDialog"); - 1 != k.src.indexOf("http://maps.google.com/maps/api/staticmap") && (g = "gmapDialog");
								k.getAttribute("anchorname") && (g = "anchorDialog", d = h.formatHtml("<nobr>" + b.getLang("property") + ': <span onclick=$$._onImgEditButtonClick("anchorDialog") class="edui-clickable">' + b.getLang("modify") + "</span>&nbsp;&nbsp;<span onclick=$$._onRemoveButtonClick('anchor') class=\"edui-clickable\">" + b.getLang("delete") + "</span></nobr>"));
								if (k.getAttribute("word_img")) {
									b.word_img = [k.getAttribute("word_img")];
									return
								}
								if (f.hasClass(k, "loadingclass") || f.hasClass(k, "loaderrorclass")) g = "";
								if (!e[g]) return;
								e = k.src;
								0 <= e.indexOf("http://remote.wx135.com/oss/view") && (e = e.replace("&free=1", ""), e = decodeURIComponent(e.substr(35)));
								e = '<nobr><span onclick=$$._onImgSetFloat("none") class="edui-clickable">' + b.getLang("default") + '</span>&nbsp;<span onclick=$$._onImgSetFloat("left") class="edui-clickable">' + b.getLang("justifyleft") + '</span>&nbsp;<span onclick=$$._onImgSetFloat("right") class="edui-clickable">' + b.getLang("justifyright") + '</span>&nbsp;<span onclick=$$._onImgSetFloat("center") class="edui-clickable">' + b.getLang("justifycenter") + "</span>&nbsp;<span onclick=\"$$._onImgEditButtonClick('" + g + '\');" class="edui-clickable">' + b.getLang("changeImage") + "</span>&nbsp;<span onclick=\"$$._onImgCropButtonClick('" + k.src + '\');" class="edui-clickable">' + b.getLang("edit") + '</span>&nbsp;<a href="' + e + '" rel="noreferrer" target="_blank" class="edui-clickable">' + b.getLang("labelMap.preview") + '</a><br/><span onclick=$$._onImgDeleteClick() class="edui-clickable">' + b.getLang("delete") + '</span>&nbsp;<span onclick="$$._onImgRadiusClick(this);" class="edui-clickable">' + b.getLang("radiusCircle") + '</span>&nbsp;<span onclick="$$._onImgSquareClick(this);" class="edui-clickable">' + b.getLang("imgSquare") + '</span>&nbsp;<span onclick="$$._onImgEditButtonClick(\'imgstyleDialog\');" class="edui-clickable">' + b.getLang("labelMap.imgstyle") + "</span>&nbsp;</nobr>";
								!d && (d = h.formatHtml(e))
							}
							if (b.ui._dialogs.linkDialog) {
								var l = b.queryCommandValue("link"),
									m;
								l && (m = l.getAttribute("_href") || l.getAttribute("href", 2)) && (e = m, 30 < m.length && (e = m.substring(0, 20) + "..."), d && (d += '<div style="height:5px;"></div>'), d += h.formatHtml("<nobr>" + b.getLang("anthorMsg") + ': <a target="_blank" href="' + m + '" title="' + m + '" >' + e + '</a> <span class="edui-clickable" onclick="$$._onEditButtonClick();">' + b.getLang("modify") + '</span> <span class="edui-clickable" onclick="$$._onRemoveButtonClick(\'unlink\');"> ' + b.getLang("clear") + "</span></nobr>"), h.showAnchor(l))
							}
							d ? (h.getDom("content").innerHTML = d, h.anchorEl = k || l, h.showAnchor(h.anchorEl)) : h.hide()
						}
					}))
				},
				_initToolbars: function() {
					for (var b = this.editor, c = this.toolbars || [], d = [], f = [], e = 0; e < c.length; e++) {
						for (var g = c[e], h = new p.editor.ui.Toolbar({
							theme: b.options.theme
						}), q = 0; q < g.length; q++) {
							var t = g[q],
								y = null;
							if ("string" == typeof t) {
								t = t.toLowerCase();
								"|" == t && (t = "Separator");
								"||" == t && (t = "Breakline");
								var A = p.editor.ui[t];
								if (A) if (a.isFunction(A)) y = new p.editor.ui[t](b);
								else {
									if (A.id && A.id != b.key) continue;
									if (t = A.execFn.call(b, b, t)) if (void 0 === A.index) {
										h.add(t);
										continue
									} else f.push({
										index: A.index,
										itemUI: t
									})
								}
							} else y = t;
							y && y.id && h.add(y)
						}
						d[e] = h
					}
					a.each(f, function(a) {
						h.add(a.itemUI, a.index)
					});
					this.toolbars = d
				},
				getHtmlTpl: function() {
					return '<div id="##" class="%%"><div id="##_sidebar" class="%%-sidebar" style="display:none"></div><div id="##_mainbar" class="%%-mainbar"><div id="##_toolbarbox" class="%%-toolbarbox">' + (this.toolbars.length ? '<div id="##_toolbarboxouter" class="%%-toolbarboxouter"><div class="%%-toolbarboxinner">' + this.renderToolbarBoxHtml() + "</div></div>" : "") + '<div id="##_toolbarmsg" class="%%-toolbarmsg" style="display:none;"><div id = "##_upload_dialog" class="%%-toolbarmsg-upload" onclick="$$.showWordImageDialog();">' + this.editor.getLang("clickToUpload") + '</div><div class="%%-toolbarmsg-close" onclick="$$.hideToolbarMsg();">x</div><div id="##_toolbarmsg_label" class="%%-toolbarmsg-label"></div><div style="height:0;overflow:hidden;clear:both;"></div></div><div id="##_message_holder" class="%%-messageholder"></div></div><div id="##_iframeholder" class="%%-iframeholder"></div><div id="##_bottombar" class="%%-bottomContainer"><table><tr><td id="##_elementpath" class="%%-bottombar"></td><td id="##_wordcount" class="%%-wordcount"></td><td id="##_scale" class="%%-scale"><div class="%%-icon"></div></td></tr></table></div><div id="##_scalelayer"></div></div></div>'
				},
				showWordImageDialog: function() {
					this._dialogs.wordimageDialog.open()
				},
				renderToolbarBoxHtml: function() {
					for (var a = [], b = 0; b < this.toolbars.length; b++) a.push(this.toolbars[b].renderHtml());
					return a.join("")
				},
				setFullScreen: function(a) {
					var b = this.editor,
						c = b.container.parentNode.parentNode;
					if (this._fullscreen != a) {
						this._fullscreen = a;
						this.editor.fireEvent("beforefullscreenchange", a);
						if (p.editor.browser.gecko) var d = b.selection.getRange().createBookmark();
						if (a) {
							for ($(c).parents("body").addClass("fullscreen");
							"BODY" != c.tagName;) {
								var f = p.editor.dom.domUtils.getComputedStyle(c, "position");
								g.push(f);
								c.style.position = "static";
								c = c.parentNode
							}
							this._bakHtmlOverflow = document.documentElement.style.overflow;
							this._bakBodyOverflow = document.body.style.overflow;
							this._bakAutoHeight = this.editor.autoHeightEnabled;
							this._bakScrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
							this._bakEditorContaninerWidth = b.iframe.parentNode.offsetWidth;
							this._bakAutoHeight && (b.autoHeightEnabled = !1, this.editor.disableAutoHeight());
							document.documentElement.style.overflow = "hidden";
							window.scrollTo(0, window.scrollY);
							this._bakCssText = this.getDom().style.cssText;
							this._bakCssText1 = this.getDom("iframeholder").style.cssText;
							b.iframe.parentNode.style.width = "";
							this._updateFullScreen()
						} else {
							for ($(c).parents("body").removeClass("fullscreen");
							"BODY" != c.tagName;) c.style.position = g.shift(), c = c.parentNode;
							this.getDom().style.cssText = this._bakCssText;
							this.getDom("iframeholder").style.cssText = this._bakCssText1;
							this._bakAutoHeight && (b.autoHeightEnabled = !0, this.editor.enableAutoHeight());
							document.documentElement.style.overflow = this._bakHtmlOverflow;
							document.body.style.overflow = this._bakBodyOverflow;
							b.iframe.parentNode.style.width = this._bakEditorContaninerWidth + "px";
							window.scrollTo(0, this._bakScrollTop)
						}
						if (t.gecko && "true" === b.body.contentEditable) {
							var e = document.createElement("input");
							document.body.appendChild(e);
							b.body.contentEditable = !1;
							setTimeout(function() {
								e.focus();
								setTimeout(function() {
									b.body.contentEditable = !0;
									b.fireEvent("fullscreenchanged", a);
									b.selection.getRange().moveToBookmark(d).select(!0);
									p.editor.dom.domUtils.remove(e);
									a && window.scroll(0, 0)
								}, 0)
							}, 0)
						}
						"true" === b.body.contentEditable && (this.editor.fireEvent("fullscreenchanged", a), this.triggerLayout())
					}
				},
				_updateFullScreen: function() {
					if (this._fullscreen) {
						var a = e.getViewportRect();
						this.getDom().style.cssText = "border:0;position:absolute;left:0;top:" + (this.editor.options.topOffset || 0) + "px;width:" + a.width + "px;height:" + a.height + "px;z-index:" + (1 * this.getDom().style.zIndex + 100);
						e.setViewportOffset(this.getDom(), {
							left: 0,
							top: this.editor.options.topOffset || 0
						});
						this.editor.setHeight(a.height - this.getDom("toolbarbox").offsetHeight - this.getDom("bottombar").offsetHeight - (this.editor.options.topOffset || 0), !0);
						if (t.gecko) try {
							window.onresize()
						} catch (k) {}
					}
				},
				_updateElementPath: function() {
					var a = this.getDom("elementpath"),
						b;
					if (this.elementPathEnabled && (b = this.editor.queryCommandValue("elementpath"))) {
						for (var c = [], d = 0, f; f = b[d]; d++) c[d] = this.formatHtml('<span unselectable="on" onclick="$$.editor.execCommand(&quot;elementpath&quot;, &quot;' + d + '&quot;);">' + f + "</span>");
						a.innerHTML = '<div class="edui-editor-breadcrumb" onmousedown="return false;">' + this.editor.getLang("elementPathTip") + ": " + c.join(" &gt; ") + "</div>"
					} else a.style.display = "none"
				},
				disableElementPath: function() {
					var a = this.getDom("elementpath");
					a.innerHTML = "";
					a.style.display = "none";
					this.elementPathEnabled = !1
				},
				enableElementPath: function() {
					this.getDom("elementpath").style.display = "";
					this.elementPathEnabled = !0;
					this._updateElementPath()
				},
				_scale: function() {
					function a() {
						H = f.getXY(h);
						M || (M = g.options.minFrameHeight + q.offsetHeight + y.offsetHeight);
						D.style.cssText = "position:absolute;left:0;display:;top:0;background-color:#41ABFF;opacity:0.4;filter: Alpha(opacity=40);width:" + h.offsetWidth + "px;height:" + h.offsetHeight + "px;z-index:" + (g.options.zIndex + 1);
						f.on(e, "mousemove", b);
						f.on(p, "mouseup", c);
						f.on(e, "mouseup", c)
					}
					function b(a) {
						d();
						a = a || window.event;
						N = a.pageX || e.documentElement.scrollLeft + a.clientX;
						I = a.pageY || e.documentElement.scrollTop + a.clientY;
						Q = N - H.x;
						C = I - H.y;
						Q >= S && (F = !0, D.style.width = Q + "px");
						C >= M && (F = !0, D.style.height = C + "px")
					}
					function c() {
						F && (F = !1, g.ui._actualFrameWidth = D.offsetWidth - 2, h.style.width = g.ui._actualFrameWidth + "px", g.setHeight(D.offsetHeight - y.offsetHeight - q.offsetHeight - 2, !0));
						D && (D.style.display = "none");
						d();
						f.un(e, "mousemove", b);
						f.un(p, "mouseup", c);
						f.un(e, "mouseup", c)
					}
					function d() {
						t.ie ? e.selection.clear() : window.getSelection().removeAllRanges()
					}
					var e = document,
						g = this.editor,
						h = g.container,
						p = g.document,
						q = this.getDom("toolbarbox"),
						y = this.getDom("bottombar"),
						A = this.getDom("scale"),
						D = this.getDom("scalelayer"),
						F = !1,
						H = null,
						M = 0,
						S = g.options.minFrameWidth,
						N = 0,
						I = 0,
						Q = 0,
						C = 0,
						B = this;
					this.editor.addListener("fullscreenchanged", function(a, b) {
						if (b) B.disableScale();
						else if (B.editor.options.scaleEnabled) {
							B.enableScale();
							var c = B.editor.document.createElement("span");
							B.editor.body.appendChild(c);
							B.editor.body.style.height = Math.max(f.getXY(c).y, B.editor.iframe.offsetHeight - 20) + "px";
							f.remove(c)
						}
					});
					this.enableScale = function() {
						1 != g.queryCommandState("source") && (A.style.display = "", this.scaleEnabled = !0, f.on(A, "mousedown", a))
					};
					this.disableScale = function() {
						A.style.display = "none";
						this.scaleEnabled = !1;
						f.un(A, "mousedown", a)
					}
				},
				isFullScreen: function() {
					return this._fullscreen
				},
				postRender: function() {
					b.prototype.postRender.call(this);
					for (var a = 0; a < this.toolbars.length; a++) this.toolbars[a].postRender();
					var c = this,
						d, f = p.editor.dom.domUtils,
						e = function() {
							clearTimeout(d);
							d = setTimeout(function() {
								c._updateFullScreen()
							})
						};
					f.on(window, "resize", e);
					c.addListener("destroy", function() {
						f.un(window, "resize", e);
						clearTimeout(d)
					})
				},
				showToolbarMsg: function(a, b) {
					this.getDom("toolbarmsg_label").innerHTML = a;
					this.getDom("toolbarmsg").style.display = "";
					b || (this.getDom("upload_dialog").style.display = "none")
				},
				hideToolbarMsg: function() {
					this.getDom("toolbarmsg").style.display = "none"
				},
				mapUrl: function(a) {
					return a ? a.replace("~/", this.editor.options.UEDITOR_HOME_URL || "") : ""
				},
				triggerLayout: function() {
					var a = this.getDom();
					a.style.zoom = "1" == a.style.zoom ? "100%" : "1"
				}
			};
			a.inherits(c, p.editor.ui.UIBase);
			var d = {};
			UE.ui.Editor = function(b) {
				var e = new UE.Editor(b);
				e.options.editor = e;
				a.loadFile(document, {
					href: e.options.editorCssUrl || e.options.themePath + e.options.theme + "/css/ueditor.min.css",
					tag: "link",
					type: "text/css",
					rel: "stylesheet"
				});
				var g = e.render;
				e.render = function(b) {
					b.constructor === String && (e.key = b, d[b] = e);
					a.domReady(function() {
						function a() {
							e.setOpt({
								labelMap: e.options.labelMap || e.getLang("labelMap")
							});
							new c(e.options);
							if (b && (b.constructor === String && (b = document.getElementById(b)), b && b.getAttribute("name") && (e.options.textarea = b.getAttribute("name")), b && /script|textarea/ig.test(b.tagName))) {
								var a = document.createElement("div");
								b.parentNode.insertBefore(a, b);
								var d = b.value || b.innerHTML;
								e.options.initialContent = /^[\t\r\n ]*$/.test(d) ? e.options.initialContent : d.replace(/>[\n\r\t]+([ ]{4})+/g, ">").replace(/[\n\r\t]+([ ]{4})+</g, "<").replace(/>[\n\r\t]+</g, "><");
								b.className && (a.className = b.className);
								b.style.cssText && (a.style.cssText = b.style.cssText);
								/textarea/i.test(b.tagName) ? (e.textarea = b, e.textarea.style.display = "none") : b.parentNode.removeChild(b);
								b.id && (a.id = b.id, f.removeAttributes(b, "id"));
								b = a;
								b.innerHTML = ""
							}
							f.addClass(b, "edui-" + e.options.theme);
							e.ui.render(b);
							a = e.options;
							e.container = e.ui.getDom();
							for (var d = f.findParents(b, !0), h = [], k = 0, l; l = d[k]; k++) h[k] = l.style.display, l.style.display = "block";
							a.initialFrameWidth ? a.minFrameWidth = a.initialFrameWidth : (a.minFrameWidth = a.initialFrameWidth = b.offsetWidth, k = b.style.width, /%$/.test(k) && (a.initialFrameWidth = k));
							a.initialFrameHeight ? a.minFrameHeight = a.initialFrameHeight : a.initialFrameHeight = a.minFrameHeight = b.offsetHeight;
							for (k = 0; l = d[k]; k++) l.style.display = h[k];
							b.style.height && (b.style.height = "");
							e.container.style.width = a.initialFrameWidth + (/%$/.test(a.initialFrameWidth) ? "" : "px");
							e.container.style.zIndex = a.zIndex;
							g.call(e, e.ui.getDom("iframeholder"));
							e.fireEvent("afteruiready")
						}
						e.langIsReady ? a() : e.addListener("langReady", a)
					})
				};
				return e
			};
			UE.getEditor = function(a, b) {
				var c = d[a];
				c || (c = d[a] = new UE.ui.Editor(b), c.render(a));
				return c
			};
			UE.delEditor = function(a) {
				var b;
				if (b = d[a]) b.key && b.destroy(), delete d[a]
			};
			UE.registerUI = function(b, c, d, f) {
				a.each(b.split(/\s+/), function(a) {
					p.editor.ui[a] = {
						id: f,
						execFn: c,
						index: d
					}
				})
			}
		})();
		UE.registerUI("135editor", function(c, a) {
			var e = new UE.ui.Dialog({
				iframeUrl: "135editor/135EditorDialogPage.html",
				editor: c,
				name: a,
				title: "135编辑器"
			});
			e.fullscreen = !0;
			e.draggable = !1;
			return new UE.ui.Button({
				name: "dialogbutton" + a,
				className: "edui-for-135editor",
				title: "135编辑器",
				onclick: function() {
					e.render();
					e.open()
				}
			})
		});
		UE.registerUI("message", function(c) {
			function a() {
				if (b && g.ui) {
					var a = g.ui.getDom("toolbarbox");
					a && (b.style.top = a.offsetHeight + 3 + "px");
					b.style.zIndex = Math.max(g.options.zIndex, g.iframe.style.zIndex) + 1
				}
			}
			var e = p.editor.ui.Message,
				b, f = [],
				g = c;
			g.addListener("ready", function() {
				b = document.getElementById(g.ui.id + "_message_holder");
				a();
				setTimeout(function() {
					a()
				}, 500)
			});
			g.addListener("showmessage", function(c, h) {
				h = q.isString(h) ? {
					content: h
				} : h;
				var d = new e({
					timeout: h.timeout,
					type: h.type,
					content: h.content,
					keepshow: h.keepshow,
					editor: g
				}),
					l = h.id || "msg_" + (+new Date).toString(36);
				d.render(b);
				f[l] = d;
				d.reset(h);
				a();
				return l
			});
			g.addListener("updatemessage", function(a, c, e) {
				e = q.isString(e) ? {
					content: e
				} : e;
				a = f[c];
				a.render(b);
				a && a.reset(e)
			});
			g.addListener("hidemessage", function(a, b) {
				var c = f[b];
				c && c.hide()
			})
		});
		UE.registerUI("autosave", function(c) {
			var a = null,
				e = null;
			c.on("afterautosave", function() {
				clearTimeout(a);
				a = setTimeout(function() {
					e && c.trigger("hidemessage", e);
					e = c.trigger("showmessage", {
						content: c.getLang("autosave.success"),
						timeout: 2E3
					})
				}, 2E3)
			})
		})
	})();