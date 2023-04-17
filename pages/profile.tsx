import Cookies from "js-cookie"
import { useEffect, useState } from "react";

export default function Profile () {

    // states
    // 'loading' | 'success'
    const [state, setState] = useState('loading');

    const [user, setUser] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const tokenCookie = Cookies.get('token')
        const userCookie = Cookies.get('user')
        if (tokenCookie && userCookie) {
            setUser(userCookie)
            setToken(tokenCookie)
            setState('success')
        }
        else {
            window.location.href = 'login'
        }
    }, [])
    
    return (
        <>
            {state === 'loading' && (<p>loading...</p>)} 
            {state === 'success' && (<h1>Welcome {user}!</h1>)}
        </>
    )
}