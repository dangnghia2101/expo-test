import queryString from 'query-string';

export function buildURL(url: string, query: string | Record<string, unknown>) {
  let _url = url;
  if (query) {
    _url += /\?/.test(url) ? '&' : '?';
    if (typeof query === 'object') {
      _url += queryString.stringify(query);
    } else {
      _url += query;
    }
  }
  return _url;
}
