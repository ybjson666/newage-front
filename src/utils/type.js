const toString = Object.prototype.toString;

function type(val, strict = false) {
  // 引入严格模式，来区分基本类型的原始值和对象值
  strict = !!strict;
  // 修复typeOf null 为object的问题
  if (val === null) {
    return 'null';
  }

  const t = typeof val;

  // number string boolean undefined symbol
  if (t !== 'object') {
    return t;
  }

  let cls;
  let clsLow;
  try {
    cls = toString.call(val).slice(8, -1);
    clsLow = cls.toLowerCase();
  } catch (e) {
    // ie下的 activex对象
    return 'object';
  }

  if (clsLow !== 'object') {
    // 区分 String() 和 new String()
    if (strict && (clsLow === 'number' || clsLow === 'boolean' || clsLow === 'string')) {
      return cls;
    }
    return clsLow;
  }

  if (val.constructor === Object) {
    return clsLow;
  }

  // Object.create(null)
  try {
    // __proto__ 部分早期firefox浏览器
    if (Object.getPrototypeOf(val) === null || val.__proto__ === null) {
      return 'object';
    }
  } catch (e) {
    // ie下无Object.getPrototypeOf会报错
  }

  // function A() {}; new A
  try {
    const cname = val.constructor.name;

    if (typeof cname === 'string') {
      return cname;
    }
  } catch (e) {
    // 无constructor
  }

  // function A() {}; A.prototype.constructor = null; new A
  return 'unknown';
}

export default type;
