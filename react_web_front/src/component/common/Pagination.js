import "./pagination.css";
const Pagination = (props) => {
  const pageInfo = props.pageInfo;
  const reqPage = props.reqPage;
  const setReqPage = props.setReqPage;
  console.log(reqPage);
  console.log(pageInfo);
  const changePage = (e) => {
    const changePage = e.currentTarget.innerText;
    setReqPage(changePage);
  };
  //페이징 jsx가 저장될 배열
  const arr = new Array();
  //맨 처음 페이지 버튼
  arr.push(
    <span
      onClick={() => {
        setReqPage(1);
      }}
      key="first-page"
      className="material-icons page-item"
    >
      first_page
    </span>
  );
  //이전페이지 버튼
  arr.push(
    <span
      onClick={() => {
        if (reqPage != 1) {
          setReqPage(reqPage - 1);
        }
      }}
      key="prev-page"
      className="material-icons page-item"
    >
      navigate_before
    </span>
  );
  //페이징 숫자
  let pageNo = pageInfo.pageNo;
  for (let i = 0; i < pageInfo.pageNaviSize; i++) {
    console.log(pageNo);
    if (pageNo === Number(reqPage)) {
      arr.push(
        <span
          onClick={changePage}
          key={"page" + i}
          className="page-item active-page"
        >
          {pageNo}
        </span>
      );
    } else {
      arr.push(
        <span onClick={changePage} key={"page" + i} className="page-item">
          {pageNo}
        </span>
      );
    }
    pageNo++;
    if (pageNo > pageInfo.totalPage) {
      break;
    }
  }

  //다음페이지
  arr.push(
    <span
      onClick={() => {
        if (reqPage != pageInfo.totalPage) {
          setReqPage(Number(reqPage) + 1);
        }
      }}
      key="next-page"
      className="material-icons page-item"
    >
      navigate_next
    </span>
  );
  //맨 끝 페이지
  arr.push(
    <span
      onClick={() => {
        setReqPage(pageInfo.totalPage);
      }}
      key="last-page"
      className="material-icons page-item"
    >
      last_page
    </span>
  );
  return <div className="paging-wrap">{arr}</div>;
};
export default Pagination;
