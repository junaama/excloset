import './App.css';
import React, { useState, useEffect } from "react";
import axios from 'axios'
import {Switch, Route} from 'react-router'
import Nav from "./Components/Nav/Nav";
import Register from "./Components/User/RegisterDonor";
import Login from "./Components/User/Login";
import Landing from './Components/Landing'
import apiUrl from "./apiConfig.js";
import UserContext from "./Context/context";
import Footer from './Components/Footer/Footer'
import Donate from './Components/CreateListing/Donate'

function App() {
  const [user, setUser] = useState({
    token: undefined,
    user: undefined,
    role: undefined
  });
  console.log('user: ', user.role)
  useEffect(() => {
    const checkDonorLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        `${apiUrl}/api/donoruser/tokenIsValid`,
        null,
        {
          headers: { "x-auth-token": token },
        }
      );
      if (tokenRes.data) {
        const userRes = await axios.get(`${apiUrl}/api/donoruser`, {
          headers: { "x-auth-token": token },
        });
        console.log("ur",userRes.data)
        setUser({
          token,
          user: userRes.data,
          role: "donor"
        });
      }
    };
    const checkDonateeLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        `${apiUrl}/api/donateeuser/tokenIsValid`,
        null,
        {
          headers: { "x-auth-token": token },
        }
      );
      if (tokenRes.data) {
        const userRes = await axios.get(`${apiUrl}/api/donateeuser`, {
          headers: { "x-auth-token": token },
        });
        console.log("ur",userRes.data)
        setUser({
          token,
          user: userRes.data,
          role: "donatee"
        });
      }
    }
    checkDonateeLoggedIn();
    checkDonorLoggedIn();
  }, []);

  return (
   <UserContext.Provider value = {{user, setUser}}>
     <div>
       <Nav/>
       <Switch>
         <Route exact path="/" component={Landing}/>
         <Route path="/register" component={Register} />
         <Route path="/login" component={Login} />
         <Route path="/donate" component={Donate}/>
       </Switch>
       <Footer/>
     </div>
   </UserContext.Provider>
  );
}

export default App;
