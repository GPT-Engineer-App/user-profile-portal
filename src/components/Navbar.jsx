import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">Home</Link>
        <div className="space-x-4 flex items-center">
          <Link to="/about" className="text-gray-300 hover:text-white">About</Link>
          <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
          <Menu
            menuButton={<MenuButton className="text-gray-300 hover:text-white">Profiles</MenuButton>}
            transition
          >
            <MenuItem>
              <Link to="/profiles" className="text-gray-800">All Profiles</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/profiles/my-profile" className="text-gray-800">My Profile</Link>
            </MenuItem>
          </Menu>
          <Menu
            menuButton={<MenuButton className="text-gray-300 hover:text-white">Categories</MenuButton>}
            transition
          >
            <MenuItem>
              <Link to="/categories" className="text-gray-800">All Categories</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/categories/web-development" className="text-gray-800">Web Development</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/categories/graphic-design" className="text-gray-800">Graphic Design</Link>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;