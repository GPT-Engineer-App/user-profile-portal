import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Profiles from "./pages/Profiles.jsx";
import Categories from "./pages/Categories.jsx";
import Category from "./pages/Category.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/profiles" element={<ProtectedRoute><Profiles /></ProtectedRoute>} />
        <Route exact path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
        <Route exact path="/categories/:category" element={<ProtectedRoute><Category /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;