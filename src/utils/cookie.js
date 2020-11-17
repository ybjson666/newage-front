import Cookie from 'js-cookie';

export function saveCookie (name, value) {
  Cookie.set(name, value);
}

export default function getCookie (name) {
  return Cookie.get(name);
}

export function removeCookie (name) {
  Cookie.remove(name);
}
