import { BrowserRouter, Routes, Route } from "react-router-dom";
import Electricity  from "./pages/Electricity/Electricity";
import Login  from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import HomePage from "./pages/HomePage/HomePage";
import Shop from "./pages/Shop/Shop";
import Quiz from "./pages/Quiz/Quiz";
import { ProtectedRoutes } from "./components/ProtectedRoutes/ProtectedRoutes";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/electricity"
          element={
            <ProtectedRoutes>
              <Electricity />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/shop"
          element={
            <ProtectedRoutes>
              <Shop />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/quiz"
          element={
            <ProtectedRoutes>
              <Quiz />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
