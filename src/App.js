import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Player from "./pages/Player";
import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="home" element={<Home />} />
      <Route path="play">
        <Route path=":id" element={<Player />} />
      </Route>
    </Routes>
  );
}

export default App;
