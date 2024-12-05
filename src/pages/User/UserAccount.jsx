import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // For navigation

const UserAccount = () => {
  // Hardcoded User Data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    address: '1234 Elm Street, Springfield, IL, 62704',
  });

  // Function to handle profile update (hardcoded for now)
  const handleProfileUpdate = () => {
    // This is where you can handle profile update logic (e.g., API call)
    alert('Profile updated successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-semibold mb-6">User Account</h2>

      {/* Profile Information Section */}
      <div className="border p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-2xl font-semibold">Profile Information</h3>
        <div className="mt-4">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Address:</strong> {userData.address}</p>
        </div>
      </div>

      {/* Update Profile Button */}
      <div className="mt-6">
        <button
          onClick={handleProfileUpdate}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700"
        >
          Update Profile
        </button>
      </div>

      {/* Links to other pages */}
      <div className="flex space-x-4 mt-6">
        <Link to="/orders" className="text-blue-500 hover:underline">
          View Orders
        </Link>
        <Link to="/profile" className="text-blue-500 hover:underline">
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default UserAccount;
