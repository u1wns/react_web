import axios from "axios";
import { useEffect, useState } from "react";
import "./admin.css";
import Pagination from "../common/Pagination";
import Switch from "@mui/material/Switch";
import Swal from "sweetalert2";

const AdminBoard = () => {
  const [boardList, setBoardList] = useState([]);
  const [pageInfo, setpageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  useEffect(() => {
    axios
      .get("/board/adminList/" + reqPage)
      .then((res) => {
        setBoardList(res.data.list);
        setpageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res);
      });
  });

  return (
    <div className="my-content-wrap">
      <div className="my-content-title">게시글 관리</div>
      <div className="admin-board-tbl">
        <table>
          <thead>
            <td width={"10%"}>글번호</td>
            <td width={"45%"} className="title-td">
              제목
            </td>
            <td width={"15%"}>작성자</td>
            <td width={"15%"}>작성일</td>
            <td width={"15%"}>공개여부</td>
          </thead>
          <tbody>
            {boardList.map((board, index) => {
              return <BoardItem key={"board" + index} board={board} />;
            })}
          </tbody>
        </table>
      </div>
      <div className="admin-paging-wrap">
        <Pagination
          pageInfo={pageInfo}
          reqPage={reqPage}
          setReqPage={setReqPage}
        />
      </div>
    </div>
  );
};

const BoardItem = (props) => {
  const board = props.board;
  const [status, setStatus] = useState(board.boardStatus === 1 ? true : false);
  const chageStatus = (e) => {
    const boardNo = board.boardNo;
    const boardStatus = e.target.checked ? 1 : 2;
    // const obj = {boardNo : boardNo, boardStatus : }
    const obj = { boardNo, boardStatus };
    const token = window.localStorage.getItem("token");
    axios
      .post("/board/changeStatus", obj, {
        headers: {
          Authorizaion: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data === 1) {
          setStatus(e.target.checked);
        } else {
          Swal.fire("변경 중 문제가 발생했습니다.");
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };
  //setStatus(e.target.checked);
  return (
    <tr>
      <td>{board.boardNo}</td>
      <td className="title-td">
        <div>{board.boardTitle}</div>
      </td>
      <td>{board.memberId}</td>
      <td>{board.boardDate}</td>
      <td className="status-td">
        <Switch onChange={chageStatus} checked={status} />
      </td>
    </tr>
  );
};

export default AdminBoard;
