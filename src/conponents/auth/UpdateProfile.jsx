import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfile, UpdateUserProfile } from "../../redux/auth/auth.action";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux states
  const auth = useSelector((state) => state.auth);

  const [user1, setUser1] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const jwt = localStorage.getItem("jwt");

  // Fetch user profile data
  useEffect(() => {
    if (jwt) {
      dispatch(GetUserProfile(jwt)).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [jwt, dispatch]);

  // Sync profile data from Redux store to local state
  useEffect(() => {
    if (auth.user) {
      setUser1(auth.user.data); // Main user data
    }
  }, [auth.user]);

  // Handle address updates
  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index][field] = value;
    setAddresses(updatedAddresses);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Update Profile
        </h1>
        <Formik
          initialValues={{
            name: user1.name || "",
            email: user1.email || "",
            mobileNo: user1.mobileNo || "",
          }}
          enableReinitialize // Ensures form reinitializes when `user1` changes
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Required";
            }
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.mobileNo) {
              errors.mobileNo = "Required";
            } else if (!/^\d{10}$/.test(values.mobileNo)) {
              errors.mobileNo = "Invalid mobile number (must be 10 digits)";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const payload = { ...user1, ...values, addresses };
            dispatch(UpdateUserProfile({ data: payload })).then(() => {
              navigate("/profile");
              setSubmitting(false);
            });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => {
                    handleChange(e);
                    setUser1({ ...user1, name: e.target.value });
                  }}
                  onBlur={handleBlur}
                  value={values.name}
                  className={`mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.name && touched.name
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && touched.name && (
                  <span className="text-sm text-red-500 mt-1">
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email Input */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => {
                    handleChange(e);
                    setUser1({ ...user1, email: e.target.value });
                  }}
                  onBlur={handleBlur}
                  value={values.email}
                  className={`mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && touched.email && (
                  <span className="text-sm text-red-500 mt-1">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Mobile Number Input */}
              <div className="flex flex-col">
                <label
                  htmlFor="mobileNo"
                  className="text-sm font-medium text-gray-700"
                >
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobileNo"
                  onChange={(e) => {
                    handleChange(e);
                    setUser1({ ...user1, mobileNo: e.target.value });
                  }}
                  onBlur={handleBlur}
                  value={values.mobileNo}
                  className={`mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.mobileNo && touched.mobileNo
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your mobile number"
                />
                {errors.mobileNo && touched.mobileNo && (
                  <span className="text-sm text-red-500 mt-1">
                    {errors.mobileNo}
                  </span>
                )}
              </div>


              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
              >
                Update
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateProfile;
