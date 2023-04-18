import Cookies from 'js-cookie';
import { generateApiUrl } from '@/util/generateApiUrl';
import { useState } from 'react';

const LoginForm = () => {
    const URL = generateApiUrl('users/login');
    // states
    // '' | 'loading' | 'error' | 'success'
    const [state, setState] = useState('');
    const [errors, setErrors] = useState<{ msg: string }[]>([]);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    


    // input change
    const onInputChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
      }
      const onInputChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
      }

    // submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        createSecureServer(name, password);
    }

    async function createSecureServer(myName: string, myPassword: string) {
        setState('loading')
        try {
            const myBody = {
                username: myName,
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
                var myJSON = await response.json()
                const { user, token, expiresIn } = myJSON;
                //const cookieString = `user=${encodeURIComponent(JSON.stringify(user))}; token=${encodeURIComponent(token)}; expires=${new Date(Date.now() + expiresIn * 1000).toUTCString()}`;
                // set the cookie in the browser
                //document.cookie = cookieString;

                Cookies.set('token', encodeURIComponent(token), {expires: myJSON.expiresIn})
                Cookies.set('user', encodeURIComponent(JSON.stringify(user)))
                // redirect 
                //router.push('/')
                //window.location.href = '/'
                const upload_headers = {
                  'Cookie': document.cookie
                };

                console.log(document.cookie)

                const upload_response = await fetch(generateApiUrl('users/me'), {
                  method: 'POST',
                  headers: upload_headers
                });

                console.log(await upload_response.json())

                
            }
            
        } catch (e) {
            setState('error')
            console.log(e)
        }
    }


    return (
        <>
          <form onSubmit={handleSubmit} className="w-96 mx-auto mt-4">
            <div className="mb-4">
              <label htmlFor='name' className="block text-gray-700 font-bold mb-2">Name:</label>
              <input id='name' type="text" value={name} onChange={onInputChangeName} className="w-full px-3 py-2 placeholder-gray-300 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
            </div>
            <div className="mb-6">
              <label htmlFor='password' className="block text-gray-700 font-bold mb-2">Password:</label>
              <input id='password' type="password" value={password} onChange={onInputChangePassword} className="w-full px-3 py-2 placeholder-gray-300 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
            </div>
            
              <button type="submit" className="w-full px-3 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50" >
                LogIn
              </button>
            
          </form>
      
          {state === 'error' && (
            <div className="mt-4 w-96 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative relative" role="alert">
              <strong className="font-bold mb-2">Náði ekki að logga inn</strong>
              <ul>
                {errors.map((error, i) => {
                  return (
                    <li key={i} className="text-sm">{error.msg}</li>
                  )
                })}
              </ul>
            </div>
          )}
      
          {state === 'loading' && (
            <p className="text-center mt-4">Reynir að logga inn...</p>
          )}
      
          {state === 'success' && (
            <p className="text-center mt-4 text-green-500 font-bold">Náði að logga inn!</p>
          )}
        </>
      );
      
}

export default LoginForm;

