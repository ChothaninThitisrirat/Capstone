'use client'
import { FC } from 'react';
import { useRouter } from 'next/navigation';

function TestProfile(){
  const router = useRouter();

  const handleToProfile = (User_ID: number | null | undefined) => {
    if (User_ID !== null && User_ID !== undefined) {
      router.push(`/profile/${User_ID.toString()}`);
    } else {
      console.error("User_ID is null or undefined");
    }
  };

  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id} className="mb-2">
            <button
              onClick={() => handleToProfile(user.id)}
              className="text-blue-500 hover:underline"
            >
              {user.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestProfile;
