import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="bg-gray-800 p-4 mt-4">
    <div className="container mx-auto flex justify-between items-center">
      <p className="text-white">&copy; 2023 Service Platform. All rights reserved.</p>
      <div className="space-x-4">
        <Link to="/privacy-policy" className="text-gray-300 hover:text-white">Privacy Policy</Link>
        <Link to="/terms-of-service" className="text-gray-300 hover:text-white">Terms of Service</Link>
      </div>
    </div>
  </footer>
);