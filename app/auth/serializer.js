import DS from 'ember-data';
import Ember from 'ember';

export default DS.JSONSerializer.extend({
  normalizeResponse: function (store, primaryModelClass, payload, id, requestType) {
    let attributes = {};

    payload.split('\n').forEach(function (item) {
      let kv = item.split('=');
      kv[1] && (attributes[kv[0]] = kv[1]);
    });

    let json = {
      data: {
        id: attributes['authToken'],
        type: 'auth',
        attributes: attributes
      }
    };

    return json;
  }
});
