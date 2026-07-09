"use client"
import Header from "../../components/MainPage/Header";
import SignUpPage from "../../components/AuthPages/SignUpPage";


export default function Login() {
    return (
        <div className="flex flex-col justify-center h-screen overflow-hidden">
            <Header />
            <SignUpPage/>
        </div>
    )
}