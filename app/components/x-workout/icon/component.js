import Ember from 'ember';
import { SPORTS } from '../../../lib/sports';

const DEFAULT_ICON = { icon: 'battery-unknown', name: 'Unknown' };

export default Ember.Component.extend({
  group: Ember.computed('sport', function () {
    let id = this.get('sport');
    return SPORTS.filter(function (sport) {
      return sport.id === id;
    })[0];
  }),

  icon: Ember.computed('group', function () {
    return this.getWithDefault('group', DEFAULT_ICON).icon;
  }),

  text: Ember.computed('group', function () {
    return this.getWithDefault('group', DEFAULT_ICON).name;
  }),

  style: Ember.computed('text', function () {
    let text = this.get('text');
    let color = this.get('group.color');

    return Ember.String.htmlSafe(`color: #${color}`);
  })
});
