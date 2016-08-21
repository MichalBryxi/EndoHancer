import DS from 'ember-data';

export default DS.Model.extend({
  calories: DS.attr('number'),
  sport: DS.attr('string'),
  startTime: DS.attr('date'),
  speedAvg: DS.attr('number'),
  duration: DS.attr('number'),
  distance: DS.attr('number'),
  name: DS.attr('string'),

  isSelected: false
});
