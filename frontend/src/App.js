import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { Ecommerce, Employees, Movies, Facebook } from "./pages";

const App = () => {
  return (
    <div className="flex m-2 h-screen">
      <BrowserRouter>
        <div className="w-72 p-2 bg-zinc-100 m-1">
          <Sidebar />
        </div>
        <div className="w-full p-4 bg-zinc-100 m-1">
          <Routes>
            <Route path="/" key="Ecommerce" element={<Ecommerce />} />
            <Route path="/ecommerce" key="Ecommerce" element={<Ecommerce />} />
            <Route path="/employees" key="Employees" element={<Employees />} />
            <Route path="/movies" key="Movies" element={<Movies />} />
            <Route path="/facebook" key="Facebook" element={<Facebook />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
