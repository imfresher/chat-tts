import moment from 'moment-timezone';

import { APP_TIME_ZONE } from '../constants';

const date = {};

date.timeZone = () => {
  let timeZone = moment.tz.guess();

  if (APP_TIME_ZONE && !!moment.tz.zone(APP_TIME_ZONE)) {
    timeZone = APP_TIME_ZONE;
  }

  return timeZone;
};

date.dateTime = () => moment.tz(date.timeZone()).format();

export default date;
