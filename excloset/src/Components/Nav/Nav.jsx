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
      
      const changeTopic = () => {
          if(user.role){
            if (user.role === 'donor'){
                return <a href="/donate">Donate</a>
            } else {
                return <a href="/listings">Find Donators</a>
            }
          }else {
              return <a href="/">Home</a>
          }
      }
    return (
        <>
        
        <ul>
            <li>
                {changeTopic()}
            </li>
            <li>
                ExCloset
            </li>
            <li>
                <a href="/">Profile</a>
            </li>
            <li>
             {/* <button onClick={logout}>Logout</button> */}
             {user.role ? <button onClick={logout}>Logout</button> : <button><a href="/login">Login</a></button>}
            </li>
        </ul>
        </>
    )
}

export default Nav;