import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Electricity } from "./pages/Electricity/Electricity";
import Login  from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/electricity" element={<Electricity />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
