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
            setUser(JSON.parse(userCookie))
            setToken(tokenCookie)
            setState('success')
            console.log(user)
        }
        else {
            window.location.href = 'login'
        }
    }, [])
    
    return (
        <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                {state === 'loading' && (
                    <p className="text-center text-gray-500">loading...</p>
                )} 
                {state === 'success' && (
                    <>
                        <h1 className="text-center text-gray-500">Welcome {user.username}!</h1>
                        <p>Email: {user.email}</p>
                        <p>Created: {new Date(user.created).toLocaleString()}</p>
                        {user.admin && (
                            <p>You are an administrator.</p>
                        )}
                    </>
                )}
            </div>
        </div>
        </>
    )
}