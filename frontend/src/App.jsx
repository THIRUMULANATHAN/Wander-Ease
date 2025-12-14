import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home/Home";
import Hiking from "./Hiking/Hiking";
import Yachting from "./Yachting/Yachting";
import Vrooms from "./Vrooms/Vrooms";
import Packages from "./Packages/Packages";
import PackageDetail from "./Packages/PackageDetail";
import About from "./components/About";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";

import ProtectedRoute from "./components/ProtectedRoute";

// AUTH PAGES (PUBLIC)
import Login from "./Auth/Login";
import Register from "./Auth/Register";

function App() {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        {/* 🔓 PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 PROTECTED ROUTES */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="activities/hiking" element={<Hiking />} />
          <Route path="activities/yachting" element={<Yachting />} />
          <Route path="vr" element={<Vrooms />} />
          <Route path="package" element={<Packages />} />
          <Route path="package/:id" element={<PackageDetail />} />
          <Route path="about-author" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
