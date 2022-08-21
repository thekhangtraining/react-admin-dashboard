import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import { Navbar, Sidebar } from "./components";
import { Construction, MoviesDB, TravelBuddy } from "./pages";

const App = () => {
  return (
    <div className="flex bg-zinc-900">
      <BrowserRouter>
        <Sidebar />
        <div className="w-full">
          <div className="w-full">
            <Navbar />
          </div>
          <main className="w-full">
            <Routes>
              {/* My CV */}
              <Route
                path="/"
                key="home"
                element={<Navigate to="/apps/MoviesDB" />}
              />

              {/* Landing pages */}
              <Route
                path="/landing/restaurant"
                key="landing-restaurant"
                element={<Construction />}
              />

              {/* Admin dashboards */}
              <Route
                path="/dashboards/analytics"
                key="dash-analytics"
                element={<Construction />}
              />

              {/* Apps of many popular apps */}
              <Route
                path="/apps/TravelBuddy"
                key="TravelBuddy"
                element={<TravelBuddy />}
              />
              <Route
                path="/apps/MoviesDB"
                key="MoviesDB"
                element={<MoviesDB />}
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        newestOnTop
        pauseOnHover
        autoClose={3000}
        transition={Zoom}
        pauseOnFocusLoss={false}
        toastClassName="rounded-sm m-2"
        bodyClassName="p-0"
      />
    </div>
  );
};

export default App;
