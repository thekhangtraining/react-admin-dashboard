import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import { Navbar, Sidebar } from "./components";
import {
  Amazon,
  Charts,
  Cv,
  DashAnalytics,
  DashDefault,
  Gmail,
  Imdb,
  Infographics,
  LandingDemo1,
  LandingDemo2,
  Messenger,
  Spotify,
  Tables
} from "./pages";

const App = () => {
  return (
    <div className="flex bg-zinc-900">
      <BrowserRouter>
        <Sidebar />
        <div className="w-screen">
          <div className="w-full lg:hidden">
            <Navbar />
          </div>
          <main className="w-full relative p-4 pt-2 bg-zinc-800">
            <Routes>
              {/* My CV */}
              <Route path="/" key="cv" element={<Cv />} />

              {/* Admin dashboards */}
              <Route
                path="/dashboards/default"
                key="dash-default"
                element={<DashDefault />}
              />
              <Route
                path="/dashboards/analytics"
                key="dash-analytics"
                element={<DashAnalytics />}
              />

              {/* Landing pages */}
              <Route
                path="/landing/demo1"
                key="landing-demo-1"
                element={<LandingDemo1 />}
              />
              <Route
                path="/landing/demo2"
                key="landing-demo-2"
                element={<LandingDemo2 />}
              />

              {/* Tables, Charts & Infographics */}
              <Route path="/data/tables" key="tables" element={<Tables />} />
              <Route path="/data/charts" key="charts" element={<Charts />} />
              <Route
                path="/data/infographics"
                key="infographics"
                element={<Infographics />}
              />

              {/* Clones of many popular apps */}
              <Route
                path="/clones/amazon"
                key="clone-amazon"
                element={<Amazon />}
              />
              <Route path="/clones/imdb" key="clone-imdb" element={<Imdb />} />
              <Route
                path="/clones/gmail"
                key="clone-gmail"
                element={<Gmail />}
              />
              <Route
                path="/clones/messenger"
                key="clone-messenger"
                element={<Messenger />}
              />
              <Route
                path="/clones/spotify"
                key="clone-spotify"
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
