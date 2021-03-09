import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Switch, Route } from "react-router";
import Nav from "./Components/Nav/Nav";
import Register from "./Components/User/RegisterDonor";
import Login from "./Components/User/Login";
import Landing from "./Components/Landing";
import apiUrl from "./apiConfig.js";
import UserContext from "./Context/context";
import Footer from "./Components/Footer/Footer";
import Donate from "./Components/CreateListing/Donate";
import Listings from "./Components/DisplayListings/Listings";
import ListingsContainer from "./Components/DisplayListings/ListingContainer";
function App() {
  const [user, setUser] = useState({
    token: undefined,
    user: undefined,
    role: undefined,
  });
  const [userListings, setUserListings] = useState();

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
        setUser({
          token,
          user: userRes.data,
          role: "donor",
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
        setUser({
          token,
          user: userRes.data,
          role: "donatee",
        });
      }
    };
    const getAllListings = async () => {
      try {
        const response = await axios(`${apiUrl}/api/donoruser`);
        console.log("RES: ", response.data.users)
        setUserListings(response.data.users);
      } catch (error) {
        console.error(error);
      }
    };
    checkDonateeLoggedIn();
    checkDonorLoggedIn();
    getAllListings();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, userListings }}>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/donate" component={Donate} />
          <Route path="/listings" component={ListingsContainer} />
          {/* <Route path="/listingsctn" component={ListingsContainer}/> */}
        </Switch>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
