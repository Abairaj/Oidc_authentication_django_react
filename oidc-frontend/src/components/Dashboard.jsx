import React, {useEffect, useState} from "react";
import { BACKEND_URL } from "../utils/config";
import api from "../utils/api";
import { useLogout } from "../utils/logout";

const Dashboard = () =>{
    const [userData, setUserData] = useState(null);
    const logout = useLogout()
    useEffect(()=>{
        const accessToken = localStorage.getItem('access_token');
        api.get('auth/profile/').then(res => setUserData(res.data))
        .catch(err => console.error(err));
    },[]);

    return (
        <div>
            <h1>Dashboard</h1>
            {userData ? (
                <pre>{JSON.stringify(userData,null,2)}</pre>
            ) : (
                <p>Loading user data...</p>
            )}
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;