import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.get('store').query('workout', {
      authToken: 'foo',
      maxResults: 1000,
      fields: 'basic',
      after: '2015-01-01 00:00:00 UTC',
      before: '2015-12-31 23:59:59 UTC'
    }).then(function(peters) {
      // Do something with `peters`
    });
  }
});
