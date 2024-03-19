export interface IToolbar {
  locale: 'en-GB' | 'en-US' | 'es' | 'fr' | 'ru';
  today: Date;
}

const monthNames = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export default function Toolbar({ locale, today }: IToolbar) {
  let month = today.toLocaleDateString(locale, { month: 'long' });

  if (locale === 'ru') {
    month = monthNames[today.getMonth()];
  }
  const year = today.getFullYear();

  return (
    <nav className="flex flex-row justify-between bg-red-300 p-4">
      <div>
        {month}, {year}
      </div>
      <div className="flex flex-row justify-end gap-4 bg-red-300">
        <button type="button" className="calendar-navigation-previous">&#65124;</button>
        <button type="button" className="calendar-navigation-current">Сегодня</button>
        <button type="button" className="calendar-navigation-next">&#65125;</button>
      </div>
    </nav>
  );
}
