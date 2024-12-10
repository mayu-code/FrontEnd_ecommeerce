import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Action to fetch user profile
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';
import { useNavigate } from 'react-router-dom';
import { GetUserProfile } from '../../redux/auth/auth.action';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const jwt = localStorage.getItem('jwt');

  // Access user data from Redux store
  const { user, loading } = useSelector((state) => state.auth);

  // Local state for the form with two-way binding
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    password: '',
  });

  // Handle form field changes (two-way data binding)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,  // Update the corresponding field in the state
    }));
  };

  // Submit the form to update user data
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/admin/users/updateUser`, 
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      alert('Profile updated successfully!');
      navigate('/user/profile');
    } catch (error) {
      alert('Error updating profile');
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    if (jwt) {
      dispatch(GetUserProfile(jwt));
    }
  }, [jwt, dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        mobileNo: user.mobileNo || '',
        password: '', // Do not prefill password for security reasons
      });
    }
  }, [user]);

  // Loading state while fetching user data
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {/* Name Field */}
          <div>
            <label className="block text-lg font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}  // Binding value to formData.name
              onChange={handleChange}  // Update state on input change
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-lg font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}  // Binding value to formData.email
              onChange={handleChange}  // Update state on input change
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter your email"
            />
          </div>

          {/* Mobile Number Field */}
          <div>
            <label className="block text-lg font-semibold">Mobile Number</label>
            <input
              type="text"
              name="mobileNo"
              value={formData.mobileNo}  // Binding value to formData.mobileNo
              onChange={handleChange}  // Update state on input change
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter your mobile number"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-lg font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}  // Binding value to formData.password
              onChange={handleChange}  // Update state on input change
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter new password"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Update Profile
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateProfile;
