import { Button2 } from "../util/Buttons";
import Input from "../util/InputFrm";
import "./memberChangePw.css";

const updatePassword = () => {
  const setIsLogin = props.setIsLogin;
  const token = window.localStorage.getItem("token");
  axios.post("/member/changePhone", member, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

const MemberChangePw = (props) => {
  return (
    <div className="password-wrap">
      <div className="password-title">비밀번호 변경</div>
      <table className="password-tbl">
        <tobody>
          <tr>
            <td>현재 비밀번호 입력</td>
            <td id="current-password">
              <div>
                <Input type="text" />
                <Button2 text="확인" />
              </div>
            </td>
          </tr>
          <tr>
            <td>새 비밀번호 입력</td>
            <td id="member-phone">
              <div>
                <Input type="text" />
                <Button2 text="변경하기" clickEvent={updatePassword} />
              </div>
            </td>
          </tr>
        </tobody>
      </table>
    </div>
  );
};

export default MemberChangePw;
