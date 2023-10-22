import React, { useState } from "react";
import styles from "./registration.module.css";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const { registration } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    registration({ userName, password, email, position });
  };

  return (
    <div className={styles.container}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className={styles.forms}>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="password"
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
            onChange={(e) => setPassword(e.target.value.toString("hex"))}
            required
          />
          <label for="floatingPassword">Password</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="Password"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          <label for="floatingInput">CEO</label>
        </div>

        <button type="submit" class="btn btn-primary btn-lg">
          Register
        </button>
      </form>
    </div>
  );
};
export default Register;
