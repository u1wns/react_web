import axios from "axios";
import "./admin.css";
import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Swal from "sweetalert2";
const AdminMember = () => {
  const [memberList, setMemberList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  useEffect(() => {
    axios
      .get("/member/list/" + reqPage)
      .then((res) => {
        setMemberList(res.data.list);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {});
  });
  return (
    <div className="my-content-wrap">
      <div className="my-content-title">회원관리</div>
      <div className="admin-member-tbl-box">
        <table>
          <thead>
            <tr>
              <td width={"15%"}>회원번호</td>
              <td width={"20%"}>아이디</td>
              <td width={"20%"}>이름</td>
              <td width={"25%"}>전화번호</td>
              <td width={"20%"}>회원등급</td>
            </tr>
          </thead>
          <tbody>
            {memberList.map((member, index) => {
              return <MemberItem key={"member" + index} member={member} />;
            })}
          </tbody>
        </table>
      </div>
      <div className="admin-paging-wrap">
        <Pagination
          reqPage={reqPage}
          setReqPage={setReqPage}
          pageInfo={pageInfo}
        />
      </div>
    </div>
  );
};

const MemberItem = (props) => {
  const member = props.member;
  const [memberType, setMemberType] = useState(member.memberType);
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    const obj = { memberNo: member.memberNo, memberType: event.target.value };
    const token = window.localStorage.getItem("token");
    axios
      .post("/member/changeType", obj, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data === 1) {
          setMemberType(event.target.value);
        } else {
          Swal.fire("변경 중 문제가 발생했습니다.");
        }
      })
      .catch((res) => {
        console.log(res);
      });

    setMemberType(event.target.value);
  };

  return (
    <tr>
      <td>{member.memberNo}</td>
      <td>{member.memberId}</td>
      <td>{member.memberName}</td>
      <td>{member.memberPhone}</td>
      <td>
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id="demo-simple-select-autowidth-label">등급</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={memberType}
            onChange={handleChange}
            autoWidth
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>관리자</MenuItem>
            <MenuItem value={2}>일반회원</MenuItem>
          </Select>
        </FormControl>
      </td>
    </tr>
  );
};

export default AdminMember;
