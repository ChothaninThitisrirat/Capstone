'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [classCheckEmailin, setClassCheckEmailin] = useState('invisible text-red-500');
  const [classCheckPassin, setClassCheckPassin] = useState('invisible text-red-500');
  const router = useRouter()
  

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const result:any = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result.error) {
        if (result.error === 'Invalid email') {
          setClassCheckEmailin('visible text-red-500')
        }else if (result.error === 'Invalid password') {
          setClassCheckPassin('visible text-red-500')
        }
        console.error(result.error)
      } else {
        router.push('/profile')
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-md shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded "
          />
        </div>
        <div className={classCheckEmailin}>Invalid email</div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div className={classCheckPassin}>Invalid password</div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded mb-4"
        >
          Sign In
        </button>{' '}
      </form>
    </div>
  )
}