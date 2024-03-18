'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  Calendar,
  dateFnsLocalizer,
  Event,
  DateLocalizer,
  Views,
  Components,
  ToolbarProps
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
import { generateId } from '@/utils/generateId';
import Toolbar from './Toolbar';
export interface IEventInfo extends Event {
  id: number;
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
  "en-US": enUS,
  "ru": ru,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const initialEventFormState = {
  description: '',
};

const lang = {
  en: undefined,
  'en-GB': undefined,
  'en-US': undefined,
  es: {
    week: 'Semana',
    work_week: 'Semana de trabajo',
    day: 'Día',
    month: 'Mes',
    previous: 'Atrás',
    next: 'Después',
    today: 'Hoy',
    agenda: 'El Diario',

    showMore: (count: number) => `+${count} más`,
  },
  fr: {
    week: 'La semaine',
    work_week: 'Semaine de travail',
    day: 'Jour',
    month: 'Mois',
    previous: 'Antérieur',
    next: 'Prochain',
    today: `Aujourd'hui`,
    agenda: 'Ordre du jour',

    showMore: (count: number) => `+${count} plus`,
  },
  'ru': {
    today: 'Сегодня',
    next: '>',
    previous: '<',
    month: 'Месяц',
    week: 'Неделя',
    day: 'День',
    allDay: 'Весь день',
    noEventsInRange: 'Событий нет',
    date: 'Дата',
    time: 'Время',
    event: 'Событие',
    showMore: (count: number) => `показать все(${count}+)`,
  }
}

export default function Calend() {
  const today = useMemo(() => new Date(), []);  
  const [events, setEvents] = useState<IEventInfo[]>(initEvents);
  const [openSlot, setOpenSlot] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | IEventInfo | null>(
    null
  );
  const [eventInfoModal, setEventInfoModal] = useState(false);
  const [eventFormData, setEventFormData] = useState(initialEventFormState);
  const [showMoreEvents, setShowMoreEvents] = useState<Event[]>([]);
  const [locale, setLocale] = useState<'en' | 'en-GB' | 'en-US' | 'es' | 'fr' | 'ru'>("ru");
  // initialize initial view
  const [view, setView] = useState<'day' | 'week' | 'month'>('month');

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
    setCurrentEvent(event);
    setEventInfoModal(true);
  };

  const handleSelectSlot = ({ start, end }: ISlotInfo) => {
    setOpenSlot(true);
    const title = window.prompt('New Event name');
    if (title) {
      setEvents((prev) => [
        ...prev,
        {
          id: generateId(),
          title,
          start,
          end,
        },
      ]);
    }
  };

  const handleClose = () => {
    setEventFormData(initialEventFormState);
    setOpenSlot(false);
  };

  return (
    <DnDCalendar
      // defaultView={'month'}
      defaultDate={today}
      // views={['month']}
      // defaultView={Views.MONTH}
      views={[Views.MONTH, Views.WEEK, Views.DAY]}
      events={events}
      localizer={localizer}
      culture={locale}
      components={{
        toolbar: () => Toolbar({locale, today}),
      }}
      messages={lang[locale]}
      onEventDrop={onEventDrop}
      draggableAccessor={(event) => true}
      resizable={false}
      selectable={true}
      step={15} // number of minutes per timeslot
      onSelectSlot={handleSelectSlot}
      onSelectEvent={(event: Event, e: React.SyntheticEvent<HTMLElement>) =>
        handleSelectEvent(event)
      }
      onShowMore={(events) => setShowMoreEvents(events)}
      popup={true} // Show truncated events in an overlay when you click the "+x more" link.
      onView={(view) => view}
      view={view}
      formats={{
        dayFormat: (date: Date, culture: any, localizer: any) => localizer.format(date, 'EEEE', culture),
        dayHeaderFormat: (date: Date, culture: any, localizer: any) => localizer.format(date, 'EE MMM do', culture),
      }}
      className="big-calendar"
    />
  );
}
