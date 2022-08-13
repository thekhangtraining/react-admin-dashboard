import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import { Navbar, Sidebar } from "./components";
import {
  Amazon,
  Employees,
  Facebook,
  FinancialStats,
  Movies,
  Projects,
  Spotify,
  Youtube,
} from "./pages";

const App = () => {
  return (
    <div className="flex h-full">
      <BrowserRouter>
        <div className="w-72 bg-zinc-100 h-screen sticky top-0 drop-shadow-xl">
          <Sidebar />
        </div>
        <div className="w-full px-4 py-1 bg-gray-50">
          <div className="w-full p-0.5">
            <Navbar />
          </div>
          <main className="w-full p-4 pt-2 mt-1 bg-gray-200 rounded-sm drop-shadow-xl">
            <Routes>
              <Route
                path="/ecommerce/financial-stats"
                key="FinancialStats"
                element={<FinancialStats />}
              />
              <Route
                path="/ecommerce/amazon"
                key="Amazon"
                element={<Amazon />}
              />
              <Route
                path="/company/employees"
                key="Employees"
                element={<Employees />}
              />
              <Route
                path="/company/projects"
                key="Projects"
                element={<Projects />}
              />
              <Route path="/media/movies" key="Movies" element={<Movies />} />
              <Route
                path="/media/youtube"
                key="Youtube"
                element={<Youtube />}
              />
              <Route
                path="/media/facebook"
                key="Facebook"
                element={<Facebook />}
              />
              <Route
                path="/media/spotify"
                key="Spotify"
                element={<Spotify />}
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        newestOnTop
        pauseOnHover
        autoClose={2000}
        transition={Zoom}
        pauseOnFocusLoss={false}
        toastClassName="rounded-sm m-2"
        bodyClassName="p-0"
      />
    </div>
  );
};

export default App;
