// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* یہاں مزید routes add کر سکتے ہیں */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;