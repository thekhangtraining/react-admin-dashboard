import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./components";
import { Ecommerce, Employees, Facebook, Movies } from "./pages";
import { NotificationsProvider } from "@mantine/notifications";

const App = () => {
  return (
    <div className="flex m-2 h-full">
      <NotificationsProvider limit={5}>
        <BrowserRouter>
          <div className="w-72 p-2 bg-zinc-100 m-1 h-screen sticky top-3">
            <Sidebar />
          </div>
          <div className="w-full p-6 pt-4 bg-zinc-100 m-1">
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
        </BrowserRouter>
      </NotificationsProvider>
    </div>
  );
};

export default App;
