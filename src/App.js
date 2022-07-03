import Splash from "./pages/Splash";
import Main from "./pages/Main";
import Watch from "./pages/Watch";
import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      {/* {showSplash && <Splash onLoadingComplete={changeScreen} />}
      {!showSplash && <Navigate to="/main" replace={true} />} */}
      {/* <Watch /> */}

      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="main" element={<Main />} />
        <Route path="watch">
          <Route path=":id" element={<Watch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
