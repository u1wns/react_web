import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BoardFrm from "./BoardFrm";
import axios from "axios";
import Swal from "sweetalert2";

const BoardModify = () => {
  const location = useLocation();
  const board = location.state.board;
  console.log(board);
  //제목, 썸네일, 내용, 첨부파일 > 전송용 데이터를 담을 state
  const [boardTitle, setBoardTitle] = useState(board.boardTitle);
  const [thumbnail, setThumbnail] = useState({});
  const [boardDetail, setBoardDetail] = useState(board.boardDetail);
  const [boardFile, setBaordFile] = useState([]);
  //boardImg > 썸네일 미리보기용, fileList > 첨부파일 목록 출력용
  const [boardImg, setBoardImg] = useState(board.boardImg);
  const [fileList, setFileList] = useState(board.fileList);
  const [delFileNo, setDelFileNo] = useState([]); //삭제파일용
  const navigate = useNavigate();
  const modify = () => {
    console.log("수정하기 버튼 클릭 시 동작할 함수");
    //전송할 데이터 출력
    console.log(boardTitle); //수정한 게시글 제목
    console.log(boardDetail); //수정한 게시글 내용
    console.log(boardImg); //수정 전 썸네일
    //추가 데이터
    console.log(thumbnail); //썸네일 수정 시 파일
    console.log(boardFile); //추가된 첨부파일
    console.log(delFileNo); //삭제할 파일 번호
    const form = new FormData();
    form.append("boardNo", board.boardNo);
    form.append("boardTitle", boardTitle);
    form.append("boardDetail", boardDetail);
    form.append("boardImg", boardImg);
    form.append("thumbnail", thumbnail);
    for (let i = 0; i < boardFile.length; i++) {
      form.append("boardFile", boardFile[i]);
    }
    form.append("delFileNo", delFileNo.join("/"));
    const token = window.localStorage.getItem("token");
    axios
      .post("/board/modify", form, {
        headers: {
          contentType: "multipart/form-data",
          processData: false,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data === 1) {
          navigate("/board");
        } else {
          Swal.fire("수정 중 문제가 발생했습니다. 잠시후 다시 시도해주세요.");
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };
  return (
    <div>
      <div className="board-frm-title">게시글 수정</div>
      <BoardFrm
        boardTitle={boardTitle}
        setBoardTitle={setBoardTitle}
        boardDetail={boardDetail}
        setBoardDetail={setBoardDetail}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        boardFile={boardFile}
        setBaordFile={setBaordFile}
        boardImg={boardImg}
        setBoardImg={setBoardImg}
        fileList={fileList}
        setFileList={setFileList}
        buttonEvent={modify}
        delFileNo={delFileNo}
        setDelFileNo={setDelFileNo}
        type="modify"
      />
    </div>
  );
};

export default BoardModify;
