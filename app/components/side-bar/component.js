import Ember from 'ember';

export default Ember.Component.extend({
  email: null,
  password: null,
  auth: Ember.inject.service(),
  filter: Ember.inject.service(),

  actions: {
    processAuth: function () {
      this.get('auth').doAuth(
        this.get('email'),
        this.get('password')
      )
    },

    passwordKeyDown(event) {
      if(event.code == 'Enter') {
        this.send('processAuth');
      }
    },

    setFilter(key, value) {
      this.set(`filter.${key}`, value);
    }
  }
});
