'use client';

import { useCallback, useState } from 'react';
import {
  Calendar,
  dateFnsLocalizer,
  Event,
  DateLocalizer,
} from 'react-big-calendar';
import withDragAndDrop, {
  withDragAndDropProps,
} from 'react-big-calendar/lib/addons/dragAndDrop';
import format, { formatDate } from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import ru from 'date-fns/locale/ru';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { initEvents } from './events';
import './calendar.css';

interface IEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: any;
  desc?: string;
}

interface ISlotInfo {
  start: Date;
  end: Date;
}

const addHours = (date: Date, hours: number) => {
  date.setHours(date.getHours() + hours);
  return date;
};

const locales = {
  // "en-US": enUS,
  ru: ru,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function Calend() {
  const [events, setEvents] = useState<IEvent[]>(initEvents);

  const DnDCalendar = withDragAndDrop(Calendar);

  const onEventDrop: withDragAndDropProps['onEventDrop'] = (data) => {
    console.log(data);
  };

  // const handleSelectSlot = ({ start, end }: SlotInfo) => {
  //   if (typeof start === "string") {
  //     start = new Date(start);
  //   }

  //   if (typeof end === "string") {
  //     end = new Date(end);
  //   }

  //   const startDate = formatDate(start, "EEEE");

  //   const save = window.confirm(
  //     `Add availability on ${formatDate(start, "EEEE")} from ${formatDate(
  //       start,
  //       "H:mm"
  //     )} to ${formatDate(end, "H:mm")}?`
  //   );
  //   if (save) {
  //     setEvents([
  //       ...events,
  //       {
  //         id: Date.now(),
  //         start: new Date(
  //           start.getDay(),
  //           start.getHours(),
  //           start.getMinutes()
  //         ),
  //         end: new Date(
  //           end.getDay(),
  //           end.getHours(),
  //           end.getMinutes()
  //         ),
  //         title: ""
  //       }
  //     ]);
  //   }
  // };

  // const handleSelect = (event: Event) => {
  //   const { start, end } = event;
  //   if(start && end) {
  //     const del = window.confirm(
  //       `Delete availability on ${formatDate(start, "EEEE")} from ${formatDate(
  //         start,
  //         "h:mm"
  //       )} to ${formatDate(end, "h:mm")}?`
  //     );
  //     if (del) {
  //       const index = events.findIndex((e) => e.id === event.id);
  //       setEvents([...events.slice(0, index), ...events.slice(index + 1)]);
  //     }
  //   };
  //   }

  const handleSelectEvent = (event: Event) => {
    console.log(event.title);
  };

  const handleSelectSlot = ({ start, end }: ISlotInfo) => {
    const title = window.prompt('New Event name');
    if (title) {
      setEvents((prev) => [
        ...prev,
        {
          id: Date.now(),
          title,
          start,
          end,
        },
      ]);
    }
  };

  return (
    <DnDCalendar
      defaultView={'month'}
      defaultDate={new Date()}
      views={['month']}
      events={events}
      localizer={localizer}
      onEventDrop={onEventDrop}
      draggableAccessor={(event) => true}
      resizable={false}
      step={15} // number of minutes per timeslot
      onSelectSlot={handleSelectSlot}
      onSelectEvent={(event: Event, e: React.SyntheticEvent<HTMLElement>) =>
        handleSelectEvent(event)
      }
      className="big-calendar"
    />
  );
}
