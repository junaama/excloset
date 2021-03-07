import React from 'react';
import RegisterDonor from './User/RegisterDonor'
import RegisterDonatee from './User/RegisterDonatee'

const Landing = () => {
    return (
        <>
        <div>
            <h2>Welcome to ExCloset</h2>
            <p>So many non-profit organizations receive heaps of unsorted clothing that often gets tossed or unappreciated. At ExCloset we facilitate a direct connection for organizations to select the items they need.</p>
            <p>
                Donors can register and post listings of clothing items they wish to donate.
            </p>
            <p>
                Organizations can register to browse listings and choose what they need for their purposes.
            </p>
        </div>
        <div>
            <h3>Register as Donor</h3>
            <RegisterDonor />
        </div>
        <div>
            <h3>Register as an Organization</h3>
            <RegisterDonatee/>
        </div>
        </>
    )
}

export default Landing