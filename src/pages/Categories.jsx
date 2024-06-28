import { useState, useEffect } from "react";
import { useProfiles } from '../integrations/supabase/index.js';
import { Link } from "react-router-dom";

const Categories = () => {
  const { data: profiles, isLoading, error } = useProfiles();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (profiles && Array.isArray(profiles)) {
      const skillSet = new Set();
      profiles.forEach(profile => {
        if (profile.skills) {
          profile.skills.forEach(skill => skillSet.add(skill));
        }
      });
      setCategories(Array.from(skillSet));
    }
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