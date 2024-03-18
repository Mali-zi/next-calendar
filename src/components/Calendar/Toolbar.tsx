import { format } from 'date-fns/format';

export interface IToolbar {
  locale: string;
  today: Date;
}

export default function Toolbar({locale, today}: IToolbar) {
  return <nav className="bg-red-300">{format(today, 'MM/dd/yyyy')}</nav>;
}
