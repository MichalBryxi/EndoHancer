import Ember from 'ember';

export default Ember.Controller.extend({
  isSideBarOpen: true,

  auth: Ember.inject.service(),
  isFilterDisabled: Ember.computed.empty('workouts'),
  isSelectedAll: false,
  filterSport: '-1',
  noFilter: '-1',
  editSport: '5', // KickBike

  selectedWorkouts: Ember.computed.filterBy('workouts', 'isSelected', true),

  workouts: Ember.computed('auth.isAuthenticated', function () {
    if(this.get('auth.isAuthenticated')) {
      return this.get('store').query ('workout', {
        authToken: this.get('auth.token'),
        maxResults: 10,
        fields: 'basic',
        // after: '2015-01-01 00:00:00 UTC',
        // before: '2015-12-31 23:59:59 UTC'
      });
    } else {
      return [];
    }
  }),

  workoutsFiltered: Ember.computed('filterSport', 'workouts.[]', function () {
    let filter = this.get('filterSport');
    let noFilter = this.get('noFilter');
    let workouts = this.get('workouts');

    if(filter === noFilter) {
      return workouts;
    } else {
      let data = workouts.filter(function (item) {
        return item.get('sport') === filter;
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

    setFilterSport(newSport) {
      this.set('filterSport', newSport);
    },

    setEditSport(newSport) {
      this.set('editSport', newSport);
    },

    toggleSideBar() {
      this.toggleProperty('isSideBarOpen');
    },

    saveChanges() {
      console.log('yep');
      this.get('selectedWorkouts').forEach((workout) => {
        workout.set('sport', this.get('editSport'));
        workout.save();
      });
    }
  }
});
