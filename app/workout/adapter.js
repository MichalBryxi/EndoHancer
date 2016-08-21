import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: 'mobile/api/workout',
  auth: Ember.inject.service(),

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
