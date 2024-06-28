import { useState } from "react";

const Profiles = () => {
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profiles</h1>
      {profiles.map((profile, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-bold">{profile.name}</h2>
          <p>Portfolio: <a href={profile.portfolio} className="text-blue-500">{profile.portfolio}</a></p>
          <p>Contact: {profile.contact}</p>
          <p>Skills: {profile.skills.join(", ")}</p>
        </div>
      ))}
    </div>
  );
};

export default Profiles;