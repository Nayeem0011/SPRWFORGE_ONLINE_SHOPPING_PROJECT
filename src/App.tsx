import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import ShopPage from "./pages/ShopPage";

function Layout() {
  const location = useLocation();

  // Navbar hide in route
  const hideNavbarRoutes = ["/login", "/register", "/forgot-password"];

  // Check if the current path is in this list.
  const hideLayout = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/category/:slug" element={<ShopPage />} />
        </Routes>
        {/* Footer only if not hidden */}
      {!hideLayout && <Footer />}

    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;


