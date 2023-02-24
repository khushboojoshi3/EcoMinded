import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Electricity } from "./pages/Electricity/Electricity";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/electricity" element={<Electricity/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
