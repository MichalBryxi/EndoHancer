import DS from 'ember-data';

export default DS.Model.extend({
  authToken: DS.attr('string'),
  displayName: DS.attr('string'),
  userId: DS.attr('number')
});
