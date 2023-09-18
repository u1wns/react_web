import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import { Routes, Route } from "react-router-dom";
import Join from "./component/member/Join";
import Login from "./component/member/Login";
import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="wrap">
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <div className="content">
        <Routes>
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
