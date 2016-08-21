import Ember from 'ember';

const STATES = {
  NOT_STARTED: 'Not started',
  STARTED: 'Started',
  FINISHED: 'Finished'
};

export default Ember.Service.extend({
  store: Ember.inject.service(),

  status: STATES.NOT_STARTED,
  data: null,

  isLoading: Ember.computed('status', function () {
    return this.get('status') === STATES.STARTED;
  }),

  isAuthenticated: Ember.computed('token', function () {
    return !Ember.isEmpty(this.get('token'));
  }),

  token: Ember.computed('data', function () {
    return this.get('data.authToken');
  }),

  userId: Ember.computed('data', function () {
    return this.get('data.userId');
  }),

  doAuth: function (email, password) {
    this.set('status', STATES.STARTED);

    this.get('store').queryRecord('auth', {
      action:	'pair',
      email: email,
      password:	password,
      deviceId: 'foo',
      country: 'GB'
    }).then((item) => {
      this.set('status', STATES.FINISHED);
      this.set('data', item);
    });
  }
});
