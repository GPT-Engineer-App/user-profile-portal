import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">Home</Link>
        <div className="space-x-4">
          <Link to="/about" className="text-gray-300 hover:text-white">About</Link>
          <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
          <Link to="/profiles" className="text-gray-300 hover:text-white">Profiles</Link>
          <Link to="/categories" className="text-gray-300 hover:text-white">Categories</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;