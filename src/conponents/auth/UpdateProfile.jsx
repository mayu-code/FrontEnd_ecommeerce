import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    password: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data on mount
  useEffect(() => {
    if (jwt) {
      axios
        .get('http://localhost:8080/user/getUser', {
          headers: { Authorization: `Bearer ${jwt}` },
        })
        .then((response) => {
          setFormData({
            name: response.data.name || '',
            email: response.data.email || '',
            mobileNo: response.data.mobileNo || '',
            password: '', // Do not prefill the password
          });
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to fetch user data');
          setLoading(false);
        });
    }
  }, [jwt]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!jwt) {
      alert('You need to log in first');
      navigate('/login');
      return;
    }

    axios
      .put(
        'http://localhost:8080/users/updateUser',
        formData,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )
      .then(() => {
        alert('Profile updated successfully');
        navigate('/user/profile'); // Redirect after update
      })
      .catch(() => {
        alert('Error updating profile');
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold">Mobile Number</label>
          <input
            type="text"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter your mobile number"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter new password"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
