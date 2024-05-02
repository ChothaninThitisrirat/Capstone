'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [personalId, setPersonalId] = useState('')
    const [address, setAddress] = useState('')
    const [telNumber, setTelNumber] = useState('')
    const [infoPage, setInfoPage] = useState(true)
    const [classLeastCharacters, setClassLeastCharacters] = useState('')
    const [hasSpecialChar, setHasSpecialChar] = useState('');
    const router = useRouter()

    // const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     try {
    //     const result:any = await signIn('credentials', {
    //         redirect: false,
    //         username,
            // email,
            // password,
            // firstName,
            // lastName,
            // personalId,
            // address,
            // telNumber
    //     })

    //     if (result.error) {
    //         console.error(result.error)
    //     } else {
    //         router.push('/profile')
    //     }
    //     } catch (error) {
    //     console.log('error', error)
    //     }
    // }
    const handleSubmitInfoPage1 = async(e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setInfoPage(false)
    }
    const log = async(e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(username,email,password,confirmPassword,firstName,lastName,personalId,address,telNumber)
    }

    

    const handlePasswordChange = (e: React.SyntheticEvent<HTMLFormElement>) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
    const passwordLength = inputValue.length;
    if (passwordLength < 8) {
        setClassLeastCharacters('text-red-500');
    } else {
        setClassLeastCharacters('text-green-500');
    }
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    setHasSpecialChar(specialCharRegex.test(inputValue));
    };
    return (
        <div className="flex h-screen items-center justify-center">
        
            {infoPage
            ?<>
            <form
            onSubmit={(e)=> handleSubmitInfoPage1(e)}
            className="p-6 rounded-md shadow-md"
            >
            <div className="mb-4">
            <input
                id="username"
                type="username"
                value={username}
                placeholder='username'
                onChange={(e) => setUsername(e.target.value)}
                maxLength={20}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded "
            />
            </div>

            <div className="mb-4">
            <input
                id="email"
                type="email"
                value={email}
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                maxLength={40}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded "
            />
            </div>

            <div className="mb-4">
            <input
                id="password"
                type="password"
                value={password}
                placeholder='Password'
                onChange={(e)=>handlePasswordChange(e)}
                maxLength={20}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded"
            />
            </div>
            {hasSpecialChar ? (
            <span style={{ color: 'green' }}>รหัสผ่านมีตัวอักษรพิเศษ</span>
            ) : (
            <span style={{ color: 'red' }}>รหัสผ่านไม่มีตัวอักษรพิเศษ</span>
            )}
            <div className={classLeastCharacters}>Least 8 Characters</div>
            <div className="mb-4">
            <input
                id="confirmPassword"
                type="Password"
                value={confirmPassword}
                placeholder='Confirm Password'
                onChange={(e) => setConfirmPassword(e.target.value)}
                maxLength={20}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded"
            />
            </div>
            <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded mb-4"
            >
            Next
            </button>
            </form>
            </>
            :<>
            <form
            // onSubmit={handleSubmit}
            className="p-6 rounded-md shadow-md"
            >
            <div className="mb-4">
            <input
                id="firstName"
                type="firstName"
                value={firstName}
                placeholder='FirstName'
                onChange={(e) => setFirstName(e.target.value)}
                maxLength={20}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded"
            />
            </div>

            <div className="mb-4">
            <input
                id="lastName"
                type="lastName"
                value={lastName}
                placeholder='LastName'
                onChange={(e) => setLastName(e.target.value)}
                maxLength={20}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded "
            />
            </div>

            <div className="mb-4">
            <input
                id="personalId"
                type="personalId"
                value={personalId}
                placeholder='PersonalId'
                onChange={(e) => setPersonalId(e.target.value)}
                maxLength={13}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded"
            />
            </div>

            <div className="mb-4">
            <input
                id="address"
                type="address"
                value={address}
                placeholder='Address'
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded"
            />
            </div>

            <div className="mb-4">
            <input
                id="telNumber"
                type="telNumber"
                value={telNumber}
                placeholder='TelNumber'
                onChange={(e) => setTelNumber(e.target.value)}
                maxLength={10}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded"
            />
            </div>
            <button
            onClick={() => setInfoPage(true)}
            className="w-full bg-blue-500 text-white py-2 rounded mb-4"
            >
            Back
            </button>
            <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded mb-4"
            >
            Sign In
            </button>{' '}
            </form>
            </>
            
            }

        
        </div>
    )
}