import React from 'react'
import { Button } from './ui/button'
import { Link, useNavigate } from "react-router"
import { toast } from 'sonner'

function AuthNav() {
    const navigate = useNavigate()

    return (
        <div className='w-full h-15 flex items-center justify-between bg-amber-50 px-4 md:px-6'>
            <div className='flex items-center'>
                <div className='flex items-center'>
                    <i className="fa-brands fa-pinterest text-xl text-red-600"></i>
                    <span className='font-bold text-red-700 ml-1'>Pinterest</span>
                </div>
                <Button
                    className="ml-3 bg-amber-50 text-black hover:bg-white hover:underline"
                    onClick={() => toast("Please login to explore")}
                >
                    Explore
                </Button>
            </div>


            <div className='flex items-center space-x-1'>
                <div className='hidden lg:flex items-center space-x-1'>
                    <Button className="bg-amber-50 text-black hover:bg-white hover:underline">
                        About
                    </Button>
                    <Button className="bg-amber-50 text-black hover:underline hover:bg-white">
                        Business
                    </Button>
                    <Button className="bg-amber-50 text-black hover:underline hover:bg-white">
                        Blog
                    </Button>
                </div>

                <Link
                    to="/auth/login"
                    className="bg-red-700 hover:bg-red-800 text-white hover:underline px-2.5 py-1.5 md:px-4 md:py-2 font-semibold text-sm rounded-xl transition-colors duration-200"
                >
                    Log in
                </Link>
                <Link
                    to="/auth/signUp"
                    className="bg-gray-200 text-black hover:underline hover:bg-gray-300 px-2.5 py-1.5 md:px-4 md:py-2 font-semibold text-sm rounded-xl transition-colors duration-200"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    )
}

export default AuthNav