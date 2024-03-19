import Calend from '@/components/Calendar/Calend';
import PageToolbar from '@/components/PageToolbar/PageToolbar';

async function getData() {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      action: 'get_ids',
      params: {},
    }),
  };
  const res = await fetch('', options);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start px-16">
      <PageToolbar />
      <div className="calendar-main-container">
        <Calend />
      </div>
    </main>
  );
}
