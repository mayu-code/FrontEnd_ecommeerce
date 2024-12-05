import React, { useState } from 'react';

const AdminUserList = () => {
  // Hardcoded list of users (admin manages)
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', status: 'inactive' },
    { id: 3, name: 'Mary Johnson', email: 'maryjohnson@example.com', status: 'active' },
    { id: 4, name: 'James Brown', email: 'jamesbrown@example.com', status: 'inactive' },
  ]);

  // Function to handle enabling or disabling a user
  const handleToggleStatus = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
          : user
      )
    );
  };

  // Function to handle deleting a user
  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    alert('User deleted successfully!');
  };

  // Function to handle updating a user (navigating to a user edit page or modal)
  const handleUpdateUser = (id) => {
    // In a real-world application, you could navigate to an edit user page or open a modal.
    alert(`Update user with id: ${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-semibold mb-6">Admin - User List</h2>

      {/* User Table */}
      {users.length > 0 ? (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      user.status === 'active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {/* Enable/Disable Button */}
                  <button
                    onClick={() => handleToggleStatus(user.id)}
                    className={`mr-2 px-4 py-2 rounded-md text-white ${
                      user.status === 'active' ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'
                    }`}
                  >
                    {user.status === 'active' ? 'Disable' : 'Enable'}
                  </button>
                  
                  {/* Update Button */}
                  <button
                    onClick={() => handleUpdateUser(user.id)}
                    className="mr-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700"
                  >
                    Update
                  </button>
                  
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found. Please add users.</p>
      )}
    </div>
  );
};

export default AdminUserList;
