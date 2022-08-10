import { NotificationsProvider } from "@mantine/notifications";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar, Sidebar } from "./components";
import {
  FinancialStats,
  Amazon,
  Employees,
  Projects,
  Facebook,
  Movies,
  Spotify,
} from "./pages";

const App = () => {
  return (
    <div className="flex h-full">
      <NotificationsProvider limit={5}>
        <BrowserRouter>
          <div className="w-72 p-1 bg-zinc-100 h-screen sticky top-0 drop-shadow-xl">
            <Sidebar />
          </div>
          <div className="w-full px-8 py-1 bg-zinc-200">
            <div className="w-full p-2 bg-red-200">
              <Navbar />
            </div>
            <div className="w-full p-6 pt-6 mt-2 bg-slate-50 rounded-t-[0.5rem] drop-shadow-xl">
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
            </div>
          </div>
        </BrowserRouter>
      </NotificationsProvider>
    </div>
  );
};

export default App;
