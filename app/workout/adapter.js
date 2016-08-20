import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  // host: 'http://api.mobile.endomondo.com',
  namespace: 'mobile/api',
  pathForType: function(type) {
    return 'workout/list';
  }
});
