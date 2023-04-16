import { useState, useEffect } from "react"
import SignupForm from "@/components/SignupForm"
import LoginForm from "@/components/LoginForm"

export default function Login () {
    return (
        <>
            <button><a href="/">Til baka</a></button>
            <h1>Sign Up Here!</h1>
            <SignupForm />
            <h1>Sign In Here!</h1>
            <LoginForm />

        </>

    )
} 