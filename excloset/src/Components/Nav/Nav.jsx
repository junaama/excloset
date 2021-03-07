import React , {useContext, useEffect} from 'react';

import UserContext from "../../Context/context";
const Nav = () => {

  const { user, setUser } = useContext(UserContext);

    const logout = () => {
        setUser({
          token: undefined,
          user: undefined,
          role: undefined
        });
        localStorage.setItem("auth-token", "");
        document.cookie = "userId=";
        console.log("in logout", document.cookie);
      };
      
    return (
        <>
        
        <ul>
            <li>
                <a href="/">{user.role === 'donor' ? "Donate" : "Find Donators"}</a>
            </li>
            <li>
                ExCloset
            </li>
            <li>
                <a href="/">Profile</a>
            </li>
            <li>
             <button onClick={logout}>Logout</button>
            </li>
        </ul>
        </>
    )
}

export default Nav;