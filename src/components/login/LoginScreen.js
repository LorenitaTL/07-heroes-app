import React from 'react'

export const LoginScreen = () => {

    const handleLogin = ({ history }) => {
        //history.push('/');
        history.replace('/');
    }
    return (
        <div className="container mt-5">
            <h1>Login Screen</h1>
            <hr />

            <button
                className="btn btn-primary"
                onClick={handleLogin}
            >
                Login
            </button>
        </div>
    )
}
