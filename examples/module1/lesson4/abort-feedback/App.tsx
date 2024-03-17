import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
}

const API_URL = '/api/data/users?timeout=10000';

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [aborted, setAborted] = useState(false);

  const fetchUsers = async () => {
    const controller = new AbortController();

    if (aborted) {
      setAborted(false);
    }

    const timeout = setTimeout(() => {
      controller.abort();

      setAborted(true);
    }, 5000);

    try {
      const res = await fetch(API_URL, {
        signal: controller.signal,
      });

      const { users } = await res.json();
      setUsers(users);
    } catch (error) {
      console.error(error);
    } finally {
      clearTimeout(timeout);
    }

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="flex flex-row items-center justify-between py-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="flex flex-row items-center">
          {aborted &&  (
            <div className='flex flex-col gap-3'>
            <p className="mr-2">
            Sorry, there seems to be connectivity issues...
          </p>
          <button className="text-blue-400 bg-blue-200 hover:text-blue-200 hover:bg-blue-400 rounded-md p-4" onClick={() => fetchUsers()}>
            Try again
          </button>
          </div>
          )}
        </div>
      </div>
      <ul className="space-y-2">
        {users.map((user, index) => (
          <li
            className="bg-white p-4 rounded-md border border-gray-100"
            key={index}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
