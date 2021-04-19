import { GoogleLoginButton } from 'react-social-login-buttons'
import React from 'react'
import "./Login.css"

const SERVER_URL = process.env.REACT_APP_SERVER_URL
const Login = (props) => {

  const handleGoogleClick = () => {

    window.location.href = `${SERVER_URL}/auth/google`
    console.log('google is clicked')

  }


  return (
    <div className="login">
      <div className="login__container">
        <div className="login__text">
          <h1>Sign in to ChatRoom</h1>
        </div>
        <GoogleLoginButton onClick={handleGoogleClick} />
      </div>
    </div>
  )
}

export default Login
