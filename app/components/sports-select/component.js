import Ember from 'ember';
import { SPORTS } from '../../lib/sports';

export default Ember.Component.extend({
  sports: Ember.computed(function () {
    return SPORTS;
  }),

  actions: {
    getSportName: function (index) {
      let sport = this.get('sports').filter(function (item) {
        // We call String() here, because of some weird paper-select bug
        return item.id === String(index);
      });

      return sport[0].name;
    }
  }
});
