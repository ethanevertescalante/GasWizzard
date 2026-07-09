"use client"
import Header from "../../components/MainPage/Header";
import LoginPage from "../../components/AuthPages/LoginPage";


export default function Login() {
    return (
        <div className="flex flex-col justify-center h-screen overflow-hidden">
            <Header />
            <LoginPage/>
        </div>
    )
}