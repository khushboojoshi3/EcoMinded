import { BrowserRouter, Routes, Route } from "react-router-dom";
import Innovate from "./pages/Innovate/Innovate";
import BlogView from "./components/BlogView/BlogView";
import Electricity from "./pages/Electricity/Electricity";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import HomePage from "./pages/HomePage/HomePage";
import Shop from "./pages/Shop/Shop";
import Quiz from "./pages/Quiz/Quiz";
import Dispose from "./pages/Dispose/Dispose";
import Store from "./pages/Store/Store";
import Questions from "./pages/Quiz/Questions/Questions";
import Donate from "./pages/Donate/Donate";
import DonateForm from "./pages/Donate/DonateForm/DonateForm";
import Profile from "./pages/Profile/Profile";
import Clothing from "./pages/Shop/Clothing/Clothing";
import Grocery from "./pages/Shop/Grocery/Grocery";
import Footwear from "./pages/Shop/Footwear/Footwear";
import Furniture from "./pages/Shop/Furniture/Furniture";
import Stationery from "./pages/Shop/Stationery/Stationery";
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
          path="/dispose"
          element={
            <ProtectedRoutes>
              <Dispose />
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
        <Route
          path="/innovate"
          element={
            <ProtectedRoutes>
              <Innovate />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/shop/grocery"
          element={
            <ProtectedRoutes>
              <Grocery />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/shop/footwear"
          element={
            <ProtectedRoutes>
              <Footwear />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/shop/stationery"
          element={
            <ProtectedRoutes>
              <Stationery />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/shop/clothing"
          element={
            <ProtectedRoutes>
              <Clothing />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/shop/furniture"
          element={
            <ProtectedRoutes>
              <Furniture />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/blogview/:id"
          element={
            <ProtectedRoutes>
              <BlogView />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/quiz/questions"
          element={
            <ProtectedRoutes>
              <Questions />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
         <Route
          path="/donate"
          element={
            <ProtectedRoutes>
              <Donate />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/donateform"
          element={
            <ProtectedRoutes>
              <DonateForm />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;