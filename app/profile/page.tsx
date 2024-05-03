'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Profile() {
  const { data: session, status } = useSession()

  const router = useRouter()

  function IsAdmin() {
    if (session?.user.isAdmin === true) {
      return "Admin"
    } else {
      return "User"
    }
  }

  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  return (
    status === 'authenticated' &&
    session.user && (
      <div className="flex h-screen items-center justify-center">
        <div className="bg-white p-6 rounded-md shadow-md">
          <p>
            Welcome, <b>{session.user.username}!</b>
          </p>
          <p>Email: {session.user.email}</p>
          <p>ID: {session.user.id}</p>
          <p>Role: <IsAdmin /> </p>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    )
  )
}