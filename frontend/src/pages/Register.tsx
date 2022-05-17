import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [state, setState] = useState({
    redirect: false,
  });

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const res = await axios.post("register", {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      password_confirm: passwordConfirm,
    });

    console.log(res.data);

    setState({ redirect: true });
  };

  if (state.redirect) {
    return <Navigate to="/login" />;
  } else {
    return (
      <main className="form-signin">
        <form onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal">Please register</h1>

          <input
            className="form-control"
            placeholder="First Name"
            required
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            className="form-control"
            placeholder="Last Name"
            required
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="email"
            className="form-control"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            className="form-control"
            placeholder="Password Confirm"
            required
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Submit
          </button>
        </form>
      </main>
    );
  }
};

export default Register;
