import React from 'react';
import LoginDonatee from './LoginDonatee'
import LoginDonor from './LoginDonor'
const Login = () => {
    return (
        <>
        <div>
            <h3>Login as Donor</h3>
            <LoginDonor/>
        </div>
        <div>
            <h3>Login as an Organization</h3>
            <LoginDonatee/>
        </div>
        </>
    )
}

export default Login