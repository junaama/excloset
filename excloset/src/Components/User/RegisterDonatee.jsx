import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import apiUrl from "../../apiConfig";
import UserContext from "../../Context/context";
import Errors from "../Errors/errors";

const RegisterDonatee = () => {
  const [input, setInput] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState();
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = input.email;
      const password = input.password;
      await axios.post(`${apiUrl}/api/donateeuser/register`, input);

      const loginRes = await axios.post(`${apiUrl}/api/donateeuser/login`, {
        email,
        password,
      });
      setUser({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      document.cookie = "userId=" + loginRes.data.user.id;
      history.push("/");
    } catch (err) {
      err.response.data.msg && setErrors(err.response.data.msg);
    }
  };
  return (
    <div >
      <p >Create your account</p>
      {errors && (
        <Errors message={errors} clearError={() => setErrors(undefined)} />
      )}
       <form onSubmit={handleSubmit} >
        <label>Username</label>
        <input
          onChange={handleChange}
          type="text"
          name="username"
          id="username"
        />
         <label>Name</label>
        <input
          onChange={handleChange}
          type="text"
          name="username"
          id="username"
        />
        <label>Email</label>
        <input onChange={handleChange} type="text" name="email" id="email" />

        <label>Password</label>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          id="password"
        />

        <label>Confirm Password</label>
        <input
          onChange={handleChange}
          type="password"
          name="password2"
          id="password2"
        />
       <button type="submit" id="reg-btn">Register</button>
      </form>
      <p>
        Already registered? <a href="/login">Log in</a>
      </p>
    </div>
  );
};
export default RegisterDonatee;
