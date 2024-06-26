'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Icon } from '@iconify/react';
import HashLoader from "react-spinners/HashLoader";


interface SignInProps {
  setStylesingup: (style: boolean) => void;
  setStylelogin: (style: boolean) => void;
}

const SignIn: React.FC<SignInProps> = ({ setStylesingup, setStylelogin }) => {
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [classCheckEmailin, setClassCheckEmailin] = useState('invisible text-red-500 text-xs text-right');
  const [classCheckPassin, setClassCheckPassin] = useState('invisible text-red-500 text-xs text-right');
  const [typePasswordlog, setTypePasswordlog] = useState('password');
  const router = useRouter()
  

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    setLoadingInfo(true)
    e.preventDefault()
    try {
      const result:any = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result.error) {
        if (result.error === 'Invalid email') {
          setClassCheckEmailin('visible text-red-500 text-xs text-right')
          setTimeout(() => {
            setLoadingInfo(false)
          }, 1500);
        }else if (result.error === 'Invalid password') {
          setClassCheckPassin('visible text-red-500 text-xs text-right')
          setTimeout(() => {
            setLoadingInfo(false)
          }, 1500);
        }
        console.error(result.error)
      } else {
        setTimeout(() => {
          setLoadingInfo(false)
          router.push('/')
          setTypePasswordlog('password')
        }, 1000);
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleStyle = () => {
    setTypePasswordlog("password")
    setStylesingup(true);
    setStylelogin(false);
    setTimeout(() => {
      setFormSignup();
    }, 2000);
  }

  const setFormSignup = () => {
    setEmail("");
    setPassword("");
  };


  return (
      <form
        onSubmit={handleSubmit}
        className="w-[400px] px-10 pt-10 pb-5 rounded-3xl shadow-md bg-white border border-gray-300 flex-col duration-300 scale- sm:scale-100 -translate-x-3 sm:-translate-x-52"
      >
        <div className="max-w-96 w-screen text-4xl font-bold">Login</div>
        <div className=" text-gray-400 mt-5 ml-2">เข้าสู่ระบบ</div>

        <div className="flex relative mb-4">
          <Icon icon="carbon:email" width="30" height="30"  style={{color:'#A7A7A7'}}
          className=" absolute bottom-2 left-1" />
          <input
              id="email"
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              maxLength={40}
              required
              className="w-full border-b border-gray-400 pl-12 py-2 mt-8"
          />
        </div>  

        <div className={classCheckEmailin}>Invalid email</div>

        <div className="flex relative mb-4">
          <Icon icon="ph:lock" width="28" height="28"  style={{color:'#A7A7A7'}} 
          className=" absolute bottom-2 left-1"/>
          <input
            id="password"
            type={typePasswordlog}
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            maxLength={20}
            required
            className="w-full border-b border-gray-400 pl-12 py-2 mt-2"
          />
          {typePasswordlog === "password" 
            ? <Icon 
                onClick={() => setTypePasswordlog("text")}
                icon="majesticons:eye-line" width="25" height="25" 
                className=" absolute bottom-1 right-1 text-gray-400"/>
            :<Icon 
                onClick={() => setTypePasswordlog("password")}
                icon="iconamoon:eye-off" width="25" height="25" 
                className=" absolute bottom-1 right-1 text-gray-400"/>}
        </div>
        <div className={classCheckPassin}>Invalid password</div>
        <div className="flex items-center mt-10 mb-5 justify-between">
          <span 
          onClick={handleStyle}
          className="text-blue-400 text-xs cursor-pointer hover:underline">
            Don’t Have an account?</span>
            <button
              type="submit"
              className="flex text-white p-1.5 rounded-full w-36 h-9 justify-end items-center gap-5 bg-dark2 duration-200"
            >
              LOG IN
              {loadingInfo 
                ? <HashLoader
                className="ml-1 mr-2"
                color='#fff' loading={loadingInfo} size={20} aria-label="Loading Spinner" data-testid="loader"/>
                :<Icon icon="formkit:arrowright" width="25" height="25" />}
            </button>{' '}
        </div>
      </form>
  )
}
export default SignIn;