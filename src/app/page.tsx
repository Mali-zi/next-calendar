import Calend from '@/components/Calendar/Calend';

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
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-10 max-w-5xl w-full items-center justify-between">
        <p className="flex w-full justify-center p-8">Календарь</p>
        <div className="flex h-full w-full items-end justify-center bg-white">
          <Calend />
        </div>
      </div>
    </main>
  );
}
