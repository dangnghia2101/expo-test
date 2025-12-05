import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import Calendar from 'dayjs/plugin/calendar';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import minMax from 'dayjs/plugin/minMax';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

dayjs.extend(minMax);
dayjs.locale('ja');
dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);
dayjs.extend(utc);
dayjs.extend(Calendar);
dayjs.extend(advancedFormat);
