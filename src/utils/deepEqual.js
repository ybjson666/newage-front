import type from './type';

const keyList = Object.keys;
const hasProp = Object.prototype.hasOwnProperty;

function deepEqual(a, b) {
  if (a === b) return true;

  if (a && b && type(a) === 'object' && type(b) === 'object') {
    var arrA = type(a) === 'array',
      arrB = type(b) === 'array',
      i, length, key;

    if (arrA && arrB) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0;) {
        if (!deepEqual(a[i], b[i])) return false;
      }
      return true;
    }

    if (arrA !== arrB) return false;

    var dateA = type(a) === 'date',
      dateB = type(b) === 'date';
    if (dateA !== dateB) return false;
    if (dateA && dateB) return a.getTime() === b.getTime();

    var regexpA = type(a) === 'regexp',
      regexpB = type(b) === 'regexp';
    if (regexpA !== regexpB) return false;
    if (regexpA && regexpB) return a.toString() === b.toString();

    var keys = keyList(a);
    length = keys.length;

    if (length !== keyList(b).length)
      return false;

    for (i = length; i-- !== 0;)
      if (!hasProp.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      key = keys[i];
      if (!deepEqual(a[key], b[key])) return false;
    }

    return true;
  }

  return (type(a) === 'number' && isNaN(a)) && (type(b) === 'number' && isNaN(b));
}

export default deepEqual;
