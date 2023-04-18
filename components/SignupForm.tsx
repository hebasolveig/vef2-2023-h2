import { generateApiUrl } from '@/util/generateApiUrl';
import { useState } from 'react';

const SignupForm = () => {
    const URL = generateApiUrl('users/register');
    // states
    // '' | 'loading' | 'error' | 'success'
    const [state, setState] = useState('');
    const [errors, setErrors] = useState<{ msg: string }[]>([]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // input change
    const onInputChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const onInputChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const onInputChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    // submit
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        
        createSecureServer(name, email, password);
    }

    async function createSecureServer(myName: string, myEmail: string, myPassword:string) {
        setState('loading')
        try {
            const myBody = {
                username: myName,
                email: myEmail,
                password: myPassword
            }
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(myBody)
            });
            if (!response.ok) {
                setState('error')
                if (response.status >= 400 && response.status < 500) {
                    const responseJSON = await response.json();
                    console.log(responseJSON);
                    setErrors(responseJSON.errors);
                }
            } else {
                setState('success')
            }
            
        } catch (e) {
            setState('error')
            console.log(e)
        }
    }

return (
  <>
    <form onSubmit={handleSubmit} className="w-96 mx-auto mt-6">
      <div className="mb-4">
        <label htmlFor='name' className="block text-gray-700 font-bold mb-2">Name:</label>
        <input id='name' type="text" value={name} onChange={onInputChangeName} className="w-full px-3 py-2 placeholder-gray-300 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
      </div>
      <div className="mb-4">
        <label htmlFor='email' className="block text-gray-700 font-bold mb-2">Email:</label>
        <input id='email' type="text" value={email} onChange={onInputChangeEmail} className="w-full px-3 py-2 placeholder-gray-300 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
      </div>
      <div className="mb-4">
        <label htmlFor='password' className="block text-gray-700 font-bold mb-2">Password:</label>
        <input id='password' type="password" value={password} onChange={onInputChangePassword} className="w-full px-3 py-2 placeholder-gray-300 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
      </div>
      <button type="submit" className="w-full px-3 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
        Sign Up
      </button>
    </form>
    {state === 'error' && (
        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <p className="font-bold mb-2">Náði ekki að búa til notanda</p>
            {errors.map((error, i) => {
              return (
                <li key={i}>{error.msg}</li>
              )
            })}
        </div>
      )}
    {state === 'loading' && (
      <p className="text-center mt-4">Býr til notanda...</p>
    )}
    {state === 'success' && (
      <p className="text-center mt-4 text-green-500 font-bold">Notandi búinn til!</p>
    )}
  </>
);
}

export default SignupForm;
