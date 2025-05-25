import AuthForm from '@/components/authForm'
import AuthNav from '@/components/authNav'

import React from 'react'

function Login() {
  return (
    <div className="relative min-h-screen flex flex-col w-full overflow-hidden">
      <AuthNav />
      <div className="absolute inset-0 -z-10">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/Screenshot 2025-04-27 201506.png')" }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="flex w-full max-w-7xl">
          <div className="flex-1 items-center hidden md:flex">
            <h1 className="text-white text-4xl font-bold leading-tight">
              Welcome Back to Pinterest
            </h1>
          </div>

          <div className="flex-1 flex justify-center md:justify-end">
            <AuthForm
              heading="Welcome to Pinterest"
              subHeading="Join Pinterest today"
              buttonText="Continue"
              googleButtonText="Continue with Google"
              bottomText="Don't have an account? "
              bottomLinkText="Sign Up"
              showUserName={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
