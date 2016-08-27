import DS from 'ember-data';
import Ember from 'ember';

export default DS.JSONAPISerializer.extend({
  auth: Ember.inject.service(),

  normalizeQueryResponse: function (store, primaryModelClass, payload, id, requestType) {
    payload.data = payload.data.map(function (attributes) {
      let data = {
        id: attributes.id,
        type: 'workout',
        attributes: attributes
      }
      return data;
    });

    return this._super(...arguments);
  },

  serialize(snapshot, options) {
    let json = this._super(...arguments);

    json.workoutId = json.data.id;
    json.userId = this.get('auth.userId');
    json.input = JSON.stringify({
      sport: Number.parseInt(json.data.attributes.sport)
    });

    delete json.data;

    return json;
  },

  normalizeSaveResponse: function (store, primaryModelClass, payload, id, requestType) {
    return {
      "data": {
        id: id
      }
    };
  },

  keyForAttribute: function(key) {
    return Ember.String.decamelize(key);
  },
});
