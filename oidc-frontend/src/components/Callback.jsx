import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { getCodeVerifier } from "../utils/pkce";
import api from "../utils/api";

const Callback = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        const code = new URLSearchParams(window.location.search).get("code");
        const code_verifier = getCodeVerifier();

        api.get('auth/callback/',{
            params: {code, code_verifier}
        }).then(res=>{
            localStorage.setItem("access_token",res.data.access);
            localStorage.setItem("refresh_token",res.data.refresh);
            navigate("/dashboard");
        })
        .catch(err => console.error(err));
    },[navigate]);

    return <h2>Loading...</h2>

};

export default Callback;