import { useState } from "react";
import BoardFrm from "./BoardFrm";

const BoardWrite = () => {
  //제목, 썸네일, 내용, 첨부파일 > 전송용 데이터를 담을 state
  const [boardTitle, setBoardTitle] = useState("");
  const [thumbnail, setThumbnail] = useState({});
  const [boardDetail, setBoardDetail] = useState("");
  const [boardFile, setBaordFile] = useState([]);
  //boardImg > 썸네일 미리보기용, fileList > 첨부파일 목록 출력용
  const [boardImg, setBoardImg] = useState("");
  const [fileList, setFileList] = useState([]);

  //글쓰기 버튼 클릭시 둥작할 함수(서버에 insert요청함수)
  const write = () => {
    console.log(boardTitle);
    console.log(thumbnail);
    console.log(boardDetail);
    console.log(boardFile);
  };
  return (
    <div>
      <div className="board-frm-title">게시글 작성</div>
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
        buttonEvent={write}
        type="write"
      />
    </div>
  );
};

export default BoardWrite;
