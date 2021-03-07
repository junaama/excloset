import React, { useState, useContext } from "react";
import {  useHistory} from "react-router-dom";
import axios from 'axios'
import Errors from '../Errors/errors'
import UserContext from '../../Context/context'
import apiUrl from '../../apiConfig.js'

const LoginDonatee = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState();
  const history = useHistory()
  const {setUser} = useContext(UserContext)

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = input.email
    const password = input.password
    try{
      const loginRes = await axios.post(`${apiUrl}/api/users/login`, {
        email,
        password
      })
      setUser({
        token: loginRes.data.token,
        user: loginRes.data.user,
      })
      document.cookie = "userId=" + loginRes.data.user.id
      localStorage.setItem("auth-token", loginRes.data.token)
      history.push('/')
    }catch(err){
      err.response.data.msg && setErrors(err.response.data.msg)
    }

  };
 
  


  return (
    <div className="login-ctn">
       <p id="login-head">Log in</p>
       {errors && (
        <Errors message={errors} clearError={() => setErrors(undefined)} />
      )}
      <form  onSubmit={handleSubmit} className="logform-ctn">
        <label htmlFor="email">Email</label>
        <input
        
          onChange={handleChange}
          type="text"
          name="email"
          id="email"
          autoComplete="current-email"
        />

        <label htmlFor="password">Password</label>
        <input
         
          onChange={handleChange}
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
        />
        <br/>
        <button type="submit" id="log-btn">Login</button>
      </form>
      <p id="log-reg">
        No Account? <a href="/">Sign up</a>
      </p>
    </div>
  );
};

export default LoginDonatee
