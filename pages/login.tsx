import { useState, useEffect } from "react"
import SignupForm from "@/components/SignupForm"
import LoginForm from "@/components/LoginForm"

export default function Login () {
    return (
        <>
            <button><a href="/">Til baka</a></button>
            <h1>Sign Up</h1>
            <SignupForm />
            <h1>Sign In</h1>
            <LoginForm />

        </>

    )
} 