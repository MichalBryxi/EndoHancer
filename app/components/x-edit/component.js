import Ember from 'ember';

export default Ember.Component.extend({
  showPromptDialog: false,

  actions: {
    close() {
      this.set('showPromptDialog', false);
    },

    save() {
      this.get('saveChanges')();
      this.send('close');
    }
  }
});
