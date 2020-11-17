import Qs from 'qs';

// 将浏览器url search转成obj对象形式
export function getIdsObj(hash = window.location.hash) {
  const searchIndex = hash.indexOf('?');
  if (searchIndex !== -1) {
    const _search = hash.slice(searchIndex);
    return Qs.parse(_search, { ignoreQueryPrefix: true });
  }
  return {};
}
