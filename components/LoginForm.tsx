import Cookies from 'js-cookie';
import { generateApiUrl } from '@/util/generateApiUrl';
import { useState } from 'react';

const LoginForm = () => {
    const URL = generateApiUrl('users/login');
    // states
    // '' | 'loading' | 'error' | 'success'
    const [state, setState] = useState('');
    const [errors, setErrors] = useState([]);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    // input change
    const onInputChangeName = (e) => {
        setName(e.target.value);
    }
    const onInputChangePassword = (e) => {
        setPassword(e.target.value);
    }

    // submit
    const handleSubmit = (e) => {
        e.preventDefault();
        
        createSecureServer(name, password);
    }

    async function createSecureServer(myName, myPassword) {
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
                Cookies.set('token', myJSON.token, {expires: myJSON.expiresIn})
                Cookies.set('user', myJSON.user.username)
                // redirect 
                //router.push('/')
                window.location.href = '/'
                
            }
            
        } catch (e) {
            setState('error')
            console.log(e)
        }
    }


    return (
        <>
        <form onSubmit={handleSubmit}>
            <p>
                <label htmlFor='name'>Name:</label>
                <input id='name' type="text" value={name} onChange={onInputChangeName} />
            </p>
            <p>
                <label htmlFor='password'>Password:</label>
                <input id='password' type="password" value={password} onChange={onInputChangePassword} />
            </p>
        <button type="submit">Sign Inn</button>
    </form>
    {state === 'error' && (
        <div>
            <p>náði ekki að logga inn</p>
            <ul>
                {errors.map((error, i) => {
                    return (
                        <li key={i}>{error.msg}</li>
                    )
                })}
            </ul>
        </div>
    )}
    {state === 'loading' && (<p>reyni að logga inn...</p>)}
    {state === 'success' && (<p>Loggaði inn!</p>)}
    </>
    );
}

export default LoginForm;

