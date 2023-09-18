import Swal from "sweetalert2";
import { useState } from "react";
import "./login.css";
import Input from "../util/InputFrm";
import { Link } from "react-router-dom";
import { Button1, Button2, Button3 } from "../util/Buttons";

const Login = () => {
  const [memberId, setMemberId] = useState("");
  const [memberPw, setMemberPw] = useState("");
  return (
    <div className="login-wrap">
      <div className="login-title">LOGIN</div>
      <div className="input-wrap">
        <label htmlFor="memberId">아이디</label>
        <Input
          type="text"
          data={memberId}
          setData={setMemberId}
          content="memberId"
        />
      </div>
      <div className="input-wrap">
        <label htmlFor="memberPw">비밀번호</label>
        <Input
          type="password"
          data={memberPw}
          setData={setMemberPw}
          content="memberPw"
        />
      </div>
      <div className="search-box">
        <Link to="#">아이디 찾기</Link>
        <span className="material-icons">horizontal_rule</span>
        <Link to="#">비밀번호 찾기</Link>
      </div>
      <div className="login-btn-box">
        <Button2 text="로그인" />
      </div>
      <div className="login-btn-box">
        <Button3 text="회원가입" />
      </div>
    </div>
  );
};
export default Login;
