import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Electricity } from "./pages/Electricity/Electricity";
import Shop from './pages/Shop/Shop';
import HomePage from './pages/HomePage/HomePage';
import Quiz from './pages/Quiz/Quiz';
import Home from './pages/HomePage/HomePage';
import Store from './pages/Store/Store';
function App() {
  return (
    <BrowserRouter>
      <Routes>
   <Route path='/' element={<HomePage/>} />
   <Route path='/home' element={<Home/>}/>
   <Route path="/electricity" element={<Electricity/>} />
   <Route path='/shop' element={<Shop/>} />
   <Route path='/quiz' element={<Quiz/>}/>
   <Route path='/store' element={<Store/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
