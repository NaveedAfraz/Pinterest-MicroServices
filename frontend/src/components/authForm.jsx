import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import useAuth from "../hooks/auth/useAuth"
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { useUserContext } from '../context'
const AuthForm = ({
    heading,
    subHeading,
    buttonText,
    googleButtonText,
    bottomText,
    bottomLinkText,
    showUserName,
}) => {
    const navigate = useNavigate()
    const { login, signUp } = useAuth()
    const { setUser } = useUserContext()
    const [formData, setFormData] = useState({
        username: "",
        email: "batman1@gmail.com",
        password: "123456",
    })
    const handleAuth = () => {
        if (buttonText === "Sign Up") {
            toast("Signing up...")
            signUp.mutate(formData)
        } else {
            toast("Logging in...")
            login.mutate(formData)
        }
    }
    useEffect(() => {
        console.log(login.data);
        if (login?.data?.success) {
            navigate("/gallery")
            setUser(login.data)
        }
    }, [login?.data?.success])
    return (
        <Card className="w-full max-w-md rounded-2xl shadow-lg">
            <CardContent className="p-8">
                <div className="text-center mb-6">
                    <i className="fa-brands fa-pinterest text-xl text-red-600 mx-auto mb-2" />
                    <h2 className="text-2xl font-bold">{heading}</h2>
                    <p className="text-gray-500 text-sm">{subHeading}</p>
                </div>

                <div className="space-y-4">
                    {showUserName && <Input placeholder="Username" onChange={(e) => setFormData({ ...formData, username: e.target.value })} />}
                    <Input placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    <Input placeholder="Password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    <Button className="w-full bg-red-600 hover:bg-red-700 cursor-pointer" onClick={handleAuth}>{buttonText}</Button>
                </div>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300" />
                    <span className="mx-4 text-gray-500">OR</span>
                    <div className="flex-grow border-t border-gray-300" />
                </div>

                <Button variant="outline" className="w-full cursor-pointer" onClick={() => {
                    toast("Not Available")
                }}>
                    {googleButtonText}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                    By continuing, you agree to Pinterest's <span className="underline cursor-pointer">Terms of Service</span> and acknowledge our <span className="underline cursor-pointer">Privacy Policy</span>.
                </p>

                <p className="text-center text-sm mt-6 cursor-pointer">
                    {bottomText} <span className="underline cursor-pointer">
                        <button className='cursor-pointer underline' onClick={() => navigate(`${buttonText === "Sign Up" ? "/auth/login" : "/auth/signup"}`)}>{bottomLinkText}</button>
                    </span>
                </p>
            </CardContent>
        </Card>
    )
}

export default AuthForm
