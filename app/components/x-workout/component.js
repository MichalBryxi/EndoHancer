import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['flex-45', 'flex-xs-100', 'flex-gt-md-30'],

  auth: Ember.inject.service(),

  workoutURL: Ember.computed('auth.userId', 'workout.id', function () {
    let userId = this.get('auth.userId');
    let workoutId = this.get('workout.id');

    return `https://www.endomondo.com/users/${userId}/workouts/${workoutId}`;
  }),

  // actions: {
  //   clicked() {
  //     this.get('workout').toggleProperty('isSelected');
  //   }
  // }
});
