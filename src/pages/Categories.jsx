import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const [profiles, setProfiles] = useState([
    {
      name: "John Doe",
      portfolio: "https://johndoe.com",
      contact: "john@example.com",
      skills: ["Web Development", "React", "Node.js"],
    },
    {
      name: "Jane Smith",
      portfolio: "https://janesmith.com",
      contact: "jane@example.com",
      skills: ["Graphic Design", "Photoshop", "Illustrator"],
    },
  ]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const skillSet = new Set();
    profiles.forEach(profile => {
      profile.skills.forEach(skill => skillSet.add(skill));
    });
    setCategories(Array.from(skillSet));
  }, [profiles]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Service Categories</h1>
      <ul>
        {categories.map((category, index) => (
          <li key={index} className="mb-2 p-2 border rounded">
            <Link to={`/categories/${category.toLowerCase().replace(/ /g, "-")}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;