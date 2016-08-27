import DS from 'ember-data';

export default DS.Model.extend({
  calories: DS.attr('number'),
  sport: DS.attr('string'),
  startTime: DS.attr('date'),
  speedAvg: DS.attr('number', { defaultValue: 0 }),
  duration: DS.attr('number'),
  distance: DS.attr('number', { defaultValue: 0 }),
  name: DS.attr('string'),

  isSelected: false
});
