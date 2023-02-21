import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
const CREATE_USER = gql`
  mutation ($input: LoginInput!) {
    login(input: $input) {
      email
      userName
    }
  }
`;

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [login, { loading, error }] = useMutation(CREATE_USER, {
    variables: {
      input: { email: userInfo.email, password: userInfo.password },
    },
    onCompleted: (data) => {
      if (data) {
        console.log("data", data);
        //setAuthUser(data.login.user);
        //Cookies.set("jwt", data.login.jwt);
        setUserInfo({
          email: "",
          password: "",
        });
        //Router.push("/products");
      }
    },
  });

  const handleSubmit = async (e) => {
    console.log("e", userInfo);
    try {
      e.preventDefault();
      await login();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div style={{ margin: "100px" }}>
        <div>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "auto",
              width: "30%",
            }}
            onSubmit={handleSubmit}
          >
            <input
              style={{ margin: "5px", height: "30px" }}
              type="email"
              name="email"
              placeholder="Email"
              value={userInfo.email}
              onChange={handleChange}
            />
            <input
              style={{ margin: "5px", height: "30px" }}
              type="password"
              name="password"
              placeholder="Password"
              value={userInfo.password}
              onChange={handleChange}
            />
            <button
              style={{
                margin: "5px",
                padding: "10px",
                background: "teal",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
              }}
              type="submit"
              //disabled={loading}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <>
        <button
          style={{
            margin: "5px",
            padding: "10px",
            cursor: "pointer",
            fontSize: "18px",
            background: "red",
            border: "none",
            color: "white",
          }}
        >
          <a
            style={{ color: "white", textDecoration: "none" }}
            href="http://localhost:4000/auth/google"
          >
            Sign in with Google
          </a>
        </button>
      </>
    </>
  );
};

export default SignIn;
