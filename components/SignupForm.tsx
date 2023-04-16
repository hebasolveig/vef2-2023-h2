import { useState } from 'react';

const SignupForm = () => {
    // states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // submit
    const handleSubmit = (event) => {
        event.preventDefault();
        // handle form submission here
    }

    // 

    return (
        <form onSubmit={handleSubmit}>
        <label>
            Name:
            <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label>
            Email:
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label>
            Password:
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <button type="submit">Sign Up</button>
    </form>
    );
}

export default SignupForm;
