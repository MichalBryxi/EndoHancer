import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  isSideBarOpen: true,

  dateFormat: 'YYYY-MM-DD hh:mm:ss UTC',

  auth: Ember.inject.service(),
  filter: Ember.inject.service(),

  isFilterDisabled: Ember.computed.empty('workouts'),
  isSelectedAll: false,
  noSport: '-1',
  editSport: '95', // KickBike

  selectedWorkouts: Ember.computed.filterBy('workouts', 'isSelected', true),

  workouts: Ember.computed('auth.isAuthenticated', 'filter.startDate', 'filter.endDate', 'filter.maxResults', function () {
    if(this.get('auth.isAuthenticated')) {
      let dateFormat = this.get('dateFormat');
      let after = moment(this.get('filter.startDate')).format(dateFormat);
      let before = moment(this.get('filter.endDate')).format(dateFormat);
      let maxResults = this.get('filter.maxResults');

      return this.get('store').query ('workout', {
        authToken: this.get('auth.token'),
        maxResults: maxResults,
        fields: 'basic',
        after: after,
        before: before
        // after: '2015-01-01 00:00:00 UTC',
        // before: '2015-12-31 23:59:59 UTC'
      });
    } else {
      return [];
    }
  }),

  workoutsFiltered: Ember.computed('filter.sport', 'workouts.[]', function () {
    let sport = this.get('filter.sport');
    let noSport = this.get('noSport');
    let workouts = this.get('workouts');

    if(sport === noSport) {
      return workouts;
    } else {
      let data = workouts.filter(function (item) {
        return item.get('sport') === sport;
      });

      return data;
    }
  }),

  actions: {
    selectedAll() {
      this.toggleProperty('isSelectedAll');

      let isSelectedAll = this.get('isSelectedAll');
      this.get('workoutsFiltered').forEach(function(workout) {
        workout.set('isSelected', isSelectedAll);
      });
    },

    setEditSport(newSport) {
      this.set('editSport', newSport);
    },

    toggleSideBar() {
      this.toggleProperty('isSideBarOpen');
    },

    saveChanges() {
      this.get('selectedWorkouts').forEach((workout) => {
        workout.set('sport', this.get('editSport'));
        workout.save().then( function () {
            workout.set('isSelected', false);
          }, function (reason) {
            console.log(`Something went wrong when saving ${workout.id}`, reason);
          }
        );
      });
    }
  }
});
