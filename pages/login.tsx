import { useState, useEffect } from "react"
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Login () {
    return (
        <>
            <Header/>
            <div className="bg-gray-100 min-h-screen">
                <h1>Hello World!</h1>
                <button><a href="/">Til baka</a></button>
            </div>
            <Footer />

        </>

    )
} 