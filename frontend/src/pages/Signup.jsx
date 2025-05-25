import AuthForm from '@/components/authForm'
import AuthNav from '@/components/authNav'

import React from 'react'

function SignUp() {
  return (
    <div className="relative min-h-screen flex flex-col w-full overflow-hidden">

      <div className="absolute inset-0 -z-10">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/Screenshot 2025-04-27 201506.png')" }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div>


      <AuthNav />


      <div className="flex-1 flex items-center justify-center p-8">
        <div className="flex w-full max-w-7xl">
          <div className="flex-1 items-center hidden md:flex">
            <h1 className="text-white text-4xl font-bold leading-tight">
              Join Pinterest today
            </h1>
          </div>

          <div className="flex-1 flex justify-center md:justify-end">
            <AuthForm
              heading="Create your account"
              subHeading="Find new ideas to try"
              buttonText="Sign Up"
              googleButtonText="Continue with Google"
              bottomText="Already have an account?"
              bottomLinkText="Log in"
              showUserName={true}
              
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
