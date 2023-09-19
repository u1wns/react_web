import "./myInfo.css";
const MyInfo = (props) => {
  const member = props.member;
  const setMember = props.setMember;
  return (
    <div className="my-content-wrap">
      <div className="my-content-title">내정보</div>
    </div>
  );
};

export default MyInfo;
