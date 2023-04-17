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
            {state === 'loading' && (<p>loading...</p>)} 
            {state === 'success' && (<p>logging out...</p>)}
        </>
    )
}

export default Logout;