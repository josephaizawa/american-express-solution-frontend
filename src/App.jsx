// import HomePage from "./pages/HomePage/HomePage.jsx";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponseForm from "./components/ResponseForm/ResponseForm.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ResponseForm />}></Route>
        <Route path="/:id" element={<ResponseForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
