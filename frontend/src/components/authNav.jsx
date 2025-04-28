import React from 'react'
import { Button } from './ui/button'
import { Link } from "react-router"
 
 
function AuthNav() {
    return (
        <>
            <div className='w-full h-15 flex items-center bg-amber-50'>
                <div className='ml-5'>
                    <i className="fa-brands fa-pinterest text-xl text-red-600"></i>
                    <span className='font-bold text-red-700'>Pinterest</span>
                    <Button className="mx-1 bg-amber-50 text-black hover:bg-white hover:underline">Explore</Button>
                </div>
                <div className='absolute right-0'>
                    <Button className="mx-1 bg-amber-50 text-black hover:bg-white hover:underline">About</Button>
                    <Button className="mx-1 bg-amber-50 text-black hover:underline hover:bg-white">Business</Button>
                    <Button className="mx-1 bg-amber-50 text-black hover:underline hover:bg-white">Blog</Button>
                    <Link to="/auth/login" className="mx-1 bg-red-700 hover:bg-red-700 text-white hover:underline px-2.5 py-1.5 font-semibold text-sm rounded-xl">Log in</Link>
                    <Link to="/auth/signUp" className="mx-1 bg-gray-200 text-black hover:underline hover:bg-gray-300 px-2.5 py-1.5 font-semibold text-sm rounded-xl">Sign Up</Link>
                </div>
            </div>

        </>
    )
}

export default AuthNav