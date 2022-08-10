import { NotificationsProvider } from "@mantine/notifications";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar, Sidebar } from "./components";
import { Ecommerce, Employees, Facebook, Movies } from "./pages";

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
                <Route path="/" key="Ecommerce" element={<Ecommerce />} />
                <Route
                  path="/ecommerce"
                  key="Ecommerce"
                  element={<Ecommerce />}
                />
                <Route
                  path="/employees"
                  key="Employees"
                  element={<Employees />}
                />
                <Route path="/movies" key="Movies" element={<Movies />} />
                <Route path="/facebook" key="Facebook" element={<Facebook />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </NotificationsProvider>
    </div>
  );
};

export default App;
