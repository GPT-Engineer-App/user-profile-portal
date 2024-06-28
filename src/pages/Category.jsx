import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Category = () => {
  const { category } = useParams();
  const [services, setServices] = useState([
    {
      user: "John Doe",
      description: "I will develop a full-stack web application using React and Node.js.",
      price: "$1000",
      category: "Web Development",
    },
    {
      user: "Jane Smith",
      description: "I will design a professional logo using Photoshop and Illustrator.",
      price: "$500",
      category: "Graphic Design",
    },
  ]);

  const filteredServices = services.filter(service => service.category.toLowerCase().replace(/ /g, "-") === category);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{category.replace(/-/g, " ")}</h1>
      {filteredServices.length > 0 ? (
        filteredServices.map((service, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <h2 className="text-xl font-bold">{service.user}</h2>
            <p>{service.description}</p>
            <p className="font-bold">{service.price}</p>
            <button className="mt-2 p-2 bg-blue-500 text-white rounded">Book Now</button>
          </div>
        ))
      ) : (
        <p>No services available in this category.</p>
      )}
    </div>
  );
};

export default Category;