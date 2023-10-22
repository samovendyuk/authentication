import React, { useState } from "react";
import styles from "./login.module.css";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { singIn } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    singIn({ userName, password });
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="Jhon"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <label for="floatingInput">User Name</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label for="floatingPassword">Password</label>
        </div>
        <button type="submit" class="btn btn-primary btn-lg">
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
