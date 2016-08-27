import DS from 'ember-data';
import ApplicationAdapter from '../application/adapter';

export default ApplicationAdapter.extend({
  // '/api/' - Heroku API_PREFIX_PATH, which is then removed
  // '/mobile/api/workout' - Endomondo namespace
  // namespace: 'api/mobile/api/workout',
  auth: Ember.inject.service(),

  namespace: Ember.computed('envPrefix', function () {
    let envPrefix = this.get('envPrefix');

    return `${envPrefix}/api/workout`
  }),

  urlForQuery() {
    let namespace = this.get('namespace');
    return `${namespace}/list`;
  },

  updateRecord: function(store, type, snapshot) {
    let data = this.serialize(snapshot, { includeId: true });
    let id = snapshot.id;
    let namespace = this.get('namespace');
    let url = `${namespace}/post`;
    let token = this.get('auth.token');
    data.authToken = token;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        data: data
      }).then(function(data) {
        Ember.run(null, resolve, data);
      }, function(jqXHR) {
        jqXHR.then = null; // tame jQuery's ill mannered promises
        Ember.run(null, reject, jqXHR);
      });
    });
  }
});
