import Input from "../util/InputFrm";
import "./join.css";
import { useState } from "react";
const Join = () => {
  const [memberId, setMemberId] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const [memberPwRe, setMemberPwRe] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [checkIdMsg, setCheckIdMsg] = useState("");

  return (
    <div className="join-wrap">
      <div className="join-title">회원가입</div>
      <JoinInpuWrap
        data={memberId}
        setData={setMemberId}
        type="type"
        content="memberId"
        label="아이디"
        checkIdMsg={checkIdMsg}
      />
      <JoinInpuWrap
        data={memberPw}
        setData={setMemberPw}
        type="password"
        content="memberPw"
        label="비밀번호"
      />
      <JoinInpuWrap
        data={memberPwRe}
        setData={setMemberPwRe}
        type="password"
        content="memberPwRe"
        label="비밀번호 확인"
      />

      <JoinInpuWrap
        data={memberName}
        setData={setMemberName}
        type="text"
        content="memberName"
        label="이름"
      />
      <JoinInpuWrap
        data={memberPhone}
        setData={setMemberPhone}
        type="text"
        content="memberPhone"
        label="전화번호"
      />
    </div>
  );
};

const JoinInpuWrap = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const content = props.content;
  const label = props.label;
  const checkIdMsg = props.checkIdMsg;
  return (
    <div className="join-input-wrap">
      <div>
        <div className="label">
          <label htmlFor={content}>{label}</label>
        </div>
        <div className="input">
          <Input type={type} data={data} setData={setData} content={content} />
        </div>
      </div>
      <div></div>
    </div>
  );
};
export default Join;
