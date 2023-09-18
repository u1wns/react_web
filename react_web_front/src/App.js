import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import { Routes, Route } from "react-router-dom";
import Join from "./component/member/Join";
import Login from "./component/member/Login";

function App() {
  return (
    <div className="wrap">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
