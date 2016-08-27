import DS from 'ember-data';
import ENV from 'endohancer/config/environment';

export default DS.RESTAdapter.extend({
  envPrefix: Ember.computed(function () {
    if (ENV.environment === 'development') {
      return 'mobile';
    } else {
      return 'api/mobile';
    }
  })
});
