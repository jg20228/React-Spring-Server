import React from "react";
import { GoogleLogin } from "react-google-login";
import Axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
};

//JSON으로 받는다. await과 async
const responseGoogle = async (response) => {
  console.log(1, response);

  //이걸 구성해서 만들면 공통코드 같은것처럼
  let res = { ...response, ...{ provider: "google" } };

  //get해도 되고 post해도 되고
  let jwtToken = await Axios.post(
    "http://localhost:8080/oauth/jwt/google",
    JSON.stringify(response),
    config
  );

  if (jwtToken.status === 200) {
    //링크,바디,헤더(config-객체을 만들어서 담으면 됨)
    console.log(2, jwtToken.data);
    //웹 브라우저 localStorage에 저장 (나만의 static 공간)
    localStorage.setItem("jwtToken", jwtToken.data);
  }
};

const Login = () => {
  return (
    <GoogleLogin
      clientId=""
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default Login;
