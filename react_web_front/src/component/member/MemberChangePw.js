import { useState } from "react";
import Input from "../util/InputFrm";
import "./memberChangePw.css";
import { Button2, Button3 } from "../util/Buttons";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MemberChagnePw = (props) => {
  const [isPwauth, setIsPwauth] = useState(false);
  const [currPw, setCurrPw] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const [memberPwRe, setMemberPwRe] = useState("");
  const token = window.localStorage.getItem("token");
  const member = props.member;
  const setMember = props.setMember;
  const navigate = useNavigate();
  const setMemberPassword = (data) => {
    member.memberPassword = data;
    setMember({ ...member });
  };
  const pwCheck = () => {
    axios
      .post(
        "/member/pwCheck",
        { memberPw: currPw },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        if (res.data === 1) {
          setIsPwauth(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "비밀번호 틀림.",
          });
        }
      });
  };
  const changePw = (props) => {
    const setIsLogin = props.setIsLogin;

    const token = window.localStorage.getItem("token");
    axios
      .post("/member/changePassword", member, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "비밀번호가 변경되었습니다.",
        });
      })
      .catch((res) => {
        if (res.response.status === 403) {
          navigate("/login");
          window.localStorage.removeItem("token");
          setIsLogin(false);
        }
      });
  };
  return (
    <div className="my-content-wrap">
      <div className="my-content-title">비밀번호 변경</div>
      <div className="pw-auth">
        {isPwauth ? (
          <>
            <div className="new-pw-input-wrap">
              <div className="pw-input-wrap">
                <div>
                  <label htmlFor="memberPw">새 비밀번호</label>
                  <Input
                    type="password"
                    data={memberPw}
                    setData={setMemberPw}
                    content="memberPw"
                  />
                </div>
                <div>
                  <label htmlFor="memberPwRe">비밀번호 확인</label>
                  <Input
                    type="password"
                    data={memberPwRe}
                    setData={setMemberPwRe}
                    content="memberPwRe"
                  />
                </div>
              </div>
            </div>
            <div className="change-btn-box">
              <Button2 text="변경하기" clickEvent={changePw} />
            </div>
          </>
        ) : (
          <div className="pw-input-wrap">
            <div>
              <label htmlFor="currPw">현재 비밀번호</label>
              <Input
                data={currPw}
                setData={setCurrPw}
                type="password"
                content="currPw"
              />
              <Button3 text="확인" clickEvent={pwCheck} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default MemberChagnePw;
