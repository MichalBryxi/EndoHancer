import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: 'mobile/auth',
  pathForType: function(type) {
    return '';
  },
   ajaxOptions(url, type, options) {
    var hash = options || {};
    hash.url = url;
    hash.type = type;
    hash.dataType = 'text';
    hash.context = this;

    if (hash.data && type !== 'GET') {
      hash.contentType = 'text/plain; charset=utf-8';
    }

    var headers = this.get('headers');
    if (headers !== undefined) {
      hash.beforeSend = function (xhr) {
        Object.keys(headers).forEach((key) =>  xhr.setRequestHeader(key, headers[key]));
      };
    }

    return hash;
  }
});
