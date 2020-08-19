import React, { useState } from "react";
import Login from "./Login";
import Axios from "axios";

//default header를 만들어 놓는법 찾기
//알려준 사이트에서 config 기본설정에 보면 있음
const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
  },
};

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    console.log(3, "getUser");
    console.log(4, config);
    //get이라 바디 필요없음
    let res = await Axios.get("http://localhost:8080/user", config);
    setUser(res.data);
  };

  return (
    <div>
      <Login />
      <h1>/user : {user}</h1>
      <button onClick={getUser}>유저정보 가져오기</button>
    </div>
  );
}

export default App;
