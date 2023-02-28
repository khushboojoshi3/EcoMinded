import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Electricity } from "./pages/Electricity/Electricity";
import Innovate from "./pages/Innovate/Innovate";
import BlogView from "./components/BlogView/BlogView";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/electricity" element={<Electricity />} />
        <Route path="/innovate" element={<Innovate />} />
        <Route path="/blogview/:id" element={<BlogView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
