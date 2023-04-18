import { useState, useEffect } from "react"
import Footer from "../components/Footer";
import Header from "../components/Header";
import SignupForm from "@/components/SignupForm"
import LoginForm from "@/components/LoginForm"
export default function Login () {
    return (
        <>
  <div className="flex flex-col items-center min-h-screen">
    <div className="pt-24 w-96">
      <h1 className="text-2xl font-bold text-center">
        Log In
      </h1>
    </div>
    <LoginForm />
    <div className="my-8">
      <p className="text-gray-500">Áttu ekki aðgang? Búðu hann til hér:</p>
      <SignupForm />
    </div>
  </div>
</>

    )
} 