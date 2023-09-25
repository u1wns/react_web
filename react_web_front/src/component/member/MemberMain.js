import axios from "axios";
import "./memberMain.css";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import MyInfo from "./MyInfo";
import MemberChangePw from "./MemberChangePw";
import MyBoard from "./MyBoard";
const MemberMain = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  console.log(setIsLogin);
  const token = window.localStorage.getItem("token");
  const [member, setMember] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post("/member/getMember", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setMember(res.data);
        if (res.data && res.data.memberType === 1) {
          const adminMenu = {
            url: "/admin",
            text: "관리자 페이지",
            active: false,
          };
          // const arr = [...menus];
          // arr.push(adminMenu);
          // setMenus(arr);
          setMenus([...menus, adminMenu]);
        }
        //document.querySelectorAll(".my-side a")[0].click();
      })
      .catch((res) => {
        if (res.response.status === 403) {
          Swal.fire("로그인이 필요합니다.").then(() => {
            navigate("/login");
          });
        }
      });
  }, []);
  if (!isLogin) {
    Swal.fire({
      title: "로그인이 필요한 서비스입니다.",
      text: "로그인 페이지로 이동합니다.",
      icon: "info",
    }).then(() => {
      navigate("/");
    });
  }
  const [menus, setMenus] = useState([
    { url: "info", text: "내 정보", active: true },
    { url: "changePw", text: "비밀번호 변경", active: false },
    { url: "myboard", text: "작성 글 보기", active: false },
  ]);
  return (
    <div className="mypage-wrap">
      <div className="my-title">My Page</div>
      <div className="my-content">
        <MySideMenu menus={menus} setMenus={setMenus} />
        <div className="current-content">
          <Routes>
            <Route
              path="info"
              element={
                <MyInfo
                  member={member}
                  setMember={setMember}
                  setIsLogin={setIsLogin}
                />
              }
            />
            <Route path="changePw" element={<MemberChangePw />} />
            <Route path="myboard" element={<MyBoard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const MySideMenu = (props) => {
  const menus = props.menus;
  const setMenus = props.setMenus;
  console.log(menus);
  const activeTab = (index) => {
    menus.forEach((item) => {
      item.active = false;
    });
    menus[index].active = true;
    setMenus([...menus]);
  };
  return (
    <div className="my-side">
      <ul>
        {menus.map((menu, index) => {
          return (
            <li key={"menu" + index}>
              {menu.active ? (
                <Link
                  to={menu.url}
                  className="active-side"
                  onClick={() => {
                    activeTab(index);
                  }}
                >
                  {menu.text}
                  <span className="material-icons">chevron_right</span>
                </Link>
              ) : (
                <Link
                  to={menu.url}
                  onClick={() => {
                    activeTab(index);
                  }}
                >
                  {menu.text}
                  <span className="material-icons">chevron_right</span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export { MemberMain, MySideMenu };
