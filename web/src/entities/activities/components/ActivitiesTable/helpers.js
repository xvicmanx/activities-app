// @flow

import moment from 'moment';

export const dateValueTableValueResolver = (item: Object): any => moment(item.date).format('DD-MM-YYYY HH:mm');

