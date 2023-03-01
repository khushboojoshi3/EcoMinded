import { BrowserRouter, Routes, Route } from "react-router-dom";
import Innovate from "./pages/Innovate/Innovate";
import BlogView from "./components/BlogView/BlogView";
import Electricity  from "./pages/Electricity/Electricity";
import Login  from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import HomePage from "./pages/HomePage/HomePage";
import Shop from "./pages/Shop/Shop";
import Quiz from "./pages/Quiz/Quiz";
import Store from "./pages/Store/Store";
import { ProtectedRoutes } from "./components/ProtectedRoutes/ProtectedRoutes";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/electricity" element={<Electricity />} />
        <Route path="/innovate" element={<Innovate />} />
        <Route path="/blogview/:id" element={<BlogView />} />
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
        <Route
          path="/store"
          element={
            <ProtectedRoutes>
              <Store />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
