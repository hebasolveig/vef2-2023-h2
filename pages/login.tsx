import { useState, useEffect } from "react"
import Footer from "../components/Footer";
import Header from "../components/Header";
import SignupForm from "@/components/SignupForm"
import LoginForm from "@/components/LoginForm"
export default function Login () {
    return (
        <>
            <Header/>
            <div className="bg-gray-100 min-h-screen">
                <h1>Hello World!</h1>
                <button><a href="/">Til baka</a></button>
            </div>
            <h1>Sign Up Here!</h1>
            <SignupForm />
            <h1>Sign In Here!</h1>
            <LoginForm />
            <Footer />

        </>

    )
} 