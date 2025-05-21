import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React from 'react'

const AuthForm = ({
    heading,
    subHeading,
    buttonText,
    googleButtonText,
    bottomText,
    bottomLinkText,
    showUserName,
}) => {
    return (
        <Card className="w-full max-w-md rounded-2xl shadow-lg">
            <CardContent className="p-8">
                <div className="text-center mb-6">
                    <i className="fa-brands fa-pinterest text-xl text-red-600 mx-auto mb-2" />
                    <h2 className="text-2xl font-bold">{heading}</h2>
                    <p className="text-gray-500 text-sm">{subHeading}</p>
                </div>

                <div className="space-y-4">
                    {showUserName && <Input placeholder="Username" />}
                    <Input placeholder="Email" />
                    <Input placeholder="Create a password" type="password" />
                    <Button className="w-full bg-red-600 hover:bg-red-700">{buttonText}</Button>
                </div>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300" />
                    <span className="mx-4 text-gray-500">OR</span>
                    <div className="flex-grow border-t border-gray-300" />
                </div>

                <Button variant="outline" className="w-full">
                    {googleButtonText}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                    By continuing, you agree to Pinterest's <span className="underline">Terms of Service</span> and acknowledge our <span className="underline">Privacy Policy</span>.
                </p>

                <p className="text-center text-sm mt-6">
                    {bottomText} <span className="underline cursor-pointer">{bottomLinkText}</span>
                </p>
            </CardContent>
        </Card>
    )
}

export default AuthForm
