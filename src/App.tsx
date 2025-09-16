import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import ShopPage from "./pages/ShopPage";
import ProductDetails from "./features/products/ProductDetails ";
import Cart from "./features/cart/Cart";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Toaster } from "react-hot-toast";

function Layout() {
  const location = useLocation();

  // Navbar hide in route
  const hideNavbarRoutes = ["/login", "/register", "/forgot-password"];

  // Check if the current path is in this list.
  const hideLayout = hideNavbarRoutes.includes(location.pathname);

  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen">
        {!hideLayout && <Navbar />}

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/category/:slug" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
        {/* Footer only if not hidden */}
        {!hideLayout && <Footer />}
      </div>
    </Provider>
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


