import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { Ecommerce, Employees, Movies } from "./pages";

function App() {
  return (
    <div className="flex m-2">
      <BrowserRouter>
        <div className="w-72 p-2">
          <Sidebar />
        </div>
        <div className="w-full p-2">
          <Routes>
            <Route path="/ecommerce" element={<Ecommerce />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/movies" element={<Movies />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
