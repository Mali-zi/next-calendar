'use client';

import { FC, useState } from 'react';
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar';
import withDragAndDrop, {
  withDragAndDropProps,
} from 'react-big-calendar/lib/addons/dragAndDrop';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import ru from 'date-fns/locale/ru';
import startOfHour from 'date-fns/startOfHour';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const addHours = (date: Date, hours: number) => {
  date.setHours(date.getHours() + hours);
  return date;
}

const locales = {
  'en': enUS,
  'ru': ru,
};

// The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
//@ts-ignore
const DnDCalendar = withDragAndDrop(Calendar);

export default function Calend() {
  const now = new Date();
  const props = [
    {
      title: 'Meeting',
      start: new Date(2024, 3, 15, 16, 0), // Year, Month (0-11), Day, Hour, Minute
      end: new Date(2024, 3, 15, 20, 0),
    },
    // Add more events here...
  ];
  
  const [events, setEvents] = useState<Event[]>(props);

  const onEventResize: withDragAndDropProps['onEventResize'] = (data) => {
    const { start, end } = data;

    setEvents((prev) => {
      const firstEvent = {
        start: new Date(start),
        end: new Date(end),
      };
      return [...prev, firstEvent];
    });
  };

  const onEventDrop: withDragAndDropProps['onEventDrop'] = (data) => {
    console.log(data);
  };

  return (
    <DnDCalendar
      defaultView="week"
      events={events}
      localizer={localizer}
      onEventDrop={onEventDrop}
      onEventResize={onEventResize}
      resizable
      style={{ height: '100vh' }}
    />
  );
};
