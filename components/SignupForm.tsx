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
        <form onSubmit={handleSubmit}>
            <p>
                <label htmlFor='name'>Name:</label>
                <input id='name' type="text" value={name} onChange={onInputChangeName} />
            </p>
            <p>
                <label htmlFor='email'>Email:</label>
                <input id='email' type="text" value={email} onChange={onInputChangeEmail} />
            </p>
            <p>
                <label htmlFor='password'>Password:</label>
                <input id='password' type="password" value={password} onChange={onInputChangePassword} />
            </p>
        <button type="submit">Sign Up</button>
    </form>
    {state === 'error' && (
        <div>
            <p>náði ekki að búa til notenda</p>
            <ul>
                {errors.map((error, i) => {
                    return (
                        <li key={i}>{error.msg}</li>
                    )
                })}
            </ul>
        </div>
    )}
    {state === 'loading' && (<p>bý til notenda...</p>)}
    {state === 'success' && (<p>bjó til Notenda!</p>)}
    </>
    );
}

export default SignupForm;
