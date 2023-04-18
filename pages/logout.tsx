import Cookies from "js-cookie"
import { useEffect, useState } from "react";

const Logout = () => {

    // states
    // 'loading' | 'success'
    const [state, setState] = useState('loading');

    useEffect(() => {
        Cookies.remove('token');
        Cookies.remove('user')
        window.location.href = 'login'
        setState('success')
    }, [])
    
    return (
        <>
        <div className="bg-gray-100 min-h-screen pt-20">
            {state === 'loading' && (
                <p className="text-center text-gray-500">loading...</p>
            )} 
            {state === 'success' && (
                <p className="text-center text-gray-500">logging out...</p>
            )}
        </div>
        </>
    )
}

export default Logout;