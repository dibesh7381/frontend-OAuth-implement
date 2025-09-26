import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Profile";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import BecomeSeller from "./pages/BecomeSeller";
import SellerDashboard from "./pages/SellerDashboard";
import AllProductsPage from "./components/AllProductsPage";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Dashboard />} />
        <Route path="/become-seller" element={<BecomeSeller />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/all-products" element={<AllProductsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
