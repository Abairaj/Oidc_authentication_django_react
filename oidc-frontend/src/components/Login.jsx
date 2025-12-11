import React, { useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, REDIRECT_URI } from "../utils/config";
import { generatePKCE } from "../utils/pkce";


const Login = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        const accessToken = localStorage.getItem("access_token");
        if(accessToken){
            navigate('/dashboard')
        }
    },[]);
    const handleLogin = () => {
        generatePKCE().then(
            (res)=>{
        const authUrl = `https://${AUTH0_DOMAIN}/authorize?` +
        `response_type=code&` +
        `client_id=${AUTH0_CLIENT_ID}&` +
        `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
        `scope=openid profile email&` +
        `code_challenge=${res}&` +
        `code_challenge_method=S256`;
        
        window.location.href = authUrl;
            }
        )

    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Login with Auth0</button>
        </div>
    )
};


export default Login;