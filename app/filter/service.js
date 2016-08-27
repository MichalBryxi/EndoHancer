import Ember from 'ember';
import moment from 'moment';

export default Ember.Service.extend({
  dateFormat: 'YYYY-MM-DD',
  sport: '-1',
  startDate: null,
  endDate: null,
  maxResults: 100,

  init() {
    let format = this.get('dateFormat');
    let startDate = moment().subtract(1, 'month').format(format);
    this.set('startDate', startDate);

    let endDate = moment().format(format);
    this.set('endDate', endDate);
  }
});
